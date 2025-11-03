import { AuthContainer } from "@/features/auth/components/auth-container";
import ResetPasswordForm from "@/features/auth/components/form/reset-password-form";

type Props = {
  searchParams: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <AuthContainer
      title="Reset Password"
      description="Please enter your new password to reset your account password."
      content={<ResetPasswordForm token={token} />}
      useSocialAuth={false}
    />
  );
}
