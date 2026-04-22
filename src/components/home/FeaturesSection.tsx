import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, Check, Bell, Banknote, FileText, TrendingUp } from "lucide-react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const PricePreview = () => {
  const tools = [
    { name: "Practice management", price: "£120" },
    { name: "Reminders add-on", price: "£45" },
    { name: "Payments add-on", price: "£35" },
  ];
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Monthly software cost</div>
          <div className="text-xs text-muted-foreground mt-0.5">3 tools, 1 job</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums text-foreground">£200</div>
          <div className="text-[10px] text-rose-500 font-medium flex items-center gap-0.5 justify-end">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>/ month</span>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {tools.map((t, i) => (
          <div
            key={t.name}
            className="flex items-center justify-between text-[11px] animate-preview-fade-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400/70 shrink-0" />
              <span className="text-muted-foreground truncate">{t.name}</span>
            </div>
            <span className="tabular-nums font-medium text-foreground">{t.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 animate-preview-bar"
          style={{ ["--bar-target" as string]: "85%" }}
        />
      </div>
    </div>
  );
};

const ComplexityPreview = () => (
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-amber-500 animate-preview-pulse-ring"
          style={{ ["--ring-color" as string]: "rgba(245, 158, 11, 0.5)" }}
        />
        <span className="text-sm font-semibold text-foreground">Support ticket #4821</span>
      </div>
      <span className="text-[10px] font-medium text-amber-600 bg-amber-500/10 rounded-full px-2 py-0.5">Open</span>
    </div>

    <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-[11px] text-muted-foreground italic">
      "Thanks, we'll get back to you shortly
      <span className="inline-flex gap-0.5 ml-1 align-middle">
        <span className="w-1 h-1 rounded-full bg-muted-foreground animate-preview-typing" style={{ animationDelay: "0ms" }} />
        <span className="w-1 h-1 rounded-full bg-muted-foreground animate-preview-typing" style={{ animationDelay: "200ms" }} />
        <span className="w-1 h-1 rounded-full bg-muted-foreground animate-preview-typing" style={{ animationDelay: "400ms" }} />
      </span>
      "
    </div>

    <div className="mt-3 flex items-center justify-between">
      <div>
        <div className="text-xl font-bold tabular-nums text-foreground">48h</div>
        <div className="text-[10px] text-muted-foreground">Average reply time</div>
      </div>
      <svg className="w-9 h-9 text-amber-500" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
        <g className="animate-preview-tick" style={{ transformOrigin: "18px 18px" }}>
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="22 88"
          />
        </g>
      </svg>
    </div>
  </div>
);

const NoShowsPreview = () => {
  const tasks = [
    { Icon: Bell, label: "Send reminders", count: "× 38" },
    { Icon: Banknote, label: "Chase deposits", count: "× 6" },
  ];
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Reception to-do</div>
          <div className="text-xs text-muted-foreground mt-0.5">All done by hand</div>
        </div>
        <span className="text-[10px] font-semibold text-orange-600 bg-orange-500/10 rounded-full px-2 py-0.5">
          12 tasks
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        {tasks.map((t, i) => {
          const TaskIcon = t.Icon;
          return (
            <div
              key={t.label}
              className="flex items-center justify-between text-[11px] rounded-md bg-orange-500/[0.04] border border-orange-500/15 px-2 py-1.5 animate-preview-fade-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-4 h-4 rounded flex items-center justify-center bg-orange-500/15 shrink-0">
                  <TaskIcon className="w-2.5 h-2.5 text-orange-500" />
                </div>
                <span className="font-medium text-foreground truncate">{t.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground tabular-nums">{t.count}</span>
                <Check className="w-3 h-3 text-muted-foreground/40" strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Per-card decorative line patterns ---------- */

const WavyLines = ({ rgb }: { rgb: string }) => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-24 opacity-70"
    viewBox="0 0 400 100"
    preserveAspectRatio="none"
    fill="none"
  >
    <path d="M0 70 Q 100 50 200 65 T 400 60" stroke={`rgba(${rgb},0.28)`} strokeWidth="0.6" />
    <path d="M0 78 Q 100 60 200 74 T 400 70" stroke={`rgba(${rgb},0.22)`} strokeWidth="0.6" />
    <path d="M0 86 Q 100 70 200 82 T 400 80" stroke={`rgba(${rgb},0.16)`} strokeWidth="0.6" />
    <path d="M0 94 Q 100 80 200 90 T 400 90" stroke={`rgba(${rgb},0.12)`} strokeWidth="0.6" />
  </svg>
);

const DiagonalLines = ({ rgb }: { rgb: string }) => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
    width="100%"
    height="100%"
  >
    <defs>
      <pattern id={`diag-${rgb}`} width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="32" stroke={`rgba(${rgb},0.28)`} strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#diag-${rgb})`} />
  </svg>
);

const ConcentricArcs = ({ rgb }: { rgb: string }) => (
  <svg
    aria-hidden
    className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 opacity-60"
    viewBox="0 0 200 200"
    fill="none"
  >
    {[40, 60, 80, 100, 120, 140].map((r, i) => (
      <circle
        key={r}
        cx="100"
        cy="100"
        r={r}
        stroke={`rgba(${rgb},0.28)`}
        strokeOpacity={1 - i * 0.12}
        strokeWidth="0.6"
      />
    ))}
  </svg>
);

// Per-card colour palettes (rgb triplet for inline rgba())
const ROSE = "244,63,94";       // rose-500
const AMBER = "245,158,11";     // amber-500
const ORANGE = "249,115,22";    // orange-500

/* Soft cloud shapes — subtle, themed per card */
const Clouds = ({ rgb }: { rgb: string }) => (
  <svg
    aria-hidden
    className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    <defs>
      <filter id={`cloud-blur-${rgb}`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
    <g filter={`url(#cloud-blur-${rgb})`} fill={`rgba(${rgb},0.10)`}>
      {/* top-left cloud */}
      <ellipse cx="60" cy="40" rx="55" ry="18" />
      <ellipse cx="95" cy="32" rx="38" ry="14" />
      <ellipse cx="35" cy="48" rx="30" ry="12" />
      {/* top-right cloud */}
      <ellipse cx="330" cy="60" rx="60" ry="20" />
      <ellipse cx="360" cy="50" rx="35" ry="14" />
      {/* mid faint cloud */}
      <ellipse cx="220" cy="120" rx="70" ry="16" opacity="0.6" />
    </g>
  </svg>
);

const problems = [
  {
    Icon: CreditCard,
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
    pattern: <WavyLines rgb={ROSE} />,
    clouds: <Clouds rgb={ROSE} />,
    orbs: [
      "absolute -top-16 -left-10 w-44 h-44 rounded-full bg-rose-400/12 blur-3xl",
      "absolute top-1/3 -right-12 w-32 h-32 rounded-full bg-rose-300/15 blur-3xl",
      "absolute bottom-10 left-1/4 w-28 h-28 rounded-full bg-pink-300/10 blur-3xl",
    ],
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
    pattern: <DiagonalLines rgb={AMBER} />,
    clouds: <Clouds rgb={AMBER} />,
    orbs: [
      "absolute -top-10 right-8 w-40 h-40 rounded-full bg-amber-300/12 blur-3xl",
      "absolute top-1/2 -left-16 w-36 h-36 rounded-full bg-yellow-300/15 blur-3xl",
      "absolute bottom-0 right-1/3 w-32 h-32 rounded-full bg-amber-400/10 blur-3xl",
    ],
  },
  {
    Icon: CalendarX,
    headline: "Your team is doing your software's job",
    body: "Manual reminders. Chasing deposits. Sending forms one by one. Hours every week on tasks that should happen automatically.",
    preview: <NoShowsPreview />,
    pattern: <ConcentricArcs rgb={ORANGE} />,
    clouds: <Clouds rgb={ORANGE} />,
    orbs: [
      "absolute -top-14 left-1/3 w-44 h-44 rounded-full bg-orange-400/12 blur-3xl",
      "absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-orange-300/12 blur-3xl",
      "absolute -bottom-10 -left-8 w-36 h-36 rounded-full bg-amber-400/10 blur-3xl",
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-background py-20 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Your software is working
            <br />
            <span className="text-[#2563EB]">against you</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Overpriced. Overcomplicated. Losing you patients every week.
          </p>
        </div>

        {/* Feature grid — single row of 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.Icon;
            return (
              <Card
                key={i}
                className="group relative overflow-hidden border border-neutral-200 bg-white/30 backdrop-blur-xl backdrop-saturate-150 p-8 flex flex-col rounded-2xl shadow-none transition-all duration-300 hover:bg-white/40 hover:-translate-y-1 hover:border-neutral-300"
              >
                {/* Tiny dot pattern */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(0,0,0,0.18) 0.5px, transparent 0.5px)",
                    backgroundSize: "10px 10px",
                  }}
                />
                {/* Soft cloud shapes */}
                {problem.clouds}
                {/* Per-card decorative line pattern */}
                {problem.pattern}
                {/* Glossy top highlight */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                {/* Per-card colored orbs */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  {problem.orbs.map((cls, idx) => (
                    <div key={idx} className={cls} />
                  ))}
                </div>

                <div className="relative flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl bg-white/50 border border-white/60 backdrop-blur-md flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-foreground tracking-tight leading-snug">
                    {problem.headline}
                  </h3>
                  <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
                    {problem.body}
                  </p>
                  <div className="mt-6 flex-1 flex items-end">
                    <div className="w-full">{problem.preview}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
