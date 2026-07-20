"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { hexToRgb } from "@/lib/accents";

import {
  AGENT_HOLD,
  AGENT_LAYER_H,
  AGENT_LAYER_W,
  AGENT_OX,
  AGENT_OY,
  AGENT_R,
  ICONS,
  ORBITS,
  SCEN,
  type OrbitDef,
  type ScenarioStep,
} from "./data";
import { IconPaths } from "./IconPaths";

const ACCENT_TEAL = "#4bfac8";
const ACCENT_IRIS = "#8b7cff";

const HOLD = AGENT_HOLD;
const DUR = SCEN.map((s) => s.steps[s.steps.length - 1].at + HOLD);
const CUM: number[] = [];
let totalDuration = 0;
DUR.forEach((d) => {
  CUM.push(totalDuration);
  totalDuration += d;
});
const TOTAL = totalDuration;

function orbPos(w: number, h: number) {
  return { x: AGENT_OX * w, y: AGENT_OY * h };
}

function nodePos(o: OrbitDef, w: number, h: number) {
  const c = orbPos(w, h);
  const rad = AGENT_R * (w / AGENT_LAYER_W);
  const ang = (o.a * Math.PI) / 180;
  return { x: c.x + rad * Math.cos(ang), y: c.y + rad * Math.sin(ang) };
}

function feedAnchor(w: number, h: number) {
  return { x: 0.4 * w, y: 0.5 * h };
}

export function AgentStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);

  const animRef = useRef({
    t0: 0,
    w: 1,
    h: 1,
    orbitGlow: {} as Record<string, number>,
    orbEnergy: 0,
    packets: [] as { node: string; kind: string; born: number }[],
    lastStep: "",
    uiIdx: -1,
    uiShown: -1,
    aR: hexToRgb(ACCENT_TEAL),
    bR: hexToRgb(ACCENT_IRIS),
  });

  const setScenario = useCallback((i: number) => {
    animRef.current.t0 = performance.now() - CUM[i];
    setIdx(i);
    setShown(0);
    animRef.current.uiIdx = i;
    animRef.current.uiShown = 0;
    animRef.current.lastStep = "";
  }, []);

  useEffect(() => {
    animRef.current.t0 = performance.now();
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const r = stage.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      animRef.current.w = Math.max(1, r.width);
      animRef.current.h = Math.max(1, r.height);
      canvas.width = animRef.current.w * dpr;
      canvas.height = animRef.current.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (layerRef.current) {
        layerRef.current.style.transform = `scale(${animRef.current.w / AGENT_LAYER_W})`;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => ro.disconnect();

    let raf = 0;
    const loop = (now: number) => {
      const t = now || performance.now();
      const { w, h, aR, bR } = animRef.current;
      const cc = canvasRef.current;
      if (cc) {
        const r = cc.getBoundingClientRect();
        if (Math.abs(r.width - w) > 1 || Math.abs(r.height - h) > 1) resize();
      }

      ctx.clearRect(0, 0, w, h);

      const e = (((t - animRef.current.t0) % TOTAL) + TOTAL) % TOTAL;
      let scenIdx = 0;
      while (scenIdx < DUR.length - 1 && e >= CUM[scenIdx] + DUR[scenIdx]) scenIdx++;
      const local = e - CUM[scenIdx];
      const steps = SCEN[scenIdx].steps;
      let stepShown = 0;
      for (const s of steps) if (s.at <= local) stepShown++;

      if (
        scenIdx !== animRef.current.uiIdx ||
        stepShown !== animRef.current.uiShown
      ) {
        animRef.current.uiIdx = scenIdx;
        animRef.current.uiShown = stepShown;
        setIdx(scenIdx);
        setShown(stepShown);
      }

      const key = scenIdx + "-" + stepShown;
      if (stepShown > 0 && key !== animRef.current.lastStep) {
        animRef.current.lastStep = key;
        const st = steps[stepShown - 1];
        const nodeKey =
          st.kind === "in" ? "comprend" : st.kind === "out" ? "repond" : st.node!;
        animRef.current.orbitGlow[nodeKey] = 1.25;
        animRef.current.orbEnergy = Math.min(
          1.5,
          animRef.current.orbEnergy + (st.kind === "out" ? 1.2 : 0.7),
        );
        animRef.current.packets.push({ node: nodeKey, kind: st.kind, born: t });
      }

      const orb = orbPos(w, h);
      const orbR = 58 * (w / AGENT_LAYER_W);

      for (const o of ORBITS) {
        const np = nodePos(o, w, h);
        const g = animRef.current.orbitGlow[o.key] || 0;
        ctx.beginPath();
        ctx.moveTo(orb.x, orb.y);
        ctx.lineTo(np.x, np.y);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(${bR},${0.1 + g * 0.45})`;
        ctx.stroke();
      }

      const fa = feedAnchor(w, h);
      ctx.beginPath();
      ctx.moveTo(orb.x, orb.y);
      ctx.lineTo(fa.x, fa.y);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${bR},0.12)`;
      ctx.stroke();

      animRef.current.orbEnergy *= 0.94;
      const en = animRef.current.orbEnergy;
      for (let i = 0; i < 3; i++) {
        const ph = (t * 0.0006 + i / 3) % 1;
        const rr = orbR + ph * (54 + en * 30);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, rr, 0, 6.2832);
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `rgba(${bR},${(1 - ph) * (0.14 + en * 0.18)})`;
        ctx.stroke();
      }
      const halo = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orbR * 2.4);
      halo.addColorStop(0, `rgba(${bR},${0.22 + en * 0.2})`);
      halo.addColorStop(1, `rgba(${bR},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orbR * 2.4, 0, 6.2832);
      ctx.fill();

      const next: typeof animRef.current.packets = [];
      for (const p of animRef.current.packets) {
        const age = (t - p.born) / 850;
        if (age >= 1) continue;
        next.push(p);
        let a: { x: number; y: number };
        let b: { x: number; y: number };
        let rgb: string;
        if (p.kind === "in") {
          const o = ORBITS.find((x) => x.key === "comprend")!;
          a = nodePos(o, w, h);
          b = orb;
          rgb = "244,243,247";
        } else if (p.kind === "out") {
          a = orb;
          b = fa;
          rgb = aR;
        } else {
          const o = ORBITS.find((x) => x.key === p.node)!;
          a = orb;
          b = nodePos(o, w, h);
          rgb = bR;
        }
        const x = a.x + (b.x - a.x) * age;
        const y = a.y + (b.y - a.y) * age;
        const tx = a.x + (b.x - a.x) * Math.max(0, age - 0.08);
        const ty = a.y + (b.y - a.y) * Math.max(0, age - 0.08);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${rgb},0)`);
        grad.addColorStop(1, `rgba(${rgb},0.6)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowColor = `rgba(${rgb},0.9)`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(${rgb},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 6.2832);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animRef.current.packets = next;

      const root = rootRef.current;
      if (root) {
        root.querySelectorAll<HTMLElement>("[data-orbit]").forEach((el) => {
          const k = el.dataset.orbit!;
          const g = animRef.current.orbitGlow[k] || 0;
          animRef.current.orbitGlow[k] = g * 0.92;
          el.style.borderColor = `rgba(${bR},${0.2 + g * 0.7})`;
          el.style.boxShadow =
            g > 0.04 ? `0 0 ${10 + g * 26}px rgba(${bR},${0.06 + g * 0.4})` : "none";
          const ic = el.querySelector<HTMLElement>("[data-orbit-ic]");
          if (ic) {
            ic.style.background = `rgba(${bR},${0.12 + g * 0.3})`;
            ic.style.color = g > 0.2 ? "#fff" : ACCENT_IRIS;
          }
        });
        const orbEl = root.querySelector<HTMLElement>("[data-orb]");
        if (orbEl) {
          const s = 1 + en * 0.06;
          orbEl.style.transform = `translate(-50%,-50%) scale(${s})`;
          orbEl.style.boxShadow = `0 0 ${30 + en * 40}px rgba(${bR},${0.4 + en * 0.4}), inset 0 0 22px rgba(${bR},0.5)`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const scen = SCEN[idx];
  const bR = hexToRgb(ACCENT_IRIS);
  const aR = hexToRgb(ACCENT_TEAL);
  const ox = AGENT_OX * AGENT_LAYER_W;
  const oy = AGENT_OY * AGENT_LAYER_H;

  return (
    <div ref={rootRef} className="ww-agent-root">
      <div className="ww-agent-chips">
        {SCEN.map((s, i) => (
          <button
            key={s.short}
            type="button"
            className={`ww-agent-chip${i === idx ? " ww-agent-chip--active" : ""}`}
            onClick={() => setScenario(i)}
          >
            <span
              className="ww-agent-chip__dot"
              style={
                i === idx
                  ? {
                      background: ACCENT_IRIS,
                      boxShadow: `0 0 8px rgba(${bR},0.8)`,
                    }
                  : undefined
              }
              aria-hidden
            />
            {s.short}
          </button>
        ))}
      </div>

      <div ref={stageRef} className="ww-agent-stage">
        <canvas ref={canvasRef} className="ww-agent-stage__canvas" aria-hidden />

        <div
          ref={layerRef}
          className="ww-agent-stage__layer"
          style={{ width: AGENT_LAYER_W, height: AGENT_LAYER_H }}
        >
          <div className="ww-agent-feed">
            <div className="ww-agent-feed__head">
              <span
                className="ww-agent-feed__icon"
                style={{
                  background: `rgba(${aR},0.12)`,
                  color: ACCENT_TEAL,
                }}
              >
                <IconPaths paths={ICONS[scen.icon]} size={15} />
              </span>
              <span className="ww-agent-feed__title">{scen.surface}</span>
              <span className="ww-agent-feed__live ww-mono">
                <span className="ww-agent-feed__live-dot" aria-hidden />
                live
              </span>
            </div>
            <div className="ww-agent-feed__body">
              {scen.steps.slice(0, shown).map((s, i) => (
                <FeedRow key={`${idx}-${i}`} step={s} bR={bR} aR={aR} />
              ))}
            </div>
          </div>

          {ORBITS.map((o) => {
            const ang = (o.a * Math.PI) / 180;
            const x = ox + AGENT_R * Math.cos(ang);
            const y = oy + AGENT_R * Math.sin(ang);
            return (
              <div
                key={o.key}
                data-orbit={o.key}
                className="ww-agent-orbit"
                style={{ left: x, top: y }}
              >
                <span data-orbit-ic className="ww-agent-orbit__icon">
                  <IconPaths paths={ICONS[o.icon]} size={14} />
                </span>
                <span className="ww-agent-orbit__label">{o.label}</span>
              </div>
            );
          })}

          <div
            data-orb
            className="ww-agent-orb"
            style={{ left: ox, top: oy }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L7 10l5.2-1.8z" />
              <path d="M5 5l.5 1.5L7 7l-1.5.5L5 9l-.5-1.5L3 7l1.5-.5z" />
            </svg>
          </div>
          <div className="ww-agent-orb__label" style={{ left: ox, top: oy + 86 }}>
            <span className="ww-agent-orb__name">{scen.agent}</span>
            <span className="ww-agent-orb__tag ww-mono">AI Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedRow({
  step,
  bR,
  aR,
}: {
  step: ScenarioStep;
  bR: string;
  aR: string;
}) {
  if (step.kind === "in") {
    return (
      <div className="ww-agent-feed__row ww-agent-feed__row--in">
        <div className="ww-agent-feed__bubble ww-agent-feed__bubble--in">{step.text}</div>
      </div>
    );
  }
  if (step.kind === "out") {
    return (
      <div className="ww-agent-feed__row ww-agent-feed__row--out">
        <div
          className="ww-agent-feed__bubble ww-agent-feed__bubble--out"
          style={{
            background: `rgba(${aR},0.14)`,
            borderColor: `rgba(${aR},0.4)`,
          }}
        >
          {step.text}
        </div>
      </div>
    );
  }
  return (
    <div className="ww-agent-feed__row ww-agent-feed__row--in">
      <div
        className="ww-agent-feed__tool ww-mono"
        style={{
          background: `rgba(${bR},0.1)`,
          borderColor: `rgba(${bR},0.3)`,
          color: ACCENT_IRIS,
        }}
      >
        <span className="ww-agent-feed__tool-dot" aria-hidden />
        {step.text}
      </div>
    </div>
  );
}
