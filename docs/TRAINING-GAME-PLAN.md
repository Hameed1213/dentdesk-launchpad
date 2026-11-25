# DentDock staff training game: plan (25 Nov 2026)

Hariss, 25 Nov: "I want the game feel but keep in mind security … pick receptionist, manager and
there's 5-10 tasks to learn that are the most important … it needs to be made high quality."
Decisions: "go with your recommendations" (T1-T6 below).

## 1. What it is

A training game at **dentdock.co.uk/training**, behind a lock screen. Staff unlock it with their
practice's access code, type their first name, pick **Receptionist** or **Practice manager**, and
play short tasks on a **pretend DentDock** with made-up patients. Each task:

1. opens with the situation ("Mrs Patel rings: …");
2. shows a pretend screen with the real layout and the real button names;
3. checks the **result**, not the clicks (booked the wrong dentist? it says why, and they fix it);
4. offers hints, each costing a star (3 stars with no hints and no mistakes);
5. ends with what the real DentDock would have done ("Mrs Patel now gets a reschedule message").

Finishing a role gives a certificate (name, role, date) to print or screenshot.

## 2. Decisions (Hariss, 25 Nov: "go with your recommendations")

- **T1:** Receptionist and Practice manager now; dentist missions (chart, plans) later, after a real
  dentist has tried the chart.
- **T2:** one access code per practice, made by Hariss (`scripts/training-code.mjs`).
- **T3:** the mission lists in §3, as proposed.
- **T4:** ~~the mascot is the coach~~ **Changed 25 Nov (Hariss):** "marketing is completely separate to the actual software". No mascot, no marketing pieces, no pills. Training looks like the practice app (its sign-in page, then its light pages and plain cards).
- **T5:** managers don't see staff progress (no database). The certificate covers it for now.
- **T6:** the four app problems found while researching are fixed in the hub as separate PRs (the
  hub repo isn't on this computer at writing; §7).

## 3. Missions

Each mission records the hub files it copies and the date checked (`src/components/training/missions.ts`).
Wording was taken from the hub code at #691 (two read-throughs, 25 Nov).

**Receptionist (8):** find a patient (search, alerts) · book a phoned-in appointment · move an
appointment · arrivals and Finish visit (take payment, set recall) · a late cancellation and its
fee (NHS never charged) · fill an empty slot from the waitlist · no-show or in the waiting room? ·
a new patient on the phone (duplicate warning, then send the medical history form).

**Practice manager (9):** add a receptionist with the right access ("Staff" switches off Messages,
Forms, Recalls) · book a dentist's holiday · add a treatment (no dentist = not bookable) · late
cancellation rules · check the reminders (review request needs the Google link) · send the overdue
recalls · refund part of a payment (keep or lower the price) · takings by clinician for the
accountant · turn on two-step login.

## 4. Security

- **Nothing real.** The game never talks to DentDock, Supabase, Stripe or Twilio. Patients and
  practices are made up. (A "Practice mode…" notice on every screen was dropped on 25 Nov: Hariss
  found it read as AI.)
- **The lock is checked on the server** (`src/lib/trainingAccess.ts`, `src/routes/api/training/`):
  - codes are 16 characters from 31 letters and numbers (about 79 random bits), so guessing is not
    practical; a wrong guess also waits 0.8 s;
  - only a SHA-256 hash of each code is kept, in the Cloudflare secret `TRAINING_CODES`
    (`Practice name=hash;Other practice=hash`);
  - a right code gives a cookie `dd_training`: HttpOnly, Secure, SameSite=Strict, Path=/api/training,
    30 days, signed with HMAC-SHA256 (`TRAINING_COOKIE_SECRET`). It carries part of the code's hash
    and an expiry, no personal details;
  - **removing a code from `TRAINING_CODES` locks every browser that used it**;
  - with either secret missing, training stays shut ("Training isn't switched on yet");
  - POSTs must come from the site's own page (Origin check); answers are `Cache-Control: no-store`.
- **What the lock does not do:** the game's script files are public like any website file. They hold
  only made-up data and no secrets, so that is acceptable; the lock keeps the training private, it
  does not guard anything secret.
- **Progress stays on the computer:** name and stars in localStorage (`dd_training_progress_v1`),
  every access wrapped in try/catch. Nothing is collected by DentDock.
- **Not in search:** `noindex, nofollow` meta and `X-Robots-Tag` on /training (`seoHeaders.ts`); not
  in the sitemap or llms.txt; visits aren't counted (not in `SITE_PATHS`).
- **No analytics on training:** the cookie banner isn't shown on /training, so Google Analytics never loads there.
- **No new outside services;** the Content-Security-Policy is unchanged.
- Cookie policy updated (Essential cookies: Staff training).

## 5. Setting it up (Hariss, once)

1. `node scripts/training-code.mjs "Practice name" --secret` (first time; later without `--secret`).
   It prints the code to give the practice, the `TRAINING_CODES` line and a `TRAINING_COOKIE_SECRET`.
   Nothing is sent anywhere.
2. Cloudflare dashboard → Workers → dentdock-website → Settings → Variables and secrets → add both as
   **Secret** (type Secret, not plain text). Several practices: join entries with `;`.
3. Give the practice its code. To stop a practice: remove its entry.

## 6. Build steps (one website PR each; preview + click-by-click steps; merge only on "merge it")

1. **Lock screen, code check, name and role picker, mission map** (missions show "Coming soon"). This plan.
2. **The game:** task player, hints, stars, checks, recap, certificate; with
   **Reception mission 2 (book a phoned-in appointment)** fully built to judge the quality.
3. The other reception missions.
4. The manager missions.

## 7. Found in the app while researching (T6: fix as separate hub PRs)

1. Settings → Opening hours: changing a break's times isn't saved (the selects use defaultValue with
   no onChange); only adding/removing a break is kept (`pages/Settings.tsx` ~1226-1253).
2. Booking settings: "2 weeks" in "How far ahead can patients book?" is saved as 1 week (~494-495).
3. Setup checklist "How to do this" steps use old labels ("Assigned dentists" → "Which dentists offer
   this service?"; "Appointment reminder – 24h before" → "24-hour reminder"; "Online booking enabled"
   → "Online booking") (`components/SetupChecklist.tsx`).
4. Team → Add team member: the "Staff" choice fills only Dashboard, Calendar, Patients, What's New,
   though staff with nothing saved get Messages, Forms and Recalls too (`contexts/PermissionsContext.tsx`
   173-181 vs 34-38).

## 8. Keeping it true

When a hub screen a mission copies changes, update the mission in the same programme of work and
bump its `checked` date. The game must never show a button the app doesn't have.

## 9. Step 2: Reception task 2, "Book a phoned-in appointment" (25 Nov)

**Decisions (Hariss, 25 Nov, after "dont assume, and no domino affect"):**
- **D1 made-up data:** Oak Dental; Dr. Nadia Shah, Dr. Tom Ellis, hygienist Rachel Lewis; patients
  Meena, Priya and Anil Patel and others; Check-up £55, New patient exam £85, Scale & polish £65,
  Emergency £75, Filling £120 (`tasks/bookPhone.ts`).
- **D2 logo:** "DentDock" one word in the copied sidebar (the app still shows "Dent Dock"; on its
  leftovers list).
- **D3 balance question:** kept. Right answer: mention the £45 now and offer to take it or text a
  link (practice policy, Hariss's call, not a DentDock rule).
- **D4 stars:** start on 3, lose 1 per mistake or hint, never below 1 (`starsFor`). A repeat of the
  same mistake costs once.
- **D5 diary view:** opens in **Week view**, as the app does the first time.

**Copied from the app and checked in its code (hub @ #691), not guessed:**
- Week view first; week label "7 December – 11 December 2026"; day headings "THU" / date / "N apts";
  clicking a heading opens the day; overlapping visits side by side; striped outside practice
  hours; a click on free time gives the hour or half hour, with no dentist ("Any available").
- Day view: a column per clinician, "N appointments today" / "Not working today", striped outside
  clinician hours, a click gives that clinician.
- Left panel: month, Block time, DENTISTS, SHOW (Blocked ticked; Cancelled, Completed not), Show
  weekend (off when the practice is shut at weekends).
- Header: page title, search, bell, "New appointment". "View reports" only with the Analytics
  permission, so not for a receptionist.
- Drawer: sections and wording; search by name, phone or email; dentists listed only if they do the
  service (one = picked automatically); times every 15 minutes "9:30am"; "— Taken" when the visit
  would overlap the chosen dentist's, "— Blocked" past their day's end; with Any available a time
  is taken only when every eligible working dentist is busy; times from the dentists' own hours;
  "Outstanding balance: £45.00" notice; "Discard this booking?" / "Keep editing" / "Discard";
  blue "Appointment booked for Meena Patel".
- Recap lines say "if switched on in Automations" (the defaults a new practice gets were not checked).

**Not copied (known):** times before "now" on today aren't marked "— Past"; the drawer's patient
alerts, medical alerts and frequent no-show notices aren't used by this task; "+ New patient",
Block time, other pages and other views show "isn't needed for this task".

**On a mistake** the booking is not made (the real app would make it); the message says so.
