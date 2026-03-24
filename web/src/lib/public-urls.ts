/**
 * Public env-driven URLs for CTAs. See `.env.example`.
 */
export function getScheduleAuditUrl(): string {
  const url = process.env.NEXT_PUBLIC_SCHEDULE_AUDIT_URL?.trim();
  if (url) return url;
  return "#book-audit";
}

export function getContactHref(): string {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (email) return `mailto:${email}`;
  return "#contact";
}
