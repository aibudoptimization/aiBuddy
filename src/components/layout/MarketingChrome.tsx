"use client";

import { useRef, type ReactNode } from "react";

import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { BrandSplash } from "@/components/layout/BrandSplash";
import { ChromeSpacer } from "@/components/layout/ChromeSpacer";
import { RouteChangeShell } from "@/components/layout/RouteChangeShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { CookieConsentProvider } from "@/components/legal/CookieConsentContext";
import { CookiePreferencesModal } from "@/components/legal/CookiePreferencesModal";

export function MarketingChrome({ children }: { children: ReactNode }) {
  const chromeRef = useRef<HTMLDivElement>(null);

  return (
    <LocaleProvider>
      <CookieConsentProvider>
        <div className="ww-page">
          <BrandSplash />
          <div className="ww-site-chrome" ref={chromeRef}>
            <SiteHeader fixed={false} />
          </div>
          <ChromeSpacer chromeRef={chromeRef} />
          <RouteChangeShell>{children}</RouteChangeShell>
          <SiteFooter />
        </div>
        <CookieBanner />
        <CookiePreferencesModal />
      </CookieConsentProvider>
    </LocaleProvider>
  );
}
