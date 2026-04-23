import ToothIcon from "@/components/icons/ToothIcon";

const productLinks = [
  { label: "Features", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const companyLinks = [
  { label: "Contact", href: "https://wa.me/447700000000" },
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
    <footer className="bg-[#0F162B] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <ToothIcon size={22} color="#60A5FA" />
              <span
                className="text-lg tracking-tight"
                style={{ color: "#60A5FA", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Dent Dock
              </span>
            </a>
            <p className="mt-4 text-[14px] leading-[1.6] text-white/60 max-w-[200px]">
              Practice management software built for independent UK private practices.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      const hashIdx = l.href.indexOf("#");
                      if (hashIdx === -1) return;
                      const id = l.href.slice(hashIdx + 1);
                      const el = document.getElementById(id);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        // Element not on current page — navigate to home with hash
                        e.preventDefault();
                        window.location.href = `/#${id}`;
                      }
                    }}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} Dent Dock. All rights reserved.
          </p>
          <p className="text-[13px] text-white/40">
            Made in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}
