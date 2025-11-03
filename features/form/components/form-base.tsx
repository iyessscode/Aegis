import Link from "next/link";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/features/form/hooks/form-hook";

export type FormControlProps = {
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
};

type FormBaseProps = FormControlProps & {
  children: React.ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
  linkForgetPassword?: string;
};

export default function FormBase({
  children,
  label,
  description,
  horizontal,
  controlFirst,
  linkForgetPassword,
  disabled,
}: FormBaseProps) {
  const field = useFieldContext();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const labelElement = (
    <>
      <div className="flex flex-row">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {linkForgetPassword && (
          <Button
            variant="link"
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground ml-auto h-fit py-0 text-sm"
            asChild
          >
            <Link href={linkForgetPassword}>Forget your password?</Link>
          </Button>
        )}
      </div>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );

  const errorElement = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElement}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElement}
        </>
      )}
    </Field>
  );
}
