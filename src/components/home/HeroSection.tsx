import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Users,
  CreditCard,
  RefreshCw,
  FileText,
} from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

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

function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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

              <div className="flex items-center gap-3">
                <div className="text-[11px] text-neutral-300 w-9 shrink-0">10:30</div>
                <div className="flex-1 rounded-lg px-3 py-2 flex justify-center items-center bg-white border border-dashed border-neutral-200 text-[11px] text-neutral-300">
                  Free slot
                </div>
              </div>

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

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
    console.log("Waitlist signup:", trimmed);
  };

  if (submitted) {
    return (
      <p className="text-sm text-green-600 font-medium text-center mt-2">
        ✓ You're on the list. We'll be in touch soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-10 w-full"
      noValidate
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@practice.com"
        aria-label="Email address"
        maxLength={255}
        className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all shadow-sm"
        style={
          {
            ["--tw-ring-color" as string]: "rgba(37,99,235,0.3)",
          } as React.CSSProperties
        }
      />
      <button
        type="submit"
        className="bg-[#2563EB] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
      >
        Join the waitlist →
      </button>
      {error && (
        <p className="sm:absolute sm:mt-16 text-xs text-red-500 text-center w-full mt-1">
          {error}
        </p>
      )}
    </form>
  );
}

export default function HeroSection() {
  return (
    <section
      id="waitlist"
      className="relative bg-white min-h-screen flex flex-col items-center justify-center pt-40 md:pt-48 pb-16 px-6 overflow-hidden"
    >
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

      {/* H1 — three lines, each animated with stagger */}
      <AnimatedGroup
        className="text-center max-w-3xl mx-auto"
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0 },
            },
          },
          item: itemBlurSlide,
        }}
      >
        <h1
          className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-center text-neutral-900 leading-[1.15] tracking-[-0.03em] max-w-4xl mx-auto"
          style={{ fontWeight: 600 }}
        >
          Dental software for{" "}
          <span className="text-[#2563EB] whitespace-nowrap">UK private practices</span>
        </h1>
      </AnimatedGroup>

      {/* Subheadline */}
      <AnimatedGroup
        variants={{ container: makeContainer(0.3), item: itemBlurSlide }}
      >
        <p className="text-lg text-neutral-500 max-w-xl mx-auto text-center leading-relaxed mt-5">
          Online booking, automated reminders, payments and recalls, all in one platform.
          Finally, software that works as hard as you do.
        </p>
      </AnimatedGroup>

      {/* Waitlist form */}
      <AnimatedGroup
        className="w-full"
        variants={{ container: makeContainer(0.4), item: itemBlurSlide }}
      >
        <WaitlistForm />
      </AnimatedGroup>

      {/* Trust strip */}
      <AnimatedGroup
        className="mt-4"
        variants={{ container: makeContainer(0.5), item: itemBlurSlide }}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {["GDPR compliant", "UK data residency", "Built for private practices"].map(
            (t, i, arr) => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-medium">{t}</span>
                {i < arr.length - 1 && (
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                )}
              </span>
            ),
          )}
        </div>
      </AnimatedGroup>

      {/* Social proof */}
      <AnimatedGroup
        className="mt-6"
        variants={{ container: makeContainer(0.6), item: itemBlurSlide }}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
          <span className="text-sm text-neutral-500 italic">
            "Finally, software that works the way we do." — Dr Sarah Okafor, Smile Studio London
          </span>
        </div>
      </AnimatedGroup>

      {/* Dashboard mockup */}
      <AnimatedGroup
        className="w-full"
        variants={{ container: makeContainer(0.7), item: itemBlurSlide }}
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
