"use client";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { ServiceSphereCarousel } from "@/components/home/ServiceSphereCarousel";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function HomeServicesSection() {
  const { dict } = useLocale();
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
      <Reveal as="p" className="ww-section-lead" delayMs={50}>
        {services.lead}
      </Reveal>
      <Reveal delayMs={120}>
        <ServiceSphereCarousel />
      </Reveal>
    </section>
  );
}
