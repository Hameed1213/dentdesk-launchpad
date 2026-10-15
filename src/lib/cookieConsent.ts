// Google Analytics on dentdock.co.uk loads only after a visitor agrees.
// UK cookie rules (PECR) need consent before non-essential cookies are set;
// the site used to load the tag on every page with no choice offered.

export const GA_ID = "G-RVEYZHHMEC";
const KEY = "dd_cookie_consent_v1";
export const OPEN_EVENT = "dd-open-cookie-settings";

export type Consent = "accepted" | "rejected";

export function getConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    // Private mode etc.: the choice holds for this page view only.
  }
}

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: string]: unknown;
};

export function loadAnalytics() {
  const w = window as unknown as GtagWindow;
  w[`ga-disable-${GA_ID}`] = false;
  if (document.getElementById("dd-gtag")) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.id = "dd-gtag";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

// Stop analytics and remove its cookies (_ga, _ga_<id>) when a visitor says no
// after having said yes.
export function stopAnalytics() {
  const w = window as unknown as GtagWindow;
  w[`ga-disable-${GA_ID}`] = true;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
