"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/use-auth-store";

import { LoadingSwap } from "@/components/loading-swap";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";

import { AuthCard } from "@/features/auth/components/auth-card";
import { InputField } from "@/features/auth/components/input-field";
import { SocialAuth } from "@/features/auth/components/social-auth";
import { SignIn, SignUp, authSchema } from "@/features/auth/schema";

type Props = {
  type: "sign-in" | "sign-up";
};

export const AuthForm = ({ type }: Props) => {
  const router = useRouter();
  const isLoading = useAuthStore((state) => state.loading);
  const signInCredential = useAuthStore((state) => state.signInCredential);
  const signUpCredential = useAuthStore((state) => state.signUpCredential);

  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";

  const handleCredentialAuth = async () => {
    if (isSignIn) {
      const { email, password } = form.getValues() as SignIn;
      await signInCredential({
        email,
        password,
        onSuccess: () => router.push("/welcome"),
      });
    } else {
      const { name, email, password } = form.getValues() as SignUp;
      await signUpCredential({
        name,
        email,
        password,
        onSuccess: () => router.push("/welcome"),
      });
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
                  placeholder="Enter your name"
                  disabled={isLoading.global}
                  autoComplete="name"
                />
              )}
              <InputField
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
                disabled={isLoading.global}
                autoComplete="email"
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                disabled={isLoading.global}
                autoComplete="off"
                showForgotPassword={isSignIn}
              />
            </FieldGroup>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading.global}
              className="mt-12 w-full"
            >
              <LoadingSwap
                isLoading={
                  isLoading.global && isLoading.provider === "credential"
                }
              >
                Continue
              </LoadingSwap>
            </Button>
          </form>
          <FieldSeparator className="mt-4">Or continue with</FieldSeparator>
        </>
      }
      footer={
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <SocialAuth />
        </div>
      }
    />
  );
};
