import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { oneTap, twoFactor } from "better-auth/plugins";

import { env as envClient } from "@/data/env/client";
import { env as envServer } from "@/data/env/server";
import { getSubjectText } from "@/lib/email";

import { db } from "@/config/db";
import { resend } from "@/config/resend";

import * as schema from "@/db/schema";

import ChangeEmailVerification from "@/features/email/components/change-email";
import SendEmail from "@/features/email/components/send-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: envClient.RESEND_SENDER_EMAIL,
        to: user.email,
        subject: getSubjectText("forget-password"),
        react: SendEmail({
          userName: user.name,
          userEmail: user.email,
          type: "forget-password",
          actionUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendOnSignIn: true,
    expiresIn: 60 * 15, // 15 minutes
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: envClient.RESEND_SENDER_EMAIL,
        to: user.email,
        subject: getSubjectText("email-verification"),
        react: SendEmail({
          userName: user.name,
          userEmail: user.email,
          type: "email-verification",
          actionUrl: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: envClient.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: envClient.GITHUB_CLIENT_ID,
      clientSecret: envServer.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 15, // 15 minutes
    },
  },
  user: {
    additionalFields: {
      image_key: {
        type: "string",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification({ user, url }) {
        console.log({ url });
        await resend.emails.send({
          from: envClient.RESEND_SENDER_EMAIL,
          to: user.email,
          subject: "Approve email change",
          react: ChangeEmailVerification({
            username: user.name,
            verificationUrl: url,
          }),
        });
      },
    },
  },
  plugins: [
    nextCookies(),
    oneTap({
      disableSignup: false,
      clientId: envClient.GOOGLE_CLIENT_ID,
    }),
    twoFactor(),
  ],
});
