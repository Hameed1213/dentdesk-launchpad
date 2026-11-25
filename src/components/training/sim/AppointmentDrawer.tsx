import { useEffect, useState } from "react";
import { AlertTriangle, Search, UserPlus, X } from "lucide-react";
import { Notice } from "./AppChrome";
import {
  CLINICIANS,
  FORMS,
  PATIENTS,
  SERVICES,
  clinicianHours,
  money,
  overlaps,
  timeLabel,
  timeOptions,
  type Attempt,
  type Booking,
  type Patient,
} from "@/components/training/tasks/bookPhone";

/*
 * The "New appointment" drawer, copied from desk-care-hub @ #691
 * (components/dashboard/NewAppointmentDrawer.tsx): 480px from the right over a dimmed page;
 * PATIENT (search by name, phone or email; "{phone} · Last seen {date}"; chosen card with
 * "Change"; "Outstanding balance: £x" notice), APPOINTMENT DETAILS (Service "{name} · {n}m ·
 * £x.xx", "Full price" / "No deposit required" box, Duration, Dentist "Any available" or
 * "NS · Dr. Shah" listing only dentists who do the service, Date, Time with " — Taken" /
 * " — Blocked"), PATIENT FORM (OPTIONAL), CONFIRMATION SETTINGS (Collect deposit), INTERNAL
 * NOTE; footer "Total", "Book appointment" ("Booking..."), "Cancel"; "Discard this booking?".
 * Required-field messages are the app's own.
 */

export type DrawerPrefill = { date: string; start: number | null; clinicianId: string };
/** What has been filled in so far (for the walkthrough). */
export type DrawerState = {
  search: string;
  patientId: string | null;
  service: string;
  clinicianId: string;
  date: string;
  start: number | null;
};

const label = "text-[13px] font-medium text-[#0F172A]";
const field =
  "mt-1 h-10 w-full rounded-lg border bg-white px-3 text-[14px] focus:border-[#2563EB] focus:outline-none";
const normal = "border-[#E2E8F0]";
const bad = "border-[#dc2626]";
const sectionTitle = "mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#64748B]";

export function AppointmentDrawer({
  prefill,
  bookings,
  onClose,
  onBook,
  onOther,
  onState,
}: {
  prefill: DrawerPrefill;
  bookings: Booking[];
  onClose: () => void;
  /** Something the task doesn't use (e.g. "+ New patient"). */
  onOther: (what: string) => void;
  /** Walkthrough: told what has been filled in so far. */
  onState?: (s: DrawerState) => void;
  /** Returns true when the booking was accepted (the drawer then closes). */
  onBook: (a: Attempt & { note: string }) => Promise<boolean>;
}) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [service, setService] = useState("");
  const [clinicianId, setClinicianId] = useState(prefill.clinicianId);
  const [date, setDate] = useState(prefill.date);
  const [start, setStart] = useState<number | null>(prefill.start);
  const [form, setForm] = useState("");
  const [deposit, setDeposit] = useState(false);
  const [note, setNote] = useState("");
  const [duration, setDuration] = useState("30");
  const [errors, setErrors] = useState<{ patient?: boolean; service?: boolean; time?: boolean }>(
    {},
  );
  const [saving, setSaving] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    onState?.({ search, patientId: patient?.id ?? null, service, clinicianId, date, start });
  }, [search, patient, service, clinicianId, date, start, onState]);

  const svc = SERVICES.find((s) => s.name === service);
  const eligible = CLINICIANS.filter((c) => !svc || svc.clinicianIds.includes(c.id));

  const matches = search
    ? PATIENTS.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.phone.replace(/\s/g, "").includes(search.replace(/\s/g, "")) ||
          p.email.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const times = timeOptions(clinicianId || null, date, service);
  const length = Number(duration) > 0 ? Number(duration) : 30;
  const status = (t: number): "" | "Taken" | "Blocked" => {
    if (clinicianId) {
      if (overlaps(bookings, clinicianId, date, t, length)) return "Taken";
      const hrs = clinicianHours(CLINICIANS.find((c) => c.id === clinicianId)!, date);
      if (hrs && t + length > hrs[1]) return "Blocked";
      return "";
    }
    const free = eligible.some((c) => {
      const hrs = clinicianHours(c, date);
      return (
        hrs && t >= hrs[0] && t + length <= hrs[1] && !overlaps(bookings, c.id, date, t, length)
      );
    });
    return free ? "" : "Taken";
  };

  const chooseService = (name: string) => {
    setService(name);
    setErrors((e) => ({ ...e, service: false }));
    const s = SERVICES.find((x) => x.name === name);
    if (!s) return;
    setDuration(String(s.minutes));
    // The app resets a dentist who doesn't do the service, and picks the only one if there's one.
    if (clinicianId && !s.clinicianIds.includes(clinicianId)) setClinicianId("");
    if (s.clinicianIds.length === 1) setClinicianId(s.clinicianIds[0]);
  };

  const close = () => (touched ? setDiscard(true) : onClose());

  const book = async () => {
    const e = { patient: !patient, service: !service, time: start === null };
    setErrors(e);
    if (e.patient || e.service || e.time) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = await onBook({ patientId: patient!.id, service, clinicianId, date, start, note });
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <div
      className="absolute inset-0 z-50"
      onChangeCapture={() => setTouched(true)}
      onPointerDownCapture={() => setTouched(true)}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
      <div
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-[480px] flex-col bg-white shadow-2xl"
        role="dialog"
        aria-label="New appointment"
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
          <h2 className="text-[18px] font-bold">New appointment</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-[#64748B] hover:text-[#0F172A]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* PATIENT */}
          <div>
            <h3 className={sectionTitle}>Patient</h3>
            {!patient ? (
              <div className="relative">
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setErrors((x) => ({ ...x, patient: false }));
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    placeholder="Search existing patients..."
                    aria-label="Search existing patients"
                    data-tour="patient-search"
                    className={`h-10 w-full rounded-lg border bg-white pl-10 pr-3 text-[14px] focus:border-[#2563EB] focus:outline-none ${errors.patient ? bad : normal}`}
                  />
                </div>
                {errors.patient && (
                  <p className="mt-1 text-[12px] text-[#dc2626]">Please select or add a patient</p>
                )}
                {focused && (
                  <div className="absolute left-0 right-0 top-11 z-10 max-h-[260px] overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg">
                    {matches.length > 0
                      ? matches.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            data-tour={`patient-${p.id}`}
                            onMouseDown={() => {
                              setPatient(p);
                              setSearch("");
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#F1F5F9]"
                          >
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-[12px] font-semibold text-[#2563EB]">
                              {p.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[14px] font-semibold">{p.name}</span>
                              <span className="block text-[12px] text-[#64748B]">
                                {p.phone} ·{" "}
                                {p.lastVisit ? `Last seen ${p.lastVisit}` : "New patient"}
                              </span>
                            </span>
                          </button>
                        ))
                      : search.length > 0 && (
                          <div className="px-4 py-3 text-[13px] text-[#64748B]">
                            No patients found
                          </div>
                        )}
                    <button
                      type="button"
                      onMouseDown={() => {
                        setSearch("");
                        onOther("Adding a new patient");
                      }}
                      className="flex w-full items-center gap-3 border-t border-dashed border-[#E2E8F0] px-4 py-3 text-left hover:bg-[#F1F5F9]"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                        <UserPlus size={14} className="text-[#16a34a]" />
                      </span>
                      <span className="text-[14px] font-medium text-[#2563EB]">+ New patient</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[12px] font-semibold text-white">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold">{patient.name}</div>
                      <div className="text-[12px] text-[#64748B]">
                        {[patient.phone, patient.email, patient.dob].join(" · ")}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPatient(null)}
                      className="text-[12px] text-[#2563EB] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
                {patient.owesPence > 0 && (
                  <div data-tour="balance">
                    <Notice
                      tone="warning"
                      icon={AlertTriangle}
                      title={<>Outstanding balance: {money(patient.owesPence)}</>}
                      className="mt-3"
                    >
                      <p className="text-[12px]">
                        This patient has an unpaid balance. Consider collecting before booking.
                      </p>
                      <span className="mt-1 inline-block text-[12px] text-[#2563EB] underline">
                        View in Payments →
                      </span>
                    </Notice>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* APPOINTMENT DETAILS */}
          <div>
            <h3 className={sectionTitle}>Appointment Details</h3>
            <div className="space-y-3">
              <div>
                <label className={label} htmlFor="sim-service">
                  Service
                </label>
                <select
                  id="sim-service"
                  data-tour="service"
                  value={service}
                  onChange={(e) => chooseService(e.target.value)}
                  className={`${field} ${errors.service ? bad : normal}`}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} · {s.minutes}m · {money(s.pricePence)}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-[12px] text-[#dc2626]">Please select a service</p>
                )}
              </div>
              {svc && (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <span className="text-[13px] font-medium">
                    Full price: {money(svc.pricePence)}
                  </span>
                  <span className="text-[13px] font-medium text-[#64748B]">
                    No deposit required
                  </span>
                </div>
              )}
              <div>
                <label className={label} htmlFor="sim-duration">
                  Duration
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    id="sim-duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                    inputMode="numeric"
                    className={`h-10 w-20 rounded-lg border bg-white px-3 text-[14px] ${normal}`}
                  />
                  <span className="text-[13px] text-[#64748B]">mins</span>
                </div>
              </div>
              <div data-tour="dentist">
                <label className={label} htmlFor="sim-dentist">
                  Dentist
                </label>
                <select
                  id="sim-dentist"
                  value={clinicianId}
                  onChange={(e) => setClinicianId(e.target.value)}
                  className={`${field} ${normal}`}
                >
                  <option value="">Any available</option>
                  {eligible.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.initials} · {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3" data-tour="when">
                <div className="flex-1" data-tour="date">
                  <label className={label} htmlFor="sim-date">
                    Date
                  </label>
                  <input
                    id="sim-date"
                    type="date"
                    value={date}
                    min="2026-12-08"
                    onChange={(e) => e.target.value && setDate(e.target.value)}
                    className={`${field} ${normal}`}
                  />
                </div>
                <div className="flex-1" data-tour="time">
                  <label className={label} htmlFor="sim-time">
                    Time
                  </label>
                  <select
                    id="sim-time"
                    value={start ?? ""}
                    onChange={(e) => {
                      setStart(e.target.value === "" ? null : Number(e.target.value));
                      setErrors((x) => ({ ...x, time: false }));
                    }}
                    className={`${field} ${errors.time ? bad : normal}`}
                  >
                    <option value="">{times.length ? "Select time" : "Date is closed"}</option>
                    {times.map((t) => {
                      const st = status(t);
                      return (
                        <option key={t} value={t} disabled={!!st}>
                          {timeLabel(t)}
                          {st ? ` — ${st}` : ""}
                        </option>
                      );
                    })}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-[12px] text-[#dc2626]">Please select a time</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PATIENT FORM (OPTIONAL) */}
          <div>
            <h3 className={sectionTitle}>Patient Form (optional)</h3>
            <p className="mb-2 text-[12px] text-[#64748B]">
              Attach a questionnaire to send to the patient
            </p>
            <select
              value={form}
              onChange={(e) => setForm(e.target.value)}
              aria-label="Patient form"
              className={`${field} ${normal} mt-0`}
            >
              {FORMS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                  {f.questions > 0 ? ` (${f.questions} questions)` : ""}
                </option>
              ))}
            </select>
            {form && (
              <p className="mt-2 text-[12px] text-[#64748B]">Sent straight after booking.</p>
            )}
          </div>

          {/* CONFIRMATION SETTINGS */}
          <div>
            <h3 className={sectionTitle}>Confirmation Settings</h3>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[14px]">Collect deposit</span>
                <p className="mt-0.5 text-[11px] text-[#64748B]">
                  Records the deposit due. Once booked, you can take it (card, cash, bank transfer)
                  or text a link.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={deposit}
                aria-label="Collect deposit"
                onClick={() => setDeposit(!deposit)}
                className={`h-6 w-10 flex-shrink-0 rounded-full transition-colors ${deposit ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`}
              >
                <span
                  className={`mx-1 block h-4 w-4 rounded-full bg-white shadow transition-transform ${deposit ? "translate-x-4" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* INTERNAL NOTE */}
          <div>
            <h3 className={`${sectionTitle} mb-1`}>Internal Note</h3>
            <p className="mb-2 text-[11px] text-[#64748B]">
              Visible to practice staff only. Saved with the booking, on the patient's profile.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 2000))}
              rows={3}
              placeholder="Add a note about this appointment..."
              aria-label="Internal note"
              className="w-full resize-none rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-[14px] placeholder:text-[#64748B] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-[#E2E8F0] bg-white px-6 py-5">
          {svc && (
            <div className="mb-3">
              <span className="text-[14px] font-semibold">Total: {money(svc.pricePence)}</span>
            </div>
          )}
          <button
            type="button"
            onClick={book}
            data-tour="book"
            disabled={saving}
            className={`h-11 w-full rounded-lg bg-[#2563EB] text-[14px] font-bold text-white transition-opacity hover:opacity-90 ${saving ? "cursor-wait opacity-60" : ""}`}
          >
            {saving ? "Booking..." : "Book appointment"}
          </button>
          <button
            type="button"
            onClick={close}
            className="mt-2 w-full text-center text-[13px] text-[#64748B] hover:text-[#0F172A]"
          >
            Cancel
          </button>
        </div>
      </div>

      {discard && (
        <div
          className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setDiscard(false)}
        >
          <div
            className="mx-4 w-full max-w-[380px] rounded-2xl bg-white p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
          >
            <h3 className="mb-2 text-[18px] font-bold">Discard this booking?</h3>
            <p className="mb-6 text-[14px] text-[#64748B]">Your changes will be lost.</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDiscard(false)}
                className="h-10 flex-1 rounded-lg border border-[#E2E8F0] text-[14px] font-semibold hover:bg-[#F1F5F9]"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-10 flex-1 rounded-lg bg-[#dc2626] text-[14px] font-semibold text-white hover:opacity-90"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
