"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { authClient } from "@/config/auth/client";
import { useAppForm } from "@/features/form/hooks/form-hook";
import { cn } from "@/lib/utils";
import { useEditStore } from "@/store/use-edit-store";
import { useModalStore } from "@/store/use-modal-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { UserAvatar } from "../user-avatar";

const userProfileSchema = z.object({
  name: z.string().min(3, "Name musut be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
  image: z.string().nullable(),
});

type UserProfile = z.infer<typeof userProfileSchema>;

export default function UserProfileForm({ name, email, image }: UserProfile) {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      name,
      email,
      image,
    },
    validators: {
      onSubmit: userProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const promises = [
        authClient.updateUser({
          name: value.name,
          image: value.image,
        }),
      ];

      if (value.email != email) {
        promises.push(
          authClient.changeEmail({
            newEmail: value.email,
            callbackURL: "/welcome",
          }),
        );
      }

      const res = await Promise.all(promises);
      const updateUserResult = res[0];
      const emailResult = res[1] ?? { error: false };

      if (updateUserResult.error) {
        toast.error(updateUserResult.error.message);
      } else if (emailResult.error) {
        toast.error(emailResult.error.message);
      } else {
        if (value.email !== email) {
          toast.success(
            "Verify your new email address to complete the change.",
          );
        } else {
          toast.success("Profile updated successfully");
        }
      }

      router.refresh();
      setEditing(false);
    },
  });

  const toggleEdit = useEditStore((state) => state.toggleEdit);
  const isEditing = useEditStore((state) => state.isEditing);
  const setEditing = useEditStore((state) => state.setEditing);
  const isDialogOpen = useModalStore((state) => state.openDialogProfile);

  useEffect(() => {
    if (!isDialogOpen) {
      setEditing(false);
    }
  }, [isDialogOpen]);

  return (
    <form
      id="user-profile"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <UserAvatar
            size="xl"
            className="mx-auto"
            name={name}
            image={image}
            isEditing={isEditing}
          />

          <form.AppField name="name">
            {(field) => (
              <field.InputSetting
                label="Name"
                value={name}
                isEditing={isEditing}
              />
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.InputSetting
                label="Email"
                value={name}
                isEditing={isEditing}
              />
            )}
          </form.AppField>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                form.reset();
                toggleEdit();
              }}
              className={cn(!isEditing && "hidden")}
            >
              Cancle
            </Button>
            <Button
              type="submit"
              className={cn(!isEditing && "hidden")}
              disabled={form.state.isSubmitting}
            >
              Save change
            </Button>
          </DialogFooter>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
