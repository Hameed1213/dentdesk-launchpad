import { Link } from "@tanstack/react-router";
import { PhotoPanel, Reveal, pillButton, primaryButton } from "@/components/site/ui";
import { PillCard } from "@/components/site/cards";

const L = "absolute left-2 sm:left-3 lg:-left-6";
const B = "bottom-4 sm:bottom-6 lg:bottom-10";

/** "A partner you can trust" band, used on the Features and Solutions hubs. */
export function TrustBand() {
  const items = [
    { title: "UK hosted", sub: "Stored in London" },
    { title: "Encrypted", sub: "In transit and at rest" },
    { title: "Two-step login", sub: "For owners and managers" },
    { title: "ICO registered", sub: "ZC132966" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F0FF] via-[#F1EEFF] to-[#E3F2FF] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <PhotoPanel
            src={"/images/pages/hero-security.webp"}
            alt={"Smiling dentist in his surgery"}
            height={1778}
            position={"object-[50%_28%]"}
          >
            <PillCard className={`${L} ${B}`} icon="dot" text="Two-step login on" />
          </PhotoPanel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            <span className="text-[#2563EB]">A partner</span> you can trust
          </h2>
          <p className="mt-5 text-[17px] text-[#334155] leading-[1.65]">
            Patient data is stored in the UK, encrypted, and only seen by the people in your team
            who need it. You can download everything at any time.
          </p>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map(({ title, sub }) => (
              <li key={title} className="rounded-2xl bg-white border border-[#E5EDFB] px-5 py-3.5">
                <span className="block text-[15px] font-semibold text-[#0F172A] leading-tight">
                  {title}
                </span>
                <span className="block mt-1 text-[13px] text-[#64748B] leading-tight">{sub}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/features/security" className={primaryButton}>
              Explore security and data
            </Link>
            <Link to="/dpa" className={pillButton}>
              Read our DPA
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
