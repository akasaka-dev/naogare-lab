// ---------------------------------------------------------------------------
// Shared per-IP rate limiting for the write endpoints across both games.
// Backed by D1 (env.DB), not KV: tested with a burst of 22 rapid requests
// against a KV-counter version and every one of them read a stale count and
// got allowed through — KV's eventual consistency (a write can take a while
// to become visible to the next read) is the same issue that ruled it out
// for line4's game state. D1's INSERT...ON CONFLICT DO UPDATE is an atomic
// per-row increment, so a fixed-window counter here is actually enforced.
// ---------------------------------------------------------------------------

export async function checkRateLimit(env, bucket, request, limit, windowSeconds) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const windowMs = windowSeconds * 1000;
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const key = `${bucket}:${ip}:${windowStart}`;

  await env.DB.prepare(
    `INSERT INTO rate_limits (bucket_key, count, window_start) VALUES (?1, 1, ?2)
     ON CONFLICT(bucket_key) DO UPDATE SET count = count + 1`
  ).bind(key, windowStart).run();

  const row = await env.DB.prepare('SELECT count FROM rate_limits WHERE bucket_key = ?1').bind(key).first();

  // Small chance per call to sweep expired windows so the table stays bounded.
  if (Math.random() < 0.02) {
    await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?1').bind(windowStart - windowMs).run();
  }

  return (row ? row.count : 1) <= limit;
}
