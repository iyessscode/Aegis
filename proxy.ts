import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./config/auth/server";

type RouteMatcher = (pathname: string) => boolean;

function createRouteMatcher(patterns: string[]): RouteMatcher {
  const matchers = patterns.map((pattern) => {
    if (pattern.endsWith("(.*)")) {
      const prefix = pattern.replace("(.*)", "");
      return (pathname: string) => pathname.startsWith(prefix);
    } else {
      return (pathname: string) => pathname === pattern;
    }
  });

  return (pathname: string) => matchers.some((fn) => fn(pathname));
}

const isAuthRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/forgot-password",
  "/verify-otp",
]);

const isProtectedRoute = createRouteMatcher(["/welcome"]);

export async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (session == null && isProtectedRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (session != null && isAuthRoute(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
