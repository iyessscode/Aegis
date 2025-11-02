"use client";

import z from "zod";

import { useAegis } from "@/providers/aegis-provider";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

export default function SignUpForm() {
  const { signUpCredential, isLoading } = useAegis();

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
      await signUpCredential({
        name: value.name,
        email: value.email,
        password: value.password,
        callbackURL: "/welcome",
      });
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
                disabled={isLoading.global}
              />
            )}
          </form.AppField>
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
