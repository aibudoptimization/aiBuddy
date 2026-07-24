"use client";

import type { ReactNode } from "react";

import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { BrandSplash } from "@/components/layout/BrandSplash";
import { RouteChangeShell } from "@/components/layout/RouteChangeShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { CookieConsentProvider } from "@/components/legal/CookieConsentContext";
import { CookiePreferencesModal } from "@/components/legal/CookiePreferencesModal";

export function MarketingChrome({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
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
