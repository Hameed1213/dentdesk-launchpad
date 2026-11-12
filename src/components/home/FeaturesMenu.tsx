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
 * Features dropdown in the navbar: a small, simple panel with the eight feature pages in two
 * columns (icon and name) and an "All features" link.
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
    label: "Online booking",
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
    label: "Forms",
    line: "Filled in and signed before they arrive",
    to: "/features/forms",
    Icon: FileText,
  },
  {
    label: "Payments",
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
    label: "Security",
    line: "Stored in London, encrypted, two-step login",
    to: "/features/security",
    Icon: ShieldCheck,
  },
  {
    label: "Switching",
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
    <div ref={wrap} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
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
          "absolute left-1/2 top-full pt-3 -translate-x-1/2 w-[440px] transition-all duration-150",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none",
        )}
      >
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.25)] p-2">
          <ul className="grid grid-cols-2">
            {featureMenu.map(({ label, to, Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] text-[#334155] transition-colors hover:bg-[#F3F7FF] hover:text-[#2563EB]"
                >
                  <Icon className="w-4 h-4 text-[#2563EB] flex-shrink-0" strokeWidth={1.9} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-neutral-100 px-3 pt-2.5 pb-1.5">
            <Link
              to="/features"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:underline"
            >
              All features <ArrowRight className="w-3.5 h-3.5" />
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
