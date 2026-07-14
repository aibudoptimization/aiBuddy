export function hexToRgbTuple(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hexToRgbString(hex: string): string {
  const [r, g, b] = hexToRgbTuple(hex);
  return `${r},${g},${b}`;
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function mixRgbStrings(
  a: string,
  b: string,
  phase: number,
): string {
  const A = a.split(",").map(Number);
  const B = b.split(",").map(Number);
  const m = 0.5 + 0.5 * Math.sin(phase);
  return `${Math.round(A[0] + (B[0] - A[0]) * m)},${Math.round(A[1] + (B[1] - A[1]) * m)},${Math.round(A[2] + (B[2] - A[2]) * m)}`;
}
