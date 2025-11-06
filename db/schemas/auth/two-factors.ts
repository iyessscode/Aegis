import { relations } from "drizzle-orm";
import { index, text, unique, uuid } from "drizzle-orm/pg-core";

import { authSchema } from "@/db/schemas/auth/auth-schema";
import { users } from "@/db/schemas/auth/users";

export const twoFactors = authSchema.table(
  "two_factors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    secret: text("secret").notNull(),
    backupCodes: text("backup_codes").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [
    unique("uq_two_factors_user_id").on(t.userId),
    index("idx_two_factors_user_id").on(t.userId),
  ],
);

export const twoFactorsRelations = relations(twoFactors, ({ one }) => ({
  user: one(users, {
    fields: [twoFactors.userId],
    references: [users.id],
  }),
}));
