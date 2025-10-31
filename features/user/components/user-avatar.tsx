import { User } from "better-auth";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

import { generateAvatar } from "@/lib/avatar";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avatarVariants = cva(
  "border rounded-full overflow-hidden flex items-center justify-center",
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
} & VariantProps<typeof avatarVariants>;

export const UserAvatar = ({
  name,
  image,
  className,
  size,
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(avatarVariants({ size }), className)}>
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
  );
};
