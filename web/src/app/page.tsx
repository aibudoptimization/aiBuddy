import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ValueCalculator } from "@/components/sections/ValueCalculator";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Differentiators } from "@/components/sections/Differentiators";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustStrip />
        <ValueCalculator />
        <Services />
        <Process />
        <Differentiators />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
