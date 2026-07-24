"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { createAmbientClock } from "@/lib/canvas/ambient";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";

const STEP = 72; // 360° / 5 cards
const IDLE_MS = 4600;
const ACCENT_RGB = "75,250,200";
const SECONDARY_RGB = "139,124,255";

/** Shortest signed distance from `angle` to the front position (0°). */
function frontOffset(angle: number): number {
  return ((angle % 360) + 540) % 360 - 180;
}

/**
 * The 5 service cards orbit the brand globe (the same canvas drawing that
 * used to live in the hero). Rotation is driven by pointer drag with a
 * velocity fling, snaps card-to-card, and drifts on its own until the first
 * interaction. Transforms are applied directly to the DOM from a rAF loop —
 * React state only tracks the active index for dots/aria.
 */
export function ServiceSphereCarousel() {
  const { dict, routes } = useLocale();
  const { services } = dict.home;
  const cards = services.cards;
  const n = cards.length;

  const sceneRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rot = useRef(0);
  const target = useRef(0);
  const dragging = useRef(false);
  const dragStart = useRef<{ x: number; rot: number } | null>(null);
  const samples = useRef<{ t: number; x: number }[]>([]);
  const moved = useRef(0);
  const spread = useRef(320);
  const interacted = useRef(false);
  const visible = useRef(true);
  const reduced = useRef(false);

  const [active, setActive] = useState(0);
  const [minH, setMinH] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const activeFromRot = useCallback(
    (r: number) => ((Math.round(-r / STEP) % n) + n) % n,
    [n],
  );

  /** Position/scale/dim every card for the given rotation. */
  const apply = useCallback((r: number) => {
    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const offset = frontOffset(i * STEP + r);
      const rad = (offset * Math.PI) / 180;
      const depth = Math.cos(rad); // 1 front … -1 back
      const norm = (depth + 1) / 2;
      const x = Math.sin(rad) * spread.current;
      const scale = 0.72 + 0.28 * norm;
      const y = (1 - norm) * 14;
      el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      el.style.opacity = String(0.24 + 0.76 * norm ** 1.5);
      el.style.zIndex = String(100 + Math.round(depth * 90));
      el.style.filter = norm < 0.92 ? `blur(${((0.92 - norm) * 2.6).toFixed(2)}px)` : "none";
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      interacted.current = true;
      const delta = frontOffset(-index * STEP - target.current);
      target.current += delta;
      if (reduced.current) {
        rot.current = target.current;
        apply(rot.current);
      }
      setActive(index);
    },
    [apply],
  );

  const goBy = useCallback(
    (dir: 1 | -1) => {
      interacted.current = true;
      target.current = Math.round(target.current / STEP) * STEP - dir * STEP;
      if (reduced.current) {
        rot.current = target.current;
        apply(rot.current);
      }
      setActive(activeFromRot(target.current));
    },
    [apply, activeFromRot],
  );

  // Measure: card heights drive the scene height; width drives the spread.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const measure = () => {
      const cw = scene.clientWidth;
      let maxH = 0;
      for (const el of cardRefs.current) {
        if (el) maxH = Math.max(maxH, el.offsetHeight);
      }
      const cardW = cardRefs.current[0]?.offsetWidth ?? 400;
      spread.current = Math.max(120, Math.min(cw * 0.42, cw / 2 - cardW * 0.22));
      setMinH(maxH + 56);
      const globe = globeRef.current;
      if (globe) {
        // Wide enough that the rings arc past the front card's edges; on
        // narrow screens (card ≈ scene width) grow with card height instead
        // so the rings peek above and below the card.
        const size = Math.min(Math.max(cw * 0.98, maxH * 1.3), 780);
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        globe.style.width = `${size}px`;
        globe.style.height = `${size}px`;
        globe.width = size * dpr;
        globe.height = size * dpr;
        globe.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      apply(rot.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    return () => ro.disconnect();
  }, [apply]);

  // Animation loop: globe drawing + spring toward the snap target.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const globe = globeRef.current;
    const gctx = globe?.getContext("2d") ?? null;
    const rings = initGlobeRings();

    apply(rot.current);

    if (reduced.current) {
      // Single static globe frame, no drift, no spring.
      if (gctx && globe) {
        drawGlobe(gctx, globe.clientWidth, globe.clientHeight, ACCENT_RGB, SECONDARY_RGB, rings, 0, {
          radiusFactor: 0.46,
          intensity: 1.1,
        });
      }
      return;
    }

    const clock = createAmbientClock();
    let raf = 0;
    let lastNow = 0;
    const loop = (now: number) => {
      const t = clock(now);
      const dt = Math.min(48, lastNow ? now - lastNow : 16);
      lastNow = now;
      if (gctx && globe) {
        drawGlobe(gctx, globe.clientWidth, globe.clientHeight, ACCENT_RGB, SECONDARY_RGB, rings, t, {
          radiusFactor: 0.46,
          intensity: 1.1,
        });
      }
      if (!dragging.current) {
        const diff = target.current - rot.current;
        if (Math.abs(diff) > 0.02) {
          rot.current += diff * Math.min(1, dt * 0.0075);
          apply(rot.current);
        } else if (rot.current !== target.current) {
          rot.current = target.current;
          apply(rot.current);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Idle drift until the visitor takes over.
    const drift = window.setInterval(() => {
      if (interacted.current || !visible.current || document.hidden) return;
      target.current -= STEP;
      setActive(activeFromRot(target.current));
    }, IDLE_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(drift);
    };
  }, [apply, activeFromRot]);

  // Pause the idle drift while the section is off-screen.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(scene);
    return () => io.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    interacted.current = true;
    dragging.current = true;
    dragStart.current = { x: e.clientX, rot: rot.current };
    samples.current = [{ t: performance.now(), x: e.clientX }];
    moved.current = 0;
    setIsDragging(true);
  };

  useEffect(() => {
    const degPerPx = () => STEP / Math.max(140, spread.current * 1.15);
    const onMove = (e: PointerEvent) => {
      const start = dragStart.current;
      if (!dragging.current || !start) return;
      const dx = e.clientX - start.x;
      moved.current = Math.max(moved.current, Math.abs(dx));
      rot.current = start.rot + dx * degPerPx();
      const now = performance.now();
      samples.current.push({ t: now, x: e.clientX });
      while (samples.current.length > 2 && now - samples.current[0].t > 90) {
        samples.current.shift();
      }
      apply(rot.current);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
      const s = samples.current;
      let vel = 0; // px/ms
      if (s.length >= 2) {
        const a = s[0];
        const b = s[s.length - 1];
        if (b.t > a.t) vel = (b.x - a.x) / (b.t - a.t);
      }
      const flung = rot.current + vel * 160 * degPerPx();
      let snapped = Math.round(flung / STEP) * STEP;
      // A real fling always advances at least one card…
      if (snapped === Math.round(dragStart.current!.rot / STEP) * STEP && Math.abs(vel) > 0.35) {
        snapped += vel > 0 ? STEP : -STEP;
      }
      // …but never more than two per swipe.
      const nearest = Math.round(rot.current / STEP) * STEP;
      snapped = Math.max(nearest - 2 * STEP, Math.min(nearest + 2 * STEP, snapped));
      target.current = snapped;
      if (reduced.current) {
        rot.current = target.current;
        apply(rot.current);
      }
      setActive(activeFromRot(target.current));
      dragStart.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [apply, activeFromRot]);

  const onCardClick = (e: React.MouseEvent, index: number) => {
    if (moved.current > 8) {
      e.preventDefault();
      return;
    }
    if (index !== active) {
      e.preventDefault();
      goTo(index);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBy(-1);
    }
  };

  return (
    <div
      className="ww-sphere"
      role="region"
      aria-roledescription="carousel"
      aria-label={services.carouselLabel}
    >
      <div
        ref={sceneRef}
        className={`ww-sphere__scene${isDragging ? " is-dragging" : ""}`}
        style={minH ? { minHeight: minH } : undefined}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <canvas ref={globeRef} className="ww-sphere__globe" aria-hidden />
        {cards.map((service, i) => (
          <div
            key={service.pathKey}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`ww-sphere__card${i === active ? " is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <Link
              href={routes[service.pathKey]}
              className="ww-service-card"
              style={{ ["--service-accent" as string]: service.accent }}
              tabIndex={i === active ? 0 : -1}
              draggable={false}
              onClick={(e) => onCardClick(e, i)}
              aria-label={i === active ? undefined : `${services.goTo} ${service.title}`}
            >
              <div className="ww-service-card__meta">
                <span className="ww-service-card__no" style={{ color: service.accent }}>
                  {service.no}
                </span>
                <span className="ww-mono ww-service-card__tag">{service.tag}</span>
              </div>
              <h3 className="ww-service-card__title">{service.title}</h3>
              <p className="ww-service-card__desc">{service.desc}</p>
              <p className="ww-service-card__outcome" style={{ color: service.accent }}>
                {service.outcome}
              </p>
              <div className="ww-service-card__items">
                {service.items.map((item) => (
                  <div key={item.t} className="ww-service-card__item">
                    <GlowBullet />
                    <span>{item.t}</span>
                    {item.soon ? <span className="ww-soon-badge">{services.soon}</span> : null}
                  </div>
                ))}
              </div>
              <div className="ww-service-card__cta" style={{ color: service.accent }}>
                {service.cta} <span>→</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
