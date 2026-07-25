"use client";

import { useEffect, useRef } from "react";

import { createAmbientClock } from "@/lib/canvas/ambient";
import { drawGlobe, initGlobeRings, initGlobeSparks } from "@/lib/canvas/globe";

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
        radiusFactor: 0.42,
        intensity: 1.2,
        coreScale: 1.15,
      });
      return () => ro.disconnect();
    }

    const sparks = initGlobeSparks();
    const clock = createAmbientClock();

    // —— Drag to spin ——
    // Horizontal drag adds to the globe's own rotation; releasing hands the
    // drag speed over as momentum, which decays back to the idle spin.
    let yaw = 0;
    let spin = 0; // radians per frame, carried after release
    let dragging = false;
    let lastX = 0;
    let lastMove = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      spin = 0;
      lastX = e.clientX;
      lastMove = e.timeStamp;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(1, e.timeStamp - lastMove);
      lastX = e.clientX;
      lastMove = e.timeStamp;
      // A full drag across the globe's width turns it roughly half a turn.
      const step = (dx / Math.max(1, size.w)) * Math.PI;
      yaw += step;
      // Per-frame equivalent of the current drag speed (~16ms frames).
      spin = (step / dt) * 16;
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
      // Ignore stale velocity from a pause before release.
      if (e.timeStamp - lastMove > 90) spin = 0;
      spin = Math.max(-0.16, Math.min(0.16, spin));
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.style.cursor = "grab";

    let raf = 0;
    const loop = (now: number) => {
      if (!dragging && spin !== 0) {
        yaw += spin;
        spin *= 0.955;
        if (Math.abs(spin) < 0.00012) spin = 0;
      }
      drawGlobe(ctx, size.w, size.h, accentRgb, secondaryRgb, rings, clock(now), {
        radiusFactor: 0.42,
        intensity: 1.2,
        coreScale: 1.15,
        sparks,
        yawOffset: yaw,
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      ro.disconnect();
    };
  }, [accentRgb, secondaryRgb]);

  return <canvas ref={canvasRef} className="ww-hero-globe" aria-hidden />;
}
