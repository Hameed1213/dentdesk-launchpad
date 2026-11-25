/**
 * Who may open the staff training game at /training (docs/TRAINING-GAME-PLAN.md §4).
 *
 * - Each practice is given an access code (scripts/training-code.mjs makes one). Only a SHA-256
 *   hash of each code is kept, in the TRAINING_CODES secret: "Practice name=hash;Other=hash".
 * - A right code gets a signed cookie (HMAC-SHA256 with TRAINING_COOKIE_SECRET), HttpOnly, sent
 *   only to /api/training. It names the practice and the code's hash, so taking a code out of
 *   TRAINING_CODES also closes every browser that used it.
 * - Codes are about 79 random bits, so guessing one is not practical; a wrong guess is also slowed down.
 * - The game itself holds only made-up patients and talks to nothing, so the lock keeps the
 *   training private; it does not guard anything secret.
 *
 * Plain Web Crypto, so it runs the same in the Cloudflare worker and in node tests.
 */

export const TRAINING_COOKIE = "dd_training";
export const COOKIE_PATH = "/api/training";
export const COOKIE_DAYS = 30;

const enc = new TextEncoder();

/** "oakd-7k3m q9xp" and "OAKD7K3MQ9XP" are the same code. */
export function normaliseCode(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 64);
}

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashCode(code: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(normaliseCode(code))));
}

/** Same length strings compared without stopping early. */
export function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export type CodeEntry = { practice: string; hash: string };

/** Reads TRAINING_CODES. Bad entries are skipped, never guessed at. */
export function parseCodes(secret: string | undefined): CodeEntry[] {
  if (!secret) return [];
  // Quotes and spaces pasted around the value, or around an entry, are ignored.
  secret = secret.trim().replace(/^["']|["']$/g, "");
  const out: CodeEntry[] = [];
  for (const part of secret.split(";")) {
    const i = part.lastIndexOf("=");
    if (i < 1) continue;
    const practice = part
      .slice(0, i)
      .replace(/^[\s"']+/, "")
      .trim()
      .slice(0, 80);
    const hash = part
      .slice(i + 1)
      .replace(/[\s"']+$/, "")
      .trim()
      .toLowerCase();
    if (practice && /^[0-9a-f]{64}$/.test(hash)) out.push({ practice, hash });
  }
  return out;
}

/** The practice a typed code belongs to, or null. Every entry is checked, match or not. */
export async function practiceForCode(raw: unknown, entries: CodeEntry[]): Promise<string | null> {
  const code = normaliseCode(raw);
  if (code.length < 12) return null;
  const hash = await hashCode(code);
  let found: string | null = null;
  for (const e of entries) if (sameText(e.hash, hash) && found === null) found = e.practice;
  return found;
}

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array | null {
  try {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

async function sign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data))));
}

type Pass = { h: string; exp: number };

/** The cookie value: payload.signature. Only part of the code's hash goes in it. */
export async function makePass(secret: string, hash: string, now = Date.now()): Promise<string> {
  const pass: Pass = { h: hash.slice(0, 24), exp: now + COOKIE_DAYS * 86_400_000 };
  const payload = b64url(enc.encode(JSON.stringify(pass)));
  return `${payload}.${await sign(secret, payload)}`;
}

/** The practice a cookie value is good for, or null (bad signature, expired, or code removed). */
export async function checkPass(
  secret: string,
  value: string | null | undefined,
  entries: CodeEntry[],
  now = Date.now(),
): Promise<string | null> {
  if (!value || value.length > 400) return null;
  const [payload, sig, extra] = value.split(".");
  if (!payload || !sig || extra !== undefined) return null;
  if (!sameText(await sign(secret, payload), sig)) return null;
  const bytes = fromB64url(payload);
  if (!bytes) return null;
  let pass: Pass;
  try {
    pass = JSON.parse(new TextDecoder().decode(bytes)) as Pass;
  } catch {
    return null;
  }
  if (typeof pass.h !== "string" || pass.h.length !== 24 || typeof pass.exp !== "number")
    return null;
  if (pass.exp <= now) return null;
  const entry = entries.find((e) => e.hash.startsWith(pass.h));
  return entry ? entry.practice : null;
}

export function readCookie(header: string | null, name = TRAINING_COOKIE): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

/** Set-Cookie for a pass; an empty value with maxAge 0 removes it. */
export function passCookie(value: string, maxAgeSeconds = COOKIE_DAYS * 86_400): string {
  return [
    `${TRAINING_COOKIE}=${value}`,
    `Path=${COOKIE_PATH}`,
    `Max-Age=${maxAgeSeconds}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
  ].join("; ");
}

/** A POST must come from this site's own page (the cookie is SameSite=Strict as well). */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export type TrainingConfig = { secret: string; entries: CodeEntry[] } | null;

/** Both secrets, or null: with either missing, training stays shut (never open by default). */
export function trainingConfig(env: Record<string, string | undefined>): TrainingConfig {
  const secret = env.TRAINING_COOKIE_SECRET?.trim().replace(/^["']|["']$/g, "");
  const entries = parseCodes(env.TRAINING_CODES);
  if (!secret || secret.length < 32 || entries.length === 0) return null;
  return { secret, entries };
}
