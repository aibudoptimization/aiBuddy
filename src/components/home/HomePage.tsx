import { StaticAmbient } from "@/components/canvas/StaticAmbient";
import { HomeAudienceSection } from "@/components/home/HomeAudienceSection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJournalSection } from "@/components/home/HomeJournalSection";
import { HomeOwnershipSection } from "@/components/home/HomeOwnershipSection";
import { HomePricingSection } from "@/components/home/HomePricingSection";
import { HomeProofSection } from "@/components/home/HomeProofSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { HomeToolsSection } from "@/components/home/HomeToolsSection";
import { HomeVisibilitySection } from "@/components/home/HomeVisibilitySection";

export function HomePage() {
  return (
    <div className="ww-home">
      <StaticAmbient />
      <HomeHero />
      <HomeServicesSection />
      <HomeProofSection />
      <HomeOwnershipSection />
      <HomeAudienceSection />
      <HomeToolsSection />
      <HomeVisibilitySection />
      <HomePricingSection />
      <HomeJournalSection />
    </div>
  );
}
