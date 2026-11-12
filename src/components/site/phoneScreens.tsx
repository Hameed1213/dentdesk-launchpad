import { ChevronRight } from "lucide-react";
import { Phone } from "@/components/site/solutionTemplates";

/* Patient-facing phone screens for the Solutions heroes. Wording follows the product; names are examples. */

export function ReminderPhone() {
  return (
    <Phone>
      <p className="text-center text-[12px] font-semibold text-[#0F172A]">Smile Dental</p>
      <p className="text-center text-[10px] text-[#94A3B8]">Text message · Mon 10:30</p>
      <p className="mt-4 rounded-2xl rounded-tl-sm bg-white border border-[#E2E8F0] px-3.5 py-3 text-[13px] leading-[1.5] text-[#334155]">
        Hi Sarah, a reminder of your check-up on Thu 14 Nov at 10:30. Need to change it?{" "}
        <span className="text-[#2563EB] underline underline-offset-2">View your appointment</span>
      </p>
      <div className="mt-6 rounded-2xl bg-white border border-[#E2E8F0] p-4">
        <p className="text-[13px] font-semibold text-[#0F172A]">Check-up · Thu 14 Nov, 10:30</p>
        <p className="mt-0.5 text-[11px] text-[#64748B]">Dr Patel</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded-lg border border-[#E2E8F0] py-2 text-center text-[12px] font-medium text-[#334155]">
            Rearrange
          </span>
          <span className="rounded-lg bg-[#2563EB] py-2 text-center text-[12px] font-semibold text-white">
            Cancel
          </span>
        </div>
        <p className="mt-3 text-[11px] text-[#64748B]">Free to cancel up to 48 hours before.</p>
      </div>
    </Phone>
  );
}

export function BookingPhone() {
  const rows = [
    { t: "Check-up", d: "30 mins", p: "£55" },
    { t: "Hygiene", d: "45 mins", p: "£75" },
    { t: "Whitening consultation", d: "30 mins", p: "£40", dep: true },
    { t: "Emergency appointment", d: "20 mins", p: "£65" },
  ];
  return (
    <Phone>
      <p className="text-center text-[12px] font-semibold text-[#0F172A]">Smile Dental</p>
      <p className="text-center text-[10px] text-[#94A3B8]">Book online</p>
      <p className="mt-4 text-[12px] font-medium text-[#64748B]">Choose a treatment</p>
      <div className="mt-2 space-y-2">
        {rows.map((r) => (
          <div
            key={r.t}
            className="flex items-center justify-between rounded-xl bg-white border border-[#E2E8F0] px-3 py-2.5"
          >
            <div>
              <p className="text-[12px] font-medium text-[#0F172A]">
                {r.t}
                {r.dep && (
                  <span className="ml-1.5 rounded bg-[#EFF6FF] px-1 py-0.5 text-[9px] font-semibold text-[#2563EB]">
                    Deposit
                  </span>
                )}
              </p>
              <p className="text-[10px] text-[#64748B]">{r.d}</p>
            </div>
            <span className="flex items-center gap-1 text-[12px] font-semibold text-[#0F172A]">
              {r.p} <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            </span>
          </div>
        ))}
      </div>
    </Phone>
  );
}
