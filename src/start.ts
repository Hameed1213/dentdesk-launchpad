import { createMiddleware, createStart } from "@tanstack/react-start";
import { withSecurityHeaders } from "./lib/securityHeaders";
import { withSeoHeaders } from "./lib/seoHeaders";

// Every response the worker sends carries the browser security protections
// (security audit 20 Oct, M23; see src/lib/securityHeaders.ts) and the search-engine fixes in
// src/lib/seoHeaders.ts (permanent tidy-up redirects, no indexing of /api).
const securityHeaders = createMiddleware().server(async ({ next, request }) => {
  const result = await next();
  return {
    ...result,
    response: withSecurityHeaders(withSeoHeaders(request, result.response)),
  };
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}));
