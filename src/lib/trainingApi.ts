/** Shared bits for the /api/training endpoints (see src/lib/trainingAccess.ts). */
export const noStore = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export const reply = (status: number, body: unknown, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...noStore, ...extra } });
