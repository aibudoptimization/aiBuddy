import { ROUTES } from "@/lib/routes";

export const HOME_CITY = "Montréal";

export type HomeServiceItem = {
  t: string;
  soon?: boolean;
};

export type HomeService = {
  no: string;
  href: string;
  tag: string;
  title: string;
  accent: string;
  desc: string;
  items: HomeServiceItem[];
  cta?: string;
};

export const HOME_SERVICES: HomeService[] = [
  {
    no: "01",
    href: ROUTES.automatisation,
    tag: "Automation",
    title: "Automatisation des workflows",
    accent: "#4bfac8",
    desc: "Vos tâches répétitives exécutées automatiquement, selon vos règles, la mécanique qui relie vos outils entre eux et vous rend des heures chaque semaine.",
    items: [
      { t: "Emails marketing automatisés" },
      { t: "Séquences d'onboarding" },
      { t: "Synchronisation CRM & données client" },
      { t: "Tri & traitement automatisés des données récurrentes" },
    ],
    cta: "Voir le service",
  },
  {
    no: "02",
    href: ROUTES.agentsIa,
    tag: "IA",
    title: "Agents & assistants IA",
    accent: "#4bfac8",
    desc: "La couche qui réfléchit : des agents qui comprennent, décident et génèrent, pour raisonner à votre place, pas seulement exécuter une règle.",
    items: [
      { t: "Workflows IA agentiques" },
      { t: "Chatbots de support client" },
      { t: "Gestion client assistée par IA" },
      { t: "Automatisation des réseaux sociaux", soon: true },
    ],
    cta: "Voir le service",
  },
  {
    no: "03",
    href: ROUTES.sitesBoutiques,
    tag: "Web",
    title: "Sites & boutiques en ligne",
    accent: "#4bfac8",
    desc: "Des plateformes sur mesure, de la landing page à la boutique complète.",
    items: [
      { t: "Création de marque & identité visuelle" },
      { t: "Sites & web apps sur mesure" },
      { t: "Boutiques e-commerce" },
      { t: "Landing pages qui convertissent" },
    ],
    cta: "Voir le service",
  },
  {
    no: "04",
    href: ROUTES.journal,
    tag: "Growth",
    title: "Visibilité & performance",
    accent: "#4bfac8",
    desc: "On vous rend visible, sur Google comme sur les moteurs IA, et on mesure ce qui compte.",
    items: [
      { t: "Fondations SEO" },
      { t: "Visibilité sur les moteurs IA (GEO)" },
      { t: "Présence dans les réponses IA (AEO)" },
      { t: "Mesure & analytics (Google Analytics)" },
    ],
    cta: "Voir le Journal",
  },
];

export const AUDIENCE_SLIDES = [
  { no: "01", text: "Vous passez trop d'heures sur des tâches répétitives qu'un système pourrait gérer seul." },
  { no: "02", text: "Votre activité grandit plus vite que votre capacité à tout suivre à la main." },
  { no: "03", text: "Vous voulez intégrer l'IA dans votre business, sans savoir par où commencer." },
  { no: "04", text: "Vos outils ne se parlent pas, vous copiez-collez sans arrêt d'un onglet à l'autre." },
  { no: "05", text: "Vous voulez un site ou une boutique qui travaille vraiment pour vous, pas juste une vitrine." },
];

export const FIT_FOR_YOU = [
  "Solopreneur ou petite équipe (2 à 10 personnes)",
  "Déjà un peu de volume et de revenus à optimiser",
  "Prêt à investir pour récupérer du temps",
  "Ouvert au changement, avec une vision long terme",
];

export const NOT_FOR_YOU = [
  "Grande entreprise aux processus lourds et figés",
  "Projet sans budget ni revenus encore à automatiser",
  "Recherche avant tout le prestataire le moins cher",
];

export const OWNERSHIP_STEPS = [
  {
    no: "01",
    title: "On construit sur vos comptes",
    desc: "Tout est mis en place depuis vos propres accès, votre compte Google, vos outils, vos données.",
  },
  {
    no: "02",
    title: "On documente tout",
    desc: "Chaque automatisation, chaque système est documenté clairement, pour que rien ne dépende de notre mémoire.",
  },
  {
    no: "03",
    title: "On vous remet les clés",
    desc: "Accès complets, code, documentation : tout vous est transféré. On reste pour l'hébergement, par confort, pas par contrainte.",
  },
  {
    no: "04",
    title: "C'est 100 % à vous",
    desc: "Vous pouvez tout reprendre, l'héberger vous-même et continuer à le faire tourner. Sans nous, si vous le souhaitez.",
  },
];

export const PRICING_ANCHORS = [
  { label: "Automatisation · template", price: "250 $", note: "à partir de" },
  { label: "Page événement", price: "500 $", note: "à partir de" },
  { label: "Landing page", price: "1 000 $", note: "à partir de" },
  { label: "Agents IA & sur mesure", price: "Sur devis", note: "selon le projet", highlight: true },
];

export const QUOTE_FACTORS = [
  "Les outils & abonnements nécessaires",
  "La taille de votre entreprise",
  "Le volume de données à traiter",
  "L'usage de l'IA (tokens & modèle)",
  "Le niveau de personnalisation",
  "Le contenu déjà en place",
];

export const PAYMENT_NOTES = [
  {
    no: "01",
    title: "Options de paiement flexibles",
    desc: "On s'adapte à votre réalité, versements échelonnés selon le projet.",
  },
  {
    no: "02",
    title: "Vos abonnements, payés en direct",
    desc: "Outils & tokens IA réglés depuis vos comptes, aucune marge cachée.",
  },
  {
    no: "03",
    title: "Maintenance & support en option",
    desc: "Un accompagnement continu, seulement si vous le voulez.",
  },
];

export const JOURNAL_PREVIEW = [
  {
    href: ROUTES.article("generer-des-leads"),
    tag: "Automatisation · 5 min",
    accent: "#4bfac8",
    borderHover: "rgba(75,250,200,0.4)",
    title: "L'automatisation et l'IA pour générer des leads : qui en bénéficie le plus ?",
    dek: "Comment l'automatisation génère des leads, même quand vous dormez.",
  },
  {
    href: ROUTES.article("support-24-7"),
    tag: "Agents IA · 5 min",
    accent: "#8b7cff",
    borderHover: "rgba(139,124,255,0.45)",
    title: "Le support 24/7 : l'avantage concurrentiel que vos concurrents n'ont pas",
    dek: "Capturez les leads que vous perdez chaque soir, après la fermeture.",
  },
  {
    href: ROUTES.article("seo-geo-aeo"),
    tag: "Visibilité · 7 min",
    accent: "#6aa8ff",
    borderHover: "rgba(106,168,255,0.45)",
    title: "Votre site web, le SEO, le GEO et l'AEO : la fondation invisible de votre croissance",
    dek: "Des résultats Google aux réponses de ChatGPT : trois couches, une stratégie.",
  },
];
