import { generateReactHelpers } from "@uploadthing/react";

import type { CustomFileRouter } from "@/lib/uploadthing";

export const { useUploadThing } = generateReactHelpers<CustomFileRouter>();
