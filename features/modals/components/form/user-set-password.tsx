"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useSecurityStore } from "@/store/use-security-store";

import { useAppForm } from "@/features/form/hooks/form-hook";
import { setPassword } from "@/features/user/actions";

export default function UserSetPassword() {
  const router = useRouter();
  const toggleSetPassword = useSecurityStore(
    (state) => state.toggleSetPassword,
  );
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      setIsLoading(true);
      await setPassword(value.newPassword)
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            form.reset();
            toggleSetPassword();
            router.refresh();
          } else {
            toast.error(res.error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const handleCancel = () => {
    setIsLoading(false);
    form.reset();
    toggleSetPassword();
  };

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
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Set Password
              </Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
