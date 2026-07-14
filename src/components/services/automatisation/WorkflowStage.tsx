"use client";

import { useEffect, useRef } from "react";

import { hexToRgb } from "@/lib/accents";
import {
  STAGE_HEIGHT,
  STAGE_WIDTH,
  WORKFLOW_EDGES,
  WORKFLOW_ICONS,
  WORKFLOW_LANES,
  WORKFLOW_NODES,
  WORKFLOW_SCENARIOS,
  type WorkflowColor,
  type WorkflowNode,
  type WorkflowSpeed,
} from "@/lib/services/workflow-data";

type WorkflowStageProps = {
  accent?: string;
  accentAlt?: string;
  speed?: WorkflowSpeed;
};

type NodeMeta = { rgb: string; base: number };

type Packet = {
  path: string[];
  seg: number;
  t: number;
  v: number;
  rgb: string;
};

type EdgeGeom = {
  a: { x: number; y: number };
  b: { x: number; y: number };
  c1: { x: number; y: number };
  c2: { x: number; y: number };
};

const NODE_DEF = Object.fromEntries(WORKFLOW_NODES.map((n) => [n.id, n])) as Record<
  string,
  WorkflowNode
>;

function speedConf(speed: WorkflowSpeed) {
  return (
    { calme: { ms: 1500, v: 1.5 }, normal: { ms: 1000, v: 2.3 }, rapide: { ms: 620, v: 3.3 } }[
      speed
    ] ?? { ms: 1000, v: 2.3 }
  );
}

function nodeColor(
  c: WorkflowColor,
  accent: string,
  accentAlt: string,
  aR: string,
  bR: string,
) {
  return c === "b"
    ? { hex: accentAlt, rgb: bR }
    : { hex: accent, rgb: aR };
}

function WorkflowNodeView({
  node,
  accent,
  accentAlt,
  aR,
  bR,
}: {
  node: WorkflowNode;
  accent: string;
  accentAlt: string;
  aR: string;
  bR: string;
}) {
  const cc = nodeColor(node.c, accent, accentAlt, aR, bR);
  const left = node.fx * STAGE_WIDTH;
  const top = node.fy * STAGE_HEIGHT;

  if (node.type === "pill") {
    return (
      <div
        data-node={node.id}
        className="ww-workflow-node ww-workflow-node--pill"
        style={{
          left,
          top,
          background: `rgba(${cc.rgb},0.1)`,
          border: `1px solid rgba(${cc.rgb},0.5)`,
        }}
      >
        {node.label}
      </div>
    );
  }

  const emph = node.type === "trigger" || node.type === "cond";
  const paths = node.icon ? WORKFLOW_ICONS[node.icon] : [];

  return (
    <div
      data-node={node.id}
      className="ww-workflow-node ww-workflow-node--card"
      style={{
        left,
        top,
        borderColor: `rgba(${cc.rgb},${emph ? 0.4 : 0.18})`,
      }}
    >
      <span
        className="ww-workflow-node__icon"
        style={{
          background: `rgba(${cc.rgb},0.12)`,
          color: cc.hex,
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </span>
      <span className="ww-workflow-node__text">
        <span className="ww-workflow-node__label">{node.label}</span>
        {node.sub ? <span className="ww-workflow-node__sub">{node.sub}</span> : null}
      </span>
    </div>
  );
}

export function WorkflowStage({
  accent = "#4bfac8",
  accentAlt = "#8b7cff",
  speed = "calme",
}: WorkflowStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const aR = hexToRgb(accent);
  const bR = hexToRgb(accentAlt);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    if (!stage || !canvas || !layer) return;

    const stageRoot: HTMLDivElement = stage;
    const canvasEl = canvas;
    const layerEl = layer;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    const drawCtx: CanvasRenderingContext2D = ctx;

    let w = 1;
    let h = 1;
    let raf = 0;
    const glow: Record<string, number> = {};
    let packets: Packet[] = [];
    const nextS = WORKFLOW_SCENARIOS.map((_, i) => 300 + i * 200);

    const els: Record<string, HTMLElement> = {};
    const meta: Record<string, NodeMeta> = {};

    function refreshRuntime() {
      stageRoot.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
        const id = el.dataset.node;
        if (!id) return;
        els[id] = el;
        const n = NODE_DEF[id];
        if (!n) return;
        const rgb = n.c === "b" ? bR : aR;
        const base =
          n.type === "pill" ? 0.5 : n.type === "trigger" || n.type === "cond" ? 0.4 : 0.18;
        meta[id] = { rgb, base };
      });
    }

    function resize() {
      const r = stageRoot.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvasEl.width = w * dpr;
      canvasEl.height = h * dpr;
      drawCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerEl.style.transform = `scale(${w / STAGE_WIDTH})`;
    }

    function ctr(id: string) {
      const n = NODE_DEF[id];
      return { x: n.fx * w, y: n.fy * h };
    }

    function edge(aId: string, bId: string): EdgeGeom {
      const a = ctr(aId);
      const b = ctr(bId);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const vertical = Math.abs(dy) > Math.abs(dx) * 1.1;
      if (vertical) {
        return {
          a,
          b,
          c1: { x: a.x, y: a.y + dy * 0.5 },
          c2: { x: b.x, y: b.y - dy * 0.5 },
        };
      }
      return {
        a,
        b,
        c1: { x: a.x + dx * 0.5, y: a.y },
        c2: { x: b.x - dx * 0.5, y: b.y },
      };
    }

    function bez(e: EdgeGeom, t: number) {
      const u = 1 - t;
      const w0 = u * u * u;
      const w1 = 3 * u * u * t;
      const w2 = 3 * u * t * t;
      const w3 = t * t * t;
      return {
        x: w0 * e.a.x + w1 * e.c1.x + w2 * e.c2.x + w3 * e.b.x,
        y: w0 * e.a.y + w1 * e.c1.y + w2 * e.c2.y + w3 * e.b.y,
      };
    }

    function pulse(id: string) {
      glow[id] = Math.min(1.3, (glow[id] || 0) + 1);
    }

    function loop(now: number) {
      const t = now || performance.now();
      const cr = canvasEl.getBoundingClientRect();
      if (Math.abs(cr.width - w) > 1 || Math.abs(cr.height - h) > 1) resize();

      drawCtx.clearRect(0, 0, w, h);

      for (const l of WORKFLOW_LANES) {
        const y = l.fy * h;
        const bh = 0.116 * h;
        const x0 = 0.155 * w;
        const x1 = 0.93 * w;
        drawCtx.fillStyle = "rgba(255,255,255,0.018)";
        drawCtx.beginPath();
        if (drawCtx.roundRect) {
          drawCtx.roundRect(x0, y - bh / 2, x1 - x0, bh, 16);
        } else {
          drawCtx.rect(x0, y - bh / 2, x1 - x0, bh);
        }
        drawCtx.fill();
        drawCtx.fillStyle = `rgba(${aR},0.22)`;
        drawCtx.fillRect(x0, y - bh / 2 + 4, 2.5, bh - 8);
      }

      for (const [aId, bId, ck, dashed] of WORKFLOW_EDGES) {
        const e = edge(aId, bId);
        const rgb = ck === "b" ? bR : aR;
        drawCtx.beginPath();
        drawCtx.moveTo(e.a.x, e.a.y);
        drawCtx.bezierCurveTo(e.c1.x, e.c1.y, e.c2.x, e.c2.y, e.b.x, e.b.y);
        drawCtx.setLineDash(dashed ? [2, 5] : []);
        drawCtx.lineWidth = 1.4;
        drawCtx.strokeStyle = `rgba(${rgb},${dashed ? 0.5 : 0.16})`;
        drawCtx.stroke();
        if (!dashed) {
          drawCtx.setLineDash([4, 16]);
          drawCtx.lineDashOffset = -(t * 0.045);
          drawCtx.strokeStyle = `rgba(${rgb},0.4)`;
          drawCtx.stroke();
        } else {
          const ang = Math.atan2(e.b.y - e.c2.y, e.b.x - e.c2.x);
          drawCtx.setLineDash([]);
          drawCtx.fillStyle = `rgba(${rgb},0.85)`;
          drawCtx.save();
          drawCtx.translate(e.b.x, e.b.y);
          drawCtx.rotate(ang);
          drawCtx.beginPath();
          drawCtx.moveTo(0, 0);
          drawCtx.lineTo(-7, -3.4);
          drawCtx.lineTo(-7, 3.4);
          drawCtx.closePath();
          drawCtx.fill();
          drawCtx.restore();
        }
      }
      drawCtx.setLineDash([]);

      const conf = speedConf(speed);
      WORKFLOW_SCENARIOS.forEach((sc, i) => {
        if (t > nextS[i] && packets.length < 26) {
          packets.push({
            path: sc.path,
            seg: 0,
            t: 0,
            v: conf.v,
            rgb: sc.c === "b" ? bR : aR,
          });
          pulse(sc.path[0]);
          nextS[i] = t + conf.ms * sc.mult * (0.8 + Math.random() * 0.5);
        }
      });

      drawCtx.save();
      const next: Packet[] = [];
      for (const p of packets) {
        const e = edge(p.path[p.seg], p.path[p.seg + 1]);
        const len = Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y) || 1;
        p.t += p.v / len;
        if (p.t >= 1) {
          pulse(p.path[p.seg + 1]);
          p.seg++;
          p.t = 0;
          if (p.seg >= p.path.length - 1) continue;
          next.push(p);
        } else {
          next.push(p);
        }
        const e2 = edge(p.path[p.seg], p.path[p.seg + 1]);
        if (!NODE_DEF[p.path[p.seg + 1]]) continue;
        const pos = bez(e2, p.t);
        const tp = bez(e2, Math.max(0, p.t - 0.06));
        const grad = drawCtx.createLinearGradient(tp.x, tp.y, pos.x, pos.y);
        grad.addColorStop(0, `rgba(${p.rgb},0)`);
        grad.addColorStop(1, `rgba(${p.rgb},0.55)`);
        drawCtx.strokeStyle = grad;
        drawCtx.lineWidth = 2.4;
        drawCtx.lineCap = "round";
        drawCtx.beginPath();
        drawCtx.moveTo(tp.x, tp.y);
        drawCtx.lineTo(pos.x, pos.y);
        drawCtx.stroke();
        drawCtx.shadowColor = `rgba(${p.rgb},0.9)`;
        drawCtx.shadowBlur = 10;
        drawCtx.fillStyle = `rgba(${p.rgb},1)`;
        drawCtx.beginPath();
        drawCtx.arc(pos.x, pos.y, 3, 0, 6.2832);
        drawCtx.fill();
        drawCtx.shadowBlur = 0;
      }
      packets = next;
      drawCtx.restore();

      for (const id in els) {
        const g = (glow[id] || 0) * 0.9;
        glow[id] = g;
        const m = meta[id];
        const el = els[id];
        if (!m || !el) continue;
        el.style.borderColor = `rgba(${m.rgb},${m.base + g * (1 - m.base)})`;
        el.style.boxShadow =
          g > 0.04 ? `0 0 ${10 + g * 24}px rgba(${m.rgb},${0.08 + g * 0.4})` : "none";
      }

      raf = requestAnimationFrame(loop);
    }

    refreshRuntime();
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(stageRoot);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [accent, accentAlt, speed, aR, bR]);

  return (
    <div ref={stageRef} className="ww-workflow-stage">
      <canvas ref={canvasRef} className="ww-workflow-stage__canvas" aria-hidden />
      <div ref={layerRef} className="ww-workflow-stage__layer">
        {WORKFLOW_LANES.map((lane) => (
          <div
            key={lane.no}
            className="ww-workflow-lane"
            style={{ top: lane.fy * STAGE_HEIGHT }}
          >
            <span className="ww-workflow-lane__no">{lane.no}</span>
            <span className="ww-workflow-lane__title">{lane.title}</span>
            <span className="ww-workflow-lane__tag">{lane.tag}</span>
          </div>
        ))}
        {WORKFLOW_NODES.map((node) => (
          <WorkflowNodeView
            key={node.id}
            node={node}
            accent={accent}
            accentAlt={accentAlt}
            aR={aR}
            bR={bR}
          />
        ))}
      </div>
    </div>
  );
}
