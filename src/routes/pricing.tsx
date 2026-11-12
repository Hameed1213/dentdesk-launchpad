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
    body: "Import your patients from a CSV, plan your go-live date, and get same-day help on WhatsApp.",
    to: "/features/switching",
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
      title: "Pricing: £49 a month per practice, no contract | DentDock",
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
          className="font-semibold text-[#0F172A] text-[40px] leading-[1.1] md:text-[58px]"
          style={{ letterSpacing: "-0.035em" }}
        >
          Simple pricing <span className="text-[#2563EB]">for every practice</span>
        </h1>
        <p className="mt-6 text-[19px] text-[#334155] leading-[1.6] max-w-2xl mx-auto">
          One price for your whole practice, billed monthly. No setup fee, no contract, and no VAT
          added.
        </p>
      </Reveal>
    </section>
  );
}

type Plan = {
  name: string;
  blurb: string;
  price: string;
  priceNote: string;
  cta: string;
  ctaNote: string;
  featuresNote: string;
  features: string[];
  live?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    blurb: "Everything a single practice needs, from the first booking to the last recall.",
    price: "£49",
    priceNote: "Per practice, per month",
    cta: "Join the waitlist",
    ctaNote: "No payment needed to join",
    featuresNote: "Every feature, for your whole practice",
    features: [
      "Unlimited dentists and staff",
      "Online booking and patient portal",
      "Reminders and recalls",
      "Forms and medical history",
      "Payments and deposits",
      "200 texts a month, then 8p a text",
      "Priority WhatsApp support",
    ],
    live: true,
  },
  {
    name: "Multi-site",
    blurb: "For groups that want every site in one place.",
    price: "Coming soon",
    priceNote: "No price yet",
    cta: "Register interest",
    ctaNote: "We'll keep you posted",
    featuresNote: "Everything in Starter, plus",
    features: [
      "Up to 5 sites, one login",
      "Owner overview of every site",
      "Shared patient records",
      "Book any site from one reception",
      "Team messaging",
      "Membership plans",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For larger groups with head-office needs.",
    price: "Coming soon",
    priceNote: "No price yet",
    cta: "Register interest",
    ctaNote: "We'll keep you posted",
    featuresNote: "Everything in Multi-site, plus",
    features: [
      "Unlimited sites and regions",
      "Your own booking domain",
      "Data migration done for you",
      "Dedicated account manager",
      "Head-office templates and automations",
    ],
  },
];

function PlanCard() {
  return (
    <section id="plan" className="bg-white pb-16 md:pb-24 px-6 scroll-mt-24">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="h-full">
            <div
              className={`h-full rounded-3xl border flex flex-col overflow-hidden ${
                p.live
                  ? "border-[#2563EB] shadow-[0_30px_70px_-40px_rgba(37,99,235,0.6)]"
                  : "border-[#E5EDFB]"
              }`}
            >
              <div
                className={`p-7 ${p.live ? "bg-gradient-to-b from-[#EEF4FF] to-white" : "bg-white"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[24px] font-semibold tracking-tight text-[#0F172A]">
                    {p.name}
                  </p>
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[12px] font-semibold ${
                      p.live ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    {p.live ? "Available now" : "Coming soon"}
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-[#475569] leading-[1.55] md:min-h-[44px]">
                  {p.blurb}
                </p>
                <p className="mt-6 leading-none h-[48px] flex items-end">
                  {p.live ? (
                    <span className="text-[48px] font-semibold tracking-tight text-[#0F172A]">
                      {p.price}
                    </span>
                  ) : (
                    <span className="text-[30px] font-semibold tracking-tight text-[#64748B]">
                      {p.price}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-[14px] text-[#64748B]">{p.priceNote}</p>
                <Link
                  to="/waitlist"
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                    p.live
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md shadow-blue-500/20"
                      : "border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]"
                  }`}
                >
                  {p.cta} {p.live && <ArrowRight className="w-4 h-4" />}
                </Link>
                <p className="mt-3 text-center text-[13px] text-[#64748B]">{p.ctaNote}</p>
              </div>
              <div className="border-t border-[#EEF2FB] p-7 flex-1">
                <p className="text-[18px] font-semibold text-[#0F172A]">Features</p>
                <p className="mt-1 text-[13px] text-[#64748B]">{p.featuresNote}</p>
                <ul className="mt-5 space-y-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[14px] text-[#334155] leading-[1.45]"
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          p.live ? "bg-[#2563EB]" : "border-2 border-[#CBD5E1]"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${p.live ? "text-white" : "text-[#94A3B8]"}`}
                          strokeWidth={3}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-[#64748B]">
        Billed monthly. No setup fee, no contract, cancel any time. No VAT is added.
      </p>
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

function PricingPage() {
  return (
    <PageShell>
      <Hero />
      <PlanCard />
      <Included />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
