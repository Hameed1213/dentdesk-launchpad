import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import {
  ArrowRightLeft,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CalendarX,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Navbar mega menus (Features, Solutions). Same design for both, chosen by Hariss on 12 Nov:
 * a full-width panel with an intro box and two grouped columns of links.
 * Desktop panels render into document.body so the blurred, scrolled navbar can't squash them.
 */

type MenuItem = { label: string; to: string; Icon: typeof Bell };
type MenuConfig = {
  label: string;
  intro: { title: string; text: string; cta: string; to: string };
  allLabel: string;
  columns: { title: string; items: MenuItem[] }[];
};

export const featuresMenu: MenuConfig = {
  label: "Features",
  intro: {
    title: "Dental practice software",
    text: "Your diary, online booking, reminders, forms, payments and reports in one place, built for UK private practices.",
    cta: "Explore DentDock",
    to: "/features",
  },
  allLabel: "All features",
  columns: [
    {
      title: "Your patients",
      items: [
        { label: "Online booking", to: "/features/online-booking", Icon: Globe },
        { label: "Reminders and recalls", to: "/features/reminders-and-recalls", Icon: Bell },
        { label: "Forms", to: "/features/forms", Icon: FileText },
        { label: "Switching", to: "/features/switching", Icon: ArrowRightLeft },
      ],
    },
    {
      title: "Your practice",
      items: [
        { label: "Calendar", to: "/features/calendar", Icon: CalendarDays },
        { label: "Payments", to: "/features/payments", Icon: CreditCard },
        { label: "Reports", to: "/features/reports", Icon: BarChart3 },
        { label: "Security", to: "/features/security", Icon: ShieldCheck },
      ],
    },
  ],
};

export const solutionsMenu: MenuConfig = {
  label: "Solutions",
  intro: {
    title: "Solutions for your practice",
    text: "The everyday problems DentDock fixes, and how it fits the way your practice works.",
    cta: "See all solutions",
    to: "/solutions",
  },
  allLabel: "All solutions",
  columns: [
    {
      title: "By problem",
      items: [{ label: "Reduce no-shows", to: "/solutions/reduce-no-shows", Icon: CalendarX }],
    },
    {
      title: "By practice type",
      items: [{ label: "Private practices", to: "/solutions/private-practices", Icon: Building2 }],
    },
  ],
};

/** Typed-route escape hatch: menu paths are plain strings. */
function To({ to, ...rest }: { to: string } & Omit<React.ComponentProps<typeof Link>, "to">) {
  return <Link to={to as "/features"} {...rest} />;
}

function Intro({ menu, onClose }: { menu: MenuConfig; onClose: () => void }) {
  return (
    <div className="h-full rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#E0EAFF] p-7 flex flex-col">
      <p className="text-[20px] font-semibold text-[#2563EB] leading-snug">{menu.intro.title}</p>
      <p className="mt-2 text-[14px] text-[#334155] leading-relaxed">{menu.intro.text}</p>
      <To to={menu.intro.to} onClick={onClose} className="mt-auto pt-6 self-start">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] transition-colors">
          {menu.intro.cta} <ChevronRight className="w-4 h-4" />
        </span>
      </To>
    </div>
  );
}

function ListRow({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { label, to, Icon } = item;
  return (
    <To
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
    </To>
  );
}

const divider = "lg:border-l lg:border-[#DBEAFE] lg:pl-10";

function MenuLayout({ menu, onClose }: { menu: MenuConfig; onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-10 items-stretch pr-4">
      <Intro menu={menu} onClose={onClose} />
      {menu.columns.map((col) => (
        <div key={col.title} className={divider}>
          <p className="text-[15px] font-semibold text-[#0F172A] mb-3">{col.title}</p>
          {col.items.map((it) => (
            <ListRow key={it.to} item={it} onClose={onClose} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Desktop: the label opens a full-width panel under the navbar (hover or click). */
export function MegaMenuDesktop({ menu }: { menu: MenuConfig }) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(80);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  // The panel lives in document.body, so place it just under the navbar bar.
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const bar = wrap.current?.closest("header")?.firstElementChild as HTMLElement | null;
      if (bar) setTop(bar.getBoundingClientRect().bottom);
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrap.current?.contains(t) || panel.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const panelEl = (
    <div
      ref={panel}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      style={{ top }}
      className={cn(
        "hidden lg:block fixed inset-x-0 z-50 pt-2 px-4 lg:px-8 transition-[opacity,transform,visibility] duration-200",
        open
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-1 pointer-events-none",
      )}
    >
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white border border-[#E5EDFB] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)] p-5 lg:p-6">
        <MenuLayout menu={menu} onClose={close} />
      </div>
    </div>
  );

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
        {menu.label}
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")}
          strokeWidth={2.25}
        />
      </button>
      {mounted && createPortal(panelEl, document.body)}
    </div>
  );
}

/** Phone drawer: the label expands into its list of pages. */
export function MegaMenuMobile({ menu, onNavigate }: { menu: MenuConfig; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const items = menu.columns.flatMap((c) => c.items);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-[15px] font-medium text-neutral-800 px-3 py-3.5 hover:bg-neutral-50 border-b border-neutral-100"
      >
        {menu.label}
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="mt-2 mb-3 ml-2 border-l border-[#E5EDFB] pl-2 flex flex-col gap-0.5">
          <To
            to={menu.intro.to}
            onClick={onNavigate}
            className="px-3 py-3 text-[15px] font-semibold text-[#2563EB] rounded-lg hover:bg-[#F3F7FF]"
          >
            {menu.allLabel}
          </To>
          {items.map(({ label, to, Icon }) => (
            <To
              key={to}
              to={to}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-3 text-[15px] text-neutral-700 rounded-lg hover:bg-[#F3F7FF]"
            >
              <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.9} />
              {label}
            </To>
          ))}
        </div>
      )}
    </div>
  );
}
