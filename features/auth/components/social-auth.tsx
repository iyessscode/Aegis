"use client";

import { LoaderIcon } from "lucide-react";

import { useAegis } from "@/context/aegis-provider";
import { socialProviders } from "@/lib/providers";

import { Button } from "@/components/ui/button";

export const SocialAuth = () => {
  const { signInSocial, isLoading } = useAegis();

  return socialProviders.map((provider) => (
    <Button
      key={provider.name}
      variant="outline"
      onClick={() =>
        signInSocial({ provider: provider.name, callbackURL: "/welcome" })
      }
      disabled={isLoading.global}
    >
      {isLoading.provider === provider.name ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <provider.Icon />
      )}
      <span className="capitalize">{provider.name}</span>
    </Button>
  ));
};
