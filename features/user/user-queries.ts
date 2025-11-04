"use server";

import { and, eq, isNotNull } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { headers as nextHeaders } from "next/headers";
import { cache } from "react";

import { accounts } from "@/db/schema";

import { auth } from "@/config/auth/server";
import { db } from "@/config/db";

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await nextHeaders(),
  });

  if (session == null) return null;

  return session.user;
});

export const checkIfUserHasPassword = cache(async () => {
  const user = await getCurrentUser();

  if (user == null) return false;

  const [account] = await db
    .select({ password: accounts.password })
    .from(accounts)
    .where(
      and(
        eq(accounts.userId, user.id),
        eq(accounts.providerId, "credential"),
        isNotNull(accounts.password),
      ),
    );

  if (!account) return false;

  return account.password != null ? true : false;
});
