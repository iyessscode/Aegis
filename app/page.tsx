import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative grid h-screen place-items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="from-primary/20 absolute top-1/2 left-1/2 -z-50 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial to-transparent blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-2 px-4 lg:gap-y-2">
        <div className="relative mx-auto h-20 w-56 md:h-24 md:w-96">
          <Image
            src="./logo-text.svg"
            alt="logo"
            fill
            sizes="30vw"
            className="object-contain"
          />
        </div>
        <h3 className="from-primary/50 to-primary bg-linear-to-t bg-clip-text text-center text-xl font-bold text-transparent md:text-4xl">
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
        <Button size="lg" className="mt-12 md:mt-6">
          Get Started!
        </Button>
      </div>
    </main>
  );
}
