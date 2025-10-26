import { VerifyOTPForm } from "@/features/auth/form/verify-otp-form";
import { SubjectType } from "@/lib/email";

type Props = {
  searchParams: Promise<{ email: string; type: SubjectType }>;
};

export default async function VerifyOTPPage({ searchParams }: Props) {
  const { email, type } = await searchParams;

  return <VerifyOTPForm email={email} type={type}/>;
}
