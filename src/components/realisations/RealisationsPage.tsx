"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { StaticAmbient } from "@/components/canvas/StaticAmbient";
import { WorkCard } from "@/components/realisations/WorkCard";
import { HeroReveal } from "@/components/ui/HeroReveal";

export function RealisationsPage() {
  const { dict, routes } = useLocale();
  const r = dict.realisations;

  return (
    <div className="ww-journal-page">
      <StaticAmbient quiet />

      <div className="ww-journal-page__content">
        <section
          className="ww-container ww-page-head"
          style={{ paddingBottom: "clamp(64px, 12vh, 120px)" }}
        >
          <HeroReveal>
          <div
            className="ww-mono ww-hero-fade"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: "12.5px",
              letterSpacing: "0.22em",
              color: "rgba(244,243,247,0.62)",
              marginBottom: 22,
            }}
          >
            <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
            {r.eyebrow.toUpperCase()}
          </div>

          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(32px, 5vw, 56px)",
            }}
          >
            <span className="ww-hero-line">
              <span>{r.title}</span>
            </span>
          </h1>
          <p
            className="ww-hero-fade"
            style={{
              margin: "18px 0 0",
              maxWidth: 560,
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.6,
              color: "rgba(244,243,247,0.6)",
            }}
          >
            {r.lead}
          </p>
          </HeroReveal>

          <div className="ww-work-grid">
            {r.works.map((work, i) => (
              <div key={work.url}>
                <WorkCard work={work} />
              </div>
            ))}
            <div className="ww-work-upcoming">
              <p>{r.upcomingNote}</p>
            </div>
          </div>

          <div className="ww-service-cta" style={{ marginTop: "clamp(40px, 7vh, 72px)" }}>
            <div>
              <div className="ww-mono ww-service-cta__label" style={{ color: "var(--teal)" }}>
                {r.ctaLabel}
              </div>
              <div className="ww-service-cta__title">{r.ctaTitle}</div>
              <div className="ww-service-cta__desc">{r.ctaDescription}</div>
            </div>
            <Link href={routes.contact} className="ww-cta-fill ww-service-cta__btn">
              {r.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
