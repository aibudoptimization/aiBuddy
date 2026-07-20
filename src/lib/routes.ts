import { localizePath, type Locale } from "@/lib/locale";

/** Locale-agnostic path shapes (always French URL segments). */
export const PATHS = {
  home: "/",
  automatisation: "/services/automatisation",
  agentsIa: "/services/agents-ia",
  sitesBoutiques: "/services/sites-boutiques",
  journal: "/journal",
  article: (slug: string) => `/journal/${slug}`,
  contact: "/contact",
  realisations: "/realisations",
  privacy: "/politique-de-confidentialite",
} as const;

/** @deprecated Prefer `paths(locale)` — kept for gradual migration. Defaults to FR. */
export const ROUTES = {
  home: PATHS.home,
  automatisation: PATHS.automatisation,
  agentsIa: PATHS.agentsIa,
  sitesBoutiques: PATHS.sitesBoutiques,
  journal: PATHS.journal,
  article: PATHS.article,
  contact: PATHS.contact,
  privacy: PATHS.privacy,
} as const;

export const CONTACT_EMAIL = "info@wfwonder.com";

export type ServiceSlug = "automatisation" | "agents-ia" | "sites-boutiques";

export type NavItem = {
  href: string;
  title: string;
  tag: string;
  accent: string;
  hoverBg: string;
};

const NAV_META = [
  {
    path: PATHS.automatisation,
    accent: "#4bfac8",
    hoverBg: "rgba(75,250,200,0.13)",
  },
  {
    path: PATHS.agentsIa,
    accent: "#8b7cff",
    hoverBg: "rgba(139,124,255,0.13)",
  },
  {
    path: PATHS.sitesBoutiques,
    accent: "#f0a94e",
    hoverBg: "rgba(240,169,78,0.13)",
  },
] as const;

export function paths(locale: Locale = "fr") {
  return {
    home: localizePath(locale, PATHS.home),
    automatisation: localizePath(locale, PATHS.automatisation),
    agentsIa: localizePath(locale, PATHS.agentsIa),
    sitesBoutiques: localizePath(locale, PATHS.sitesBoutiques),
    journal: localizePath(locale, PATHS.journal),
    article: (slug: string) => localizePath(locale, PATHS.article(slug)),
    contact: localizePath(locale, PATHS.contact),
    realisations: localizePath(locale, PATHS.realisations),
    privacy: localizePath(locale, PATHS.privacy),
  };
}

export function navItems(
  locale: Locale,
  labels: { title: string; tag: string }[],
): NavItem[] {
  return NAV_META.map((meta, i) => ({
    href: localizePath(locale, meta.path),
    title: labels[i]?.title ?? "",
    tag: labels[i]?.tag ?? "",
    accent: meta.accent,
    hoverBg: meta.hoverBg,
  }));
}

/** Legacy FR-only nav (3 services). Prefer `navItems(locale, dict.nav.services)`. */
export const NAV_ITEMS: NavItem[] = [
  {
    href: PATHS.automatisation,
    title: "Automatisation des workflows",
    tag: "Workflows · agents · relais",
    accent: "#4bfac8",
    hoverBg: "rgba(75,250,200,0.13)",
  },
  {
    href: PATHS.agentsIa,
    title: "Agents & assistants IA",
    tag: "Agents · IA · décision",
    accent: "#8b7cff",
    hoverBg: "rgba(139,124,255,0.13)",
  },
  {
    href: PATHS.sitesBoutiques,
    title: "Sites & boutiques en ligne",
    tag: "Sites · boutiques · e-commerce",
    accent: "#f0a94e",
    hoverBg: "rgba(240,169,78,0.13)",
  },
];
