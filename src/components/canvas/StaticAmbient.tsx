/**
 * The site's still ambient background, fixed behind the scrolling content —
 * the same viewport-locked feel as the old animated flow field, without the
 * motion. The globe carousel is the site's single living element by design.
 *
 * Composition: ink base + fine dot lattice + two soft color glows (CSS), and
 * a frozen aurora sweep (inline SVG) whose light lifts the lattice where it
 * passes. Colors are tintable per page (service pages pass their accent).
 */
type StaticAmbientProps = {
  /** "r,g,b" — ribbon head + upper glow. Defaults to brand teal. */
  accentRgb?: string;
  /** "r,g,b" — ribbon tail + lower glow. Defaults to brand iris. */
  secondaryRgb?: string;
  /** Quieter rendering for reading-focused pages (journal, contact, legal). */
  quiet?: boolean;
};

function midRgb(a: string, b: string): string {
  const pa = a.split(",").map(Number);
  const pb = b.split(",").map(Number);
  return pa.map((v, i) => Math.round((v + pb[i]) / 2)).join(",");
}

export function StaticAmbient({
  accentRgb = "75,250,200",
  secondaryRgb = "139,124,255",
  quiet = false,
}: StaticAmbientProps) {
  const mid = midRgb(accentRgb, secondaryRgb);
  return (
    <>
      <div
        aria-hidden
        className={`ww-static-ambient${quiet ? " ww-static-ambient--quiet" : ""}`}
        style={{
          ["--amb-a" as string]: accentRgb,
          ["--amb-b" as string]: secondaryRgb,
        }}
      >
        <svg
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ww-amb-main" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={`rgb(${accentRgb})`} stopOpacity="0" />
              <stop offset="0.28" stopColor={`rgb(${accentRgb})`} stopOpacity="0.55" />
              <stop offset="0.62" stopColor={`rgb(${mid})`} stopOpacity="0.5" />
              <stop offset="0.9" stopColor={`rgb(${secondaryRgb})`} stopOpacity="0.42" />
              <stop offset="1" stopColor={`rgb(${secondaryRgb})`} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ww-amb-under" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={`rgb(${secondaryRgb})`} stopOpacity="0" />
              <stop offset="0.35" stopColor={`rgb(${secondaryRgb})`} stopOpacity="0.4" />
              <stop offset="0.75" stopColor={`rgb(${accentRgb})`} stopOpacity="0.32" />
              <stop offset="1" stopColor={`rgb(${accentRgb})`} stopOpacity="0" />
            </linearGradient>
            <filter id="ww-amb-soft" x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="52" />
            </filter>
            <filter id="ww-amb-core" x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          {/* Wide diffuse under-band drifting lower */}
          <path
            d="M -120 840 C 380 780 640 560 940 560 S 1460 660 1740 520"
            fill="none"
            stroke="url(#ww-amb-under)"
            strokeWidth="190"
            strokeLinecap="round"
            filter="url(#ww-amb-soft)"
            opacity="0.34"
          />
          {/* Main sweep */}
          <path
            d="M -120 680 C 420 600 700 300 1010 330 S 1480 520 1760 360"
            fill="none"
            stroke="url(#ww-amb-main)"
            strokeWidth="130"
            strokeLinecap="round"
            filter="url(#ww-amb-soft)"
            opacity="0.42"
          />
          {/* Bright core thread along the main sweep */}
          <path
            d="M -120 680 C 420 600 700 300 1010 330 S 1480 520 1760 360"
            fill="none"
            stroke="url(#ww-amb-main)"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#ww-amb-core)"
            opacity="0.5"
          />
        </svg>
      </div>
      <div aria-hidden className="ww-home-ambient__veil" />
    </>
  );
}
