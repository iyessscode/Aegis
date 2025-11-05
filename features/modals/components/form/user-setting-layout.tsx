import { useIsMobile } from "@/hooks/use-mobile";
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
    <div className={"grid grid-cols-1 gap-1 md:grid-cols-3"}>
      <label className="mt-2 text-sm font-medium">{label}</label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
