"use client";

import Link from "next/link";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function HomeServicesSection() {
  const { dict, routes } = useLocale();
  const { services } = dict.home;

  return (
    <section
      id="services"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(70px, 11vh, 150px)",
        paddingBottom: "clamp(40px, 7vh, 90px)",
      }}
    >
      <div className="ww-section-header">
        <h2 className="ww-section-title">
          <TextReveal as="span">{services.titleLine1}</TextReveal>
          <br />
          <TextReveal as="span" staggerMs={28}>
            {services.titleLine2}
          </TextReveal>
        </h2>
        <EyebrowCanvas text={services.eyebrow} phase={0} />
      </div>
      <div className="ww-services-grid">
        {services.cards.map((service, i) => (
          <Reveal key={service.pathKey} delayMs={90 + i * 90}>
            <Link
              href={routes[service.pathKey]}
              className="ww-service-card"
              style={{ ["--service-accent" as string]: service.accent }}
            >
              <div className="ww-service-card__meta">
                <span className="ww-service-card__no" style={{ color: service.accent }}>
                  {service.no}
                </span>
                <span className="ww-mono ww-service-card__tag">{service.tag}</span>
              </div>
              <h3 className="ww-service-card__title">{service.title}</h3>
              <p className="ww-service-card__desc">{service.desc}</p>
              <div className="ww-service-card__items">
                {service.items.map((item) => (
                  <div key={item.t} className="ww-service-card__item">
                    <GlowBullet />
                    <span>{item.t}</span>
                    {item.soon ? <span className="ww-soon-badge">{services.soon}</span> : null}
                  </div>
                ))}
              </div>
              <div className="ww-service-card__cta" style={{ color: service.accent }}>
                {service.cta} <span>→</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
