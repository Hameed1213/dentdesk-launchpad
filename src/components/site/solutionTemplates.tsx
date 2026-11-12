import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, TrustStrip, pillButton, primaryButton } from "@/components/site/ui";
import {
  FaqSection,
  OtherAreas,
  type Faq,
  type InternalLink,
  type OtherArea,
} from "@/components/site/templates";
import { Toggle } from "@/components/site/screens";

/*
 * Solutions template: "Follow one appointment" (research 12 Nov: NexHealth's patient journey,
 * Linear's request-to-shipped story, Phorest's "Does this sound like you?", calculators).
 * Deliberately unlike the feature pages: no photos, no big screen rows. The page tells one story
 * in timestamped DentDock fragments, shows the real settings, and lets the practice's own
 * numbers do the persuading. No testimonials or invented results.
 */

/* ------------------------------------------------------------------ */
/* Pieces                                                             */
/* ------------------------------------------------------------------ */

/** A phone outline around patient-facing content. */
export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[280px] rounded-[40px] bg-[#0F172A] p-2.5 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.55)]">
      <div className="rounded-[32px] bg-[#F8FAFC] overflow-hidden min-h-[480px] flex flex-col">
        <div className="flex justify-center pt-2.5 pb-1">
          <span className="h-1.5 w-16 rounded-full bg-[#CBD5E1]" />
        </div>
        <div className="flex-1 px-4 pb-5 pt-2">{children}</div>
      </div>
    </div>
  );
}

/** A soft tinted panel with a faint grid: the signature background for every Solutions fragment. */
function Grid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-3xl bg-[#F5F8FF] ring-1 ring-[#E5EDFB] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {children}
    </div>
  );
}

export type StoryHeroContent = {
  crumbs: InternalLink[];
  title: string;
  highlight: string;
  intro: string;
  visual: ReactNode;
};

function StoryHero({ hero }: { hero: StoryHeroContent }) {
  return (
    <section className="relative overflow-hidden bg-white pt-28 lg:pt-36 pb-16 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#64748B]">
            <Link to="/" className="hover:text-[#2563EB]">
              Home
            </Link>
            {hero.crumbs.map((c) => (
              <span key={c.to}>
                {" / "}
                <Link to={c.to as "/solutions"} className="hover:text-[#2563EB]">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
          <h1
            className="font-semibold text-[#0F172A] text-[40px] leading-[1.1] md:text-[58px]"
            style={{ letterSpacing: "-0.035em" }}
          >
            {hero.title} <span className="text-[#2563EB]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 text-[19px] text-[#334155] leading-[1.6] max-w-xl">{hero.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/waitlist" className={primaryButton}>
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className={pillButton}>
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-[14px] text-[#64748B]">
            £49 a month per practice, everything included. No contract.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Grid className="py-10 px-4">{hero.visual}</Grid>
        </Reveal>
      </div>
    </section>
  );
}

const solutionLinks: { label: string; to: string }[] = [
  { label: "Reduce no-shows", to: "/solutions/reduce-no-shows" },
  { label: "Private practices", to: "/solutions/private-practices" },
];

function SolutionPills({ current }: { current: string }) {
  return (
    <div className="bg-white px-6 pb-4">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-6">
        <span className="mr-2 text-[13px] font-medium text-[#64748B]">More solutions:</span>
        {solutionLinks.map((s) => (
          <Link
            key={s.to}
            to={s.to as "/solutions"}
            aria-current={s.to === current ? "page" : undefined}
            className={
              s.to === current
                ? "rounded-xl bg-[#2563EB] px-4 py-2 text-[13px] font-semibold text-white"
                : "rounded-xl border border-[#DBEAFE] bg-white px-4 py-2 text-[13px] font-medium text-[#2563EB] hover:border-[#2563EB]"
            }
          >
            {s.label}
          </Link>
        ))}
        <Link
          to="/solutions"
          className="ml-auto text-[13px] font-semibold text-[#2563EB] hover:underline"
        >
          All solutions →
        </Link>
      </div>
    </div>
  );
}

function SoundsLikeYou({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
            {title}
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {lines.map((l, i) => (
            <Reveal key={l} delay={i * 0.08}>
              <p className="border-l-2 border-[#2563EB] pl-5 text-[22px] md:text-[26px] font-medium tracking-tight text-[#0F172A] leading-[1.3]">
                {l}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export type Stop = { time: string; title: string; body: string; visual: ReactNode };

function StoryTimeline({
  title,
  highlight,
  intro,
  stops,
}: {
  title: string;
  highlight?: string;
  intro: string;
  stops: Stop[];
}) {
  return (
    <section className="bg-gradient-to-b from-white via-[#F7F9FF] to-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
          <p className="mt-5 text-[18px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <ol className="relative mt-14">
          <span
            aria-hidden="true"
            className="absolute left-[7px] md:left-[131px] top-2 bottom-2 w-0.5 bg-[#BFDBFE]"
          />
          {stops.map((s, i) => (
            <Reveal
              key={s.time + s.title}
              delay={0.04 * i}
              className={i < stops.length - 1 ? "pb-14 md:pb-16" : ""}
            >
              <li className="relative list-none grid grid-cols-1 md:grid-cols-[110px_1fr] gap-x-10 pl-8 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 md:left-[124px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-[#2563EB]"
                />
                <p className="text-[14px] font-semibold text-[#2563EB] md:text-right md:pt-0.5 mb-2 md:mb-0">
                  {s.time}
                </p>
                <div className="md:pl-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#0F172A] tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[16px] text-[#475569] leading-[1.6] max-w-md">
                      {s.body}
                    </p>
                  </div>
                  <div aria-hidden="true" className="lg:w-[280px]">
                    {s.visual}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export type Control = { label: string; value: ReactNode };

function WhatYouControl({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: Control[];
}) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-[42px] font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <Grid className="p-5 sm:p-7">
            <div className="rounded-2xl bg-white border border-[#E5EDFB] divide-y divide-[#F1F5F9]">
              {items.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="text-[15px] text-[#0F172A]">{c.label}</span>
                  <span className="text-[14px] font-semibold text-[#2563EB]">{c.value}</span>
                </div>
              ))}
            </div>
          </Grid>
        </Reveal>
      </div>
    </section>
  );
}

/** A control value shown as a switch. */
export function On() {
  return <Toggle />;
}

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[14px] text-[#334155]">
        {label}
        <span className="font-semibold text-[#0F172A]">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#2563EB]"
      />
    </label>
  );
}

function CalcShell({
  title,
  intro,
  controls,
  result,
}: {
  title: string;
  intro: string;
  controls: ReactNode;
  result: ReactNode;
}) {
  return (
    <section className="bg-[#0F162B] py-16 md:py-24 px-6 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(45% 55% at 0% 0%, rgba(37,99,235,0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-[42px] font-semibold tracking-tight text-white leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] text-[#CBD5E1] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-3xl bg-white p-7 md:p-8">
            <div className="space-y-6">{controls}</div>
            <div className="mt-7 border-t border-neutral-100 pt-6">{result}</div>
            <p className="mt-4 text-[12px] text-[#94A3B8]">
              Your own figures, worked out in your browser. Not a promise of results.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** What missed appointments cost a practice, from its own numbers. */
export function NoShowCalculator() {
  const [missed, setMissed] = useState(3);
  const [value, setValue] = useState(55);
  const [weeks, setWeeks] = useState(48);
  const perMonth = (missed * value * weeks) / 12;
  const onePerWeek = (value * weeks) / 12;
  return (
    <CalcShell
      title="What do no-shows cost your practice?"
      intro="Move the sliders to match your practice. The average private check-up was £55 in 2024 (Competition and Markets Authority), so we've started there."
      controls={
        <>
          <Slider
            label="Missed appointments a week"
            value={missed}
            min={0}
            max={20}
            format={(n) => String(n)}
            onChange={setMissed}
          />
          <Slider
            label="Average appointment value"
            value={value}
            min={20}
            max={300}
            step={5}
            format={gbp}
            onChange={setValue}
          />
          <Slider
            label="Weeks open a year"
            value={weeks}
            min={40}
            max={52}
            format={(n) => String(n)}
            onChange={setWeeks}
          />
        </>
      }
      result={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[13px] text-[#64748B]">Lost to no-shows</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-[#0F172A] leading-none">
              {gbp(perMonth)}
              <span className="text-[14px] font-normal text-[#64748B]"> a month</span>
            </p>
          </div>
          <div>
            <p className="text-[13px] text-[#64748B]">Saving just one a week</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-[#2563EB] leading-none">
              {gbp(onePerWeek)}
              <span className="text-[14px] font-normal text-[#64748B]"> a month</span>
            </p>
          </div>
          <p className="col-span-2 text-[14px] text-[#334155]">DentDock is £49 a month.</p>
        </div>
      }
    />
  );
}

/** What a practice pays now for separate tools, against DentDock. */
export function SpendCalculator() {
  const [pms, setPms] = useState(150);
  const [texts, setTexts] = useState(40);
  const [extras, setExtras] = useState(30);
  const total = pms + texts + extras;
  return (
    <CalcShell
      title="What do you pay for software now?"
      intro="Add up what you pay each month for your practice system, reminder texts and any separate booking or forms tools. Everything is your own figure."
      controls={
        <>
          <Slider
            label="Practice software"
            value={pms}
            min={0}
            max={600}
            step={10}
            format={gbp}
            onChange={setPms}
          />
          <Slider
            label="Reminder texts"
            value={texts}
            min={0}
            max={200}
            step={5}
            format={gbp}
            onChange={setTexts}
          />
          <Slider
            label="Booking, forms or other tools"
            value={extras}
            min={0}
            max={200}
            step={5}
            format={gbp}
            onChange={setExtras}
          />
        </>
      }
      result={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[13px] text-[#64748B]">You pay now</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-[#0F172A] leading-none">
              {gbp(total)}
              <span className="text-[14px] font-normal text-[#64748B]"> a month</span>
            </p>
          </div>
          <div>
            <p className="text-[13px] text-[#64748B]">DentDock</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-[#2563EB] leading-none">
              £49
              <span className="text-[14px] font-normal text-[#64748B]"> a month</span>
            </p>
          </div>
          <p className="col-span-2 text-[14px] text-[#334155]">
            Includes 200 texts a month, then 8p a text. Check what your current system does that
            DentDock doesn't, such as NHS claims or charting.
          </p>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Page template                                                      */
/* ------------------------------------------------------------------ */

export type SolutionStoryContent = {
  path: string;
  hero: StoryHeroContent;
  sounds: { title: string; lines: string[] };
  story: { title: string; highlight?: string; intro: string; stops: Stop[] };
  controls: { title: string; intro: string; items: Control[] };
  calculator: ReactNode;
  features: { title: string; highlight?: string; items: OtherArea[] };
  faq: Faq[];
};

export function SolutionStoryPage({ content }: { content: SolutionStoryContent }) {
  const c = content;
  return (
    <PageShell>
      <StoryHero hero={c.hero} />
      <SolutionPills current={c.path} />
      <SoundsLikeYou {...c.sounds} />
      <StoryTimeline {...c.story} />
      <WhatYouControl {...c.controls} />
      {c.calculator}
      <OtherAreas {...c.features} />
      <TrustStrip />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Hub hero (used by /solutions)                                      */
/* ------------------------------------------------------------------ */

export function SolutionsHubHero({
  title,
  highlight,
  intro,
}: {
  title: string;
  highlight: string;
  intro: string;
}) {
  return (
    <section className="bg-white pt-28 lg:pt-36 pb-6 px-6">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h1
          className="font-semibold text-[#0F172A] text-[40px] leading-[1.1] md:text-[58px]"
          style={{ letterSpacing: "-0.035em" }}
        >
          {title} <span className="text-[#2563EB]">{highlight}</span>
        </h1>
        <p className="mt-6 text-[19px] text-[#334155] leading-[1.6]">{intro}</p>
      </Reveal>
    </section>
  );
}
