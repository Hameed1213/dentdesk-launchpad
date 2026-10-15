import { useEffect, useState } from "react";
import {
  getConsent,
  loadAnalytics,
  OPEN_EVENT,
  setConsent,
  stopAnalytics,
  type Consent,
} from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = getConsent();
    if (current === "accepted") loadAnalytics();
    if (current === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (v: Consent) => {
    setConsent(v);
    if (v === "accepted") loadAnalytics();
    else stopAnalytics();
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.15)] sm:flex sm:items-center sm:gap-6">
        <p className="text-[14px] leading-[1.6] text-[#475569]">
          We'd like to use Google Analytics cookies to see how people use this website. They are
          only set if you accept.{" "}
          <a href="/cookies" className="text-[#2563EB] hover:underline">
            Cookie Policy
          </a>
        </p>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="h-10 flex-1 rounded-full border border-[#CBD5E1] px-5 text-[14px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-colors sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="h-10 flex-1 rounded-full bg-[#2563EB] px-5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
