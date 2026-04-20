import { useEffect, useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  Users,
  CreditCard,
  RefreshCw,
  FileText,
} from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

const SIGNUP_URL = "https://app.dentdock.co.uk/signup";

const transition = {
  type: "spring" as const,
  bounce: 0.3,
  duration: 1.5,
};

const itemBlurSlide = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition },
};

const makeContainer = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: delay },
  },
});

function AnnouncementPill() {
  return (
    <a
      href="#features"
      className="group mx-auto inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600 transition-all hover:bg-neutral-200"
    >
      <span className="flex items-center gap-2">
        <span style={{ color: "#2563EB" }}>✦</span>
        Launching 2025 — Free migration from Dentally & EXACT
      </span>
      <span className="block h-4 w-px bg-neutral-300" />
      <span className="relative size-5 overflow-hidden rounded-full bg-neutral-200/70">
        <span className="absolute inset-0 flex w-10 transition-transform duration-500 ease-in-out group-hover:-translate-x-1/2">
          <span className="flex size-5 items-center justify-center">
            <ArrowRight className="m-auto size-3 text-neutral-700" />
          </span>
          <span className="flex size-5 items-center justify-center">
            <ArrowRight className="m-auto size-3 text-neutral-700" />
          </span>
        </span>
      </span>
    </a>
  );
}

function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when top of element at bottom of viewport, 1 when reaching ~40% from top
      const start = vh;
      const end = vh * 0.4;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const rot = 18 * (1 - p);
      el.style.transform = `perspective(1200px) rotateX(${rot}deg)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const navIcons = [
    { Icon: CalendarDays, active: true },
    { Icon: Users, active: false },
    { Icon: CreditCard, active: false },
    { Icon: RefreshCw, active: false },
    { Icon: FileText, active: false },
  ];

  return (
    <div
      id="dashboard-preview"
      ref={ref}
      className="bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-200/60 ring-1 ring-neutral-100 p-3 md:p-5 mx-auto max-w-5xl"
      style={{
        transform: "perspective(1200px) rotateX(18deg)",
        transition: "transform 0.6s ease",
        transformOrigin: "center top",
        willChange: "transform",
      }}
    >
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        {/* Top bar */}
        <div className="h-10 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
          </div>
          <div className="flex-1 bg-white rounded-md mx-6 px-3 py-1 text-xs text-neutral-400 text-center font-mono">
            app.dentdock.co.uk/calendar
          </div>
        </div>

        {/* Body */}
        <div className="flex h-[420px] md:h-[500px]">
          {/* Sidebar */}
          <div
            className="w-14 flex flex-col items-center py-4 gap-2"
            style={{ backgroundColor: "#0f172a" }}
          >
            {navIcons.map(({ Icon, active }, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: active ? "#2563EB" : "rgba(255,255,255,0.1)" }}
              >
                <Icon size={15} className={active ? "text-white" : "text-white/50"} />
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-3 border-b border-neutral-100 flex justify-between items-center">
              <div className="font-bold text-sm text-neutral-900">Wednesday, 15 April</div>
              <div className="text-xs text-neutral-400">8 appointments · 2 slots free</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 border-b border-neutral-100">
              <div className="px-5 py-3 border-r border-neutral-100">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                  Today's revenue
                </div>
                <div className="text-lg font-extrabold text-green-600">£1,240</div>
              </div>
              <div className="px-5 py-3 border-r border-neutral-100">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                  Booked
                </div>
                <div className="text-lg font-extrabold" style={{ color: "#2563EB" }}>
                  8 / 10
                </div>
              </div>
              <div className="px-5 py-3">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                  Status
                </div>
                <div className="text-lg font-extrabold text-neutral-900">7 confirmed</div>
              </div>
            </div>

            {/* Appointments */}
            <div className="flex-1 overflow-hidden p-4 flex flex-col gap-2">
              {/* Row 1 */}
              <div className="flex items-center gap-3">
                <div className="text-[11px] text-neutral-300 w-9 shrink-0">09:00</div>
                <div
                  className="flex-1 rounded-lg px-3 py-2 flex justify-between items-center bg-blue-50"
                  style={{ borderLeft: "3px solid #2563EB" }}
                >
                  <div>
                    <div className="text-xs font-semibold text-neutral-800">
                      James Thompson · Routine Checkup
                    </div>
                    <div className="text-[10px] text-neutral-400">30 min · Surgery 1</div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 rounded-full px-2 py-0.5">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-3">
                <div className="text-[11px] text-neutral-300 w-9 shrink-0">09:45</div>
                <div className="flex-1 rounded-lg px-3 py-2 flex justify-between items-center bg-green-50 border-l-[3px] border-green-500">
                  <div>
                    <div className="text-xs font-semibold text-neutral-800">
                      Maria Lombardi · Hygiene
                    </div>
                    <div className="text-[10px] text-neutral-400">45 min · Surgery 2</div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 rounded-full px-2 py-0.5">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-3">
                <div className="text-[11px] text-neutral-300 w-9 shrink-0">10:30</div>
                <div className="flex-1 rounded-lg px-3 py-2 flex justify-center items-center bg-white border border-dashed border-neutral-200 text-[11px] text-neutral-300">
                  Free slot
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center gap-3">
                <div className="text-[11px] text-neutral-300 w-9 shrink-0">11:15</div>
                <div className="flex-1 rounded-lg px-3 py-2 flex justify-between items-center bg-purple-50 border-l-[3px] border-purple-500">
                  <div>
                    <div className="text-xs font-semibold text-neutral-800">
                      Robert Keane · Whitening
                    </div>
                    <div className="text-[10px] text-neutral-400">60 min · Surgery 1</div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 rounded-full px-2 py-0.5">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.06), transparent 70%)",
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.06), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Step 1: Pill */}
      <AnimatedGroup
        className="mx-auto"
        variants={{ container: makeContainer(0), item: itemBlurSlide }}
      >
        <AnnouncementPill />
      </AnimatedGroup>

      {/* Step 2: H1 */}
      <AnimatedGroup
        className="mt-8"
        variants={{ container: makeContainer(0.15), item: itemBlurSlide }}
      >
        <h1
          className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] text-neutral-900 text-center max-w-4xl mx-auto"
          style={{
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
          }}
        >
          Practice management software that actually{" "}
          <span style={{ color: "#2563EB" }}>makes sense.</span>
        </h1>
      </AnimatedGroup>

      {/* Step 3: Subheadline */}
      <AnimatedGroup
        variants={{ container: makeContainer(0.25), item: itemBlurSlide }}
      >
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto text-center leading-relaxed mt-6">
          DentDesk handles your bookings, reminders, payments and recalls — so you can focus on
          patients, not admin. Built for independent UK practices going private.
        </p>
      </AnimatedGroup>

      {/* Step 4: CTAs */}
      <AnimatedGroup
        className="mt-10"
        variants={{ container: makeContainer(0.35), item: itemBlurSlide }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="bg-neutral-900/10 rounded-[14px] border border-neutral-900/5 p-0.5">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center text-white font-semibold text-base px-6 py-3 rounded-xl transition-all"
              style={{
                backgroundColor: "#2563EB",
                boxShadow: "0 12px 28px -8px rgba(37, 99, 235, 0.5)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
            >
              Start your free trial
            </a>
          </div>
          <a
            href="#demo"
            className="text-neutral-600 font-medium text-base px-6 py-3 rounded-xl hover:bg-neutral-100 transition-all"
          >
            Watch 2-min demo
          </a>
        </div>
      </AnimatedGroup>

      {/* Step 5: Trust strip */}
      <AnimatedGroup
        className="mt-4"
        variants={{ container: makeContainer(0.45), item: itemBlurSlide }}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            "No credit card required",
            "30-day free trial",
            "UK data residency",
            "GDPR compliant",
          ].map((t, i, arr) => (
            <span key={t} className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">{t}</span>
              {i < arr.length - 1 && (
                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              )}
            </span>
          ))}
        </div>
      </AnimatedGroup>

      {/* Step 6: Social proof */}
      <AnimatedGroup
        className="mt-6"
        variants={{ container: makeContainer(0.55), item: itemBlurSlide }}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
          <span className="text-sm text-neutral-500 italic">
            "Finally, software that works the way we do." — Dr Sarah Okafor, Smile Studio London
          </span>
        </div>
      </AnimatedGroup>

      {/* Step 7: Dashboard mockup */}
      <AnimatedGroup
        className="w-full"
        variants={{ container: makeContainer(0.65), item: itemBlurSlide }}
      >
        <div className="mt-16 w-full max-w-6xl mx-auto px-4 relative">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none"
            style={{ ["--tw-gradient-from-position" as string]: "35%" }}
          />
          <DashboardMockup />
        </div>
      </AnimatedGroup>
    </section>
  );
}
