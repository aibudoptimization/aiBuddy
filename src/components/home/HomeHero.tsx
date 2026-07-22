"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { useLocale } from "@/components/i18n/LocaleProvider";

const ROTATE_HOLD_MS = 3400;
const ROTATE_FIRST_MS = 3800;
const ROTATE_FALL_MS = 1200;

/**
 * Gradient word that falls off the line on intervals while the next one
 * drops in to take its place. Words are stacked in one inline-grid cell, so
 * they all share the exact same glyph position as the invisible sizer (the
 * longest word). The first word is the SSR/static one (SEO + screen readers).
 */
function RotatingGradientWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let clearPrevT = 0;
    const tick = () => {
      if (document.hidden) return;
      const next = (indexRef.current + 1) % words.length;
      setPrev(indexRef.current);
      indexRef.current = next;
      setIndex(next);
      setEntered(true);
      window.clearTimeout(clearPrevT);
      clearPrevT = window.setTimeout(() => setPrev(null), ROTATE_FALL_MS);
    };

    let interval = 0;
    const start = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, ROTATE_HOLD_MS);
    }, ROTATE_FIRST_MS);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(clearPrevT);
      window.clearInterval(interval);
    };
  }, [words]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <>
      <span className="ww-sr-only">{words[0]}</span>
      <span className="ww-rotate" aria-hidden>
        <span className="ww-rotate__sizer">{longest}</span>
        {words.map((word, i) => (
          <span
            key={word}
            className={`ww-gradient-word ww-rotate__word${
              i === index
                ? entered
                  ? " is-entering"
                  : " is-current"
                : i === prev
                  ? " is-leaving"
                  : " is-waiting"
            }`}
          >
            {word}
          </span>
        ))}
      </span>
    </>
  );
}

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
            {hero.h1MobileBreak ? <br className="ww-hero-break" aria-hidden /> : null}
            <RotatingGradientWord words={hero.h1GradientWords} />
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
