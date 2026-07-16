export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en";
}

/** Detect locale from a pathname (`/en/...` → en, else fr). */
export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "fr";
}

/** Strip `/en` prefix for matching FR route shapes. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

/** Prefix a site-absolute path for the given locale. */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "fr") return normalized;
  if (normalized === "/") return "/en";
  return `/en${normalized}`;
}

/** Swap FR ↔ EN while preserving the path after the locale prefix. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const bare = stripLocalePrefix(pathname);
  return localizePath(target, bare);
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en-CA" : "fr-CA";
}
