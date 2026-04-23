import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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

/* ---------------- Pupil ---------------- */
interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calc = () => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    if (!pupilRef.current) return { x: 0, y: 0 };
    const r = pupilRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist };
  };

  const pos = calc();

  return (
    <div
      ref={pupilRef}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

/* ---------------- EyeBall ---------------- */
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 28,
  pupilSize = 12,
  maxDistance = 6,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={eyeRef}
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        borderRadius: "50%",
        backgroundColor: eyeColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "height 0.1s ease-out",
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <Pupil
          size={pupilSize}
          maxDistance={maxDistance}
          pupilColor={pupilColor}
          forceLookX={forceLookX}
          forceLookY={forceLookY}
        />
      )}
    </div>
  );
};

/* ---------------- Page ---------------- */
function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isBlueBlinking, setIsBlueBlinking] = useState(false);
  const [isDarkBlinking, setIsDarkBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);

  const blueRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const tealRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blue blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setIsBlueBlinking(true);
        setTimeout(() => {
          setIsBlueBlinking(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  // Dark blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setIsDarkBlinking(true);
        setTimeout(() => {
          setIsDarkBlinking(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  // Look at each other when typing starts
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const t = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(t);
    }
  }, [isTyping]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, dx / 20));
    const faceY = Math.max(-10, Math.min(10, dy / 30));
    const bodySkew = Math.max(-6, Math.min(6, -dx / 120));
    return { faceX, faceY, bodySkew };
  };

  const bluePos = calculatePosition(blueRef);
  const darkPos = calculatePosition(darkRef);
  const tealPos = calculatePosition(tealRef);
  const yellowPos = calculatePosition(yellowRef);

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
      {/* ===================== LEFT — characters ===================== */}
      <section className="relative lg:w-1/2 bg-gradient-to-br from-[#EFF4FF] via-[#F5F8FF] to-[#FDF6FF] overflow-hidden flex flex-col px-8 py-10 lg:px-12 lg:py-14 min-h-[420px] lg:min-h-screen">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-20">
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

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.18), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(168,85,247,0.12), transparent 70%)",
            }}
          />
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-10 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#2563EB]/15 backdrop-blur mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.12em]">
              Early access
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-[#0F172A] leading-[1.1]">
            Practice management,{" "}
            <span className="text-[#2563EB]">finally friendly.</span>
          </h1>
          <p className="text-[15px] leading-[1.6] text-[#475569] mt-3">
            Built for UK private practices. Add your details and we'll be in touch personally when it's your turn.
          </p>
        </div>

        {/* Characters — anchored bottom */}
        <div className="relative z-10 mt-auto flex items-end justify-center gap-3 lg:gap-4 pt-12 select-none">
          {/* Blue tall — back */}
          <div
            ref={blueRef}
            className="relative"
            style={{
              width: 90,
              height: isTyping ? 280 : 250,
              backgroundColor: "#2563EB",
              borderRadius: "12px 12px 0 0",
              transform: `skewX(${bluePos.bodySkew}deg)`,
              transformOrigin: "bottom center",
              transition: "all 0.3s ease-out",
              zIndex: 1,
            }}
          >
            <div
              className="absolute flex gap-2"
              style={{
                left: isLookingAtEachOther
                  ? 50
                  : 30 + bluePos.faceX,
                top: isLookingAtEachOther ? 60 : 50 + bluePos.faceY,
                transition: "all 0.3s ease-out",
              }}
            >
              <EyeBall
                isBlinking={isBlueBlinking}
                forceLookX={isLookingAtEachOther ? 4 : undefined}
                forceLookY={isLookingAtEachOther ? 2 : undefined}
              />
              <EyeBall
                isBlinking={isBlueBlinking}
                forceLookX={isLookingAtEachOther ? 4 : undefined}
                forceLookY={isLookingAtEachOther ? 2 : undefined}
              />
            </div>
          </div>

          {/* Dark tall — middle */}
          <div
            ref={darkRef}
            className="relative"
            style={{
              width: 80,
              height: 200,
              backgroundColor: "#0F162B",
              borderRadius: "10px 10px 0 0",
              transform: isLookingAtEachOther
                ? `skewX(${darkPos.bodySkew + 4}deg)`
                : `skewX(${darkPos.bodySkew}deg)`,
              transformOrigin: "bottom center",
              transition: "all 0.3s ease-out",
              zIndex: 2,
            }}
          >
            <div
              className="absolute flex gap-1.5"
              style={{
                left: isLookingAtEachOther ? 22 : 22 + darkPos.faceX,
                top: isLookingAtEachOther ? 30 : 35 + darkPos.faceY,
                transition: "all 0.3s ease-out",
              }}
            >
              <EyeBall
                size={22}
                pupilSize={10}
                isBlinking={isDarkBlinking}
                forceLookX={isLookingAtEachOther ? -4 : undefined}
                forceLookY={isLookingAtEachOther ? 0 : undefined}
              />
              <EyeBall
                size={22}
                pupilSize={10}
                isBlinking={isDarkBlinking}
                forceLookX={isLookingAtEachOther ? -4 : undefined}
                forceLookY={isLookingAtEachOther ? 0 : undefined}
              />
            </div>
          </div>

          {/* Teal semi-circle — front left */}
          <div
            ref={tealRef}
            className="relative"
            style={{
              width: 110,
              height: 110,
              backgroundColor: "#14B8A6",
              borderRadius: "110px 110px 0 0",
              transform: `skewX(${tealPos.bodySkew * 0.6}deg)`,
              transformOrigin: "bottom center",
              transition: "all 0.3s ease-out",
              zIndex: 3,
              marginLeft: -8,
            }}
          >
            <div
              className="absolute flex gap-2.5"
              style={{
                left: 28 + tealPos.faceX,
                top: 38 + tealPos.faceY,
                transition: "all 0.3s ease-out",
              }}
            >
              <Pupil size={10} maxDistance={4} pupilColor="#0F162B" />
              <Pupil size={10} maxDistance={4} pupilColor="#0F162B" />
            </div>
          </div>

          {/* Yellow short — front right */}
          <div
            ref={yellowRef}
            className="relative"
            style={{
              width: 70,
              height: 130,
              backgroundColor: "#FACC15",
              borderRadius: "10px 10px 0 0",
              transform: `skewX(${yellowPos.bodySkew * 0.8}deg)`,
              transformOrigin: "bottom center",
              transition: "all 0.3s ease-out",
              zIndex: 3,
              marginLeft: -6,
            }}
          >
            <div
              className="absolute flex gap-1.5"
              style={{
                left: 18 + yellowPos.faceX,
                top: 30 + yellowPos.faceY,
                transition: "all 0.3s ease-out",
              }}
            >
              <Pupil size={9} maxDistance={4} pupilColor="#0F162B" />
              <Pupil size={9} maxDistance={4} pupilColor="#0F162B" />
            </div>
            {/* mouth */}
            <div
              className="absolute"
              style={{
                left: 22 + yellowPos.faceX,
                top: 60 + yellowPos.faceY,
                width: 26,
                height: 2,
                backgroundColor: "#0F162B",
                borderRadius: 2,
                transition: "all 0.3s ease-out",
              }}
            />
          </div>
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
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
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
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
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
