"use client";

import Link from "next/link";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { WorkCard } from "@/components/realisations/WorkCard";
import { Reveal } from "@/components/ui/Reveal";

/** Compact proof strip: the latest live delivery + demos-as-proof note. */
export function HomeProofSection() {
  const { dict, routes } = useLocale();
  const p = dict.home.proof;
  const featured = dict.realisations.works[0];

  if (!featured) return null;

  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(40px, 7vh, 90px)",
      }}
    >
      <Reveal className="ww-section-header" style={{ marginBottom: 34 }}>
        <h2 className="ww-section-title">{p.title}</h2>
        <EyebrowCanvas text={p.eyebrow.toUpperCase()} phase={0.14} />
      </Reveal>

      <div className="ww-proof-grid">
        <Reveal delayMs={60}>
          <WorkCard
            work={{
              ...featured,
              tag: p.caseTag,
              title: p.caseTitle,
              desc: p.caseDesc,
              urlLabel: p.caseCta,
            }}
          />
        </Reveal>

        <Reveal className="ww-proof-aside" delayMs={130}>
          <p className="ww-proof-aside__note">{p.demoNote}</p>
          <Link href={routes.realisations} className="ww-cta-secondary">
            {p.pageCta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
