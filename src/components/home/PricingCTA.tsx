import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingCTA() {
  const features = [
    "Unlimited dentists and staff",
    "Online booking and scheduling",
    "Patient records and notes",
    "Automated reminders and recalls",
    "Payments, deposits and forms",
    "SMS reminders included",
    "30-day free trial — no commitment",
  ];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl bg-[#FAFAFA] border border-[#EEEEEE] p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#E5E7EB]">
            {/* Left — pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="md:pr-10"
            >
              <p className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-[0.14em] mb-4">
                One simple plan
              </p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl sm:text-7xl font-medium tracking-tight text-foreground leading-none">
                  £49
                </span>
                <span className="text-[15px] text-[#475569] mb-2">/month</span>
              </div>
              <p className="text-[15px] leading-[1.6] text-[#475569] mb-6 max-w-[420px]">
                One practice. Everything included. No hidden fees, no add-ons, cancel any time.
              </p>
              <a
                href="https://app.dentdock.co.uk/signup"
                className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
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
              className="mt-8 md:mt-0 md:pl-10"
            >
              <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-[0.14em] mb-4">
                Everything included
              </p>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="text-[15px] leading-[1.5] text-[#0F172A]">
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
