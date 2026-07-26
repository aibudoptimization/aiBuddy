"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * Value stack that primes the pricing section: what every mandate ships with,
 * regardless of which service it is. Replaces the former sky-accented
 * visibility band, whose own CTA competed with the price ask right below it.
 */
export function HomeIncludedStrip() {
  const { dict, routes } = useLocale();
  const inc = dict.home.included;

  return (
    <div className="ww-container ww-section">
      {/* Grid areas rather than nesting: on phones the link moves below the
          list, so two near-identical mono lines don't stack on each other. */}
      <div className="ww-included">
        <span className="ww-included__label ww-mono">{inc.label}</span>
        <ul className="ww-included__list">
          {inc.items.map((item) => (
            <li key={item} className="ww-included__item">
              <span
                className="ww-glow-dot"
                style={{ width: 6, height: 6 }}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href={routes.article("seo-geo-aeo")}
          className="ww-included__link ww-mono"
        >
          {inc.cta}
        </Link>
      </div>
    </div>
  );
}
