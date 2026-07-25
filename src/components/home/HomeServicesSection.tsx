"use client";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { ServiceSphereCarousel } from "@/components/home/ServiceSphereCarousel";
import { useLocale } from "@/components/i18n/LocaleProvider";

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
          <span>{services.titleLine1}</span>
          <br />
          <span>
            {services.titleLine2}
          </span>
        </h2>
        <EyebrowCanvas text={services.eyebrow} phase={0} />
      </div>
      <p className="ww-section-lead">
        {services.lead}
      </p>
      <div>
        <ServiceSphereCarousel />
      </div>
    </section>
  );
}
