import {
  inferAdditionalFields,
  passkeyClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "@/config/auth/server";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), passkeyClient()],
});
