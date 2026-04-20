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
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden">
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

const ComplexityPreview = () => {
  const events = [
    { label: "Ticket submitted", time: "Mon 09:14", muted: false },
    { label: "Auto-reply sent", time: "Mon 09:14", muted: true },
    { label: "Awaiting human…", time: "48h+", muted: true },
  ];
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Support ticket #4821</div>
          <div className="text-xs text-muted-foreground mt-0.5">Average reply: 48h</div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-amber-500 animate-preview-pulse-ring"
            style={{ ["--ring-color" as string]: "rgba(245, 158, 11, 0.5)" }}
          />
          <span className="text-[10px] font-medium text-amber-600 bg-amber-500/10 rounded-full px-2 py-0.5">Open</span>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {events.map((e, i) => (
          <div
            key={e.label}
            className="flex items-center justify-between text-[11px] animate-preview-fade-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${e.muted ? "bg-amber-300/60" : "bg-amber-500"}`} />
              <span className={`truncate ${e.muted ? "text-muted-foreground" : "text-foreground"}`}>{e.label}</span>
            </div>
            <span className="tabular-nums font-medium text-muted-foreground">{e.time}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 animate-preview-bar"
          style={{ ["--bar-target" as string]: "70%" }}
        />
      </div>
    </div>
  );
};

const NoShowsPreview = () => {
  const tasks = [
    { Icon: Bell, label: "Send reminders", count: "× 38" },
    { Icon: Banknote, label: "Chase deposits", count: "× 6" },
    { Icon: FileText, label: "Email forms", count: "× 14" },
  ];
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-sm overflow-hidden">
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
              className="flex items-center justify-between text-[11px] animate-preview-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <TaskIcon className="w-3 h-3 text-orange-500 shrink-0" />
                <span className="text-muted-foreground truncate">{t.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="tabular-nums font-medium text-foreground">{t.count}</span>
                <Check className="w-3 h-3 text-muted-foreground/40" strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-preview-bar"
          style={{ ["--bar-target" as string]: "92%" }}
        />
      </div>
    </div>
  );
};

const problems = [
  {
    Icon: CreditCard,
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
  },
  {
    Icon: CalendarX,
    headline: "Your team is doing your software's job",
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
                  className="w-5 h-5 text-[#2563EB] mb-6"
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
