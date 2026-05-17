import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ToothIcon from "@/components/icons/ToothIcon";

type Comparison = {
  competitor: string;
  slug: "dentally" | "ismile-dental-software" | "software-of-excellence";
  to: "/compare/dentally" | "/compare/ismile-dental-software" | "/compare/software-of-excellence";
  tagline: string;
  summary: string;
  accent: string;
  background: string;
};

const comparisons: Comparison[] = [
  {
    competitor: "Dentally",
    slug: "dentally",
    to: "/compare/dentally",
    tagline: "Dent Dock vs Dentally",
    summary:
      "£49/mo flat vs £220+/mo per user. Built for private practices going cloud-first.",
    accent: "#2563EB",
    background:
      "radial-gradient(ellipse 70% 90% at 20% 30%, rgba(37,99,235,0.18), transparent 65%), radial-gradient(ellipse 70% 90% at 85% 75%, rgba(99,102,241,0.14), transparent 65%), linear-gradient(135deg, #F5F8FF 0%, #EAF1FF 100%)",
  },
  {
    competitor: "iSmile",
    slug: "ismile-dental-software",
    to: "/compare/ismile-dental-software",
    tagline: "Dent Dock vs iSmile",
    summary:
      "Published £49/mo vs demo-and-quote pricing. Self-serve setup vs dedicated consultant onboarding.",
    accent: "#2563EB",
    background:
      "radial-gradient(ellipse 80% 100% at 80% 20%, rgba(37,99,235,0.22), transparent 60%), radial-gradient(ellipse 60% 80% at 15% 85%, rgba(56,189,248,0.16), transparent 65%), linear-gradient(215deg, #EAF1FF 0%, #F5F8FF 100%)",
  },
  {
    competitor: "Software of Excellence",
    slug: "software-of-excellence",
    to: "/compare/software-of-excellence",
    tagline: "Dent Dock vs Software of Excellence",
    summary:
      "Transparent £49/mo vs sales-quote pricing. Modern cloud workflow vs the UK's longest-established PMS.",
    accent: "#2563EB",
    background:
      "radial-gradient(ellipse 75% 95% at 50% 15%, rgba(37,99,235,0.20), transparent 65%), radial-gradient(ellipse 55% 75% at 20% 90%, rgba(129,140,248,0.16), transparent 65%), radial-gradient(ellipse 55% 75% at 85% 85%, rgba(56,189,248,0.14), transparent 65%), linear-gradient(180deg, #EEF2FF 0%, #F5F8FF 100%)",
  },
];

export const Route = createFileRoute("/compare/")({
  component: CompareHubPage,
  head: () => ({
    meta: [
      { title: "Compare Dent Dock · Honest comparisons vs UK dental software" },
      {
        name: "description",
        content:
          "Honest, side-by-side comparisons of Dent Dock against the major UK dental practice management systems. Pick a comparison to see pricing, features and setup head-to-head.",
      },
      { property: "og:title", content: "Compare Dent Dock · vs UK dental software" },
      {
        property: "og:description",
        content:
          "Side-by-side comparisons of Dent Dock against Dentally and other UK dental practice management systems.",
      },
      { property: "og:url", content: "https://dentdock.co.uk/compare" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://dentdock.co.uk/compare" }],
  }),
});

function CompareHubPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F162B]">
      <Navbar />

      <div className="relative bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white overflow-hidden">
        {/* Top irregular fade to white */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 z-10"
          style={{
            background:
              "radial-gradient(ellipse 45% 120% at 10% 0%, white 55%, transparent 85%), radial-gradient(ellipse 40% 110% at 32% 0%, white 50%, transparent 85%), radial-gradient(ellipse 50% 130% at 55% 0%, white 55%, transparent 85%), radial-gradient(ellipse 45% 115% at 78% 0%, white 50%, transparent 85%), radial-gradient(ellipse 40% 100% at 95% 0%, white 50%, transparent 85%), radial-gradient(ellipse 130% 90% at 50% 0%, white 35%, transparent 80%)",
          }}
        />
        {/* Bottom irregular fade to white */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-10"
          style={{
            background:
              "radial-gradient(ellipse 75% 130% at 30% 100%, white 55%, transparent 85%), radial-gradient(ellipse 65% 110% at 80% 100%, white 50%, transparent 85%), radial-gradient(ellipse 120% 90% at 50% 100%, white 35%, transparent 80%)",
          }}
        />
        {/* Center white blobs */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 30% 25% at 15% 40%, rgba(255,255,255,0.85), transparent 70%), radial-gradient(ellipse 35% 30% at 85% 55%, rgba(255,255,255,0.8), transparent 70%), radial-gradient(ellipse 25% 20% at 50% 50%, rgba(255,255,255,0.6), transparent 70%), radial-gradient(ellipse 28% 22% at 35% 65%, rgba(255,255,255,0.7), transparent 70%), radial-gradient(ellipse 30% 25% at 70% 35%, rgba(255,255,255,0.75), transparent 70%)",
          }}
        />
        <div className="relative z-20">


      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1
            className="text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] font-semibold"
            style={{ color: "#0F162B" }}
          >
            <span style={{ color: "#2563EB" }}>Dent Dock</span> vs the alternatives
          </h1>
          <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.55] text-[#4B5563] max-w-2xl mx-auto">
            Honest side-by-side comparisons against the major UK dental practice
            software, written for private practices choosing what to switch to.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                to={c.to}
                className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-[0_1px_2px_rgba(15,22,43,0.04)] hover:shadow-[0_12px_32px_-12px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 hover:border-[#2563EB]/30 transition-all duration-300"
              >
                {/* Visual matchup */}
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden"
                  style={{ background: c.background }}
                >
                  {/* Soft grid */}
                  <div
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 80%)",
                    }}
                  />

                  <div className="relative z-10 h-full w-full flex items-center justify-center gap-4 sm:gap-6 px-5">
                    {/* Dent Dock side */}
                    <div className="flex flex-col items-center gap-2 transition-transform duration-500 group-hover:-translate-x-1">
                      <div
                        className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.45)] border border-white"
                      >
                        <ToothIcon size={26} color="#2563EB" />
                      </div>
                      <span
                        className="text-[11px] sm:text-[12px] font-semibold tracking-[-0.01em]"
                        style={{ color: "#2563EB" }}
                      >
                        Dent Dock
                      </span>
                    </div>

                    {/* VS pill */}
                    <div
                      className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#0F162B] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.04em] shadow-[0_6px_16px_-6px_rgba(15,22,43,0.4)]"
                    >
                      VS
                    </div>

                    {/* Competitor side */}
                    <div className="flex flex-col items-center gap-2 transition-transform duration-500 group-hover:translate-x-1">
                      <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(15,22,43,0.18)] border border-neutral-100">
                        <span
                          className="text-[18px] sm:text-[20px] font-bold tracking-[-0.04em]"
                          style={{ color: "#0F162B" }}
                        >
                          {c.competitor.charAt(0)}
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-[12px] font-semibold tracking-[-0.01em] text-[#0F162B] text-center leading-[1.2] whitespace-pre-line">
                        {c.slug === "software-of-excellence" ? "Software\nof Excellence" : c.competitor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <h2
                    className="text-[22px] sm:text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold"
                    style={{ color: "#0F162B" }}
                  >
                    {c.tagline}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-[#4B5563] flex-1">
                    {c.summary}
                  </p>
                  <div
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold"
                    style={{ color: c.accent }}
                  >
                    See comparison
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 text-center">
            <h3
              className="text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.02em] font-semibold"
              style={{ color: "#0F162B" }}
            >
              Want to see more, or just have a chat?
            </h3>
            <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.55] text-[#4B5563] max-w-xl mx-auto">
              Message us on WhatsApp and we'll answer directly, or join the
              waitlist to get early access.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/447700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] font-semibold text-[#0F162B] hover:bg-neutral-50 transition-colors"
              >
                Contact us
              </a>
              <Link
                to="/waitlist"
                className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:-translate-y-px"
                style={{
                  backgroundColor: "#2563EB",
                  boxShadow: "0 8px 20px -6px rgba(37, 99, 235, 0.45)",
                }}
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
