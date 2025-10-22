"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignIn, SignUp, signInSchema } from "@/features/auth/schema";
import Link from "next/link";
import { AuthCard } from "../components/auth-card";
import { InputField } from "../components/input-field";

type Props = {
  type: "sign-in" | "sign-up";
};

export const AuthForm = ({ type }: Props) => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";

  const handleCredentialAuth = () => {
    if (isSignIn) {
      const signInData = form.getValues() as SignIn;
      console.log("Sign In: ", { signInData });
    } else {
      const signUpData = form.getValues() as SignUp;
      console.log("Sign Up: ", signUpData);
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
                <InputField control={form.control} name="name" label="Name" />
              )}
              <InputField
                control={form.control}
                name="email"
                label="Email Address"
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
              />
            </FieldGroup>

            <Button type="submit" size="lg" className="mt-12 w-full">
              Continue
            </Button>
          </form>
        </>
      }
    />
  );
};
