"use client";

import z from "zod";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/features/form/hooks/form-hook";
import { useSecurityStore } from "@/store/use-security-store";

export default function UserSetPasskey() {
  const toggleSetPasskey = useSecurityStore((state) => state.toggleSetPasskey);

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

  return (
    <div className="w-full space-y-4 rounded-md border p-4">
      <header className="flex flex-col items-center justify-center">
        <h3 className="font-semibold">Verification required</h3>
        <p className="text-muted-foreground text-center text-sm">
          Enter your current password to continue
        </p>
      </header>
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
                onClick={() => toggleSetPasskey()}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
