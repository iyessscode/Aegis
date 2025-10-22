import { relations } from "drizzle-orm";
import { index, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { authSchema } from "@/db/schemas/auth/auth-schema";
import { users } from "@/db/schemas/auth/users";

export const sessions = authSchema.table(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [
    unique("uq_sessions_token").on(t.token),
    index("idx_sessions_user_id").on(t.userId),
  ],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
