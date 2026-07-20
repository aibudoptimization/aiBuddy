"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { BrandSplash } from "@/components/layout/BrandSplash";
import { RouteChangeShell } from "@/components/layout/RouteChangeShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { CookieConsentProvider } from "@/components/legal/CookieConsentContext";
import { CookiePreferencesModal } from "@/components/legal/CookiePreferencesModal";
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
      <CookieConsentProvider>
        <div className="ww-page">
          <BrandSplash />
          <div className="ww-site-chrome">
            <SiteHeader fixed={false} />
          </div>
          <div className="ww-site-chrome-spacer" aria-hidden />
          <RouteChangeShell>{children}</RouteChangeShell>
          <SiteFooter />
        </div>
        <CookieBanner />
        <CookiePreferencesModal />
      </CookieConsentProvider>
    </LocaleProvider>
  );
}
