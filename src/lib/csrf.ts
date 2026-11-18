import { cookies } from "next/headers";
import crypto from "crypto";

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function getCsrfToken(req: { cookies: { get: (name: string) => { value?: string } | undefined } }): string | undefined {
  return req.cookies.get("csrf-token")?.value;
}

export function validateCsrfToken(req: { headers: { get: (name: string) => string | null }; cookies: { get: (name: string) => { value?: string } | undefined } }): boolean {
  const headerToken = req.headers.get("x-csrf-token");
  const cookieToken = req.cookies.get("csrf-token")?.value;

  if (!headerToken || !cookieToken) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  if (headerToken.length !== cookieToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < headerToken.length; i++) {
    result |= headerToken.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }
  return result === 0;
}

export const STATE_CHANGING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isStateChanging(method: string): boolean {
  return STATE_CHANGING_METHODS.has(method.toUpperCase());
}
