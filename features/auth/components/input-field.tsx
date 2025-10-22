"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password";
  disabled?: boolean;
  showForgotPassword?: boolean;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
  showForgotPassword = false,
}: FormFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name} className="ml-4">
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="ml-4" />
          )}
        </Field>
      )}
    />
  );
};
