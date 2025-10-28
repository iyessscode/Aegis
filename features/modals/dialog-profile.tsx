"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/use-modal-store";
import { UserAvatar } from "../user/components/user-avatar";

export const DialogProfile = () => {
  const open = useModalStore((state) => state.openDialogProfile);
  const onOpenChange = useModalStore((state) => state.toggleDialogProfile);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="focus:outline-none">
        <DialogHeader className="flex flex-row items-center gap-2">
          <UserAvatar size="lg" image={null} name="Aldiyes Paskalis Birta" />
          <div className="flex flex-col items-start gap-2">
            <DialogTitle className="max-w-52 truncate md:max-w-80">
              Aldiyes Paskalis Birta
            </DialogTitle>
            <DialogDescription className="max-w-52 truncate md:max-w-80">
              aldiyes17032002@gmail.com
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <UserInformation keyInfo="Name" value="Aldiyes Paskalis Birta" />
          <UserInformation
            keyInfo="Email address"
            value="aldiyes17032002@gmail.com"
          />
          <UserInformation keyInfo="Mobile number" value="0812-5513-5019" />
        </div>
        <DialogFooter className="mt-4">
          <Button>Update profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UserInformation = ({
  keyInfo,
  value,
}: {
  keyInfo: string;
  value: string;
}) => {
  return (
    <div className="flex flex-row items-center justify-between border-b py-4">
      <h3 className="text-sm font-medium">{keyInfo}</h3>
      <span className="max-w-48 truncate text-sm font-extralight md:max-w-80">
        {value}
      </span>
    </div>
  );
};
