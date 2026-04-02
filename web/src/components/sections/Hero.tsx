"use client";

import { useEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { getContactHref, getN8nFormUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

const HERO_VIDEO_SRC = "/video/hero-background.mp4?v=3";
const HERO_VIDEO_PLAYBACK_RATE = 0.75;

export function Hero() {
  const contactHref = getContactHref();
  const formHref = getN8nFormUrl();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollFade, setScrollFade] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const h = Math.max(el.offsetHeight, 1);
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / (h * 0.42)));
      setScrollFade(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;

    const applyPlaybackRate = () => {
      v.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    };
    applyPlaybackRate();
    v.addEventListener("loadedmetadata", applyPlaybackRate);

    const p = v.play();
    if (p !== undefined) {
      void p.catch(() => {
        /* autoplay may be deferred; muted + playsInline usually succeeds */
      });
    }

    return () => v.removeEventListener("loadedmetadata", applyPlaybackRate);
  }, [reduceMotion]);

  const contentStyle =
    reduceMotion === true
      ? undefined
      : {
          opacity: Math.max(0.08, 1 - scrollFade * 0.92),
          transform: `translate3d(0, ${-scrollFade * 52}px, 0) scale(${1 - scrollFade * 0.045})`,
        };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden border-b border-[var(--border)] py-24 sm:py-32"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {!reduceMotion ? (
          <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--background)]">
            <video
              ref={videoRef}
              className="absolute left-1/2 top-1/2 block min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.08] object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        ) : null}
        <div
          className="absolute inset-0 z-[1] bg-[color-mix(in_oklab,var(--background)_52%,transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(50dvh,58%)]"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 72%, transparent) 38%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <div style={contentStyle}>
          <p className="hero-in mb-4 max-w-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {homeContent.tagline}
          </p>
          <h1
            id="hero-heading"
            className="hero-in hero-in-delay-1 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.06] lg:text-6xl lg:leading-[1.05]"
          >
            {homeContent.hero.headline}
          </h1>
          <p className="hero-in hero-in-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            {homeContent.hero.sub}
          </p>
          <div className="hero-in hero-in-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={formHref} variant="primary" className="min-h-12 px-6 py-3 text-sm">
              Get started
            </ButtonLink>
            <ButtonLink href={contactHref} variant="secondary" className="min-h-12 px-6 py-3 text-sm">
              Get in touch
            </ButtonLink>
          </div>
          <p className="hero-in hero-in-delay-4 mt-6 text-sm text-[var(--muted)]">
            Prefer email? Use Get in touch—no forms required unless you want them later.
          </p>
        </div>
      </Container>
    </section>
  );
}
