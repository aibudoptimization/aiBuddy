"use client";

import { useEffect, useRef } from "react";

import { adaptNodes, classifyResize, createAmbientClock } from "@/lib/canvas/ambient";
import { drawFlow, flowNodeCount, initFlowNodes, makeFlowNode } from "@/lib/canvas/motifs";

const AMBIENT_RGB = "75,250,200";
const AMBIENT_RGB2 = "139,124,255";

export function JournalPageAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowNodes = useRef<ReturnType<typeof initFlowNodes>>([]);
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
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) return () => ro.disconnect();

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
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
      const t = clock(now);
      const { w, h } = size.current;
      drawFlow(ctx, w, h, AMBIENT_RGB, flowNodes.current, t, {
        rgb2: AMBIENT_RGB2,
        pointer: pointer.current,
      });
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
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="ww-journal-page__ambient" aria-hidden />
      <div className="ww-journal-page__fade" aria-hidden />
    </>
  );
}
