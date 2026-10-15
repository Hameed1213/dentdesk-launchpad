// The two emails a NEW waitlist sign-up sends: a thank-you to the person, and
// an alert to hello@dentdock.co.uk. Repeat sign-ups send nothing.

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export type WaitlistSignup = { email: string; practiceName: string | null; role: string | null };

export function thankYouEmail(s: WaitlistSignup) {
  const practice = s.practiceName ? ` for ${s.practiceName}` : "";
  const text = [
    "Hello,",
    "",
    `Thank you for joining the Dent Dock waitlist${practice}.`,
    "",
    "We will be in touch as soon as we can welcome your practice. If you have any questions in the meantime, just reply to this email.",
    "",
    "The Dent Dock team",
    "",
    "You are receiving this because this email address was used to join the waitlist at dentdock.co.uk. If that wasn't you, reply and we will remove it.",
  ].join("\n");
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f172a;max-width:520px">
<p>Hello,</p>
<p>Thank you for joining the Dent Dock waitlist${esc(practice)}.</p>
<p>We will be in touch as soon as we can welcome your practice. If you have any questions in the meantime, just reply to this email.</p>
<p>The Dent Dock team</p>
<p style="font-size:12px;color:#64748b;margin-top:28px">You are receiving this because this email address was used to join the waitlist at dentdock.co.uk. If that wasn't you, reply and we will remove it.</p>
</div>`;
  return { subject: "You're on the Dent Dock waitlist", text, html };
}

export function alertEmail(s: WaitlistSignup) {
  const rows: [string, string][] = [
    ["Email", s.email],
    ["Practice", s.practiceName || "—"],
    ["Role", s.role || "—"],
  ];
  const text = [
    "New waitlist sign-up on dentdock.co.uk",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
<p>New waitlist sign-up on dentdock.co.uk</p>
<table style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:2px 16px 2px 0;color:#64748b">${k}</td><td>${esc(v)}</td></tr>`,
    )
    .join("")}</table>
</div>`;
  return { subject: `New waitlist sign-up: ${s.email}`, text, html };
}
