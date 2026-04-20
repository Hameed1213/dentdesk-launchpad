import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, X, MessageSquare, Clock } from "lucide-react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const PricePreview = () => (
  <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
    <div className="text-sm font-semibold text-foreground">Monthly software cost</div>
    <div className="text-xs text-muted-foreground mt-0.5">Practice management + 2 add-ons</div>
    <div className="mt-3 text-2xl font-bold tabular-nums text-foreground">
      £200.00
    </div>
    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-rose-500 font-medium">
      <span>3 tools doing 1 job</span>
    </div>
  </div>
);

const ComplexityPreview = () => (
  <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
    <div className="text-sm font-semibold text-foreground">Support ticket #4821</div>
    <div className="text-xs text-muted-foreground mt-0.5">"Thanks, we'll get back to you shortly."</div>
    <div className="mt-3 text-2xl font-bold tabular-nums text-foreground">
      48h
    </div>
    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-500 font-medium">
      <Clock className="w-3 h-3" />
      <span>Average reply time</span>
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
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own.",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
  },
  {
    Icon: CalendarX,
    headline: "No-shows are emptying your diary every week",
    body: "Manual reminders. Chasing deposits. Sending forms one by one. Hours every week on tasks that should happen automatically.",
    preview: <NoShowsPreview />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background py-20 md:py-32 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
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
