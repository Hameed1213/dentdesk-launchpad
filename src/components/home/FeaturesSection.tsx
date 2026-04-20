import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, X } from "lucide-react";

type Problem = {
  eyebrow: string;
  headline: string;
  body: string;
  stat: string;
  illustration: React.ReactNode;
};

/* ---------- Mini illustrations (top of each card) ---------- */

const PriceIllustration = () => (
  <div className="w-full max-w-[260px] rounded-xl border border-border bg-background shadow-sm p-4">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
      <span>Monthly invoice</span>
      <span className="font-medium text-rose-500 inline-flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        +£117
      </span>
    </div>
    <div className="text-2xl font-bold tabular-nums text-foreground">
      £185.00
    </div>
    <div className="mt-3 space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">NHS claims module</span>
        <span className="text-muted-foreground line-through">Unused</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">FP17 forms</span>
        <span className="text-muted-foreground line-through">Unused</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">UDA tracking</span>
        <span className="text-muted-foreground line-through">Unused</span>
      </div>
    </div>
  </div>
);

const ComplexityIllustration = () => (
  <div className="w-full max-w-[260px] rounded-xl border border-border bg-background shadow-sm overflow-hidden">
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/40">
      <span className="w-2 h-2 rounded-full bg-rose-400" />
      <span className="w-2 h-2 rounded-full bg-amber-400" />
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
      <span className="ml-2 text-[10px] text-muted-foreground">
        Practice Suite v4.2
      </span>
    </div>
    <div className="p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-foreground">
          Unexpected error
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5">
          Module booking.dll failed to load. Restart required.
        </div>
        <div className="mt-2 flex gap-1.5">
          <div className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
            Retry
          </div>
          <div className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
            Cancel
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NoShowsIllustration = () => {
  const slots = [
    { time: "09:00", name: "Sarah M.", noShow: false },
    { time: "10:30", name: "James T.", noShow: true },
    { time: "11:15", name: "Emma K.", noShow: false },
    { time: "14:00", name: "Tom W.", noShow: true },
  ];
  return (
    <div className="w-full max-w-[260px] rounded-xl border border-border bg-background shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-foreground">Today</span>
        <span className="text-[10px] font-semibold text-orange-500 bg-orange-500/10 rounded-full px-2 py-0.5">
          2 no-shows
        </span>
      </div>
      <div className="space-y-1.5">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] border ${
              s.noShow
                ? "bg-orange-500/5 border-orange-500/30"
                : "bg-muted/40 border-border"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium tabular-nums text-foreground">
                {s.time}
              </span>
              <span
                className={
                  s.noShow
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground"
                }
              >
                {s.name}
              </span>
            </div>
            {s.noShow && <X className="w-3 h-3 text-orange-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const problems: Problem[] = [
  {
    eyebrow: "The price",
    headline: "You're paying for features you'll never use",
    body: "Dentally starts at £185/month. EXACT charges more. Both lock you into annual contracts for software built around NHS workflows your private practice doesn't need.",
    stat: "Average private practice overpays by £1,400/year",
    illustration: <PriceIllustration />,
  },
  {
    eyebrow: "The complexity",
    headline: "It took 3 training days. It still breaks on a Tuesday.",
    body: "Legacy software means legacy problems. Slow load times, confusing interfaces and a support line that puts you on hold. Your receptionist shouldn't need a manual.",
    stat: "83% of practice managers rate their current software UX as poor",
    illustration: <ComplexityIllustration />,
  },
  {
    eyebrow: "The no-shows",
    headline: "No-shows are emptying your diary every week",
    body: "Without automated reminders, the average practice loses 4–6 appointments per week to no-shows. At £100 a slot that's up to £600 every week walking out the door.",
    stat: "Automated reminders reduce no-shows by up to 40%",
    illustration: <NoShowsIllustration />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background py-20 md:py-32 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Your current software is costing you
            <br />
            <span className="text-muted-foreground">
              more than you think.
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Most independent UK practices are overpaying for tools that are too
            complex, too slow and built for a different era of dentistry.
          </p>
        </div>

        {/* Feature grid — single row of 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {problems.map((problem, i) => (
            <Card
              key={i}
              className="overflow-hidden border-border bg-card flex flex-col"
            >
              {/* Illustration strip */}
              <div className="bg-muted/40 px-6 py-8 border-b border-border flex items-center justify-center min-h-[180px]">
                {problem.illustration}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  {problem.eyebrow}
                </div>
                <h3 className="text-xl md:text-[22px] font-semibold text-foreground tracking-tight leading-snug">
                  {problem.headline}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-[15px] flex-1">
                  {problem.body}
                </p>
                <p className="mt-5 text-xs font-medium text-foreground/80 italic">
                  "{problem.stat}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
