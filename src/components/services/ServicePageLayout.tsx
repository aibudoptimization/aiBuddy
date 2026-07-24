import type { ReactNode } from "react";

import { StaticAmbient } from "@/components/canvas/StaticAmbient";
import { accentStyle, hexToRgb } from "@/lib/accents";

type ServicePageLayoutProps = {
  accent: string;
  accentAlt?: string;
  /** RGB string tinting the ambient aurora (defaults to accent color) */
  heroRgb?: string;
  /** RGB string for the aurora's tail + lower glow (defaults to iris) */
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
      <StaticAmbient
        accentRgb={heroRgb ?? hexToRgb(accent)}
        secondaryRgb={heroSecondaryRgb}
      />
      <div className="ww-service-page__content">{children}</div>
    </div>
  );
}
