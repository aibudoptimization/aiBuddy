export type CalTelemetryEventName =
  | "schedule_cta_click"
  | "cal_modal_open_attempt"
  | "cal_modal_open_success"
  | "cal_fallback_redirect";

type CalTelemetryPayload = {
  source: "cal_schedule_button";
  variant: "primary" | "secondary" | "link";
  embedEnabled: boolean;
  bookingUrl: string;
  reason?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Minimal, privacy-safe telemetry:
 * - Emits a DOM CustomEvent for app listeners
 * - Pushes to dataLayer if a tag manager is present
 * No PII is included.
 */
export function trackCalTelemetry(
  event: CalTelemetryEventName,
  payload: CalTelemetryPayload,
): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("workflowwonder:cal-telemetry", {
      detail: { event, ...payload },
    }),
  );

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }
}
