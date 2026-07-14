import type { CanvasMotif } from "@/lib/canvas/types";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "pull"; text: string }
  | { type: "ul"; items: { lead?: string; text: string }[] }
  | { type: "steps"; items: { n: string; lead?: string; text: string }[] }
  | { type: "stats"; items: { value: string; label: string; source?: string }[] }
  | { type: "table"; cols: string[]; rows: string[][] }
  | { type: "sources"; items: { text: string; href: string }[] };

export type Article = {
  slug: string;
  cat: string;
  motif: CanvasMotif;
  accent: string;
  title: string;
  dek: string;
  date: string;
  read: string;
  author: string;
  blocks: ArticleBlock[];
};

const p = (text: string): ArticleBlock => ({ type: "p", text });
const h2 = (text: string): ArticleBlock => ({ type: "h2", text });
const h3 = (text: string): ArticleBlock => ({ type: "h3", text });
const pull = (text: string): ArticleBlock => ({ type: "pull", text });
const ul = (items: { lead?: string; text: string }[]): ArticleBlock => ({ type: "ul", items });
const steps = (items: { n: string; lead?: string; text: string }[]): ArticleBlock => ({
  type: "steps",
  items,
});
const stats = (items: { value: string; label: string; source?: string }[]): ArticleBlock => ({
  type: "stats",
  items,
});
const table = (cols: string[], rows: string[][]): ArticleBlock => ({ type: "table", cols, rows });
const sources = (items: { text: string; href: string }[]): ArticleBlock => ({
  type: "sources",
  items,
});

const ARTICLE_A: Article = {
  slug: "generer-des-leads",
  cat: "Automatisation",
  motif: "flow",
  accent: "#4bfac8",
  title: "L'automatisation et l'IA pour générer des leads : qui en bénéficie le plus ?",
  dek: "Le piège du « tout-à-la-main », et comment l'automatisation génère des leads, même quand vous dormez.",
  date: "12 mars 2026",
  read: "5 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "Vous avez de la traction. Vos clients parlent de vous en bien. Les demandes entrent, mais entre répondre aux courriels, préparer les soumissions, livrer vos projets et faire le suivi des prospects, la journée est finie avant même d'avoir commencé.",
    ),
    p(
      "C'est ce qu'on appelle le piège du « tout-à-la-main ». Et c'est exactement là que l'automatisation et l'intelligence artificielle changent la donne.",
    ),
    h2("Qu'est-ce qu'un flux de travail automatisé, concrètement ?"),
    p(
      "Un flux de travail automatisé est une séquence d'actions déclenchées sans intervention humaine. Quelqu'un remplit un formulaire sur votre site → il reçoit automatiquement un courriel de bienvenue personnalisé → son nom s'ajoute à votre CRM → vous recevez une alerte pour le relancer au bon moment.",
    ),
    pull("Pas de copier-coller. Pas d'onglets ouverts. Pas d'oublis."),
    p(
      "Combinée à l'IA, cette logique devient encore plus puissante : le système ne fait pas que transmettre de l'information, il l'analyse, la trie, la priorise et personnalise les réponses en fonction du profil de chaque prospect.",
    ),
    h2("Comment l'automatisation génère des leads, même quand vous dormez"),
    h3("1. La capture et la qualification automatique"),
    p(
      "Un formulaire de contact intelligent peut poser les bonnes questions et, en quelques secondes, qualifier un prospect : est-il prêt à acheter ? Quel est son budget ? Quel problème cherche-t-il à résoudre ? Ces données alimentent directement votre CRM, sans que vous leviez le petit doigt.",
    ),
    h3("2. Le nurturing sans effort"),
    p(
      "La majorité des prospects ne sont pas prêts à acheter du premier coup. L'automatisation maintient le contact, par courriel, par SMS ou via vos réseaux sociaux, de façon cohérente et personnalisée, jusqu'au moment où ils passent à l'action. Une séquence bien conçue peut fonctionner pendant des mois, 24 h/24.",
    ),
    h3("3. Le suivi systématique"),
    p(
      "Combien de leads avez-vous perdus parce que vous avez oublié de rappeler quelqu'un ? L'automatisation élimine ce risque. Les rappels, les relances et les propositions sortent exactement au bon moment, sans effort de votre part.",
    ),
    h3("4. La personnalisation à grande échelle"),
    p(
      "L'IA peut analyser le comportement de vos visiteurs (pages consultées, temps passé, actions effectuées) et adapter les messages en conséquence. Un prospect qui consulte une page produit reçoit un contenu différent de celui qui télécharge un guide ou demande une soumission.",
    ),
    h2("Les chiffres parlent d'eux-mêmes"),
    p("Les données récentes confirment ce que nos clients vivent sur le terrain :"),
    stats([
      {
        value: "91 %",
        label: "des PME utilisant l'IA rapportent une hausse de leurs revenus",
        source: "Salesforce, 2025",
      },
      {
        value: "+83 %",
        label: "les entreprises en croissance sont plus susceptibles d'avoir adopté l'IA",
        source: "McKinsey",
      },
      {
        value: "250 %",
        label: "de retour sur investissement moyen de l'automatisation IA sur 18 mois",
        source: "Click Vision",
      },
      {
        value: "39 → 55 %",
        label: "l'adoption de l'IA chez les petites entreprises, de 2024 à 2025",
        source: "USM Systems",
      },
    ]),
    p("Ne pas agir maintenant, c'est laisser vos concurrents prendre de l'avance."),
    h2("Qui bénéficie le plus de l'automatisation et de l'IA ?"),
    p(
      "L'automatisation n'est pas réservée aux grandes entreprises avec des équipes TI. En fait, c'est souvent le contraire : ce sont les petites structures qui ont le plus à gagner.",
    ),
    h3("Le solopreneur ou le professionnel autonome"),
    p(
      "Quand vous êtes seul à tout faire, vendre, livrer, facturer, communiquer, l'automatisation agit comme un bras droit virtuel. Elle libère des heures chaque semaine pour vous concentrer sur ce que vous faites le mieux.",
    ),
    h3("La petite équipe de 2 à 10 personnes"),
    p(
      "À ce stade, l'enjeu n'est pas de trouver des clients : c'est de gérer le volume sans embaucher à tout-va. L'automatisation vous permet de scaler vos opérations sans nécessairement grossir votre masse salariale.",
    ),
    h3("L'entreprise qui a de la traction mais manque de systèmes"),
    p(
      "Vous générez des revenus, mais tout repose sur vous. Les processus vivent dans votre tête. L'automatisation transforme ce savoir-faire implicite en systèmes reproductibles, et vous sortez du goulot d'étranglement.",
    ),
    h3("Les secteurs qui profitent le plus"),
    ul([
      {
        lead: "Services professionnels",
        text: " (consultants, comptables, coachs, avocats) : suivi de clients, prise de rendez-vous, relances.",
      },
      {
        lead: "Commerce de détail et e-commerce",
        text: " : abandon de panier, fidélisation, gestion des stocks.",
      },
      {
        lead: "Agences et studios créatifs",
        text: " : onboarding clients, gestion de projets, facturation.",
      },
      {
        lead: "Immobilier et courtage",
        text: " : qualification de leads, suivi de prospects, relances automatiques.",
      },
      {
        lead: "Restauration et hôtellerie",
        text: " : réservations, fidélisation, gestion des avis.",
      },
    ]),
    h2("Par où commencer ?"),
    p(
      "Bonne nouvelle : vous n'avez pas besoin de tout automatiser d'un coup. Commencez par identifier le processus qui vous coûte le plus de temps ou qui génère le plus d'oublis. Souvent, c'est :",
    ),
    ul([
      { text: "La réponse aux nouvelles demandes de contact." },
      { text: "Le suivi post-soumission." },
      { text: "La facturation et les rappels de paiement." },
    ]),
    p(
      "Un seul flux de travail bien conçu peut récupérer des heures par semaine, et des revenus qui s'échappaient sans que vous le sachiez.",
    ),
    sources([
      {
        text: "Small Business AI Statistics 2026, AdAI News",
        href: "https://adai.news/resources/statistics/small-business-ai-statistics-2026/",
      },
      {
        text: "65+ AI Lead Generation Statistics 2026, Click Vision",
        href: "https://click-vision.com/ai-lead-generation-statistics",
      },
      {
        text: "The State of AI in 2025, McKinsey & Company",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
      {
        text: "Small Business AI Adoption Statistics 2025, USM Systems",
        href: "https://usmsystems.com/small-business-ai-adoption-statistics/",
      },
      {
        text: "AI Workflow Automation in 2026, Botpress",
        href: "https://botpress.com/blog/ai-workflow-automation",
      },
    ]),
  ],
};

const ARTICLE_B: Article = {
  slug: "support-24-7",
  cat: "Agents IA",
  motif: "aurora",
  accent: "#8b7cff",
  title: "Le support 24/7 : l'avantage concurrentiel que vos concurrents n'ont pas",
  dek: "Pourquoi un assistant disponible en permanence capture les leads que vous perdez chaque soir.",
  date: "4 février 2026",
  read: "5 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "Il est 22 h 47. Un client potentiel vient de visiter votre site. Il a une question simple sur vos tarifs. Il veut juste une confirmation avant de cliquer sur « Envoyer une demande ».",
    ),
    p("Mais il n'y a personne. Alors il ferme l'onglet."),
    p(
      "Le lendemain matin, quand vous arrivez au bureau, ce lead n'existe plus. Il a trouvé une réponse ailleurs.",
    ),
    p(
      "Ce scénario se répète chaque soir, chaque fin de semaine, chaque jour férié, pour chaque entreprise qui n'a pas de support disponible en dehors des heures de bureau. Et le coût silencieux de ces occasions manquées s'accumule bien plus vite qu'on ne le pense.",
    ),
    h2("Le problème des heures d'ouverture dans une économie toujours connectée"),
    p(
      "Vos clients, eux, n'ont pas d'heures d'ouverture. Ils consultent leur téléphone le soir, magasinent le dimanche, comparent des fournisseurs pendant leur lunch. Le comportement d'achat a changé, mais beaucoup de petites entreprises offrent encore un service qui s'arrête à 17 h.",
    ),
    p(
      "Résultat : vous perdez des clients non pas parce que vous offrez un mauvais service, mais parce que vous n'étiez tout simplement pas là au bon moment.",
    ),
    h2("Ce que le support 24/7 change concrètement"),
    h3("Vous capturez les leads que vous perdriez autrement"),
    p(
      "Un assistant virtuel bien configuré peut répondre aux questions fréquentes, qualifier les prospects, prendre des rendez-vous et collecter des coordonnées, à n'importe quelle heure. Ce n'est pas un simple chatbot qui répond « Je ne comprends pas votre question ». C'est un système intelligent qui guide le visiteur vers la bonne action au bon moment.",
    ),
    h3("Vous réduisez les frictions dans le parcours d'achat"),
    p(
      "L'une des principales raisons pour lesquelles un prospect abandonne ? Il a une question et personne pour y répondre. Un support disponible en permanence élimine cette friction. La réponse arrive immédiatement, la confiance s'installe, et la conversion suit.",
    ),
    h3("Vous libérez votre équipe des questions répétitives"),
    p(
      "Combien de fois par semaine répondez-vous aux mêmes questions ? « Quels sont vos délais ? », « Acceptez-vous les cartes de crédit ? », « Desservez-vous ma région ? » Ces questions ont toutes une réponse connue. Un système automatisé les gère à votre place, et votre équipe se concentre sur les conversations à valeur ajoutée.",
    ),
    h3("Vous améliorez l'expérience client globale"),
    p(
      "Un client qui obtient une réponse en 2 minutes à 23 h ne l'oublie pas. C'est le genre de détail qui génère des avis 5 étoiles, des recommandations et de la fidélité. L'expérience client, c'est l'ensemble des interactions, même les plus petites.",
    ),
    h2("Les chiffres qui devraient vous convaincre"),
    p("Ce n'est pas anecdotique. Les données sont claires :"),
    stats([
      {
        value: "74 %",
        label: "des entreprises citent la disponibilité 24/7 comme la principale raison d'adopter un chatbot IA",
        source: "Chatmaxima, 2026",
      },
      {
        value: "92 %",
        label: "rapportent une amélioration de la satisfaction client après un assistant virtuel",
        source: "Master of Code",
      },
      {
        value: "6 h → 4 min",
        label: "le temps de réponse moyen, grâce au support IA",
        source: "Freshworks",
      },
      {
        value: "11 → 2 min",
        label: "Klarna a réduit son temps de résolution moyen avec l'IA",
        source: "Klarna",
      },
      {
        value: "3,50 $",
        label: "de retour pour chaque dollar investi dans le support IA",
        source: "Fullview",
      },
    ]),
    p(
      "Pour une petite entreprise, ces gains ne sont pas marginaux. Ils peuvent représenter des dizaines de leads récupérés par mois, et des milliers de dollars en revenus supplémentaires.",
    ),
    h2("Mais est-ce que ça remplace le contact humain ?"),
    p("Non, et c'est précisément pour ça que ça fonctionne bien."),
    p(
      "L'objectif du support automatisé n'est pas de remplacer vos conversations humaines. C'est de les préparer. Le système qualifie, informe et filtre. Quand vous ou votre équipe entrez en scène, le prospect est déjà informé, engagé, et souvent prêt à décider.",
    ),
    pull("Vous passez moins de temps à expliquer les bases, et plus de temps à fermer des ventes."),
    h2("Ce que ça donne dans la pratique"),
    p("Voici quelques exemples concrets de ce qu'un support 24/7 peut faire pour une PME québécoise :"),
    ul([
      {
        lead: "Pour un consultant ou coach",
        text: " : répondre aux questions sur vos services, proposer des créneaux de consultation, envoyer automatiquement votre brochure ou portfolio.",
      },
      {
        lead: "Pour un commerce local",
        text: " : informer sur les heures, les produits disponibles, les promotions, et rediriger vers votre boutique en ligne.",
      },
      {
        lead: "Pour une agence ou studio",
        text: " : qualifier les nouvelles demandes selon le type de projet, le budget et les délais, avant même que vous ne lisiez le courriel.",
      },
      {
        lead: "Pour un prestataire de services",
        text: " : gérer les demandes de soumission, confirmer les rendez-vous, envoyer des rappels et réduire les no-shows.",
      },
    ]),
    h2("La compétition dort. Vous, non."),
    p(
      "Le support 24/7 n'est plus un luxe réservé aux grandes marques. Les outils existent aujourd'hui pour l'implanter dans n'importe quelle PME, à un coût accessible, en quelques semaines.",
    ),
    p(
      "La question n'est plus « est-ce que c'est pour moi ? ». C'est « combien de leads est-ce que je perds chaque semaine parce que je n'ai pas encore fait ça ? »",
    ),
    sources([
      {
        text: "AI Customer Support Statistics 2026, ChatMaxima",
        href: "https://chatmaxima.com/blog/ai-customer-support-statistics/",
      },
      {
        text: "AI in Customer Service Statistics 2026, Master of Code",
        href: "https://masterofcode.com/blog/ai-in-customer-service-statistics",
      },
      {
        text: "How AI is Unlocking ROI in Customer Service, Freshworks",
        href: "https://www.freshworks.com/How-AI-is-unlocking-ROI-in-customer-service/",
      },
      {
        text: "65+ Chatbot Statistics for Customer Service Teams, Zoom",
        href: "https://www.zoom.com/en/blog/chatbot-statistics/",
      },
      {
        text: "80+ AI Customer Service Statistics & Trends 2025, Fullview",
        href: "https://www.fullview.io/blog/ai-customer-service-stats",
      },
    ]),
  ],
};

const ARTICLE_C: Article = {
  slug: "seo-geo-aeo",
  cat: "Visibilité",
  motif: "grid",
  accent: "#6aa8ff",
  title: "Votre site web, le SEO, le GEO et l'AEO : la fondation invisible de votre croissance",
  dek: "Trois couches d'une même stratégie de visibilité, des résultats Google aux réponses de ChatGPT.",
  date: "21 janvier 2026",
  read: "7 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "En 2026, si quelqu'un cherche vos services et qu'il ne vous trouve pas en ligne, vous n'existez pas, peu importe à quel point vous êtes bon dans ce que vous faites.",
    ),
    p(
      "C'est une réalité difficile à accepter pour beaucoup d'entrepreneurs québécois qui ont bâti leur réputation sur le bouche-à-oreille. Ces canaux fonctionnent encore. Mais ils ne suffisent plus à eux seuls pour soutenir une croissance réelle.",
    ),
    p(
      "Votre présence numérique, à commencer par votre site web, est aujourd'hui votre outil de développement des affaires le plus puissant. Et avec l'essor de l'IA dans la recherche en ligne, les règles du jeu ont changé.",
    ),
    h2("Un site web professionnel : bien plus qu'une carte d'affaires en ligne"),
    p(
      "Trop souvent, les entrepreneurs voient leur site comme une obligation, un endroit où mettre leur numéro de téléphone et quelques photos. En réalité, un site bien conçu est un vendeur qui travaille pour vous 24 h/24, 7 jours sur 7, sans pause ni congé.",
    ),
    h3("La crédibilité, d'abord"),
    stats([
      {
        value: "81 %",
        label: "des consommateurs font des recherches en ligne avant d'effectuer un achat",
        source: "Marketing LTB, 2026",
      },
    ]),
    p(
      "Si votre site est inexistant, mal conçu ou obsolète, la décision est prise avant même que vous ayez eu la chance de parler au prospect. Un site professionnel ne vous rend pas crédible : il confirme une crédibilité que vous méritez déjà.",
    ),
    h3("Votre meilleur outil de conversion"),
    p(
      "Parmi tous les outils numériques disponibles, réseaux sociaux, Google Maps, annuaires, le site web est celui que les PME identifient comme le plus utile, loin devant Facebook et Google Business. Pourquoi ? Parce que c'est le seul espace que vous contrôlez complètement : votre message, votre image de marque, vos offres, vos appels à l'action.",
    ),
    h3("Une présence qui travaille même sans vous"),
    p(
      "Combiné à des outils d'automatisation, votre site peut capturer des leads, répondre aux questions, envoyer des propositions et prendre des rendez-vous, même quand vous êtes en rendez-vous, en vacances ou endormi.",
    ),
    h2("Le SEO : être trouvé avant vos concurrents"),
    p(
      "Le référencement naturel (SEO) regroupe les stratégies qui permettent à votre site d'apparaître dans les premiers résultats de Google quand un client potentiel cherche ce que vous offrez. Quelqu'un tape « comptable à Québec » ou « traiteur événementiel Montréal », est-ce vous qui apparaissez, ou votre concurrent ?",
    ),
    p("Le SEO repose sur trois piliers fondamentaux :"),
    steps([
      {
        n: "1",
        lead: "Le contenu pertinent",
        text: " : articles de blogue, pages de services, études de cas, du contenu qui répond aux vraies questions de vos clients.",
      },
      {
        n: "2",
        lead: "L'autorité du site",
        text: " : des liens provenant d'autres sites reconnus qui valident votre expertise aux yeux de Google.",
      },
      {
        n: "3",
        lead: "La performance technique",
        text: " : un site rapide, sécurisé, accessible sur mobile et bien structuré pour être indexé correctement.",
      },
    ]),
    p(
      "Le SEO prend du temps, c'est un investissement à moyen et long terme. Mais contrairement à la publicité payante, les résultats organiques ne disparaissent pas quand vous arrêtez de payer.",
    ),
    h2("Le GEO : être cité par l'IA"),
    p(
      "Voici la grande nouveauté de 2025-2026 : vos clients ne cherchent plus seulement sur Google. Ils posent des questions directement à ChatGPT, Claude, Perplexity ou Gemini, et ces outils répondent en citant des sources.",
    ),
    p(
      "Le GEO (Generative Engine Optimization) est l'art d'optimiser votre contenu pour que les grands modèles de langage vous citent comme source fiable. Concrètement : si quelqu'un demande à ChatGPT « Quelle agence web recommandes-tu pour les PME au Québec ? », est-ce que votre nom apparaît dans la réponse ?",
    ),
    stats([
      {
        value: "31,3 %",
        label: "de la population américaine utilisera la recherche par IA générative en 2026",
        source: "eMarketer",
      },
    ]),
    p("Pour y être visible, votre contenu doit :"),
    ul([
      { text: "Être structuré de façon claire (titres, sous-titres, listes, données précises)." },
      { text: "Citer des sources reconnues et vérifiables." },
      { text: "Répondre directement aux questions que vos clients posent." },
      { text: "Démontrer une expertise réelle sur votre domaine." },
    ]),
    p(
      "Le GEO ne remplace pas le SEO, il le complète. Les entreprises les mieux positionnées dans les réponses IA sont celles qui ont déjà un contenu SEO solide.",
    ),
    h2("L'AEO : dominer les réponses instantanées"),
    p(
      "L'AEO (Answer Engine Optimization) vous permet d'apparaître dans les encadrés de réponse rapide de Google, les featured snippets et AI Overviews qui s'affichent désormais en tête de la majorité des recherches.",
    ),
    stats([
      {
        value: "~50 %",
        label: "des recherches Google affichent désormais un AI Overview en tête de page",
        source: "Jasper AI, 2026",
      },
    ]),
    p(
      "L'AEO consiste à structurer votre contenu pour répondre précisément aux questions de vos clients, sous un format que Google et les moteurs IA peuvent extraire et mettre en avant. Des exemples de questions auxquelles vous devriez répondre sur votre site :",
    ),
    ul([
      { text: "« Combien coûte un déménagement résidentiel à Québec ? »" },
      { text: "« Quel est le meilleur restaurant pour un souper d'affaires à Montréal ? »" },
      { text: "« Quels sont vos délais pour une réparation d'électroménager ? »" },
    ]),
    p(
      "Si vous répondez à ces questions mieux que vos concurrents, c'est vous qui apparaissez. Aussi simple, et aussi stratégique, que ça.",
    ),
    h2("SEO + GEO + AEO : trois couches, une seule stratégie"),
    p(
      "Ces trois approches ne sont pas des options distinctes, ce sont trois couches d'une même stratégie de visibilité en ligne.",
    ),
    table(
      ["Stratégie", "Objectif", "Canal"],
      [
        ["SEO", "Apparaître dans les résultats organiques", "Moteurs de recherche traditionnels"],
        ["AEO", "Être cité dans les réponses instantanées", "Google AI Overviews, recherche vocale"],
        ["GEO", "Être cité par les IA génératives", "ChatGPT, Claude, Gemini, Perplexity"],
      ],
    ),
    p(
      "Un contenu bien fait peut performer sur les trois canaux simultanément. C'est ça, l'avantage compétitif d'une stratégie de contenu intelligente.",
    ),
    h2("Ce que ça veut dire pour vous, concrètement"),
    p(
      "Si vous êtes un solopreneur ou une petite équipe au Québec, voici ce qu'une bonne stratégie web peut faire :",
    ),
    ul([
      {
        lead: "Générer des leads qualifiés passivement",
        text: ", des gens qui vous trouvent parce qu'ils ont un besoin réel.",
      },
      {
        lead: "Bâtir votre autorité",
        text: " dans votre secteur, même face à des concurrents plus grands.",
      },
      {
        lead: "Réduire votre dépendance",
        text: " à la publicité payante et au bouche-à-oreille seul.",
      },
      {
        lead: "Être visible dans l'écosystème IA",
        text: ", là où vos clients de demain vont chercher leurs réponses.",
      },
    ]),
    stats([
      {
        value: "228 000",
        label: "petites entreprises au Québec, la plupart ont un site, peu ont une vraie stratégie",
        source: "ISDE, Gouv. du Canada, 2025",
      },
    ]),
    sources([
      {
        text: "Key Small Business Statistics 2025, ISDE Canada",
        href: "https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics/key-small-business-statistics-2025",
      },
      {
        text: "Small Business Website Statistics 2026, Marketing LTB",
        href: "https://marketingltb.com/blog/statistics/small-business-website-statistics/",
      },
      {
        text: "Why Every Quebec SMB Needs a Website in 2025, ELR Agency",
        href: "https://www.elragency.com/blog/why-every-quebec-smb-needs-a-website-in-2025",
      },
      {
        text: "GEO vs AEO vs SEO Guide 2026, Jasper AI",
        href: "https://www.jasper.ai/blog/geo-aeo",
      },
      {
        text: "FAQ on GEO and AEO 2026, eMarketer",
        href: "https://www.emarketer.com/content/faq-on-geo-aeo--where-ai-search-seo-overlap-2026",
      },
    ]),
  ],
};

export const ARTICLES: Record<string, Article> = {
  "generer-des-leads": ARTICLE_A,
  "support-24-7": ARTICLE_B,
  "seo-geo-aeo": ARTICLE_C,
};

export function getArticle(slug: string): Article | undefined {
  return ARTICLES[slug];
}
