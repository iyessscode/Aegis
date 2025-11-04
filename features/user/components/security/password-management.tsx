import { useEffect, useState } from "react";

import { useSecurityStore } from "@/store/use-security-store";

import UserSetPassword from "@/features/user/components/form/user-set-password";
import UserUpdatePassword from "@/features/user/components/form/user-update-password";
import ButtonPassword from "@/features/user/components/security/components/button-password";
import { checkIfUserHasPassword } from "@/features/user/user-queries";

export default function PasswordManagement() {
  const [hasPassword, setHasPassword] = useState(false);

  const { isUpdatePassword, isSetPassword } = useSecurityStore();

  useEffect(() => {
    const checkPassword = async () => {
      const hasPassword = await checkIfUserHasPassword();
      setHasPassword(hasPassword);
    };
    checkPassword();
  }, [setHasPassword]);

  return (
    <div className="flex flex-row items-center justify-between gap-4 border-b py-2">
      <h3 className="text-sm font-medium">Password</h3>
      {isUpdatePassword && <UserUpdatePassword />}
      {isSetPassword && <UserSetPassword />}
      {!isUpdatePassword && !isSetPassword && (
        <>
          <span className="max-w-48 truncate text-sm font-extralight md:max-w-80">
            {hasPassword && "••••••••"}
          </span>
          <ButtonPassword hasPassword={hasPassword} />
        </>
      )}
    </div>
  );
}
