"use client";

import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";

const STORAGE_KEY = "ww-intro-seen";

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
 * roomy globe orbits → collapses into the glow-dot → Workflow · Wonder settles in.
 */
export function BrandSplash() {
  const { dict } = useLocale();
  const [visible, setVisible] = useState(false);
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
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setVisible(false), 480);
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* show intro */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("mark");
      const t = window.setTimeout(finish, 420);
      return () => window.clearTimeout(t);
    }

    const tCollapse = window.setTimeout(() => setPhase("collapse"), PHASE_ORBIT_MS);
    const tMark = window.setTimeout(
      () => setPhase("mark"),
      PHASE_ORBIT_MS + PHASE_COLLAPSE_MS * 0.55,
    );
    const tDone = window.setTimeout(finish, TOTAL_MS);
    return () => {
      window.clearTimeout(tCollapse);
      window.clearTimeout(tMark);
      window.clearTimeout(tDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Single RAF loop for the whole intro — do not restart on phase changes.
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

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
  }, [visible]);

  if (!visible) return null;

  const showMark = phase === "mark" || phase === "out";
  const collapsing = phase === "collapse" || phase === "mark" || phase === "out";

  return (
    <div
      className={`ww-splash${phase === "out" ? " ww-splash--out" : ""}${collapsing ? " ww-splash--collapse" : ""}`}
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
      <button type="button" className="ww-splash__skip ww-mono" onClick={finish}>
        {dict.splash.skip}
      </button>
    </div>
  );
}
