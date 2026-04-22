import { useState } from "react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import DashboardAnimation from "@/components/home/DashboardAnimation";

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
    <div className="flex flex-col items-center gap-2 max-w-md mx-auto mt-10 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full"
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
      </form>
      {error && (
        <p className="text-sm text-red-500 text-center w-full mt-1">{error}</p>
      )}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="waitlist"
      className="relative bg-white min-h-screen flex flex-col items-center justify-center pt-40 md:pt-48 pb-16 px-6 overflow-hidden"
    >
      {/* Aurora background — pure CSS, no component needed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 7%, rgba(255,255,255,0.6) 10%, rgba(255,255,255,0.6) 12%, rgba(255,255,255,0) 16%), repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
          backgroundSize: "300%, 200%",
          backgroundPosition: "50% 50%, 50% 50%",
          filter: "blur(40px)",
          opacity: 0.45,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 100% 0%, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 100% 0%, black 10%, transparent 70%)",
          animation: "auroraMove 60s linear infinite",
        }}
      />

      {/* Bottom fade into white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%)",
        }}
      />

      {/* Decorative dot grid (kept) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
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
        className="relative z-10 text-center max-w-3xl mx-auto"
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
          className="text-[2.5rem] md:text-[3.75rem] lg:text-[4.5rem] text-center text-neutral-900 leading-[1.15] tracking-[-0.03em] max-w-4xl mx-auto"
          style={{ fontWeight: 600 }}
        >
          Dental software for{" "}
          <span className="text-[#2563EB] whitespace-nowrap">UK private practices</span>
        </h1>
      </AnimatedGroup>

      {/* Subheadline */}
      <AnimatedGroup
        className="relative z-10"
        variants={{ container: makeContainer(0.3), item: itemBlurSlide }}
      >
        <p className="text-lg text-neutral-500 max-w-xl mx-auto text-center leading-relaxed mt-5">
          Online booking, automated reminders, payments and recalls, all in one platform.
          Finally, software that works as hard as you do.
        </p>
      </AnimatedGroup>

      {/* Waitlist form */}
      <AnimatedGroup
        className="relative z-10 w-full"
        variants={{ container: makeContainer(0.4), item: itemBlurSlide }}
      >
        <WaitlistForm />
      </AnimatedGroup>

      {/* Trust strip */}
      <AnimatedGroup
        className="relative z-10 mt-4"
        variants={{ container: makeContainer(0.5), item: itemBlurSlide }}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {["No contracts", "No setup fees", "Live within the day"].map(
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
        className="relative z-10 mt-4 flex justify-center"
        variants={{ container: makeContainer(0.6), item: itemBlurSlide }}
      >
        <p className="text-sm text-neutral-400 text-center max-w-sm mx-auto mt-5 leading-relaxed">
          Be one of the <span className="text-neutral-700 font-medium">first 30 practices</span>, get priority support and help shape the product from day one.
        </p>
      </AnimatedGroup>

      {/* Dashboard animation */}
      <div className="relative z-10 w-full">
        <DashboardAnimation />
      </div>
    </section>
  );
}
