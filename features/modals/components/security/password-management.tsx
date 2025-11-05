import { useEffect, useState } from "react";

import { useSecurityStore } from "@/store/use-security-store";

import UserSetPassword from "@/features/modals/components/form/user-set-password";
import UserUpdatePassword from "@/features/modals/components/form/user-update-password";
import ButtonPassword from "@/features/modals/components/action-button/button-password";
import { checkIfUserHasPassword } from "@/features/user/user-queries";
import { cn } from "@/lib/utils";
import UserSettingLayout from "../form/user-setting-layout";

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
    <UserSettingLayout
      label="Password"
      isEditing={isUpdatePassword || isSetPassword}
    >
      <>
        {isUpdatePassword && <UserUpdatePassword />}
        {isSetPassword && <UserSetPassword />}
        {!isUpdatePassword && !isSetPassword && (
          <div
            className={cn(
              "flex flex-row items-center md:gap-4",
              hasPassword ? "justify-between" : "md:justify-end",
            )}
          >
            {hasPassword && <span>••••••••</span>}
            <ButtonPassword hasPassword={hasPassword} />
          </div>
        )}
      </>
    </UserSettingLayout>
  );
}
