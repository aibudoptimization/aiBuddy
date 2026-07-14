import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";

import { NicheShowcase } from "./NicheShowcase";
import { SitesBuildStage } from "./SitesBuildStage";

const ACCENT = "#f0a94e";

export function SitesBoutiquesPage() {
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
            Sites &amp; boutiques en ligne
          </div>
        </div>

        <h1 className="ww-service-title">
          On donne <span className="ww-accent-text">vie</span> à votre présence en ligne.
        </h1>
        <p className="ww-service-lead">
          Du site vitrine à la boutique complète, façonné pour votre activité et ceux que vous
          servez.
        </p>

        <SitesBuildStage />

        <NicheShowcase />

        <ServiceCtaBand
          accentLabel="Sur mesure"
          title="Et si on parlait de votre projet à vous ?"
          description="Décrivez-nous le vôtre, on revient avec une première piste concrète sous 24 h."
          ctaLabel="Parlons-en"
          ctaHref="/contact"
          gradientRgb="240,169,78"
        />
      </div>
    </ServicePageLayout>
  );
}
