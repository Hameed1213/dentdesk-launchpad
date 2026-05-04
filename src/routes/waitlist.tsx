import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Mail, Sparkles } from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({
    meta: [
      { title: "Join the Waitlist — Dent Dock" },
      {
        name: "description",
        content:
          "Be among the first UK private practices to get early access to Dent Dock. Priority support and early access pricing locked in.",
      },
      { property: "og:url", content: "https://dentdock.co.uk/waitlist" },
      { property: "og:title", content: "Join the Waitlist — Dent Dock" },
      {
        property: "og:description",
        content:
          "Be among the first UK private practices to get early access to Dent Dock.",
      },
      { property: "og:image", content: "https://dentdock.co.uk/og-image.png" },
      { name: "twitter:image", content: "https://dentdock.co.uk/og-image.png" },
      { name: "twitter:site", content: "@dentdock" },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk/waitlist" },
    ],
  }),
});

/* ---------------- Page ---------------- */
function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [role, setRole] = useState("");
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

    const trimmedEmail = email.trim();
    const trimmedPractice = practice.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!trimmedPractice) {
      setError("Please enter your practice name.");
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
        body: JSON.stringify({
          email: trimmedEmail,
          practice_name: trimmedPractice,
          role: role || undefined,
          turnstile_token: turnstileToken,
        }),
      });

      // Token is single-use — reset for next attempt regardless of outcome.
      turnstileRef.current?.reset();
      setTurnstileToken(null);

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      if (res.status === 400) setError("Please check your details and try again.");
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

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      {/* ===================== LEFT — copy ===================== */}
      <section className="relative lg:w-1/2 bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white overflow-hidden flex flex-col px-8 py-10 lg:px-12 lg:py-14 min-h-[280px] max-lg:min-h-0 max-lg:py-12 lg:min-h-screen">
        <div className="relative z-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ToothIcon size={24} color="#2563EB" />
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

          {/* Mobile + Tablet: Back to home inline with logo */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Decorative blue blobs — slow drifting */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <motion.div
            className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.28), transparent 70%)",
            }}
            animate={{ x: [0, 120, -80, 0], y: [0, -90, 70, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(96,165,250,0.30), transparent 70%)",
            }}
            animate={{ x: [0, -110, 70, 0], y: [0, 90, -70, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(147,197,253,0.35), transparent 70%)",
            }}
            animate={{ x: [0, 100, -90, 0], y: [0, -70, 100, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Headline — vertically centered */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md max-lg:max-w-2xl max-lg:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#2563EB]/15 backdrop-blur mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.12em]">
              Early access
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="text-3xl max-lg:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F172A] leading-[1.1]"
          >
            Practice management,{" "}
            <span className="text-[#2563EB]">finally friendly</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            className="text-[15px] lg:text-[16px] leading-[1.6] text-[#475569] mt-4"
          >
            Built for UK private practices. Add your email and our team will reach out directly.
          </motion.p>
        </div>

        {/* Footer links — hidden on tablet (rendered at page bottom instead) */}
        <div className="relative z-10 mt-8 hidden lg:flex items-center gap-5 text-[13px] text-[#475569]">
          <Link to="/privacy" className="hover:text-[#0F172A] transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[#0F172A] transition-colors">
            Terms
          </Link>
          <a
            href="https://wa.me/447700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F172A] transition-colors"
          >
            Contact
          </a>
        </div>
      </section>

      {/* ===================== RIGHT — form ===================== */}
      <section className="lg:w-1/2 flex flex-col px-6 sm:px-10 lg:px-16 py-10 lg:py-14 relative">
        {/* "Back to home" — hidden on tablet (now pinned to page top-right) */}
        <div className="hidden lg:flex justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md max-lg:max-w-none py-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7]">
                  <Check className="w-7 h-7 text-[#16a34a]" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-medium text-foreground mb-2">
                  You're on the list
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#475569] max-w-sm mx-auto">
                  Thanks for joining. We'll email you personally when early access opens.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline mt-6"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to home
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-medium tracking-tight text-[#0F172A] mb-2">
                    Join the waitlist
                  </h2>
                  <p className="text-[15px] leading-[1.5] text-[#475569]">
                    Be among the first UK private practices to get Dent Dock.
                  </p>
                </motion.div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
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
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-medium text-[#0F172A] mb-1.5"
                    >
                      Work email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@practice.com"
                        maxLength={255}
                        autoComplete="email"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                        style={
                          {
                            ["--tw-ring-color" as string]:
                              "rgba(37,99,235,0.3)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.33 }}
                  >
                    <label
                      htmlFor="practice"
                      className="block text-[13px] font-medium text-[#0F172A] mb-1.5"
                    >
                      Practice name
                    </label>
                    <input
                      id="practice"
                      type="text"
                      value={practice}
                      onChange={(e) => setPractice(e.target.value)}
                      placeholder="Smile Dental Clinic"
                      maxLength={120}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                      style={
                        {
                          ["--tw-ring-color" as string]:
                            "rgba(37,99,235,0.3)",
                        } as React.CSSProperties
                      }
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.41 }}
                  >
                    <label
                      htmlFor="role"
                      className="block text-[13px] font-medium text-[#0F172A] mb-1.5"
                    >
                      Your role{" "}
                      <span className="text-[#94A3B8] font-normal">
                        (optional)
                      </span>
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-base sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                      style={
                        {
                          ["--tw-ring-color" as string]:
                            "rgba(37,99,235,0.3)",
                        } as React.CSSProperties
                      }
                    >
                      <option value="">Select your role</option>
                      <option value="principal">
                        Principal dentist / Owner
                      </option>
                      <option value="associate">Associate dentist</option>
                      <option value="manager">Practice manager</option>
                      <option value="reception">Reception / Admin</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
                    className="w-full bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60"
                  >
                    {isLoading ? "Joining..." : "Join the waitlist"}
                  </motion.button>

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

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                    className="text-[12px] text-[#94A3B8] text-center"
                  >
                    No spam. We'll only email you about Dent Dock.
                  </motion.p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tablet-only: bottom legal/contact strip */}
      <div className="lg:hidden flex justify-center gap-6 px-6 py-6 border-t border-neutral-100">
        <Link
          to="/privacy"
          className="text-[12px] text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Privacy
        </Link>
        <Link
          to="/terms"
          className="text-[12px] text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Terms
        </Link>
        <a
          href="https://wa.me/447700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
