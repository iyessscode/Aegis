"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useEditProfileStore } from "@/store/use-edit-profile-store";

type Props = {
  children: React.ReactNode;
};

export default function ButtonEdit({ children }: Props) {
  const { toggleEdit, isEditing } = useEditProfileStore();

  return (
    !isEditing && (
      <DialogFooter>
        <Button onClick={toggleEdit}>{children}</Button>
      </DialogFooter>
    )
  );
}
