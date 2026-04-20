import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, X, AlertTriangle } from "lucide-react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const PricePreview = () => (
  <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
    <div className="text-sm font-semibold text-foreground">Monthly bill</div>
    <div className="text-xs text-muted-foreground mt-0.5">Dentally · Pro plan</div>
    <div className="mt-3 text-2xl font-bold tabular-nums text-foreground">
      £185.00
    </div>
    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-rose-500 font-medium">
      <span>+ £1,400 / yr overspend</span>
    </div>
  </div>
);

const ComplexityPreview = () => (
  <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">
          Unexpected error
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Module booking.dll failed to load
        </div>
      </div>
    </div>
    <div className="mt-3 h-1.5 w-full rounded bg-muted overflow-hidden">
      <div className="h-full w-2/3 bg-amber-400/70" />
    </div>
  </div>
);

const NoShowsPreview = () => (
  <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-foreground">Today</span>
      <span className="text-[10px] font-semibold text-orange-500 bg-orange-500/10 rounded-full px-2 py-0.5">
        2 no-shows
      </span>
    </div>
    <div className="mt-3 space-y-1.5">
      {[
        { time: "10:30", name: "James T." },
        { time: "14:00", name: "Tom W." },
      ].map((s, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-[11px] rounded-md bg-orange-500/5 border border-orange-500/20 px-2 py-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium tabular-nums text-foreground">
              {s.time}
            </span>
            <span className="text-muted-foreground line-through">{s.name}</span>
          </div>
          <X className="w-3 h-3 text-orange-500" />
        </div>
      ))}
    </div>
  </div>
);

const problems = [
  {
    Icon: CreditCard,
    headline: "You're paying for features you'll never use",
    body: "Dentally starts at £185/month. EXACT charges more. Both lock you into annual contracts for software built around NHS workflows your private practice doesn't need.",
    preview: <PricePreview />,
  },
  {
    Icon: Settings,
    headline: "It took 3 training days. It still breaks on a Tuesday.",
    body: "Legacy software means legacy problems. Slow load times, confusing interfaces and a support line that puts you on hold.",
    preview: <ComplexityPreview />,
  },
  {
    Icon: CalendarX,
    headline: "No-shows are emptying your diary every week",
    body: "Without automated reminders, the average practice loses 4–6 appointments per week. At £100 a slot that's up to £600 walking out the door.",
    preview: <NoShowsPreview />,
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
            <span className="text-muted-foreground">more than you think.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Most independent UK practices are overpaying for tools that are too
            complex, too slow and built for a different era of dentistry.
          </p>
        </div>

        {/* Feature grid — single row of 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.Icon;
            return (
              <Card
                key={i}
                className="border-border bg-card p-8 flex flex-col"
              >
                <Icon
                  className="w-5 h-5 text-foreground/70 mb-6"
                  strokeWidth={1.75}
                />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
