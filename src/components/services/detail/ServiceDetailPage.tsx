"use client";

import Image from "next/image";

import { ServiceContactBlock } from "@/components/services/ServiceContactBlock";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceDetailCopy } from "@/content/i18n/types";
import { hexToRgb } from "@/lib/accents";

type ServiceDetailPageProps = {
  copy: ServiceDetailCopy;
  accent: string;
  /** Hero particle color (defaults to accent). */
  heroRgb?: string;
  /** Hero particles drift toward this (defaults to iris). */
  heroSecondaryRgb?: string;
  /** Optional hero artwork rendered under the lead. */
  heroImage?: { src: string; alt: string };
};

export function ServiceDetailPage({
  copy: s,
  accent,
  heroRgb,
  heroSecondaryRgb,
  heroImage,
}: ServiceDetailPageProps) {
  return (
    <ServicePageLayout
      accent={accent}
      accentAlt={accent}
      heroRgb={heroRgb ?? hexToRgb(accent)}
      heroSecondaryRgb={heroSecondaryRgb}
    >
      <div className="ww-container ww-svc">
        {/* Hero */}
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span
              className="ww-glow-dot"
              style={{
                width: 7,
                height: 7,
                background: accent,
                boxShadow: `0 0 9px rgba(${hexToRgb(accent)},0.7)`,
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

        {heroImage ? (
          <div className="ww-svc-hero-img">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1180px"
              className="ww-svc-hero-img__el"
            />
          </div>
        ) : null}

        {/* What it is */}
        <Reveal as="section" className="ww-svc-section ww-svc-what">
          <div className="ww-svc-eyebrow ww-mono">{s.whatTitle}</div>
          <div className="ww-svc-what__body">
            {s.whatBody.map((p, i) => (
              <p key={i} className="ww-svc-what__p">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* What's included */}
        <Reveal as="section" className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.includedTitle}</h2>
          <div className="ww-svc-grid">
            {s.included.map((it) => (
              <div key={it.title} className="ww-svc-card">
                <span className="ww-svc-dot" aria-hidden />
                <div className="ww-svc-card__title">{it.title}</div>
                <div className="ww-svc-card__desc">{it.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Process */}
        <Reveal as="section" className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.processTitle}</h2>
          <div className="ww-svc-steps">
            {s.process.map((step, i) => (
              <div key={step.title} className="ww-svc-step">
                <div className="ww-svc-step__no">{String(i + 1).padStart(2, "0")}</div>
                <div className="ww-svc-step__title">{step.title}</div>
                <div className="ww-svc-step__desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Use cases */}
        <Reveal as="section" className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.useCasesTitle}</h2>
          <div className="ww-svc-grid">
            {s.useCases.map((c) => (
              <div key={c.title} className="ww-svc-card">
                <span className="ww-svc-dot" aria-hidden />
                <div className="ww-svc-card__title">{c.title}</div>
                <div className="ww-svc-card__desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Outcomes */}
        <Reveal as="section" className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.outcomesTitle}</h2>
          <div className="ww-svc-outcomes">
            {s.outcomes.map((o, i) => (
              <div key={i} className="ww-svc-outcome">
                {o.stat ? <div className="ww-svc-outcome__stat">{o.stat}</div> : null}
                <div className="ww-svc-outcome__label">{o.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FAQ */}
        <ServiceFaq title={s.faqTitle} items={s.faq} />

        {/* Discovery CTA + form */}
        <ServiceContactBlock
          kicker={s.ctaLabel}
          title={s.ctaTitle}
          description={s.ctaDescription}
        />
      </div>
    </ServicePageLayout>
  );
}
