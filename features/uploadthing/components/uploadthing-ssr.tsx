import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { connection } from "next/server";
import { extractRouterConfig } from "uploadthing/server";

import { customFileRouter } from "@/lib/uploadthing";
import { Suspense } from "react";

export function UploadThingSSR() {
  return (
    <Suspense>
      <UTSSR />
    </Suspense>
  );
}

export const UTSSR = async () => {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(customFileRouter)} />;
};
