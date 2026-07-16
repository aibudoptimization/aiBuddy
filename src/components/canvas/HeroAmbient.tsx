"use client";

import { useEffect, useRef } from "react";

import { rgbToHsl } from "@/lib/canvas/colors";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";
import {
  drawAurora,
  drawFlow,
  drawGrid,
  initAuroraState,
  initFlowNodes,
} from "@/lib/canvas/motifs";
import type { CanvasMotif } from "@/lib/canvas/types";

type HeroAmbientProps = {
  accentRgb?: string;
  secondaryRgb?: string;
  motif?: CanvasMotif;
};

/**
 * Homepage ambient — matches design-reference/Workflow Wonder website.dc.html:
 * - Flow canvas + gradient veil: position fixed (viewport-locked while scrolling)
 * - Globe canvas: position absolute, hero height only (scrolls away with hero)
 */
export function HeroAmbient({
  accentRgb = "75,250,200",
  secondaryRgb = "139,124,255",
  motif = "flow",
}: HeroAmbientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<HTMLCanvasElement>(null);
  const flowNodes = useRef<ReturnType<typeof initFlowNodes>>([]);
  const aurora = useRef<ReturnType<typeof initAuroraState> | null>(null);
  const globeRings = useRef<ReturnType<typeof initGlobeRings>>([]);
  const size = useRef({ w: 1, h: 1, gw: 1, gh: 1 });
  const hsl = useRef(rgbToHsl(75, 250, 200));

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    const globe = globeRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gctx = globe?.getContext("2d") ?? null;
    if (!ctx) return;

    flowNodes.current = initFlowNodes(1, 1);
    aurora.current = initAuroraState();
    globeRings.current = initGlobeRings();

    const resizeFlow = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      size.current.w = Math.max(1, w);
      size.current.h = Math.max(1, h);
      canvas.width = size.current.w * dpr;
      canvas.height = size.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motif === "flow") {
        flowNodes.current = initFlowNodes(size.current.w, size.current.h);
      }
    };

    const resizeGlobe = () => {
      if (!globe || !gctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const gr = globe.getBoundingClientRect();
      size.current.gw = Math.max(1, gr.width);
      size.current.gh = Math.max(1, gr.height);
      globe.width = size.current.gw * dpr;
      globe.height = size.current.gh * dpr;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeFlow();
    resizeGlobe();
    window.addEventListener("resize", resizeFlow);
    window.addEventListener("resize", resizeGlobe);

    const globeObserver = globe ? new ResizeObserver(resizeGlobe) : null;
    globeObserver?.observe(globe!);

    let raf = 0;
    const loop = (t: number) => {
      const { w, h, gw, gh } = size.current;
      if (motif === "flow") {
        drawFlow(ctx, w, h, accentRgb, flowNodes.current, t);
      } else if (motif === "aurora" && aurora.current) {
        drawAurora(ctx, w, h, hsl.current, aurora.current.blobs, aurora.current.specks, t);
      } else {
        drawGrid(ctx, w, h, accentRgb, t);
      }
      if (gctx) drawGlobe(gctx, gw, gh, accentRgb, secondaryRgb, globeRings.current, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeFlow);
      window.removeEventListener("resize", resizeGlobe);
      globeObserver?.disconnect();
    };
  }, [accentRgb, secondaryRgb, motif]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="ww-home-ambient__flow" />
      <div aria-hidden className="ww-home-ambient__veil" />
      <div className="ww-home-ambient__globe-clip" aria-hidden>
        <canvas ref={globeRef} className="ww-home-ambient__globe" />
      </div>
    </>
  );
}
