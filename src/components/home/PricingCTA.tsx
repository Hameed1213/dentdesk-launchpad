import { ArrowRight, Check, Circle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  note: string;
  selected?: boolean;
  disabled?: boolean;
};

export default function PricingCTA() {
  const plans: Plan[] = [
    { name: "Practice", price: "£49", priceSuffix: "/mo", note: "", selected: true },
    { name: "Multi-site", price: "Coming soon", note: "", disabled: true },
    { name: "Enterprise", price: "Coming soon", note: "", disabled: true },
  ];

  const features = [
    "Unlimited dentists and staff",
    "Online booking and scheduling",
    "Patient records and notes",
    "Automated reminders and recalls",
    "Payments, deposits and forms",
    "SMS reminders included",
    "Custom forms",
    "30-day free trial",
  ];

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Simple pricing for <span className="text-[#2563EB]">every practice.</span>
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
              const isSelected = plan.selected;
              return (
                <div
                  key={plan.name}
                  aria-disabled={plan.disabled}
                  className={[
                    "rounded-2xl border p-5 flex items-center justify-between transition-all",
                    isSelected
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20"
                      : "bg-white border-neutral-200 text-foreground",
                    plan.disabled ? "opacity-80" : "",
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
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-neutral-100 text-[#475569]",
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
                        plan.priceSuffix ? "text-2xl font-medium" : "text-sm font-medium",
                        isSelected ? "text-white" : plan.disabled ? "text-[#94A3B8]" : "text-foreground",
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
                </div>
              );
            })}
          </motion.div>

          {/* Right — Includes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-neutral-200 bg-white p-8"
          >
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
          </motion.div>
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <a
            href="https://app.dentdock.co.uk/signup"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
          >
            Start free trial <ArrowRight className="w-4 h-4" />
          </a>
          <div className="inline-flex items-center gap-2 text-[13px] text-[#475569]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            Billed monthly · cancel anytime
          </div>
        </motion.div>
      </div>
    </section>
  );
}
