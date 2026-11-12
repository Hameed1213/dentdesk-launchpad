import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Features dropdown in the navbar. Different from Dentally's three-column menu: a blue
 * "all features" card on the left and a two-column grid of the eight feature pages on the right,
 * each with an icon, a name and one short line, plus a switching prompt along the bottom.
 */

type Path =
  | "/features/calendar"
  | "/features/online-booking"
  | "/features/reminders-and-recalls"
  | "/features/forms"
  | "/features/payments"
  | "/features/reports"
  | "/features/security"
  | "/features/switching";

export const featureMenu: { label: string; line: string; to: Path; Icon: typeof Bell }[] = [
  {
    label: "Calendar",
    line: "Every clinician's day, side by side",
    to: "/features/calendar",
    Icon: CalendarDays,
  },
  {
    label: "Online booking and portal",
    line: "Patients book and manage visits online",
    to: "/features/online-booking",
    Icon: Globe,
  },
  {
    label: "Reminders and recalls",
    line: "Sent for you, before and after visits",
    to: "/features/reminders-and-recalls",
    Icon: Bell,
  },
  {
    label: "Forms and medical history",
    line: "Filled in and signed before they arrive",
    to: "/features/forms",
    Icon: FileText,
  },
  {
    label: "Payments and deposits",
    line: "Links, deposits and fair fees",
    to: "/features/payments",
    Icon: CreditCard,
  },
  {
    label: "Reports",
    line: "Money taken, no-shows and booking sources",
    to: "/features/reports",
    Icon: BarChart3,
  },
  {
    label: "Security and data",
    line: "Stored in London, encrypted, two-step login",
    to: "/features/security",
    Icon: ShieldCheck,
  },
  {
    label: "Switching to DentDock",
    line: "Bring your patients and go live in a day",
    to: "/features/switching",
    Icon: ArrowRightLeft,
  },
];

/** Desktop: "Features" button that opens the panel on hover or click. */
export function FeaturesMenuDesktop() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div ref={wrap} onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          open ? "text-[#2563EB]" : "text-neutral-600 hover:text-neutral-900",
        )}
      >
        Features
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")}
          strokeWidth={2.25}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full pt-2 -translate-x-1/2 w-[860px] max-w-[calc(100vw-48px)] transition-all duration-200",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none",
        )}
      >
        <div className="rounded-3xl bg-white border border-[#E5EDFB] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="grid grid-cols-[250px_1fr]">
            {/* Left: all features */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-6 text-white flex flex-col">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.22), transparent 70%)",
                }}
              />
              <p className="relative text-[18px] font-semibold leading-snug">
                Everything your practice runs on
              </p>
              <p className="relative mt-2 text-[13px] text-white/85 leading-relaxed">
                One system for UK private practices, from the first booking to the last recall.
              </p>
              <div className="relative mt-5 rounded-2xl bg-white/12 ring-1 ring-white/25 px-4 py-3">
                <p className="text-[12px] text-white/80">One plan</p>
                <p className="text-[22px] font-semibold leading-tight">
                  £49 <span className="text-[13px] font-normal text-white/80">a month</span>
                </p>
              </div>
              <Link
                to="/features"
                onClick={() => setOpen(false)}
                className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white hover:gap-2.5 transition-all"
              >
                See all features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: the eight pages */}
            <div className="p-4">
              <ul className="grid grid-cols-2 gap-1">
                {featureMenu.map(({ label, line, to, Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-[#F3F7FF]"
                    >
                      <span className="mt-0.5 w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#2563EB]">
                        <Icon
                          className="w-[17px] h-[17px] text-[#2563EB] transition-colors group-hover:text-white"
                          strokeWidth={1.9}
                        />
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                          {label}
                        </span>
                        <span className="block mt-0.5 text-[12.5px] text-[#64748B] leading-snug">
                          {line}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#EEF2FB] bg-[#F8FAFF] px-6 py-3.5">
            <p className="text-[13px] text-[#475569]">
              Moving from Dentally, Software of Excellence or R4?
            </p>
            <Link
              to="/features/switching"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:underline"
            >
              See how switching works <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile drawer: "Features" opens a list of the eight pages. */
export function FeaturesMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-medium text-neutral-700 hover:text-neutral-900 px-3 py-2.5 rounded-lg hover:bg-neutral-100"
      >
        Features
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="mt-1 mb-2 ml-2 border-l border-[#E5EDFB] pl-2 flex flex-col">
          <Link
            to="/features"
            onClick={onNavigate}
            className="px-3 py-2 text-sm font-semibold text-[#2563EB] rounded-lg hover:bg-[#F3F7FF]"
          >
            All features
          </Link>
          {featureMenu.map(({ label, to, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-[#F3F7FF]"
            >
              <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.9} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
