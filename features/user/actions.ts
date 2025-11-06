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
    const headers = await nextHeaders();

    const response = await auth.api.setPassword({
      headers,
      body: {
        newPassword,
      },
      asResponse: true,
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: {
          code: error.code ?? "FAILED",
          message: error.message ?? "Failed to set password",
        },
      };
    }

    return {
      success: true,
      data: await response.json(),
      message: "Password successfully set",
    };
  } catch (error) {
    console.log({ error });
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        error: {
          code: "ABORTED",
          message: "Password update canceled",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error occurred",
      },
    };
  }
};

export const getHasPassword = cache(async () => {
  return await checkIfUserHasPassword();
});
