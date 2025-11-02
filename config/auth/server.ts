import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

import { env } from "@/data/env";
import { getSubjectText } from "@/lib/email";

import { db } from "@/config/db";
import { resend } from "@/config/resend";

import * as schema from "@/db/schema";

import ChangeEmailVerification from "@/features/email/components/change-email";
import OTPEmail from "@/features/email/components/otp-email";

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
      sendChangeEmailVerification: async ({ user, url }) => {
        console.log({ url });
        await resend.emails.send({
          from: env.RESEND_SENDER_EMAIL,
          to: user.email,
          subject: "Approve Email Change",
          react: ChangeEmailVerification({
            username: user.name,
            verificationUrl: url,
            expireMinutes: 15,
          }),
        });
      },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      sendVerificationOnSignUp: true,
      allowedAttempts: 10,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
          from: env.RESEND_SENDER_EMAIL,
          to: email,
          subject: getSubjectText(type),
          react: OTPEmail({
            otpCode: otp,
            purpose: type,
            expiryMinutes: "15",
          }),
        });
      },
    }),
  ],
});
