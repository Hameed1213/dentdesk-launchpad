import { openCookieSettings } from "@/lib/cookieConsent";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";
import { WHATSAPP } from "@/components/site/ui";

/* Footer: brand + contact on the left, four link columns, legal and company details in the bottom bar. */

type FooterLink = { label: string; to: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Features",
    links: [
      { label: "All features", to: "/features" },
      { label: "Calendar", to: "/features/calendar" },
      { label: "Online booking", to: "/features/online-booking" },
      { label: "Reminders and recalls", to: "/features/reminders-and-recalls" },
      { label: "Forms", to: "/features/forms" },
      { label: "Payments", to: "/features/payments" },
      { label: "Reports", to: "/features/reports" },
      { label: "Security", to: "/features/security" },
      { label: "Switching", to: "/features/switching" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All solutions", to: "/solutions" },
      { label: "Reduce no-shows", to: "/solutions/reduce-no-shows" },
      { label: "Fill cancellations", to: "/solutions/fill-cancelled-appointments" },
      { label: "Cut admin", to: "/solutions/cut-admin" },
      { label: "Deposits and late fees", to: "/solutions/deposits-and-late-cancellations" },
      { label: "Bring patients back", to: "/solutions/bring-patients-back" },
      { label: "Private practices", to: "/solutions/private-practices" },
      { label: "Going private", to: "/solutions/going-private" },
      { label: "New practices", to: "/solutions/new-practices" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", to: "/guides" },
      { label: "Free tools", to: "/tools" },
      { label: "Comparisons", to: "/compare" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
      { label: "Join the waitlist", to: "/waitlist" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" as const },
  { label: "Terms", to: "/terms" as const },
  { label: "Cookies", to: "/cookies" as const },
  { label: "DPA", to: "/dpa" as const },
];

const linkClass = "text-[14px] text-white/65 hover:text-white transition-colors";

export default function Footer() {
  return (
    <footer className="bg-[#0F162B] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 md:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-x-8 gap-y-10">
          {/* Brand + contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <Link to="/" aria-label="Dent Dock, go to homepage" className="flex items-center gap-2">
              <ToothIcon size={22} color="#60A5FA" />
              <span
                className="text-lg tracking-tight"
                style={{ color: "#60A5FA", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Dent Dock
              </span>
            </Link>
            <p className="mt-4 text-[14px] leading-[1.65] text-white/60 max-w-[280px]">
              Practice software for UK private dental practices. £49 a month, no contract.
            </p>
            <Link
              to="/waitlist"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-6 space-y-2.5">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <MessageCircle className="w-4 h-4 text-white/40" /> WhatsApp us
              </a>
              <a
                href="mailto:hello@dentdock.co.uk"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <Mail className="w-4 h-4 text-white/40" /> hello@dentdock.co.uk
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to as "/features"} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2 text-[12px] leading-[1.6] text-white/35">
            <p className="text-[13px] text-white/50">
              © {new Date().getFullYear()} Dent Dock. All rights reserved. Made in the UK.
            </p>
            <p>
              Dent Dock is a trading name of Paradigm Network Limited.
              <br />
              Company No. 16903048 · Registered in England and Wales · ICO No. ZC132966
            </p>
          </div>
          <ul className="flex flex-wrap lg:flex-nowrap lg:flex-shrink-0 gap-x-6 gap-y-2 whitespace-nowrap">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-[13px] text-white/55 hover:text-white transition-colors"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
