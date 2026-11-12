import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, pillButton } from "@/components/site/ui";
import { FaqSection, templateHead, type Faq } from "@/components/site/templates";

/*
 * Pricing page (research 12 Nov: NN/g "show price" and "common scenarios", Cliniko, Fresha, Fathom,
 * Basecamp's "hassle tax"). One live plan, so no comparison table: price in the headline, one card,
 * worked monthly bills, what you pay and don't, no-catch promises, coming-soon plans below, FAQ.
 * Facts (Hariss / app, 12 Nov 2026): £49 per practice per month; not VAT-registered, so no VAT added;
 * 200 texts a month included (resets monthly), then 8p a text, long texts count as more than one;
 * Stripe card fees charged by Stripe on the practice's own account, DentDock takes no cut; no setup
 * fee, no contract, cancel any time, full data export; 30-day free trial, one per practice.
 * No competitor prices (Hariss).
 */

const PATH = "/pricing";

const points = [
  "Every feature, for your whole practice",
  "Unlimited dentists and staff",
  "200 texts a month, then 8p a text",
  "No setup fee and no contract",
  "Cancel any time",
];

const included = [
  {
    title: "Calendar and diary",
    body: "A column for each clinician, visit statuses, working hours, leave and blocked time.",
    to: "/features/calendar",
  },
  {
    title: "Online booking and patient portal",
    body: "Your own booking page with your prices, and a portal where patients manage their visits.",
    to: "/features/online-booking",
  },
  {
    title: "Reminders and recalls",
    body: "Reminders 72, 24 and 2 hours before, recalls that follow up, and a waitlist for gaps.",
    to: "/features/reminders-and-recalls",
  },
  {
    title: "Forms and medical history",
    body: "Health and consent forms filled in and signed before the visit, saved to the record.",
    to: "/features/forms",
  },
  {
    title: "Payments and deposits",
    body: "Payment links, deposits and fair fees through your own Stripe account. DentDock takes no cut.",
    to: "/features/payments",
  },
  {
    title: "Reports",
    body: "Money taken by clinician, no-show rates, booking sources and an export for your accountant.",
    to: "/features/reports",
  },
  {
    title: "Security and data",
    body: "Stored in London, encrypted, two-step login, and a full export of your data any time.",
    to: "/features/security",
  },
  {
    title: "Setup and support",
    body: "Import your patients from a CSV, go live in a day, and get same-day help on WhatsApp.",
    to: "/features/switching",
  },
];

const comingSoon = [
  {
    name: "Multi-site",
    items: [
      "Everything in Starter",
      "Up to 5 sites, one login",
      "Owner overview of every site",
      "Shared patient records",
      "Book any site from one reception",
    ],
  },
  {
    name: "Enterprise",
    items: [
      "Everything in Multi-site",
      "Unlimited sites and regions",
      "Your own booking domain",
      "Data migration done for you",
      "Dedicated account manager",
    ],
  },
];

const faq: Faq[] = [
  {
    question: "Is it really £49 for the whole practice?",
    answer:
      "Yes. £49 a month covers your whole practice, with unlimited dentists, staff and patients. It doesn't go up as your team grows.",
  },
  {
    question: "What counts as a text, and what happens after 200?",
    answer:
      "200 texts are included each month and the count starts again every month. After that each text is 8p. A long message can count as more than one text. Emails are included.",
  },
  {
    question: "Who pays the card fees when patients pay online?",
    answer:
      "Patient payments go into your practice's own Stripe account. Stripe charges its standard fee for each payment, and DentDock takes nothing.",
  },
  {
    question: "Is there a contract or minimum term?",
    answer:
      "No. You pay month by month and can cancel at any time. There's no notice period and no exit fee.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. Each practice gets a 30-day free trial when it signs up.",
  },
  {
    question: "Can we take our data with us if we leave?",
    answer:
      "Yes. Owners and managers can download everything in one go at any time: spreadsheets of your records plus every file and photo.",
  },
  {
    question: "Is VAT added?",
    answer:
      "No VAT is added at the moment, because DentDock isn't VAT-registered yet. If that changes, we'll tell you before it affects your bill.",
  },
  {
    question: "What happens when we join the waitlist?",
    answer:
      "Nothing is charged. You'll get an email from us personally, and we'll set you up when your place is ready. The first 30 practices get priority support.",
  },
  {
    question: "We have more than one site. What should we do?",
    answer:
      "Each site can use DentDock today. Multi-site, with one login and an overview of every site, is coming soon. Register your interest and we'll keep you posted.",
  },
];

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Pricing | DentDock, £49 a month per practice, no contract",
      description:
        "DentDock is £49 a month for your whole practice: unlimited dentists and staff, 200 texts a month included then 8p each. No setup fee, no contract, no VAT added.",
      crumbs: [{ name: "Pricing", path: PATH }],
      faq,
    }),
});

const sectionTitle =
  "text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-10 px-6">
      <Reveal className="mx-auto max-w-3xl text-center">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#64748B]">
          <Link to="/" className="hover:text-[#2563EB]">
            Home
          </Link>
          {" / "}
          <Link to="/pricing" className="hover:text-[#2563EB]">
            Pricing
          </Link>
        </nav>
        <h1
          className="font-semibold text-[#0F172A] text-[40px] leading-[1.1] md:text-[60px]"
          style={{ letterSpacing: "-0.035em" }}
        >
          £49 a month. <span className="text-[#2563EB]">For your whole practice.</span>
        </h1>
        <p className="mt-6 text-[19px] text-[#334155] leading-[1.6] max-w-2xl mx-auto">
          Unlimited dentists and staff, 200 texts a month included, and every feature. We're opening
          in stages, so join the waitlist for early access.
        </p>
      </Reveal>
    </section>
  );
}

function PlanCard() {
  return (
    <section id="plan" className="bg-white pb-16 md:pb-24 px-6 scroll-mt-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className="rounded-[32px] bg-white border border-[#DBEAFE] shadow-[0_40px_90px_-50px_rgba(37,99,235,0.55)] overflow-hidden grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-8 md:p-10 text-white flex flex-col">
            <p className="text-[15px] font-semibold text-white/80">Starter</p>
            <p className="mt-4 flex items-end gap-2">
              <span className="text-7xl font-semibold tracking-tight leading-none">£49</span>
              <span className="pb-1.5 text-[16px] text-white/85">a month</span>
            </p>
            <p className="mt-3 text-[16px] text-white/90">Per practice. No VAT added.</p>
            <div className="mt-auto pt-10 flex flex-col gap-3">
              <Link
                to="/waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
              >
                Join the waitlist <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-[13px] text-white/80">No payment needed to join</p>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-[15px] font-semibold text-[#0F172A]">Starter includes</p>
            <ul className="mt-5 space-y-3.5">
              {points.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] text-[#0F172A] leading-[1.45]"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Included() {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            Everything in <span className="text-[#2563EB]">the plan</span>
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">
            One price covers all of it. Nothing is a paid extra apart from texts over 200 a month.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {included.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <Link
                to={f.to as "/features"}
                className="group h-full rounded-3xl bg-white border border-[#E5EDFB] p-6 flex flex-col transition-colors duration-200 hover:border-[#2563EB]"
              >
                <h3 className="text-[17px] font-semibold text-[#0F172A] tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#475569] leading-[1.6] flex-1">{f.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB]">
                  Find out more{" "}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-[34px] font-semibold tracking-tight text-[#0F172A] leading-[1.15]">
            Running more than one site?
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] leading-[1.6]">
            Plans for groups are coming soon. There's no price yet, so register your interest and
            we'll keep you posted.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comingSoon.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-[#E5EDFB] bg-[#F8FAFC] p-7 flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-[19px] font-semibold text-[#0F172A]">{plan.name}</p>
                  <span className="rounded-lg bg-white border border-[#E5EDFB] px-2.5 py-1 text-[12px] font-semibold text-[#64748B]">
                    Coming soon
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14px] text-[#475569]">
                      <Check
                        className="w-4 h-4 mt-0.5 text-[#94A3B8] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link to="/waitlist" className={`mt-6 self-start ${pillButton}`}>
                  Register interest
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <PageShell>
      <Hero />
      <PlanCard />
      <Included />
      <ComingSoon />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
