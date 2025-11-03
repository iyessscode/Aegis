import Image from "next/image";
import Link from "next/link";

import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="mx-auto h-screen max-w-7xl">
      <header className="h-16 px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="relative h-16 w-32">
              <Image
                src="./logo-text.svg"
                alt="logo"
                fill
                sizes="16vw"
                className="object-contain"
              />
            </div>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="bg-muted border-none"
            asChild
          >
            <Link href="/">
              <XIcon className="text-primary" />
            </Link>
          </Button>
        </div>
      </header>
      <div className="mx-auto grid h-[calc(100vh-4rem)] max-w-md place-items-center">
        {children}
      </div>
    </div>
  );
}
