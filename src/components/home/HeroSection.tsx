import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AuroraBackground } from "@/components/ui/aurora-background";
import DashboardAnimation from "@/components/home/DashboardAnimation";

const transition = {
  type: "spring" as const,
  bounce: 0.2,
  duration: 0.35,
};

const itemBlurSlide = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 6 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition },
};

const makeContainer = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: delay },
  },
});

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — see handleSubmit
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Honeypot: bots auto-fill fields named "website". Real users never see
    // or interact with this input (it's visually hidden + aria-hidden + tabIndex -1).
    // If it has any value, silently fake success — do NOT insert and do NOT
    // show an error, so the bot thinks it worked and doesn't retry.
    // Do not remove this check or the corresponding hidden input.
    if (website) {
      setSubmitted(true);
      return;
    }

    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!turnstileToken) {
      setError("Please wait a moment and try again.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/public/verify-waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, turnstile_token: turnstileToken }),
      });

      // Token is single-use — reset for next attempt regardless of outcome.
      turnstileRef.current?.reset();
      setTurnstileToken(null);

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      if (res.status === 400) setError("Please enter a valid email address.");
      else if (res.status === 403) setError("Please try again.");
      else setError("Something went wrong, please try again later.");
    } catch {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setError("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
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
        {/* Honeypot — hidden from humans, irresistible to bots. Do not remove. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@practice.com"
          aria-label="Email address"
          maxLength={255}
          className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all shadow-sm"
          style={
            {
              ["--tw-ring-color" as string]: "rgba(37,99,235,0.3)",
            } as React.CSSProperties
          }
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2563EB] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-md shadow-blue-500/20 whitespace-nowrap disabled:opacity-60"
        >
          {isLoading ? "Joining..." : "Join the waitlist →"}
        </button>
      </form>
      {siteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          options={{ size: "invisible" }}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
        />
      )}
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
          variants={{ container: makeContainer(0.05), item: itemBlurSlide }}
        >
          <p className="text-lg text-neutral-500 max-w-xl mx-auto text-center leading-relaxed mt-5">
            Online booking, automated reminders, payments and recalls. Built for UK private practices.
          </p>
        </AnimatedGroup>

        {/* Waitlist form */}
        <AnimatedGroup
          className="w-full"
          variants={{ container: makeContainer(0.1), item: itemBlurSlide }}
        >
          <WaitlistForm />
        </AnimatedGroup>

        {/* Trust strip */}
        <AnimatedGroup
          className="mt-4"
          variants={{ container: makeContainer(0.14), item: itemBlurSlide }}
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
          variants={{ container: makeContainer(0.18), item: itemBlurSlide }}
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
