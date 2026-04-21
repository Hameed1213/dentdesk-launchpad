import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingCTA() {
  const features = [
    "1 practice location",
    "Unlimited dentists and staff",
    "Online booking page",
    "Calendar and scheduling",
    "Patient records and notes",
    "Automated reminders and recalls",
    "Payments and deposits",
    "Forms and questionnaires",
    "Analytics and reports",
    "SMS reminders included",
    "30-day free trial — no commitment",
  ];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl bg-[#FAFAFA] border border-[#EEEEEE] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 md:gap-10 items-center">
            {/* Left — pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end gap-2 mb-3">
                <span className="text-5xl sm:text-6xl font-medium tracking-tight text-foreground leading-none">
                  £49
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#475569] mb-1.5">
                  /month
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-[1.55] text-[#475569] mb-5 max-w-[420px]">
                One practice. Everything included. No hidden fees, no add-ons, cancel any time.
              </p>
              <a
                href="https://app.dentdock.co.uk/signup"
                className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
              >
                Start free trial <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[12px] text-[#94A3B8] mt-3">
                30-day free trial
              </p>
            </motion.div>

            {/* Right — checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="text-[13px] sm:text-[14px] leading-[1.45] text-[#0F172A]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <p className="text-center text-[13px] text-[#94A3B8] mt-6">
          Growth and Pro plans coming soon for multi-site practices.
        </p>
      </div>
    </section>
  );
}
