"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useEditStore } from "@/store/use-edit-store";

type Props = {
  children: React.ReactNode;
};

export default function ButtonEdit({ children }: Props) {
  const { toggleEdit, isEditing } = useEditStore();

  return (
    !isEditing && (
      <DialogFooter>
        <Button onClick={toggleEdit}>{children}</Button>
      </DialogFooter>
    )
  );
}
