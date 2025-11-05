import z from "zod";

const clientEnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID is required"),
  RESEND_SENDER_EMAIL: z.string().min(1, "RESEND_SENDER_EMAIL is required"),
});

export const env = clientEnvSchema.parse({
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  RESEND_SENDER_EMAIL: process.env.NEXT_PUBLIC_RESEND_SENDER_EMAIL,
});
