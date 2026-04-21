import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import ToothIcon from "@/components/icons/ToothIcon";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({
    meta: [
      {
        title:
          "Join the waitlist — Dent Dock | Dental Practice Management Software",
      },
      {
        name: "description",
        content:
          "Be among the first UK private practices to get Dent Dock. Priority support and early access pricing locked in.",
      },
      {
        property: "og:title",
        content: "Join the Dent Dock waitlist",
      },
      {
        property: "og:description",
        content:
          "Be among the first UK private practices to get Dent Dock. Priority support and early access pricing locked in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const perks = [
  "Priority access when we open up",
  "Early access pricing locked in for life",
  "Direct line to the founders for setup help",
  "First look at new features before launch",
];

function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setError(null);
    setSubmitted(true);
    console.log("Waitlist signup:", {
      email: trimmedEmail,
      practice: trimmedPractice,
      role: role.trim(),
    });
  };

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

      {/* Decorative background */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.05), transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.14em] mb-4">
                Early access
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.05] mb-5">
                Join the <span className="text-[#2563EB]">waitlist</span>
              </h1>
              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#475569] mb-8 max-w-[480px]">
                We're rolling out Dent Dock to a small group of UK private practices first. Add your details and we'll be in touch personally when it's your turn.
              </p>

              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="text-[15px] leading-[1.5] text-[#0F172A]">
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-3xl bg-[#FAFAFA] border border-[#EEEEEE] p-6 sm:p-8"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#dcfce7]">
                    <Check className="w-6 h-6 text-[#16a34a]" strokeWidth={3} />
                  </div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    You're on the list
                  </h2>
                  <p className="text-[15px] leading-[1.6] text-[#475569] max-w-sm mx-auto">
                    Thanks for joining. We'll email you personally when it's your turn — no automated sequence, promise.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline mt-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-medium text-[#0F172A] mb-1.5"
                    >
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@practice.com"
                      maxLength={255}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                      style={
                        {
                          ["--tw-ring-color" as string]:
                            "rgba(37,99,235,0.3)",
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div>
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                      style={
                        {
                          ["--tw-ring-color" as string]:
                            "rgba(37,99,235,0.3)",
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-[13px] font-medium text-[#0F172A] mb-1.5"
                    >
                      Your role <span className="text-[#94A3B8] font-normal">(optional)</span>
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                      style={
                        {
                          ["--tw-ring-color" as string]:
                            "rgba(37,99,235,0.3)",
                        } as React.CSSProperties
                      }
                    >
                      <option value="">Select your role</option>
                      <option value="principal">Principal dentist / Owner</option>
                      <option value="associate">Associate dentist</option>
                      <option value="manager">Practice manager</option>
                      <option value="reception">Reception / Admin</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
                  >
                    Join the waitlist
                  </button>

                  <p className="text-[12px] text-[#94A3B8] text-center">
                    No spam. We'll only email you about Dent Dock.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
