import { uuid } from "drizzle-orm/pg-core";
import { authSchema } from ".";

export const users = authSchema.table("users", {
  id: uuid().primaryKey().defaultRandom(),
});
