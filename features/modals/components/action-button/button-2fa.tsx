"use client";

import { useSecurityStore } from "@/store/use-security-store";

import { Button } from "@/components/ui/button";

export default function ButtonTwoFA() {
  const { toggle2FA, isEnable2FA } = useSecurityStore();
  if (isEnable2FA) {
    return (
      <Button variant="ghost" onClick={toggle2FA} className="text-primary">
        Update password
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggle2FA}
      className="text-primary flex w-full justify-start"
    >
      + Enable Two-Factor Authentication
    </Button>
  );
}
