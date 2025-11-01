import { User } from "better-auth";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

import { generateAvatar } from "@/lib/avatar";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

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
} & VariantProps<typeof avatarVariants>;

export const UserAvatar = ({
  name,
  image,
  className,
  size,
  isEditing = false,
}: UserAvatarProps) => {
  return (
    <div
      className={cn("relative mx-auto bg-red-500", avatarVariants({ size }))}
    >
      <Avatar
        className={cn("overflow-hidden", avatarVariants({ size }), className)}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="object-cover"
          />
        )}
        {!image && (
          <AvatarFallback>
            <Image
              src={generateAvatar(name)}
              alt={name}
              width={150}
              height={150}
              className="object-cover"
            />
          </AvatarFallback>
        )}
      </Avatar>
      {isEditing && (
        <Button
          className="absolute right-0 bottom-2 rounded-full"
          size="icon-sm"
        >
          <PencilIcon />
        </Button>
      )}
    </div>
  );
};
