import type { ReactNode } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

/** The frame every marketing page shares: navbar, the page, footer, WhatsApp button. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
