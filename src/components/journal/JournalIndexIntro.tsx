"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeroReveal } from "@/components/ui/HeroReveal";

export function JournalIndexIntro() {
  const { dict } = useLocale();
  const j = dict.journalIndex;

  return (
    <HeroReveal
      as="section"
      className="ww-container ww-page-head"
      style={{ paddingBottom: "clamp(30px, 5vh, 54px)" }}
    >
      <div
        className="ww-mono ww-hero-fade"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontSize: "12.5px",
          letterSpacing: "0.22em",
          color: "rgba(244,243,247,0.62)",
          marginBottom: 26,
        }}
      >
        <span
          style={{
            flex: "none",
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "#6aa8ff",
            boxShadow: "0 0 9px rgba(106,168,255,0.75)",
          }}
          aria-hidden
        />
        {j.eyebrow}
      </div>
      <h1
        style={{
          margin: 0,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          fontSize: "clamp(40px, 6.4vw, 84px)",
          maxWidth: "14ch",
          textWrap: "balance",
        }}
      >
        <span className="ww-hero-line">
          <span>{j.title}</span>
        </span>
      </h1>
      <p
        className="ww-hero-fade"
        style={{
          maxWidth: 560,
          margin: "26px 0 0",
          fontSize: "clamp(16px, 1.4vw, 19px)",
          lineHeight: 1.55,
          color: "rgba(244,243,247,0.66)",
        }}
      >
        {j.lead}
      </p>
    </HeroReveal>
  );
}
