"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { CookieBiteIcon } from "@/components/legal/CookieBiteIcon";
import { CookieCategoriesTable } from "@/components/legal/CookieCategoriesTable";
import { useCookieConsent } from "@/components/legal/CookieConsentContext";

export function CookiePreferencesModal() {
  const { dict, routes } = useLocale();
  const { consent, preferencesOpen, closePreferences, acceptAll, rejectNonEssential, savePreferences } =
    useCookieConsent();
  const t = dict.cookies.modal;
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Re-seed the toggle from the stored consent every time the modal opens (not on every
  // render while it's open, so in-progress edits before Save aren't clobbered).
  const [seededForOpen, setSeededForOpen] = useState(false);
  if (preferencesOpen !== seededForOpen) {
    setSeededForOpen(preferencesOpen);
    if (preferencesOpen) setAnalyticsEnabled(consent?.analytics ?? false);
  }

  useEffect(() => {
    if (!preferencesOpen) return;
    panelRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePreferences();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preferencesOpen, closePreferences]);

  if (!preferencesOpen) return null;

  const updatedDate = consent
    ? new Date(consent.updatedAt).toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div
      className="ww-cookie-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePreferences();
      }}
    >
      <div
        className="ww-cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="ww-cookie-modal__head">
          <CookieBiteIcon size={40} ariaLabel={dict.cookies.iconAriaLabel} />
          <h2 className="ww-cookie-modal__title">{t.title}</h2>
          <button
            type="button"
            className="ww-cookie-modal__close"
            onClick={closePreferences}
            aria-label={t.closeLabel}
          >
            ✕
          </button>
        </div>

        <p className="ww-cookie-modal__intro">{t.intro}</p>

        <CookieCategoriesTable
          categories={dict.cookies.categories}
          alwaysOnLabel={t.alwaysOn}
          interactive
          analyticsEnabled={analyticsEnabled}
          onToggleAnalytics={setAnalyticsEnabled}
        />

        {updatedDate ? (
          <p className="ww-cookie-modal__updated">
            {t.updatedLabel} {updatedDate}
          </p>
        ) : null}

        <div className="ww-cookie-modal__actions">
          <button
            type="button"
            className="ww-cookie-btn ww-cookie-btn--ghost"
            onClick={rejectNonEssential}
          >
            {t.rejectAllButton}
          </button>
          <button
            type="button"
            className="ww-cookie-btn ww-cookie-btn--ghost"
            onClick={acceptAll}
          >
            {t.acceptAllButton}
          </button>
          <button
            type="button"
            className="ww-cookie-btn ww-cookie-btn--solid"
            onClick={() => savePreferences(analyticsEnabled)}
          >
            {t.saveButton}
          </button>
        </div>

        <Link href={routes.privacy} className="ww-cookie-modal__privacy-link" onClick={closePreferences}>
          {t.privacyLinkLabel}
        </Link>
      </div>
    </div>
  );
}
