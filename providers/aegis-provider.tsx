"use client";

import { DialogProfile } from "@/features/modals/dialog-profile";
import { DialogSecurity } from "@/features/modals/dialog-security";
import { UploadThingSSR } from "@/features/uploadthing/components/uploadthing-ssr";

export function AegisProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UploadThingSSR />
      <DialogProfile />
      <DialogSecurity />
      {children}
    </>
  );
}
