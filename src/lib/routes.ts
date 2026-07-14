export const ROUTES = {
  home: "/",
  automatisation: "/services/automatisation",
  agentsIa: "/services/agents-ia",
  sitesBoutiques: "/services/sites-boutiques",
  journal: "/journal",
  article: (slug: string) => `/journal/${slug}`,
  contact: "/contact",
  privacy: "/politique-de-confidentialite",
} as const;

export const CONTACT_EMAIL = "info@wfwonder.com";

export type ServiceSlug = "automatisation" | "agents-ia" | "sites-boutiques";

export const NAV_ITEMS = [
  {
    href: ROUTES.automatisation,
    title: "Automatisation des workflows",
    tag: "Workflows · agents · relais",
    accent: "#4bfac8",
    hoverBg: "rgba(75,250,200,0.13)",
  },
  {
    href: ROUTES.agentsIa,
    title: "Agents & assistants IA",
    tag: "Agents · IA · décision",
    accent: "#8b7cff",
    hoverBg: "rgba(139,124,255,0.13)",
  },
  {
    href: ROUTES.sitesBoutiques,
    title: "Sites & boutiques en ligne",
    tag: "Sites · boutiques · e-commerce",
    accent: "#f0a94e",
    hoverBg: "rgba(240,169,78,0.13)",
  },
  {
    href: ROUTES.journal,
    title: "Visibilité & performance",
    tag: "Articles · Journal",
    accent: "#6aa8ff",
    hoverBg: "rgba(106,168,255,0.13)",
  },
] as const;
