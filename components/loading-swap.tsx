import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingSwapProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

export const LoadingSwap = ({
  isLoading,
  className,
  children,
}: LoadingSwapProps) => {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "invisible" : "visible",
          className,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "visible" : "invisible",
          className,
        )}
      >
        <LoaderIcon className="animate-spin" />
      </div>
    </div>
  );
};
