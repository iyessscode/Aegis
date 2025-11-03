import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

import { AuthContainer } from "@/features/auth/components/auth-container";

type Props = {
  searchParams: Promise<{
    email: string;
    type: "reset-password" | "verify-email";
  }>;
};

export default function VerifyEmail({ searchParams }: Props) {
  return (
    <AuthContainer
      title="Check your inbox"
      description={
        <Suspense>
          <CachedComponent searchParams={searchParams} />
        </Suspense>
      }
      content={
        <div className="grid place-items-center">
          <Button className="mx-auto" asChild>
            <Link href="/">Back to home page</Link>
          </Button>
        </div>
      }
      useSocialAuth={false}
    />
  );
}

const CachedComponent = async ({ searchParams }: Props) => {
  const { email, type } = await searchParams;

  return (
    <>
      We've sent you a{" "}
      {type === "reset-password" ? "password reset" : "verification"} email to{" "}
      <strong>{email}</strong>. <br />
      Please follow the instructions in the email to proceed.
    </>
  );
};
