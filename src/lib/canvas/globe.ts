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

/**
 * A discharge from the core out to a point on one of the rings. Held in a
 * fixed-size pool that recycles: `born` is the animation clock value the arc
 * fired at, so a spark is "alive" for LIFE_MS after that.
 */
export type GlobeSpark = {
  born: number;
  /** Which ring it earths into. */
  ring: number;
  /** Angle along that ring. */
  angle: number;
  /** Fixed per-strike jitter so the bolt shape doesn't crawl between frames. */
  seed: number;
  /** Slight overshoot past the ring, 1 = lands exactly on it. */
  reach: number;
};

export function initGlobeSparks(): GlobeSpark[] {
  return Array.from({ length: 3 }, () => ({
    born: -1e9,
    ring: 0,
    angle: 0,
    seed: Math.random() * 1000,
    reach: 1,
  }));
}

const SPARK_LIFE_MS = 420;
const SPARK_GAP_MS = 1500;

export type DrawGlobeOptions = {
  /** Fraction of min(w,h) used as ring radius. Default 0.34 */
  radiusFactor?: number;
  /** Extra opacity multiplier for rings / core (0–1+). */
  intensity?: number;
  /** Scale the bright core relative to default. */
  coreScale?: number;
  /** Pool from initGlobeSparks(); omit for a globe with no electricity. */
  sparks?: GlobeSpark[];
  /** Extra rotation around the vertical axis, radians — user drag. */
  yawOffset?: number;
};

export function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  aRgb: string,
  secRgb: string,
  rings: GlobeRing[],
  t: number,
  opts: DrawGlobeOptions = {},
) {
  const radiusFactor = opts.radiusFactor ?? 0.34;
  const intensity = opts.intensity ?? 1;
  const coreScale = opts.coreScale ?? 1;

  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * radiusFactor;
  const yaw = t * 0.0002 + (opts.yawOffset ?? 0);
  const glow = mixRgbStrings(aRgb, secRgb, t * 0.0016);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
  g.addColorStop(0, `rgba(${glow},${0.2 * intensity})`);
  g.addColorStop(0.5, `rgba(${glow},${0.07 * intensity})`);
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
    const seg = 104;
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      const p = project(a, ring.ax, ring.base);
      const d = (p.z + 1) / 2;
      const col = mixRgbStrings(aRgb, secRgb, a * 1.5 + t * 0.0026 + ri);
      // The far side keeps a real presence instead of fading to nothing —
      // that's what gives the sphere its mass.
      ctx.fillStyle = `rgba(${col},${(0.2 + d * 0.46) * intensity})`;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 0.95 + d * 1.45, 0, Math.PI * 2);
      ctx.fill();
    }
    ring.e += ring.spd * ring.dir * 16;
    const ep = project(ring.e, ring.ax, ring.base);
    const ed = (ep.z + 1) / 2;
    const ecol = mixRgbStrings(aRgb, secRgb, ri * 1.25 + t * 0.004);
    ctx.save();
    ctx.shadowColor = `rgba(${ecol},0.95)`;
    ctx.shadowBlur = 14;
    ctx.fillStyle = `rgba(${ecol},${(0.6 + ed * 0.4) * intensity})`;
    ctx.beginPath();
    ctx.arc(ep.sx, ep.sy, 3.2 + ed * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // —— Electricity: discharges from the core out to the rings ——
  // Drawn under the core so the bolt appears to leave from behind it.
  let coreCharge = 0;
  const sparks = opts.sparks;
  if (sparks) {
    for (let si = 0; si < sparks.length; si++) {
      const s = sparks[si];
      const age = t - s.born;

      // Recycle: stagger the pool so strikes don't fire in lockstep.
      if (age > SPARK_LIFE_MS + SPARK_GAP_MS * (0.6 + si * 0.5)) {
        s.born = t;
        s.ring = Math.floor(Math.random() * rings.length);
        s.angle = Math.random() * Math.PI * 2;
        s.seed = Math.random() * 1000;
        s.reach = 0.94 + Math.random() * 0.12;
        continue;
      }
      if (age < 0 || age > SPARK_LIFE_MS) continue;

      const k = age / SPARK_LIFE_MS;
      // Snap on, decay out — an arc, not a fade.
      const env = k < 0.12 ? k / 0.12 : Math.pow(1 - (k - 0.12) / 0.88, 1.7);
      const ring = rings[s.ring];
      const target = project(s.angle, ring.ax, ring.base);
      const depth = (target.z + 1) / 2;
      coreCharge = Math.max(coreCharge, env * (0.45 + depth * 0.55));

      const ex = cx + (target.sx - cx) * s.reach;
      const ey = cy + (target.sy - cy) * s.reach;
      const dx = ex - cx;
      const dy = ey - cy;
      const len = Math.hypot(dx, dy) || 1;
      // Perpendicular unit vector — the bolt zig-zags across the path.
      const px = -dy / len;
      const py = dx / len;
      const col = mixRgbStrings(aRgb, secRgb, s.seed * 0.01 + t * 0.002);

      const STEPS = 7;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      for (let i = 1; i <= STEPS; i++) {
        const f = i / STEPS;
        // Jitter swells mid-flight and returns to zero at both ends, so the
        // bolt starts at the core and lands exactly on the ring.
        const swell = Math.sin(f * Math.PI);
        const n = Math.sin(s.seed + i * 2.399) * Math.cos(s.seed * 0.7 + i * 1.13);
        const off = n * swell * len * 0.13;
        ctx.lineTo(cx + dx * f + px * off, cy + dy * f + py * off);
      }
      ctx.strokeStyle = `rgba(${col},${(0.16 + 0.72 * env) * (0.45 + depth * 0.55) * intensity})`;
      ctx.lineWidth = 1 + env * 1.1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${col},0.9)`;
      ctx.shadowBlur = 8 + env * 12;
      ctx.stroke();

      // Impact bloom where it earths into the ring.
      ctx.fillStyle = `rgba(${col},${0.55 * env * (0.4 + depth * 0.6) * intensity})`;
      ctx.beginPath();
      ctx.arc(ex, ey, 1.6 + env * 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Core: breathes normally, flares while a discharge is leaving it.
  const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
  const ncol = mixRgbStrings(aRgb, secRgb, t * 0.003);
  ctx.save();
  ctx.shadowColor = `rgba(${ncol},0.9)`;
  ctx.shadowBlur = (20 + pulse * 12 + coreCharge * 26) * coreScale;
  ctx.fillStyle = `rgba(${ncol},${0.95 * Math.min(1.2, intensity)})`;
  ctx.beginPath();
  ctx.arc(cx, cy, (7.5 + pulse * 2.4 + coreCharge * 2.6) * coreScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
