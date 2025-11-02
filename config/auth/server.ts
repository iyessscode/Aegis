import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, username } from "better-auth/plugins";

import { env } from "@/data/env";
import { getSubjectText } from "@/lib/email";

import { db } from "@/config/db";
import { resend } from "@/config/resend";

import * as schema from "@/db/schema";

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
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendOnSignIn: true,
    expiresIn: 60 * 15, // 15 minutes
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: env.RESEND_SENDER_EMAIL,
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
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
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
    },
    plugins: [nextCookies()],
  },
});
