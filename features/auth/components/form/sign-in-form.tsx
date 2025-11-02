"use client";

import z from "zod";

import { useAegis } from "@/providers/aegis-provider";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

export default function SignInForm() {
  const { signInCredential, isLoading } = useAegis();

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
      await signInCredential({
        email: value.email,
        password: value.password,
        callbackURL: "/welcome",
      });
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
                disabled={isLoading.global}
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.InputPassword
                label="Password"
                placeholder="Enter your password"
                linkForgetPassword="/forget-password"
                disabled={isLoading.global}
              />
            )}
          </form.AppField>
        </FieldSet>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading.global}
          className="w-full"
        >
          <LoadingSwap
            isLoading={isLoading.global && isLoading.provider === "credential"}
          >
            Continue
          </LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
}
