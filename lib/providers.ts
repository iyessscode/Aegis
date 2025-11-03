import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const socialProviders = [
  {
    name: "google",
    Icon: FcGoogle,
  },
  {
    name: "github",
    Icon: FaGithub,
  },
] as const;

export type SocialProviders = (typeof socialProviders)[number]["name"];

export type AllProviders = SocialProviders | "credential" | null;
