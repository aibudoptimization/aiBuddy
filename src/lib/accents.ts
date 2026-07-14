export function hexToRgb(hex: string): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

import type { CSSProperties } from "react";

export function accentStyle(accent: string): CSSProperties {
  const rgb = hexToRgb(accent);
  return {
    ["--accent" as string]: accent,
    ["--accent-rgb" as string]: rgb,
  };
}
