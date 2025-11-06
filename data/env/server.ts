import z from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  ARCJET_KEY: z.string().min(1, "ARCJET_KEY is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  GITHUB_CLIENT_SECRET: z.string().min(1, "GITHUB_CLIENT_SECRET is required"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  UPLOADTHING_TOKEN: z.string().min(1, "UPLOADTHING_TOKEN is required"),
});

export const env = serverEnvSchema.parse(process.env);
