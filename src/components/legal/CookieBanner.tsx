"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { CookieBiteIcon } from "@/components/legal/CookieBiteIcon";
import { useCookieConsent } from "@/components/legal/CookieConsentContext";

export function CookieBanner() {
  const { dict, routes } = useLocale();
  const { bannerVisible, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const t = dict.cookies.banner;

  if (!bannerVisible) return null;

  return (
    <div className="ww-cookie-banner" role="region" aria-label={t.title}>
      <div className="ww-cookie-banner__inner">
        <div className="ww-cookie-banner__copy">
          <CookieBiteIcon size={36} ariaLabel={dict.cookies.iconAriaLabel} />
          <div className="ww-cookie-banner__text">
            <p className="ww-cookie-banner__title">{t.title}</p>
            <p className="ww-cookie-banner__body">
              {t.body}{" "}
              <Link href={routes.privacy} className="ww-cookie-banner__link">
                {t.privacyLinkLabel}
              </Link>
            </p>
          </div>
        </div>

        <div className="ww-cookie-banner__actions">
          <button
            type="button"
            className="ww-cookie-btn ww-cookie-btn--ghost"
            onClick={rejectNonEssential}
          >
            {t.rejectNonEssential}
          </button>
          <button type="button" className="ww-cookie-btn ww-cookie-btn--solid" onClick={acceptAll}>
            {t.acceptAll}
          </button>
          <button type="button" className="ww-cookie-banner__manage" onClick={openPreferences}>
            {t.managePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
