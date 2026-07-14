import type { ReactNode } from "react";

import { ParticleHeroBg } from "@/components/canvas/ParticleHeroBg";
import { accentStyle, hexToRgb } from "@/lib/accents";

type ServicePageLayoutProps = {
  accent: string;
  accentAlt?: string;
  /** RGB string for hero particle network (defaults to accent color) */
  heroRgb?: string;
  children: ReactNode;
};

export function ServicePageLayout({
  accent,
  accentAlt,
  heroRgb,
  children,
}: ServicePageLayoutProps) {
  return (
    <div className="ww-service-page" style={accentStyle(accentAlt ?? accent)}>
      <ParticleHeroBg accentRgb={heroRgb ?? hexToRgb(accent)} />
      <div className="ww-service-page__fade" aria-hidden />
      <div className="ww-service-page__content">{children}</div>
    </div>
  );
}
