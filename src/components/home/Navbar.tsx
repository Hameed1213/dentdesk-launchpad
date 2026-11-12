import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import ToothIcon from "@/components/icons/ToothIcon";
import {
  MegaMenuDesktop,
  MegaMenuMobile,
  featuresMenu,
  solutionsMenu,
} from "@/components/home/FeaturesMenu";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/#support" },
  { label: "Comparisons", href: "/compare" },
  { label: "FAQ", href: "/#faq" },
];

function Logo() {
  return (
    <Link
      to="/"
      aria-label="Dent Dock — go to homepage"
      className="flex items-center gap-2 shrink-0"
    >
      <ToothIcon size={22} color="#2563EB" />
      <span
        className="text-lg tracking-tight"
        style={{ color: "#2563EB", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Dent Dock
      </span>
    </Link>
  );
}

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const hashIdx = href.indexOf("#");
  if (hashIdx === -1) return;
  const id = href.slice(hashIdx + 1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // If element not on current page, fall through to default <a> nav (e.g. /#about)
}

function scrollToWaitlist(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("waitlist");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          scrolled
            ? "mx-4 sm:mx-6 mt-3 max-w-4xl lg:mx-auto rounded-2xl border border-neutral-200/60 bg-white/80 shadow-sm backdrop-blur-lg"
            : "mx-auto max-w-6xl border border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 transition-all duration-300",
            scrolled ? "py-2.5" : "py-4",
          )}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            <MegaMenuDesktop menu={featuresMenu} />
            <MegaMenuDesktop menu={solutionsMenu} />
            {navLinks
              .filter((l) => l.label !== "Features")
              .map((l) =>
                l.href.includes("#") ? (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => smoothScrollTo(e, l.href)}
                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.href as "/compare"}
                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                ),
              )}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/waitlist"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px"
              style={{
                backgroundColor: "#2563EB",
                boxShadow: "0 8px 20px -6px rgba(37, 99, 235, 0.45)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
            >
              Join the waitlist
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-700 shadow-sm hover:bg-neutral-100 transition-colors"
          >
            {mobileOpen ? (
              <X size={16} strokeWidth={2.25} />
            ) : (
              <Menu size={16} strokeWidth={2.25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile: menu slides in from the right */}
      <div
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "lg:hidden fixed inset-0 bg-[#0F172A]/40 transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "lg:hidden fixed inset-y-0 right-0 w-[86%] max-w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
          >
            <X size={16} strokeWidth={2.25} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col">
          <MegaMenuMobile menu={featuresMenu} onNavigate={() => setMobileOpen(false)} />
          <MegaMenuMobile menu={solutionsMenu} onNavigate={() => setMobileOpen(false)} />
          {navLinks
            .filter((l) => l.label !== "Features")
            .map((l) =>
              l.href.includes("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    smoothScrollTo(e, l.href);
                  }}
                  className="flex items-center justify-between text-[15px] font-medium text-neutral-800 px-3 py-3.5 hover:bg-neutral-50 border-b border-neutral-100"
                >
                  {l.label}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href as "/compare"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-[15px] font-medium text-neutral-800 px-3 py-3.5 hover:bg-neutral-50 border-b border-neutral-100"
                >
                  {l.label}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ),
            )}
        </nav>
        <div className="p-5 border-t border-neutral-100">
          <Link
            to="/waitlist"
            onClick={() => setMobileOpen(false)}
            className="block text-[15px] font-semibold text-white text-center px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]"
          >
            Join the waitlist
          </Link>
        </div>
      </aside>
    </header>
  );
}
