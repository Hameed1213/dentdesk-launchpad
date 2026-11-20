import type { ReactNode } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

/** The frame every marketing page shares: navbar, the page, footer, WhatsApp button. Only the page
 * itself is <main> (the nav and footer are their own landmarks). */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
