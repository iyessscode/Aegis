import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { accounts } from "@/db/schemas/auth/accounts";
import { authSchema } from "@/db/schemas/auth/auth-schema";
import { sessions } from "@/db/schemas/auth/sessions";

export const users = authSchema.table(
  "users",
  {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    unique("uq_users_email").on(t.email),
    index("idx_users_email").on(t.email),
    index("idx_users_name").on(t.name),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));
