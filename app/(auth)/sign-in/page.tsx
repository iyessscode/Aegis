import Link from "next/link";

import { AuthContainer } from "@/features/auth/components/auth-container";
import SignInForm from "@/features/auth/components/form/sign-in-form";

export default function SignInPage() {
  return (
    <AuthContainer
      title="Sign in to continue"
      description={
        <>
          Don&apos;t have an Account?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Sign Up
          </Link>
        </>
      }
      content={<SignInForm />}
    />
  );
}
