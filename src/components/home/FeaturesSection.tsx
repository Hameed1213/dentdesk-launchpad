import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CreditCard, Settings, CalendarX, Check, Bell, Banknote, Landmark } from "lucide-react";

/* ---------- Mini preview cards (bottom of each card) ---------- */

const TOAST_INTERVAL_MS = 3000;
const STACK_POSITIONS = [
  { y: 16, scale: 1, opacity: 1, zIndex: 30 },
  { y: 0, scale: 0.94, opacity: 0.82, zIndex: 20 },
  { y: -16, scale: 0.88, opacity: 0.56, zIndex: 10 },
] as const;

type PriceCharge = {
  app: string;
  title: string;
  amount: string;
  time: string;
  note: string;
};

type PriceToast = {
  id: number;
  charge: PriceCharge;
};

const PricePreview = () => {
  const charges: PriceCharge[] = [
    { app: "BANK", title: "Practice software", amount: "−£120", time: "now", note: "Most features cost extra" },
    { app: "BANK", title: "SMS reminders", amount: "−£45", time: "1m ago", note: "Charged on top of your plan" },
    { app: "BANK", title: "Patient forms", amount: "−£35", time: "2m ago", note: "Separate tool, separate bill" },
  ];

  const [stack, setStack] = useState<PriceToast[]>([
    { id: 0, charge: charges[0] },
    { id: 1, charge: charges[1] },
    { id: 2, charge: charges[2] },
  ]);

  useEffect(() => {
    let nextId = 3;
    let nextChargeIndex = 0;

    const interval = window.setInterval(() => {
      const nextCharge = charges[nextChargeIndex];
      nextChargeIndex = (nextChargeIndex + 1) % charges.length;

      setStack((current) => [{ id: nextId++, charge: nextCharge }, ...current].slice(0, 3));
    }, TOAST_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl p-4 overflow-hidden min-h-[168px]">
      <div className="pointer-events-none absolute inset-x-4 top-1/2 h-[84px] -translate-y-1/2">
        <AnimatePresence initial={false}>
          {stack.map((item, index) => {
            const position = STACK_POSITIONS[index];

            return (
              <motion.div
                key={item.id}
                initial={{ y: 58, scale: 1, opacity: 0, zIndex: 40 }}
                animate={position}
                exit={{ y: -40, scale: 0.84, opacity: 0, zIndex: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: position.zIndex }}
                className="absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-md px-3.5 pt-3 pb-1.5 will-change-transform"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-[5px] bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                      <Landmark className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span>{item.charge.app}</span>
                  </div>
                  <span className="normal-case tracking-normal font-normal">{item.charge.time}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div className="text-[13px] font-semibold text-foreground truncate">{item.charge.title}</div>
                  <div className="text-[13px] font-bold tabular-nums text-rose-500 shrink-0">
                    {item.charge.amount}
                  </div>
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  {item.charge.note}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ComplexityPreview = () => (
    <div className="rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm p-4 overflow-hidden min-h-[168px] flex flex-col">
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

// Per-card colour palettes (rgb triplet for inline rgba())
const ROSE = "244,63,94";       // rose-500
const AMBER = "245,158,11";     // amber-500
const ORANGE = "249,115,22";    // orange-500

const problems = [
  {
    Icon: CreditCard,
    headline: "Most practices are overpaying",
    body: "The average practice spends £150–250 a month on software that still needs three tools to do what one should.",
    preview: <PricePreview />,
    rgb: ROSE,
  },
  {
    Icon: Settings,
    headline: "After the sale, you're on your own",
    body: "Most dental software companies sell you the product and disappear. A chatbot, a help article and a 48-hour ticket.",
    preview: <ComplexityPreview />,
    rgb: AMBER,
  },
  {
    Icon: CalendarX,
    headline: "Your team does your software's job",
    body: "Manual reminders. Chasing deposits. Sending forms one by one. Hours every week on tasks that should happen automatically.",
    preview: <NoShowsPreview />,
    rgb: ORANGE,
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
                className="group relative overflow-hidden border border-neutral-100 bg-white/30 backdrop-blur-xl backdrop-saturate-150 p-8 flex flex-col rounded-2xl shadow-none transition-all duration-300 hover:bg-white/40 hover:-translate-y-1 hover:border-neutral-200"
              >
                {/* Subtle grid background — inset with radial fade-out */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-6 rounded-xl opacity-[0.45]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  }}
                />
                {/* Soft colored orb behind the preview image */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 bottom-[12%] -translate-x-1/2 w-[85%] h-[40%] rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, rgba(${problem.rgb},0.22) 0%, rgba(${problem.rgb},0.10) 45%, transparent 75%)`,
                  }}
                />
                {/* Glossy top highlight */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="relative flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl bg-white border border-neutral-100 flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[19px] font-semibold text-foreground tracking-tight leading-snug">
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
