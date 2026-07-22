import { isLocale, type Locale } from "@/lib/locale";

/** Persisted language preference, set from the splash picker or the header
 *  locale switch. Read on first load of a session to auto-apply. */
export const LANG_PREF_KEY = "ww-lang";
/** Session flag: the preference has been applied (or explicitly set) this
 *  session, so we never redirect against the user's in-session navigation. */
export const LANG_APPLIED_KEY = "ww-lang-applied";

export function readLangPref(): Locale | null {
  try {
    const v = localStorage.getItem(LANG_PREF_KEY);
    return v && isLocale(v) ? v : null;
  } catch {
    return null;
  }
}

export function saveLangPref(locale: Locale): void {
  try {
    localStorage.setItem(LANG_PREF_KEY, locale);
    sessionStorage.setItem(LANG_APPLIED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function langPrefApplied(): boolean {
  try {
    return sessionStorage.getItem(LANG_APPLIED_KEY) === "1";
  } catch {
    return true;
  }
}

export function markLangPrefApplied(): void {
  try {
    sessionStorage.setItem(LANG_APPLIED_KEY, "1");
  } catch {
    /* ignore */
  }
}
