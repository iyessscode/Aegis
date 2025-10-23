"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/config/auth/client";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data == null) router.push("/sign-in");
    });
  }, [router]);

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center">
        <LoaderIcon className="text-primary size-16 animate-spin" />
      </main>
    );
  }

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
          Welcome,{" "}
          <span className="from-primary/50 to-primary bg-linear-to-t bg-clip-text text-center text-transparent">
            {data?.user.name}!
          </span>
        </h3>
        <div className="mt-8">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => {
              authClient.signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
}
