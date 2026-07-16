"use client";

import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { useLocale } from "@/components/i18n/LocaleProvider";

import { AgentStage } from "./AgentStage";

const ACCENT = "#8b7cff";

export function AgentsIaPage() {
  const { dict, routes } = useLocale();
  const s = dict.services.agentsIa;

  return (
    <ServicePageLayout accent={ACCENT} accentAlt={ACCENT} heroRgb="139,124,255">
      <div className="ww-container">
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span className="ww-glow-dot ww-glow-dot--iris" style={{ width: 7, height: 7 }} aria-hidden />
            {s.eyebrow}
          </div>
          <span className="ww-service-live">
            <span
              className="ww-glow-dot ww-glow-dot--iris ww-service-live__dot"
              style={{ width: 7, height: 7 }}
              aria-hidden
            />
            {s.live}
          </span>
        </div>

        <h1 className="ww-service-title">
          {s.h1Before}
          <span className="ww-accent-text">{s.h1Accent}</span>
          {s.h1After}
        </h1>
        <p className="ww-service-lead">{s.lead}</p>

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
            {s.legend[0]}
          </span>
          <span>
            <span className="ww-glow-dot ww-glow-dot--iris" style={{ width: 8, height: 8 }} aria-hidden />
            {s.legend[1]}
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
            {s.legend[2]}
          </span>
        </div>

        <ServiceCtaBand
          accentLabel={s.ctaLabel}
          title={s.ctaTitle}
          description={s.ctaDescription}
          ctaLabel={s.ctaButton}
          ctaHref={routes.contact}
          gradientRgb="139,124,255"
        />
      </div>
    </ServicePageLayout>
  );
}
