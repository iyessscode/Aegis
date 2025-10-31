"use client";

import Image from "next/image";

import { UserButton } from "@/features/user/components/user-button";

export default function WelcomePage() {
  return (
    <main className="relative grid h-screen place-items-center">
      <div className="overflow-hidden-z-50 absolute inset-0">
        <div className="from-primary/20 absolute top-1/2 left-1/2 -z-50 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial to-transparent blur-3xl" />
      </div>

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
        <h3 className="text-muted-foreground text-xl font-bold md:text-4xl">
          Welcome
        </h3>
        <div className="mt-8">
          <UserButton />
        </div>
      </div>
    </main>
  );
}
