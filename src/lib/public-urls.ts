/**
 * Public env-driven URLs for CTAs. Optional `VITE_*` vars in `.env` at repo root.
 */
export function getScheduleAuditUrl(): string {
  const url = import.meta.env.VITE_SCHEDULE_AUDIT_URL?.trim()
  if (url) return url
  const cal = import.meta.env.VITE_CAL_BOOKING_URL?.trim()
  if (cal) return cal
  return "/#contact"
}

export function getN8nFormUrl(): string {
  const url = import.meta.env.VITE_N8N_FORM_URL?.trim()
  if (url) return url
  return "/#contact"
}
