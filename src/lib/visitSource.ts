// Where a dentdock.co.uk visitor came from, for the ops console's waitlist CRM
// and website visit totals (20 Oct 2026).
//
// Read from the address the visitor first arrived on and the site that sent
// them, held IN MEMORY only: nothing is stored on the device, so it needs no
// cookie consent and covers every visitor. Only the KIND of ad click is kept,
// never the click ID. The channel rules follow the booking site's
// (desk-care-hub supabase/functions/_shared/bookingSource.ts), minus the
// practice-only channels.
//
// Pure apart from captureLanding(); the server route and the forms both use it.

export type Channel =
  | "google_ads" | "microsoft_ads" | "meta" | "other_ads" | "search"
  | "social" | "email" | "referral" | "other" | "direct";

export type Device = "mobile" | "tablet" | "desktop";

export interface LandingTracking {
  landing_page: string | null;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  click_id: "google" | "meta" | "microsoft" | null;
}

/** Pages of this site that are counted. Anything else is not. */
export const SITE_PATHS = [
  "/", "/waitlist", "/compare", "/compare/dentally", "/compare/ismile-dental-software",
  "/compare/software-of-excellence", "/privacy", "/terms", "/cookies", "/dpa",
] as const;

/** A path of this site ("/compare/" -> "/compare"), or null if it isn't one. */
export function sitePath(path: unknown): string | null {
  if (typeof path !== "string") return null;
  const p = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return (SITE_PATHS as readonly string[]).includes(p) ? p : null;
}

const MAX_TAG = 200;
function tag(v: unknown): string | null {
  if (typeof v !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const s = v.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_TAG);
  return s || null;
}

/** A bare host name ("www.google.com" -> "google.com"), or null. */
export function cleanHost(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const h = v.trim().toLowerCase().replace(/\.$/, "");
  if (h.length > 253 || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(h)) return null;
  return h.replace(/^www\./, "");
}

const CLICK_PARAMS: [string, LandingTracking["click_id"]][] = [
  ["gclid", "google"], ["gbraid", "google"], ["wbraid", "google"], ["dclid", "google"],
  ["msclkid", "microsoft"], ["fbclid", "meta"],
];

/** Tracking from the first page of the visit: its path, the referring site, tags, kind of ad click. */
export function trackingFrom(landing: { path: string; search: string; referrer: string; origin: string }): LandingTracking {
  const q = new URLSearchParams(landing.search);
  let referrer: string | null = null;
  try {
    const ref = landing.referrer ? new URL(landing.referrer) : null;
    if (ref && ref.origin !== landing.origin) referrer = cleanHost(ref.hostname);
  } catch { /* not a URL: no referrer */ }
  return {
    landing_page: tag(landing.path),
    referrer_host: referrer,
    utm_source: tag(q.get("utm_source")),
    utm_medium: tag(q.get("utm_medium")),
    utm_campaign: tag(q.get("utm_campaign")),
    utm_term: tag(q.get("utm_term")),
    utm_content: tag(q.get("utm_content")),
    click_id: CLICK_PARAMS.find(([p]) => q.has(p))?.[1] ?? null,
  };
}

const PAID_MEDIUMS = new Set([
  "cpc", "ppc", "paid", "paidsearch", "paid_search", "paid-search", "paidsocial", "paid_social", "paid-social",
  "display", "cpm", "cpv", "cpa", "ad", "ads", "advert", "advertising", "retargeting", "remarketing", "banner",
]);
const GOOGLE_SOURCES = /^(google|adwords|googleads|google_ads|google-ads|youtube|yt)$/;
const META_SOURCES = /^(facebook|fb|instagram|ig|meta|messenger|whatsapp)$/;
const MICROSOFT_SOURCES = /^(bing|microsoft|msn|microsoftads|bingads)$/;
const SEARCH_HOSTS = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|yahoo\.[a-z.]+|ecosia\.org|search\.brave\.com|startpage\.com|yandex\.[a-z.]+|baidu\.com)$/;
const META_HOSTS = /(^|\.)(facebook\.com|fb\.com|fb\.me|instagram\.com|messenger\.com|whatsapp\.com)$/;
const SOCIAL_HOSTS = /(^|\.)(tiktok\.com|linkedin\.com|lnkd\.in|twitter\.com|x\.com|t\.co|youtube\.com|youtu\.be|pinterest\.[a-z.]+|reddit\.com|snapchat\.com|threads\.net|nextdoor\.co\.uk|nextdoor\.com)$/;
const EMAIL_MEDIUMS = new Set(["email", "e-mail", "newsletter", "mail"]);
const SOCIAL_MEDIUMS = new Set(["social", "social-media", "social_media", "socialmedia", "organic_social", "organic-social", "sm"]);
const ORGANIC_MEDIUMS = new Set(["organic", "seo"]);
const OWN_HOSTS = /(^|\.)dentdock\.co\.uk$/;

/** The channel a visit counts under. */
export function channelFor(t: Pick<LandingTracking, "utm_source" | "utm_medium" | "click_id" | "referrer_host">): Channel {
  const src = (t.utm_source ?? "").toLowerCase();
  const med = (t.utm_medium ?? "").toLowerCase();
  const ref = t.referrer_host;
  if (t.click_id === "google") return "google_ads";
  if (t.click_id === "microsoft") return "microsoft_ads";
  if (PAID_MEDIUMS.has(med)) {
    if (GOOGLE_SOURCES.test(src)) return "google_ads";
    if (META_SOURCES.test(src)) return "meta";
    if (MICROSOFT_SOURCES.test(src)) return "microsoft_ads";
    return "other_ads";
  }
  if (EMAIL_MEDIUMS.has(med)) return "email";
  if (META_SOURCES.test(src) || t.click_id === "meta") return "meta";
  if (SOCIAL_MEDIUMS.has(med)) return "social";
  if (ORGANIC_MEDIUMS.has(med)) return "search";
  if (src) return "other";
  if (ref && !OWN_HOSTS.test(ref)) {
    if (META_HOSTS.test(ref)) return "meta";
    if (SEARCH_HOSTS.test(ref)) return "search";
    if (SOCIAL_HOSTS.test(ref)) return "social";
    return "referral";
  }
  return "direct";
}

/** Phone, tablet or computer, from the browser's user agent (never stored). */
export function deviceFrom(userAgent: string | null): Device {
  const ua = (userAgent ?? "").toLowerCase();
  if (/ipad|tablet|kindle|silk|playbook/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|opera mini|iemobile/.test(ua)) return "mobile";
  return "desktop";
}

/** Crawlers, link previews and monitoring: not visitors. */
export function isBot(userAgent: string | null): boolean {
  const ua = (userAgent ?? "").toLowerCase();
  if (!ua) return true;
  return /bot|crawl|spider|slurp|preview|monitor|uptime|headless|lighthouse|facebookexternalhit|embedly|curl|wget|python|node-fetch|axios|go-http|java\//.test(ua);
}

/** Two-letter country from Cloudflare's header, or null. */
export function countryFrom(header: string | null): string | null {
  const c = (header ?? "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : null;
}

/** Cleans tracking sent by a browser: only the expected fields, cut to size. */
export function cleanTracking(v: unknown): LandingTracking & { signup_form: string | null; signup_page: string | null } {
  const o = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const click = o.click_id === "google" || o.click_id === "meta" || o.click_id === "microsoft" ? o.click_id : null;
  const form = o.signup_form === "hero" || o.signup_form === "waitlist_page" ? o.signup_form : null;
  return {
    landing_page: sitePath(o.landing_page) ?? tag(o.landing_page),
    referrer_host: cleanHost(o.referrer_host),
    utm_source: tag(o.utm_source),
    utm_medium: tag(o.utm_medium),
    utm_campaign: tag(o.utm_campaign),
    utm_term: tag(o.utm_term),
    utm_content: tag(o.utm_content),
    click_id: click,
    signup_form: form,
    signup_page: sitePath(o.signup_page),
  };
}

// ── In the browser: the first page of this visit, in memory only ─────────────
let landing: { path: string; search: string; referrer: string; origin: string } | null = null;

/** Called once as the site starts, before any in-site navigation. */
export function captureLanding(): void {
  if (landing || typeof window === "undefined") return;
  landing = {
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer || "",
    origin: window.location.origin,
  };
}

/** Tracking for this visit (empty if captureLanding never ran). */
export function visitTracking(): LandingTracking {
  return landing
    ? trackingFrom(landing)
    : { landing_page: null, referrer_host: null, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, utm_content: null, click_id: null };
}

let counted = false;
let lastPath: string | null = null;

/** Counts a page view (the first one of the visit also counts as a visit). Fire and forget. */
export function countPageView(path: string): void {
  if (typeof window === "undefined") return;
  const p = sitePath(path);
  if (!p || p === lastPath) return; // unknown page, or the same page twice in a row
  lastPath = p;
  const first = !counted;
  counted = true;
  try {
    void fetch("/api/public/count-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: p, first, ...visitTracking() }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* never let counting affect the page */ }
}
