"use client";

import { useEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { getContactHref } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CalScheduleAuditButton } from "@/components/cal/CalScheduleAuditButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const contactHref = getContactHref();
  const sectionRef = useRef<HTMLElement>(null);
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
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden border-b border-[var(--border)] py-16 sm:py-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="hero-glow-orb absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-[var(--glow-1)] opacity-[0.32] blur-3xl motion-reduce:opacity-20" />
        <div className="hero-glow-orb-alt absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--glow-2)] opacity-[0.28] blur-3xl motion-reduce:opacity-20" />
      </div>

      <Container className="relative">
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
            <CalScheduleAuditButton variant="primary" className="min-h-12 px-6 py-3 text-sm">
              Get started
            </CalScheduleAuditButton>
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
