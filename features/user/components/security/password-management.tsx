"use client";

import ButtonPassword from "@/features/user/components/security/components/button-password";
import { checkIfUserHasPassword } from "@/features/user/user-queries";
import { useEffect, useState } from "react";

export default function PasswordManagement() {
  const [hasPassword, setHasPassword] = useState(false);
  // const hasPassword = await checkIfUserHasPassword();

  useEffect(() => {
    (async () =>
      await checkIfUserHasPassword().then((res) => setHasPassword(res)))();
  }, []);

  return (
    <div className="flex flex-row items-center justify-between border-b py-2">
      <h3 className="text-sm font-medium">Password</h3>
      <span className="max-w-48 truncate text-sm font-extralight md:max-w-80">
        {hasPassword && "••••••••"}
      </span>
      <ButtonPassword hasPassword={hasPassword} />
    </div>
  );
}
