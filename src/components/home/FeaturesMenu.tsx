import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Features dropdown in the navbar: a full-width panel with an intro box and the eight feature
 * pages in two groups (Your patients, Your practice). Chosen by Hariss, 12 Nov.
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

type Item = (typeof featureMenu)[number];
const byPath = (to: Path) => featureMenu.find((f) => f.to === to)!;

function Intro({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#E0EAFF] p-7 flex flex-col">
      <p className="text-[20px] font-semibold text-[#2563EB] leading-snug">
        Dental practice software
      </p>
      <p className="mt-2 text-[14px] text-[#334155] leading-relaxed">
        Your diary, online booking, reminders, forms, payments and reports in one place, built for
        UK private practices.
      </p>
      <Link to="/features" onClick={onClose} className="mt-auto pt-6 self-start">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors">
          Explore DentDock <ChevronRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  );
}

function ListRow({ item, onClose }: { item: Item; onClose: () => void }) {
  const { label, to, Icon } = item;
  return (
    <Link
      to={to}
      onClick={onClose}
      className="group flex items-center justify-between py-3.5 border-b border-[#E5EDFB] last:border-b-0"
    >
      <span className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.8} />
        <span className="text-[15px] font-semibold text-[#2563EB] group-hover:underline underline-offset-4">
          {label}
        </span>
      </span>
      <ChevronRight className="w-4 h-4 text-[#2563EB] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function ColTitle({ children }: { children: string }) {
  return <p className="text-[15px] font-semibold text-[#0F172A] mb-3">{children}</p>;
}

const divider = "lg:border-l lg:border-[#DBEAFE] lg:pl-10";

/** Intro box, then two grouped columns of list rows. */
function MenuLayout({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-10 items-stretch pr-4">
      <Intro onClose={onClose} />
      <div className={divider}>
        <ColTitle>Your patients</ColTitle>
        {(
          [
            "/features/online-booking",
            "/features/reminders-and-recalls",
            "/features/forms",
            "/features/switching",
          ] as Path[]
        ).map((p) => (
          <ListRow key={p} item={byPath(p)} onClose={onClose} />
        ))}
      </div>
      <div className={divider}>
        <ColTitle>Your practice</ColTitle>
        {(
          [
            "/features/calendar",
            "/features/payments",
            "/features/reports",
            "/features/security",
          ] as Path[]
        ).map((p) => (
          <ListRow key={p} item={byPath(p)} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

/** Desktop: "Features" opens a full-width panel under the navbar (hover or click). */
export function FeaturesMenuDesktop() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);
  const close = () => setOpen(false);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
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
    // Not positioned on purpose: the panel is placed against the fixed header, so it spans the page.
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
          "absolute inset-x-0 top-full pt-2 px-4 lg:px-8 transition-all duration-200",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-[1400px] rounded-3xl bg-white border border-[#E5EDFB] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)] p-5 lg:p-6">
          <div>
            <MenuLayout onClose={close} />
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
