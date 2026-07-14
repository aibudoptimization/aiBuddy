"use client";

import { useEffect, useRef } from "react";

import { drawFlow, initFlowNodes } from "@/lib/canvas/motifs";

const AMBIENT_RGB = "75,250,200";

export function JournalPageAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowNodes = useRef<ReturnType<typeof initFlowNodes>>([]);
  const size = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    flowNodes.current = initFlowNodes(1, 1);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      size.current.w = Math.max(1, rect.width);
      size.current.h = Math.max(1, rect.height);
      canvas.width = size.current.w * dpr;
      canvas.height = size.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flowNodes.current = initFlowNodes(size.current.w, size.current.h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    let raf = 0;
    const loop = (t: number) => {
      const { w, h } = size.current;
      drawFlow(ctx, w, h, AMBIENT_RGB, flowNodes.current, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="ww-journal-page__ambient" aria-hidden />
      <div className="ww-journal-page__fade" aria-hidden />
    </>
  );
}
