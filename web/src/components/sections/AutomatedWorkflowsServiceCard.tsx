"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { primaryNavLinkClass } from "@/lib/primary-nav-link-class";
import {
  AUTOMATED_WORKFLOWS_TAB_ID,
  servicesPageDeepLink,
} from "@/lib/services-page-deep-link";

/** Lower = more lag behind the cursor (0.06–0.14 feels natural). */
const GLOW_SMOOTHING = 0.09;
const GLOW_IDLE_EPS2 = 0.36;

const VIDEO_SRC = "/services/automated-workflows-bg.mp4";

type ServicePoint = { readonly title: string; readonly body?: string };

type Pillar = {
  readonly name: string;
  readonly description?: string;
  readonly points: readonly ServicePoint[];
};

type AutomatedWorkflowsServiceCardProps = {
  pillar: Pillar;
};

export function AutomatedWorkflowsServiceCard({ pillar }: AutomatedWorkflowsServiceCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  const applyGlowStyle = useCallback((x: number, y: number) => {
    const el = glowRef.current;
    if (!el) return;
    el.style.background = `radial-gradient(190px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08) 38%, transparent 58%)`;
  }, []);

  const scheduleGlowFrame = useCallback(() => {
    if (rafRef.current !== null) return;
    const step = () => {
      if (!hoveringRef.current) {
        rafRef.current = null;
        return;
      }
      const t = targetRef.current;
      const p = posRef.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;
      if (dx * dx + dy * dy < GLOW_IDLE_EPS2) {
        rafRef.current = null;
        return;
      }
      p.x += dx * GLOW_SMOOTHING;
      p.y += dy * GLOW_SMOOTHING;
      applyGlowStyle(p.x, p.y);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [applyGlowStyle]);

  const setTargetFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const el = articleRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      targetRef.current = { x, y };
      if (!hoveringRef.current) return;
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        posRef.current = { x, y };
        applyGlowStyle(x, y);
        return;
      }
      scheduleGlowFrame();
    },
    [applyGlowStyle, scheduleGlowFrame],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <article
      ref={articleRef}
      onMouseMove={(e) => setTargetFromClient(e.clientX, e.clientY)}
      onMouseEnter={(e) => {
        hoveringRef.current = true;
        const el = articleRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        targetRef.current = { x, y };
        posRef.current = { x, y };
        applyGlowStyle(x, y);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        if (typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          scheduleGlowFrame();
        }
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        const glowEl = glowRef.current;
        if (glowEl) glowEl.style.background = "";
      }}
      className="group relative isolate flex flex-col overflow-hidden rounded-lg border border-[var(--border)] shadow-lg shadow-black/25"
    >
      <div
        className="absolute inset-0 z-0 hidden bg-[var(--surface)] motion-reduce:block"
        aria-hidden
      />
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        src={VIDEO_SRC}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-br from-black/55 via-black/40 to-black/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_100%_100%,rgba(10,10,12,0.92)_0%,rgba(10,10,12,0.35)_42%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-white/[0.04] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.12)]"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[3] opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative z-[4] flex flex-col p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <h3 className="min-w-0 flex-1 text-2xl font-medium text-[var(--foreground)] [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            {pillar.name}
          </h3>
          <Link
            href={servicesPageDeepLink(AUTOMATED_WORKFLOWS_TAB_ID)}
            className={`${primaryNavLinkClass} shrink-0 [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]`}
          >
            View service
          </Link>
        </div>
        {pillar.description ? (
          <p className="mt-4 text-[var(--muted)] leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            {pillar.description}
          </p>
        ) : null}
        <div className="mt-6 space-y-8">
          {pillar.points.map((point) => (
            <div key={point.title}>
              <h4 className="flex gap-2 text-sm font-semibold text-[var(--foreground)] [text-shadow:0_1px_14px_rgba(0,0,0,0.4)]">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <span>{point.title}</span>
              </h4>
              {typeof point.body === "string" ? (
                <p className="mt-2 pl-3.5 text-sm leading-relaxed text-[var(--muted)] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:pl-4">
                  {point.body}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
