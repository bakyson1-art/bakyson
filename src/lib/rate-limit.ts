import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let ratelimit: Ratelimit | null = null;

export function getRatelimit() {
  if (ratelimit) return ratelimit;

  const redisUrl = process.env.REDIS_URL;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url: upstashUrl, token: upstashToken }),
      limiter: Ratelimit.slidingWindow(10, "60 s"), // 10 requests per minute
    });
  } else if (redisUrl) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url: redisUrl }),
      limiter: Ratelimit.slidingWindow(10, "60 s"),
    });
  }

  return ratelimit;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const rl = getRatelimit();

  if (!rl) {
    // No Redis configured — allow request but log warning
    if (process.env.NODE_ENV === "development") {
      console.warn("Rate limiting disabled: no Redis configured");
    }
    return { success: true, limit: 10, remaining: 9, reset: 0 };
  }

  const result = await rl.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}
