"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { BrandSplash } from "@/components/layout/BrandSplash";
import { ConstructionMarquee } from "@/components/layout/ConstructionMarquee";
import { RouteChangeShell } from "@/components/layout/RouteChangeShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { localeFromPathname, type Locale } from "@/lib/locale";

type MarketingChromeProps = {
  children: ReactNode;
  /** Optional explicit locale; otherwise inferred from pathname. */
  locale?: Locale;
};

export function MarketingChrome({ children, locale: localeProp }: MarketingChromeProps) {
  const pathname = usePathname();
  const locale = localeProp ?? localeFromPathname(pathname);

  return (
    <LocaleProvider locale={locale}>
      <div className="ww-page ww-page--construction">
        <BrandSplash />
        <div className="ww-site-chrome">
          <ConstructionMarquee />
          <SiteHeader fixed={false} />
        </div>
        <div className="ww-site-chrome-spacer" aria-hidden />
        <RouteChangeShell>{children}</RouteChangeShell>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
