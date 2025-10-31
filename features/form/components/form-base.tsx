import Link from "next/link";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

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
}: FormBaseProps) {
  const field = useFieldContext();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const labelElement = (
    <>
      <div className="flex flex-row">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {linkForgetPassword && (
          <Link
            href={linkForgetPassword}
            className="text-muted-foreground hover:text-foreground ml-auto text-sm"
          >
            Forget your password?
          </Link>
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
