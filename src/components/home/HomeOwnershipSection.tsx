"use client";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

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
        <TextReveal className="ww-section-title" as="h2">
          {o.title}
        </TextReveal>
        <EyebrowCanvas text={eyebrow} phase={0.52} />
      </div>
      <Reveal as="p" className="ww-section-lead" style={{ marginBottom: 52 }} delayMs={50}>
        {o.lead}
      </Reveal>
      <div className="ww-ownership-grid">
        {o.steps.map((step, i) => (
          <Reveal key={step.no} className="ww-ownership-step" delayMs={40 + i * 70}>
            <div className="ww-ownership-step__line">
              <span className="ww-ownership-step__num">{step.no}</span>
              <span className={i === 3 ? "ww-ownership-step__bar--end" : undefined} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="ww-ownership-footer" delayMs={120}>
        {o.footer}
      </Reveal>
    </section>
  );
}
