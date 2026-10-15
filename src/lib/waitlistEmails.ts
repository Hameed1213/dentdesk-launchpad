// The two emails a NEW waitlist sign-up sends: a thank-you to the person, and
// an alert to hello@dentdock.co.uk. Repeat sign-ups send nothing.

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export type WaitlistSignup = { email: string; practiceName: string | null; role: string | null };

const SITE = "https://dentdock.co.uk";
const BLUE = "#2563EB";
const INK = "#0F172A";
const MUTED = "#64748B";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const step = (n: number, title: string, body: string) => `
<tr>
  <td valign="top" width="40" style="padding:0 0 18px 0">
    <div style="width:28px;height:28px;border-radius:14px;background:#EFF6FF;color:${BLUE};font:600 14px/28px ${FONT};text-align:center">${n}</div>
  </td>
  <td valign="top" style="padding:3px 0 18px 0;font:15px/1.55 ${FONT};color:${INK}">
    <strong style="font-weight:600">${title}</strong><br><span style="color:${MUTED}">${body}</span>
  </td>
</tr>`;

export function thankYouEmail(s: WaitlistSignup) {
  const practice = s.practiceName ? ` for ${s.practiceName}` : "";
  const text = [
    "You're on the Dent Dock waitlist",
    "",
    `Thank you for joining the Dent Dock waitlist${practice}.`,
    "",
    "What happens next",
    "1. We'll email you as soon as a place opens for your practice.",
    "2. We'll show you around Dent Dock and set it up with you: online booking, reminders, recalls and payments.",
    "3. You go live, usually within the day. No contracts, no setup fees.",
    "",
    "Our first 30 practices get priority support and help shape the product from day one.",
    "",
    `Explore Dent Dock: ${SITE}`,
    "",
    "Questions? Just reply to this email. It comes straight to our team.",
    "",
    "The Dent Dock team",
    "",
    "---",
    "You're receiving this because this email address was used to join the waitlist at dentdock.co.uk. Not you? Reply and we'll remove it.",
    "Dent Dock is a trading name of Paradigm Network Limited. Company No. 16903048.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>You're on the Dent Dock waitlist</title></head>
<body style="margin:0;padding:0;background:#F1F5F9">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Thanks for joining. Here's what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F1F5F9">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px">
    <tr><td style="padding:0 4px 20px 4px">
      <a href="${SITE}" style="text-decoration:none">
        <img src="${SITE}/email/logo.png" width="28" height="28" alt="" style="vertical-align:middle;border:0">
        <span style="font:700 19px/28px ${FONT};color:${BLUE};vertical-align:middle;letter-spacing:-0.02em">&nbsp;Dent Dock</span>
      </a>
    </td></tr>
    <tr><td style="background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background:${BLUE};background-image:linear-gradient(135deg,#2563EB,#1D4ED8);padding:36px 32px;border-radius:16px 16px 0 0">
          <div style="font:600 12px/1 ${FONT};letter-spacing:0.14em;text-transform:uppercase;color:#BFDBFE">Waitlist</div>
          <h1 style="margin:10px 0 0 0;font:700 28px/1.2 ${FONT};color:#FFFFFF;letter-spacing:-0.02em">You're on the list</h1>
          <p style="margin:10px 0 0 0;font:16px/1.55 ${FONT};color:#DBEAFE">Thank you for joining the Dent Dock waitlist${esc(practice)}.</p>
        </td></tr>
        <tr><td style="padding:32px 32px 8px 32px">
          <h2 style="margin:0 0 18px 0;font:600 17px/1.3 ${FONT};color:${INK}">What happens next</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${step(1, "We'll be in touch", "We'll email you as soon as a place opens for your practice.")}
            ${step(2, "We set it up with you", "Online booking, reminders, recalls and payments, shaped around how your practice works.")}
            ${step(3, "You go live", "Usually within the day. No contracts, no setup fees.")}
          </table>
        </td></tr>
        <tr><td style="padding:0 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EFF6FF;border-radius:12px">
            <tr><td style="padding:16px 18px;font:14px/1.55 ${FONT};color:#1E3A8A">
              <strong style="font-weight:600">Early practices get more.</strong> Our first 30 practices get priority support and help shape the product from day one.
            </td></tr>
          </table>
        </td></tr>
        <tr><td align="left" style="padding:28px 32px 8px 32px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="border-radius:999px;background:${BLUE}">
              <a href="${SITE}" style="display:inline-block;padding:13px 26px;font:600 15px/1 ${FONT};color:#FFFFFF;text-decoration:none;border-radius:999px">Explore Dent Dock</a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:20px 32px 32px 32px;font:15px/1.6 ${FONT};color:${INK}">
          Questions? Just reply to this email. It comes straight to our team.<br><br>
          The Dent Dock team
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:22px 8px 0 8px;font:12px/1.6 ${FONT};color:${MUTED};text-align:center">
      You're receiving this because this email address was used to join the waitlist at <a href="${SITE}" style="color:${MUTED}">dentdock.co.uk</a>. Not you? Reply and we'll remove it.<br>
      Dent Dock is a trading name of Paradigm Network Limited · Company No. 16903048<br>
      <a href="${SITE}/privacy" style="color:${MUTED}">Privacy Policy</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
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
