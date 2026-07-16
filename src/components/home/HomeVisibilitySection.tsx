"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal, TextReveal } from "@/components/ui/TextReveal";

/** Sky-accented bridge: visibility / SEO·GEO·AEO (replaces former 4th service card). */
export function HomeVisibilitySection() {
  const { dict, routes } = useLocale();
  const v = dict.home.visibility;

  return (
    <section className="ww-visibility" aria-labelledby="ww-visibility-title">
      <div className="ww-container ww-visibility__inner">
        <Reveal>
          <div className="ww-visibility__eyebrow ww-mono">
            <span
              className="ww-glow-dot"
              style={{
                width: 7,
                height: 7,
                background: "var(--sky)",
                boxShadow: "0 0 9px rgba(106,168,255,0.75)",
              }}
              aria-hidden
            />
            {v.eyebrow}
          </div>
          <LineReveal>
            <TextReveal
              id="ww-visibility-title"
              as="h2"
              className="ww-visibility__title"
              staggerMs={32}
            >
              {v.title}
            </TextReveal>
          </LineReveal>
          <p className="ww-visibility__lead">{v.lead}</p>
          <p className="ww-visibility__micro ww-mono">{v.micro}</p>
          <div className="ww-visibility__actions">
            <Link href={routes.contact} className="ww-cta-fill">
              {v.primaryCta}
            </Link>
            <Link href={routes.article("seo-geo-aeo")} className="ww-cta-secondary">
              {v.secondaryCta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
