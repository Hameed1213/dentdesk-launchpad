import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { homeFaq } from "@/lib/homeFaq";

export default function FAQ() {
  const faqItems = homeFaq;

  return (
    <section className="bg-white pt-16 md:pt-24 pb-4 md:pb-6">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1] mb-4">
            Frequently asked questions
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#475569]">
            Everything you need to know before joining the waitlist.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="multiple" className="w-full faq-accordion">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-[#EEEEEE]"
              >
                <AccordionTrigger className="text-left text-[16px] sm:text-[17px] font-medium text-[#0F172A] py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent forceMount className="pb-5">
                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#475569]">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[15px] text-[#475569] mt-12"
        >
          Can't find what you're looking for?{" "}
          <a
            href="https://wa.me/447404488089"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] font-medium hover:underline"
          >
            Get in touch with us directly
          </a>
        </motion.p>
      </div>
    </section>
  );
}
