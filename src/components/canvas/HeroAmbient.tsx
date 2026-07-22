"use client";

import { useEffect, useRef } from "react";

import { adaptNodes, classifyResize, createAmbientClock } from "@/lib/canvas/ambient";
import { rgbToHsl } from "@/lib/canvas/colors";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";
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

type HeroAmbientProps = {
  accentRgb?: string;
  secondaryRgb?: string;
  motif?: CanvasMotif;
};

/**
 * Homepage ambient — matches design-reference/Workflow Wonder website.dc.html:
 * - Flow canvas + gradient veil: position fixed (viewport-locked while scrolling)
 * - Globe canvas: position absolute, hero height only (scrolls away with hero)
 * - Mobile (≤768px): no hero globe — header NavGlobeButton owns brand motion
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
  const mobileRef = useRef(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    const globe = globeRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gctx = globe?.getContext("2d") ?? null;
    if (!ctx) return;

    const mobileMq = window.matchMedia("(max-width: 768px)");
    mobileRef.current = mobileMq.matches;

    if (!aurora.current) aurora.current = initAuroraState();
    if (globeRings.current.length === 0) globeRings.current = initGlobeRings();

    const resizeFlow = () => {
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

    const resizeGlobe = () => {
      if (!globe || !gctx || mobileRef.current) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const gr = globe.getBoundingClientRect();
      size.current.gw = Math.max(1, gr.width);
      size.current.gh = Math.max(1, gr.height);
      globe.width = size.current.gw * dpr;
      globe.height = size.current.gh * dpr;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onBreakpoint = () => {
      mobileRef.current = mobileMq.matches;
      if (mobileRef.current && gctx && globe) {
        gctx.clearRect(0, 0, globe.width, globe.height);
      } else {
        resizeGlobe();
      }
    };

    resizeFlow();
    resizeGlobe();
    window.addEventListener("resize", resizeFlow);
    window.addEventListener("resize", resizeGlobe);
    mobileMq.addEventListener("change", onBreakpoint);

    const globeObserver = globe ? new ResizeObserver(resizeGlobe) : null;
    if (globe && !mobileRef.current) globeObserver?.observe(globe);

    // Catch layout-driven canvas size changes that fire no window resize;
    // classifyResize filters the noise so this never re-scatters nodes.
    const flowObserver = new ResizeObserver(resizeFlow);
    flowObserver.observe(canvas);

    // Cursor interaction only on fine pointers; canvas is fixed inset-0 so
    // client coordinates are canvas coordinates.
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
      const { w, h, gw, gh } = size.current;
      if (motif === "flow") {
        drawFlow(ctx, w, h, accentRgb, flowNodes.current, t, {
          rgb2: secondaryRgb,
          pointer: pointer.current,
        });
      } else if (motif === "aurora" && aurora.current) {
        drawAurora(ctx, w, h, hsl.current, aurora.current.blobs, aurora.current.specks, t);
      } else {
        drawGrid(ctx, w, h, accentRgb, t);
      }
      if (gctx && !mobileRef.current) {
        drawGlobe(gctx, gw, gh, accentRgb, secondaryRgb, globeRings.current, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeFlow);
      window.removeEventListener("resize", resizeGlobe);
      mobileMq.removeEventListener("change", onBreakpoint);
      if (finePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerOut);
      }
      globeObserver?.disconnect();
      flowObserver.disconnect();
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
