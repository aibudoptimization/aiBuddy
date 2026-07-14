"use client";

import { useEffect, useRef } from "react";

import {
  drawParticleNetwork,
  initParticles,
  type Particle,
} from "@/lib/canvas/particle-network";

type ParticleHeroBgProps = {
  accentRgb?: string;
  lineAlpha?: number;
};

export function ParticleHeroBg({
  accentRgb = "75,250,200",
  lineAlpha = 0.26,
}: ParticleHeroBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const size = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      size.current.w = Math.max(1, rect.width);
      size.current.h = Math.max(1, rect.height);
      canvas.width = size.current.w * dpr;
      canvas.height = size.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.current = initParticles(size.current.w, size.current.h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    let raf = 0;
    const loop = () => {
      drawParticleNetwork(
        ctx,
        particles.current,
        size.current.w,
        size.current.h,
        accentRgb,
        lineAlpha,
      );
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [accentRgb, lineAlpha]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="ww-service-hero-bg"
    />
  );
}
