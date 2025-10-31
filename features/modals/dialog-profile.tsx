"use client";

import { useState } from "react";
import z from "zod";

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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/features/user/components/user-avatar";
import { cn } from "@/lib/utils";
import { useEditStore } from "@/store/use-edit-store";
import { User } from "better-auth";
import { useAppForm } from "../form/hooks/form-hook";
import UserProfileForm from "../user/components/form/user-profile-form";

export const DialogProfile = ({ user }: { user: User | null }) => {
  if (user === null) return null;
  const open = useModalStore((state) => state.openDialogProfile);
  const onOpenChange = useModalStore((state) => state.toggleDialogProfile);
  const toggleEdit = useEditStore((state) => state.toggleEdit);
  const isEditing = useEditStore((state) => state.isEditing);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-2">
          <UserAvatar size="lg" image={user.image} name={user.name} />
          <div className="flex flex-col items-start gap-2">
            <DialogTitle className="max-w-52 truncate md:max-w-80">
              {user.name}
            </DialogTitle>
            <DialogDescription className="max-w-52 truncate md:max-w-80">
              {user.email}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <UserProfileForm
            name={user.name}
            email={user.email}
            image={user.image}
          />
        </div>
        <DialogFooter className="mt-4">
          {isEditing ? (
            <div className="flex flex-row items-end justify-center gap-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={toggleEdit}
              >
                Cancle
              </Button>
              <Button className="flex-1">Save change</Button>
            </div>
          ) : (
            <Button onClick={toggleEdit}>Update profile</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
