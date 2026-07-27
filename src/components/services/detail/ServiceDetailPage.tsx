"use client";

import { ServiceContactBlock } from "@/components/services/ServiceContactBlock";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { ServiceMock, hasMock, mockLabel } from "@/components/services/detail/ServiceMocks";
import { ServiceRowIconMark } from "@/components/services/serviceRowIcons";
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
        <ServiceHero
          eyebrow={s.eyebrow}
          h1Before={s.h1Before}
          h1Accent={s.h1Accent}
          h1After={s.h1After}
          lead={s.lead}
          accent={accent}
          image={heroImage}
        />

        {/* What it is */}
        <section className="ww-svc-section ww-svc-what">
          <div className="ww-svc-eyebrow ww-mono">{s.whatTitle}</div>
          <div className="ww-svc-what__body">
            {s.whatBody.map((p, i) => (
              <p key={i} className="ww-svc-what__p">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* What's included. Where every row has a mock, the section becomes
            alternating showcase rows: copy one side, a fragment of the thing
            itself on the other. Pages without mocks keep the card grid. */}
        <section className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.includedTitle}</h2>
          {s.included.every((it) => hasMock(it.icon)) ? (
            <div className="ww-svc-rows">
              {s.included.map((it, i) => (
                <article key={it.title} className="ww-svc-row">
                  <div className="ww-svc-row__copy">
                    <ServiceRowIconMark icon={it.icon} />
                    <h3 className="ww-svc-row__title">{it.title}</h3>
                    <p className="ww-svc-row__desc">{it.desc}</p>
                  </div>
                  <div className="ww-svc-row__panel">
                    {/* Names the state being shown, not the heading beside it. */}
                    <div className="ww-svc-row__panel-head ww-mono">
                      <span>{mockLabel(it.icon)}</span>
                      <span className="ww-svc-row__panel-no">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <ServiceMock icon={it.icon} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="ww-svc-grid">
              {s.included.map((it) => (
                <div key={it.title} className="ww-svc-card">
                  <ServiceRowIconMark icon={it.icon} />
                  <div className="ww-svc-card__title">{it.title}</div>
                  <div className="ww-svc-card__desc">{it.desc}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Process */}
        <section className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.processTitle}</h2>
          {/* Connected rail rather than four loose boxes, so the eye reads it
              as one sequence. Same language as the home page's Propriété. */}
          <ol className="ww-svc-steps">
            {s.process.map((step, i) => (
              <li key={step.title} className="ww-svc-step">
                <span className="ww-svc-step__no ww-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ww-svc-step__bar" aria-hidden />
                <span className="ww-svc-step__title">{step.title}</span>
                <span className="ww-svc-step__desc">{step.desc}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Use cases. Deliberately not the same card grid as "included" above:
            two identical grids read as one undifferentiated block. These are
            situations to recognise, so they get a denser list. */}
        <section className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.useCasesTitle}</h2>
          <ul className="ww-svc-uses">
            {s.useCases.map((c) => (
              <li key={c.title} className="ww-svc-use">
                <ServiceRowIconMark icon={c.icon} />
                <div className="ww-svc-use__body">
                  <span className="ww-svc-use__title">{c.title}</span>
                  <span className="ww-svc-use__desc">{c.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes */}
        <section className="ww-svc-section">
          <h2 className="ww-svc-h2">{s.outcomesTitle}</h2>
          <div className="ww-svc-outcomes">
            {s.outcomes.map((o, i) => (
              <div key={i} className="ww-svc-outcome">
                {o.stat ? <div className="ww-svc-outcome__stat">{o.stat}</div> : null}
                <div className="ww-svc-outcome__label">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

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
