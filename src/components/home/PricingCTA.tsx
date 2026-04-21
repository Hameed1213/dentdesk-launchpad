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
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-[#FAFAFA] border border-[#EEEEEE] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left — pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end gap-2 mb-4 md:mb-5">
                <span className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-none">
                  £49
                </span>
                <span className="text-[15px] sm:text-[17px] text-[#475569] mb-2">
                  /month
                </span>
              </div>
              <p className="text-[15px] sm:text-[17px] leading-[1.6] text-[#475569] mb-5 md:mb-6 max-w-[460px]">
                One practice. Everything included. No hidden fees, no add-ons, cancel any time.
              </p>
              <a
                href="https://app.dentdock.co.uk/signup"
                className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
              >
                Start free trial <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[13px] text-[#94A3B8] mt-4">
                30-day free trial · No credit card required
              </p>
            </motion.div>

            {/* Right — checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ul className="space-y-3 md:space-y-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="text-[14px] sm:text-[16px] leading-[1.5] text-[#0F172A]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <p className="text-center text-[13px] text-[#94A3B8] mt-6">
          All prices exclude VAT. Growth and Pro plans coming soon for multi-site practices.
        </p>
      </div>
    </section>
  );
}
