"use client";

import { useEffect, useRef } from "react";

import { adaptNodes, classifyResize, createAmbientClock } from "@/lib/canvas/ambient";
import {
  drawParticleNetwork,
  initParticles,
  makeParticle,
  particleCount,
  type Particle,
} from "@/lib/canvas/particle-network";

type ParticleHeroBgProps = {
  accentRgb?: string;
  secondaryRgb?: string;
  lineAlpha?: number;
};

export function ParticleHeroBg({
  accentRgb = "75,250,200",
  secondaryRgb = "139,124,255",
  lineAlpha = 0.26,
}: ParticleHeroBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const size = useRef({ w: 1, h: 1 });
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const newW = Math.max(1, rect.width);
      const newH = Math.max(1, rect.height);
      const oldW = size.current.w;
      const oldH = size.current.h;
      const decision = classifyResize(oldW, oldH, newW, newH);
      size.current.w = newW;
      size.current.h = newH;
      canvas.width = newW * dpr;
      canvas.height = newH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (decision === "seed" || particles.current.length === 0) {
        particles.current = initParticles(newW, newH);
      } else if (decision === "rescale") {
        adaptNodes(
          particles.current,
          oldW,
          oldH,
          newW,
          newH,
          particleCount(newW, newH),
          makeParticle,
        );
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    // This canvas scrolls with the hero (not viewport-fixed), so pointer
    // coordinates are translated into canvas space per event.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.current = null;
    };
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerout", onPointerOut);
    }

    const clock = createAmbientClock();
    let raf = 0;
    const loop = (now: number) => {
      drawParticleNetwork(
        ctx,
        particles.current,
        size.current.w,
        size.current.h,
        accentRgb,
        lineAlpha,
        { rgb2: secondaryRgb, t: clock(now), pointer: pointer.current },
      );
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (finePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerOut);
      }
      ro.disconnect();
    };
  }, [accentRgb, secondaryRgb, lineAlpha]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="ww-service-hero-bg"
    />
  );
}
