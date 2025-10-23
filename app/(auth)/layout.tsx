"use client";

import { authClient } from "@/config/auth/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session?.data != null) router.push("/welcome");
    });
  }, [router]);

  return (
    <div className="mx-auto grid h-screen w-full place-items-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-y-6">
        <Link href="/">
          <div className="relative mx-auto h-10 w-32 md:h-16 md:w-56">
            <Image
              src="./logo-text.svg"
              alt="logo"
              fill
              sizes="16vw"
              className="object-contain"
            />
          </div>
        </Link>
        <main className="w-full max-w-lg px-4">{children}</main>
      </div>
    </div>
  );
}
