"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider";
import type { ServicePathKey } from "@/content/i18n/types";

type Slide = { no: string; text: string; pathKey: ServicePathKey };

type AudienceCarouselProps = {
  slides: Slide[];
};

export function AudienceCarousel({ slides }: AudienceCarouselProps) {
  const { dict, routes } = useLocale();
  const a = dict.home.audience;
  const movedRef = useRef(0);
  const vpRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; dx: number } | null>(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0);
  const [dragDX, setDragDX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const vp = vpRef.current;
    const track = trackRef.current;
    if (!vp || !track || !track.children.length) return;
    const cw = (track.children[0] as HTMLElement).getBoundingClientRect().width;
    const gap = 14;
    const nextStep = cw + gap;
    const perView = Math.max(1, Math.round((vp.clientWidth + gap) / nextStep));
    const nextMax = Math.max(0, track.children.length - perView);
    setStep(nextStep);
    setMaxIdx(nextMax);
    setIdx((current) => Math.min(current, nextMax));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const vp = vpRef.current;
    const ro = vp ? new ResizeObserver(measure) : null;
    if (vp && ro) ro.observe(vp);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (maxIdx <= 0 || e.button !== 0) return;
    dragRef.current = { x: e.clientX, dx: 0 };
    setDragging(true);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      let dx = e.clientX - dragRef.current.x;
      const atStart = idx <= 0;
      const atEnd = idx >= maxIdx;
      if ((atStart && dx > 0) || (atEnd && dx < 0)) dx *= 0.35;
      dragRef.current.dx = dx;
      setDragDX(dx);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      const d = dragRef.current.dx;
      movedRef.current = Math.abs(d);
      dragRef.current = null;
      const threshold = Math.min(80, (step || 1) * 0.22);
      setIdx((current) => {
        if (d <= -threshold) return Math.min(maxIdx, current + 1);
        if (d >= threshold) return Math.max(0, current - 1);
        return current;
      });
      setDragDX(0);
      setDragging(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [idx, maxIdx, step]);

  const btnBase: CSSProperties = {
    flex: "none",
    width: 42,
    height: 42,
    borderRadius: 999,
    border: "1px solid rgba(244,243,247,0.18)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--snow)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.2s, background 0.2s, border-color 0.2s",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div
          className="ww-mono"
          style={{ fontSize: "11.5px", letterSpacing: "0.16em", color: "var(--teal)" }}
        >
          {a.slidesHeading}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            aria-label={a.prev}
            style={{ ...btnBase, opacity: idx <= 0 ? 0.28 : 1, pointerEvents: idx <= 0 ? "none" : "auto" }}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label={a.next}
            style={{
              ...btnBase,
              opacity: idx >= maxIdx ? 0.28 : 1,
              pointerEvents: idx >= maxIdx ? "none" : "auto",
            }}
            onClick={() => setIdx((i) => Math.min(maxIdx, i + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={vpRef}
        onPointerDown={onPointerDown}
        style={{
          overflow: "hidden",
          marginBottom: 20,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
          userSelect: "none",
        }}
      >
        <div
          ref={trackRef}
          className="ww-si-track"
          style={{
            transform: `translateX(${(-idx * step + dragDX).toFixed(2)}px)`,
            transition: dragging ? "none" : undefined,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.no}
              className="ww-si-card ww-card-interactive"
              style={{
                display: "flex",
                gap: 16,
                padding: 24,
                borderRadius: 14,
                border: "1px solid rgba(244,243,247,0.09)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--teal)",
                  flex: "none",
                }}
              >
                {slide.no}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15.5px",
                    lineHeight: 1.5,
                    color: "rgba(244,243,247,0.82)",
                  }}
                >
                  {slide.text}
                </p>
                <Link
                  href={routes[slide.pathKey]}
                  className="ww-si-card__link ww-mono"
                  draggable={false}
                  onClick={(event) => {
                    if (movedRef.current > 5) event.preventDefault();
                  }}
                >
                  {a.slideLinkLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 54 }}>
        {Array.from({ length: maxIdx + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${a.goToSlide} ${i + 1}`}
            onClick={() => setIdx(i)}
            style={{
              flex: "none",
              height: 7,
              padding: 0,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              transition: "background 0.25s, width 0.25s",
              width: i === idx ? 22 : 7,
              background: i === idx ? "var(--teal)" : "rgba(244,243,247,0.22)",
            }}
          />
        ))}
      </div>
    </>
  );
}
