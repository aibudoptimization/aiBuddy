"use client";

import Image from "next/image";

import { ServiceContactBlock } from "@/components/services/ServiceContactBlock";
import { ServiceFaq } from "@/components/services/ServiceFaq";
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
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span
              className="ww-glow-dot"
              style={{
                width: 7,
                height: 7,
                background: ACCENT,
                boxShadow: "0 0 9px rgba(240,169,78,0.7)",
              }}
              aria-hidden
            />
            {s.eyebrow}
          </div>
        </div>

        <h1 className="ww-service-title">
          {s.h1Before}
          <span className="ww-accent-text">{s.h1Accent}</span>
          {s.h1After}
        </h1>
        <p className="ww-service-lead">{s.lead}</p>

        <div className="ww-svc-hero-img">
          <Image
            src="/services/sites-boutiques.png"
            alt="Maquettes de site vitrine et de boutique en ligne"
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1180px"
            className="ww-svc-hero-img__el"
          />
        </div>

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
