"use client";

import { useEffect, useRef } from "react";

import { createAmbientClock } from "@/lib/canvas/ambient";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";

type HeroGlobeProps = {
  accentRgb?: string;
  secondaryRgb?: string;
};

/**
 * The brand globe, back in the hero — the site's single living element.
 * Fills its parent (.ww-home-hero__globe); prefers-reduced-motion gets one
 * static frame.
 */
export function HeroGlobe({
  accentRgb = "75,250,200",
  secondaryRgb = "139,124,255",
}: HeroGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rings = initGlobeRings();
    const size = { w: 1, h: 1 };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      size.w = Math.max(1, rect.width);
      size.h = Math.max(1, rect.height);
      canvas.width = size.w * dpr;
      canvas.height = size.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawGlobe(ctx, size.w, size.h, accentRgb, secondaryRgb, rings, 0, {
        radiusFactor: 0.4,
      });
      return () => ro.disconnect();
    }

    const clock = createAmbientClock();
    let raf = 0;
    const loop = (now: number) => {
      drawGlobe(ctx, size.w, size.h, accentRgb, secondaryRgb, rings, clock(now), {
        radiusFactor: 0.4,
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [accentRgb, secondaryRgb]);

  return <canvas ref={canvasRef} className="ww-hero-globe" aria-hidden />;
}
