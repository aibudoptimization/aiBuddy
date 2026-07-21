"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { INTEGRATION_TOOLS, type IntegrationTool } from "@/content/tools";

const MID = Math.ceil(INTEGRATION_TOOLS.length / 2);
const ROWS = [INTEGRATION_TOOLS.slice(0, MID), INTEGRATION_TOOLS.slice(MID)];

function ToolChip({ tool }: { tool: IntegrationTool }) {
  return (
    <span className="ww-tool-chip">
      <svg
        className="ww-tool-chip__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ color: tool.color }}
      >
        <path fill="currentColor" d={tool.path} />
      </svg>
      {tool.name}
    </span>
  );
}

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
      <div className="ww-tools-marquee">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="ww-tools-marquee__row">
            <div
              className={
                rowIndex % 2 === 1
                  ? "ww-tools-marquee__track ww-tools-marquee__track--reverse"
                  : "ww-tools-marquee__track"
              }
            >
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="ww-tools-marquee__half"
                  aria-hidden={dup === 1 || undefined}
                >
                  {row.map((tool) => (
                    <ToolChip key={tool.name} tool={tool} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="ww-tools-more">{dict.home.tools.more}</span>
    </section>
  );
}
