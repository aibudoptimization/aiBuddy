"use client";

import Link from "next/link";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";

export function HomePricingSection() {
  const { dict, routes, locale } = useLocale();
  const p = dict.home.pricing;
  const eyebrow = locale === "en" ? "INVESTMENT" : "INVESTISSEMENT";

  return (
    <section
      id="tarifs"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <Reveal className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          {p.titleLine1}
          <br />
          {p.titleLine2}
        </h2>
        <EyebrowCanvas text={eyebrow} phase={0.76} />
      </Reveal>
      <Reveal as="p" className="ww-section-lead" style={{ marginBottom: 30 }} delayMs={50}>
        {p.lead}
      </Reveal>

      <div className="ww-consult-grid">
        <div className="ww-consult-card">
          <span className="ww-consult-badge">{p.consultEyebrow}</span>
          <h3>{p.consultTitle}</h3>
          <div className="ww-consult-list">
            {p.consultItems.map((line) => (
              <div key={line} className="ww-consult-list__item">
                <GlowBullet />
                {line}
              </div>
            ))}
          </div>
          <Link href={routes.contact} className="ww-cta-solid">
            {p.consultCta}
          </Link>
        </div>
        <div className="ww-quote-card">
          <span className="ww-mono ww-quote-card__label">{p.factorsHeading}</span>
          <div className="ww-quote-grid">
            {p.factors.map((factor) => (
              <div key={factor} className="ww-quote-item">
                <GlowBullet />
                {factor}
              </div>
            ))}
          </div>
          <p className="ww-quote-note">{p.factorsNote}</p>
        </div>
      </div>

      <div className="ww-payment-grid">
        {p.payment.map((note) => (
          <div key={note.no} className="ww-payment-note">
            <span>{note.no}</span>
            <div>
              <div className="ww-payment-note__title">{note.title}</div>
              <div className="ww-payment-note__desc">{note.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
