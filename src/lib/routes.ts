/** Canonical path shapes. */
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

/** @deprecated Prefer `paths()` — kept for gradual migration. */
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

export function paths() {
  return {
    home: PATHS.home,
    automatisation: PATHS.automatisation,
    agentsIa: PATHS.agentsIa,
    sitesBoutiques: PATHS.sitesBoutiques,
    journal: PATHS.journal,
    article: (slug: string) => PATHS.article(slug),
    contact: PATHS.contact,
    realisations: PATHS.realisations,
    privacy: PATHS.privacy,
  };
}

export function navItems(labels: { title: string; tag: string }[]): NavItem[] {
  return NAV_META.map((meta, i) => ({
    href: meta.path,
    title: labels[i]?.title ?? "",
    tag: labels[i]?.tag ?? "",
    accent: meta.accent,
    hoverBg: meta.hoverBg,
  }));
}

/** Legacy hardcoded nav (3 services). Prefer `navItems(dict.nav.services)`. */
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
