import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { hexToRgb } from "@/lib/accents";

import { WorkflowStage } from "./WorkflowStage";

const ACCENT = "#4bfac8";
const ACCENT_ALT = "#8b7cff";

export function AutomatisationPage() {
  const heroRgb = hexToRgb(ACCENT);
  const altRgb = hexToRgb(ACCENT_ALT);

  return (
    <ServicePageLayout accent={ACCENT} heroRgb={heroRgb}>
      <div className="ww-container">
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            Automatisation des workflows
          </div>
          <span className="ww-service-live">
            <span
              className="ww-glow-dot ww-service-live__dot"
              style={{ width: 7, height: 7 }}
              aria-hidden
            />
            7 scénarios · en direct
          </span>
        </div>

        <h1 className="ww-service-title">
          Des workflows qui se déclenchent et se passent le{" "}
          <span style={{ color: ACCENT }}>relais</span>.
        </h1>
        <p className="ww-service-lead">
          100&nbsp;% basé sur des règles : un événement lance une séquence, qui peut en déclencher
          une autre. Pas d&apos;IA, juste votre logique, exécutée à la lettre.
        </p>

        <div className="ww-service-pill-banner">
          <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
          <span>
            Les workflows préférés des entrepreneurs du Québec,{" "}
            <span style={{ color: "rgba(244,243,247,0.6)" }}>
              chacun s&apos;adapte à vos outils et à votre façon de travailler.
            </span>
          </span>
        </div>

        <WorkflowStage accent={ACCENT} accentAlt={ACCENT_ALT} speed="calme" />

        <div className="ww-service-legend">
          <span>
            <span className="ww-glow-dot" style={{ width: 8, height: 8 }} aria-hidden />
            Donnée · action
          </span>
          <span>
            <span
              className="ww-glow-dot"
              style={{
                width: 8,
                height: 8,
                background: ACCENT_ALT,
                boxShadow: `0 0 9px rgba(${altRgb},0.7)`,
              }}
              aria-hidden
            />
            Règle · condition
          </span>
          <span>
            <svg width="26" height="8" viewBox="0 0 26 8" aria-hidden>
              <line
                x1="1"
                y1="4"
                x2="25"
                y2="4"
                stroke="rgba(139,124,255,0.8)"
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />
            </svg>
            Relais entre workflows
          </span>
          <span style={{ opacity: 0.6 }}>Sans IA · 100 % règles</span>
        </div>

        <ServiceCtaBand
          accentLabel="Sur mesure"
          title="Vous ne voyez pas votre workflow ? On le bâtit pour vous."
          description="Ce ne sont que des exemples. Chaque automatisation se construit selon vos outils, vos règles et votre réalité."
          ctaLabel="Plus d'informations"
          gradientRgb={altRgb}
        />
      </div>
    </ServicePageLayout>
  );
}
