import ToothIcon from "@/components/icons/ToothIcon";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const companyLinks = [
  { label: "Contact", href: "mailto:hello@dentdock.co.uk" },
  { label: "Log in", href: "https://app.dentdock.co.uk" },
  { label: "Join the waitlist", href: "/waitlist" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EEEEEE]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <ToothIcon size={22} color="#2563EB" />
              <span
                className="text-lg tracking-tight"
                style={{ color: "#2563EB", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Dent Dock
              </span>
            </a>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#475569] max-w-[260px]">
              Practice management software built for independent UK private practices.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-[0.14em] mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-[0.14em] mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-[0.14em] mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#EEEEEE] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#94A3B8]">
            © {new Date().getFullYear()} Dent Dock. All rights reserved.
          </p>
          <p className="text-[13px] text-[#94A3B8]">
            Made in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}
