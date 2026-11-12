import type { OtherArea } from "@/components/site/templates";

/** One entry per Platform page: used for the /features grid and each page's "rest of your practice" cards. */
export const featurePages = {
  calendar: {
    title: "Calendar",
    body: "Your whole team's day in one diary, with who's arrived and who's late.",
    to: "/features/calendar",
    image: "/images/pages/hero-calendar.webp",
    position: "object-[45%_35%]",
    alt: "Dentist matching a shade guide for a smiling patient",
  },
  booking: {
    title: "Online booking and portal",
    body: "Patients book online, see your prices and manage their own appointments.",
    to: "/features/online-booking",
    image: "/images/pages/hero-booking.webp",
    position: "object-[55%_35%]",
    alt: "Woman smiling as she uses her phone at home",
  },
  reminders: {
    title: "Reminders and recalls",
    body: "Reminders and recalls that send themselves, and a waitlist for gaps.",
    to: "/features/reminders-and-recalls",
    image: "/images/pages/phone-reminder.webp",
    alt: "Woman smiling as she reads a message on her phone",
  },
  forms: {
    title: "Forms and medical history",
    body: "Health forms filled in and signed before patients arrive.",
    to: "/features/forms",
    image: "/images/pages/hero-forms.webp",
    position: "object-[50%_45%]",
    alt: "Person filling in a form on their phone",
  },
  payments: {
    title: "Payments and deposits",
    body: "Payment links, deposits and fair fees through your own Stripe account.",
    to: "/features/payments",
    image: "/images/pages/hero-payments.webp",
    position: "object-[50%_35%]",
    alt: "Receptionist at a dental front desk while a patient pays by phone",
  },
  reports: {
    title: "Reports",
    body: "Money taken, no-show rates and where your bookings come from.",
    to: "/features/reports",
    image: "/images/pages/hero-reports.webp",
    position: "object-[50%_35%]",
    alt: "Dentist showing a patient a scan on screen",
  },
  security: {
    title: "Security and data",
    body: "Stored in London, encrypted, with two-step login and per-screen access.",
    to: "/features/security",
    image: "/images/pages/hero-security.webp",
    position: "object-[50%_28%]",
    alt: "Smiling dentist in his surgery",
  },
  switching: {
    title: "Switching to DentDock",
    body: "Plan the move, bring your patients across with a CSV and go live when you're ready.",
    to: "/features/switching",
    image: "/images/pages/hero-switching.webp",
    position: "object-[45%_25%]",
    alt: "Smiling dentist sitting by the dental chair",
  },
} satisfies Record<string, OtherArea>;

export type FeatureKey = keyof typeof featurePages;

export const allFeaturePages: OtherArea[] = Object.values(featurePages);

/** The "How DentDock supports the rest of your practice" block for a page. */
export function othersFor(keys: FeatureKey[]) {
  return {
    title: "How DentDock supports",
    highlight: "the rest of your practice",
    items: keys.map((k) => featurePages[k]),
  };
}
