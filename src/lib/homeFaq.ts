/** Homepage FAQ. One list, used by the visible FAQ and the page's FAQPage data, so they never drift apart. */
export type FaqItem = { id: string; question: string; answer: string };

export const homeFaq: FaqItem[] = [
  {
    id: "cost",
    question: "How much does DentDock cost?",
    answer:
      "£49 a month per practice, with unlimited dentists and staff. 200 texts a month are included, then 8p per text. No setup fees and no contract.",
  },
  {
    id: "import",
    question: "Can I import my existing patients?",
    answer:
      "Yes. Export your patient list as a CSV from your current system and upload it. DentDock matches the columns for you, and we're on WhatsApp if you'd like a hand.",
  },
  {
    id: "support",
    question: "What support do I get?",
    answer:
      "Message us on WhatsApp and a real person replies the same day. No chatbot and no ticket queue. The person who built DentDock is the person who fixes your issue.",
  },
  {
    id: "data",
    question: "Where is my patients' data stored?",
    answer:
      "In London, UK. It's encrypted in transit and at rest, and our Data Processing Agreement sets out how we handle it for your practice.",
  },
  {
    id: "export",
    question: "Can I take my data with me if I leave?",
    answer:
      "Yes. You can export your practice's data from your settings at any time. Your data is yours.",
  },
  {
    id: "nhs",
    question: "Does it work for mixed NHS and private practices?",
    answer:
      "DentDock is built for private and mixed practices. It doesn't include NHS UDA management or claim processing, so if you need those, it may not be the right fit. If you're going private or already there, it's built for you.",
  },
  {
    id: "setup",
    question: "How long does setup actually take?",
    answer:
      "Most practices are set up and live within the day. Your opening hours, treatments and automations come with sensible defaults, so you mostly confirm and go.",
  },
  {
    id: "contract",
    question: "Is there a contract or minimum term?",
    answer:
      "No contracts. No setup fees. Cancel any time. We believe you should stay because the software is good, not because you're locked in.",
  },
  {
    id: "after-waitlist",
    question: "What happens after I join the waitlist?",
    answer:
      "You'll get an email from us personally, not an automated sequence. We'll walk you through early access, answer any questions and get you set up when you're ready.",
  },
  {
    id: "launch",
    question: "When is DentDock launching?",
    answer:
      "We're currently in early access with our first practices. Join the waitlist and you'll be among the first to get access, with priority support and early access pricing locked in.",
  },
];
