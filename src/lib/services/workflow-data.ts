export const STAGE_WIDTH = 1180;
export const STAGE_HEIGHT = 1240;

export const WORKFLOW_ICONS = {
  lead: ["M12 6a3 3 0 1 0 .01 0", "M6 19c0-3.6 12-3.6 12 0"],
  branch: ["M4 12h6", "M10 12l8-6", "M10 12l8 6"],
  clock: ["M12 4a8 8 0 1 0 .01 0", "M12 8v4l3 2"],
  mail: ["M3 6.5h18v11H3z", "M3 7l9 6 9-6"],
  chat: [
    "M4 5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 0-1z",
  ],
  calendar: ["M5 6h14v14H5z", "M5 10h14", "M9 4v3", "M15 4v3"],
  search: ["M11 5a6 6 0 1 0 .01 0", "M20 20l-4.5-4.5"],
  shield: ["M12 4l7 3v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7z"],
  shieldalert: ["M12 4l7 3v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7z", "M12 9.5v3.4"],
  lock: ["M6 11h12v9H6z", "M8 11V8a4 4 0 0 1 8 0v3"],
  bell: [
    "M12 4a5 5 0 0 0-5 5v3l-1.5 2.5h13L17 12V9a5 5 0 0 0-5-5z",
    "M10 18a2 2 0 0 0 4 0",
  ],
  list: ["M4 6h3.5v3.5H4z", "M4 14.5h3.5v3.5H4z", "M11 7.5h9", "M11 16h9"],
  tag: ["M4 4h7l9 9-7 7-9-9z", "M8 8h.01"],
  check: ["M4.5 12.5l4.5 4.5 10.5-11"],
  briefcase: ["M3 8h18v11H3z", "M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  invoice: ["M7 3h7l4 4v14H7z", "M14 3v4h4", "M9.5 12h5", "M9.5 15.5h3"],
  card: ["M3 6.5h18v11H3z", "M3 10.5h18"],
} as const;

export type WorkflowIconKey = keyof typeof WORKFLOW_ICONS;
export type WorkflowColor = "a" | "b";
export type WorkflowNodeType = "trigger" | "cond" | "action" | "pill";

export type WorkflowNode = {
  id: string;
  fx: number;
  fy: number;
  c: WorkflowColor;
  type: WorkflowNodeType;
  label: string;
  sub?: string;
  icon?: WorkflowIconKey;
};

export type WorkflowLane = {
  no: string;
  title: string;
  tag: string;
  fy: number;
};

export type WorkflowEdge = [from: string, to: string, color: WorkflowColor, dashed: 0 | 1];

export type WorkflowScenario = {
  path: string[];
  c: WorkflowColor;
  mult: number;
};

export type WorkflowSpeed = "calme" | "normal" | "rapide";

export const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: "s_lead",
    fx: 0.205,
    fy: 0.09,
    c: "a",
    type: "trigger",
    label: "Nouveau lead",
    sub: "Formulaire · courriel",
    icon: "lead",
  },
  {
    id: "n_triage",
    fx: 0.41,
    fy: 0.09,
    c: "b",
    type: "cond",
    label: "Triage",
    sub: "SI source / score",
    icon: "branch",
  },
  { id: "t_chaud", fx: 0.6, fy: 0.045, c: "a", type: "pill", label: "Chaud" },
  { id: "t_tiede", fx: 0.6, fy: 0.09, c: "a", type: "pill", label: "Tiède" },
  { id: "t_froid", fx: 0.6, fy: 0.135, c: "b", type: "pill", label: "Froid" },
  {
    id: "e_lead",
    fx: 0.205,
    fy: 0.2275,
    c: "a",
    type: "trigger",
    label: "Lead créé",
    sub: "Même déclencheur",
    icon: "lead",
  },
  {
    id: "e_fetch",
    fx: 0.42,
    fy: 0.2275,
    c: "a",
    type: "action",
    label: "Récupère les infos",
    sub: "Entreprise · secteur",
    icon: "search",
  },
  {
    id: "e_crm",
    fx: 0.64,
    fy: 0.2275,
    c: "a",
    type: "action",
    label: "Fiche CRM enrichie",
    sub: "Mise à jour auto",
    icon: "lead",
  },
  {
    id: "b_trig",
    fx: 0.205,
    fy: 0.365,
    c: "b",
    type: "trigger",
    label: "Lead froid",
    sub: "Depuis le triage",
    icon: "clock",
  },
  {
    id: "b_wait",
    fx: 0.41,
    fy: 0.365,
    c: "b",
    type: "cond",
    label: "Attendre 1 jour",
    sub: "SI pas de réponse",
    icon: "clock",
  },
  {
    id: "b_mail",
    fx: 0.61,
    fy: 0.365,
    c: "a",
    type: "action",
    label: "Courriel de relance",
    sub: "Séquence J+1",
    icon: "mail",
  },
  {
    id: "b_sms",
    fx: 0.8,
    fy: 0.365,
    c: "a",
    type: "action",
    label: "SMS de relance",
    sub: "Séquence J+3",
    icon: "chat",
  },
  {
    id: "c_book",
    fx: 0.205,
    fy: 0.5025,
    c: "a",
    type: "trigger",
    label: "Audit réservé",
    sub: "Calendrier",
    icon: "calendar",
  },
  {
    id: "c_when",
    fx: 0.41,
    fy: 0.5025,
    c: "b",
    type: "cond",
    label: "24 h avant",
    sub: "SI RDV ≤ 24 h",
    icon: "clock",
  },
  {
    id: "c_mail",
    fx: 0.61,
    fy: 0.5025,
    c: "a",
    type: "action",
    label: "Rappel courriel",
    sub: "Confirmation",
    icon: "mail",
  },
  {
    id: "c_sms",
    fx: 0.8,
    fy: 0.5025,
    c: "a",
    type: "action",
    label: "Rappel SMS",
    sub: "24 h avant",
    icon: "chat",
  },
  {
    id: "d_deal",
    fx: 0.205,
    fy: 0.64,
    c: "a",
    type: "trigger",
    label: "Entente signée",
    sub: "Devis accepté",
    icon: "check",
  },
  {
    id: "d_work",
    fx: 0.41,
    fy: 0.64,
    c: "b",
    type: "cond",
    label: "Projet livré",
    sub: "SI travail terminé",
    icon: "briefcase",
  },
  {
    id: "d_invoice",
    fx: 0.61,
    fy: 0.64,
    c: "a",
    type: "action",
    label: "Facture générée",
    sub: "Automatique",
    icon: "invoice",
  },
  {
    id: "d_pay",
    fx: 0.8,
    fy: 0.64,
    c: "a",
    type: "action",
    label: "Paiement & reçu",
    sub: "Lien envoyé au client",
    icon: "card",
  },
  {
    id: "x_susp",
    fx: 0.205,
    fy: 0.7775,
    c: "b",
    type: "trigger",
    label: "Activité suspecte",
    sub: "Connexion · paiement",
    icon: "shieldalert",
  },
  {
    id: "x_rule",
    fx: 0.41,
    fy: 0.7775,
    c: "b",
    type: "cond",
    label: "Règle déclenchée",
    sub: "SI seuil dépassé",
    icon: "shield",
  },
  {
    id: "x_block",
    fx: 0.61,
    fy: 0.7775,
    c: "a",
    type: "action",
    label: "Bloquer & isoler",
    sub: "Accès suspendu",
    icon: "lock",
  },
  {
    id: "x_alert",
    fx: 0.8,
    fy: 0.7775,
    c: "a",
    type: "action",
    label: "Alerter l'équipe",
    sub: "Notification",
    icon: "bell",
  },
  {
    id: "p_list",
    fx: 0.205,
    fy: 0.915,
    c: "a",
    type: "trigger",
    label: "Liste d'abonnés",
    sub: "Segment ciblé",
    icon: "list",
  },
  {
    id: "p_promo",
    fx: 0.41,
    fy: 0.915,
    c: "b",
    type: "cond",
    label: "Promo dernière minute",
    sub: "SI fin de mois / stock",
    icon: "tag",
  },
  {
    id: "p_mail",
    fx: 0.61,
    fy: 0.915,
    c: "a",
    type: "action",
    label: "Courriel promo",
    sub: "Offre -20% · 48 h",
    icon: "mail",
  },
  {
    id: "p_sms",
    fx: 0.8,
    fy: 0.915,
    c: "a",
    type: "action",
    label: "SMS dernière chance",
    sub: "Expire ce soir",
    icon: "chat",
  },
];

export const WORKFLOW_LANES: WorkflowLane[] = [
  { no: "01", title: "Acquisition & triage", tag: "Entrée", fy: 0.09 },
  { no: "02", title: "Enrichissement de lead", tag: "Données", fy: 0.2275 },
  { no: "03", title: "Relance lead froid", tag: "Relance", fy: 0.365 },
  { no: "04", title: "Rappels client", tag: "Fidélité", fy: 0.5025 },
  { no: "05", title: "Livraison & paiement", tag: "Facturation", fy: 0.64 },
  { no: "06", title: "Sécurité", tag: "Protection", fy: 0.7775 },
  { no: "07", title: "Campagne promo", tag: "Ventes", fy: 0.915 },
];

export const WORKFLOW_EDGES: WorkflowEdge[] = [
  ["s_lead", "n_triage", "a", 0],
  ["n_triage", "t_chaud", "a", 0],
  ["n_triage", "t_tiede", "a", 0],
  ["n_triage", "t_froid", "b", 0],
  ["e_lead", "e_fetch", "a", 0],
  ["e_fetch", "e_crm", "a", 0],
  ["b_trig", "b_wait", "b", 0],
  ["b_wait", "b_mail", "a", 0],
  ["b_mail", "b_sms", "a", 0],
  ["c_book", "c_when", "a", 0],
  ["c_when", "c_mail", "a", 0],
  ["c_mail", "c_sms", "a", 0],
  ["x_susp", "x_rule", "b", 0],
  ["x_rule", "x_block", "a", 0],
  ["x_block", "x_alert", "a", 0],
  ["p_list", "p_promo", "a", 0],
  ["p_promo", "p_mail", "a", 0],
  ["p_mail", "p_sms", "a", 0],
  ["d_deal", "d_work", "a", 0],
  ["d_work", "d_invoice", "a", 0],
  ["d_invoice", "d_pay", "a", 0],
  ["s_lead", "e_lead", "a", 1],
  ["t_froid", "b_trig", "b", 1],
  ["c_sms", "d_deal", "a", 1],
];

export const WORKFLOW_SCENARIOS: WorkflowScenario[] = [
  {
    path: ["s_lead", "n_triage", "t_froid", "b_trig", "b_wait", "b_mail", "b_sms"],
    c: "a",
    mult: 1.0,
  },
  { path: ["s_lead", "n_triage", "t_chaud"], c: "a", mult: 2.3 },
  { path: ["s_lead", "e_lead", "e_fetch", "e_crm"], c: "a", mult: 1.5 },
  {
    path: ["c_book", "c_when", "c_mail", "c_sms", "d_deal", "d_work", "d_invoice", "d_pay"],
    c: "a",
    mult: 1.7,
  },
  { path: ["x_susp", "x_rule", "x_block", "x_alert"], c: "b", mult: 2.0 },
  { path: ["p_list", "p_promo", "p_mail", "p_sms"], c: "a", mult: 1.6 },
  { path: ["d_deal", "d_work", "d_invoice", "d_pay"], c: "a", mult: 1.8 },
];
