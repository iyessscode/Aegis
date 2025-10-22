"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/config/auth/client";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { AuthCard } from "@/features/auth/components/auth-card";
import { InputField } from "@/features/auth/components/input-field";
import { SignIn, SignUp, authSchema } from "@/features/auth/schema";

type Props = {
  type: "sign-in" | "sign-up";
};

export const AuthForm = ({ type }: Props) => {
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";
  const { isSubmitting } = form.formState;

  const handleCredentialAuth = async () => {
    if (isSignIn) {
      const signInData = form.getValues() as SignIn;
      console.log("Sign In: ", signInData);
      await authClient.signIn.email(
        {
          ...signInData,
        },
        {
          onSuccess() {
            toast.success(`Welcome Back!`);
            form.reset();
          },
          onError(ctx) {
            if (ctx.error.status === 403) {
              toast.success("Please verify your email address");
            } else {
              toast.error(ctx.error.message);
            }
          },
        },
      );
    } else {
      const signUpData = form.getValues() as SignUp;
      console.log("Sign Up: ", signUpData);
      await authClient.signUp.email(
        {
          ...signUpData,
        },

        {
          onSuccess() {
            toast.success(`Welcome!`);
            form.reset();
          },
          onError(ctx) {
            if (ctx.error.status === 403) {
              toast.success("Please verify your email address");
            }
            toast.error(ctx.error.message);
          },
        },
      );
    }
  };

  return (
    <AuthCard
      title={isSignIn ? "Sign in to Aegis" : "Create your account"}
      description={
        <>
          {isSignIn ? "Don't have an Account?" : "Already have an Account?"}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            prefetch
            className="text-primary underline underline-offset-4"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </>
      }
      content={
        <>
          <form onSubmit={form.handleSubmit(handleCredentialAuth)}>
            <FieldGroup>
              {!isSignIn && (
                <InputField
                  control={form.control}
                  name="name"
                  label="Name"
                  disabled={isSubmitting}
                  autoComplete="name"
                />
              )}
              <InputField
                control={form.control}
                name="email"
                label="Email Address"
                disabled={isSubmitting}
                autoComplete="email"
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                disabled={isSubmitting}
                autoComplete="off"
                showForgotPassword={isSignIn}
              />
            </FieldGroup>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-12 w-full"
            >
              <LoadingSwap isLoading={isSubmitting}>Continue</LoadingSwap>
            </Button>
          </form>
        </>
      }
    />
  );
};
