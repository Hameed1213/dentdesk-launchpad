import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, Check, Bell, Banknote, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const PricePreview = () => {
  const tools = [
    { name: "Practice management", price: "£120" },
    { name: "Reminders add-on", price: "£45" },
    { name: "Payments add-on", price: "£35" },
  ];
  return (
    <div className="rounded-xl border border-border bg-background/95 backdrop-blur-sm p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
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
          style={{ ["--bar-target" as string]: "85%" } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

const ComplexityPreview = () => (
  <div className="rounded-xl border border-border bg-background/95 backdrop-blur-sm p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full bg-amber-500 animate-preview-pulse-ring"
          style={{ ["--ring-color" as string]: "rgba(245, 158, 11, 0.5)" } as React.CSSProperties}
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
    <div className="rounded-xl border border-border bg-background/95 backdrop-blur-sm p-4 shadow-sm overflow-hidden min-h-[168px] flex flex-col">
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

/* ---------- Themed card system ---------- */

type Theme = {
  cardGradient: string;
  border: string;
  hoverBorder: string;
  hoverShadow: string;
  glowColor: string;
  iconBg: string;
  iconRing: string;
  iconColor: string;
  topBar: string;
};

const themes: Record<"rose" | "amber" | "orange", Theme> = {
  rose: {
    cardGradient: "bg-gradient-to-br from-white via-white to-rose-50/70",
    border: "border-rose-100/80",
    hoverBorder: "group-hover:border-rose-200",
    hoverShadow: "group-hover:shadow-[0_20px_50px_-20px_rgba(244,63,94,0.28)]",
    glowColor: "bg-rose-400/25",
    iconBg: "bg-gradient-to-br from-rose-50 to-rose-100/80",
    iconRing: "ring-1 ring-rose-200/60",
    iconColor: "text-rose-500",
    topBar: "from-rose-300 via-rose-500 to-rose-300",
  },
  amber: {
    cardGradient: "bg-gradient-to-br from-white via-white to-amber-50/70",
    border: "border-amber-100/80",
    hoverBorder: "group-hover:border-amber-200",
    hoverShadow: "group-hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.30)]",
    glowColor: "bg-amber-400/25",
    iconBg: "bg-gradient-to-br from-amber-50 to-amber-100/80",
    iconRing: "ring-1 ring-amber-200/60",
    iconColor: "text-amber-500",
    topBar: "from-amber-300 via-amber-500 to-amber-300",
  },
  orange: {
    cardGradient: "bg-gradient-to-br from-white via-white to-orange-50/70",
    border: "border-orange-100/80",
    hoverBorder: "group-hover:border-orange-200",
    hoverShadow: "group-hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.30)]",
    glowColor: "bg-orange-400/25",
    iconBg: "bg-gradient-to-br from-orange-50 to-orange-100/80",
    iconRing: "ring-1 ring-orange-200/60",
    iconColor: "text-orange-500",
    topBar: "from-orange-300 via-orange-500 to-orange-300",
  },
};

const problems: Array<{
  Icon: LucideIcon;
  headline: string;
  body: string;
  preview: ReactNode;
  theme: Theme;
}> = [
  {
    Icon: CreditCard,
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
    theme: themes.rose,
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
    theme: themes.amber,
  },
  {
    Icon: CalendarX,
    headline: "Your team is doing your software's job",
    body: "Manual reminders. Chasing deposits. Sending forms one by one. Hours every week on tasks that should happen automatically.",
    preview: <NoShowsPreview />,
    theme: themes.orange,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-gradient-to-b from-muted/40 via-background to-background py-20 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Subtle dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-[#2563EB]/5 px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-[11px] font-semibold tracking-[0.12em] text-[#2563EB] uppercase">
              The Problem
            </span>
          </div>
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
            const t = problem.theme;
            return (
              <div
                key={i}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
              >
                {/* Soft glow halo behind card on hover */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${t.glowColor}`}
                />

                <Card
                  className={`relative overflow-hidden border ${t.border} ${t.hoverBorder} ${t.cardGradient} ${t.hoverShadow} p-8 flex flex-col h-full rounded-2xl shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1`}
                >
                  {/* Top accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${t.topBar} opacity-70`}
                  />

                  {/* Icon chip */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.iconBg} ${t.iconRing} mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}
                  >
                    <Icon
                      className={`w-5 h-5 ${t.iconColor}`}
                      strokeWidth={2}
                    />
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
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
