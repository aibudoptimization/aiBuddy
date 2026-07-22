/**
 * Shared plumbing for the ambient canvas backgrounds.
 *
 * The mobile URL bar fires resize events while the page scrolls; re-seeding
 * particles on every one of those made the background visibly "reset".
 * classifyResize + adaptNodes let components keep their particles across
 * viewport churn, and createAmbientClock keeps simulation time continuous
 * across background-tab gaps.
 */

/** Accumulated animation clock; per-frame delta clamped so a backgrounded
 *  tab resumes with one small step instead of a minutes-long leap. */
export function createAmbientClock() {
  let last: number | null = null;
  let acc = 0;
  return (now: number) => {
    if (last === null) last = now;
    acc += Math.min(Math.max(now - last, 0), 64);
    last = now;
    return acc;
  };
}

/** Slow palette breath between the accent and secondary colors (~2.5 min
 *  cycle, capped at 55% toward the secondary so the accent stays the
 *  identity). Inputs/outputs are "r,g,b" strings. */
export function driftColor(rgb: string, rgb2: string, t: number): string {
  const mix = (0.5 - 0.5 * Math.cos((t * Math.PI * 2) / 150000)) * 0.55;
  const a = rgb.split(",").map(Number);
  const b = rgb2.split(",").map(Number);
  const r = Math.round(a[0] + (b[0] - a[0]) * mix);
  const g = Math.round(a[1] + (b[1] - a[1]) * mix);
  const bl = Math.round(a[2] + (b[2] - a[2]) * mix);
  return `${r},${g},${bl}`;
}

/** Gentle cursor repulsion shared by the ambient engines. */
export function repelFromPointer(
  p: { x: number; y: number },
  pointer: { x: number; y: number } | null | undefined,
): void {
  if (!pointer) return;
  const dx = p.x - pointer.x;
  const dy = p.y - pointer.y;
  const d = Math.hypot(dx, dy);
  if (d > 0.001 && d < 140) {
    const f = (1 - d / 140) ** 2 * 0.9;
    p.x += (dx / d) * f;
    p.y += (dy / d) * f;
  }
}

export type ResizeDecision = "seed" | "keep" | "rescale";

/** "keep" for URL-bar-style height-only wiggles, "seed" only for the first
 *  real sizing, "rescale" for rotations and genuine window resizes. */
export function classifyResize(
  oldW: number,
  oldH: number,
  newW: number,
  newH: number,
): ResizeDecision {
  if (oldW <= 1 || oldH <= 1) return "seed";
  if (newW === oldW) {
    const dh = Math.abs(newH - oldH);
    if (dh === 0) return "keep";
    if (dh < 160 || dh / oldH < 0.2) return "keep";
  }
  return "rescale";
}

/** Proportionally maps existing node positions into the new bounds and
 *  tops-up/trims to the target count — never re-randomizes survivors. */
export function adaptNodes<T extends { x: number; y: number }>(
  nodes: T[],
  oldW: number,
  oldH: number,
  newW: number,
  newH: number,
  targetCount: number,
  make: (w: number, h: number) => T,
): void {
  const sx = newW / oldW;
  const sy = newH / oldH;
  for (const p of nodes) {
    p.x *= sx;
    p.y *= sy;
  }
  while (nodes.length > targetCount) nodes.pop();
  while (nodes.length < targetCount) nodes.push(make(newW, newH));
}
