/**
 * 3D-projected double helix — the DNA of Workflow Wonder, drawn in the same
 * glowing-particle language as the globe (lib/canvas/globe.ts). Two beaded
 * strands twist around a vertical axis; rungs bridge them. Depth drives
 * size, opacity, color blend and glow, so the front of the helix reads
 * bright and crystalline while the back recedes.
 */

function parseRgb(rgb: string): [number, number, number] {
  const [r, g, b] = rgb.split(",").map(Number);
  return [r, g, b];
}

function mix(a: [number, number, number], b: [number, number, number], u: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * u);
  const g = Math.round(a[1] + (b[1] - a[1]) * u);
  const bl = Math.round(a[2] + (b[2] - a[2]) * u);
  return `${r},${g},${bl}`;
}

/** Deterministic per-bead jitter so the strands sparkle without flicker. */
function jitter(seed: number): number {
  const s = Math.sin(seed * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

type Bead = {
  x: number;
  y: number;
  d: number; // 0 back … 1 front
  seed: number;
};

export function drawHelix(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  /** Rotation of the helix around its vertical axis, radians. */
  spin: number,
  /** "r,g,b" — bright front color (active service accent). */
  accentRgb: string,
  /** "r,g,b" — receding back color (brand iris). */
  secondaryRgb: string,
) {
  ctx.clearRect(0, 0, w, h);
  const colA = parseRgb(accentRgb);
  const colB = parseRgb(secondaryRgb);
  const cx = w / 2;
  const amp = Math.min(w * 0.34, 96);
  const period = Math.max(190, h * 0.46); // px of height per full twist
  const step = 5;

  const beads: Bead[] = [];
  for (let s = 0; s < 2; s++) {
    const phase = s * Math.PI;
    for (let y = 10; y <= h - 10; y += step) {
      const th = (y / period) * Math.PI * 2 + spin + phase;
      beads.push({
        x: cx + Math.cos(th) * amp,
        y,
        d: (Math.sin(th) + 1) / 2,
        seed: y * 3.7 + s * 173,
      });
    }
  }
  beads.sort((a, b) => a.d - b.d); // paint back to front

  // Rungs first pass values (drawn between the two depth halves)
  type Rung = { xa: number; xb: number; y: number; da: number; db: number };
  const rungs: Rung[] = [];
  for (let y = 26; y <= h - 22; y += 30) {
    const th = (y / period) * Math.PI * 2 + spin;
    const xa = cx + Math.cos(th) * amp;
    const xb = cx + Math.cos(th + Math.PI) * amp;
    if (Math.abs(xa - xb) < amp * 0.55) continue; // strands crossing
    rungs.push({
      xa,
      xb,
      y,
      da: (Math.sin(th) + 1) / 2,
      db: (Math.sin(th + Math.PI) + 1) / 2,
    });
  }

  const drawBead = (b: Bead) => {
    const u = (1 - b.d) * 0.8; // back beads slide toward the secondary color
    const col = mix(colA, colB, u);
    const gem = jitter(b.seed + 1) > 0.86;
    const size =
      (0.95 + b.d * 1.95) * (0.8 + jitter(b.seed) * 0.5) * (gem ? 1.5 : 1);
    const alpha = Math.min(1, (0.14 + b.d * 0.72) * (gem ? 1.25 : 1));
    ctx.save();
    if (b.d > 0.55 || gem) {
      ctx.shadowColor = `rgba(${col},0.9)`;
      ctx.shadowBlur = gem ? 13 : 5 + b.d * 7;
    }
    ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(b.x, b.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Back half of the strands
  for (const b of beads) if (b.d < 0.5) drawBead(b);

  // Rungs: gradient bridges, brighter when broadside to the viewer
  for (const r of rungs) {
    const avg = (r.da + r.db) / 2;
    const grad = ctx.createLinearGradient(r.xa, r.y, r.xb, r.y);
    grad.addColorStop(0, `rgba(${mix(colA, colB, (1 - r.da) * 0.8)},${(0.1 + r.da * 0.5).toFixed(3)})`);
    grad.addColorStop(1, `rgba(${mix(colA, colB, (1 - r.db) * 0.8)},${(0.1 + r.db * 0.5).toFixed(3)})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1 + avg * 0.9;
    ctx.beginPath();
    ctx.moveTo(r.xa, r.y);
    ctx.lineTo(r.xb, r.y);
    ctx.stroke();
  }

  // Front half of the strands
  for (const b of beads) if (b.d >= 0.5) drawBead(b);
}
