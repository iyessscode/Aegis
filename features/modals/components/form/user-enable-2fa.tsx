"use client";

import { useState } from "react";
import z from "zod";

import { useSecurityStore } from "@/store/use-security-store";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import { useAppForm } from "@/features/form/hooks/form-hook";

export default function UserEnable2FA() {
  const toggle2FA = useSecurityStore((state) => state.toggle2FA);
  const [isLoading, setIsLoading] = useState(false);
  const form = useAppForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: z.object({
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log({ value });
    },
  });

  const handleCancel = () => {
    setIsLoading(false);
    form.reset();
    toggle2FA();
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
            <form.AppField name="password">
              {(field) => <field.InputPassword label="Password" />}
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
