"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export function JournalIndexIntro() {
  const { dict } = useLocale();
  const j = dict.journalIndex;

  return (
    <section
      className="ww-container"
      style={{
        paddingTop: "clamp(100px, 12vh, 120px)",
        paddingBottom: "clamp(30px, 5vh, 54px)",
      }}
    >
      <div
        className="ww-mono"
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
        {j.title}
      </h1>
      <p
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
    </section>
  );
}
