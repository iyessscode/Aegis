import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const generateAvatar = (name: string) =>
  createAvatar(adventurer, {
    seed: name,
  }).toDataUri();
