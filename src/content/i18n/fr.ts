import type { Dictionary } from "./types";

export const fr: Dictionary = {
  meta: {
    titleDefault: "Workflow Wonder",
    titleTemplate: "%s · Workflow Wonder",
    description:
      "Automatisations, agents IA et sites pour les entrepreneurs du Québec. Consultation gratuite.",
  },
  chrome: {
    services: "Services",
    realisations: "Réalisations",
    consultCta: "Consultation gratuite",
    allArticles: "Tous les articles",
    skipIntro: "Passer",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryNav: "Navigation principale",
  },
  nav: {
    services: [
      { title: "Automatisation des workflows", tag: "Workflows · règles · relais" },
      { title: "Agents & assistants IA", tag: "Agents · IA · décision" },
      { title: "Intégration & connexion d'outils", tag: "Connexion · synchro · API" },
      { title: "Sites & boutiques en ligne", tag: "Sites · boutiques · e-commerce" },
      { title: "Conseil & optimisation", tag: "Audit · stratégie · feuille de route" },
    ],
  },
  footer: {
    blurb:
      "On aide les entrepreneurs du Québec à automatiser l'opérationnel et à faire grandir leur activité, sans perdre le contrôle de leurs systèmes.",
    servicesHeading: "Services",
    exploreHeading: "Explorer",
    blog: "Journal",
    contact: "Contact",
    realisations: "Réalisations",
    privacy: "Confidentialité",
    cookiePreferences: "Gérer les témoins",
    rights: "Tous droits réservés.",
    homeCtaEyebrow: "Consultation gratuite · sans engagement",
    homeCtaTitle: "Prêt à récupérer du temps ?",
    homeCtaLead:
      "Parlons de votre activité. On revient sous 48 h avec une première piste concrète.",
    homeCtaButton: "Consultation gratuite",
    homeCtaAlt: "ou écrivez-nous",
    faqLabel: "FAQ",
    faq: [
      {
        q: "Combien de temps prend un projet ?",
        a: "La plupart des mandats : 2 à 6 semaines. Échéancier clair dès la consultation.",
      },
      {
        q: "Est-ce que je reste propriétaire ?",
        a: "Oui. Construit sur vos comptes. Code, accès et docs vous sont remis.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Consultation gratuite, puis devis détaillé sous 48 h. Sans engagement.",
      },
      {
        q: "Faut-il être technique ?",
        a: "Non. On met en place et on vous forme à l'essentiel.",
      },
      {
        q: "Avec quels outils ?",
        a: "On s'adapte à votre stack (CRM, courriel, e-commerce…) plutôt que de tout remplacer.",
      },
    ],
    faqAllLabel: "Voir toutes les questions →",
    phoneLabel: "Téléphone",
  },
  home: {
    city: "Lanaudière",
    hero: {
      eyebrow: "Automatisation IA",
      h1Line1: "Moins de tâches manuelles",
      h1Line2Before: "Plus de ",
      h1GradientWords: ["croissance", "temps", "liberté"],
      h1MobileBreak: true,
      leadBefore: "Basé dans ",
      leadCity: "Lanaudière",
      leadAfter:
        ". On automatise vos workflows, on déploie des agents IA et on bâtit des sites qui convertissent, pour les entrepreneurs du Québec qui veulent avancer sans tout faire à la main.",
      primaryCta: "Consultation gratuite",
      secondaryCta: "Voir les services",
      meta: ["Workflows · Agents IA · Sites", "Devis sous 48 h", "Sans engagement"],
    },
    services: {
      eyebrow: "CE QU'ON LIVRE",
      titleLine1: "Cinq leviers.",
      titleLine2: "Un objectif : vous faire gagner du temps.",
      lead: "Des règles quand c'est fiable, de l'IA quand c'est utile. Jamais l'inverse.",
      soon: "Bientôt",
      carouselLabel: "Carrousel des services",
      goTo: "Afficher le service :",
      cards: [
        {
          no: "01",
          pathKey: "automatisation",
          tag: "Automation",
          title: "Automatisation des workflows",
          accent: "#4bfac8",
          desc: "Vos règles, vos outils. Les tâches répétitives partent, votre focus reste sur la vente et la livraison.",
          outcome: "Résultat : zéro suivi oublié et des heures récupérées chaque semaine.",
          items: [
            { t: "Suivis et relances programmés" },
            { t: "Séquences d'accueil client" },
            { t: "Infolettres et courriels marketing" },
            { t: "Tri et routage des demandes" },
          ],
          cta: "En savoir plus",
        },
        {
          no: "02",
          pathKey: "agentsIa",
          tag: "IA",
          title: "Agents & assistants IA",
          accent: "#8b7cff",
          desc: "Des agents qui comprennent la demande, choisissent l'action et répondent, 24/7, dans votre ton.",
          outcome: "Résultat : chaque demande reçoit une réponse en quelques minutes, jour et nuit.",
          items: [
            { t: "Agents qui enchaînent plusieurs étapes seuls" },
            { t: "Chatbots de support client" },
            { t: "Réponses aux demandes et aux courriels" },
            { t: "Qualification et suivi des prospects" },
          ],
          cta: "En savoir plus",
        },
        {
          no: "03",
          pathKey: "integration",
          tag: "Intégration",
          title: "Intégration & connexion d'outils",
          accent: "#6aa8ff",
          desc: "Vos outils se parlent enfin. Une donnée saisie une fois se répercute partout, sans copier-coller.",
          outcome: "Résultat : une seule source de vérité et zéro double saisie.",
          items: [
            { t: "CRM, courriels, boutique et tableurs branchés ensemble" },
            { t: "Données synchronisées entre vos outils" },
            { t: "Migration propre d'un outil à l'autre" },
            { t: "Connexions sur mesure (API, webhooks)" },
          ],
          cta: "En savoir plus",
        },
        {
          no: "04",
          pathKey: "sitesBoutiques",
          tag: "Web",
          title: "Sites & boutiques en ligne",
          accent: "#f0a94e",
          desc: "Un site ou une boutique conçu pour convertir : clair, rapide, aligné à votre offre.",
          outcome: "Résultat : un site qui génère des demandes pendant que vous travaillez.",
          items: [
            { t: "Sites vitrines et web apps sur mesure" },
            { t: "Boutiques en ligne" },
            { t: "Landing pages qui convertissent" },
            { t: "Image de marque et identité visuelle" },
          ],
          cta: "En savoir plus",
        },
        {
          no: "05",
          pathKey: "conseil",
          tag: "Conseil",
          title: "Conseil & optimisation",
          accent: "#f56aa8",
          desc: "Vous sentez que ça coince, sans savoir par où commencer. On analyse et on vous remet une feuille de route claire.",
          outcome: "Résultat : un plan priorisé et chiffré, qu'on exécute ensemble ou que vous gardez.",
          items: [
            { t: "Analyse de vos processus" },
            { t: "Goulots et gains rapides" },
            { t: "Feuille de route priorisée" },
            { t: "Estimation chiffrée par piste" },
          ],
          cta: "En savoir plus",
        },
      ],
    },
    proof: {
      eyebrow: "Réalisations",
      title: "On ne le raconte pas. On le montre.",
      caseTag: "Entraînement privé · Montréal",
      caseTitle: "elianelarre.com",
      caseDesc:
        "Page d'atterrissage pour une entraîneure privée : parcours cliente, témoignages, FAQ et réservation d'appel découverte intégrée.",
      caseCta: "Visiter le site",
      pageCta: "Toutes les réalisations →",
      demoNote:
        "Un mandat livré, d'autres en cours. Voyez le détail de chaque projet, ce qu'on a bâti et pourquoi.",
    },
    audience: {
      titleLine1: "On n'est pas",
      titleLine2: "pour tout le monde.",
      lead: "On refuse des mandats, et c'est correct. Voici comment on sait d'avance si le vôtre va marcher.",
      fitTitle: "C'est pour vous si…",
      notFitTitle: "Pas le bon moment si…",
      fit: [
        "Solopreneur ou équipe de 2 à 10 personnes",
        "Vous perdez déjà des heures chaque semaine en tâches manuelles",
        "Assez de volume pour que l'automatisation se paie",
        "Vous voulez un système qui vous appartient, qu'on le gère ou non",
      ],
      notFit: [
        "Vous démarrez : pas encore de clients ni de processus à automatiser",
        "Grande organisation aux processus figés, avec plusieurs paliers d'approbation",
        "Vous cherchez d'abord le prix le plus bas",
        "Vous voulez déléguer sans jamais toucher au dossier",
      ],
      resolveLine: "Pas certain de votre cas ?",
      resolveCta: "Un appel de 30 minutes suffit à trancher. →",
    },
    tools: {
      title: "On branche vos outils.",
      subtitle: "Rien à remplacer. On s'intègre à ce que vous utilisez déjà.",
      more: "+ des dizaines d'autres",
    },
    included: {
      label: "Inclus dans tout ce qu'on livre",
      items: [
        "Référencement Google",
        "Présence dans les réponses IA",
        "Documentation complète",
        "Formation à l'essentiel",
      ],
      cta: "Comment on vous rend trouvable →",
    },
    ownership: {
      title: "On construit. Vous possédez.",
      lead: "On peut tout prendre en charge : hébergement, entretien, évolutions. Et si un jour vous préférez continuer seul, tout est documenté pour que vous repartiez avec un système qui roule.",
      footerStrong: "Vous restez par choix,",
      footerMuted: "jamais parce que vous êtes coincé.",
      footerCta: "Ce qui se passe après la livraison →",
      steps: [
        {
          no: "01",
          title: "Sur vos comptes",
          desc: "Tout est bâti depuis vos propres accès et vos outils. Les abonnements sont à votre nom, jamais au nôtre.",
        },
        {
          no: "02",
          title: "Documenté au fur et à mesure",
          desc: "Chaque automatisation et chaque page livrée vient avec son mode d'emploi. Rien ne dépend de notre mémoire.",
        },
        {
          no: "03",
          title: "On s'en occupe, si vous voulez",
          desc: "Hébergement, entretien, nouvelles fonctions : on peut tout gérer pour vous. C'est un service, pas une condition.",
        },
        {
          no: "04",
          title: "Vous partez quand vous voulez",
          desc: "Le jour où vous préférez reprendre les rênes, vous partez avec les accès, le code et la documentation. Le système continue de tourner.",
        },
      ],
    },
    pricing: {
      titleLine1: "Combien ça coûte ?",
      // nbsp so the phone wrap breaks after "a", not before a lone "prix."
      titleLine2: "Chaque projet a son prix.",
      lead: "Pas de modèles tout faits, donc pas de forfaits. On regarde ce qui compte dans votre cas, et vous repartez avec un plan et un prix ferme sous 48 h.",
      // nbsp: on phones the pill needs two lines, so force the break at the
      // separator instead of splitting "sans engagement".
      consultEyebrow: "Consultation gratuite · sans engagement",
      consultTitle: "Ce que vous obtenez",
      consultItems: [
        "Un plan d'action clair & priorisé",
        "Des recommandations concrètes",
        "Un devis détaillé sous 48 h",
      ],
      consultCta: "Réserver ma consultation →",
      factorsHeading: "Ce qu'on regarde pour chiffrer",
      factorsNoteStrong: "Bonne nouvelle :",
      factorsNote:
        "plus vous avez déjà de matière, plus le projet est simple et moins il coûte.",
      factors: [
        "Les outils et abonnements nécessaires",
        "La taille de votre entreprise",
        "Le volume de données à traiter",
        "L'usage de l'IA (modèle et volume)",
        "Le niveau de personnalisation",
        "Le contenu déjà en place",
      ],
      payment: [
        {
          no: "01",
          title: "Paiement flexible",
          desc: "Versements échelonnés selon le projet.",
        },
        {
          no: "02",
          title: "Sans marge cachée",
          desc: "Vos abonnements se paient au prix courant. On ne prend rien au passage.",
        },
        {
          no: "03",
          title: "Support en option",
          desc: "Aucun abonnement obligatoire après la livraison.",
        },
      ],
    },
    journal: {
      title: "Le Journal",
      allArticles: "Tous les articles →",
    },
  },
  founder: {
    name: "Christopher",
    role: "Spécialiste en automatisation",
    region: "Lanaudière",
    note: "Salut, moi c'est Christopher. Trouver des façons de faire mieux avec moins d'efforts, ça m'a toujours passionné. Aujourd'hui, j'aide les PME d'ici à récupérer leurs heures en automatisant ce qui les gruge. Écrivez-moi : c'est moi qui vous réponds.",
    consultLine: "Votre consultation, c'est avec moi.",
    photoAlt: "Christopher, spécialiste en automatisation chez Workflow Wonder",
  },
  contact: {
    eyebrow: "Consultation gratuite · sans engagement",
    title: "Parlez-nous de votre projet.",
    lead: "On revient sous 48 h avec une première piste et un devis. Sans engagement.",
    emailPrompt: "Vous préférez le courriel ?",
    phonePrompt: "Ou appelez Christopher au",
    form: {
      firstName: "Prénom",
      firstNameOptional: "facultatif",
      lastName: "Nom de famille",
      lastNameOptional: "facultatif",
      company: "Nom de l'entreprise",
      email: "Adresse courriel",
      message: "Votre projet en quelques mots",
      messageOptional: "facultatif",
      consent:
        "J'accepte que Workflow Wonder conserve mes coordonnées afin de traiter ma demande, conformément à sa",
      consentLinkLabel: "politique de confidentialité",
      submit: "Envoyer ma demande",
      submitting: "Envoi en cours…",
      successTitle: "Message reçu, merci !",
      successBody:
        "On vous a envoyé un courriel de confirmation. On revient vers vous sous 48 h.",
      errorGeneric:
        "Une erreur est survenue. Réessayez ou écrivez-nous directement par courriel.",
    },
  },
  journalIndex: {
    eyebrow: "Le Journal",
    title: "Idées, données et tactiques.",
    lead: "Des analyses concrètes pour les PME du Québec qui veulent automatiser, gagner du temps et faire grandir leur activité.",
    read: "Lire →",
    featured: "À la une",
    readingSuffix: " de lecture",
    toc: "Sommaire",
    readNext: "Lire ensuite",
    sources: "Sources",
  },
  services: {
    automatisation: {
      metaTitle: "Automatisation des workflows",
      metaDescription:
        "On automatise vos tâches répétitives avec des règles fiables. Suivis, relances, infolettres et tri qui se font seuls. Devis sous 48 h, sans engagement.",
      eyebrow: "Automatisation des workflows",
      h1Before: "On transforme vos tâches manuelles en ",
      h1Accent: "automatismes",
      h1After: " fiables.",
      lead: "On met en place la logique quand X arrive, fais Y, pour que vos suivis, vos relances et votre tri se fassent sans intervention manuelle.",
      whatTitle: "Ce que c'est",
      whatBody: [
        "L'automatisation des workflows, c'est la couche logique de votre entreprise. On code des règles claires : quand une condition se présente, l'action prévue s'exécute, chaque fois.",
        "Tout est déterministe. Pas de hasard, pas d'improvisation. Les mêmes entrées donnent toujours le même résultat, donc vous savez exactement ce qui se passe.",
        "On enchaîne aussi les scénarios. Un déclencheur lance une séquence, qui passe le relais à la suivante, et vos processus avancent seuls du début à la fin.",
      ],
      includedTitle: "Ce qu'on met en place",
      included: [
        { icon: "split", title: "Déclencheurs et conditions", desc: "On définit ce qui lance chaque automatisation et les règles qui décident de la suite." },
        { icon: "workflow", title: "Séquences et relais", desc: "On enchaîne les étapes pour qu'un scénario passe le relais au suivant sans intervention." },
        { icon: "repeat", title: "Suivis et relances", desc: "On programme les rappels et les relances pour qu'aucun dossier ne tombe entre les craques." },
        { icon: "mail", title: "Courriels et infolettres", desc: "On monte vos séquences de courriels et vos envois d'infolettre, avec les listes qui se tiennent à jour toutes seules." },
        { icon: "route", title: "Tri et routage", desc: "On classe et on dirige automatiquement les demandes, les données et les documents au bon endroit." },
      ],
      processTitle: "Comment ça se passe",
      process: [
        { title: "Appel découverte", desc: "On regarde vos tâches répétitives ensemble et on cible celles qui valent la peine d'être automatisées." },
        { title: "Devis détaillé sous 48 h", desc: "Vous recevez un plan clair et un prix ferme, sans engagement de votre part." },
        { title: "Conception des règles", desc: "On construit et on teste chaque séquence sur votre stack existante avant la mise en ligne." },
        { title: "Mise en ligne et remise", desc: "On active le tout et on vous remet comptes, code et documentation, à vous pour de bon." },
      ],
      useCasesTitle: "Exemples concrets",
      useCases: [
        { icon: "userPlus", title: "Onboarding client automatisé", desc: "Dès qu'un contrat est signé, la séquence d'accueil, les accès et les courriels partent tout seuls." },
        { icon: "receipt", title: "Relances de factures impayées", desc: "Une facture en retard déclenche des rappels au bon moment, sans que vous ayez à y penser." },
        { icon: "inbox", title: "Tri des demandes entrantes", desc: "Chaque demande est classée et dirigée vers la bonne personne selon des règles précises." },
        { icon: "calendarClock", title: "Rappels de suivi après devis", desc: "Après un devis ou un rendez-vous, une relance planifiée garde vos prospects au chaud." },
        { icon: "send", title: "Infolettre qui part toute seule", desc: "Vos contacts entrent dans la bonne liste selon ce qu'ils ont fait, et reçoivent le bon courriel au bon moment." },
      ],
      outcomesTitle: "Ce que vous y gagnez",
      outcomes: [
        { stat: "24/7", label: "Vos règles tournent sans arrêt" },
        { stat: "100 % à vous", label: "Comptes, code et docs remis" },
        { stat: "Zéro oubli", label: "Aucun suivi qui passe dans les craques" },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "C'est quoi la différence avec l'intégration d'outils ?", a: "L'automatisation, c'est la logique et les séquences qui s'exécutent. L'intégration connecte vos outils et synchronise vos données. Les deux travaillent main dans la main." },
        { q: "Est-ce que ça utilise de l'intelligence artificielle ?", a: "Non. Ici, tout repose sur des règles précises et prévisibles. L'IA et les décisions plus floues, c'est notre volet Agents et assistants IA, distinct de celui-ci." },
        { q: "Est-ce que ça fonctionne avec mes outils actuels ?", a: "Oui. On s'intègre à votre stack existante plutôt que de la remplacer, pour que vous gardiez vos habitudes." },
        { q: "À qui appartiennent les automatisations ?", a: "À vous, entièrement. On vous remet les comptes, le code et la documentation à la fin du projet." },
        { q: "Combien de temps avant d'avoir un prix ?", a: "Vous recevez un devis détaillé sous 48 h après l'appel découverte, sans engagement de votre part." },
        { q: "Et si mes besoins changent plus tard ?", a: "Les règles se modifient facilement. On peut ajuster ou ajouter des séquences quand vos processus évoluent." },
      ],
      ctaLabel: "Sur mesure",
      ctaTitle: "Une tâche qui vous gruge du temps ?",
      ctaDescription:
        "Parlez-nous-en. On vous dit ce qui s'automatise et vous recevez un devis sous 48 h, sans engagement.",
    },
    agentsIa: {
      metaTitle: "Agents & assistants IA",
      metaDescription:
        "Un agent IA calibré sur votre entreprise, vos données et votre ton. Il comprend, décide et répond, 24/7. Consultation gratuite, devis sous 48 h.",
      eyebrow: "Agents & assistants IA",
      h1Before: "Un agent IA qui comprend, décide et ",
      h1Accent: "répond",
      h1After: ".",
      lead: "On conçoit un agent calibré sur votre entreprise, vos données et votre ton, capable de comprendre une demande, de choisir la bonne action et de répondre, 24/7.",
      whatTitle: "Ce que fait un agent IA",
      whatBody: [
        "Un agent IA lit une demande en langage naturel, comprend l'intention derrière et gère l'ambiguïté. Là où une règle fixe bloque, lui interprète et poursuit.",
        "Il ne fait pas que répondre. Il raisonne, choisit le bon outil ou la bonne information, agit, puis formule une réponse dans votre ton.",
        "Notre règle de base : des règles quand c'est fiable, de l'IA quand c'est utile. On garde le déterministe pour le prévisible et on réserve l'agent aux cas de jugement, de nuance et de conversation.",
      ],
      includedTitle: "Ce qu'on met en place",
      included: [
        { icon: "bot", title: "Un agent sur mesure", desc: "On conçoit l'agent autour de votre métier, de vos processus et de votre vocabulaire, pas d'un gabarit générique." },
        { icon: "plug", title: "Branché à vos outils", desc: "L'agent lit et agit dans votre stack existante, CRM, boîte courriel, calendrier, base de données." },
        { icon: "penLine", title: "Calibré sur votre ton", desc: "Ses réponses respectent votre voix et vos limites, avec passage à un humain quand il le faut." },
        { icon: "shieldCheck", title: "Garde-fous et suivi", desc: "On pose des balises claires sur ce que l'agent peut faire, et on suit ses décisions pour l'ajuster." },
      ],
      processTitle: "Comment on procède",
      process: [
        { title: "Appel découverte gratuit", desc: "On cerne vos cas d'usage, vos outils et là où un agent apporte vraiment de la valeur." },
        { title: "Devis détaillé sous 48 h", desc: "Vous recevez une proposition claire, sans engagement, avec le périmètre et le prix." },
        { title: "Conception et essais", desc: "On construit l'agent, on le branche à vos outils et on le teste sur vos vrais cas." },
        { title: "Mise en ligne et ajustements", desc: "On déploie, on surveille les premières interactions et on affine avec vous." },
      ],
      useCasesTitle: "Où un agent aide vraiment",
      useCases: [
        { icon: "headset", title: "Support client 24/7", desc: "L'agent répond aux questions courantes, jour et nuit, et transfère les cas délicats à votre équipe." },
        { icon: "listFilter", title: "Qualification des demandes", desc: "Il trie les messages entrants, comprend le besoin et oriente chaque client vers la bonne suite." },
        { icon: "bookOpen", title: "Assistant interne", desc: "Votre équipe interroge vos documents et vos données en langage naturel et obtient une réponse directe." },
        { icon: "mailCheck", title: "Traitement des courriels", desc: "L'agent lit, comprend et prépare des réponses ou des brouillons rédigés dans votre ton." },
      ],
      outcomesTitle: "Ce que vous y gagnez",
      outcomes: [
        { stat: "24/7", label: "Des réponses en tout temps" },
        { stat: "Dans votre ton", label: "Fidèle à votre voix" },
        { stat: "Sous 48 h", label: "Devis détaillé, sans engagement" },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "C'est différent d'un chatbot classique ?", a: "Oui. Un chatbot suit un script. Notre agent comprend la demande, décide de l'action et répond, même quand la question sort du cadre prévu." },
        { q: "Quelle est la différence avec l'automatisation des workflows ?", a: "L'automatisation suit des règles fixes, quand X, fais Y. L'agent IA entre en jeu quand il faut du jugement, de la nuance ou de la conversation." },
        { q: "L'agent peut-il se tromper ?", a: "On pose des garde-fous, on limite ce qu'il peut faire et on prévoit le passage à un humain pour les cas sensibles." },
        { q: "Est-ce que ça s'intègre à mes outils actuels ?", a: "Oui. On branche l'agent à votre stack existante plutôt que de vous imposer de nouveaux logiciels." },
        { q: "À qui appartient l'agent une fois livré ?", a: "À vous. Comptes, code et documentation vous sont remis, et vous en gardez la pleine propriété." },
        { q: "Combien de temps avant de démarrer ?", a: "Après l'appel découverte, vous recevez un devis détaillé sous 48 h, sans engagement." },
      ],
      ctaLabel: "Sur mesure",
      ctaTitle: "Voyons si un agent IA a sa place chez vous.",
      ctaDescription:
        "On regarde vos cas d'usage ensemble et on vous revient avec un devis détaillé sous 48 h.",
    },
    integration: {
      metaTitle: "Intégration & connexion d'outils",
      metaDescription:
        "On connecte vos outils pour qu'ils partagent la même information. Fini le copier-coller. Devis sous 48 h, sans engagement. Au service du Québec.",
      eyebrow: "Intégration & connexion d'outils",
      h1Before: "Vos outils, enfin ",
      h1Accent: "connectés",
      h1After: ".",
      lead: "On branche votre CRM, vos courriels, votre boutique et vos tableurs pour qu'ils partagent la même information. Fini le copier-coller entre vos applications.",
      whatTitle: "Ce qu'on fait",
      whatBody: [
        "On connecte les outils que vous utilisez déjà. Votre CRM, vos courriels, votre boutique en ligne, votre comptabilité, vos tableurs et vos calendriers finissent par se parler.",
        "Une donnée entrée une seule fois se répercute partout. Tout le monde voit la même information, au même moment, sans double saisie.",
        "L'intégration, c'est la base. Une fois vos outils branchés, vos automatisations et vos assistants IA peuvent rouler par-dessus.",
      ],
      includedTitle: "Ce qui est inclus",
      included: [
        { title: "Connexions API et webhooks", desc: "On relie vos applications par des liens fiables qui travaillent en arrière-plan." },
        { title: "Synchronisation des données", desc: "Vos systèmes gardent la même information à jour, en continu." },
        { title: "Migration propre des données", desc: "On déplace vos données d'un outil à l'autre sans perte ni doublon." },
        { title: "Documentation et remise", desc: "On vous remet comptes, code et documentation, avec la pleine propriété." },
      ],
      processTitle: "Comment on procède",
      process: [
        { title: "Appel découverte gratuit", desc: "On fait le tour de vos outils et de vos irritants, sans engagement." },
        { title: "Devis détaillé sous 48 h", desc: "Vous recevez un plan clair et un prix ferme en moins de deux jours." },
        { title: "Branchement et tests", desc: "On connecte vos systèmes et on valide chaque flux de données avant la mise en ligne." },
        { title: "Mise en ligne et remise", desc: "On active les connexions, puis on vous remet accès et documentation." },
      ],
      useCasesTitle: "Des exemples concrets",
      useCases: [
        { title: "Boutique et comptabilité", desc: "Chaque vente en ligne crée la facture et met vos chiffres à jour, sans ressaisie." },
        { title: "Formulaire vers CRM", desc: "Un nouveau lead tombe directement dans votre CRM, complet et prêt à suivre." },
        { title: "Calendrier et courriels", desc: "Vos rendez-vous et vos suivis restent synchronisés d'un outil à l'autre." },
        { title: "Une seule source fiable", desc: "Vos données éparpillées se regroupent dans un tableur toujours à jour." },
      ],
      outcomesTitle: "Ce que vous y gagnez",
      outcomes: [
        { stat: "Zéro", label: "double saisie" },
        { stat: "1", label: "seule source de vérité" },
        { stat: "Sous 48 h", label: "pour votre devis" },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Est-ce que vous remplacez mes outils actuels ?", a: "Non. On s'intègre à votre stack existante et on la relie, plutôt que de la remplacer." },
        { q: "Quelle est la différence avec l'automatisation ?", a: "L'intégration connecte vos outils et synchronise vos données. L'automatisation agit ensuite sur ces données selon vos règles." },
        { q: "À qui appartiennent les comptes et le code ?", a: "À vous. On vous remet la pleine propriété des comptes, du code et de la documentation." },
        { q: "Combien de temps avant d'avoir un prix ?", a: "Vous recevez un devis détaillé sous 48 h après l'appel découverte, sans engagement." },
        { q: "Mes outils sont-ils compatibles ?", a: "La plupart des applications courantes se connectent par API ou webhooks. On valide tout dès l'appel découverte." },
        { q: "L'appel découverte coûte-t-il quelque chose ?", a: "Non, la consultation est gratuite et sans engagement." },
      ],
      ctaLabel: "Sur mesure",
      ctaTitle: "Prêt à connecter vos outils ?",
      ctaDescription:
        "Réservez votre appel découverte gratuit et recevez un devis détaillé sous 48 h.",
    },
    conseil: {
      metaTitle: "Conseil & optimisation",
      metaDescription:
        "On analyse vos processus et on livre une feuille de route priorisée et chiffrée. Consultation gratuite, sans engagement.",
      eyebrow: "Conseil & optimisation",
      h1Before: "Un plan clair, ",
      h1Accent: "priorisé",
      h1After: " et chiffré.",
      lead: "Quand quelque chose ralentit sans que vous sachiez quoi régler d'abord, on analyse vos processus et on vous remet une feuille de route priorisée.",
      whatTitle: "À quoi ça sert",
      whatBody: [
        "Avant de bâtir quoi que ce soit, on regarde comment vous travaillez vraiment. On suit vos processus, on repère les goulots et les endroits où le temps s'échappe.",
        "Vous repartez avec une feuille de route priorisée et chiffrée : quoi régler en premier, quel gain en attendre et ce que ça demande. Automatisation, intégration, IA ou nouveau site, on vous dit où l'effort paie le plus.",
        "Le plan vous appartient. On peut le réaliser avec vous ensuite, ou vous le prenez et vous avancez seul. Aucune obligation d'aller plus loin.",
      ],
      includedTitle: "Ce que vous recevez",
      included: [
        { title: "Analyse de vos processus", desc: "On cartographie comment le travail circule aujourd'hui, étape par étape." },
        { title: "Goulots et gains rapides", desc: "On pointe ce qui vous ralentit et les quelques changements qui rapportent vite." },
        { title: "Feuille de route priorisée", desc: "Une liste ordonnée : quoi faire en premier, ensuite, et pourquoi dans cet ordre." },
        { title: "Estimation chiffrée par piste", desc: "Pour chaque priorité, un ordre de grandeur d'effort et de coût, sans mauvaise surprise." },
      ],
      processTitle: "Comment ça se passe",
      process: [
        { title: "Consultation gratuite", desc: "On discute de votre situation et de ce qui vous ralentit, sans engagement." },
        { title: "On observe vos processus", desc: "On regarde vos outils et vos façons de faire pour comprendre le vrai flux de travail." },
        { title: "On priorise et on chiffre", desc: "On classe les occasions par impact et par effort, puis on chiffre chacune." },
        { title: "Vous recevez votre plan", desc: "Feuille de route et devis détaillé sous 48 h. À vous de décider la suite." },
      ],
      useCasesTitle: "Quand ça vaut le coup",
      useCases: [
        { title: "Trop de tâches à la main", desc: "Vous copiez, collez et relancez sans arrêt, et ça gruge vos journées." },
        { title: "Des outils qui ne se parlent pas", desc: "Vos logiciels vivent chacun dans leur coin et vous faites le pont à la main." },
        { title: "Envie d'automatiser, sans savoir par où", desc: "L'IA et l'automatisation vous tentent, mais vous ne savez pas quoi prioriser." },
        { title: "La croissance coince", desc: "Plus de clients rime avec plus de chaos, et vos processus suivent mal." },
      ],
      outcomesTitle: "Ce que vous en retirez",
      outcomes: [
        { stat: "", label: "Feuille de route priorisée" },
        { stat: "48 h", label: "Devis détaillé, sans engagement" },
        { stat: "", label: "Le plan vous appartient" },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "La consultation est vraiment gratuite ?", a: "Oui. Le premier appel sert à comprendre votre situation et à voir si un diagnostic vaut le coup, sans engagement." },
        { q: "C'est quoi la différence avec l'automatisation ou les sites ?", a: "Ici, on réfléchit et on planifie : on trouve quoi régler et dans quel ordre. La réalisation vient après, si vous le voulez." },
        { q: "Suis-je obligé de faire la suite avec vous ?", a: "Non. La feuille de route est à vous. Vous pouvez la garder et avancer seul, ou nous confier la réalisation." },
        { q: "Combien ça coûte ?", a: "La consultation est gratuite. Un audit plus poussé se chiffre selon la complexité, et vous connaissez le montant avant de commencer." },
        { q: "Combien de temps ça prend ?", a: "Ça dépend de la taille de vos processus. Après notre échange, on vous revient avec un devis détaillé sous 48 h." },
        { q: "Vous travaillez avec mes outils actuels ?", a: "Oui. On part de votre stack existante et on bâtit le plan autour, sans tout remplacer." },
      ],
      ctaLabel: "Diagnostic",
      ctaTitle: "Trouvons par où commencer.",
      ctaDescription:
        "On discute de votre situation et on revient sous 48 h avec une première piste et un devis, sans engagement.",
    },
    sitesBoutiques: {
      metaTitle: "Sites & boutiques en ligne",
      metaDescription:
        "Sites, boutiques et image de marque conçus pour convertir. Consultation gratuite.",
      eyebrow: "Sites & boutiques en ligne",
      h1Before: "Un site qui travaille pour votre ",
      h1Accent: "pipeline",
      h1After: ".",
      lead: "De l'image de marque à la boutique en ligne : clair, rapide, pensé pour convertir.",
      nicheEyebrow: "Démos · prototypes",
      nicheHint: "Touchez une niche pour explorer",
      nicheTitle: "Ce qu'on peut bâtir pour vous.",
      nicheLead:
        "Voici des pistes par secteur. Votre projet n'a pas à entrer dans une case : explorez et imaginez le vôtre.",
      nicheDemo: "Voir la démo",
      nichePreview: "Aperçu du prototype",
      nicheComingSoon: "Image à venir",
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Combien de temps avant la mise en ligne du site ?", a: "Un site vitrine se lance souvent en quelques semaines, une boutique complète demande un peu plus. On vous remet un échéancier précis dans le devis, sous 48 h après la consultation gratuite." },
        { q: "Est-ce que le site m'appartient et est-ce que je peux le modifier moi-même ?", a: "Oui, vous gardez la pleine propriété du site, des comptes et du code, tout vous est remis. On le bâtit pour que vous puissiez changer vos textes et vos images sans dépendre de personne, et on vous forme à l'essentiel." },
        { q: "Est-ce que le référencement (SEO) est inclus ?", a: "On monte le site sur des bases solides pour le référencement : structure propre, vitesse, balises et contenu clair. Le SEO en continu peut aller plus loin, on en discute selon vos objectifs." },
        { q: "Est-ce que vous créez aussi le logo et l'image de marque ?", a: "Oui. Si vous partez de zéro, on bâtit le logo, les couleurs et la typographie avant de monter le site, pour que tout se tienne. Si vous avez déjà une identité, on la respecte et on la décline sur le web." },
        { q: "Avec quelles plateformes de boutique en ligne travaillez-vous ?", a: "On part de vos besoins et de votre stack actuelle plutôt que de vous imposer un outil. Boutique sur mesure ou plateforme du marché comme Shopify ou WooCommerce, on choisit avec vous celle qui vous coûtera le moins cher à opérer." },
        { q: "Qui s'occupe de l'hébergement et de l'entretien ?", a: "On peut tout prendre en charge : hébergement, entretien, mises à jour et évolutions du site. C'est une option, jamais une obligation. L'hébergement reste à votre nom, et si vous décidez de reprendre les rênes, vous partez avec le code et la documentation pour continuer sans nous." },
        { q: "De quoi avez-vous besoin de ma part pour commencer ?", a: "Une idée de vos objectifs, et vos textes, images et logo si vous en avez déjà. Sinon on s'en occupe, de l'identité visuelle à la rédaction. Rien de technique n'est exigé de votre part." },
      ],
      ctaLabel: "Sur mesure",
      ctaTitle: "Parlons de votre projet.",
      ctaDescription: "Décrivez-nous le vôtre, on revient avec une première piste concrète sous 48 h.",
      ctaButton: "Consultation gratuite",
    },
  },
  serviceContact: {
    eyebrow: "Consultation gratuite · sans engagement",
    bookLabel: "Réserver un appel découverte",
    phonePrompt: "Ou appelez Christopher au",
    formHeading: "Ou écrivez-nous en deux lignes",
    emailPrompt: "Vous préférez le courriel ?",
  },
  faqPage: {
    metaTitle: "FAQ",
    metaDescription:
      "Réponses aux questions fréquentes sur nos services d'automatisation, d'agents IA, d'intégration, de sites web et de conseil. Consultation gratuite.",
    eyebrow: "FAQ",
    title: "Vos questions, nos réponses.",
    lead: "Ce que les entrepreneurs du Québec nous demandent le plus souvent. Vous ne trouvez pas votre réponse ? Écrivez-nous, c'est Christopher qui répond.",
    generalTitle: "Général",
    general: [
      { q: "Comment fonctionnent vos prix et vos devis ?", a: "Chaque projet est chiffré individuellement après une consultation gratuite. On vous remet un devis détaillé sous 48 h, sans engagement." },
      { q: "Est-ce que je reste propriétaire de ce que vous construisez ?", a: "Oui, vous gardez la pleine propriété de tout. Comptes, code et documentation vous sont remis, rien ne reste verrouillé chez nous." },
      { q: "Combien de temps prend un projet en moyenne ?", a: "Ça varie selon l'ampleur, d'une poignée de jours pour une petite automatisation à quelques semaines pour un projet plus large. Vous avez un échéancier clair dans le devis." },
      { q: "Est-ce que je dois être à l'aise avec la technologie ?", a: "Non, aucune connaissance technique n'est requise. On s'occupe de la partie technique et on vous forme à l'essentiel pour rester autonome." },
      { q: "Avec quels outils travaillez-vous ?", a: "On s'intègre à votre stack existante plutôt que de la remplacer : CRM, courriel, boutique, calendriers et tableurs. Le traitement des demandes passe par n8n hébergé dans l'UE, en conformité avec la Loi 25." },
      { q: "Où êtes-vous situés et travaillez-vous à distance ?", a: "On est basé dans Lanaudière, au service du Québec. Le travail à distance est possible partout dans la province." },
      { q: "Qu'est-ce qui se passe après la livraison ?", a: "On vous remet tout et on vous forme pour être autonome. Si vous voulez du soutien ou de l'entretien par la suite, on reste disponible, sans obligation." },
      { q: "Comment on commence et en quoi consiste la consultation gratuite ?", a: "On jase de vos besoins et de vos objectifs, sans engagement, et Christopher répond lui-même. Vous repartez avec un devis détaillé sous 48 h." },
    ],
    ctaTitle: "Une question qui reste sans réponse ?",
    ctaDescription:
      "Écrivez-nous ou réservez un appel découverte. On revient sous 48 h, sans engagement.",
  },
  realisations: {
    metaTitle: "Réalisations",
    metaDescription:
      "Sites, automatisations et agents IA livrés par Workflow Wonder pour des entrepreneurs du Québec.",
    eyebrow: "Réalisations",
    title: "Du concret, en ligne.",
    lead: "Pas de maquettes : des sites et des systèmes réellement en service. Chaque projet livré s'ajoute ici.",
    visitLabel: "Visiter",
    works: [
      {
        tag: "Site vitrine · Réservation intégrée",
        client: "Éliane Larre · entraîneure privée, Montréal",
        title: "elianelarre.com",
        desc: "Page d'atterrissage complète : approche, accompagnement, témoignages, FAQ et parcours cliente en 5 étapes, avec réservation d'appel découverte et questionnaire d'accueil intégrés.",
        url: "https://elianelarre.com",
        urlLabel: "Visiter elianelarre.com",
        shot: {
          src: "/realisations/elianelarre.webp",
          alt: "Page d'accueil du site d'Éliane Larre, entraîneure privée à Montréal",
        },
      },
    ],
    upcomingNote:
      "D'autres projets sont en cours de livraison. Cette page grandit avec chaque mandat.",
    ctaLabel: "Votre projet",
    ctaTitle: "Le prochain projet ici pourrait être le vôtre.",
    ctaDescription:
      "Racontez-nous votre réalité : on revient sous 48 h avec une première piste et un devis.",
    ctaButton: "Consultation gratuite",
  },
  splash: {
    ariaLabel: "Introduction Workflow Wonder",
  },
  cookies: {
    iconAriaLabel: "Biscuit avec une bouchée, symbole des préférences de témoins",
    banner: {
      title: "On respecte votre vie privée.",
      body: "On utilise seulement les témoins nécessaires au bon fonctionnement du site. Rien d'autre sans votre accord.",
      acceptAll: "Tout accepter",
      rejectNonEssential: "Refuser",
      managePreferences: "Personnaliser",
      privacyLinkLabel: "Politique de confidentialité",
    },
    modal: {
      title: "Préférences de témoins",
      intro:
        "Voici ce qu'on utilise, et pourquoi. Les témoins essentiels ne peuvent pas être désactivés.",
      alwaysOn: "Toujours actif",
      saveButton: "Enregistrer mes préférences",
      acceptAllButton: "Tout accepter",
      rejectAllButton: "Refuser les non essentiels",
      closeLabel: "Fermer",
      updatedLabel: "Choix enregistré le",
      privacyLinkLabel: "Voir la politique de confidentialité complète",
    },
    categories: [
      {
        id: "necessary",
        title: "Essentiels",
        description:
          "Indispensables au bon fonctionnement du site. Déposés par nous, jamais par des tiers.",
        entries: [
          {
            label: "Votre choix de témoins",
            purpose: "Retient la décision que vous prenez ici, pour ne pas vous la redemander à chaque visite.",
            duration: "12 mois",
          },
          {
            label: "Animation d'introduction",
            purpose: "Se souvient que vous avez déjà vu l'animation d'accueil, pour ne pas la rejouer.",
            duration: "Votre visite",
          },
        ],
      },
      {
        id: "analytics",
        title: "Mesure d'audience",
        description:
          "Nous aideraient à comprendre l'utilisation du site, de façon anonyme et globale. Désactivés par défaut.",
        emptyNote:
          "Aucun outil de mesure n'est actif pour le moment. Si on en ajoute un, il apparaîtra ici et restera désactivé sans votre accord.",
        entries: [],
      },
    ],
  },
  privacy: {
    eyebrow: "Confidentialité",
    title: "Politique de confidentialité",
    lastUpdatedLabel: "Dernière mise à jour :",
    lastUpdated: "19 juillet 2026",
    intro:
      "Workflow Wonder (« nous ») s'engage à protéger les renseignements personnels que vous nous confiez. La présente politique explique quels renseignements nous recueillons, pourquoi, comment ils sont traités et quels sont vos droits, conformément à la **Loi 25** (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels) du Québec.",
    sections: [
      {
        heading: "Responsable de la protection des renseignements personnels",
        blocks: [
          {
            type: "p",
            text: "Toute question relative à vos renseignements personnels ou à la présente politique peut être adressée à notre responsable de la protection des renseignements personnels à l'adresse {{email}}.",
          },
        ],
      },
      {
        heading: "Renseignements que nous recueillons",
        blocks: [
          {
            type: "p",
            text: "Lorsque vous remplissez notre formulaire de contact, nous recueillons uniquement les renseignements nécessaires au traitement de votre demande :",
          },
          {
            type: "list",
            items: [
              "**Nom de l'entreprise** (obligatoire)",
              "**Adresse courriel** (obligatoire)",
              "**Prénom et nom de famille** (facultatifs)",
              "**Le message** que vous choisissez de nous transmettre (facultatif)",
            ],
          },
          {
            type: "p",
            text: "Nous appliquons le principe de minimisation : nous ne demandons que ce qui est strictement nécessaire pour vous répondre.",
          },
        ],
      },
      {
        heading: "Finalités de la collecte",
        blocks: [
          { type: "p", text: "Vos renseignements sont utilisés exclusivement pour :" },
          {
            type: "list",
            items: [
              "Vous envoyer un courriel de confirmation de la réception de votre demande ;",
              "Communiquer avec vous et répondre à votre demande ;",
              "Préparer, le cas échéant, une proposition ou un devis.",
            ],
          },
          {
            type: "p",
            text: "Nous n'utilisons pas vos renseignements à des fins de marketing sans votre consentement distinct et explicite, et nous ne les vendons ni ne les louons à des tiers.",
          },
        ],
      },
      {
        heading: "Consentement",
        blocks: [
          {
            type: "p",
            text: "En cochant la case de consentement et en soumettant le formulaire, vous consentez à ce que nous recueillions et conservions vos renseignements aux fins décrites ci-dessus. Vous pouvez retirer votre consentement en tout temps en nous écrivant à {{email}}.",
          },
        ],
      },
      {
        heading: "Communication à des tiers et hébergement",
        blocks: [
          {
            type: "p",
            text: "Le traitement de votre demande s'appuie sur un prestataire d'automatisation, **n8n**, dont l'infrastructure infonuagique utilisée est située dans l'**Union européenne (Allemagne)**. Cette juridiction est encadrée par le Règlement général sur la protection des données (RGPD), qui offre une protection comparable à celle exigée par la Loi 25. Aucun autre transfert de vos renseignements n'est effectué sans nécessité liée aux finalités décrites.",
          },
        ],
      },
      {
        heading: "Durée de conservation",
        blocks: [
          {
            type: "p",
            text: "Nous conservons vos renseignements uniquement le temps nécessaire à la réalisation des finalités, soit un maximum de **12 mois** à compter de votre dernière communication avec nous, après quoi ils sont supprimés de manière sécuritaire, à moins qu'une relation d'affaires ne soit établie et justifie une conservation additionnelle.",
          },
        ],
      },
      {
        heading: "Vos droits",
        blocks: [
          { type: "p", text: "Conformément à la Loi 25, vous avez le droit :" },
          {
            type: "list",
            items: [
              "D'accéder aux renseignements personnels que nous détenons à votre sujet ;",
              "De demander leur rectification s'ils sont inexacts ou incomplets ;",
              "De retirer votre consentement et de demander leur suppression ;",
              "De porter plainte auprès de la Commission d'accès à l'information (CAI).",
            ],
          },
          {
            type: "p",
            text: "Pour exercer l'un de ces droits, écrivez-nous à {{email}}. Nous répondrons dans les délais prévus par la loi (au plus tard 30 jours).",
          },
        ],
      },
      {
        heading: "Sécurité",
        blocks: [
          {
            type: "p",
            text: "Les transmissions de données se font via des connexions chiffrées (HTTPS). Nous mettons en place des mesures de sécurité raisonnables pour protéger vos renseignements contre la perte, l'accès non autorisé ou la divulgation. En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous en aviserons la CAI et les personnes concernées, comme l'exige la loi.",
          },
        ],
      },
      {
        heading: "Témoins et technologies similaires (cookies)",
        showCookieTable: true,
        blocks: [
          {
            type: "p",
            text: "Un bandeau vous permet de faire un choix dès votre première visite. Vous pouvez le modifier en tout temps via le lien **Gérer les témoins** au bas de chaque page du site.",
          },
          {
            type: "p",
            text: "Témoins strictement nécessaires : toujours actifs, ils assurent le bon fonctionnement du site (par exemple, mémoriser votre choix de consentement) et ne requièrent pas votre consentement, conformément à la Loi 25.",
          },
          {
            type: "p",
            text: "Témoins de mesure d'audience (analytics) : optionnels et désactivés par défaut. Aucun outil de mesure n'est actif sur le site à l'heure actuelle; si nous en ajoutons un, il ne se déclenchera qu'après votre consentement explicite, et cette section sera mise à jour en conséquence.",
          },
          { type: "p", text: "En clair, voici ce que le site utilise :" },
        ],
      },
      {
        heading: "Modifications",
        blocks: [
          {
            type: "p",
            text: "Cette politique peut être mise à jour. La date de dernière mise à jour est indiquée en haut de la page. Nous vous invitons à la consulter périodiquement.",
          },
        ],
      },
    ],
  },
};
