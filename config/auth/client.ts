import {
  inferAdditionalFields,
  oneTapClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "@/config/auth/server";
import { env } from "@/data/env/client";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    oneTapClient({
      clientId: env.GOOGLE_CLIENT_ID,
      autoSelect: true,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 1000 * 5,
        maxAttempts: 1,
      },
    }),
  ],
});
