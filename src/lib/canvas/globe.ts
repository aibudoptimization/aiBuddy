import { mixRgbStrings } from "./colors";

type GlobeRing = {
  ax: number;
  base: number;
  e: number;
  spd: number;
  dir: number;
};

export function initGlobeRings(): GlobeRing[] {
  const N = 3;
  return Array.from({ length: N }, (_, i) => ({
    ax: 1.15,
    base: (i * Math.PI) / N,
    e: Math.random() * 6.28,
    spd: 0.0015 + i * 0.00035,
    dir: i % 2 ? 1 : -1,
  }));
}

export function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  aRgb: string,
  secRgb: string,
  rings: GlobeRing[],
  t: number,
) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.34;
  const yaw = t * 0.0002;
  const glow = mixRgbStrings(aRgb, secRgb, t * 0.0016);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
  g.addColorStop(0, `rgba(${glow},0.12)`);
  g.addColorStop(0.5, `rgba(${glow},0.03)`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const project = (a: number, ringAx: number, ringBase: number) => {
    let p = { x: Math.cos(a), y: 0, z: Math.sin(a) };
    const cx1 = Math.cos(ringAx);
    const sx1 = Math.sin(ringAx);
    const y1 = p.y * cx1 - p.z * sx1;
    const z1 = p.y * sx1 + p.z * cx1;
    p = { x: p.x, y: y1, z: z1 };
    const yy = ringBase + yaw;
    const cy1 = Math.cos(yy);
    const sy1 = Math.sin(yy);
    const x2 = p.x * cy1 - p.z * sy1;
    const z2 = p.x * sy1 + p.z * cy1;
    return { sx: cx + x2 * R, sy: cy + y1 * R, z: z2 };
  };

  for (let ri = 0; ri < rings.length; ri++) {
    const ring = rings[ri];
    const seg = 86;
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      const p = project(a, ring.ax, ring.base);
      const d = (p.z + 1) / 2;
      const col = mixRgbStrings(aRgb, secRgb, a * 1.5 + t * 0.0026 + ri);
      ctx.fillStyle = `rgba(${col},${0.06 + d * 0.34})`;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 0.5 + d * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ring.e += ring.spd * ring.dir * 16;
    const ep = project(ring.e, ring.ax, ring.base);
    const ed = (ep.z + 1) / 2;
    const ecol = mixRgbStrings(aRgb, secRgb, ri * 1.25 + t * 0.004);
    ctx.save();
    ctx.shadowColor = `rgba(${ecol},0.95)`;
    ctx.shadowBlur = 12;
    ctx.fillStyle = `rgba(${ecol},${0.55 + ed * 0.45})`;
    ctx.beginPath();
    ctx.arc(ep.sx, ep.sy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
  const ncol = mixRgbStrings(aRgb, secRgb, t * 0.003);
  ctx.save();
  ctx.shadowColor = `rgba(${ncol},0.9)`;
  ctx.shadowBlur = 20 + pulse * 12;
  ctx.fillStyle = `rgba(${ncol},0.95)`;
  ctx.beginPath();
  ctx.arc(cx, cy, 7.5 + pulse * 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
