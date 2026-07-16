export type SiteIconKey =
  | "cup"
  | "bag"
  | "briefcase"
  | "house"
  | "wrench"
  | "calendar"
  | "camera"
  | "cross";

export const SITE_ICONS: Record<SiteIconKey, string[]> = {
  cup: [
    "M5 8h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z",
    "M16 9h2a2 2 0 0 1 0 4h-2",
    "M7 4v1.5",
    "M10 4v1.5",
    "M13 4v1.5",
  ],
  bag: ["M6 8h12l1 11H5z", "M9 8V6.5a3 3 0 0 1 6 0V8"],
  briefcase: ["M4 8h16v11H4z", "M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", "M4 13h16"],
  house: ["M4 11l8-6 8 6", "M6 10v9h12v-9", "M10 19v-5h4v5"],
  wrench: [
    "M15.5 4.6a4 4 0 0 0-5.2 5.2l-6 6 2.4 2.4 6-6a4 4 0 0 0 5.2-5.2l-2.3 2.3-2.1-.5-.5-2.1z",
  ],
  calendar: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
  camera: ["M4 8h3l1.5-2h7L17 8h3v11H4z", "M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  cross: ["M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"],
};

export type HeroLayout = "menu" | "shop" | "booking" | "realty";

export type HeroDef = {
  domain: string;
  hl: string;
  icon: SiteIconKey;
  color: string;
  side: "left" | "right";
  layout: HeroLayout;
};

export const HEROES: HeroDef[] = [
  {
    domain: "labonnetable.ca",
    hl: "Réservez votre table en deux clics",
    icon: "cup",
    color: "#ff7a6b",
    side: "right",
    layout: "menu",
  },
  {
    domain: "atelier-nord.shop",
    hl: "La boutique de vos artisans locaux",
    icon: "bag",
    color: "#f0a94e",
    side: "left",
    layout: "shop",
  },
  {
    domain: "clinique-seve.ca",
    hl: "Prenez rendez-vous en ligne, 24/7",
    icon: "cross",
    color: "#4bfac8",
    side: "right",
    layout: "booking",
  },
  {
    domain: "maisons-du-quartier.ca",
    hl: "Trouvez la propriété qui vous ressemble",
    icon: "house",
    color: "#6aa8ff",
    side: "left",
    layout: "realty",
  },
];

export type NichePanel = {
  name: string;
  tag: string;
  color: string;
  icon: SiteIconKey;
  domain: string;
  demoHref: string;
  desc: string;
  preview?: string;
};

export const PANELS: NichePanel[] = [
  {
    name: "Boutique e-commerce",
    tag: "E-COMMERCE",
    color: "#f0a94e",
    icon: "bag",
    domain: "boutique.ca",
    demoHref: "https://e-commerce-demo-lemon.vercel.app/",
    desc: "Vendez vos produits locaux en ligne. Paiement, stock et livraison inclus.",
    preview: "/demo-ecommerce-wide.mp4",
  },
  {
    name: "Services pro",
    tag: "SERVICES",
    color: "#4bfac8",
    icon: "briefcase",
    domain: "cabinet.ca",
    demoHref: "https://service-pro-demo.vercel.app/",
    desc: "Clinique, cabinet, comptable : prise de rendez-vous et confiance.",
    preview: "/demo-comptable-wide.mp4",
  },
  {
    name: "Restaurant / café",
    tag: "RESTAURATION",
    color: "#ff7a6b",
    icon: "cup",
    domain: "restaurant.ca",
    demoHref: "https://restauration-demo.vercel.app/",
    desc: "Menu, réservations et commandes, sans frais de plateforme.",
    preview: "/demo-bistro-wide.mp4",
  },
  {
    name: "Immobilier",
    tag: "IMMOBILIER",
    color: "#6aa8ff",
    icon: "house",
    domain: "courtier.ca",
    demoHref: "https://immobilier-demo-rho.vercel.app/",
    desc: "Vos inscriptions mises en valeur, visites guidées en ligne.",
    preview: "/demo-immobilier-wide.mp4",
  },
  {
    name: "Artisan & métiers",
    tag: "MÉTIERS",
    color: "#7bd88f",
    icon: "wrench",
    domain: "metier.ca",
    demoHref: "https://metier-demo.vercel.app/",
    desc: "Plombier, paysagiste, électricien : devis et réputation en ligne.",
    preview: "/demo-metiers-wide.mp4",
  },
  {
    name: "Événementiel",
    tag: "ÉVÉNEMENTS",
    color: "#c084fc",
    icon: "calendar",
    domain: "evenement.ca",
    demoHref: "#",
    desc: "Mariage, festival : page d'événement, billetterie et galerie.",
  },
  {
    name: "Portfolio créatif",
    tag: "PORTFOLIO",
    color: "#f472b6",
    icon: "camera",
    domain: "portfolio.ca",
    demoHref: "#",
    desc: "Photographe, designer : un portfolio qui décroche des contrats.",
  },
];

export const BUILD_CHIP_LABELS = ["Structure", "Design", "Contenu", "En ligne"];
export const BUILD_PHASES = [350, 900, 1400, 2000, 2600];
export const BUILD_CURSOR: Record<number, [number, number]> = {
  1: [60, 38],
  2: [120, 235],
  3: [560, 235],
  4: [400, 405],
  5: [400, 470],
};
export const BUILD_CYCLE = 7200;
export const BUILD_FADE = 6500;
export const SITES_LAYER_W = 1180;
export const SITES_LAYER_H = 600;
