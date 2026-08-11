import { headers } from "next/headers";

/**
 * Fixed-window rate limiter for server actions.
 *
 * Deliberately in-memory: it protects a single serverless instance from abuse
 * without adding infrastructure. For a multi-region deployment, swap the `hits`
 * map for Upstash Redis / Vercel KV behind the same interface.
 */
const hits = new Map<string, { count: number; expiresAt: number }>();

const MAX_ENTRIES = 10_000;

export interface RateLimitResult {
  readonly success: boolean;
  readonly remaining: number;
  readonly retryAfterSeconds: number;
}

export function rateLimit(key: string, limit = 5, windowSeconds = 60): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup keeps the map bounded without a background timer.
  if (hits.size > MAX_ENTRIES) {
    for (const [entryKey, value] of hits) {
      if (value.expiresAt <= now) hits.delete(entryKey);
    }
  }

  const existing = hits.get(key);

  if (!existing || existing.expiresAt <= now) {
    hits.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.expiresAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/**
 * Best-effort client identity for rate limiting. Never used for authorisation —
 * only to slow down repeat submissions from the same origin.
 */
export async function getClientKey(scope: string): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
