"use client";

import { useEffect, useRef } from "react";

import { hexToRgbString, hexToRgbTuple, rgbToHsl } from "@/lib/canvas/colors";
import {
  drawAurora,
  drawFlow,
  drawGrid,
  initAuroraState,
  initFlowNodes,
} from "@/lib/canvas/motifs";
import type { CanvasMotif } from "@/lib/canvas/types";

type ArticleHeroCanvasProps = {
  motif: CanvasMotif;
  accent: string;
};

export function ArticleHeroCanvas({ motif, accent }: ArticleHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowNodes = useRef<ReturnType<typeof initFlowNodes>>([]);
  const aurora = useRef<ReturnType<typeof initAuroraState> | null>(null);
  const size = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [r, g, b] = hexToRgbTuple(accent);
    const rgb = hexToRgbString(accent);
    const hsl = rgbToHsl(r, g, b);

    flowNodes.current = initFlowNodes(1, 1);
    aurora.current = initAuroraState();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      size.current.w = Math.max(1, rect.width);
      size.current.h = Math.max(1, rect.height);
      canvas.width = size.current.w * dpr;
      canvas.height = size.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motif === "flow") {
        flowNodes.current = initFlowNodes(size.current.w, size.current.h);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    let raf = 0;
    const loop = (t: number) => {
      const { w, h } = size.current;
      if (motif === "flow") {
        drawFlow(ctx, w, h, rgb, flowNodes.current, t);
      } else if (motif === "aurora" && aurora.current) {
        drawAurora(ctx, w, h, hsl, aurora.current.blobs, aurora.current.specks, t);
      } else {
        drawGrid(ctx, w, h, rgb, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [accent, motif]);

  return <canvas ref={canvasRef} className="ww-article-hero-canvas" aria-hidden />;
}
