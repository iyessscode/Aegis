import { cn } from "@/lib/utils";

import { useSecurityStore } from "@/store/use-security-store";

import UserSettingLayout from "@/features/modals/components/form/user-setting-layout";

import ButtonTwoFA from "../action-button/button-2fa";
import UserEnable2FA from "../form/user-enable-2fa";

export default function TwoFAManagement() {
  const { isEnable2FA } = useSecurityStore();

  return (
    <UserSettingLayout label="2FA" isEditing={isEnable2FA}>
      <>
        {isEnable2FA && <UserEnable2FA />}
        {!isEnable2FA && (
          <div
            className={cn(
              "flex flex-row items-center md:gap-4",
              isEnable2FA ? "justify-between" : "md:justify-end",
            )}
          >
            {isEnable2FA && <span>••••••••</span>}
            <ButtonTwoFA />
          </div>
        )}
      </>
    </UserSettingLayout>
  );
}
