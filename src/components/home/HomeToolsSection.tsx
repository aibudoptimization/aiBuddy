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
        <h2 className="ww-tools-title">{dict.home.tools.title}</h2>
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
