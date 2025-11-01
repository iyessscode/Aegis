import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/features/form/hooks/form-hook";
import { cn } from "@/lib/utils";
import { useEditStore } from "@/store/use-edit-store";
import { PencilIcon } from "lucide-react";
import z from "zod";
import { UserAvatar } from "../user-avatar";

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

  const toggleEdit = useEditStore((state) => state.toggleEdit);
  const isEditing = useEditStore((state) => state.isEditing);

  return (
    <form
      id="user-profile"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <UserAvatar
            size="xl"
            className="mx-auto"
            name={props.name}
            image={props.image}
            isEditing={isEditing}
          />

          <form.AppField name="name">
            {(field) => (
              <field.InputSetting
                label="Name"
                value={props.name}
                isEditing={isEditing}
              />
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.InputSetting
                label="Email"
                value={props.name}
                isEditing={isEditing}
              />
            )}
          </form.AppField>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                form.reset();
                toggleEdit();
              }}
              className={cn(!isEditing && "hidden")}
            >
              Cancle
            </Button>
            <Button type="submit" className={cn(!isEditing && "hidden")}>
              Save change
            </Button>
          </DialogFooter>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
