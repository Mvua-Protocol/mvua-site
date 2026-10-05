import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-28">
        {children}
      </main>
      <Footer />
    </>
  );
}
