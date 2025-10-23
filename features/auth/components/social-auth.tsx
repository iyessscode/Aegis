"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { authClient } from "@/config/auth/client";

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
  const handleSocialAuth = async (
    provider: (typeof PROVIDERS)[number]["name"],
  ) => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/welcome",
      },
      {
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return PROVIDERS.map((provider) => (
    <Button
      key={provider.name}
      variant="outline"
      onClick={() => handleSocialAuth(provider.name)}
    >
      <provider.Icon />
      <span className="capitalize">{provider.name}</span>
    </Button>
  ));
};
