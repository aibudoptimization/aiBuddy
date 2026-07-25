"use client";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function HomeOwnershipSection() {
  const { dict } = useLocale();
  const o = dict.home.ownership;
  const eyebrow = "PROPRIÉTÉ";

  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          {o.title}
        </h2>
        <EyebrowCanvas text={eyebrow} phase={0.52} />
      </div>
      <p className="ww-section-lead" style={{ marginBottom: 52 }}>
        {o.lead}
      </p>
      <div className="ww-ownership-grid">
        {o.steps.map((step, i) => (
          <div key={step.no} className="ww-ownership-step">
            <div className="ww-ownership-step__line">
              <span className="ww-ownership-step__num">{step.no}</span>
              <span className={i === 3 ? "ww-ownership-step__bar--end" : undefined} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="ww-ownership-footer">
        {o.footer}
      </div>
    </section>
  );
}
