/**
 * Search-engine fixes applied to every response the worker sends (SEO audit, 20 Nov 2026).
 *
 * 1. The router tidies URLs itself (for example /pricing/ to /pricing, or /Pricing to /pricing) with
 *    a 307 "temporary" redirect. The site has no other redirects (nothing in src calls redirect()),
 *    so a 307 on a GET or HEAD is always that tidy-up: it is sent as a 301 so search engines treat
 *    the clean URL as the permanent one.
 * 2. /api/* (the waitlist endpoint) is never meant to appear in search results.
 */
export function withSeoHeaders(request: Request, response: Response): Response {
  const path = new URL(request.url).pathname;
  const permanent =
    response.status === 307 && (request.method === "GET" || request.method === "HEAD");
  const api = path.startsWith("/api/");
  if (!permanent && !api) return response;

  const headers = new Headers(response.headers);
  if (api) headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, {
    status: permanent ? 301 : response.status,
    statusText: permanent ? "Moved Permanently" : response.statusText,
    headers,
  });
}
