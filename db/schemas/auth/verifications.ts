import { index, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { authSchema } from "@/db/schemas/auth/auth-schema";

export const verifications = authSchema.table(
  "verifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [index("idx_verifications_identifier").on(t.identifier)],
);
