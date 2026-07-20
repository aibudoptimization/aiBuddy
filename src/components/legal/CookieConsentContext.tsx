"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { readConsent, writeConsent, type CookieConsent } from "@/lib/cookieStorage";
import { INTRO_DONE_EVENT, INTRO_SEEN_KEY } from "@/lib/introFlag";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

/** How long to wait before showing the banner when the splash intro was already seen this session. */
const REVEAL_DELAY_MS = 500;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Lazy-initialized: SSR always sees `document === undefined` (readConsent → null), and
  // consent never gates the initial DOM (banner/modal both start closed), so this can't
  // cause a hydration mismatch.
  const [consent, setConsent] = useState<CookieConsent | null>(() => readConsent());
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (consent) return;

    const reveal = () => setBannerVisible(true);

    let introAlreadySeen = false;
    try {
      introAlreadySeen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      introAlreadySeen = true;
    }

    if (introAlreadySeen) {
      const timer = window.setTimeout(reveal, REVEAL_DELAY_MS);
      return () => window.clearTimeout(timer);
    }

    window.addEventListener(INTRO_DONE_EVENT, reveal, { once: true });
    return () => window.removeEventListener(INTRO_DONE_EVENT, reveal);
  }, [consent]);

  const acceptAll = useCallback(() => {
    setConsent(writeConsent(true));
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent(writeConsent(false));
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback((analytics: boolean) => {
    setConsent(writeConsent(analytics));
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
    setBannerVisible(false);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    if (!consent) setBannerVisible(true);
  }, [consent]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      bannerVisible,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    }),
    [
      consent,
      bannerVisible,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
