"use client";

import { toast } from "sonner";
import { create } from "zustand";

import { authClient } from "@/config/auth/client";
import { users } from "@/db/schema";

// ---------------------------
// Types
// ---------------------------

type SocialProvider = "google" | "github";

type LoadingState = {
  global: boolean;
  provider: SocialProvider | "credential" | null;
};

type User = typeof users.$inferSelect;

type CredentialAuthParams = {
  email: string;
  password: string;
  onSuccess?: () => void;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  onSuccess?: () => void;
};

type SignOutParams = {
  onSuccess: () => void;
};

type SignInSocialParams = {
  provider: SocialProvider;
  callbackURL: string;
};

type State = {
  loading: LoadingState;
};

type Action = {
  signInCredential: (params: CredentialAuthParams) => Promise<void>;
  signUpCredential: (params: SignUpParams) => Promise<void>;
  signInSocial: (params: SignInSocialParams) => Promise<void>;
  signOut: (params: SignOutParams) => Promise<void>;
};

// ---------------------------
// Zustand Store
// ---------------------------

export const useAuthStore = create<State & Action>()((set) => ({
  loading: { global: false, provider: null },

  // ---------------------------
  // SIGN IN
  // ---------------------------
  signInCredential: async ({ email, password, onSuccess }) => {
    set({ loading: { global: true, provider: "credential" } });

    const { data, error } = await authClient.signIn.email({ email, password });

    set({ loading: { global: false, provider: null } });

    if (error) {
      const message =
        error.status === 429
          ? "Verify your email address!"
          : error.message || "Sign-in failed";
      toast.error(message);
      return;
    }

    if (data?.user) {
      toast.success(`Welcome back, ${data.user.name}!`);
      onSuccess?.();
    }
  },

  // ---------------------------
  // SIGN UP
  // ---------------------------
  signUpCredential: async ({ name, email, password, onSuccess }) => {
    set({ loading: { global: true, provider: "credential" } });

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    set({ loading: { global: false, provider: null } });

    if (error) {
      toast.error(error.message || "Sign-up failed");
      return;
    }

    toast.success("Welcome. Please sign in to continue!");
    onSuccess?.();
  },

  // ---------------------------
  // SIGN IN SOCIAL
  // ---------------------------
  signInSocial: async ({ provider, callbackURL }) => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL,
      },

      {
        onRequest() {
          set({ loading: { global: true, provider } });
        },
        onResponse() {
          set({ loading: { global: false, provider: null } });
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );
  },

  // ---------------------------
  // SIGN OUT
  // ---------------------------
  signOut: async ({ onSuccess }) => {
    await authClient.signOut(
      {},
      {
        onSuccess() {
          onSuccess?.();
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
        onRequest() {
          set({ loading: { global: true, provider: null } });
        },
        onResponse() {
          set({ loading: { global: false, provider: null } });
        },
      },
    );
  },
}));
