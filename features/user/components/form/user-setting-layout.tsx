import { Field, FieldLabel } from "@/components/ui/field";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  isEditing: boolean;
  children: React.ReactNode;
};

export default function UserSettingLayout({
  isEditing,
  label,
  children,
}: Props) {
  const isMobile = useIsMobile();

  return (
    // <Field
    //   className={cn(
    //     "flex gap-0 border-b md:gap-4",
    //     isEditing && "items-start gap-2 border-b-0",
    //   )}
    //   orientation={isMobile ? "vertical" : "horizontal"}
    // >
    //   <FieldLabel>{label}</FieldLabel>
    //   {children}
    // </Field>
    <div className={"grid grid-cols-1 gap-1 md:grid-cols-3"}>
      <label className="mt-2 text-sm font-medium">{label}</label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
