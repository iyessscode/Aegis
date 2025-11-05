import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useFieldContext } from "../hooks/form-hook";

type UserProfileSetting = {
  label: string;
  value: string | null;
  className?: string;
  isEditing: boolean;
};
export default function InputUserProfileSetting(props: UserProfileSetting) {
  const field = useFieldContext<string>();
  const isMobile = useIsMobile();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    // <InputGroup
    //   className={cn(
    //     "flex",
    //     props.isEditing
    //       ? ""
    //       : "has-[[data-slot=input-group-control]:focus-visible]:border-border rounded-none border-0 border-b shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-0 has-[[data-slot=input-group-control]:focus-visible]:border-b has-[[data-slot=input-group-control]:focus-visible]:shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:outline-0",
    //     props.className,
    //   )}
    // >
    //   <InputGroupAddon>
    //     <InputGroupText>{props.label}</InputGroupText>
    //   </InputGroupAddon>
    //   <InputGroupInput
    //     id={field.name}
    //     name={field.name}
    //     value={field.state.value}
    //     onBlur={field.handleBlur}
    //     onChange={(e) => field.handleChange(e.target.value)}
    //     aria-invalid={isInvalid}
    //     readOnly={!props.isEditing}
    //     className={cn(props.isEditing ? "text-start" : "text-end")}
    //   />
    // </InputGroup>
    <Field
      className={cn(
        "flex gap-0 border-b md:gap-4",
        props.isEditing && "gap-2 border-b-0",
      )}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      <FieldLabel>{props.label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        readOnly={!props.isEditing}
        className={cn(
          "",
          props.isEditing
            ? "border"
            : "border-0 shadow-none focus-visible:border-0 focus-visible:ring-0",
        )}
      />
    </Field>
  );
}
