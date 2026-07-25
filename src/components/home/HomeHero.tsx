"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { HeroGlobe } from "@/components/canvas/HeroGlobe";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeroReveal } from "@/components/ui/HeroReveal";
import { HeroWords } from "@/components/ui/HeroWords";
import { INTRO_DONE_EVENT, INTRO_HOLD_ATTR } from "@/lib/introFlag";

const ROTATE_HOLD_MS = 3400;
const ROTATE_FIRST_MS = 3800;
const ROTATE_FALL_MS = 1200;

/** Second headline line starts a beat after the first line's words. */
const HERO_LINE2_MS = 190;

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
    let interval = 0;
    let startT = 0;
    let failsafeT = 0;

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

    const beginCycle = () => {
      if (startT || interval) return;
      startT = window.setTimeout(() => {
        tick();
        interval = window.setInterval(tick, ROTATE_HOLD_MS);
      }, ROTATE_FIRST_MS);
    };

    // Counting from page load would spend most of the first word's turn
    // behind the splash, so it would swap almost as soon as the curtain
    // lifted. Start the cycle when the hero is actually on screen.
    const held = document.documentElement.hasAttribute(INTRO_HOLD_ATTR);
    if (!held) {
      beginCycle();
    } else {
      window.addEventListener(INTRO_DONE_EVENT, beginCycle, { once: true });
      // The pre-paint script clears the hold on its own after 6s if the
      // splash never runs; don't let the word sit frozen in that case.
      failsafeT = window.setTimeout(beginCycle, 6500);
    }

    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, beginCycle);
      window.clearTimeout(startT);
      window.clearTimeout(failsafeT);
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
  // The mask-up wrapper clips its line while the reveal plays. It has to let
  // go once the lines have landed, otherwise that same clip slices the
  // rotating word every time it falls off the line.
  const [settled, setSettled] = useState(false);

  return (
    <main className="ww-home-hero">
      <div className="ww-home-hero__inner">
        {/* The entrance is held paused by html[data-ww-hold] until the splash
            finishes (see globals.css), so it plays once, in view. */}
        <HeroReveal className="ww-home-hero__copy">
          <div
            className="ww-mono ww-hero-fade"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 26,
              fontSize: "12.5px",
              letterSpacing: "0.22em",
              color: "var(--mist)",
            }}
          >
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            {hero.eyebrow}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <MapPin size={10} strokeWidth={2.2} aria-hidden />
              {city}, QC
            </span>
          </div>

          <h1
            className={`ww-home-hero__title${settled ? " is-settled" : ""}`}
            // Only the last word may settle the headline: releasing the clips
            // while earlier-delayed words are still rising would let them
            // spill out of their masks.
            onAnimationEnd={(e) => {
              if (
                e.animationName.includes("hero-line") &&
                (e.target as HTMLElement).parentElement?.classList.contains(
                  "ww-hero-word--last",
                )
              ) {
                setSettled(true);
              }
            }}
          >
            <HeroWords text={hero.h1Line1} startMs={0} />
            <HeroWords
              text={hero.h1Line2Before}
              startMs={HERO_LINE2_MS}
              beforeTrailing={
                hero.h1MobileBreak ? <br className="ww-hero-break" aria-hidden /> : null
              }
              trailing={<RotatingGradientWord words={hero.h1GradientWords} />}
            />
          </h1>

          <p className="ww-hero-fade ww-home-hero__lead">
            {hero.leadBefore}
            <strong style={{ color: "var(--teal)", fontWeight: 600 }}>{hero.leadCity}</strong>
            {hero.leadAfter}
          </p>

          <div
            className="ww-hero-fade"
            style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}
          >
            <Link href={routes.contact} className="ww-cta-fill">
              {hero.primaryCta}
            </Link>
            <Link href="#services" className="ww-cta-secondary">
              {hero.secondaryCta}
            </Link>
          </div>

          <div className="ww-hero-fade ww-mono ww-home-hero__meta">
            {hero.meta.map((item, i) => (
              <span key={item} className="ww-home-hero__meta-item">
                {i > 0 ? <span className="ww-home-hero__meta-sep" aria-hidden /> : null}
                {item}
              </span>
            ))}
          </div>
        </HeroReveal>

        <div
          className="ww-home-hero__globe ww-hero-fade"
          style={{ ["--hero-delay" as string]: "300ms" }}
          aria-hidden
        >
          <HeroGlobe />
        </div>
      </div>
    </main>
  );
}
