"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { toast } from "sonner";

import { authClient } from "@/config/auth/client";
import { useLoadingStore } from "@/store/use-loading-store";

import { SubjectType } from "@/lib/email";
import { AllProviders, SocialProviders } from "@/lib/providers";

type SignInCredentialParams = {
  email: string;
  password: string;
  callbackURL?: string;
};

type SignUpCredentialParams = SignInCredentialParams & {
  name: string;
};

type SignInSocialParams = {
  provider: SocialProviders;
  callbackURL: string;
};

type OTPParams = {
  email: string;
  otpCode: string;
  type: SubjectType;
};

type AegisContextType = {
  // States
  isLoading: {
    global: boolean;
    provider: AllProviders;
  };

  // Actions
  signInCredential: (params: SignInCredentialParams) => Promise<void>;
  signUpCredential: (params: SignUpCredentialParams) => Promise<void>;
  signInSocial: (params: SignInSocialParams) => Promise<void>;
  emailOtp: (params: OTPParams) => Promise<void>;
};

const AegisContext = createContext<AegisContextType | undefined>(undefined);

export function AegisProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const setLoading = useLoadingStore((state) => state.setLoading);
  const clearLoading = useLoadingStore((state) => state.clearLoading);
  const isLoading = useLoadingStore((state) => state.loading);

  const signInCredential = async ({
    email,
    password,
    callbackURL,
  }: SignInCredentialParams) => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL,
      },
      {
        onRequest() {
          setLoading("credential");
        },
        onResponse() {
          clearLoading();
        },
        onSuccess(ctx) {
          toast.success(`Welcome, ${ctx.data.user.name}!`);
          router.push("/welcome");
        },
        onError(ctx) {
          console.log("ERROR_SIGN_IN_CREDENTIAL: ", ctx.error);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            const params = new URLSearchParams();
            params.append("email", email);
            params.append("type", "email-verification");

            toast.success("Please check your email for the verification code");
            router.push(`/verify-otp?${params.toString()}`);
          } else {
            toast.error(ctx.error.message);
          }
        },
      },
    );
  };

  const signUpCredential = async ({
    name,
    email,
    password,
    callbackURL,
  }: SignUpCredentialParams) => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL,
      },
      {
        onRequest() {
          setLoading("credential");
        },
        onResponse() {
          clearLoading();
        },
        onSuccess() {
          const params = new URLSearchParams();
          params.append("email", email);
          params.append("type", "email-verification");

          toast.success("Welcome. Please verify your email address!");
          router.push(`/verify-otp?${params.toString()}`);
        },
        onError(ctx) {
          console.log("ERROR_SIGN_UP_CREDENTIAL: ", ctx.error);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const signInSocial = async ({
    provider,
    callbackURL,
  }: SignInSocialParams) => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL,
      },
      {
        onRequest() {
          setLoading(provider);
        },
        onResponse() {
          clearLoading();
        },
        onSuccess(ctx) {
          if (ctx.data.redirect) {
            window.location.href = ctx.data.url;
          }
        },
        onError(ctx) {
          console.log("ERROR_SIGN_IN_SOCIAL: ", ctx.error);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const emailOtp = async ({ email, otpCode, type }: OTPParams) => {
    if (type === "email-verification") {
      await authClient.emailOtp.verifyEmail(
        {
          email,
          otp: otpCode,
        },
        {
          onSuccess(ctx) {
            toast.success(
              `Welcome, ${ctx.data.user.name}, Please sign in to continue`,
            );
            router.push("/sign-in");
          },
          onError(ctx) {
            console.log("ERROR_EMAIL_OTP_EMAIL_VERIFICATION: ", ctx.error);

            if (ctx.error.code === "INVALID_OTP") {
              toast.error("Invalid or expired OTP code. Please try again.");
            } else if (ctx.error.code === "OTP_EXPIRED") {
              toast.error(
                "Your verification code has expired. Request a new one.",
              );
            } else {
              toast.error(ctx.error.message);
            }
          },
        },
      );
    } else if (type === "sign-in") {
      await authClient.signIn.emailOtp(
        {
          email,
          otp: otpCode,
        },
        {
          onSuccess(ctx) {
            toast.success(`Welcome, ${ctx.data.user.name}!`);
            router.push("/welcome");
          },
          onError(ctx) {
            console.log("ERROR_EMAIL_OTP_SIGN_IN: ", ctx.error);
            if (ctx.error.code === "INVALID_OTP") {
              toast.error("Invalid or expired OTP code. Please try again.");
            } else if (ctx.error.code === "OTP_EXPIRED") {
              toast.error(
                "Your verification code has expired. Request a new one.",
              );
            } else {
              toast.error(ctx.error.message);
            }
          },
        },
      );
    } else {
      authClient.emailOtp.checkVerificationOtp(
        {
          type,
          email,
          otp: otpCode,
        },
        {
          onSuccess() {
            const params = new URLSearchParams();
            params.append("email", email);
            params.append("otp", otpCode);
            router.push(`/reset-password?${params.toString()}`);
          },
          onError(ctx) {
            console.log("ERROR_EMAIL_OTP_FORGET_PASSWORD: ", ctx.error);

            if (ctx.error.code === "INVALID_OTP") {
              toast.error("Invalid or expired OTP code. Please try again.");
            } else if (ctx.error.code === "OTP_EXPIRED") {
              toast.error(
                "Your verification code has expired. Request a new one.",
              );
            } else {
              toast.error(ctx.error.message);
            }
          },
        },
      );
    }
  };

  return (
    <AegisContext.Provider
      value={{
        isLoading,
        signInSocial,
        signUpCredential,
        signInCredential,
        emailOtp,
      }}
    >
      {children}
    </AegisContext.Provider>
  );
}

export function useAegis() {
  const context = useContext(AegisContext);

  if (!context) {
    throw new Error("useAegis must be used within AegisProvider");
  }

  return context;
}
