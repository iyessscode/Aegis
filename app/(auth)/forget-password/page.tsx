import { AuthContainer } from "@/features/auth/components/auth-container";
import ForgetPasswordForm from "@/features/auth/components/form/forget-password-form";

export default function ForgetPasswordPage() {
  return (
    <AuthContainer
      title="Forgot password"
      description="Enter your email address and we'll send you a link to reset your password."
      content={<ForgetPasswordForm />}
      useSocialAuth={false}
    />
  );
}
