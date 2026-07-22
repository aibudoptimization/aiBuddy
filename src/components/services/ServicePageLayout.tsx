import type { ReactNode } from "react";

import { ParticleHeroBg } from "@/components/canvas/ParticleHeroBg";
import { accentStyle, hexToRgb } from "@/lib/accents";

type ServicePageLayoutProps = {
  accent: string;
  accentAlt?: string;
  /** RGB string for hero particle network (defaults to accent color) */
  heroRgb?: string;
  /** RGB string the hero particles slowly drift toward (defaults to iris) */
  heroSecondaryRgb?: string;
  children: ReactNode;
};

export function ServicePageLayout({
  accent,
  accentAlt,
  heroRgb,
  heroSecondaryRgb = "139,124,255",
  children,
}: ServicePageLayoutProps) {
  return (
    <div className="ww-service-page" style={accentStyle(accentAlt ?? accent)}>
      <ParticleHeroBg
        accentRgb={heroRgb ?? hexToRgb(accent)}
        secondaryRgb={heroSecondaryRgb}
      />
      <div className="ww-service-page__fade" aria-hidden />
      <div className="ww-service-page__content">{children}</div>
    </div>
  );
}
