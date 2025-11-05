import { useEditProfileStore } from "@/store/use-edit-profile-store";
import { useModalStore } from "@/store/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { authClient } from "@/config/auth/client";
import ButtonEdit from "@/features/modals/components/action-button/button-edit-profile";
import UserProfileForm from "@/features/modals/components/form/user-profile-form";

export const DialogProfile = () => {
  const { data, refetch } = authClient.useSession();

  const open = useModalStore((state) => state.openDialogProfile);
  const onOpenChange = useModalStore((state) => state.toggleDialogProfile);
  const isEditing = useEditProfileStore((state) => state.isEditing);

  if (data === null) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b py-2">
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? "Edit profile" : "Profile"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Manage your profile
          </DialogDescription>
        </DialogHeader>
        <UserProfileForm
          image={data.user.image ?? null}
          name={data.user.name}
          email={data.user.email}
          refetch={refetch}
        />

        <ButtonEdit>Edit Profile</ButtonEdit>
      </DialogContent>
    </Dialog>
  );
};
