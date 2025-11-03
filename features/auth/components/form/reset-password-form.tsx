"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useAppForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: z
        .object({
          password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
          confirmPassword: z.string().min(8),
        })
        .refine((d) => d.password === d.confirmPassword, {
          path: ["confirmPassword"],
          message: "Passwords do not match",
        }),
    },
    onSubmit: async ({ value }) => {
      await authClient.resetPassword(
        {
          newPassword: value.password,
          token,
        },
        {
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onSuccess() {
            toast.success(
              "Password has been reset successfully. Please sign in to continue",
            );
            router.push("/sign-in");
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <form.AppField name="password">
            {(field) => (
              <field.InputPassword label="New Password" disabled={isLoading} />
            )}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => (
              <field.InputPassword
                label="Confirm Password"
                disabled={isLoading}
              />
            )}
          </form.AppField>
        </FieldSet>
        <Button type="submit" disabled={isLoading}>
          <LoadingSwap isLoading={isLoading}>Reset Password</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
}
