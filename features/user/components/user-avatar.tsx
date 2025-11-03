"use client";

import { User } from "better-auth";
import { cva, VariantProps } from "class-variance-authority";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { generateAvatar } from "@/lib/avatar";
import { cn } from "@/lib/utils";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatarVariants = cva(
  "border rounded-full flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-16",
        xl: "size-32",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type UserAvatarProps = Pick<User, "name" | "image"> & {
  className?: string;
  isEditing?: boolean;
  onFileChange?: (file: File) => void;
} & VariantProps<typeof avatarVariants>;

export const UserAvatar = ({
  name,
  image,
  className,
  size,
  isEditing = false,
  onFileChange,
}: UserAvatarProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const blobUrl = URL.createObjectURL(file);
    onFileChange?.(file);
    setPreview(blobUrl);
  }

  return (
    <div className={cn("relative mx-auto", avatarVariants({ size }))}>
      <Avatar
        className={cn("overflow-hidden", avatarVariants({ size }), className)}
      >
        <Image
          src={preview ? preview : image ? image : generateAvatar(name)}
          alt={name}
          fill
          sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 128px"
          className="object-cover"
        />
      </Avatar>
      {isEditing && (
        <Button
          type="button"
          className="absolute right-0 bottom-2 rounded-full"
          size="icon-sm"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = handleFileSelect;
            input.click();
          }}
        >
          <PencilIcon />
        </Button>
      )}
    </div>
  );
};
