import { Session } from "better-auth";
import { MonitorIcon, SmartphoneIcon, TrashIcon } from "lucide-react";

import { getUserAgentInfo } from "@/lib/user-agent-info";
import { formatDate } from "@/lib/utils";
import { useModalStore } from "@/store/use-modal-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PasswordManagement from "./components/security/password-management";

const listSession: Session[] = [
  {
    expiresAt: new Date("2025-11-02T17:09:42.682Z"),
    token: "oIMbTJfJSAXSxZlMQJ6EmMtFdv85kAv6",
    createdAt: new Date("2025-10-26T17:09:42.683Z"),
    updatedAt: new Date("2025-10-26T17:09:42.683Z"),
    ipAddress: "127.0.0.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    userId: "fe7a0543-e7fc-4203-bdfa-7afe8523fe6d",
    id: "00da6aff-6d2d-4a60-9f47-3cf288b38b06",
  },
  {
    expiresAt: new Date("2025-11-03T12:46:37.863Z"),
    token: "xcz5NdJfIRH72fA0IKrutO03RxDCUAgB",
    createdAt: new Date("2025-10-27T12:46:37.864Z"),
    updatedAt: new Date("2025-10-27T12:46:37.864Z"),
    ipAddress: "127.0.0.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    userId: "fe7a0543-e7fc-4203-bdfa-7afe8523fe6d",
    id: "4c77d97a-cca9-4240-8477-0ccc366d6f98",
  },
  {
    expiresAt: new Date("2025-11-04T06:29:28.012Z"),
    token: "XY8u2vWHrH9mxGD1aKGDBhNxdxiKIB2u",
    createdAt: new Date("2025-10-28T06:29:28.013Z"),
    updatedAt: new Date("2025-10-28T06:29:28.013Z"),
    ipAddress: "127.0.0.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    userId: "fe7a0543-e7fc-4203-bdfa-7afe8523fe6d",
    id: "f2efffae-e5d8-4aca-89ff-e87182304be5",
  },
];

const currentSession: Session = {
  expiresAt: new Date("2025-11-02T17:09:42.682Z"),
  token: "oIMbTJfJSAXSxZlMQJ6EmMtFdv85kAv6",
  createdAt: new Date("2025-10-26T17:09:42.683Z"),
  updatedAt: new Date("2025-10-26T17:09:42.683Z"),
  ipAddress: "127.0.0.1",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  userId: "fe7a0543-e7fc-4203-bdfa-7afe8523fe6d",
  id: "00da6aff-6d2d-4a60-9f47-3cf288b38b06",
};

export const DialogSecurity = () => {
  const open = useModalStore((state) => state.openDialogSecurity);
  const onOpenChange = useModalStore((state) => state.toggleDialogSecurity);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Security</DialogTitle>
          <DialogDescription className="text-center">
            Strengthen your account security by managing password, passkeys,
            two-factor authentication, and active sessions.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-160 w-full md:max-h-128">
          <div className="flex flex-col gap-4 p-4">
            <PasswordManagement />
            <DialogActions
              keyFeatures="Two FA"
              value={null}
              action={() => {}}
              actionLabel="Add two-setp verification"
            />
            <SessionManagement
              sessions={listSession}
              currentSessionToken={currentSession.token}
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/5"
            >
              Delete account
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const DialogActions = ({
  keyFeatures,
  value,
  actionLabel,
  action,
}: {
  keyFeatures: string;
  value?: string | null;
  actionLabel?: string;
  action?: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-between border-b py-2">
      <h3 className="text-sm font-medium">{keyFeatures}</h3>
      {value && (
        <span className="max-w-48 truncate text-sm font-extralight md:max-w-80">
          {value}
        </span>
      )}
      <Button
        variant="ghost"
        onClick={action}
        className="text-primary hover:text-primary/70"
      >
        {actionLabel}
      </Button>
    </div>
  );
};

const SessionManagement = ({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) => {
  const otherSession = sessions.filter(
    (session) => session.token !== currentSessionToken,
  );
  const currentSession = sessions.find(
    (session) => session.token === currentSessionToken,
  );

  return (
    <div className="flex flex-col gap-y-4">
      <h3>Current Session</h3>
      {currentSession && (
        <SessionCard session={currentSession} currentSession={true} />
      )}
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <h3>Active Sessions</h3>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:text-destructive hover:bg-destructive/5"
          >
            Revoke all session
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {otherSession.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SessionCard = ({
  session,
  currentSession,
}: {
  session: Session;
  currentSession?: boolean;
}) => {
  const userAgentInfo = getUserAgentInfo(session.userAgent);

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2 px-6 md:py-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-sm font-medium">
          {userAgentInfo.browser}, {userAgentInfo.os}
        </h3>
        {currentSession && (
          <span className="bg-primary text-primary-foreground rounded-full px-4 text-xs">
            Current
          </span>
        )}
      </div>
      <div className="flex flex-row gap-4">
        {userAgentInfo.device === "mobile" ? (
          <SmartphoneIcon className="size-8" />
        ) : (
          <MonitorIcon className="size-8" />
        )}
        <div className="flex flex-1 flex-col">
          <span className="text-xs font-extralight">
            Created: {formatDate(session.createdAt)}
          </span>
          <span className="text-xs font-extralight">
            Expires: {formatDate(session.expiresAt)}
          </span>
        </div>
        <Button variant="ghost" className="">
          <TrashIcon className="text-destructive size-4" />
        </Button>
      </div>
    </div>
  );
};
