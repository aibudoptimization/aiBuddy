"use client";

import { ServiceContactBlock } from "@/components/services/ServiceContactBlock";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function FaqPage() {
  const { dict } = useLocale();
  const f = dict.faqPage;
  const s = dict.services;

  const groups = [
    { title: f.generalTitle, items: f.general },
    { title: s.automatisation.eyebrow, items: s.automatisation.faq },
    { title: s.agentsIa.eyebrow, items: s.agentsIa.faq },
    { title: s.integration.eyebrow, items: s.integration.faq },
    { title: s.sitesBoutiques.eyebrow, items: s.sitesBoutiques.faq },
    { title: s.conseil.eyebrow, items: s.conseil.faq },
  ];

  return (
    <ServicePageLayout
      accent="#4bfac8"
      accentAlt="#4bfac8"
      heroRgb="75,250,200"
      heroSecondaryRgb="139,124,255"
    >
      <div className="ww-container ww-svc">
        <div className="ww-service-eyebrow-row">
          <div className="ww-service-eyebrow">
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            {f.eyebrow}
          </div>
        </div>
        <h1 className="ww-service-title">{f.title}</h1>
        <p className="ww-service-lead">{f.lead}</p>

        {groups.map((g) => (
          <ServiceFaq key={g.title} title={g.title} items={g.items} openFirst={false} />
        ))}

        <ServiceContactBlock title={f.ctaTitle} description={f.ctaDescription} />
      </div>
    </ServicePageLayout>
  );
}
