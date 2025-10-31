import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import FormBase, {
  FormControlProps,
} from "@/features/form/components/form-base";
import { useFieldContext } from "@/features/form/hooks/form-hook";

type PasswordFieldProps = FormControlProps & {
  linkForgetPassword?: string;
};

export default function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <FormBase {...props} linkForgetPassword={props.linkForgetPassword}>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          type={isVisible ? "text" : "password"}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            title={field.name}
            aria-label={field.name}
            size="icon-xs"
            onClick={toggleVisible}
            disabled={props.disabled}
          >
            {isVisible ? <EyeIcon /> : <EyeOffIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </FormBase>
  );
}
