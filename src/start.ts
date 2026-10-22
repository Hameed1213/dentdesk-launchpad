import { createMiddleware, createStart } from "@tanstack/react-start";
import { withSecurityHeaders } from "./lib/securityHeaders";

// Every response the worker sends carries the browser security protections
// (security audit 20 Oct, M23; see src/lib/securityHeaders.ts).
const securityHeaders = createMiddleware().server(async ({ next }) => {
  const result = await next();
  return { ...result, response: withSecurityHeaders(result.response) };
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}));
