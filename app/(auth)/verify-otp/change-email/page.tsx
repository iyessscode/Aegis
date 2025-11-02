import { VerifyOTPForm } from "@/features/auth/components/form/verify-otp-form";

type Props = {
  searchParams: Promise<{
    email: string;
  }>;
};

export default async function VerifyOTPChangeEmailPage({
  searchParams,
}: Props) {
  const { email } = await searchParams;

  return (
    <VerifyOTPForm
      email={email}
      type="email-verification"
      purpose="change-email"
    />
  );
}
