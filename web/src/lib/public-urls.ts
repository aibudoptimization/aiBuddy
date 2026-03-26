/**
 * Public env-driven URLs for CTAs. See `.env.example`.
 */
export function getScheduleAuditUrl(): string {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_AUDIT_URL?.trim();
  if (url) return url;
  const cal = process.env.NEXT_PUBLIC_CAL_BOOKING_URL?.trim();
  if (cal) return cal;
  return "#book-audit";
}

/** Header “Schedule audit” only — redirect, not popup. */
export function getScheduleAuditHeaderUrl(): string {
  const header = process.env.NEXT_PUBLIC_SCHEDULE_AUDIT_HEADER_URL?.trim();
  if (header) return header;
  return getScheduleAuditUrl();
}

export function getContactHref(): string {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (email) return `mailto:${email}`;
  return "#contact";
}
