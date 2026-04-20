import { motion } from "framer-motion";
import { CreditCard, Settings, CalendarX } from "lucide-react";

const problems = [
  {
    icon: CreditCard,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    headline: "You're overpaying for features you'll never use",
    body: "Dentally starts at £185/month. EXACT charges more. Both lock you into annual contracts built around NHS workflows your private practice doesn't need.",
    stat: "Independent practices overpay by over £1,000 a year on average",
  },
  {
    icon: Settings,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    headline: "It took 3 training days. It still breaks on a Tuesday.",
    body: "Legacy software means legacy problems. Slow load times, confusing interfaces and a support line that puts you on hold. Your receptionist shouldn't need a manual.",
    stat: "Most practice managers rate their current software UX as poor",
  },
  {
    icon: CalendarX,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    headline: "No-shows are emptying your diary every week",
    body: "Without automated reminders, the average practice loses 4–6 appointments a week to no-shows. At £100 a slot that's up to £600 walking out the door every week.",
    stat: "Automated reminders reduce no-shows by up to 40%",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-[#0B1220] py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0B1220] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Your current software is costing you
            <br />
            <span className="text-slate-400">more than you think.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Most independent practices are overpaying for software that's too
            complex, too slow and built for a different era of dentistry.
          </p>
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${problem.iconBg} flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-6 h-6 ${problem.iconColor}`} />
                </div>

                {/* Headline */}
                <h3 className="text-xl md:text-[22px] font-semibold text-white leading-tight mb-4">
                  {problem.headline}
                </h3>

                {/* Body */}
                <p className="text-[15px] text-slate-400 leading-relaxed mb-6">
                  {problem.body}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-medium text-slate-300 italic">
                    "{problem.stat}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20 md:mt-24"
        >
          <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            There's a better way.
          </p>
          <div className="mt-6 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
