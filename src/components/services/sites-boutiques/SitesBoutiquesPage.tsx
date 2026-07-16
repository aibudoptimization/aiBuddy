"use client";

import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { useLocale } from "@/components/i18n/LocaleProvider";

import { NicheShowcase } from "./NicheShowcase";
import { SitesBuildStage } from "./SitesBuildStage";

const ACCENT = "#f0a94e";

export function SitesBoutiquesPage() {
  const { dict, routes } = useLocale();
  const s = dict.services.sitesBoutiques;

  return (
    <ServicePageLayout accent={ACCENT} accentAlt={ACCENT} heroRgb="240,169,78">
      <div className="ww-container">
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

        <SitesBuildStage />

        <NicheShowcase
          eyebrow={s.nicheEyebrow}
          hint={s.nicheHint}
          title={s.nicheTitle}
          lead={s.nicheLead}
          demoLabel={s.nicheDemo}
          previewLabel={s.nichePreview}
          comingSoonLabel={s.nicheComingSoon}
        />

        <ServiceCtaBand
          accentLabel={s.ctaLabel}
          title={s.ctaTitle}
          description={s.ctaDescription}
          ctaLabel={s.ctaButton}
          ctaHref={routes.contact}
          gradientRgb="240,169,78"
        />
      </div>
    </ServicePageLayout>
  );
}
