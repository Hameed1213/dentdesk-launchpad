import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] px-6 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          {/* Left — copy */}
          <div className="md:max-w-[640px]">
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-tight text-[#0F172A] leading-tight">
              Get your practice live in{" "}
              <span className="text-[#2563EB]">a single day</span>
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[#64748b] mt-1.5">
              Sign up, add your details, and your booking page is ready — no
              implementation fees, no onboarding calls.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
            <a
              href="https://app.dentdock.co.uk/signup"
              className="inline-flex items-center gap-2 border border-[#2563EB] text-[#2563EB] text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#2563EB] hover:text-white transition-all"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[12px] text-[#94a3b8] md:pr-1">
              no card required
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
