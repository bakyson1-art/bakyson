function generateRandomUUID(): string {
  // Web Crypto API - works in both Node.js and Edge Runtime
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    // Set version bits (4) and variant bits (1)
    arr[6] = (arr[6] & 0x0f) | 0x40;
    arr[8] = (arr[8] & 0x3f) | 0x80;
    const hex = Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }
  // Fallback for environments without crypto
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  service: string;
  env?: string;
  [key: string]: unknown;
}

const SERVICE_NAME = "bakyson-web";
const ENV = process.env.NODE_ENV || "development";

function isProduction(): boolean {
  return ENV === "production";
}

function shouldLog(level: LogLevel): boolean {
  const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };
  const minLevel = isProduction() ? "warn" : "debug";
  return levels[level] >= levels[minLevel];
}

function formatEntry(entry: LogEntry): string {
  return JSON.stringify({
    ...entry,
    service: SERVICE_NAME,
    env: ENV,
    timestamp: entry.timestamp || new Date().toISOString(),
  });
}

export function createLogger(requestId?: string) {
  return {
    debug: (message: string, meta?: Record<string, unknown>) => {
      if (shouldLog("debug")) {
        console.log(formatEntry({ level: "debug", message, requestId, ...meta }));
      }
    },
    info: (message: string, meta?: Record<string, unknown>) => {
      if (shouldLog("info")) {
        console.info(formatEntry({ level: "info", message, requestId, ...meta }));
      }
    },
    warn: (message: string, meta?: Record<string, unknown>) => {
      if (shouldLog("warn")) {
        console.warn(formatEntry({ level: "warn", message, requestId, ...meta }));
      }
    },
    error: (message: string, meta?: Record<string, unknown>, error?: Error) => {
      if (shouldLog("error")) {
        const entry: LogEntry = {
          level: "error",
          message,
          requestId,
          ...meta,
        };
        if (error) {
          entry.error = error.message;
          entry.stack = error.stack;
        }
        console.error(formatEntry(entry));
      }
    },
  };
}

export function generateRequestId(): string {
  return generateRandomUUID();
}

export function getRequestId(headers: { get: (name: string) => string | null }): string {
  const existing = headers.get("x-request-id");
  if (existing) return existing;
  return generateRequestId();
}
