"use client";

import { useId } from "react";

type CookieBiteIconProps = {
  size?: number;
  ariaLabel?: string;
};

/** Small on-brand bitten-cookie mark: warm dough, a real bite cut via mask, chips in the site's accent colors. */
export function CookieBiteIcon({ size = 40, ariaLabel }: CookieBiteIconProps) {
  const uid = useId();
  const doughId = `${uid}-dough`;
  const biteId = `${uid}-bite`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={doughId} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="var(--amber)" />
          <stop offset="100%" style={{ stopColor: "color-mix(in srgb, var(--amber) 50%, #2a1608 50%)" }} />
        </radialGradient>
        <mask id={biteId}>
          <rect width="48" height="48" fill="#fff" />
          <circle cx="34" cy="12" r="10" fill="#000" />
        </mask>
      </defs>

      <g mask={`url(#${biteId})`}>
        <circle cx="22" cy="25" r="17" fill={`url(#${doughId})`} />
        <circle cx="19" cy="10" r="1.6" fill="var(--teal)" />
        <circle cx="12" cy="19" r="1.8" fill="var(--iris)" />
        <circle cx="26" cy="22" r="1.5" fill="var(--teal)" />
        <circle cx="12" cy="31" r="1.6" fill="var(--sky)" />
        <circle cx="30" cy="30" r="1.7" fill="var(--iris)" />
        <circle cx="19" cy="34" r="1.5" fill="var(--sky)" />
      </g>

      {/* crumbs escaping the bite */}
      <circle cx="40" cy="20" r="1.6" fill={`url(#${doughId})`} />
      <circle cx="37" cy="7" r="1.1" fill={`url(#${doughId})`} />
    </svg>
  );
}
