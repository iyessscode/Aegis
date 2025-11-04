"use client";

import { useSecurityStore } from "@/store/use-security-store";

import { Button } from "@/components/ui/button";

type Props = {
  hasPassword: Boolean;
};

export default function ButtonPassword({ hasPassword }: Props) {
  const { toggleSetPassword, toggleUpdatePassword } = useSecurityStore();
  if (hasPassword) {
    return (
      <Button
        variant="ghost"
        onClick={toggleUpdatePassword}
        className="text-primary"
      >
        Update password
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleSetPassword}
      className="text-primary flex w-full justify-start"
    >
      Set password
    </Button>
  );
}
