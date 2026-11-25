// Run: npx -y tsx --test src/components/training/tasks/bookPhone.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BOOKINGS,
  PATEL,
  REID,
  TARGET_DAY,
  TODAY,
  checkAttempt,
  dayLabel,
  overlaps,
  timeLabel,
  timeOptions,
  type Attempt,
  type Scenario,
} from "./bookPhone.ts";
import { starsFor } from "../../../lib/trainingProgress.ts";

const patelRight: Attempt = {
  patientId: "meena",
  service: "Check-up",
  clinicianId: "shah",
  date: TARGET_DAY,
  start: 9 * 60 + 30,
};
const reidRight: Attempt = {
  patientId: "tomreid",
  service: "Scale & polish",
  clinicianId: "lewis",
  date: "2026-12-09",
  start: 15 * 60,
};
const key = (sc: Scenario, base: Attempt, a: Partial<Attempt>) => {
  const v = checkAttempt(sc, { ...base, ...a });
  return v.ok ? "ok" : v.kind === "mistake" ? v.key : v.field;
};

test("the right booking passes, for both calls", () => {
  assert.deepEqual(checkAttempt(PATEL, patelRight), { ok: true });
  assert.deepEqual(checkAttempt(REID, reidRight), { ok: true });
  assert.deepEqual(checkAttempt(REID, { ...reidRight, start: 15 * 60 + 30 }), { ok: true });
});

test("empty fields are the form's own messages, not mistakes", () => {
  assert.equal(key(PATEL, patelRight, { patientId: null }), "patient");
  assert.deepEqual(checkAttempt(PATEL, { ...patelRight, service: "" }), {
    ok: false,
    kind: "form",
    field: "service",
  });
  assert.deepEqual(checkAttempt(REID, { ...reidRight, start: null }), {
    ok: false,
    kind: "form",
    field: "time",
  });
});

test("Mrs Patel: each mistake is named, in order", () => {
  assert.equal(key(PATEL, patelRight, { patientId: "priya" }), "patient");
  assert.equal(key(PATEL, patelRight, { patientId: "anil", service: "Filling" }), "patient");
  assert.equal(key(PATEL, patelRight, { service: "Scale & polish" }), "service");
  assert.equal(key(PATEL, patelRight, { clinicianId: "" }), "dentist");
  assert.equal(key(PATEL, patelRight, { clinicianId: "ellis" }), "dentist");
  assert.equal(key(PATEL, patelRight, { date: TODAY }), "date");
  assert.equal(key(PATEL, patelRight, { start: 11 * 60 }), "time");
  const v = checkAttempt(PATEL, { ...patelRight, patientId: "priya" });
  assert.ok(
    !v.ok && v.kind === "mistake" && v.message.startsWith("That's Priya Patel, born 1994."),
  );
});

test("Tom Reid: Thomas Reid, wrong day and before 2pm are caught", () => {
  assert.equal(key(REID, reidRight, { patientId: "thomasreid" }), "patient");
  const v = checkAttempt(REID, { ...reidRight, patientId: "thomasreid" });
  assert.ok(
    !v.ok &&
      v.kind === "mistake" &&
      v.message.includes("born 1951") &&
      v.message.includes("4 April 1979"),
  );
  assert.equal(key(REID, reidRight, { service: "Check-up" }), "service");
  assert.equal(key(REID, reidRight, { date: TARGET_DAY }), "date");
  assert.equal(key(REID, reidRight, { start: 13 * 60 }), "time");
});

test("Dr Shah's only free Thursday time before 11am is 9:30am", () => {
  const free = timeOptions("shah", TARGET_DAY, "Check-up").filter(
    (t) => t < 11 * 60 && !overlaps(BOOKINGS, "shah", TARGET_DAY, t, 30),
  );
  assert.deepEqual(free.map(timeLabel), ["9:30am"]);
});

test("Rachel Lewis on Wednesday after 2pm: 3:00pm to 3:30pm can start (2pm and 2:30pm are taken, she ends at 4pm)", () => {
  const free = timeOptions("lewis", "2026-12-09", "Scale & polish").filter(
    (t) => t >= 14 * 60 && t + 30 <= 16 * 60 && !overlaps(BOOKINGS, "lewis", "2026-12-09", t, 30),
  );
  assert.deepEqual(free.map(timeLabel), ["3:00pm", "3:15pm", "3:30pm"]);
});

test("times are every 15 minutes in the app's format, within the dentist's hours", () => {
  const t = timeOptions("shah", TARGET_DAY, "Check-up");
  assert.equal(timeLabel(t[0]), "9:00am");
  assert.equal(timeLabel(t[t.length - 1]), "5:15pm");
  assert.equal(t[1] - t[0], 15);
  assert.deepEqual(timeOptions("shah", "2026-12-12"), [], "Saturday: closed");
  assert.equal(dayLabel(TARGET_DAY), "Thursday 10 December 2026");
});

test("stars: 3, minus one per mistake or hint, never below 1", () => {
  assert.equal(starsFor(0, 0), 3);
  assert.equal(starsFor(1, 0), 2);
  assert.equal(starsFor(1, 1), 1);
  assert.equal(starsFor(4, 3), 1);
});
