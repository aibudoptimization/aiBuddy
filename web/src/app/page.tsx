import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ValueCalculator } from "@/components/sections/ValueCalculator";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Differentiators } from "@/components/sections/Differentiators";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { RevealOnView } from "@/components/ui/RevealOnView";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <RevealOnView>
          <Services />
        </RevealOnView>
        <RevealOnView>
          <TrustStrip />
        </RevealOnView>
        <RevealOnView>
          <ValueCalculator />
        </RevealOnView>
        <RevealOnView>
          <Process />
        </RevealOnView>
        <RevealOnView>
          <Differentiators />
        </RevealOnView>
        <RevealOnView>
          <Faq />
        </RevealOnView>
      </main>
      <Footer />
    </>
  );
}
