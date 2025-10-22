"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HTMLInputAutoCompleteAttribute, useCallback, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password";
  disabled?: boolean;
  showForgotPassword?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
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
  autoComplete,
}: FormFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center justify-between px-4">
            <FieldLabel
              htmlFor={field.name}
              className={cn(disabled && "text-muted-foreground")}
            >
              {label}
            </FieldLabel>
            {type === "password" &&
              showForgotPassword &&
              (disabled ? (
                <span className="text-muted-foreground ml-auto size-fit text-sm leading-tight">
                  Forgot your password?
                </span>
              ) : (
                <Link
                  href="/forgot-password"
                  className="size-fit text-sm leading-tight hover:underline"
                >
                  Forgot your password?
                </Link>
              ))}
          </div>
          <div className="relative">
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={disabled}
              placeholder={placeholder}
              type={
                type === "password" ? (isVisible ? "text" : "password") : "text"
              }
              autoComplete={autoComplete}
              className={cn(type === "password" && "pr-16")}
            />
            {type === "password" && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={toggleVisibility}
                disabled={disabled}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent hover:bg-transparent"
              >
                {isVisible ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
            )}
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="ml-4" />
          )}
          {description && !fieldState.error && (
            <FieldDescription className="ml-4">{description}</FieldDescription>
          )}
        </Field>
      )}
    />
  );
};
