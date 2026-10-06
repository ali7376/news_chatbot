// Simple in-memory per-IP rate limiter.
// Good enough for a single-instance Node deployment (e.g. Render's free tier).
// Resets whenever the server restarts; does not share state across instances.

const buckets = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) || []).filter(
    (time) => now - time < windowMs
  );

  if (timestamps.length >= maxRequests) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);

  // Keep the map from growing forever on a long-running server.
  if (buckets.size > 5000) {
    buckets.clear();
  }

  return false;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}
