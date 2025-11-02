import { auth } from "@/config/auth/server";
import { VerifyOTPForm } from "@/features/auth/components/form/verify-otp-form";
import { SubjectType } from "@/lib/email";
import { OTPPurpose } from "@/providers/aegis-provider";

type Props = {
  searchParams: Promise<{
    email: string;
    type: SubjectType;
    purpose: OTPPurpose;
  }>;
};

export default async function VerifyOTPPage({ searchParams }: Props) {
  const { email, type, purpose } = await searchParams;

  return <VerifyOTPForm email={email} type={type} purpose={purpose} />;
}
