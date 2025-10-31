import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import InputField from "@/features/form/components/input-field";
import PasswordField from "@/features/form/components/password-field";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    InputText: InputField,
    InputPassword: PasswordField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
