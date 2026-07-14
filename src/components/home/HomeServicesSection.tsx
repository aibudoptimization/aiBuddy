import Link from "next/link";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { HOME_SERVICES } from "@/content/home";

export function HomeServicesSection() {
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
          Moins de tâches répétitives.
          <br />
          Plus de temps pour votre croissance.
        </h2>
        <EyebrowCanvas text="CE QU'ON FAIT POUR VOUS" phase={0} />
      </div>
      <div className="ww-services-grid">
        {HOME_SERVICES.map((service) => (
          <Link key={service.href} href={service.href} className="ww-service-card">
            <div className="ww-service-card__meta">
              <span className="ww-service-card__no">{service.no}</span>
              <span className="ww-mono ww-service-card__tag">{service.tag}</span>
            </div>
            <h3 className="ww-service-card__title">{service.title}</h3>
            <p className="ww-service-card__desc">{service.desc}</p>
            <div className="ww-service-card__items">
              {service.items.map((item) => (
                <div key={item.t} className="ww-service-card__item">
                  <GlowBullet />
                  <span>{item.t}</span>
                  {item.soon ? <span className="ww-soon-badge">Bientôt</span> : null}
                </div>
              ))}
            </div>
            {service.cta ? (
              <div className="ww-service-card__cta">
                {service.cta} <span>→</span>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
