"use client";

import { DialogProfile } from "@/features/modals/dialog-profile";
import { DialogSecurity } from "@/features/modals/dialog-security";

export function AegisProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DialogProfile />
      <DialogSecurity />
      {children}
    </>
  );
}
