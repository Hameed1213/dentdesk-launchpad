import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const items = [
    "Smart defaults — UK hours and services pre-filled",
    "Live booking page ready the moment you finish",
    "22 SMS automations fire from your very first booking",
    "Import patients from Dentally, EXACT and more",
    "Save your progress and pick up where you left off",
    "No payment required to complete setup",
  ];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — big statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[#2563EB] mb-4">
              Getting started
            </div>
            <h2 className="text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] font-semibold tracking-tight text-[#0F172A] mb-6">
              You're live in under 10 minutes.
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#475569] mb-8 max-w-[480px]">
              Sign up, add your practice details, pick your services and your booking page is ready. No implementation fees. No onboarding calls. No waiting.
            </p>
            <a
              href="https://app.dentdock.co.uk/signup"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ul className="space-y-4">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#DCFCE7] flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3} />
                  </span>
                  <span className="text-[16px] leading-[1.5] text-[#0F172A]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
