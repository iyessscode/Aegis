"use client";

import { useRouter } from "next/navigation";
import z from "zod";

import { authClient } from "@/config/auth/client";

import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";
import { toast } from "sonner";

export default function ForgetPasswordForm() {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Please enter a valid email address"),
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess() {
            form.reset();
            router.push(
              `/verify-email?email=${value.email}&type=reset-password`,
            );
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
      id="forget-password"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <form.AppField name="email">
          {(field) => (
            <field.InputText
              label="Email address"
              placeholder="Enter your email address"
              // disabled={isLoading.global}
            />
          )}
        </form.AppField>
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          Send Reset Link
        </Button>
      </FieldSet>
    </form>
  );
}
