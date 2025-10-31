import { Input } from "@/components/ui/input";

import FormBase, {
  FormControlProps,
} from "@/features/form/components/form-base";
import { useFieldContext } from "@/features/form/hooks/form-hook";

export default function InputField(props: FormControlProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </FormBase>
  );
}
