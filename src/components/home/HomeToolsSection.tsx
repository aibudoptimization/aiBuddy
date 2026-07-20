"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { INTEGRATION_TOOLS } from "@/content/tools";

export function HomeToolsSection() {
  const { dict } = useLocale();

  return (
    <section
      className="ww-container ww-section ww-section--center"
      style={{
        paddingTop: "clamp(30px, 6vh, 70px)",
        paddingBottom: "clamp(50px, 8vh, 90px)",
      }}
    >
      <Reveal>
        <h2 className="ww-tools-title" style={{ marginBottom: 10 }}>
          {dict.home.tools.title}
        </h2>
        <p
          style={{
            margin: "0 auto 38px",
            maxWidth: 520,
            fontSize: "14.5px",
            lineHeight: 1.55,
            color: "rgba(244,243,247,0.55)",
          }}
        >
          {dict.home.tools.subtitle}
        </p>
      </Reveal>
      <div className="ww-tools-grid">
        {INTEGRATION_TOOLS.map((name) => (
          <span key={name} className="ww-tool-chip">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
