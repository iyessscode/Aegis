"use client";

import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

import { useSecurityStore } from "@/store/use-security-store";

export default function UserUpdatePassword() {
  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    validators: {
      onSubmit: z
        .object({
          currentPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
          confirmPassword: z.string().min(8),
          newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        })
        .refine((d) => d.currentPassword === d.confirmPassword, {
          path: ["confirmPassword"],
          message: "Passwords do not match",
        }),
    },
    onSubmit: async ({ value }) => {
      await authClient.changePassword(
        {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess() {
            toast.success("Password successfully updated");
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
        },
      );
    },
  });

  const toggleUpdatePassword = useSecurityStore(
    (state) => state.toggleUpdatePassword,
  );

  return (
    <div className="flex-1 rounded-md border p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet className="gap-4">
            <form.AppField name="currentPassword">
              {(field) => <field.InputPassword label="Current Password" />}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) => <field.InputPassword label="Confirm Password" />}
            </form.AppField>
            <form.AppField name="newPassword">
              {(field) => <field.InputPassword label="New Password" />}
            </form.AppField>
            <div className="mt-4 flex flex-row items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={toggleUpdatePassword}
              >
                Cancel
              </Button>
              <Button type="submit">Update Password</Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
