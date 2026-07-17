"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";

const ACCENT_RGB = "75,250,200";
const SECONDARY_RGB = "139,124,255";
const SIZE = 44;

type NavGlobeButtonProps = {
  open: boolean;
  onToggle: () => void;
  ariaLabel: string;
  ariaControls?: string;
};

export function NavGlobeButton({
  open,
  onToggle,
  ariaLabel,
  ariaControls,
}: NavGlobeButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rings = useRef(initGlobeRings());
  /** null until mounted — avoid SSR canvas flash for reduced-motion users */
  const [motionOk, setMotionOk] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionOk || open) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (t: number) => {
      if (!running) return;
      if (!document.hidden) {
        drawGlobe(ctx, SIZE, SIZE, ACCENT_RGB, SECONDARY_RGB, rings.current, t, {
          radiusFactor: 0.38,
          intensity: 1.15,
          coreScale: 1.1,
        });
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [motionOk, open]);

  const showGlobe = motionOk === true && !open;

  return (
    <button
      type="button"
      className={`ww-header__menu-btn ww-nav-globe${open ? " is-open" : ""}`}
      aria-expanded={open}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      {showGlobe ? (
        <canvas
          ref={canvasRef}
          className="ww-nav-globe__canvas"
          width={SIZE}
          height={SIZE}
          aria-hidden
        />
      ) : open ? (
        <X size={22} strokeWidth={2} />
      ) : (
        <Menu size={22} strokeWidth={2} />
      )}
    </button>
  );
}
