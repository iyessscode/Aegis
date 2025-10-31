import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/features/form/hooks/form-hook";
import z from "zod";

const userProfileSchema = z.object({
  image: z.string().nullish(),
  name: z.string().min(3, "Name musut be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
});

type UserProfile = z.infer<typeof userProfileSchema>;

export default function UserProfileForm(props: UserProfile) {
  const form = useAppForm({
    defaultValues: props,
    validators: {
      onSubmit: userProfileSchema,
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <form.AppField name="name">
            {(field) => (
              <field.InputText
                label="Name"
                disabled={form.state.isSubmitting}
              />
            )}
          </form.AppField>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
