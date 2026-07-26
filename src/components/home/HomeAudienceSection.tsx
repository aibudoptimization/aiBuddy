"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function HomeAudienceSection() {
  const { dict, routes } = useLocale();
  const a = dict.home.audience;
  const eyebrow = "POUR QUI ?";

  return (
    <section
      id="approche"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          {a.titleLine1}
          <br />
          {a.titleLine2}
        </h2>
        <EyebrowCanvas text={eyebrow} phase={0.28} />
      </div>
      <p className="ww-section-lead">
        {a.lead}
      </p>

      <div className="ww-fit-grid">
        <div className="ww-fit-card ww-fit-card--yes">
          <div className="ww-fit-card__head">
            <span className="ww-fit-icon ww-fit-icon--yes">
              <Check size={13} strokeWidth={3} color="#07070b" />
            </span>
            <h3>{a.fitTitle}</h3>
          </div>
          {a.fit.map((line) => (
            <div key={line} className="ww-fit-line ww-fit-line--yes">
              <GlowBullet />
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="ww-fit-card">
          <div className="ww-fit-card__head">
            <span className="ww-fit-icon">
              <X size={12} strokeWidth={3} color="rgba(244,243,247,0.62)" />
            </span>
            <h3 className="ww-fit-card__muted">{a.notFitTitle}</h3>
          </div>
          {a.notFit.map((line) => (
            <div key={line} className="ww-fit-line ww-fit-line--no">
              <span className="ww-fit-dash" aria-hidden />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="ww-fit-resolve">
        <span>{a.resolveLine}</span>{" "}
        <Link href={routes.contact} className="ww-fit-resolve__link">
          {a.resolveCta}
        </Link>
      </p>
    </section>
  );
}
