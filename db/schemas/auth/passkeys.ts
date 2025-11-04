import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { authSchema } from "@/db/schemas/auth/auth-schema";
import { users } from "@/db/schemas/auth/users";

export const passkeys = authSchema.table(
  "passkeys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    publicKey: text("public_key").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    credentialID: text("credential_id").notNull(),
    counter: integer("counter").notNull(),
    deviceType: text("device_type").notNull(),
    backedUp: boolean("backed_up").notNull(),
    transports: text("transports"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    aaguid: text("aaguid"),
  },
  (t) => [
    unique("uq_passkeys_credential_id").on(t.credentialID),
    index("idx_passkeys_user_id").on(t.userId),
    index("idx_passkeys_created_at").on(t.createdAt),
  ],
);

export const passkeysRelations = relations(passkeys, ({ one }) => ({
  user: one(users, {
    fields: [passkeys.userId],
    references: [users.id],
  }),
}));
