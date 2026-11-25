/*
 * Reception task 2: book a phoned-in appointment (docs/TRAINING-GAME-PLAN.md §3).
 *
 * The pretend practice, its diary and patients are made up. The screens copy the practice app
 * (desk-care-hub @ #691): CalendarPage / CalendarDayView (day view, 64px an hour, 8am-7pm),
 * SlotChoiceMenu ("Book appointment" / "Block time"), NewAppointmentDrawer (sections, wording,
 * 15-minute times written "9:30am", "Outstanding balance" notice, "Appointment booked for …").
 *
 * This file holds the data and the checks only, so they can be tested without a browser.
 */

export type Clinician = {
  id: string;
  /** As the app shows it in the diary and the drawer ("Dr. Shah"). */
  name: string;
  initials: string;
  fullName: string;
  bg: string;
  text: string;
  color: string;
  /** Working hours in minutes from midnight, by weekday (0 = Sunday). */
  hours: Partial<Record<number, [number, number]>>;
};

export type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  lastVisit: string | null;
  owesPence: number;
};

export type Service = {
  name: string;
  minutes: number;
  pricePence: number;
  /** "Which dentists offer this service?": the drawer lists only these. */
  clinicianIds: string[];
};

export type Booking = {
  id: string;
  clinicianId: string;
  /** yyyy-mm-dd */
  date: string;
  start: number;
  minutes: number;
  patient: string;
  treatment: string;
};

const H = (h: number, m = 0) => h * 60 + m;

export const PRACTICE = "Oak Dental";
/** The day the pretend diary opens on, and the day Mrs Patel asks for. */
export const TODAY = "2026-12-08";
export const TARGET_DAY = "2026-12-10";
/** Practice hours: Monday to Friday 9am to 6pm. */
export const PRACTICE_HOURS: [number, number] = [H(9), H(18)];

export const CLINICIANS: Clinician[] = [
  {
    id: "shah",
    name: "Dr. Shah",
    initials: "NS",
    fullName: "Dr. Nadia Shah",
    bg: "#dbeafe",
    text: "#1d4ed8",
    color: "#3b82f6",
    hours: {
      1: [H(9), H(17, 30)],
      2: [H(9), H(17, 30)],
      3: [H(9), H(17, 30)],
      4: [H(9), H(17, 30)],
      5: [H(9), H(17, 30)],
    },
  },
  {
    id: "ellis",
    name: "Dr. Ellis",
    initials: "TE",
    fullName: "Dr. Tom Ellis",
    bg: "#ede9fe",
    text: "#6d28d9",
    color: "#8b5cf6",
    hours: { 2: [H(9), H(18)], 4: [H(9), H(18)], 5: [H(9), H(18)] },
  },
  {
    id: "lewis",
    name: "R. Lewis",
    initials: "RL",
    fullName: "Rachel Lewis",
    bg: "#dcfce7",
    text: "#15803d",
    color: "#10b981",
    hours: { 2: [H(9), H(16)], 3: [H(9), H(16)], 4: [H(9), H(16)] },
  },
];

export const PATIENTS: Patient[] = [
  {
    id: "meena",
    name: "Meena Patel",
    phone: "07700 900142",
    email: "meena.patel@example.com",
    dob: "14/03/1968",
    lastVisit: "12 Jun 2026",
    owesPence: 4500,
  },
  {
    id: "priya",
    name: "Priya Patel",
    phone: "07700 900377",
    email: "priya.p@example.com",
    dob: "02/09/1994",
    lastVisit: "3 Nov 2026",
    owesPence: 0,
  },
  {
    id: "anil",
    name: "Anil Patel",
    phone: "07700 900518",
    email: "anil.patel@example.com",
    dob: "21/07/1965",
    lastVisit: "18 Sep 2026",
    owesPence: 0,
  },
  {
    id: "carter",
    name: "James Carter",
    phone: "07700 900233",
    email: "j.carter@example.com",
    dob: "30/01/1981",
    lastVisit: "2 Oct 2026",
    owesPence: 0,
  },
  {
    id: "brooks",
    name: "Hannah Brooks",
    phone: "07700 900604",
    email: "hannah.b@example.com",
    dob: "11/05/1990",
    lastVisit: "19 Nov 2026",
    owesPence: 0,
  },
  // "Your turn": Tom Reid, and his father Thomas Reid with almost the same name.
  {
    id: "tomreid",
    name: "Tom Reid",
    phone: "07700 900611",
    email: "tom.reid@example.com",
    dob: "04/04/1979",
    lastVisit: "5 Aug 2026",
    owesPence: 0,
  },
  {
    id: "thomasreid",
    name: "Thomas Reid",
    phone: "07700 900672",
    email: "t.reid51@example.com",
    dob: "22/10/1951",
    lastVisit: "14 Oct 2026",
    owesPence: 0,
  },
];

export const SERVICES: Service[] = [
  { name: "Check-up", minutes: 30, pricePence: 5500, clinicianIds: ["shah", "ellis"] },
  { name: "New patient exam", minutes: 45, pricePence: 8500, clinicianIds: ["shah", "ellis"] },
  { name: "Scale & polish", minutes: 30, pricePence: 6500, clinicianIds: ["lewis"] },
  { name: "Emergency appointment", minutes: 30, pricePence: 7500, clinicianIds: ["shah", "ellis"] },
  { name: "Filling", minutes: 45, pricePence: 12000, clinicianIds: ["shah", "ellis"] },
];

/** "Patient form (optional)": the drawer's first choice is always "No form". */
export const FORMS = [
  { id: "", name: "No form", questions: 0 },
  { id: "medical", name: "Medical history", questions: 24 },
];

export const BOOKINGS: Booking[] = [
  // Tuesday 8 December (the day the diary opens on)
  {
    id: "t1",
    clinicianId: "shah",
    date: TODAY,
    start: H(9),
    minutes: 30,
    patient: "Oliver Grant",
    treatment: "Check-up",
  },
  {
    id: "t2",
    clinicianId: "shah",
    date: TODAY,
    start: H(10),
    minutes: 45,
    patient: "Hannah Brooks",
    treatment: "Filling",
  },
  {
    id: "t3",
    clinicianId: "shah",
    date: TODAY,
    start: H(14),
    minutes: 60,
    patient: "Grace Hill",
    treatment: "Crown preparation",
  },
  {
    id: "t4",
    clinicianId: "ellis",
    date: TODAY,
    start: H(9, 30),
    minutes: 30,
    patient: "Sam Wood",
    treatment: "Check-up",
  },
  {
    id: "t5",
    clinicianId: "ellis",
    date: TODAY,
    start: H(11),
    minutes: 45,
    patient: "Ruth Ahmed",
    treatment: "Filling",
  },
  {
    id: "t6",
    clinicianId: "lewis",
    date: TODAY,
    start: H(9),
    minutes: 30,
    patient: "Ben Clarke",
    treatment: "Scale & polish",
  },
  {
    id: "t7",
    clinicianId: "lewis",
    date: TODAY,
    start: H(10, 30),
    minutes: 30,
    patient: "Lily Evans",
    treatment: "Scale & polish",
  },
  // Wednesday 9 December. Rachel Lewis after 2pm: 2:00 and 2:30 taken, 3:00 and 3:30 free.
  {
    id: "w3",
    clinicianId: "lewis",
    date: "2026-12-09",
    start: H(14),
    minutes: 30,
    patient: "Ivy Chen",
    treatment: "Scale & polish",
  },
  {
    id: "w4",
    clinicianId: "lewis",
    date: "2026-12-09",
    start: H(14, 30),
    minutes: 30,
    patient: "Ruby Hall",
    treatment: "Scale & polish",
  },
  {
    id: "w1",
    clinicianId: "shah",
    date: "2026-12-09",
    start: H(9),
    minutes: 60,
    patient: "Mark Owen",
    treatment: "Root canal",
  },
  {
    id: "w2",
    clinicianId: "lewis",
    date: "2026-12-09",
    start: H(9, 30),
    minutes: 30,
    patient: "Ella Ross",
    treatment: "Scale & polish",
  },
  // Thursday 10 December: Dr Shah's only free morning time before 11am is 9:30am
  {
    id: "r1",
    clinicianId: "shah",
    date: TARGET_DAY,
    start: H(9),
    minutes: 30,
    patient: "James Carter",
    treatment: "Check-up",
  },
  {
    id: "r2",
    clinicianId: "shah",
    date: TARGET_DAY,
    start: H(10),
    minutes: 60,
    patient: "Hannah Brooks",
    treatment: "Crown preparation",
  },
  {
    id: "r3",
    clinicianId: "shah",
    date: TARGET_DAY,
    start: H(11, 30),
    minutes: 30,
    patient: "Ian Moore",
    treatment: "Check-up",
  },
  {
    id: "r4",
    clinicianId: "shah",
    date: TARGET_DAY,
    start: H(14),
    minutes: 45,
    patient: "Zoe King",
    treatment: "Filling",
  },
  {
    id: "r5",
    clinicianId: "ellis",
    date: TARGET_DAY,
    start: H(9),
    minutes: 30,
    patient: "Paul Reed",
    treatment: "Check-up",
  },
  {
    id: "r6",
    clinicianId: "ellis",
    date: TARGET_DAY,
    start: H(10),
    minutes: 30,
    patient: "Nina Hart",
    treatment: "Check-up",
  },
  {
    id: "r7",
    clinicianId: "lewis",
    date: TARGET_DAY,
    start: H(9),
    minutes: 30,
    patient: "Adam Price",
    treatment: "Scale & polish",
  },
  {
    id: "r8",
    clinicianId: "lewis",
    date: TARGET_DAY,
    start: H(11),
    minutes: 30,
    patient: "Mia Fox",
    treatment: "Scale & polish",
  },
];

/* ---------------- Dates and times, the way the app writes them ---------------- */

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function weekday(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

/** "Thursday 10 December 2026" (CalendarPage day label). */
export function dayLabel(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function addDays(date: string, n: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** "9:30am" (drawerTimes.minutesToLabel). */
export function timeLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${dh}:${String(m).padStart(2, "0")}${suffix}`;
}

export const money = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export function clinicianHours(c: Clinician, date: string): [number, number] | null {
  return c.hours[weekday(date)] ?? null;
}

/** 15-minute times inside the clinician's day (or the practice day for "Any available"). */
export function timeOptions(clinicianId: string | null, date: string, serviceName = ""): number[] {
  const wd = weekday(date);
  if (wd === 0 || wd === 6) return [];
  // A chosen dentist: their hours. "Any available": the widest window of those who work that day
  // (NewAppointmentDrawer timeSlots / drawerTimes.listWindow).
  const svc = SERVICES.find((x) => x.name === serviceName);
  const pool = clinicianId
    ? CLINICIANS.filter((c) => c.id === clinicianId)
    : CLINICIANS.filter((c) => !svc || svc.clinicianIds.includes(c.id));
  const windows = pool
    .map((c) => clinicianHours(c, date))
    .filter((w): w is [number, number] => !!w);
  if (windows.length === 0) return [];
  const window: [number, number] = [
    Math.min(...windows.map((w) => w[0])),
    Math.max(...windows.map((w) => w[1])),
  ];
  const out: number[] = [];
  for (let t = window[0]; t < window[1]; t += 15) out.push(t);
  return out;
}

export function overlaps(
  bookings: Booking[],
  clinicianId: string,
  date: string,
  start: number,
  minutes: number,
): boolean {
  return bookings.some(
    (b) =>
      b.clinicianId === clinicianId &&
      b.date === date &&
      start < b.start + b.minutes &&
      b.start < start + minutes,
  );
}

/* ---------------- The two calls ---------------- */

export type Attempt = {
  patientId: string | null;
  service: string;
  /** "" = Any available */
  clinicianId: string;
  date: string;
  start: number | null;
};

export type Verdict =
  | { ok: true }
  | { ok: false; kind: "form"; field: "patient" | "service" | "time" }
  | { ok: false; kind: "mistake"; key: string; message: string };

export type Scenario = {
  id: "patel" | "reid";
  /** What the caller says. */
  call: string;
  patientId: string;
  service: string;
  clinicianId: string;
  date: string;
  /** Allowed start times. */
  timeOk: (start: number) => boolean;
  says: {
    patient: string;
    service: string;
    dentist: string;
    anyDentist: string;
    date: string;
    time: string;
  };
  hints: string[];
  recap: string[];
};

/** The walkthrough: Mrs Patel. */
export const PATEL: Scenario = {
  id: "patel",
  call: "Hello, it's Meena Patel. Could I book a check-up with Dr Shah next Thursday, please? Any time before 11 in the morning is fine.",
  patientId: "meena",
  service: "Check-up",
  clinicianId: "shah",
  date: TARGET_DAY,
  timeOk: (t) => t < H(11),
  says: {
    patient:
      "The caller was Meena Patel. When patients share a surname, check the date of birth or phone number before you choose.",
    service: "Mrs Patel asked for a check-up. Choose Check-up as the service.",
    dentist: "She asked for Dr Shah. Choose Dr. Shah as the dentist.",
    anyDentist:
      'She asked for Dr Shah. "Any available" lets DentDock pick whoever is free, so choose Dr. Shah instead.',
    date: "She asked for next Thursday, which is Thursday 10 December.",
    time: "She can only come before 11am. Look for a morning time.",
  },
  hints: [],
  recap: [
    "The appointment shows in Dr Shah's diary as Confirmed.",
    "Mrs Patel is sent a booking confirmation, by text or email as she prefers, if Booking confirmation is switched on in Automations.",
    "She is sent her appointment reminders, if they are switched on in Automations.",
    "Any note you typed is saved with the booking and on her profile, for staff only.",
  ],
};

/** "Your turn": a different call, Tom Reid. */
export const REID: Scenario = {
  id: "reid",
  call: "Hi, it's Tom Reid, date of birth 4 April 1979. Can I book a scale and polish with Rachel on Wednesday? Any time after 2 in the afternoon.",
  patientId: "tomreid",
  service: "Scale & polish",
  clinicianId: "lewis",
  date: "2026-12-09",
  timeOk: (t) => t >= H(14),
  says: {
    patient:
      "The caller gave his date of birth, 4 April 1979: that's Tom Reid. When two names are this close, check the date of birth before you choose.",
    service: "He asked for a scale and polish. Choose Scale & polish as the service.",
    dentist: "He asked for Rachel. Choose R. Lewis.",
    anyDentist: 'He asked for Rachel. Choose R. Lewis rather than "Any available".',
    date: "He asked for Wednesday, which is Wednesday 9 December.",
    time: "He can only come after 2pm. Look for an afternoon time.",
  },
  hints: [
    "Click WED 9 at the top of the week to see Wednesday. R. Lewis is free at 3:00pm and 3:30pm.",
    "Click New appointment, search for Reid, and choose Tom Reid: he's the one born in 1979.",
    "Choose Scale & polish (R. Lewis is filled in for you), set the date to 09/12/2026 and the time to 3:00pm or 3:30pm.",
  ],
  recap: [
    "The appointment shows in Rachel Lewis's diary as Confirmed.",
    "Tom is sent a booking confirmation, by text or email as he prefers, if Booking confirmation is switched on in Automations.",
    "He is sent his appointment reminders, if they are switched on in Automations.",
  ],
};

/**
 * The app's own required-field checks come first (they are not mistakes, just the form), then
 * the call's checks, one at a time, in the order a receptionist would notice them.
 */
export function checkAttempt(sc: Scenario, a: Attempt): Verdict {
  if (!a.patientId) return { ok: false, kind: "form", field: "patient" };
  if (!a.service) return { ok: false, kind: "form", field: "service" };
  if (a.start === null) return { ok: false, kind: "form", field: "time" };

  if (a.patientId !== sc.patientId) {
    const p = PATIENTS.find((x) => x.id === a.patientId);
    const who = p ? `That's ${p.name}, born ${p.dob.slice(-4)}. ` : "";
    return { ok: false, kind: "mistake", key: "patient", message: `${who}${sc.says.patient}` };
  }
  if (a.service !== sc.service)
    return { ok: false, kind: "mistake", key: "service", message: sc.says.service };
  if (a.clinicianId !== sc.clinicianId)
    return {
      ok: false,
      kind: "mistake",
      key: "dentist",
      message: a.clinicianId === "" ? sc.says.anyDentist : sc.says.dentist,
    };
  if (a.date !== sc.date) return { ok: false, kind: "mistake", key: "date", message: sc.says.date };
  if (!sc.timeOk(a.start))
    return { ok: false, kind: "mistake", key: "time", message: sc.says.time };
  return { ok: true };
}

/** The question at the end of the walkthrough: what to do about Mrs Patel's unpaid £45 (D3). */
export const BALANCE_QUESTION = {
  prompt:
    "While you booked, DentDock showed: Outstanding balance: £45.00. Mrs Patel is still on the phone. What do you do?",
  options: [
    {
      id: "mention",
      text: "Mention it now, and offer to take it over the phone or text her a payment link.",
      correct: true,
      why: "Right. The warning is there so you can bring it up while you have her. The booking stands either way.",
    },
    {
      id: "cancel",
      text: "Cancel the booking until she has paid.",
      correct: false,
      why: "Not quite. DentDock only suggests collecting it. The booking stands, and you mention the £45 while you have her on the phone.",
    },
    {
      id: "ignore",
      text: "Say nothing. Someone else can chase it later.",
      correct: false,
      why: "Not quite. The warning is there so you can bring it up while you have her on the phone. Chasing it later takes longer.",
    },
  ],
};
