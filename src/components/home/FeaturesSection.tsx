import { Card } from "@/components/ui/card";
import {
  CalendarCheck,
  MessageSquare,
  CreditCard,
  Sparkles,
  Check,
  Clock,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-background py-20 md:py-32 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Everything your private practice needs.
            <br />
            <span className="text-muted-foreground">Nothing it doesn't.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Built specifically for independent UK private practices — not
            retro-fitted from NHS software.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Card 1 — Online booking (large, spans 2 cols) */}
          <Card className="md:col-span-2 overflow-hidden border-border bg-card">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary mb-4">
                  <CalendarCheck className="w-4 h-4" />
                  Online booking
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                  Patients book themselves. 24/7.
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  A clean, branded booking page that works on any device. Your
                  diary fills itself overnight while you sleep — no phone calls,
                  no back and forth.
                </p>
              </div>
              <div className="bg-muted/40 p-6 md:p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-border">
                <BookingIllustration />
              </div>
            </div>
          </Card>

          {/* Card 2 — Reminders */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary mb-4">
                <MessageSquare className="w-4 h-4" />
                Automated reminders
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Cut no-shows by up to 40%
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                SMS and email reminders sent automatically — at the right time,
                in your practice voice.
              </p>
            </div>
            <div className="bg-muted/40 px-6 py-8 border-t border-border flex items-center justify-center">
              <RemindersIllustration />
            </div>
          </Card>

          {/* Card 3 — Stripe payments */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary mb-4">
                <CreditCard className="w-4 h-4" />
                Stripe payments
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Get paid before they sit down
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Take deposits at booking. Charge full balance after treatment.
                Stripe Connect built in.
              </p>
            </div>
            <div className="bg-muted/40 px-6 py-8 border-t border-border flex items-center justify-center">
              <PaymentsIllustration />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------- Illustrations ---------- */

const BookingIllustration = () => {
  const slots = [
    { time: "09:00", label: "Hygiene", taken: true },
    { time: "09:45", label: "Check-up", taken: true },
    { time: "10:30", label: "Available", taken: false },
    { time: "11:15", label: "Whitening", taken: true },
    { time: "12:00", label: "Available", taken: false },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-muted-foreground">Tuesday</div>
          <div className="text-sm font-semibold text-foreground">
            16 April 2025
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Live
        </div>
      </div>
      <div className="space-y-2">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm border ${
              s.taken
                ? "bg-muted/60 border-border text-muted-foreground"
                : "bg-primary/5 border-primary/30 text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-3.5 h-3.5 opacity-60" />
              <span className="font-medium tabular-nums">{s.time}</span>
            </div>
            <span className="text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RemindersIllustration = () => {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="rounded-2xl rounded-bl-sm bg-background border border-border px-3 py-2 text-xs text-foreground shadow-sm">
        <div className="text-[10px] text-muted-foreground mb-0.5">SMS</div>
        Hi Sarah — reminder of your appointment with Dr. Webb tomorrow at 10:30.
        Reply Y to confirm.
      </div>
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3 py-2 text-xs shadow-sm">
          Y
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 justify-end">
        <Check className="w-3 h-3" />
        Confirmed
      </div>
    </div>
  );
};

const PaymentsIllustration = () => {
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-background shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-muted-foreground">Deposit</div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 rounded px-1.5 py-0.5">
          <Sparkles className="w-3 h-3" />
          Paid
        </div>
      </div>
      <div className="text-2xl font-bold tabular-nums text-foreground">
        £50.00
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Visa •••• 4242</span>
        <span className="font-medium text-foreground">Stripe</span>
      </div>
    </div>
  );
};
