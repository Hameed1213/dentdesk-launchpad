import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  note: string;
  comingSoon?: boolean;
  /** What the plan includes. Every Starter line is in the product today
   *  (payments and text messages go live before launch); the coming-soon
   *  plans list what they are planned to include. */
  features: string[];
};

const AND_MORE = "and more…";

export default function PricingCTA() {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: "£49",
      priceSuffix: "/mo",
      note: "",
      features: [
        "1 location",
        "Unlimited dentists & staff permissions",
        "Calendar & scheduling",
        "Online booking page",
        "Patient portal",
        "Patient records & notes",
        "Automated reminders & recalls",
        "200 free text messages a month, then pay per text",
        "Unlimited emails",
        "Payments & deposits",
        "Forms & questionnaires",
        "Advanced analytics & reports",
        "Ad tracking & booking sources",
        "Priority WhatsApp support",
        AND_MORE,
      ],
    },
    {
      name: "Multi-site",
      price: "Coming soon",
      note: "For practices with more than one site",
      comingSoon: true,
      features: [
        "Everything in Starter",
        "Owner overview: analytics, money, bookings and recalls for every site, together or one at a time",
        "Up to 5 sites under one login, switch in one click",
        "One patient record shared across your sites",
        "Each site has its own booking page, opening hours, branding and emails",
        "Clinicians who work across sites, with a diary per site",
        "Book into any site's diary from one reception",
        "Team messaging: message colleagues at your site or another, one to one or in groups",
        "Permissions per site",
        AND_MORE,
      ],
    },
    {
      name: "Enterprise",
      price: "Coming soon",
      note: "For groups and larger organisations",
      comingSoon: true,
      features: [
        "Everything in Multi-site",
        "Unlimited sites, grouped into regions, with area-manager views",
        "Your own booking address (book.yourpractice.co.uk)",
        "Data migration done for you, including appointment history",
        "Dedicated account manager, onboarding and staff training",
        "Templates and automations set once by head office, used by every site",
        "Data exports for your own reporting tools",
        "Custom contract and data processing agreement",
        AND_MORE,
      ],
    },
  ];

  const [selected, setSelected] = useState<string>("Starter");
  const activePlan = plans.find((p) => p.name === selected) ?? plans[0];
  const isComingSoon = !!activePlan.comingSoon;

  const features = activePlan.features;

  return (
    <section className="relative bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white py-16 md:py-24 overflow-hidden">
      {/* Top irregular fade to white */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 z-10"
        style={{
          background:
            "radial-gradient(ellipse 45% 120% at 10% 0%, white 55%, transparent 85%), radial-gradient(ellipse 40% 110% at 32% 0%, white 50%, transparent 85%), radial-gradient(ellipse 50% 130% at 55% 0%, white 55%, transparent 85%), radial-gradient(ellipse 45% 115% at 78% 0%, white 50%, transparent 85%), radial-gradient(ellipse 40% 100% at 95% 0%, white 50%, transparent 85%), radial-gradient(ellipse 130% 90% at 50% 0%, white 35%, transparent 80%)",
        }}
      />
      {/* Bottom irregular fade to white */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 130% at 30% 100%, white 55%, transparent 85%), radial-gradient(ellipse 65% 110% at 80% 100%, white 50%, transparent 85%), radial-gradient(ellipse 120% 90% at 50% 100%, white 35%, transparent 80%)",
        }}
      />
      {/* Center white blobs */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 30% 25% at 15% 40%, rgba(255,255,255,0.85), transparent 70%), radial-gradient(ellipse 35% 30% at 85% 55%, rgba(255,255,255,0.8), transparent 70%), radial-gradient(ellipse 25% 20% at 50% 50%, rgba(255,255,255,0.6), transparent 70%), radial-gradient(ellipse 28% 22% at 35% 65%, rgba(255,255,255,0.7), transparent 70%), radial-gradient(ellipse 30% 25% at 70% 35%, rgba(255,255,255,0.75), transparent 70%)",
        }}
      />
      <div className="relative z-20 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Simple pricing for <span className="text-[#2563EB]">every practice</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            One plan today, more coming as DentDock grows. Start with a 30-day free trial.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left — stacked plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {plans.map((plan) => {
              const isSelected = plan.name === selected;
              return (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelected(plan.name)}
                  className={[
                    "text-left rounded-2xl border p-5 flex items-center justify-between transition-all cursor-pointer",
                    isSelected
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20"
                      : "bg-white border-neutral-200 text-foreground hover:border-neutral-300 hover:shadow-sm",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-4">
                    {isSelected ? (
                      <CheckCircle2 size={22} className="text-white flex-shrink-0" strokeWidth={2.5} />
                    ) : (
                      <Circle size={22} className="text-neutral-300 flex-shrink-0" strokeWidth={2} />
                    )}
                    <div className="flex flex-col gap-1">
                      <div className={`text-[17px] font-semibold ${isSelected ? "text-white" : "text-foreground"}`}>
                        {plan.name}
                      </div>
                      {plan.note && (
                        <span
                          className={[
                            "text-[11px] font-medium px-2 py-0.5 rounded-full inline-block w-fit",
                            isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-[#475569]",
                          ].join(" ")}
                        >
                          {plan.note}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap pl-3">
                    <span
                      className={[
                        plan.priceSuffix ? "text-xl font-medium" : "text-sm font-medium",
                        isSelected ? "text-white" : plan.comingSoon ? "text-[#94A3B8]" : "text-foreground",
                      ].join(" ")}
                    >
                      {plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span className={`text-sm font-normal ${isSelected ? "text-white/70" : "text-[#94A3B8]"}`}>
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Desktop-only CTA under Enterprise */}
            <Link
              to="/waitlist"
              className="hidden lg:inline-flex self-start items-center justify-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20 mt-2"
            >
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — Includes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-2xl border border-neutral-200 bg-white p-8 overflow-hidden"
          >
            <div className="pb-4 mb-2 border-b border-neutral-100 flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-foreground">
                {isComingSoon ? `${activePlan.name} is planned to include:` : "Includes:"}
              </h3>
              {isComingSoon && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] whitespace-nowrap">
                  Coming soon
                </span>
              )}
            </div>
            <ul className="divide-y divide-neutral-100">
              {features.map((feature, i) =>
                feature === AND_MORE ? (
                  <li key={i} className="py-3 text-[15px] leading-[1.5] text-[#64748B]">
                    {feature}
                  </li>
                ) : (
                  <li key={i} className="flex items-center justify-between gap-4 py-3">
                    <span
                      className={`text-[15px] leading-[1.5] text-[#0F172A] ${feature.startsWith("Everything in ") ? "font-semibold" : ""}`}
                    >
                      {feature}
                    </span>
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" strokeWidth={3} />
                  </li>
                ),
              )}
            </ul>

            {isComingSoon && (
              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[13px] text-[#475569]">
                  No price yet. Register your interest and we'll be in touch when it launches.
                </p>
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center gap-2 border border-[#2563EB] text-[#2563EB] text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors whitespace-nowrap"
                >
                  Register interest <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            to="/waitlist"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
          >
            Join the waitlist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
