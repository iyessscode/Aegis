"use server";

import { eq } from "drizzle-orm";

import { authClient } from "@/config/auth/client";
import { db } from "@/config/db";
import { accounts } from "@/db/schema";
import { cacheLife, cacheTag } from "next/cache";

export const getCurrentUser = async () => {
  "use cache";
  const { data } = await authClient.getSession();

  cacheTag(`user-${data?.user.id}`);
  cacheLife("hours");

  return data?.user ?? null;
};

export const checkIfUserHasPassword = async () => {
  const user = await getCurrentUser();

  if (!user) return false;

  const [account] = await db
    .select({ password: accounts.password })
    .from(accounts)
    .where(eq(accounts.userId, user.id));

  return account.password != null ? true : false;
};
