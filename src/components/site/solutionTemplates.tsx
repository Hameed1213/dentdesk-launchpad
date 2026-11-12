import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, pillButton, primaryButton } from "@/components/site/ui";
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
        <Reveal delay={0.1}>{hero.visual}</Reveal>
      </div>
    </section>
  );
}

export type Pain = { text: string; Icon: typeof ArrowRight };

function SoundsLikeYou({ title, lines }: { title: string; lines: Pain[] }) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {lines.map(({ text, Icon }, i) => (
            <Reveal key={text} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white border border-[#E5EDFB] p-7">
                <span className="w-11 h-11 rounded-2xl bg-[#FEF2F2] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#DC2626]" strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-[19px] font-semibold tracking-tight text-[#0F172A] leading-[1.4]">
                  {text}
                </p>
              </div>
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
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
          <p className="mt-5 text-[18px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <ol className="relative mt-14 pl-9 md:pl-12">
          <span
            aria-hidden="true"
            className="absolute left-[11px] md:left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#BFDBFE] via-[#93C5FD] to-[#BFDBFE]"
          />
          {stops.map((s, i) => (
            <Reveal
              key={s.time + s.title}
              delay={0.04 * i}
              className={i < stops.length - 1 ? "pb-6" : ""}
            >
              <li className="relative list-none">
                <span
                  aria-hidden="true"
                  className="absolute -left-9 md:-left-12 top-7 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2563EB] ring-4 ring-white flex items-center justify-center text-[11px] md:text-[13px] font-semibold text-white"
                >
                  {i + 1}
                </span>
                <div className="rounded-3xl bg-white border border-[#E5EDFB] shadow-[0_12px_40px_-24px_rgba(15,23,42,0.25)] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_320px]">
                  <div className="p-6 md:p-8">
                    <span className="inline-block rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[12px] font-semibold text-[#2563EB]">
                      {s.time}
                    </span>
                    <h3 className="mt-3 text-[20px] font-semibold text-[#0F172A] tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[16px] text-[#475569] leading-[1.6]">{s.body}</p>
                  </div>
                  <Grid className="!rounded-none md:border-l md:border-[#E5EDFB] ring-0 flex items-center justify-center p-6 min-h-[150px]">
                    <div aria-hidden="true">{s.visual}</div>
                  </Grid>
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
export type ControlGroup = { group: string; items: Control[] };

function WhatYouControl({
  title,
  intro,
  groups,
}: {
  title: string;
  intro: string;
  groups: ControlGroup[];
}) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-3xl bg-white border border-[#E5EDFB] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[#EEF2FB] px-6 py-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[14px] font-semibold text-[#0F172A]">Settings</span>
            </div>
            <div className="p-6 space-y-6">
              {groups.map((g) => (
                <div key={g.group}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                    {g.group}
                  </p>
                  <div className="mt-2.5 rounded-2xl border border-[#EEF2FB] divide-y divide-[#F1F5F9]">
                    {g.items.map((c) => (
                      <div
                        key={c.label}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <span className="text-[14px] text-[#0F172A]">{c.label}</span>
                        <span className="text-[14px] font-semibold text-[#2563EB] whitespace-nowrap">
                          {c.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[14px] font-medium text-[#334155]">
        {label}
        <span className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[14px] font-semibold text-[#1D4ED8] tabular-nums">
          {format(value)}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="dd-range mt-3 w-full"
        style={{ background: `linear-gradient(to right, #2563EB ${pct}%, #E2E8F0 ${pct}%)` }}
      />
      <span className="mt-1 flex justify-between text-[11px] text-[#94A3B8]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </span>
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
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] rounded-[28px] overflow-hidden border border-[#E5EDFB] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)]">
            <div className="bg-white p-7 md:p-10 space-y-7">{controls}</div>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-7 md:p-10 text-white flex flex-col justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)",
                }}
              />
              <div className="relative">{result}</div>
              <p className="relative mt-6 text-[12px] text-white/70">
                Your own figures, worked out in your browser. Not a promise of results.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Result({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <p className="text-[14px] text-white/80">{label}</p>
      <p
        className={`mt-1 font-semibold tracking-tight leading-none ${small ? "text-[30px]" : "text-[48px]"}`}
      >
        {value}
        <span className="text-[15px] font-normal text-white/80"> a month</span>
      </p>
    </div>
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
      intro="Move the sliders to match your practice. We've started at £55, the average private check-up in 2024 (Competition and Markets Authority)."
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
        <div className="space-y-6">
          <Result label="Lost to no-shows" value={gbp(perMonth)} />
          <div className="h-px bg-white/20" />
          <Result label="Saving just one a week" value={gbp(onePerWeek)} small />
          <p className="text-[14px] text-white/85">DentDock is £49 a month.</p>
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
      intro="Add up what you pay each month for your practice system, reminder texts and any separate booking or forms tools."
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
        <div className="space-y-6">
          <Result label="You pay now" value={gbp(total)} />
          <div className="h-px bg-white/20" />
          <Result label="DentDock" value="£49" small />
          <p className="text-[14px] text-white/85">
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
  sounds: { title: string; lines: Pain[] };
  story: { title: string; highlight?: string; intro: string; stops: Stop[] };
  controls: { title: string; intro: string; groups: ControlGroup[] };
  calculator: ReactNode;
  features: { title: string; highlight?: string; items: OtherArea[] };
  faq: Faq[];
};

export function SolutionStoryPage({ content }: { content: SolutionStoryContent }) {
  const c = content;
  return (
    <PageShell>
      <StoryHero hero={c.hero} />
      <SoundsLikeYou {...c.sounds} />
      <StoryTimeline {...c.story} />
      <WhatYouControl {...c.controls} />
      {c.calculator}
      <OtherAreas {...c.features} />
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
