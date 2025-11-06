"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/config/auth/client";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

import { useSecurityStore } from "@/store/use-security-store";

export default function UserUpdatePassword() {
  const toggleUpdatePassword = useSecurityStore(
    (state) => state.toggleUpdatePassword,
  );
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
      const controller = new AbortController();
      abortRef.current = controller;

      await authClient.changePassword(
        {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true,
        },
        {
          signal: controller.signal,
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onSuccess() {
            toast.success("Password successfully updated");
            form.reset();
            toggleUpdatePassword();
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
        },
      );
      abortRef.current = null;
    },
  });

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsLoading(false);
    form.reset();
    toggleUpdatePassword();
  };

  return (
    <div className="w-full rounded-md border p-4">
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
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Update Password
              </Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
