import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, PoundSterling, Scale, ShieldCheck } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, FloatCard, PhotoPanel, Reveal, TrustStrip } from "@/components/site/ui";
import { PageHeroSplit, SectionTitle, templateHead } from "@/components/site/templates";
import { at } from "@/components/site/solutionTemplates";
import { PillCard } from "@/components/site/cards";

/*
 * About page: the company, not the founder (Hariss, 12 Nov 2026). Every claim matches other pages:
 * £49 a month per practice, no contract or setup fees, 30-day trial, first 30 practices via the
 * waitlist, WhatsApp support, data stored in London, export any time, ICO ZC132966, company details
 * as in the footer. Does not claim a founding year, team size, office or customer numbers.
 * Photos: Magnific (Freepik) free licence, credited in the footer.
 */

const PATH = "/about";

const values = [
  {
    Icon: PoundSterling,
    title: "One published price",
    body: "£49 a month per practice, with unlimited dentists and staff. No setup fees, no contract and no sales call to find out what it costs.",
  },
  {
    Icon: MessageCircle,
    title: "Support from real people",
    body: "Message us on WhatsApp and the people who build DentDock reply the same day. No ticket queue and no chatbot.",
  },
  {
    Icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Records are stored in London and encrypted. Owners and managers can download everything at any time, so you're never locked in.",
  },
  {
    Icon: Scale,
    title: "Straight about what we do",
    body: "We say what DentDock doesn't do as clearly as what it does, so you can decide whether it fits before you join.",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "About DentDock | Practice software for UK private dentistry",
      description:
        "DentDock is practice software for UK private dental practices: booking, reminders, recalls, forms and payments for one published price, with same-day support.",
      crumbs: [{ name: "About", path: PATH }],
      faq: [],
    }),
});

function AboutPage() {
  return (
    <PageShell>
      <PageHeroSplit
        hero={{
          crumbs: [{ label: "About", to: PATH }],
          title: "Practice software built for",
          highlight: "UK private dentistry",
          intro:
            "DentDock brings online booking, reminders, recalls, forms and payments together in one place, for one published price, with support from the people who build it.",
          visual: (
            <PhotoPanel
              src="/images/pages/about-patient.webp"
              alt="Patient smiling at her dentist from the dental chair"
              height={934}
              position="object-[0%_35%]"
            >
              <PillCard className={at.topLeft} icon="dot" text="£49 a month, one price" />
              <FloatCard className={`${at.bottomRight} px-4 py-2.5 flex items-center gap-2`}>
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-[12px] font-medium text-[#0F172A]">
                  Same-day replies on WhatsApp
                </span>
              </FloatCard>
            </PhotoPanel>
          ),
        }}
      />
      <TrustStrip />

      {/* Why DentDock exists: photo + story */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:order-2">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
              Why DentDock <span className="text-[#2563EB]">exists</span>
            </h2>
            <div className="mt-6 space-y-5">
              <p className="text-[17px] text-[#334155] leading-[1.7]">
                Most dental software was built for every kind of practice at once: NHS claims,
                charting, imaging and multi-site groups. Private practices end up paying for
                features they never use, and still chase patients by phone.
              </p>
              <p className="text-[17px] text-[#334155] leading-[1.7]">
                DentDock does the patient-facing work of a private practice well: letting patients
                book online at any hour, reminding them so they turn up, bringing them back for
                check-ups, collecting forms before the visit and taking payments.
              </p>
              <p className="text-[17px] text-[#334155] leading-[1.7]">
                It's priced so a single practice can afford it, and set up without a sales process.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <PhotoPanel
              src="/images/pages/about-team.webp"
              alt="Three colleagues looking at a laptop together in a bright office"
              height={934}
              position="object-[50%_40%]"
            >
              <PillCard
                className={at.bottomLeft}
                icon="dot"
                text="Built and supported by the same team"
              />
            </PhotoPanel>
          </Reveal>
        </div>
      </section>

      {/* Values on a blue band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#DBEAFE] via-[#EAF1FF] to-[#F5F8FF] py-16 md:py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="What we" highlight="stand for" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-3xl bg-white border border-white shadow-[0_12px_40px_-16px_rgba(37,99,235,0.25)] p-7 md:p-8">
                  <span className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)]">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-tight text-[#0F172A]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[16px] text-[#475569] leading-[1.6]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are today: text + photo on a tint */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
              Where we are <span className="text-[#2563EB]">today</span>
            </h2>
            <p className="mt-6 text-[17px] text-[#334155] leading-[1.7]">
              We're opening DentDock to our first 30 practices through the waitlist. Each one gets a
              30-day free trial and talks directly to the team building it, and what those practices
              ask for shapes what we build next.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold">
              <Link to="/features" className="text-[#2563EB] hover:underline">
                See the features
              </Link>
              <Link to="/pricing" className="text-[#2563EB] hover:underline">
                See pricing
              </Link>
              <Link to="/contact" className="text-[#2563EB] hover:underline">
                Contact us
              </Link>
            </div>
            <p className="mt-10 border-t border-[#DBEAFE] pt-6 text-[14px] text-[#64748B] leading-[1.7]">
              DentDock is a trading name of Paradigm Network Limited. Company No. 16903048 ·
              Registered in England and Wales · ICO No. ZC132966
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PhotoPanel
              src="/images/pages/about-surgery.webp"
              alt="Dentist treating a patient with a dental microscope in a modern surgery"
              height={934}
              position="object-[25%_50%]"
            >
              <PillCard className={at.topRight} icon="dot" text="Opening to 30 practices" />
            </PhotoPanel>
          </Reveal>
        </div>
      </section>

      <ClosingBand />
    </PageShell>
  );
}
