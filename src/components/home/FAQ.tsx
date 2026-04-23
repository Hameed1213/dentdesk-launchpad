import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqItems = [
    {
      id: "item-1",
      question: "When is Dent Dock launching?",
      answer:
        "We're currently in early access with our first practices. Join the waitlist and you'll be among the first to get access, with priority support and early access pricing locked in.",
    },
    {
      id: "item-2",
      question: "Can I import my existing patients?",
      answer:
        "Yes. We support direct imports from Dentally, Software of Excellence (EXACT), Curve Dental, Carestream R4 and Practiceworks. Upload a CSV and we handle the rest automatically.",
    },
    {
      id: "item-3",
      question: "Does it work for mixed NHS and private practices?",
      answer:
        "Dent Dock is built for private and mixed practices. It doesn't include NHS UDA management or claim processing, if you need those, it may not be the right fit. If you're going private or already there, it's built for you.",
    },
    {
      id: "item-4",
      question: "How long does setup actually take?",
      answer:
        "Most practices are fully configured and live in under 10 minutes. Your opening hours, services and SMS automations all have smart defaults pre-filled, you just confirm and go.",
    },
    {
      id: "item-5",
      question: "What happens after I join the waitlist?",
      answer:
        "You'll get an email from us personally, not an automated sequence. We'll walk you through early access, answer any questions and get you set up when you're ready.",
    },
    {
      id: "item-6",
      question: "Is there a contract or minimum term?",
      answer:
        "No contracts. No setup fees. Cancel any time. We believe you should stay because the software is good, not because you're locked in.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
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
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-[#EEEEEE]"
              >
                <AccordionTrigger className="text-left text-[16px] sm:text-[17px] font-medium text-[#0F172A] py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
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
            href="mailto:hello@dentdock.co.uk"
            className="text-[#2563EB] font-medium hover:underline"
          >
            Get in touch with us directly
          </a>
        </motion.p>
      </div>
    </section>
  );
}
