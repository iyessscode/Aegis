"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useEditStore } from "@/store/use-edit-store";
import { useModalStore } from "@/store/use-modal-store";

import { useAppForm } from "@/features/form/hooks/form-hook";
import { useUploadThing } from "@/features/uploadthing/hooks/use-uploadthing";
import { UserAvatar } from "@/features/user/components/user-avatar";

const userProfileSchema = z.object({
  name: z.string().min(3, "Name musut be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
  image: z.string().nullable(),
});

type UserProfile = z.infer<typeof userProfileSchema>;

export default function UserProfileForm({ name, email, image }: UserProfile) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      toast.error(error.message);
    },
  });

  const { toggleEdit, isEditing, setEditing } = useEditStore();
  const isDialogOpen = useModalStore((state) => state.openDialogProfile);

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
      let uploadedKey;
      if (file) {
        const res = await startUpload([file]);
        uploadedKey = res?.[0].key;
        form.setFieldValue("image", res?.[0].ufsUrl ?? null);
      }

      const results = await Promise.all([
        authClient.updateUser({
          name: value.name,
          image: form.getFieldValue("image"),
          image_key: uploadedKey,
        }),
        value.email !== email
          ? authClient.changeEmail({
              newEmail: value.email,
              callbackURL: "/welcome",
            })
          : Promise.resolve({ error: false }),
      ]);

      const [updateResult, emailResult] = results;

      if (updateResult.error) toast.error(updateResult.error.message);
      if (emailResult.error && typeof emailResult.error != "boolean")
        toast.error(emailResult.error.message);

      if (value.email !== email) {
        toast.success("Verify your new email address to complete the change.");
      } else {
        toast.success("Profile updated successfully");
      }

      router.refresh();
      setEditing(false);
    },
  });

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
            onFileChange={setFile}
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
              disabled={form.state.isSubmitting || isUploading}
            >
              Save change
            </Button>
          </DialogFooter>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
