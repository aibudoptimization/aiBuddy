import { getCalApi } from "@calcom/embed-react";
import { CAL_BRAND_COLOR, calLinkFromBookingUrl, getCalInitOrigin } from "@/lib/cal/config";

const CAL_INIT_TIMEOUT_MS = 12_000;

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function loadWithTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    promise.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

/**
 * Opens Cal popup embed. Throws on failure so callers can fall back (e.g. redirect).
 */
export async function openCalSchedulePopup(bookingUrl: string): Promise<void> {
  const calLink = calLinkFromBookingUrl(bookingUrl);
  if (!calLink) {
    throw new Error("Invalid Cal booking URL");
  }

  const Cal = await loadWithTimeout(getCalApi(), CAL_INIT_TIMEOUT_MS, "Cal embed init");

  const origin = getCalInitOrigin(bookingUrl);

  try {
    Cal("init", { origin });
  } catch {
    /* init may throw if already initialized */
  }

  try {
    Cal("ui", {
      theme: "dark",
      styles: {
        branding: {
          brandColor: CAL_BRAND_COLOR,
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  } catch {
    /* ui may be unsupported in some embed versions */
  }

  try {
    Cal("modal", { calLink });
  } catch (error) {
    throw new Error(`Cal modal failed: ${toErrorMessage(error)}`);
  }
}
