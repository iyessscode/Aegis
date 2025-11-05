"use client";

import { Button } from "@/components/ui/button";
import { useSecurityStore } from "@/store/use-security-store";

export default function ButtonPasskey() {
  const { toggleSetPasskey, toggleUpdatePasskey } = useSecurityStore();
  return (
    <Button
      variant="ghost"
      onClick={toggleSetPasskey}
      className="text-primary flex w-full justify-start"
    >
      + Add a passkey
    </Button>
  );
}
