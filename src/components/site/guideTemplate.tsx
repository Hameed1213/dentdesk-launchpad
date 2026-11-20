import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, photoSrcSet } from "@/components/site/ui";
import { FaqSection, type Faq } from "@/components/site/templates";
import { AUTHOR } from "@/components/site/schema";
import type { GuideMeta, GuideProductLink } from "@/components/site/guides";

/*
 * Layout for every guide (Hariss chose option "A4" on 20 Nov 2026, after Dentally's blog layout):
 * a grey header with the topic line, title and intro; a sidebar with the author and the DentDock
 * pages the guide is about (instead of share buttons); the article; "About the author"; then a band
 * linking to those DentDock pages (instead of "follow us on social media"), the FAQ and the closing
 * band. Quiet styling on purpose: no pills, no gradients, dark text, blue for links.
 * A guide supplies its metadata (components/site/guides.ts), its FAQ and its article body.
 */

function Monogram({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="inline-flex flex-shrink-0 items-center justify-center rounded-md bg-[#2563EB] font-semibold text-white"
    >
      HH
    </span>
  );
}

/** "Deposits and late cancellations ->", with the last word and the arrow kept on one line. */
function ArrowLink({ text }: { text: string }) {
  const cut = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, cut)}
      <span className="whitespace-nowrap">
        {text.slice(cut)}
        <ArrowRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" />
      </span>
    </>
  );
}

function ProductCard({ p }: { p: GuideProductLink }) {
  return (
    <Link
      to={p.to}
      className="group h-full flex flex-col rounded-3xl overflow-hidden border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
    >
      <img
        src={p.image}
        srcSet={photoSrcSet(p.image)}
        sizes="(min-width: 768px) 360px, calc(100vw - 48px)"
        alt={p.alt}
        width={1400}
        height={933}
        loading="lazy"
        className="w-full aspect-[16/10] object-cover"
      />
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[13px] font-medium text-[#64748B]">{p.kind}</p>
        <h3 className="mt-1 text-[19px] font-semibold text-[#0F172A] tracking-tight">{p.title}</h3>
        <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{p.body}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
          See {p.title.charAt(0).toLowerCase() + p.title.slice(1)}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function GuideLayout({
  guide,
  faq,
  children,
}: {
  guide: GuideMeta;
  faq: Faq[];
  /** The article body (H2s, paragraphs, sources). */
  children: ReactNode;
}) {
  return (
    <PageShell>
      <article className="bg-white">
        <header className="px-6 pt-28 lg:pt-36 pb-12 bg-[#F8FAFC]">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B]">
              <Link to="/" className="hover:text-[#0F172A]">
                Home
              </Link>
              {" / "}
              <Link to="/guides" className="hover:text-[#0F172A]">
                Guides
              </Link>
            </nav>
            <p className="mt-8 text-[15px] font-medium text-[#2563EB]">
              {guide.topics.join(" · ")}
            </p>
            <div className="mt-3 max-w-4xl">
              <h1
                className="font-semibold text-[#0F172A] text-[36px] leading-[1.15] md:text-[50px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {guide.title}
              </h1>
              <p className="mt-6 text-[20px] text-[#475569] leading-[1.55] max-w-3xl">
                {guide.lead}
              </p>
            </div>
          </div>
        </header>
        <div className="px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl pt-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
            <aside className="lg:sticky lg:top-28 self-start text-[14px]">
              <p className="text-[#64748B]">Written by</p>
              <Link
                to="/about"
                className="mt-1 block text-[16px] font-semibold text-[#0F172A] hover:text-[#2563EB]"
              >
                {AUTHOR.name}
              </Link>
              <p className="text-[#64748B]">{AUTHOR.jobTitle}</p>
              <p className="mt-4 text-[#64748B]">
                Updated {guide.updated}
                <br />
                {guide.minutes} min read
              </p>
              <div className="mt-6 border-t border-[#E2E8F0] pt-6">
                <p className="text-[14px] font-semibold text-[#0F172A]">In DentDock</p>
                <ul className="mt-3 space-y-3">
                  {guide.product.slice(0, 2).map((p) => (
                    <li key={p.to}>
                      <Link to={p.to} className="group block">
                        <span className="block text-[13px] text-[#64748B]">{p.kind}</span>
                        <span className="text-[15px] font-semibold text-[#2563EB] group-hover:underline underline-offset-4">
                          <ArrowLink text={p.title} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="max-w-3xl">
              {children}
              <div className="mt-14 border-t border-[#E2E8F0] pt-8 flex items-start gap-5">
                <Monogram size={56} />
                <div>
                  <p className="text-[14px] text-[#64748B]">About the author</p>
                  <p className="mt-0.5 text-[20px] font-semibold text-[#0F172A]">{AUTHOR.name}</p>
                  <p className="mt-2 text-[16px] text-[#334155] leading-[1.6] max-w-xl">
                    {AUTHOR.name} is the founder of DentDock, practice software for UK private
                    dental practices.
                  </p>
                  <Link
                    to="/guides"
                    className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB] hover:underline underline-offset-4"
                  >
                    Read more guides <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="px-6 py-16 md:py-24 bg-gradient-to-br from-[#EAF1FF] via-[#F2F6FF] to-[#E0EAFF]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A]">
              See how DentDock handles <span className="text-[#2563EB]">{guide.handles}</span>
            </h2>
            <p className="mt-4 text-[17px] text-[#334155] leading-[1.6]">
              Everything in this guide, set up in your practice software.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {guide.product.map((p) => (
              <ProductCard key={p.to} p={p} />
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
