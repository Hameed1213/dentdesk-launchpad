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

const problems = [
  {
    Icon: CreditCard,
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
    orbs: [
      "absolute -top-16 -left-10 w-44 h-44 rounded-full bg-blue-400/25 blur-3xl",
      "absolute top-1/3 -right-12 w-32 h-32 rounded-full bg-sky-300/30 blur-3xl",
      "absolute bottom-10 left-1/4 w-28 h-28 rounded-full bg-indigo-300/20 blur-3xl",
    ],
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
    orbs: [
      "absolute -top-10 right-8 w-40 h-40 rounded-full bg-cyan-300/25 blur-3xl",
      "absolute top-1/2 -left-16 w-36 h-36 rounded-full bg-blue-300/30 blur-3xl",
      "absolute bottom-0 right-1/3 w-32 h-32 rounded-full bg-violet-300/20 blur-3xl",
    ],
  },
  {
    Icon: CalendarX,
    headline: "Your team is doing your software's job",
    body: "Manual reminders. Chasing deposits. Sending forms one by one. Hours every week on tasks that should happen automatically.",
    preview: <NoShowsPreview />,
    orbs: [
      "absolute -top-14 left-1/3 w-44 h-44 rounded-full bg-sky-400/25 blur-3xl",
      "absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-indigo-300/25 blur-3xl",
      "absolute -bottom-10 -left-8 w-36 h-36 rounded-full bg-blue-400/20 blur-3xl",
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
