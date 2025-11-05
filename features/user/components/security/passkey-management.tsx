import { useSecurityStore } from "@/store/use-security-store";
import UserSetPasskey from "../form/user-set-passkey";
import UserSettingLayout from "../form/user-setting-layout";
import ButtonPasskey from "./components/button-passkey";

export default function PasskeyManagement() {
  const { isSetPasskey } = useSecurityStore();
  return (
    <UserSettingLayout label="Passkeys" isEditing={false}>
      {isSetPasskey && <UserSetPasskey />}
      {!isSetPasskey && <ButtonPasskey />}
    </UserSettingLayout>
  );
}
