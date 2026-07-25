"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";

/** Sky-accented bridge: visibility / SEO·GEO·AEO (replaces former 4th service card). */
export function HomeVisibilitySection() {
  const { dict, routes } = useLocale();
  const v = dict.home.visibility;

  return (
    <section className="ww-visibility" aria-labelledby="ww-visibility-title">
      <div className="ww-container ww-visibility__inner">
        <div>
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
          <div className="ww-line-reveal">
            <h2 id="ww-visibility-title" className="ww-visibility__title">
              {v.title}
            </h2>
          </div>
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
        </div>
      </div>
    </section>
  );
}
