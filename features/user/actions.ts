"use server";

import { APIError } from "better-auth";
import { headers as nextHeaders } from "next/headers";

import { auth } from "@/config/auth/server";
import { cache } from "react";
import { checkIfUserHasPassword } from "./user-queries";

type ActionResult<T = unknown> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: ErrorResult };

type ErrorResult = {
  code?: string;
  message?: string;
};

export const setPassword = async (
  newPassword: string,
): Promise<ActionResult> => {
  try {
    const response = await auth.api.setPassword({
      headers: await nextHeaders(),
      body: {
        newPassword,
      },
      asResponse: true,
    });

    return {
      success: true,
      data: await response.json(),
      message: "Password successfully set",
    };
  } catch (error) {
    console.log({ error });
    if (error instanceof APIError) {
      return {
        success: false,
        error: {
          code: error.body?.code,
          message: error.body?.message ?? "Failed to set password",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
};

export const getHasPassword = cache(async () => {
  return await checkIfUserHasPassword();
});
