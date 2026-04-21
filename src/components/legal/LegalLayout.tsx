import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="border-b border-[#EEEEEE]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ToothIcon size={22} color="#2563EB" />
            <span
              className="text-lg tracking-tight"
              style={{
                color: "#2563EB",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Dent Dock
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <p className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.14em] mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1] mb-3">
          {title}
        </h1>
        <p className="text-[14px] text-[#94A3B8] mb-12">Last updated: {updated}</p>

        <div className="prose-legal text-[15px] leading-[1.7] text-[#475569] space-y-6">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-[#EEEEEE]">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[20px] sm:text-[22px] font-medium text-[#0F172A] mt-10 mb-3 leading-tight">
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
