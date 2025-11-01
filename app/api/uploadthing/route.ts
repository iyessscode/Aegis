import { createRouteHandler } from "uploadthing/next";

import { customFileRouter } from "@/lib/uploadthing";

export const { GET, POST } = createRouteHandler({
  router: customFileRouter,
});
