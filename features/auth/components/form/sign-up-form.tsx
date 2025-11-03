"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";
import { useLoadingStore } from "@/store/use-loading-store";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

export default function SignUpForm() {
  const router = useRouter();
  const { loading, setLoading, clearLoading } = useLoadingStore();

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
        email: z.email("Please enter a valid email address"),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: "/welcome",
        },
        {
          onRequest: () => setLoading("credential"),
          onResponse: clearLoading,
          onSuccess() {
            const params = new URLSearchParams({
              email: value.email,
            });

            router.push(`/verify-email?${params.toString()}`);
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
      id="sign-up-credential"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <form.AppField name="name">
            {(field) => (
              <field.InputText
                label="Name"
                placeholder="Enter your name"
                disabled={loading.global}
              />
            )}
          </form.AppField>
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
