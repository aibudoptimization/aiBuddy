/** Query key for deep-linking a service tab on `/services`. */
export const SERVICES_PAGE_SERVICE_QUERY = "service" as const;

/** Must match tab `id` values in `ServicesPageContent`. */
export const WEB_DESIGN_DEVELOPMENT_TAB_ID = "web-design-development" as const;
export const AUTOMATED_WORKFLOWS_TAB_ID = "automated-workflows" as const;

export function servicesPageDeepLink(tabId: string) {
  const q = new URLSearchParams();
  q.set(SERVICES_PAGE_SERVICE_QUERY, tabId);
  return `/services?${q.toString()}`;
}
