import type { OtherArea } from "@/components/site/templates";

/** One entry per Platform page: used for the /features grid and each page's "rest of your practice" cards. */
export const featurePages = {
  calendar: {
    title: "Calendar",
    body: "Your whole team's day in one diary, with who's arrived and who's late.",
    to: "/features/calendar",
    image: "/images/pages/calendar-phone.webp",
    position: "object-[60%_40%]",
    alt: "Woman smiling on a phone call at her desk",
  },
  booking: {
    title: "Online booking and portal",
    body: "Patients book online, see your prices and manage their own appointments.",
    to: "/features/online-booking",
    image: "/images/pages/patient-phone.webp",
    position: "object-[50%_30%]",
    alt: "Woman laughing as she looks at her phone",
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
    image: "/images/pages/tablet-writing.webp",
    position: "object-[40%_30%]",
    alt: "Woman writing on a tablet",
  },
  payments: {
    title: "Payments and deposits",
    body: "Payment links, deposits and fair fees through your own Stripe account.",
    to: "/features/payments",
    image: "/images/pages/counter-tablet.webp",
    position: "object-[65%_40%]",
    alt: "Woman at a front counter with a payment tablet",
  },
  reports: {
    title: "Reports",
    body: "Money taken, no-show rates and where your bookings come from.",
    to: "/features/reports",
    image: "/images/pages/reports-laptop.webp",
    position: "object-[50%_82%]",
    alt: "Woman working on a laptop",
  },
  security: {
    title: "Security and data",
    body: "Stored in London, encrypted, with two-step login and per-screen access.",
    to: "/features/security",
    image: "/images/pages/security-dev.webp",
    position: "object-[70%_40%]",
    alt: "Developer working at screens of code",
  },
  switching: {
    title: "Switching to DentDock",
    body: "Bring your patients across with a CSV and go live in a day.",
    to: "/features/switching",
    image: "/images/pages/switching-relaxed.webp",
    position: "object-[50%_40%]",
    alt: "Woman smiling at her laptop",
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
