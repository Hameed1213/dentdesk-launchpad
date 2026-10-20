// Run: npx -y tsx --test src/lib/visitSource.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { channelFor, cleanTracking, countryFrom, deviceFrom, isBot, sitePath, trackingFrom } from "./visitSource.ts";

const land = (path: string, search = "", referrer = "") =>
  trackingFrom({ path, search, referrer, origin: "https://dentdock.co.uk" });

test("only this site's pages are counted", () => {
  assert.equal(sitePath("/"), "/");
  assert.equal(sitePath("/compare/dentally/"), "/compare/dentally");
  assert.equal(sitePath("/admin"), null);
  assert.equal(sitePath("/<script>"), null);
  assert.equal(sitePath(42), null);
});

test("first page, referrer and tags are read; only the KIND of ad click is kept", () => {
  const t = land("/compare/dentally", "?utm_source=google&utm_medium=cpc&utm_campaign=Invisalign%20Oct&gclid=SECRET123", "https://www.google.co.uk/");
  assert.equal(t.landing_page, "/compare/dentally");
  assert.equal(t.referrer_host, "google.co.uk");
  assert.equal(t.utm_campaign, "Invisalign Oct");
  assert.equal(t.click_id, "google");
  assert.ok(!JSON.stringify(t).includes("SECRET123"), "the click ID itself is never kept");
});

test("a link from our own site is not a referrer", () => {
  assert.equal(land("/", "", "https://dentdock.co.uk/waitlist").referrer_host, null);
});

test("channels", () => {
  assert.equal(channelFor(land("/", "?gclid=x")), "google_ads");
  assert.equal(channelFor(land("/", "?msclkid=x")), "microsoft_ads");
  assert.equal(channelFor(land("/", "?utm_source=facebook&utm_medium=paid_social")), "meta");
  assert.equal(channelFor(land("/", "?fbclid=x")), "meta");
  assert.equal(channelFor(land("/", "?utm_source=newsletter&utm_medium=email")), "email");
  assert.equal(channelFor(land("/", "?utm_source=partner")), "other");
  assert.equal(channelFor(land("/", "", "https://www.google.com/")), "search");
  assert.equal(channelFor(land("/", "", "https://www.linkedin.com/feed")), "social");
  assert.equal(channelFor(land("/", "", "https://l.facebook.com/")), "meta");
  assert.equal(channelFor(land("/", "", "https://bda.org/news")), "referral");
  assert.equal(channelFor(land("/")), "direct");
});

test("device from the user agent", () => {
  assert.equal(deviceFrom("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148"), "mobile");
  assert.equal(deviceFrom("Mozilla/5.0 (Linux; Android 14; Pixel 8) Mobile Safari"), "mobile");
  assert.equal(deviceFrom("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)"), "tablet");
  assert.equal(deviceFrom("Mozilla/5.0 (Linux; Android 13; SM-X200) Safari"), "tablet");
  assert.equal(deviceFrom("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Safari"), "desktop");
});

test("bots are not counted", () => {
  assert.equal(isBot("Googlebot/2.1"), true);
  assert.equal(isBot("facebookexternalhit/1.1"), true);
  assert.equal(isBot(""), true);
  assert.equal(isBot("Mozilla/5.0 (Macintosh) Safari"), false);
});

test("country: two letters, unknown/Tor dropped", () => {
  assert.equal(countryFrom("gb"), "GB");
  assert.equal(countryFrom("XX"), null);
  assert.equal(countryFrom("T1"), null);
  assert.equal(countryFrom(null), null);
});

test("tracking from a browser is cleaned: only known fields, known values, cut to size", () => {
  const t = cleanTracking({
    signup_form: "evil", signup_page: "/waitlist", click_id: "gclid-abc", utm_source: "x".repeat(500),
    referrer_host: "WWW.Example.COM", extra: "ignored",
  });
  assert.equal(t.signup_form, null);
  assert.equal(t.signup_page, "/waitlist");
  assert.equal(t.click_id, null);
  assert.equal(t.utm_source?.length, 200);
  assert.equal(t.referrer_host, "example.com");
  assert.ok(!("extra" in t));
  assert.equal(cleanTracking(null).utm_source, null);
});
