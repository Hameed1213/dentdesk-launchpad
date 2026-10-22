/**
 * Browser security protections for every page the worker serves (security
 * audit 20 Oct, M23). Static files (images, scripts, styles) are served by
 * Cloudflare without the worker; public/_headers gives them the same set.
 *
 * HSTS here has no includeSubDomains: on dentdock.co.uk it would bind every
 * subdomain (including any email link-tracking one) to https; add it once
 * they are all confirmed.
 *
 * The content policy is enforced (22 Oct, after report-only showed nothing on
 * the home, compare and privacy pages). TanStack's server rendering writes inline scripts, so
 * 'unsafe-inline' stays until they carry a nonce; the rest (framing, plugins,
 * base, which sites may be contacted) is already narrow.
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
    "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
    "frame-src https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

/** Adds the protections to a response, keeping any header it already set. */
export function withSecurityHeaders(response: Response): Response {
  let headers: Headers;
  try {
    headers = response.headers;
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v);
    return response;
  } catch {
    // Some responses have read-only headers: copy them into a new one.
    headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v);
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
}
