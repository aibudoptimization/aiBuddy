"use client";

import { useEffect, useRef, useState } from "react";

import {
  drawParticleNetwork,
  initParticles,
  type Particle,
} from "@/lib/canvas/particle-network";
import { hexToRgb } from "@/lib/accents";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import {
  BuildCardsBooking,
  BuildCardsMenu,
  BuildCardsRealty,
  BuildCardsShop,
  BuildFooter,
  BuildHeroForm,
  BuildHeroImage,
  BuildHeroText,
  BuildNav,
  BuildPhone,
} from "./build-parts";
import {
  BUILD_CHIP_LABELS,
  BUILD_CURSOR,
  BUILD_CYCLE,
  BUILD_FADE,
  BUILD_PHASES,
  HEROES,
  SITES_LAYER_H,
  SITES_LAYER_W,
} from "./data";

const ACCENT_AMBER = "#f0a94e";
const ACCENT_AMBER_RGB = hexToRgb(ACCENT_AMBER);
const CHIP_THRESHOLDS = [1, 2, 4, 5];

function buildVisible(step: number, index: number) {
  return step >= index + 1;
}

export function SitesBuildStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageBgRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const [heroIndex, setHeroIndex] = useState(0);
  const [animStep, setAnimStep] = useState(0);
  // With reduced motion the animation never runs; show the fully built state.
  const buildStep = reduced ? 5 : animStep;

  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 1, h: 1 });
  const t0Ref = useRef(0);
  const lastHeroRef = useRef(-1);
  const lastStepRef = useRef(-1);

  const hero = HEROES[heroIndex];
  const rgb = hexToRgb(hero.color);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = stageBgRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const r = stage.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      sizeRef.current.w = Math.max(1, r.width);
      sizeRef.current.h = Math.max(1, r.height);
      canvas.width = sizeRef.current.w * dpr;
      canvas.height = sizeRef.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = initParticles(sizeRef.current.w, sizeRef.current.h);
      if (layerRef.current) {
        layerRef.current.style.transform = `scale(${sizeRef.current.w / SITES_LAYER_W})`;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    if (reduced) {
      return () => ro.disconnect();
    }

    t0Ref.current = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const t = now || performance.now();
      if (!t0Ref.current) t0Ref.current = t;

      drawParticleNetwork(
        ctx,
        particlesRef.current,
        sizeRef.current.w,
        sizeRef.current.h,
        ACCENT_AMBER_RGB,
        0.2,
      );

      const e = t - t0Ref.current;
      const ni = Math.floor(e / BUILD_CYCLE) % HEROES.length;
      const local = e % BUILD_CYCLE;
      const fading = local >= BUILD_FADE;
      const step = fading ? 0 : BUILD_PHASES.filter((a) => local >= a).length;

      if (ni !== lastHeroRef.current) {
        lastHeroRef.current = ni;
        setHeroIndex(ni);
      }
      if (step !== lastStepRef.current) {
        lastStepRef.current = step;
        setAnimStep(step);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  const cursor = BUILD_CURSOR[buildStep];
  const showPhone = buildStep >= 5;

  const cardsContent = (() => {
    if (hero.layout === "menu") return <BuildCardsMenu rgb={rgb} />;
    if (hero.layout === "shop") return <BuildCardsShop rgb={rgb} />;
    if (hero.layout === "booking") return <BuildCardsBooking color={hero.color} rgb={rgb} />;
    return <BuildCardsRealty rgb={rgb} />;
  })();

  const cardsClass =
    hero.layout === "menu"
      ? "ww-sites-build__cards ww-sites-build__cards--menu"
      : "ww-sites-build__cards";

  return (
    <div className="ww-sites-root">
      <div ref={stageRef} className="ww-sites-stage">
        <canvas ref={stageBgRef} className="ww-sites-stage__canvas" aria-hidden />

        <div
          ref={layerRef}
          className="ww-sites-stage__layer"
          style={{ width: SITES_LAYER_W, height: SITES_LAYER_H }}
        >
          <div className="ww-sites-browser">
            <div className="ww-sites-browser__chrome">
              <div className="ww-sites-browser__dots" aria-hidden>
                <span style={{ background: "rgba(240,169,78,0.7)" }} />
                <span />
                <span />
              </div>
              <div className="ww-sites-browser__url ww-mono">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="9"
                    rx="2"
                    stroke="rgba(240,169,78,0.8)"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 11V8a4 4 0 0 1 8 0v3"
                    stroke="rgba(240,169,78,0.8)"
                    strokeWidth="2"
                  />
                </svg>
                {hero.domain}
              </div>
              <span className="ww-sites-browser__build ww-mono">
                <span
                  className="ww-sites-browser__build-dot"
                  style={{
                    background: hero.color,
                    boxShadow: `0 0 8px rgba(${rgb},0.9)`,
                  }}
                  aria-hidden
                />
                build
              </span>
            </div>

            <div
              className="ww-sites-browser__viewport"
              style={{
                background: `radial-gradient(120% 80% at 72% 0%, rgba(${rgb},0.07), rgba(7,7,11,0) 58%)`,
              }}
            >
              <div
                className={`ww-sites-build__nav${buildVisible(buildStep, 0) ? " ww-sites-build--visible" : ""}`}
              >
                <BuildNav color={hero.color} />
              </div>

              <div
                className="ww-sites-build__herorow"
                style={{
                  flexDirection: hero.side === "left" ? "row-reverse" : "row",
                }}
              >
                <div
                  className={`ww-sites-build__hero-text${buildVisible(buildStep, 1) ? " ww-sites-build--visible" : ""}`}
                >
                  <BuildHeroText hero={hero} rgb={rgb} />
                </div>
                <div
                  className={`ww-sites-build__hero-img${buildVisible(buildStep, 2) ? " ww-sites-build--visible" : ""}${
                    hero.layout === "booking" ? " ww-sites-build__hero-img--form" : ""
                  }`}
                  style={
                    hero.layout === "booking"
                      ? undefined
                      : {
                          border: `1px solid rgba(${rgb},0.22)`,
                          background: `linear-gradient(150deg, rgba(${rgb},0.16), rgba(18,16,26,0.4) 60%)`,
                        }
                  }
                >
                  {hero.layout === "booking" ? (
                    <BuildHeroForm hero={hero} />
                  ) : (
                    <BuildHeroImage hero={hero} rgb={rgb} />
                  )}
                </div>
              </div>

              <div
                className={`${cardsClass}${buildVisible(buildStep, 3) ? " ww-sites-build--visible" : ""}`}
              >
                {cardsContent}
              </div>

              <div
                className={`ww-sites-build__footer${buildVisible(buildStep, 4) ? " ww-sites-build--visible" : ""}`}
              >
                <BuildFooter rgb={rgb} />
              </div>

              {cursor && (
                <div
                  className="ww-sites-build__cursor"
                  style={{
                    left: cursor[0],
                    top: cursor[1],
                    opacity: buildStep > 0 ? 1 : 0,
                  }}
                  aria-hidden
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                    <path
                      d="M5 3l14 7-6 1.6L9.5 19z"
                      stroke="rgba(7,7,11,0.5)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div
            className={`ww-sites-phone${showPhone ? " ww-sites-build--visible" : ""}`}
            style={{
              background: `radial-gradient(120% 60% at 50% 0%, rgba(${rgb},0.1), rgba(7,7,11,0) 55%)`,
            }}
          >
            <BuildPhone hero={hero} />
          </div>
        </div>
      </div>

      <div className="ww-sites-chips">
        {BUILD_CHIP_LABELS.map((label, i) => {
          const on = buildStep >= CHIP_THRESHOLDS[i];
          return (
            <span
              key={label}
              className={`ww-sites-chip ww-mono${on ? " ww-sites-chip--active" : ""}`}
              style={
                on
                  ? {
                      borderColor: `rgba(${ACCENT_AMBER_RGB},0.5)`,
                      background: `rgba(${ACCENT_AMBER_RGB},0.1)`,
                      color: "#f4f3f7",
                    }
                  : undefined
              }
            >
              <span
                className="ww-sites-chip__dot"
                style={
                  on
                    ? {
                        background: ACCENT_AMBER,
                        boxShadow: `0 0 8px rgba(${ACCENT_AMBER_RGB},0.8)`,
                      }
                    : undefined
                }
                aria-hidden
              />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
