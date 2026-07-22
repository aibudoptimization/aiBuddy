import { driftColor, repelFromPointer } from "./ambient";
import type { HslColor } from "./types";

type FlowNode = {
  x: number;
  y: number;
  bx: number;
  by: number;
  r: number;
};

type AuroraBlob = {
  sx: number;
  sy: number;
  px: number;
  py: number;
  hue: number;
  rad: number;
  a: number;
};

type AuroraSpeck = {
  x: number;
  y: number;
  r: number;
  ph: number;
  sp: number;
};

export function flowNodeCount(w: number, h: number): number {
  return Math.min(84, Math.max(36, Math.floor((w * h) / 18000)));
}

export function makeFlowNode(w: number, h: number): FlowNode {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    bx: (Math.random() - 0.5) * 0.22,
    by: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.5 + 0.7,
  };
}

export function initFlowNodes(w: number, h: number): FlowNode[] {
  return Array.from({ length: flowNodeCount(w, h) }, () => makeFlowNode(w, h));
}

export function initAuroraState() {
  return {
    blobs: Array.from({ length: 5 }, (_, i) => ({
      sx: 0.18 + Math.random() * 0.14,
      sy: 0.14 + Math.random() * 0.14,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      hue: (i - 2) * 26,
      rad: 0.42 + Math.random() * 0.3,
      a: 0.16 + Math.random() * 0.08,
    })) as AuroraBlob[],
    specks: Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      ph: Math.random() * Math.PI * 2,
      sp: 0.2 + Math.random() * 0.5,
    })) as AuroraSpeck[],
  };
}

export type FlowOptions = {
  /** Second color; when set, the palette slowly breathes between rgb and rgb2. */
  rgb2?: string;
  /** Cursor position in canvas coordinates; nodes gently yield around it. */
  pointer?: { x: number; y: number } | null;
};

export function drawFlow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rgb: string,
  nodes: FlowNode[],
  t: number,
  opts?: FlowOptions,
) {
  const F = 0.5;
  const a1 = 0.0013;
  const tt = t * 0.00018;
  const pointer = opts?.pointer ?? null;
  for (const p of nodes) {
    const sx = p.x * a1;
    const sy = p.y * a1;
    // Velocity derives from a stream function (vx = ∂ψ/∂y, vy = −∂ψ/∂x), so
    // the field is divergence-free: uniform node density is preserved forever
    // (the previous ad-hoc sin/cos field had sinks that clumped nodes over
    // long sessions).
    const s1 = Math.sin(1.2 * sx - tt * 0.6);
    const c1 = Math.cos(1.2 * sx - tt * 0.6);
    const s2 = Math.sin(sy + tt);
    const c2 = Math.cos(sy + tt);
    const s3 = Math.sin(sx - tt * 0.8);
    const c3 = Math.cos(sx - tt * 0.8);
    const s4 = Math.sin(1.2 * sy + tt * 0.5);
    const c4 = Math.cos(1.2 * sy + tt * 0.5);
    const vx = 0.6 * s1 * c2 - 0.72 * c3 * s4;
    const vy = -0.72 * c1 * s2 + 0.6 * s3 * c4;
    p.x += vx * F + p.bx;
    p.y += vy * F + p.by;
    repelFromPointer(p, pointer);
    if (p.x < -8) p.x += w + 16;
    else if (p.x > w + 8) p.x -= w + 16;
    if (p.y < -8) p.y += h + 16;
    else if (p.y > h + 8) p.y -= h + 16;
  }

  ctx.fillStyle = "#07070b";
  ctx.fillRect(0, 0, w, h);

  const color = opts?.rgb2 ? driftColor(rgb, opts.rgb2, t) : rgb;
  const max = Math.min(150, w * 0.118);
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < max) {
        ctx.strokeStyle = `rgba(${color},${(1 - d / max) * 0.42})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const p of nodes) {
    ctx.fillStyle = `rgba(${color},0.6)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawAurora(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hsl: HslColor,
  blobs: AuroraBlob[],
  specks: AuroraSpeck[],
  t: number,
) {
  ctx.fillStyle = "#07070b";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (const b of blobs) {
    const cx = w * (0.5 + 0.34 * Math.sin(t * 0.0001 * (1 + b.sx) + b.px));
    const cy = h * (0.5 + 0.32 * Math.cos(t * 0.0001 * (1 + b.sy) + b.py));
    const R = Math.min(w, h) * b.rad;
    const hue = (hsl.h + b.hue + 360) % 360;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, `hsla(${hue}, ${Math.round(hsl.s * 90)}%, 68%, ${b.a})`);
    g.addColorStop(1, `hsla(${hue}, ${Math.round(hsl.s * 90)}%, 60%, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = "source-over";
  for (const s of specks) {
    const yy = (s.y + t * 0.00002 * s.sp) % 1;
    const al = 0.25 + 0.25 * Math.sin(t * 0.001 * s.sp + s.ph);
    ctx.fillStyle = `hsla(${(hsl.h + 20) % 360}, 60%, 82%, ${al})`;
    ctx.beginPath();
    ctx.arc(s.x * w, yy * h, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rgb: string,
  t: number,
) {
  ctx.fillStyle = "#07070b";
  ctx.fillRect(0, 0, w, h);
  const vp = h * 0.46;
  const cx = w / 2;
  const hg = ctx.createRadialGradient(cx, vp, 0, cx, vp, w * 0.5);
  hg.addColorStop(0, `rgba(${rgb},0.14)`);
  hg.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, w, h);

  const cols = 16;
  const spread = w * 0.085;
  ctx.lineWidth = 1;
  for (let i = -cols; i <= cols; i++) {
    ctx.strokeStyle = `rgba(${rgb},${0.16 - (Math.abs(i) / cols) * 0.1})`;
    ctx.beginPath();
    ctx.moveTo(cx + i * spread, h);
    ctx.lineTo(cx, vp);
    ctx.stroke();
  }
  const rows = 22;
  const scroll = (t * 0.00018) % 1;
  for (let k = 0; k < rows; k++) {
    const f = (k + scroll) / rows;
    const p = Math.pow(f, 2.6);
    const y = vp + (h - vp) * p;
    const al = Math.min(0.32, p * 0.45);
    ctx.strokeStyle = `rgba(${rgb},${al})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}
