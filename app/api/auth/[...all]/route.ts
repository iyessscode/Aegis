import { findIp } from "@arcjet/ip";
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/config/auth/server";
import { env } from "@/data/env/server";

const aj = arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

const botSettings = { mode: "LIVE", allow: [] } satisfies BotOptions;

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>;

const laxRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>;

const emailSettings = {
  mode: "LIVE",
  block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const authHandler = toNextJsHandler(auth);
export const { GET } = authHandler;

export const POST = async (request: NextRequest) => {
  const clonedRequest = request.clone();
  const decision = await checkArcjet(request);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { message: "Too many requests. Please try again in a few seconds." },
        { status: 429 },
      );
    } else if (decision.reason.isEmail()) {
      let message: string;
      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid.";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain is not valid.";
      } else {
        message = "Invalid email address.";
      }

      return NextResponse.json({ message }, { status: 400 });
    } else {
      return NextResponse.json(
        {
          message:
            "Access denied. You might not have the right permissions to view this page.",
        },
        { status: 403 },
      );
    }
  }
  return authHandler.POST(clonedRequest);
};

const checkArcjet = async (request: NextRequest) => {
  const body = (await request.json()) as unknown;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const userIdOrIp = (session?.user.id ?? findIp(request)) || "127.0.0.1";

  if (request.url.endsWith("/auth/sign-up/email")) {
    console.log(
      "============================ SIGN_UP_EMAIL ============================",
    );
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          }),
        )
        .protect(request, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(request, { userIdOrIp });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(request, { userIdOrIp });
};
