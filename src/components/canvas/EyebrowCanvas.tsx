"use client";

import { useEffect, useRef } from "react";

type EyebrowCanvasProps = {
  text: string;
  phase?: number;
};

const LABEL_FONT = "500 12.5px var(--font-jetbrains), monospace";
const LABEL_LS = 2.25;

export function EyebrowCanvas({ text, phase = 0 }: EyebrowCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    ctx.font = LABEL_FONT;
    const hasLS = "letterSpacing" in ctx;
    if (hasLS) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${LABEL_LS}px`;
    const w =
      Math.ceil(ctx.measureText(text).width + (hasLS ? 0 : LABEL_LS * (text.length - 1))) + 3;
    const h = 17;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = LABEL_FONT;
      if (hasLS) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${LABEL_LS}px`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgb(126,126,130)";
      ctx.fillText(text, 0, h / 2 + 0.5);

      if (!reduced) {
        const period = 6000;
        const band = w * 0.55;
        const p = (((t / period + phase) % 1) + 1) % 1;
        const cx = -band + p * (w + 2 * band);
        const g = ctx.createLinearGradient(cx - band, 0, cx + band, 0);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.5, "rgba(255,255,255,0.92)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [text, phase]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ display: "block", alignSelf: "flex-end", height: 17 }}
    />
  );
}
