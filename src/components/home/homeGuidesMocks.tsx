import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { photoSrcSet, pillButton, primaryButton } from "@/components/site/ui";
import { guides } from "@/components/site/guides";
import { AUTHOR } from "@/components/site/schema";

/*
 * MOCK-UPS ONLY (20 Nov 2026): four designs for the homepage guides section, after Hariss didn't
 * like the first one. Not for merging.
 */

const g = guides[0];
const href = `/guides/${g.slug}` as "/guides";
const SHORT_ANSWER =
  "Yes, as long as the fee is fair and patients agreed to your policy before they booked.";
const INSIDE = [
  "What the NHS rules mean for mixed practices",
  "Notice periods and fair fees",
  "A cancellation policy you can copy",
];

function Monogram({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-semibold ${light ? "bg-white text-[#2563EB]" : "bg-[#2563EB] text-white"}`}
    >
      HH
    </span>
  );
}

function Img({ className, sizes }: { className: string; sizes: string }) {
  return (
    <img
      src={g.image}
      srcSet={photoSrcSet(g.image)}
      sizes={sizes}
      alt={g.imageAlt}
      width={1400}
      height={933}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}

function Heading({ center = false }: { center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A] leading-[1.1]">
        Practical guides for <span className="text-[#2563EB]">private practices</span>
      </h2>
      <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">
        Plain answers to the questions practice managers ask us, with the sources to check them.
      </p>
    </div>
  );
}

/* 1. Centred heading and one wide card: photo left, the guide's contents right. */
function Option1() {
  return (
    <section className="bg-[#F7F9FF] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Heading center />
        <Link
          to={href}
          className="group mt-12 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[28px] border border-[#E5EDFB] bg-white transition-colors hover:border-[#2563EB]"
        >
          <Img
            className="h-full w-full aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
            sizes="(min-width: 1024px) 580px, calc(100vw - 48px)"
          />
          <div className="flex flex-col p-8 md:p-10">
            <p className="text-[14px] font-medium text-[#2563EB]">{g.topics[0]}</p>
            <h3 className="mt-2 text-[26px] md:text-[30px] font-semibold tracking-tight text-[#0F172A] leading-[1.2]">
              {g.title}
            </h3>
            <ul className="mt-6 space-y-2.5">
              {INSIDE.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px] text-[#334155]">
                  <Check
                    className="mt-[3px] h-4 w-4 flex-shrink-0 text-[#2563EB]"
                    strokeWidth={2.5}
                  />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
                <Monogram />
                <span>
                  <span className="font-medium text-[#0F172A]">{AUTHOR.name}</span> · {g.minutes}{" "}
                  min read
                </span>
              </span>
              <span className={primaryButton}>
                Read the guide <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
        <div className="mt-8 text-center">
          <Link to="/guides" className={pillButton}>
            See all guides
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 2. The photo fills a large card, with the title and button over a dark fade. */
function Option2() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Heading />
          <Link to="/guides" className={`${pillButton} self-start md:self-auto`}>
            See all guides
          </Link>
        </div>
        <Link
          to={href}
          className="group relative mt-10 block overflow-hidden rounded-[28px] min-h-[420px] md:min-h-[460px]"
        >
          <Img
            className="absolute inset-0 h-full w-full"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F162B]/90 via-[#0F162B]/60 to-transparent" />
          <div className="relative flex h-full min-h-[420px] md:min-h-[460px] max-w-xl flex-col justify-end p-8 md:p-12">
            <p className="text-[14px] font-medium text-[#93C5FD]">{g.topics[0]}</p>
            <h3 className="mt-2 text-[28px] md:text-[38px] font-semibold tracking-tight text-white leading-[1.15]">
              {g.title}
            </h3>
            <p className="mt-4 text-[16px] text-[#E2E8F0] leading-[1.6]">{g.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-[#2563EB] transition-colors group-hover:bg-[#EFF6FF]">
                Read the guide <ArrowRight className="h-4 w-4" />
              </span>
              <span className="flex items-center gap-2.5 text-[13px] text-[#CBD5E1]">
                <Monogram light />
                {AUTHOR.name} · {g.minutes} min read
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* 3. The answer as the hook: navy panel with the short answer, photo beside it. */
function Option3() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Heading />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] overflow-hidden rounded-[28px]">
          <div className="bg-[#0F162B] p-8 md:p-12 flex flex-col">
            <p className="text-[14px] font-medium text-[#93C5FD]">{g.topics[0]}</p>
            <h3 className="mt-3 text-[24px] md:text-[30px] font-semibold tracking-tight text-white leading-[1.2]">
              {g.title}
            </h3>
            <p className="mt-6 border-l-2 border-[#60A5FA] pl-5 text-[20px] md:text-[22px] text-white leading-[1.5]">
              {SHORT_ANSWER}
            </p>
            <p className="mt-5 text-[15px] text-[#94A3B8]">
              The full guide covers the NHS rules, notice periods, when to waive a fee, and a
              cancellation policy you can copy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to={href}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]"
              >
                Read the full answer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/guides"
                className="text-[15px] font-semibold text-white underline underline-offset-4 hover:text-[#BFDBFE]"
              >
                See all guides
              </Link>
            </div>
          </div>
          <Img
            className="h-full w-full aspect-[16/10] lg:aspect-auto"
            sizes="(min-width: 1024px) 520px, calc(100vw - 48px)"
          />
        </div>
      </div>
    </section>
  );
}

/* 4. Learn before you choose: the guide alongside the free tools and comparisons. */
function Option4() {
  return (
    <section className="bg-[#F7F9FF] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A] leading-[1.1]">
            Learn before you <span className="text-[#2563EB]">choose</span>
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">
            Guides, free calculators and honest comparisons for UK private practices.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to={href}
            className="group flex flex-col overflow-hidden rounded-3xl border border-[#E5EDFB] bg-white transition-colors hover:border-[#2563EB]"
          >
            <Img
              className="w-full aspect-[16/10]"
              sizes="(min-width: 768px) 370px, calc(100vw - 48px)"
            />
            <div className="flex flex-1 flex-col p-7">
              <p className="text-[14px] font-medium text-[#2563EB]">Guide</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
                {g.title}
              </h3>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
                Read the guide{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          <Link
            to="/tools"
            className="group flex flex-col rounded-3xl border border-[#E5EDFB] bg-white p-7 transition-colors hover:border-[#2563EB]"
          >
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5">
              <p className="text-[12px] text-[#64748B]">Missed appointments a week</p>
              <p className="mt-1 text-[22px] font-semibold text-[#0F172A]">3</p>
              <p className="mt-3 text-[12px] text-[#64748B]">Lost to no-shows a month</p>
              <p className="mt-1 text-[22px] font-semibold text-[#2563EB]">£660</p>
              <p className="mt-2 text-[11px] text-[#94A3B8]">
                Example: £55 a visit, open 48 weeks a year
              </p>
            </div>
            <p className="mt-6 text-[14px] font-medium text-[#2563EB]">Free tool</p>
            <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
              What do no-shows cost your practice?
            </h3>
            <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
              Try the calculator{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            to="/compare"
            className="group flex flex-col rounded-3xl border border-[#E5EDFB] bg-white p-7 transition-colors hover:border-[#2563EB]"
          >
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5 text-[13px]">
              <p className="mb-1 text-[12px] font-semibold text-[#0F172A]">DentDock</p>
              {[
                ["Online booking included", "Yes"],
                ["Price on the website", "Yes"],
                ["Contract", "None"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="flex justify-between border-b border-[#E2E8F0] py-2 last:border-b-0"
                >
                  <span className="text-[#475569]">{a}</span>
                  <span className="font-semibold text-[#0F172A]">{b}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] font-medium text-[#2563EB]">Comparisons</p>
            <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
              DentDock compared with Dentally, SoE and iSmile
            </h3>
            <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
              See the comparisons{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Label({ n, text }: { n: number; text: string }) {
  return (
    <div className="bg-[#FEF9C3] px-6 py-3 text-center text-[15px] font-semibold text-[#713F12]">
      Option {n}: {text}
    </div>
  );
}

export function HomeGuidesOptions() {
  return (
    <PageShell>
      <div className="pt-20" />
      <Label n={1} text="Centred heading, one wide card with what's inside" />
      <Option1 />
      <Label n={2} text="Big photo card with the title over it" />
      <Option2 />
      <Label n={3} text="The short answer as the hook, navy panel" />
      <Option3 />
      <Label n={4} text="Guide, free tool and comparisons together" />
      <Option4 />
    </PageShell>
  );
}
