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
};

export default function PricingCTA() {
  const plans: Plan[] = [
    { name: "Starter", price: "£49", priceSuffix: "/mo", note: "" },
    { name: "Multi-site", price: "Coming soon", note: "", comingSoon: true },
    { name: "Enterprise", price: "Coming soon", note: "", comingSoon: true },
  ];

  const [selected, setSelected] = useState<string>("Starter");
  const activePlan = plans.find((p) => p.name === selected) ?? plans[0];
  const isComingSoon = !!activePlan.comingSoon;

  const features = [
    "1 location",
    "Unlimited dentists & Staff permissions",
    "Online booking page",
    "Patient records & notes",
    "Automated reminders & recalls",
    "Payments & deposits",
    "Forms & questionnaires",
    "Advanced analytics & reports",
    "Priority WhatsApp support",
  ];

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
                  <div className="text-right">
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
            <div className={isComingSoon ? "blur-md select-none pointer-events-none" : ""}>
              <div className="pb-4 mb-2 border-b border-neutral-100">
                <h3 className="text-[15px] font-semibold text-foreground">Includes:</h3>
              </div>
              <ul className="divide-y divide-neutral-100">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-between py-3">
                    <span className="text-[15px] leading-[1.5] text-[#0F172A]">{feature}</span>
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" strokeWidth={3} />
                  </li>
                ))}
              </ul>
            </div>

            {isComingSoon && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-white/90 border border-neutral-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-[18px] font-semibold text-foreground">Coming soon</div>
                    <div className="text-[13px] text-[#475569] mt-1 max-w-[240px]">
                      {activePlan.name} plan is launching soon. Get started with Starter today.
                    </div>
                  </div>
                </div>
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
