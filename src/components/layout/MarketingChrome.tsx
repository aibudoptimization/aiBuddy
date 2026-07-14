"use client";

import type { ReactNode } from "react";

import { ConstructionMarquee } from "@/components/layout/ConstructionMarquee";
import { RouteChangeShell } from "@/components/layout/RouteChangeShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type MarketingChromeProps = {
  children: ReactNode;
};

export function MarketingChrome({ children }: MarketingChromeProps) {
  return (
    <div className="ww-page ww-page--construction">
      <div className="ww-site-chrome">
        <ConstructionMarquee />
        <SiteHeader fixed={false} />
      </div>
      <div className="ww-site-chrome-spacer" aria-hidden />
      <RouteChangeShell>{children}</RouteChangeShell>
      <SiteFooter />
    </div>
  );
}
