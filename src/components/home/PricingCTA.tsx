import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PricingCTA() {
  const features = [
    '1 practice location',
    'Unlimited dentists and staff',
    'Online booking page',
    'Calendar and scheduling',
    'Patient records and notes',
    'Automated reminders and recalls',
    'Payments and deposits',
    'Forms and questionnaires',
    'Analytics and reports',
    'SMS reminders included',
    '30-day free trial — no commitment',
  ]

  return (
    <section className="bg-[#f8fafc] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — pricing */}
            <div className="px-10 py-12 border-b md:border-b-0 md:border-r border-neutral-100">
              <div className="inline-flex items-center gap-2 bg-[#eff6ff] border border-[#bfdbfe] text-[#2563EB] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide mb-6">
                Simple pricing
              </div>
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span
                    className="text-[#0F172A] leading-none tracking-[-0.04em]"
                    style={{ fontSize: '72px', fontWeight: 800 }}
                  >
                    £49
                  </span>
                  <span className="text-neutral-400 text-lg mb-3">/month</span>
                </div>
                <p className="text-neutral-500 text-[15px] leading-relaxed">
                  One practice. Everything included. No hidden fees. No add-ons. Cancel any time.
                </p>
              </div>
              <a
                href="https://app.dentdock.co.uk/signup"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#2563EB] text-white text-[15px] font-semibold px-6 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/20 mb-4"
              >
                Start free trial <ArrowRight size={16} />
              </a>
              <p className="text-center text-xs text-neutral-400">
                30-day free trial · No credit card required · Cancel any time
              </p>
            </div>

            {/* Right — features */}
            <div className="px-10 py-12">
              <p className="text-[13px] font-semibold text-neutral-400 uppercase tracking-wider mb-6">
                Everything included
              </p>
              <ul className="grid grid-cols-1 gap-3">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.05 }}
                    className="flex items-center gap-3 text-[14px] text-neutral-700 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#dcfce7] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#16a34a]" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <p className="text-center text-sm text-neutral-400 mt-6">
          All prices exclude VAT. Growth and Pro plans coming soon for multi-site practices.
        </p>
      </div>
    </section>
  )
}
