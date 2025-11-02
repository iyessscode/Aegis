"use client";

import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/config/auth/client";
import { AllProviders, SocialProviders } from "@/lib/providers";
import { useLoadingStore } from "@/store/use-loading-store";

import { DialogProfile } from "@/features/modals/dialog-profile";
import { DialogSecurity } from "@/features/modals/dialog-security";

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

type UpdateUserParams = {
  name: string;
  email: string;
  image: string | null;
  imageKey: string | null;
};

type AegisContextType = {
  // States
  isLoading: {
    global: boolean;
    provider: AllProviders;
  };
  user: User | null;

  // Actions
  signInCredential: (params: SignInCredentialParams) => Promise<void>;
  signUpCredential: (params: SignUpCredentialParams) => Promise<void>;
  signInSocial: (params: SignInSocialParams) => Promise<void>;
  updateUser: (params: UpdateUserParams) => Promise<void>;
};

const AegisContext = createContext<AegisContextType | undefined>(undefined);

export function AegisProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      }
    })();
  }, []);

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
        onRequest: () => setLoading("credential"),
        onResponse: clearLoading,
        onSuccess(ctx) {
          toast.success(`Welcome, ${ctx.data.user.name}!`);
          router.push("/welcome");
        },
        async onError(ctx) {
          console.log("ERROR_SIGN_IN_CREDENTIAL: ", ctx.error);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            await authClient.sendVerificationEmail(
              {
                email,
                callbackURL: "/welcome",
              },
              {
                onError(ctx) {
                  console.log(
                    "ERROR_SIGN_IN_CREDENTIAL_SEND_VERIFICATION_SIGN_IN: ",
                    ctx.error,
                  );
                  toast.error(ctx.error.message);
                },
              },
            );

            const params = new URLSearchParams({
              email,
            });

            toast.success("Please check your email for the verification code");
            router.push(`/verify-email?${params.toString()}`);
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
        onRequest: () => setLoading("credential"),
        onResponse: clearLoading,
        onSuccess() {
          const params = new URLSearchParams({
            email,
          });

          toast.success("Welcome. Please verify your email address!");
          router.push(`/verify-email?${params.toString()}`);
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
        onRequest: () => setLoading(provider),
        onResponse: clearLoading,
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

  const updateUser = async ({
    name,
    email,
    image,
    imageKey,
  }: UpdateUserParams) => {
    try {
      const results = await Promise.all([
        authClient.updateUser({
          name,
          image,
          image_key: imageKey,
        }),
        email !== user?.email
          ? (() => {
              return authClient.changeEmail(
                {
                  newEmail: email,
                  callbackURL: `/verify-email?email=${email}`,
                },
                {
                  onSuccess() {},
                  onError(ctx) {
                    console.log("ERROR_CHANGE_EMAIL: ", ctx.error);
                  },
                },
              );
            })()
          : Promise.resolve({ error: false }),
      ]);

      const [updateResult, emailResult] = results;
      if (updateResult.error) toast.error(updateResult.error.message);
      if (emailResult.error && typeof emailResult.error != "boolean")
        toast.error(emailResult.error.message);

      if (user?.email !== email) {
        toast.success("Verify your new email address to complete the change.");
      } else {
        toast.success("Profile updated successfully");
      }

      router.refresh();
    } catch (error) {
      console.log("ERROR_UPDATE_USER: ", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <AegisContext.Provider
      value={{
        user,
        isLoading,
        signInSocial,
        signUpCredential,
        signInCredential,
        updateUser,
      }}
    >
      <DialogProfile />
      <DialogSecurity />
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
