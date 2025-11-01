import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  ARCJET_KEY: process.env.ARCJET_KEY as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
  RESEND_SENDER_EMAIL: process.env.RESEND_SENDER_EMAIL as string,
  UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN as string,
};
