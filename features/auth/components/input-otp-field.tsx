"use client";

import Link from "next/link";
import { HTMLInputAutoCompleteAttribute, useCallback, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

export const InputOTPField = <T extends FieldValues>({
  control,
  name,
  disabled,
  autoComplete,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputOTP
            maxLength={6}
            {...field}
            aria-invalid={fieldState.invalid}
            disabled={disabled}
          >
            <InputOTPGroup className="mx-auto">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
      )}
    />
  );
};
