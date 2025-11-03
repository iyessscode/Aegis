import { Suspense } from "react";

import { AuthContainer } from "@/features/auth/components/auth-container";
import ResetPasswordForm from "@/features/auth/components/form/reset-password-form";

type Props = {
  searchParams: Promise<{ token: string }>;
};

export default function ResetPasswordPage({ searchParams }: Props) {
  return (
    <AuthContainer
      title="Reset Password"
      description="Please enter your new password to reset your account password."
      content={
        <Suspense>
          <CachedComponent searchParams={searchParams} />
        </Suspense>
      }
      useSocialAuth={false}
    />
  );
}

const CachedComponent = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return <ResetPasswordForm token={token} />;
};
