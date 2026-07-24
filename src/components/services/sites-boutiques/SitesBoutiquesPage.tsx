"use client";

import { ServiceContactBlock } from "@/components/services/ServiceContactBlock";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { useLocale } from "@/components/i18n/LocaleProvider";

import { NicheShowcase } from "./NicheShowcase";

const ACCENT = "#f0a94e";

export function SitesBoutiquesPage() {
  const { dict } = useLocale();
  const s = dict.services.sitesBoutiques;

  return (
    <ServicePageLayout
      accent={ACCENT}
      accentAlt={ACCENT}
      heroRgb="240,169,78"
      heroSecondaryRgb="246,205,150"
    >
      <div className="ww-container ww-svc">
        <ServiceHero
          eyebrow={s.eyebrow}
          h1Before={s.h1Before}
          h1Accent={s.h1Accent}
          h1After={s.h1After}
          lead={s.lead}
          accent={ACCENT}
          image={{
            src: "/services/sites-boutiques.png",
            alt: "Maquettes de site vitrine et de boutique en ligne",
          }}
        />

        <NicheShowcase
          eyebrow={s.nicheEyebrow}
          hint={s.nicheHint}
          title={s.nicheTitle}
          lead={s.nicheLead}
          demoLabel={s.nicheDemo}
          previewLabel={s.nichePreview}
          comingSoonLabel={s.nicheComingSoon}
        />

        <ServiceFaq title={s.faqTitle} items={s.faq} />

        <ServiceContactBlock
          kicker={s.ctaLabel}
          title={s.ctaTitle}
          description={s.ctaDescription}
        />
      </div>
    </ServicePageLayout>
  );
}
