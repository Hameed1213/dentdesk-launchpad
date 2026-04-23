import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Mail, Sparkles } from "lucide-react";
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
      { property: "og:title", content: "Join the Dent Dock waitlist" },
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

/* ---------------- Page ---------------- */
function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* ===================== LEFT — copy ===================== */}
      <section className="relative lg:w-1/2 bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white overflow-hidden flex flex-col px-8 py-10 lg:px-12 lg:py-14 min-h-[280px] lg:min-h-screen">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-20 relative">
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

        {/* Decorative blue blobs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.28), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(96,165,250,0.30), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(147,197,253,0.35), transparent 70%)",
            }}
          />
        </div>

        {/* Headline — vertically centered */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#2563EB]/15 backdrop-blur mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.12em]">
              Early access
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-medium tracking-tight text-[#0F172A] leading-[1.1]">
            Practice management,{" "}
            <span className="text-[#2563EB]">finally friendly.</span>
          </h1>
          <p className="text-[15px] lg:text-[16px] leading-[1.6] text-[#475569] mt-4">
            Built for UK private practices. Add your details and we'll be in touch personally when it's your turn.
          </p>
        </div>

        {/* Footer links */}
        <div className="relative z-10 mt-8 flex items-center gap-5 text-[13px] text-[#475569]">
          <Link to="/privacy" className="hover:text-[#0F172A] transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[#0F172A] transition-colors">
            Terms
          </Link>
          <a
            href="mailto:hello@dentdock.co.uk"
            className="hover:text-[#0F172A] transition-colors"
          >
            Contact
          </a>
        </div>
      </section>

      {/* ===================== RIGHT — form ===================== */}
      <section className="lg:w-1/2 flex flex-col px-6 sm:px-10 lg:px-16 py-10 lg:py-14 relative">
        <div className="flex justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md py-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7]">
                  <Check className="w-7 h-7 text-[#16a34a]" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-medium text-foreground mb-2">
                  You're on the list
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#475569] max-w-sm mx-auto">
                  Thanks for joining. We'll email you personally when it's your
                  turn — no automated sequence, promise.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:underline mt-6"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to home
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-medium tracking-tight text-[#0F172A] mb-2">
                    Join the waitlist
                  </h2>
                  <p className="text-[15px] leading-[1.5] text-[#475569]">
                    Be among the first UK private practices to get Dent Dock.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div>
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
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-[#2563EB] transition-all"
                        style={
                          {
                            ["--tw-ring-color" as string]:
                              "rgba(37,99,235,0.3)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
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
                      Your role{" "}
                      <span className="text-[#94A3B8] font-normal">
                        (optional)
                      </span>
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
                      <option value="principal">
                        Principal dentist / Owner
                      </option>
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
                    disabled={isLoading}
                    className="w-full bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60"
                  >
                    {isLoading ? "Joining..." : "Join the waitlist"}
                  </button>

                  <p className="text-[12px] text-[#94A3B8] text-center">
                    No spam. We'll only email you about Dent Dock.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
