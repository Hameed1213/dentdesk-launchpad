// Run: npx -y tsx --test src/lib/trainingAccess.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  checkPass,
  hashCode,
  makePass,
  normaliseCode,
  parseCodes,
  passCookie,
  practiceForCode,
  readCookie,
  sameOrigin,
  trainingConfig,
  closedReason,
} from "./trainingAccess.ts";

const CODE = "K5RD-ANX2-SXKA-K3DJ";
const HASH = createHash("sha256").update("K5RDANX2SXKAK3DJ").digest("hex");
const OTHER = createHash("sha256").update("ZZZZZZZZZZZZZZZZ").digest("hex");
const SECRET = "x".repeat(40);
const entries = parseCodes(`Oak Dental=${HASH}; Elm Practice=${OTHER};broken;=abc;No hash=xyz`);

test("the script's hash and the server's hash agree", async () => {
  assert.equal(await hashCode(CODE), HASH);
});

test("codes are read however they are typed", () => {
  assert.equal(normaliseCode(" k5rd anx2-sxka—k3dj "), "K5RDANX2SXKAK3DJ");
  assert.equal(normaliseCode(42), "");
});

test("bad TRAINING_CODES entries are skipped", () => {
  assert.deepEqual(
    entries.map((e) => e.practice),
    ["Oak Dental", "Elm Practice"],
  );
});

test("a right code names its practice; wrong or short codes don't", async () => {
  assert.equal(await practiceForCode("k5rd-anx2-sxka-k3dj", entries), "Oak Dental");
  assert.equal(await practiceForCode("K5RD-ANX2-SXKA-K3DK", entries), null);
  assert.equal(await practiceForCode("K5RD", entries), null);
  assert.equal(await practiceForCode(undefined, entries), null);
});

test("a pass works, and stops working when expired, altered or its code is removed", async () => {
  const now = Date.UTC(2026, 10, 25);
  const pass = await makePass(SECRET, HASH, now);
  assert.equal(await checkPass(SECRET, pass, entries, now + 1000), "Oak Dental");
  assert.equal(await checkPass(SECRET, pass, entries, now + 31 * 86_400_000), null, "expired");
  assert.equal(await checkPass("y".repeat(40), pass, entries, now), null, "other secret");
  const [payload, sig] = pass.split(".");
  const forged = Buffer.from(JSON.stringify({ h: OTHER.slice(0, 24), exp: now + 9e9 })).toString(
    "base64url",
  );
  assert.equal(await checkPass(SECRET, `${forged}.${sig}`, entries, now), null, "forged payload");
  assert.equal(await checkPass(SECRET, `${payload}.${sig}x`, entries, now), null, "bad signature");
  assert.equal(await checkPass(SECRET, `${pass}.more`, entries, now), null);
  const withoutOak = entries.filter((e) => e.practice !== "Oak Dental");
  assert.equal(await checkPass(SECRET, pass, withoutOak, now), null, "code removed");
  assert.ok(!pass.includes(HASH), "the full hash never goes in the cookie");
});

test("cookie is HttpOnly, Secure, Strict and only for /api/training", () => {
  const c = passCookie("abc");
  for (const part of [
    "dd_training=abc",
    "Path=/api/training",
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
    "Max-Age=2592000",
  ])
    assert.ok(c.includes(part), part);
  assert.ok(passCookie("", 0).includes("Max-Age=0"));
  assert.equal(readCookie("a=1; dd_training=xyz.abc; b=2"), "xyz.abc");
  assert.equal(readCookie(null), null);
});

test("only this site's own page may post", () => {
  const req = (origin?: string) =>
    new Request("https://dentdock.co.uk/api/training/unlock", {
      method: "POST",
      headers: origin ? { origin } : {},
    });
  assert.equal(sameOrigin(req("https://dentdock.co.uk")), true);
  assert.equal(sameOrigin(req("https://evil.example")), false);
  assert.equal(sameOrigin(req()), false);
});

test("training stays shut unless both secrets are set", () => {
  assert.equal(trainingConfig({}), null);
  assert.equal(trainingConfig({ TRAINING_CODES: `Oak=${HASH}` }), null);
  assert.equal(
    trainingConfig({ TRAINING_CODES: `Oak=${HASH}`, TRAINING_COOKIE_SECRET: "short" }),
    null,
  );
  assert.ok(trainingConfig({ TRAINING_CODES: `Oak=${HASH}`, TRAINING_COOKIE_SECRET: SECRET }));
});

test("quotes and spaces pasted around the secrets are ignored", () => {
  assert.equal(parseCodes(`"Oak Dental=${HASH}"`)[0]?.practice, "Oak Dental");
  assert.equal(parseCodes(`  Oak Dental=${HASH}  \n`).length, 1);
  assert.equal(parseCodes(`'Oak=${HASH}'`)[0]?.hash, HASH);
  assert.ok(
    trainingConfig({ TRAINING_CODES: `"Oak=${HASH}"`, TRAINING_COOKIE_SECRET: `"${SECRET}"` }),
  );
});

test("the switched-off answer names what is wrong, never a value", () => {
  assert.deepEqual(closedReason({}), ["TRAINING_CODES missing", "TRAINING_COOKIE_SECRET missing"]);
  assert.deepEqual(closedReason({ TRAINING_CODES: "K5RD-ANX2", TRAINING_COOKIE_SECRET: "abc" }), [
    "TRAINING_CODES unreadable",
    "TRAINING_COOKIE_SECRET too short",
  ]);
  assert.deepEqual(
    closedReason({ TRAINING_CODES: `Oak=${HASH}`, TRAINING_COOKIE_SECRET: SECRET }),
    [],
  );
});
