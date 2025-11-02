"use client";

import z from "zod";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { authClient } from "@/config/auth/client";
import { useAppForm } from "@/features/form/hooks/form-hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();

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
          onSuccess() {
            toast.success("Password has been reset successfully");
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
            {(field) => <field.InputPassword label="New Password" />}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => <field.InputPassword label="Confirm Password" />}
          </form.AppField>
        </FieldSet>
        <Button type="submit">Reset Password</Button>
      </FieldGroup>
    </form>
  );
}
