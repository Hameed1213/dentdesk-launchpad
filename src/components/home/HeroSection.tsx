import { useState } from "react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
    <AuroraBackground showRadialGradient={true} className="pt-24 pb-8 px-6">
      <section
        id="waitlist"
        className="relative w-full md:min-h-screen flex flex-col items-center justify-center pt-8 md:pt-28 pb-16 overflow-x-clip"
      >
        {/* H1 */}
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
            className="text-[2.5rem] md:text-[3.75rem] lg:text-[4.5rem] text-center text-neutral-900 leading-[1.15] tracking-[-0.03em] max-w-4xl mx-auto"
            style={{ fontWeight: 600 }}
          >
            Dental software for{" "}
            <span className="text-[#2563EB]">UK private practices</span>
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
          className="mt-4 flex justify-center"
          variants={{ container: makeContainer(0.6), item: itemBlurSlide }}
        >
          <p className="text-sm text-neutral-400 text-center max-w-sm mx-auto mt-5 leading-relaxed">
            Be one of the{" "}
            <span className="text-neutral-700 font-medium">first 30 practices</span>, get priority support and help shape the product from day one.
          </p>
        </AnimatedGroup>

        {/* Dashboard animation */}
        <DashboardAnimation />
      </section>
    </AuroraBackground>
  );
}
