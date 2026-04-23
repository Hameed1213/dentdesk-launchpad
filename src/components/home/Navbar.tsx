import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import ToothIcon from "@/components/icons/ToothIcon";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const LOGIN_URL = "https://app.dentdock.co.uk";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 shrink-0">
      <ToothIcon size={22} color="#2563EB" />
      <span
        className="text-lg tracking-tight"
        style={{ color: "#2563EB", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Dent Dock
      </span>
    </a>
  );
}

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => smoothScrollTo(e, l.href)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href={LOGIN_URL}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Log in
            </a>
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
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-4 mt-2 rounded-2xl border border-neutral-200/60 bg-white/95 backdrop-blur-lg shadow-sm p-5 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                setMobileOpen(false);
                smoothScrollTo(e, l.href);
              }}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 px-3 py-2.5 rounded-lg hover:bg-neutral-100"
            >
              {l.label}
            </a>
          ))}
          <div className="h-px bg-neutral-200 my-2" />
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-neutral-700 hover:text-neutral-900 px-3 py-2.5 rounded-lg hover:bg-neutral-100"
          >
            Log in
          </a>
          <Link
            to="/waitlist"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-white text-center px-5 py-3 rounded-xl mt-1"
            style={{
              backgroundColor: "#2563EB",
              boxShadow: "0 8px 20px -6px rgba(37, 99, 235, 0.45)",
            }}
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
