"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { useLocale } from "@/components/i18n/LocaleProvider";

export function HomeHero() {
  const { dict, routes } = useLocale();
  const { hero, city } = dict.home;

  return (
    <main className="ww-home-hero">
      <div style={{ overflow: "hidden", marginBottom: 26 }}>
        <div
          className="ww-mono ww-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: "12.5px",
            letterSpacing: "0.22em",
            color: "var(--mist)",
            animationDelay: "0.05s",
          }}
        >
          <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
          {hero.eyebrow}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <MapPin size={10} strokeWidth={2.2} aria-hidden />
            {city}, QC
          </span>
        </div>
      </div>

      <h1 className="ww-home-hero__title">
        <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
          <span className="ww-rise" style={{ display: "block", animationDelay: "0.12s" }}>
            {hero.h1Line1}
          </span>
        </span>
        <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
          <span className="ww-rise" style={{ display: "block", animationDelay: "0.26s" }}>
            {hero.h1Line2Before}
            <span className="ww-gradient-word">{hero.h1Gradient}</span>
            {hero.h1Line2After}
          </span>
        </span>
      </h1>

      <p className="ww-fade-up ww-home-hero__lead" style={{ animationDelay: "0.5s" }}>
        {hero.leadBefore}
        <strong style={{ color: "var(--teal)", fontWeight: 600 }}>{hero.leadCity}</strong>
        {hero.leadAfter}
      </p>

      <div
        className="ww-fade-up"
        style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40, animationDelay: "0.64s" }}
      >
        <Link href={routes.contact} className="ww-cta-fill">
          {hero.primaryCta}
        </Link>
        <Link href="#services" className="ww-cta-secondary">
          {hero.secondaryCta}
        </Link>
      </div>

      <div
        className="ww-fade-up ww-mono ww-home-hero__meta"
        style={{ animationDelay: "0.8s" }}
      >
        {hero.meta.map((item, i) => (
          <span key={item} className="ww-home-hero__meta-item">
            {i > 0 ? <span className="ww-home-hero__meta-sep" aria-hidden /> : null}
            {item}
          </span>
        ))}
      </div>
    </main>
  );
}
