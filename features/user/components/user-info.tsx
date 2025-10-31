import { User } from "better-auth";

import { UserAvatar } from "@/features/user/components/user-avatar";

export const UserInfo = (props: Pick<User, "name" | "image" | "email">) => {
  return (
    <div className="flex max-w-60 flex-row items-center gap-4 p-2">
      <UserAvatar size="md" image={props.image} name={props.name} />
      <div className="flex flex-col items-start leading-tight">
        <span className="truncate text-sm font-semibold">{props.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {props.email}
        </span>
      </div>
    </div>
  );
};
