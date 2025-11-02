"use client";

import { useAegis } from "@/providers/aegis-provider";
import { useEditStore } from "@/store/use-edit-store";
import { useModalStore } from "@/store/use-modal-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserProfileForm from "@/features/user/components/form/user-profile-form";

export const DialogProfile = () => {
  const { user } = useAegis();
  const open = useModalStore((state) => state.openDialogProfile);
  const onOpenChange = useModalStore((state) => state.toggleDialogProfile);
  const toggleEdit = useEditStore((state) => state.toggleEdit);
  const isEditing = useEditStore((state) => state.isEditing);

  if (user === null) return null;

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
          image={user.image ?? null}
          name={user.name}
          email={user.email}
        />
        {!isEditing && (
          <DialogFooter>
            <Button onClick={toggleEdit}>Edit Profile</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
