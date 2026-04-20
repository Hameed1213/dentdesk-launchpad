import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, X, AlertTriangle } from "lucide-react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const PricePreview = () => (
  <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
    <div className="text-sm font-medium text-neutral-900">Monthly bill</div>
    <div className="text-sm text-neutral-400 mt-0.5">Dentally · Pro plan</div>
    <div
      className="mt-3 text-[1.75rem] tabular-nums text-neutral-900 leading-none tracking-[-0.02em]"
      style={{ fontWeight: 600 }}
    >
      £185.00
    </div>
    <div className="mt-2 text-sm text-rose-500 font-medium">
      + £1,400 / yr overspend
    </div>
  </div>
);

const ComplexityPreview = () => (
  <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-neutral-900">
          Unexpected error
        </div>
        <div className="text-sm text-neutral-500 mt-0.5">
          Module booking.dll failed to load
        </div>
      </div>
    </div>
    <div className="mt-3 h-1.5 w-full rounded bg-neutral-100 overflow-hidden">
      <div className="h-full w-2/3 bg-amber-400/70" />
    </div>
  </div>
);

const NoShowsPreview = () => (
  <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-neutral-900">Today</span>
      <span className="text-sm font-medium text-orange-500 bg-orange-500/10 rounded-full px-2 py-0.5">
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
          className="flex items-center justify-between text-sm rounded-md bg-orange-500/5 border border-orange-500/20 px-2 py-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium tabular-nums text-neutral-900">
              {s.time}
            </span>
            <span className="text-neutral-500 line-through">{s.name}</span>
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
    <section className="bg-white py-20 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section heading — matches hero typography */}
        <div className="mx-auto max-w-3xl text-center mb-14 md:mb-20">
          <h2
            className="text-[2.5rem] md:text-[3.75rem] lg:text-[4.5rem] text-center text-neutral-900 leading-[1.15] tracking-[-0.03em]"
            style={{ fontWeight: 600 }}
          >
            Your software is costing you{" "}
            <span className="text-neutral-400">more than you think</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto text-center leading-relaxed mt-5">
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
                className="border-neutral-200 bg-white p-8 flex flex-col shadow-sm"
              >
                <Icon
                  className="w-5 h-5 text-neutral-700 mb-6"
                  strokeWidth={1.75}
                />
                <h3
                  className="text-lg text-neutral-900 leading-snug tracking-[-0.01em]"
                  style={{ fontWeight: 600 }}
                >
                  {problem.headline}
                </h3>
                <p className="mt-3 text-lg text-neutral-500 leading-relaxed">
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
