/** First-party cookie that stores the visitor's cookie-consent choice. */
export const CONSENT_COOKIE_NAME = "ww_consent";
export const CONSENT_MAX_AGE_DAYS = 365;

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export function readConsent(): CookieConsent | null {
  const raw = getCookie(CONSENT_COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { analytics?: unknown; updatedAt?: unknown };
    if (typeof parsed.analytics === "boolean") {
      return {
        necessary: true,
        analytics: parsed.analytics,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
      };
    }
  } catch {
    /* malformed cookie, treat as no choice made */
  }
  return null;
}

export function writeConsent(analytics: boolean): CookieConsent {
  const updatedAt = new Date().toISOString();
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify({ analytics, updatedAt }), CONSENT_MAX_AGE_DAYS);
  return { necessary: true, analytics, updatedAt };
}
