/** Legacy query key; prefer dedicated paths under `/services/`. */
export const SERVICES_PAGE_SERVICE_QUERY = "service" as const;

export const SERVICES_PAGE_BASE_PATH = "/services" as const;
export const SERVICES_WEB_DESIGN_PATH = "/services/web-design" as const;
export const SERVICES_AUTOMATION_PATH = "/services/automation" as const;

/** Must match tab `id` values in `ServicesPageContent`. */
export const WEB_DESIGN_DEVELOPMENT_TAB_ID = "web-design-development" as const;
export const AUTOMATED_WORKFLOWS_TAB_ID = "automated-workflows" as const;

export type ServicesTabId = typeof WEB_DESIGN_DEVELOPMENT_TAB_ID | typeof AUTOMATED_WORKFLOWS_TAB_ID;

export function servicePathForTabId(tabId: string): string {
  if (tabId === WEB_DESIGN_DEVELOPMENT_TAB_ID) return SERVICES_WEB_DESIGN_PATH;
  if (tabId === AUTOMATED_WORKFLOWS_TAB_ID) return SERVICES_AUTOMATION_PATH;
  return SERVICES_PAGE_BASE_PATH;
}

export function serviceIdFromPathname(pathname: string): ServicesTabId | undefined {
  if (pathname === SERVICES_WEB_DESIGN_PATH) return WEB_DESIGN_DEVELOPMENT_TAB_ID;
  if (pathname === SERVICES_AUTOMATION_PATH) return AUTOMATED_WORKFLOWS_TAB_ID;
  return undefined;
}

/** Stable URLs for marketing links and cards. */
export function servicesPageDeepLink(tabId: string) {
  return servicePathForTabId(tabId);
}
