"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getSubjectText, SubjectType } from "@/lib/email";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { AuthCard } from "@/features/auth/components/auth-card";
import { InputOTPField } from "@/features/auth/components/input-otp-field";
import { VerifyOTP, verifyOtpSchema } from "@/features/auth/schema";

type Props = {
  email: string;
  type: SubjectType;
};

export const VerifyOTPForm = ({ email, type }: Props) => {
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const handleVerifyOtp = async (values: VerifyOTP) => {
    console.log(values);
  };

  return (
    <AuthCard
      title={getSubjectText(type)}
      description={
        <>
          {"One Time Password (OTP) has been sent via Email to"}
          <br />
          <strong className="text-foreground">{email}</strong>
        </>
      }
      content={
        <form onSubmit={form.handleSubmit(handleVerifyOtp)}>
          <FieldGroup>
            <InputOTPField
              control={form.control}
              name="otpCode"
              disabled={form.formState.isSubmitting}
              autoComplete="one-time-code"
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-4 w-full"
            >
              <LoadingSwap isLoading={form.formState.isSubmitting}>
                Verify
              </LoadingSwap>
            </Button>
          </FieldGroup>
        </form>
      }
      footer={
        <div className="flex w-full flex-row items-center justify-center gap-x-2">
          <p className="text-muted-foreground text-sm tracking-tight">
            Don&apos; recive the code?
          </p>
          <Button type="button" variant="link" className="px-0">
            Resend
          </Button>
        </div>
      }
    />
  );
};
