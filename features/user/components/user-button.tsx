"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Building2Icon,
  ChevronRight,
  IdCardIcon,
  LockIcon,
  LogOutIcon,
  Paintbrush,
  UserCircleIcon,
} from "lucide-react";

import { authClient } from "@/config/auth/client";
import { useModalStore } from "@/store/use-modal-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserInfo } from "@/features/user/components/user-info";

export const UserButton = () => {
  const router = useRouter();
  const { data, isPending, isRefetching } = authClient.useSession();

  const toggleDialogProfile = useModalStore(
    (state) => state.toggleDialogProfile,
  );

  const toggleDialogSecurity = useModalStore(
    (state) => state.toggleDialogSecurity,
  );

  useEffect(() => {
    if (!isPending && !isRefetching && data == null) {
      router.push("/");
    }
  }, [data, isPending, isRefetching, router]);

  if (isPending || isRefetching) {
    return (
      <div className="flex h-14 w-60 items-center justify-center gap-2">
        <span className="border-primary size-4 animate-bounce rounded-full border transition-transform delay-100" />
        <span className="border-primary size-4 animate-bounce rounded-full border transition-transform delay-200" />
        <span className="border-primary size-4 animate-bounce rounded-full border transition-transform delay-300" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-card flex cursor-pointer items-center justify-center gap-x-4 rounded-md border px-4 focus:outline-none">
        <UserInfo {...data.user} />
        <ChevronRight className="size-4-" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="linear-background max-w-80 min-w-64"
        align="end"
      >
        <DropdownMenuLabel className="p-1 font-normal">
          <UserInfo {...data.user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <MenuItems
          label="User Settings"
          items={[
            {
              name: "Profile",
              icon: <UserCircleIcon />,
              action: toggleDialogProfile,
            },
            {
              name: "Account",
              icon: <IdCardIcon />,
              action: () => {},
            },
            {
              name: "Security",
              icon: <LockIcon />,
              action: toggleDialogSecurity,
            },
            {
              name: "Preference",
              icon: <Paintbrush />,
              action: () => {},
            },
          ]}
        />
        <DropdownMenuSeparator />
        <MenuItems
          label="Organizations"
          items={[
            {
              name: "Manage Organizations",
              icon: <Building2Icon />,
              action: () => {},
            },
            /* TODO: LOAD 3 organization */
          ]}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
          }}
          className="focus:bg-destructive/20"
        >
          <LogOutIcon />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type MenuItemProps = {
  label?: string;
  items: {
    name: string;
    icon?: React.ReactNode;
    action?: () => void;
  }[];
};

const MenuItems = ({ label, items }: MenuItemProps) => {
  return (
    <DropdownMenuGroup>
      {label && (
        <DropdownMenuLabel className="text-muted-foreground">
          {label}
        </DropdownMenuLabel>
      )}
      {items.map((item, index) => (
        <DropdownMenuItem key={index} onClick={item.action}>
          {item.icon}
          <span>{item.name}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
};
