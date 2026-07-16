import { HeroAmbient } from "@/components/canvas/HeroAmbient";
import { HomeAudienceSection } from "@/components/home/HomeAudienceSection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJournalSection } from "@/components/home/HomeJournalSection";
import { HomeOwnershipSection } from "@/components/home/HomeOwnershipSection";
import { HomePricingSection } from "@/components/home/HomePricingSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { HomeToolsSection } from "@/components/home/HomeToolsSection";
import { HomeVisibilitySection } from "@/components/home/HomeVisibilitySection";

export function HomePage() {
  return (
    <div className="ww-home">
      <HeroAmbient accentRgb="75,250,200" secondaryRgb="139,124,255" motif="flow" />
      <HomeHero />
      <HomeServicesSection />
      <HomeAudienceSection />
      <HomeToolsSection />
      <HomeVisibilitySection />
      <HomeOwnershipSection />
      <HomePricingSection />
      <HomeJournalSection />
    </div>
  );
}
