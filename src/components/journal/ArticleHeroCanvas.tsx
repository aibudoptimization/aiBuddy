"use client";

import { useEffect, useRef } from "react";

import { adaptNodes, classifyResize, createAmbientClock } from "@/lib/canvas/ambient";
import { hexToRgbString, hexToRgbTuple, rgbToHsl } from "@/lib/canvas/colors";
import {
  drawAurora,
  drawFlow,
  drawGrid,
  flowNodeCount,
  initAuroraState,
  initFlowNodes,
  makeFlowNode,
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

    if (!aurora.current) aurora.current = initAuroraState();

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
      if (motif === "flow") {
        if (decision === "seed" || flowNodes.current.length === 0) {
          flowNodes.current = initFlowNodes(newW, newH);
        } else if (decision === "rescale") {
          adaptNodes(
            flowNodes.current,
            oldW,
            oldH,
            newW,
            newH,
            flowNodeCount(newW, newH),
            makeFlowNode,
          );
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    const clock = createAmbientClock();
    let raf = 0;
    const loop = (now: number) => {
      const t = clock(now);
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
