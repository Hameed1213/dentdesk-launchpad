/*
 * The training missions (docs/TRAINING-GAME-PLAN.md §3). Each one copies a real DentDock screen;
 * `source` says which hub files it was checked against, and `checked` when, so it can be updated
 * when that screen changes. Patients and practices here are made up.
 */

export type RoleId = "reception" | "manager";

export type Mission = {
  id: string;
  title: string;
  /** The situation, as the coach tells it. */
  story: string;
  /** What they will be able to do afterwards. */
  learn: string;
  minutes: number;
  /** Hub files the mission copies (desk-care-hub/src/...). */
  source: string[];
  checked: string;
};

export type Role = {
  id: RoleId;
  name: string;
  who: string;
  summary: string;
  missions: Mission[];
};

const CHECKED = "25 Nov 2026 (hub #691)";

export const ROLES: Role[] = [
  {
    id: "reception",
    name: "Receptionist",
    who: "Reception and the practice team at the desk",
    summary: "The diary, phone calls, arrivals, payments, cancellations and the waitlist.",
    missions: [
      {
        id: "find-patient",
        title: "Find a patient",
        story:
          "Mr Okafor is at the desk asking about his next visit. Find him and check his record before you answer.",
        learn: "Search for any patient and spot their alerts and medical information.",
        minutes: 3,
        source: ["components/Header.tsx", "pages/PatientProfile.tsx"],
        checked: CHECKED,
      },
      {
        id: "book-phone",
        title: "Book a phoned-in appointment",
        story: "Mrs Patel rings: she'd like a check-up with Dr Shah next Thursday morning.",
        learn: "Book from the diary: slot, patient, treatment, dentist and time.",
        minutes: 5,
        source: ["pages/CalendarPage.tsx", "components/dashboard/NewAppointmentDrawer.tsx"],
        checked: CHECKED,
      },
      {
        id: "move-appointment",
        title: "Move an appointment",
        story:
          "Tom Reid can't make Tuesday's hygiene visit. He can do Wednesday afternoon instead.",
        learn: "Reschedule to a free time and let the patient know.",
        minutes: 4,
        source: ["components/dashboard/RescheduleModal.tsx"],
        checked: CHECKED,
      },
      {
        id: "arrive-finish",
        title: "Arrivals and finishing a visit",
        story: "Amira Hussain has just walked in for her 10:30 scale and polish.",
        learn: "Mark a patient arrived, then finish the visit: take payment and set the recall.",
        minutes: 6,
        source: [
          "components/dashboard/AppointmentRow.tsx",
          "components/dashboard/FinishVisitSheet.tsx",
        ],
        checked: CHECKED,
      },
      {
        id: "late-cancel",
        title: "A late cancellation",
        story: "A patient rings at 4pm to cancel tomorrow morning's appointment.",
        learn: "Cancel with the right reason and decide what happens to the late cancellation fee.",
        minutes: 5,
        source: [
          "components/dashboard/CancelModal.tsx",
          "components/payments/FeeDecisionModal.tsx",
        ],
        checked: CHECKED,
      },
      {
        id: "fill-slot",
        title: "Fill an empty slot",
        story: "A 2pm slot has just come free. Someone on the waitlist wanted exactly that.",
        learn: "Offer a free slot to the waitlist in a couple of clicks.",
        minutes: 4,
        source: ["components/dashboard/FillSlotModal.tsx", "pages/Waitlist.tsx"],
        checked: CHECKED,
      },
      {
        id: "no-show",
        title: "No-show, or in the waiting room?",
        story: "It's 20 minutes past James Carter's appointment and he isn't marked as arrived.",
        learn: "Check before marking a no-show, and know what a no-show sends.",
        minutes: 4,
        source: ["components/dashboard/NoShowModal.tsx", "lib/noShowRules.ts"],
        checked: CHECKED,
      },
      {
        id: "new-patient",
        title: "A new patient on the phone",
        story: "Sophie Turner wants to register. She thinks she might have been here years ago.",
        learn: "Add a patient without making a duplicate, then send their medical history form.",
        minutes: 5,
        source: ["components/patients/AddPatientModal.tsx", "pages/PatientProfile.tsx"],
        checked: CHECKED,
      },
    ],
  },
  {
    id: "manager",
    name: "Practice manager",
    who: "Owners and practice managers",
    summary: "The team, services and prices, reminders, recalls, refunds and reports.",
    missions: [
      {
        id: "add-team",
        title: "Add a new receptionist",
        story: "Chloe starts on Monday on reception. She needs a login with the right access.",
        learn: "Invite a team member and choose exactly what they can see.",
        minutes: 5,
        source: ["components/settings/SettingsTeamTab.tsx", "contexts/PermissionsContext.tsx"],
        checked: CHECKED,
      },
      {
        id: "leave",
        title: "Book a dentist's holiday",
        story: "Dr Shah is away for a week in February. Nobody should be able to book her.",
        learn: "Block off time so the diary and online booking both respect it.",
        minutes: 3,
        source: ["components/settings/SettingsTeamTab.tsx"],
        checked: CHECKED,
      },
      {
        id: "add-service",
        title: "Add a new treatment",
        story:
          "The practice now offers teeth whitening consultations: 30 minutes, £50, with Dr Shah.",
        learn: "Add a service with its price, length and dentist, and make it bookable online.",
        minutes: 5,
        source: ["pages/Services.tsx", "components/services/AddServiceDrawer.tsx"],
        checked: CHECKED,
      },
      {
        id: "cancel-rules",
        title: "Set the late cancellation rules",
        story:
          "The practice wants 24 hours' notice, a £20 late cancellation fee and a £30 no-show fee.",
        learn: "Set the free cancellation window and the fees in Booking settings.",
        minutes: 3,
        source: ["pages/Settings.tsx"],
        checked: CHECKED,
      },
      {
        id: "reminders",
        title: "Check the reminders",
        story: "The owner wants patients asked for a Google review after their visit.",
        learn: "See which messages go automatically, and switch one on properly.",
        minutes: 4,
        source: ["pages/Automations.tsx", "components/automations/automationsData.ts"],
        checked: CHECKED,
      },
      {
        id: "recalls",
        title: "Send the overdue recalls",
        story: "Twelve patients are overdue a check-up and nobody has booked them.",
        learn: "Find who is due and send their reminders in one go.",
        minutes: 4,
        source: ["pages/Recalls.tsx"],
        checked: CHECKED,
      },
      {
        id: "refund",
        title: "Refund part of a payment",
        story: "A patient paid £120 but £40 of the treatment wasn't needed.",
        learn: "Refund the right amount and decide what happens to the visit's price.",
        minutes: 5,
        source: ["components/payments/RefundModal.tsx", "lib/refunds.ts"],
        checked: CHECKED,
      },
      {
        id: "accountant",
        title: "Takings for the accountant",
        story: "Your accountant wants last month's takings split by clinician.",
        learn: "Download the right report for the right period.",
        minutes: 3,
        source: ["components/payments/AccountantExportModal.tsx"],
        checked: CHECKED,
      },
      {
        id: "two-step",
        title: "Turn on two-step login",
        story: "Owners and practice managers must use two-step login. Set yours up.",
        learn: "Set up two-step login and keep your recovery codes safe.",
        minutes: 3,
        source: ["components/settings/TwoStepLoginSection.tsx"],
        checked: CHECKED,
      },
    ],
  },
];

export const roleById = (id: string): Role | undefined => ROLES.find((r) => r.id === id);
export const totalMinutes = (r: Role) => r.missions.reduce((n, m) => n + m.minutes, 0);
