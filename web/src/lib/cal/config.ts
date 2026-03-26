/**
 * Cal.com booking — reads public env (NEXT_PUBLIC_*). Safe on server and client.
 */

/** Matches `web/src/app/globals.css` `--accent` */
export const CAL_BRAND_COLOR = "#c5a028";

export function getCalBookingUrlFromEnv(): string | undefined {
  const cal = process.env.NEXT_PUBLIC_CAL_BOOKING_URL?.trim();
  if (cal) return cal;
  return process.env.NEXT_PUBLIC_SCHEDULE_AUDIT_URL?.trim();
}

export function isCalEmbedEnabledFromEnv(): boolean {
  const v = process.env.NEXT_PUBLIC_CAL_EMBED_ENABLED?.trim().toLowerCase();
  return v === "true" || v === "1";
}

/**
 * `calLink` path for Cal embed API, e.g. `https://cal.com/acme/audit` → `acme/audit`.
 */
export function calLinkFromBookingUrl(bookingUrl: string): string | null {
  try {
    const path = new URL(bookingUrl).pathname.replace(/^\/+|\/+$/g, "");
    return path || null;
  } catch {
    return null;
  }
}

/** `Cal("init", { origin })` — use booking URL host for self-hosted. */
export function getCalInitOrigin(bookingUrl: string): string {
  try {
    const u = new URL(bookingUrl);
    if (u.hostname === "cal.com" || u.hostname.endsWith(".cal.com")) {
      // Cal's embed runtime is hosted on app.cal.com.
      return "https://app.cal.com";
    }
    return u.origin;
  } catch {
    return "https://app.cal.com";
  }
}
