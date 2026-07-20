"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { WorkCard } from "@/components/realisations/WorkCard";
import { Reveal } from "@/components/ui/Reveal";

export function RealisationsPage() {
  const { dict, routes } = useLocale();
  const r = dict.realisations;

  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container"
          style={{
            paddingTop: "clamp(104px, 13vh, 132px)",
            paddingBottom: "clamp(64px, 12vh, 120px)",
          }}
        >
          <div
            className="ww-mono"
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
            {r.title}
          </h1>
          <p
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

          <div className="ww-work-grid">
            {r.works.map((work, i) => (
              <Reveal key={work.url} delayMs={60 + i * 80}>
                <WorkCard work={work} />
              </Reveal>
            ))}
            <Reveal className="ww-work-upcoming" delayMs={60 + r.works.length * 80}>
              <p>{r.upcomingNote}</p>
            </Reveal>
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
