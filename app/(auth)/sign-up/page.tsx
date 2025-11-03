import Link from "next/link";
import { Suspense } from "react";

import { AuthContainer } from "@/features/auth/components/auth-container";
import SignUpForm from "@/features/auth/components/form/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthContainer
      title="Create an account"
      description={
        <>
          Already have an Account?{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Sign In
          </Link>
        </>
      }
      content={
        <Suspense>
          <SignUpForm />
        </Suspense>
      }
    />
  );
}
