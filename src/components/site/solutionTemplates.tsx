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
    <section className="bg-white pt-16 md:pt-20">
      <Reveal className="px-6 text-center">
        <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight text-[#0F172A] leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 border-y border-neutral-200">
        <ul className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3">
          {lines.map(({ text }, i) => (
            <li
              key={text}
              className={`px-8 py-8 md:py-10 text-center border-neutral-200 ${i < lines.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`}
            >
              <p className="text-[17px] md:text-[18px] font-medium text-[#0F172A] leading-[1.5] max-w-sm mx-auto">
                {text}
              </p>
            </li>
          ))}
        </ul>
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
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
          <p className="mt-5 text-[18px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <ol className="relative mt-16">
          {/* the line: left on phones, centre from md */}
          <span
            aria-hidden="true"
            className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-[#BFDBFE]"
          />
          {stops.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal
                key={s.time + s.title}
                delay={0.04 * i}
                className={i < stops.length - 1 ? "pb-12 md:pb-16" : ""}
              >
                <li className="relative list-none grid grid-cols-1 md:grid-cols-2 md:gap-16 items-center pl-9 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 w-[19px] h-[19px] rounded-full bg-white border-[4px] border-[#2563EB]"
                  />
                  <div className={`${right ? "md:order-2 md:text-left" : "md:text-right"}`}>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#2563EB]">
                      {s.time}
                    </p>
                    <h3 className="mt-2 text-[22px] font-semibold text-[#0F172A] tracking-tight">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-2 text-[16px] text-[#475569] leading-[1.6] max-w-md ${right ? "" : "md:ml-auto"}`}
                    >
                      {s.body}
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`mt-5 md:mt-0 flex ${right ? "md:order-1 md:justify-end" : "md:justify-start"}`}
                  >
                    {s.visual}
                  </div>
                </li>
              </Reveal>
            );
          })}
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
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-14 md:py-16 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-[38px] font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-2xl bg-white border border-[#E5EDFB] shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] p-4 space-y-3 max-w-md lg:ml-auto">
            {groups.map((g) => (
              <div key={g.group}>
                <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
                  {g.group}
                </p>
                <div className="mt-1.5 rounded-xl bg-[#F8FAFC] divide-y divide-white">
                  {g.items.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center justify-between gap-4 px-3.5 py-2"
                    >
                      <span className="text-[13px] text-[#0F172A]">{c.label}</span>
                      <span className="text-[13px] font-semibold text-[#2563EB] whitespace-nowrap scale-90 origin-right">
                        {c.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-[14px] text-[#475569]">
        {label}
        <span className="text-[16px] font-semibold text-[#0F172A] tabular-nums">
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
        className="mt-2 w-full accent-[#2563EB]"
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
    <section className="bg-white py-16 md:py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            {title}
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] leading-[1.6]">{intro}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <div className="rounded-3xl border border-[#E5EDFB] bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">{controls}</div>
            <div className="mt-7 rounded-2xl bg-[#F5F8FF] px-6 py-5">{result}</div>
            <p className="mt-3 text-center text-[12px] text-[#94A3B8]">
              Your own figures, worked out in your browser. Not a promise of results.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Result({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-[13px] text-[#64748B]">{label}</p>
      <p
        className={`mt-1 text-[28px] font-semibold tracking-tight leading-none ${accent ? "text-[#2563EB]" : "text-[#0F172A]"}`}
      >
        {value}
        <span className="text-[13px] font-normal text-[#64748B]"> a month</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:divide-x sm:divide-[#DBEAFE]">
          <Result label="Lost to no-shows" value={gbp(perMonth)} />
          <Result label="Saving just one a week" value={gbp(onePerWeek)} accent />
          <Result label="DentDock costs" value="£49" />
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
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:divide-x sm:divide-[#DBEAFE]">
            <Result label="You pay now" value={gbp(total)} />
            <Result label="DentDock" value="£49" accent />
          </div>
          <p className="mt-4 text-center text-[13px] text-[#64748B]">
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
