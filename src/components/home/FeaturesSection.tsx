import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX } from "lucide-react";

const problems = [
  {
    icon: CreditCard,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    eyebrow: "The price",
    headline: "You're paying for features you'll never use",
    body: "Dentally starts at £185/month. EXACT charges more. Both lock you into annual contracts for software built around NHS workflows your private practice doesn't need.",
    stat: "Average private practice overpays by £1,400/year",
  },
  {
    icon: Settings,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    eyebrow: "The complexity",
    headline: "It took 3 training days. It still breaks on a Tuesday.",
    body: "Legacy software means legacy problems. Slow load times, confusing interfaces and a support line that puts you on hold. Your receptionist shouldn't need a manual.",
    stat: "83% of practice managers rate their current software UX as poor",
  },
  {
    icon: CalendarX,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    eyebrow: "The no-shows",
    headline: "No-shows are emptying your diary every week",
    body: "Without automated reminders, the average practice loses 4–6 appointments per week to no-shows. At £100 a slot that's up to £600 every week walking out the door.",
    stat: "Automated reminders reduce no-shows by up to 40%",
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
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <Card
                key={i}
                className="overflow-hidden border-border bg-card flex flex-col"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div
                    className={`w-11 h-11 rounded-xl ${problem.iconBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-5 h-5 ${problem.iconColor}`} />
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    {problem.eyebrow}
                  </div>
                  <h3 className="text-xl md:text-[22px] font-semibold text-foreground tracking-tight leading-snug">
                    {problem.headline}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-[15px] flex-1">
                    {problem.body}
                  </p>
                </div>
                <div className="bg-muted/40 px-6 py-4 border-t border-border">
                  <p className="text-xs font-medium text-foreground/80 italic">
                    "{problem.stat}"
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
