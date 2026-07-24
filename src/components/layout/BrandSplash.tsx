"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";
import { INTRO_DONE_EVENT, INTRO_PENDING_ATTR, INTRO_SEEN_KEY } from "@/lib/introFlag";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STORAGE_KEY = INTRO_SEEN_KEY;

function subscribeIntroDone(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}

function introPending() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

/** Orbit settle */
const PHASE_ORBIT_MS = 1100;
/** Collapse rings into the core */
const PHASE_COLLAPSE_MS = 700;
/** Logo settles after the core becomes the mark dot */
const PHASE_MARK_MS = 650;
/** Brief hold on the mark */
const PHASE_HOLD_MS = 480;
const TOTAL_MS = PHASE_ORBIT_MS + PHASE_COLLAPSE_MS + PHASE_MARK_MS + PHASE_HOLD_MS;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * First-visit brand intro:
 * roomy globe orbits → collapses into the glow-dot → Workflow · Wonder settles in,
 * then fades out. Plays once per session.
 */
export function BrandSplash() {
  const { dict } = useLocale();
  // Visible until the intro has been seen this session; the INTRO_DONE_EVENT
  // dispatched by finish() re-reads the flag and hides the splash.
  const visible = useSyncExternalStore(subscribeIntroDone, introPending, () => false);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"orbit" | "collapse" | "mark" | "out">("orbit");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rings = useRef(initGlobeRings());
  const startRef = useRef(0);
  const doneRef = useRef(false);
  const sizeRef = useRef(480);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("out");
    window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }, 480);
  };

  // The pre-paint curtain (see app/layout.tsx) covered the page until we
  // hydrated. Drop it only once the splash is committed to the DOM (visible
  // flips true post-hydration), so there is never a frame with neither.
  // If the intro was already seen, the inline script never set the attribute.
  useEffect(() => {
    if (visible) {
      document.documentElement.removeAttribute(INTRO_PENDING_ATTR);
    }
  }, [visible]);

  // Lock page scroll while the splash owns the screen, so an accidental
  // scroll during the intro can't move the page underneath.
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    if (reduced) {
      const t = window.setTimeout(finish, 420);
      return () => window.clearTimeout(t);
    }

    // Timers only ever advance the phase.
    const tCollapse = window.setTimeout(
      () => setPhase((p) => (p === "orbit" ? "collapse" : p)),
      PHASE_ORBIT_MS,
    );
    const tMark = window.setTimeout(
      () => setPhase((p) => (p === "orbit" || p === "collapse" ? "mark" : p)),
      PHASE_ORBIT_MS + PHASE_COLLAPSE_MS * 0.55,
    );
    const tDone = window.setTimeout(finish, TOTAL_MS);
    return () => {
      window.clearTimeout(tCollapse);
      window.clearTimeout(tMark);
      window.clearTimeout(tDone);
    };
  }, [visible, reduced]);

  // Single RAF loop for the whole intro — do not restart on phase changes.
  useEffect(() => {
    if (!visible || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const side = Math.min(window.innerWidth * 0.92, window.innerHeight * 0.72, 560);
      sizeRef.current = side;
      canvas.width = side * dpr;
      canvas.height = side * dpr;
      canvas.style.width = `${side}px`;
      canvas.style.height = `${side}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    rings.current = initGlobeRings();
    // Slightly faster orbit for presence
    for (const ring of rings.current) {
      ring.spd *= 1.35;
    }

    startRef.current = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const elapsed = now - startRef.current;
      const side = sizeRef.current;

      let radiusFactor = 0.42;
      let intensity = 1;
      let coreScale = 1;
      let alpha = 1;
      let canvasScale = 1;

      if (elapsed > PHASE_ORBIT_MS) {
        const raw = Math.min(1, (elapsed - PHASE_ORBIT_MS) / PHASE_COLLAPSE_MS);
        const p = easeInOutCubic(raw);
        // Rings pull in; core brightens then hands off to the logo dot
        radiusFactor = 0.42 - p * 0.36;
        intensity = 1 + p * 0.55;
        coreScale = 1 + p * 1.8;
        canvasScale = 1 - p * 0.12;
        if (p > 0.72) {
          alpha = 1 - easeInOutCubic((p - 0.72) / 0.28);
        }
      }

      ctx.save();
      ctx.clearRect(0, 0, side, side);
      ctx.translate(side / 2, side / 2);
      ctx.scale(canvasScale, canvasScale);
      ctx.translate(-side / 2, -side / 2);
      ctx.globalAlpha = Math.max(0, alpha);
      drawGlobe(ctx, side, side, "75,250,200", "139,124,255", rings.current, now, {
        radiusFactor,
        intensity,
        coreScale,
      });
      ctx.restore();

      if (elapsed < TOTAL_MS + 200) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible, reduced]);

  if (!visible) return null;

  // With reduced motion, skip straight to the settled mark without animating phases.
  const effectivePhase = reduced && phase === "orbit" ? "mark" : phase;
  const showMark = effectivePhase === "mark" || effectivePhase === "out";
  const collapsing = effectivePhase !== "orbit";

  return (
    <div
      className={`ww-splash${effectivePhase === "out" ? " ww-splash--out" : ""}${collapsing ? " ww-splash--collapse" : ""}`}
      role="dialog"
      aria-label={dict.splash.ariaLabel}
      aria-modal="true"
    >
      <div className="ww-splash__veil" aria-hidden />
      <div className="ww-splash__stage">
        <canvas
          ref={canvasRef}
          className={`ww-splash__globe${showMark ? " ww-splash__globe--handoff" : ""}`}
          aria-hidden
        />
        <div className={`ww-splash__mark${showMark ? " is-in" : ""}`}>
          <BrandMark asLink={false} size="lg" />
        </div>
      </div>
    </div>
  );
}
