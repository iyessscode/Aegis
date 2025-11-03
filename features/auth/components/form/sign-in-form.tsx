"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";
import { useAuthLoadingStore } from "@/store/use-auth-loading-store";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

export default function SignInForm() {
  const router = useRouter();

  const { loading, setLoading, clearLoading } = useAuthLoadingStore();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Please enter a valid email address"),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/welcome",
        },
        {
          onRequest: () => setLoading("credential"),
          onResponse: clearLoading,
          onSuccess(ctx) {
            toast.success(`Welcome, ${ctx.data.user.name}!`);
          },
          async onError(ctx) {
            if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
              await authClient.sendVerificationEmail(
                {
                  email: value.email,
                  callbackURL: "/welcome",
                },
                {
                  onError(ctx) {
                    toast.error(ctx.error.message);
                  },
                },
              );

              const params = new URLSearchParams({
                email: value.email,
              });

              router.push(`/verify-email?${params.toString()}`);
            } else {
              toast.error(ctx.error.message);
            }
          },
        },
      );
    },
  });
  return (
    <form
      id="sign-in-credential"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <form.AppField name="email">
            {(field) => (
              <field.InputText
                label="Email address"
                placeholder="Enter your email address"
                disabled={loading.global}
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.InputPassword
                label="Password"
                placeholder="Enter your password"
                linkForgetPassword="/forget-password"
                disabled={loading.global}
              />
            )}
          </form.AppField>
        </FieldSet>
        <Button
          type="submit"
          size="lg"
          disabled={loading.global}
          className="w-full"
        >
          <LoadingSwap
            isLoading={loading.global && loading.provider === "credential"}
          >
            Continue
          </LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
}
