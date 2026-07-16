"use client";

import { ServiceCtaBand } from "@/components/services/ServiceCtaBand";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { hexToRgb } from "@/lib/accents";

import { WorkflowStage } from "./WorkflowStage";

const ACCENT = "#4bfac8";
const ACCENT_ALT = "#8b7cff";

export function AutomatisationPage() {
  const { dict, routes } = useLocale();
  const s = dict.services.automatisation;
  const heroRgb = hexToRgb(ACCENT);
  const altRgb = hexToRgb(ACCENT_ALT);

  return (
    <ServicePageLayout accent={ACCENT} heroRgb={heroRgb}>
      <div className="ww-container">
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            {s.eyebrow}
          </div>
          <span className="ww-service-live">
            <span
              className="ww-glow-dot ww-service-live__dot"
              style={{ width: 7, height: 7 }}
              aria-hidden
            />
            {s.live}
          </span>
        </div>

        <h1 className="ww-service-title">
          {s.h1Before}
          <span style={{ color: ACCENT }}>{s.h1Accent}</span>
          {s.h1After}
        </h1>
        <p className="ww-service-lead">{s.lead}</p>

        <div className="ww-service-pill-banner">
          <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
          <span>
            {s.pill}
            <span style={{ color: "rgba(244,243,247,0.6)" }}>{s.pillMuted}</span>
          </span>
        </div>

        <WorkflowStage accent={ACCENT} accentAlt={ACCENT_ALT} speed="calme" />

        <div className="ww-service-legend">
          <span>
            <span className="ww-glow-dot" style={{ width: 8, height: 8 }} aria-hidden />
            {s.legend[0]}
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
            {s.legend[1]}
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
            {s.legend[2]}
          </span>
          <span style={{ opacity: 0.6 }}>{s.legend[3]}</span>
        </div>

        <ServiceCtaBand
          accentLabel={s.ctaLabel}
          title={s.ctaTitle}
          description={s.ctaDescription}
          ctaLabel={s.ctaButton}
          ctaHref={routes.contact}
          gradientRgb={altRgb}
        />
      </div>
    </ServicePageLayout>
  );
}
