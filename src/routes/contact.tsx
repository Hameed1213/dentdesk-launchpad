import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, WHATSAPP } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/* Contact page: WhatsApp and email, plus company details (same as the footer). */

const PATH = "/contact";
const EMAIL = "hello@dentdock.co.uk";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Contact DentDock",
      description:
        "Talk to the people who built DentDock on WhatsApp or by email. Questions about pricing, switching or how DentDock works for your practice.",
      crumbs: [{ name: "Contact", path: PATH }],
      faq: [],
    }),
});

function ContactCard({
  Icon,
  title,
  body,
  action,
  href,
  external,
}: {
  Icon: typeof Mail;
  title: string;
  body: string;
  action: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group h-full rounded-3xl bg-white border border-[#E5EDFB] p-8 flex flex-col transition-colors duration-200 hover:border-[#2563EB]"
    >
      <span className="w-12 h-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.8} />
      </span>
      <h2 className="mt-6 text-[22px] font-semibold tracking-tight text-[#0F172A]">{title}</h2>
      <p className="mt-2 text-[16px] text-[#475569] leading-[1.6] flex-1">{body}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB]">
        {action} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Talk to"
        highlight="the people who built it"
        intro="Questions about pricing, switching or how DentDock would work for your practice? Get in touch."
      />
      <section className="bg-white pt-6 pb-16 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal className="h-full">
            <ContactCard
              Icon={MessageCircle}
              title="WhatsApp"
              body="The quickest way to reach us. A real person replies the same day. Please don't send patient details."
              action="Message us on WhatsApp"
              href={WHATSAPP}
              external
            />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <ContactCard
              Icon={Mail}
              title="Email"
              body="For longer questions, or anything you'd like in writing."
              action={EMAIL}
              href={`mailto:${EMAIL}`}
            />
          </Reveal>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-14 md:py-16 px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[22px] md:text-[28px] font-semibold tracking-tight text-[#0F172A]">
            Company details
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] leading-[1.7]">
            DentDock is a trading name of Paradigm Network Limited.
            <br />
            Company No. 16903048 · Registered in England and Wales · ICO No. ZC132966
          </p>
          <p className="mt-6 text-[15px] text-[#475569]">
            Looking for answers first?{" "}
            <Link to="/faq" className="font-semibold text-[#2563EB] hover:underline">
              Read the FAQs
            </Link>
          </p>
        </Reveal>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
