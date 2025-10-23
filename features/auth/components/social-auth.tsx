"use client";

import { LoaderIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useAuthStore } from "@/store/use-auth-store";

import { Button } from "@/components/ui/button";

const PROVIDERS = [
  {
    name: "google",
    Icon: FcGoogle,
  },
  {
    name: "github",
    Icon: FaGithub,
  },
] as const;

export const SocialAuth = () => {
  const isLoading = useAuthStore((state) => state.loading);
  const signInSocial = useAuthStore((state) => state.signInSocial);

  return PROVIDERS.map((provider) => (
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
