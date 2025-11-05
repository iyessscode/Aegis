"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const features = [
  {
    name: "Email & Password",
    link: "https://www.better-auth.com/docs/authentication/email-password",
  },
  {
    name: "Organization | Teams",
    link: "https://www.better-auth.com/docs/plugins/organization",
  },
  {
    name: "Passkeys",
    link: "https://www.better-auth.com/docs/plugins/passkey",
  },
  {
    name: "Multi Factor",
    link: "https://www.better-auth.com/docs/plugins/2fa",
  },
  {
    name: "Password Reset",
    link: "https://www.better-auth.com/docs/authentication/email-password#request-password-reset",
  },
  {
    name: "Email Verification",
    link: "https://www.better-auth.com/docs/authentication/email-password#email-verification",
  },
  {
    name: "Roles & Permissions",
    link: "https://www.better-auth.com/docs/plugins/organization#roles",
  },
  {
    name: "Rate Limiting",
    link: "https://www.better-auth.com/docs/reference/security#rate-limiting",
  },
  {
    name: "Session Management",
    link: "https://www.better-auth.com/docs/concepts/session-management",
  },
];

export default function HomePage() {
  return (
    <main className="relative grid h-screen place-items-center">
      <div className="z-50 mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-2 px-4 lg:gap-y-2">
        <div className="relative mx-auto h-20 w-56 md:h-24 md:w-96">
          <Image
            src="./logo-text.svg"
            alt="logo"
            fill
            sizes="30vw"
            className="object-contain"
          />
        </div>
        <h3 className="text-primary text-center text-xl font-bold md:text-4xl">
          Protected. Verified. Aegis.
        </h3>
        <p className="text-muted-foreground mt-4 text-center text-sm md:text-base lg:mt-8">
          Aegis is a secure authentication platform built to protect users and
          applications through modern identity management. Designed for
          dark-mode interfaces, it combines robust encryption, seamless user
          experience, and developer-friendly integration. Aegis ensures every
          login is verified, encrypted, and trusted — your digital shield for
          access security.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.link}
              className="text-muted-foreground hover:text-foreground hover:border-foreground flex cursor-pointer items-center gap-1 border-b pb-1 text-xs transition-all duration-150 ease-in-out"
            >
              {feature.name}
            </Link>
          ))}
        </div>
        <Button size="lg" className="mt-12 md:mt-6" asChild>
          <Link href="/sign-in">Get Started!</Link>
        </Button>
      </div>
    </main>
  );
}
