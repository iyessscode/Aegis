"use client";

import { toast } from "sonner";
import z from "zod";

import { auth } from "@/config/auth/server";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useSecurityStore } from "@/store/use-security-store";

import { useAppForm } from "@/features/form/hooks/form-hook";
import { setPassword } from "../../actions";

export default function UserSetPassword() {
  const form = useAppForm({
    defaultValues: {
      newPassword: "",
    },
    validators: {
      onSubmit: z.object({
        newPassword: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
      }),
    },
    onSubmit: async ({ value }) => {
      await setPassword(value.newPassword).then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.error.message);
        }
      });
    },
  });

  const toggleSetPassword = useSecurityStore(
    (state) => state.toggleSetPassword,
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
            <form.AppField name="newPassword">
              {(field) => <field.InputPassword label="New Password" />}
            </form.AppField>
            <div className="mt-4 flex flex-row items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={toggleSetPassword}
              >
                Cancel
              </Button>
              <Button type="submit">Set Password</Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
