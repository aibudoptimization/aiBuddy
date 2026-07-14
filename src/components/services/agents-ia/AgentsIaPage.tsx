import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";

import { AgentStage } from "./AgentStage";

const ACCENT = "#8b7cff";

export function AgentsIaPage() {
  return (
    <ServicePageLayout accent={ACCENT} accentAlt={ACCENT} heroRgb="139,124,255">
      <div className="ww-container">
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span className="ww-glow-dot ww-glow-dot--iris" style={{ width: 7, height: 7 }} aria-hidden />
            Agents &amp; assistants IA
          </div>
          <span className="ww-service-live">
            <span
              className="ww-glow-dot ww-glow-dot--iris ww-service-live__dot"
              style={{ width: 7, height: 7 }}
              aria-hidden
            />
            agent en direct
          </span>
        </div>

        <h1 className="ww-service-title">
          Un agent. Il comprend, <span className="ww-accent-text">décide</span>, agit.
        </h1>
        <p className="ww-service-lead">
          Regardez-le travailler, chaque scénario se joue en direct.
        </p>

        <AgentStage />

        <div className="ww-service-legend">
          <span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "rgba(244,243,247,0.5)",
              }}
              aria-hidden
            />
            Perçoit l&apos;entrée
          </span>
          <span>
            <span className="ww-glow-dot ww-glow-dot--iris" style={{ width: 8, height: 8 }} aria-hidden />
            Raisonne &amp; choisit l&apos;outil
          </span>
          <span>
            <span
              className="ww-glow-dot"
              style={{
                width: 8,
                height: 8,
                background: "var(--teal)",
                boxShadow: "0 0 9px rgba(75,250,200,0.7)",
              }}
              aria-hidden
            />
            Agit &amp; répond
          </span>
        </div>

        <ServiceCtaBand
          accentLabel="Sur mesure"
          title="Et si votre prochain employé n'avait jamais besoin de dormir ?"
          description="On conçoit l'agent autour de votre métier, vos données, vos outils, votre ton de voix."
          ctaLabel="Concevoir mon agent →"
          ctaHref="/contact"
          gradientRgb="139,124,255"
        />
      </div>
    </ServicePageLayout>
  );
}
