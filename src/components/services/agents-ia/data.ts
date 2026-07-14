export type IconKey =
  | "chat"
  | "chart"
  | "inbox"
  | "ticket"
  | "ear"
  | "memory"
  | "book"
  | "database"
  | "plug"
  | "send";

export const ICONS: Record<IconKey, string[]> = {
  chat: ["M4 5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 0-1z"],
  chart: ["M5 5v14h14", "M9 15v-3", "M13 15V9", "M17 15v-5"],
  inbox: ["M4 13h4l1.5 2.5h5L16 13h4", "M4 13l2-8h12l2 8v6H4z"],
  ticket: ["M4 7h16v4a1.6 1.6 0 0 0 0 3.2V18H4v-3.8A1.6 1.6 0 0 0 4 11z", "M14 7v11"],
  ear: [
    "M9 8.5a3.2 3.2 0 1 1 5.4 2.3c-1 .9-1.7 1.5-1.7 2.7a1.9 1.9 0 0 1-3.4 1.1",
    "M9.4 17.4a3 3 0 0 0 2.2 1",
  ],
  memory: [
    "M12 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 12 19.5a3 3 0 0 0 4-5.2 3 3 0 0 0-1-6.8 3 3 0 0 0-3-3z",
    "M12 4.5v15",
  ],
  book: ["M6 5h11a1 1 0 0 1 1 1v13H8a2 2 0 0 0-2 2z", "M6 5a2 2 0 0 0-2 2v12", "M9.5 9h5"],
  database: [
    "M12 4c4 0 7 1 7 2.5S16 9 12 9 5 8 5 6.5 8 4 12 4z",
    "M5 6.5v11C5 19 8 20 12 20s7-1 7-2.5v-11",
    "M5 12c0 1.5 3 2.5 7 2.5s7-1 7-2.5",
  ],
  plug: ["M9 3v6", "M15 3v6", "M7 9h10v2a5 5 0 0 1-10 0z", "M12 16v5"],
  send: ["M5 12l15-7-7 15-2.2-5.8z", "M11 13.2l6.5-6.2"],
};

export type OrbitDef = {
  key: string;
  label: string;
  icon: IconKey;
  a: number;
  role: "in" | "tool" | "out";
};

export const ORBITS: OrbitDef[] = [
  { key: "comprend", label: "Comprend", icon: "ear", a: -90, role: "in" },
  { key: "memoire", label: "Mémoire", icon: "memory", a: -30, role: "tool" },
  { key: "connaissances", label: "Connaissances", icon: "book", a: 30, role: "tool" },
  { key: "donnees", label: "Données", icon: "database", a: 90, role: "tool" },
  { key: "outils", label: "Outils", icon: "plug", a: 150, role: "tool" },
  { key: "repond", label: "Répond", icon: "send", a: 210, role: "out" },
];

export type ScenarioStep = {
  at: number;
  kind: "in" | "tool" | "out";
  text: string;
  node?: string;
};

export type Scenario = {
  short: string;
  agent: string;
  surface: string;
  icon: IconKey;
  steps: ScenarioStep[];
};

export const SCEN: Scenario[] = [
  {
    short: "Chatbot",
    agent: "Assistant conversationnel",
    surface: "Chat, site web",
    icon: "chat",
    steps: [
      { at: 400, kind: "in", text: "Bonjour ! Vous livrez à Québec ?" },
      { at: 1700, kind: "tool", node: "connaissances", text: "Consulte la base de connaissances" },
      { at: 3200, kind: "out", text: "Oui, livraison en 24–48 h partout au Québec." },
    ],
  },
  {
    short: "Analyste",
    agent: "Analyste de données",
    surface: "Tableau de bord",
    icon: "chart",
    steps: [
      { at: 400, kind: "in", text: "Comment vont les ventes cette semaine ?" },
      { at: 1700, kind: "tool", node: "donnees", text: "Interroge les données de ventes" },
      { at: 2900, kind: "tool", node: "memoire", text: "Compare à la semaine passée" },
      { at: 4300, kind: "out", text: "+18 % cette semaine. Pic le jeudi, rapport prêt." },
    ],
  },
  {
    short: "Courriels",
    agent: "Gestionnaire de courriels",
    surface: "Boîte de réception",
    icon: "inbox",
    steps: [
      { at: 400, kind: "in", text: "Objet : Demande de remboursement" },
      { at: 1700, kind: "tool", node: "connaissances", text: "Vérifie la politique de retour" },
      { at: 2900, kind: "tool", node: "outils", text: "Classe : Facturation" },
      { at: 4300, kind: "out", text: "Brouillon prêt + étiquette « Facturation » appliquée." },
    ],
  },
  {
    short: "Support",
    agent: "Support client",
    surface: "Tickets",
    icon: "ticket",
    steps: [
      { at: 400, kind: "in", text: "Où est ma commande #4471 ?" },
      { at: 1700, kind: "tool", node: "outils", text: "Vérifie le CRM" },
      { at: 2900, kind: "tool", node: "donnees", text: "Suit le colis" },
      { at: 4300, kind: "out", text: "En transit, livraison demain. Suivi envoyé au client." },
    ],
  },
];

export const AGENT_HOLD = 2600;
export const AGENT_OX = 0.655;
export const AGENT_OY = 0.5;
export const AGENT_R = 205;
export const AGENT_LAYER_W = 1180;
export const AGENT_LAYER_H = 780;
