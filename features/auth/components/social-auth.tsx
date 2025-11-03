"use client";

import { toast } from "sonner";

import { LoaderIcon } from "lucide-react";

import { authClient } from "@/config/auth/client";
import { SocialProviders, socialProviders } from "@/lib/providers";
import { useAuthLoadingStore } from "@/store/use-auth-loading-store";

import { Button } from "@/components/ui/button";

export const SocialAuth = () => {
  const { loading, setLoading, clearLoading } = useAuthLoadingStore();

  const signInSocial = async ({
    provider,
    callbackURL,
  }: {
    provider: SocialProviders;
    callbackURL: string;
  }) => {
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

  return socialProviders.map((provider) => (
    <Button
      key={provider.name}
      variant="outline"
      onClick={() =>
        signInSocial({ provider: provider.name, callbackURL: "/welcome" })
      }
      disabled={loading.global}
    >
      {loading.provider === provider.name ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <provider.Icon />
      )}
      <span className="capitalize">{provider.name}</span>
    </Button>
  ));
};
