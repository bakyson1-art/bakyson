import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { createLogger, generateRequestId, getRequestId } from "@/lib/logger";

function generateCsrfToken(): string {
  const arr = new Uint8Array(32);
  // @ts-ignore - crypto.getRandomValues is available in Edge Runtime
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function validateCsrfToken(req: NextRequest): boolean {
  const headerToken = req.headers.get("x-csrf-token");
  const cookieToken = req.cookies.get("csrf-token")?.value;

  if (!headerToken || !cookieToken) {
    return false;
  }

  if (headerToken.length !== cookieToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < headerToken.length; i++) {
    result |= headerToken.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }
  return result === 0;
}

const STATE_CHANGING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const startTime = Date.now();

  // Generate or extract request ID
  const requestId = getRequestId(request.headers);
  const log = createLogger(requestId);

  // Handle CORS preflight requests for API routes
  if (pathname.startsWith("/api/") && method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://bakyson.com",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token",
        "Access-Control-Max-Age": "86400",
        "X-Request-ID": requestId,
      },
    });
  }

  // CSRF token generation: set csrf-token cookie if missing
  let response: NextResponse;
  const existingCsrfToken = request.cookies.get("csrf-token");
  const needsCsrfToken = !existingCsrfToken;

  // CSRF validation for state-changing methods on API routes
  if (
    pathname.startsWith("/api/") &&
    STATE_CHANGING_METHODS.has(method)
  ) {
    if (!validateCsrfToken(request)) {
      log.warn("CSRF validation failed", { pathname, method });
      return NextResponse.json(
        { error: "CSRF token missing or invalid" },
        { status: 403, headers: { "X-Request-ID": requestId } }
      );
    }
  }

  // Continue with the request
  response = NextResponse.next();

  // Add request ID header to response
  response.headers.set("X-Request-ID", requestId);

  // Log the request
  log.info("Request processed", {
    pathname,
    method,
    status: response.status,
    duration: Date.now() - startTime,
  });

  // Set CSRF token cookie if missing
  if (needsCsrfToken) {
    response.cookies.set("csrf-token", generateCsrfToken(), {
      httpOnly: false, // Client needs to read this for X-CSRF-Token header
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect portal routes - redirect to login if no session
  if (pathname.startsWith("/portal")) {
    if (!token) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  // Redirect authenticated users away from login/2fa if they have a session
  if (pathname === "/portal/login" || pathname === "/portal/2fa") {
    if (token) {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/portal/:path*"],
};
