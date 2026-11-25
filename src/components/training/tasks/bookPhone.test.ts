// Run: npx -y tsx --test src/components/training/tasks/bookPhone.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BOOKINGS,
  TARGET_DAY,
  TODAY,
  checkBooking,
  dayLabel,
  overlaps,
  timeLabel,
  timeOptions,
  type Attempt,
} from "./bookPhone.ts";
import { starsFor } from "../../../lib/trainingProgress.ts";

const right: Attempt = {
  patientId: "meena",
  service: "Check-up",
  clinicianId: "shah",
  date: TARGET_DAY,
  start: 9 * 60 + 30,
};
const verdict = (a: Partial<Attempt>) => checkBooking({ ...right, ...a });

test("the right booking passes", () => {
  assert.deepEqual(checkBooking(right), { ok: true });
});

test("empty fields are the form's own messages, not mistakes", () => {
  assert.deepEqual(verdict({ patientId: null }), { ok: false, kind: "form", field: "patient" });
  assert.deepEqual(verdict({ service: "" }), { ok: false, kind: "form", field: "service" });
  assert.deepEqual(verdict({ start: null }), { ok: false, kind: "form", field: "time" });
});

test("each mistake is named, in the order a receptionist would notice", () => {
  const key = (a: Partial<Attempt>) => {
    const v = verdict(a);
    return v.ok ? "ok" : v.kind === "mistake" ? v.key : v.field;
  };
  assert.equal(key({ patientId: "priya" }), "patient");
  assert.equal(key({ patientId: "anil", service: "Filling" }), "patient");
  assert.equal(key({ service: "Scale & polish" }), "service");
  assert.equal(key({ clinicianId: "" }), "dentist");
  assert.equal(key({ clinicianId: "ellis" }), "dentist");
  assert.equal(key({ date: TODAY }), "date");
  assert.equal(key({ start: 11 * 60 }), "time");
  const priya = verdict({ patientId: "priya" });
  assert.ok(!priya.ok && priya.kind === "mistake" && priya.message.includes("1994"));
});

test("Dr Shah's only free Thursday time before 11am is 9:30am", () => {
  const free = timeOptions("shah", TARGET_DAY, "Check-up").filter(
    (t) => t < 11 * 60 && !overlaps(BOOKINGS, "shah", TARGET_DAY, t, 30),
  );
  assert.deepEqual(free.map(timeLabel), ["9:30am"]);
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
