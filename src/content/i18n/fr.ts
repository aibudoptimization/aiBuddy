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
    approach: "Approche",
    realisations: "Réalisations",
    consultCta: "Consultation gratuite",
    allArticles: "Tous les articles",
    langSwitchLabel: "Language",
    langFr: "FR",
    langEn: "EN",
    skipIntro: "Passer",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryNav: "Navigation principale",
  },
  nav: {
    services: [
      { title: "Automatisation des workflows", tag: "Workflows · règles · relais" },
      { title: "Agents & assistants IA", tag: "Agents · IA · décision" },
      { title: "Sites & boutiques en ligne", tag: "Sites · boutiques · e-commerce" },
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
        open: true,
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
  },
  home: {
    city: "Lanaudière",
    hero: {
      eyebrow: "Automatisation IA",
      h1Line1: "Moins de tâches manuelles.",
      h1Line2Before: "Plus de ",
      h1Gradient: "croissance",
      h1Line2After: ".",
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
      titleLine1: "Trois leviers.",
      titleLine2: "Un objectif : vous faire gagner du temps.",
      lead: "Des règles quand c'est fiable, de l'IA quand c'est utile — jamais l'inverse.",
      soon: "Bientôt",
      cards: [
        {
          no: "01",
          pathKey: "automatisation",
          tag: "Automation",
          title: "Automatisation des workflows",
          accent: "#4bfac8",
          desc: "Vos règles, vos outils, zéro relance oubliée. Les tâches répétitives partent. Votre focus reste sur la vente et la livraison.",
          outcome: "Résultat : zéro suivi oublié et des heures récupérées chaque semaine.",
          items: [
            { t: "Emails marketing automatisés" },
            { t: "Séquences d'onboarding" },
            { t: "Synchronisation CRM & données client" },
            { t: "Tri & traitement automatisés des données récurrentes" },
          ],
          cta: "Voir la démo",
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
            { t: "Workflows IA agentiques" },
            { t: "Chatbots de support client" },
            { t: "Gestion client assistée par IA" },
            { t: "Automatisation des réseaux sociaux", soon: true },
          ],
          cta: "Voir la démo",
        },
        {
          no: "03",
          pathKey: "sitesBoutiques",
          tag: "Web",
          title: "Sites & boutiques en ligne",
          accent: "#f0a94e",
          desc: "Un site ou une boutique conçu pour convertir : clair, rapide, aligné à votre offre.",
          outcome: "Résultat : un site qui génère des demandes pendant que vous travaillez.",
          items: [
            { t: "Création de marque & identité visuelle" },
            { t: "Sites & web apps sur mesure" },
            { t: "Boutiques e-commerce" },
            { t: "Landing pages qui convertissent" },
          ],
          cta: "Voir la démo",
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
        "Envie d'en voir plus ? Chaque page service embarque une démo interactive : essayez-les.",
    },
    audience: {
      titleLine1: "Fait pour les entrepreneurs",
      titleLine2: "qui veulent grandir, sans s'épuiser.",
      lead: "Solopreneur ou petite équipe au Québec, déjà en mouvement, freiné par le « tout-à-la-main ».",
      fitTitle: "C'est pour vous si…",
      notFitTitle: "Pas le bon moment si…",
      slidesHeading: "Vous êtes au bon endroit si…",
      prev: "Précédent",
      next: "Suivant",
      goToSlide: "Aller à la diapositive",
      slideLinkLabel: "Voir la solution →",
      slides: [
        {
          no: "01",
          text: "Trop d'heures sur des tâches qu'un système peut faire.",
          pathKey: "automatisation",
        },
        {
          no: "02",
          text: "La demande monte plus vite que votre capacité à suivre.",
          pathKey: "agentsIa",
        },
        { no: "03", text: "Vous voulez l'IA, sans parcours technique.", pathKey: "agentsIa" },
        {
          no: "04",
          text: "Vos outils ne se parlent pas, trop de copier-coller.",
          pathKey: "automatisation",
        },
        {
          no: "05",
          text: "Vous voulez un site qui génère des demandes, pas une vitrine.",
          pathKey: "sitesBoutiques",
        },
      ],
      fit: [
        "Solopreneur ou petite équipe (2 à 10 personnes)",
        "Déjà un peu de volume et de revenus à optimiser",
        "Prêt à investir pour récupérer du temps",
        "Ouvert au changement, avec une vision long terme",
      ],
      notFit: [
        "Grande entreprise aux processus lourds et figés",
        "Projet sans budget ni revenus encore à automatiser",
        "Recherche avant tout le prestataire le moins cher",
      ],
    },
    tools: {
      title: "On branche vos outils.",
      subtitle: "Rien à remplacer — on s'intègre à ce que vous utilisez déjà.",
      more: "+ des dizaines d'autres",
    },
    visibility: {
      eyebrow: "Inclus dans tout ce qu'on livre",
      title: "Être trouvé. Sur Google. Dans les réponses IA.",
      lead: "SEO, GEO et AEO : chaque site et chaque contenu qu'on livre pose ces bases, pour que vos clients vous trouvent — pas seulement vos concurrents.",
      micro: "Référencement · Réponses IA · Mesure",
      primaryCta: "Consultation gratuite",
      secondaryCta: "Comment ça marche →",
    },
    ownership: {
      title: "On construit. Vous possédez.",
      lead: "Comme une maison sur votre terrain : vos comptes, vos accès, vos systèmes.",
      footer: "Zéro dépendance. Votre système vous suit, avec ou sans nous.",
      steps: [
        {
          no: "01",
          title: "Sur vos comptes",
          desc: "Tout est mis en place depuis vos propres accès, vos outils, vos données.",
        },
        {
          no: "02",
          title: "Tout est documenté",
          desc: "Chaque automatisation est documentée clairement, rien ne dépend de notre mémoire.",
        },
        {
          no: "03",
          title: "On vous remet les clés",
          desc: "Accès, code, documentation : tout vous est transféré. On reste pour l'hébergement par confort, pas par contrainte.",
        },
        {
          no: "04",
          title: "100 % à vous",
          desc: "Vous pouvez tout reprendre et continuer à le faire tourner, avec ou sans nous.",
        },
      ],
    },
    pricing: {
      titleLine1: "Combien ça coûte ?",
      titleLine2: "Ça commence par une consultation gratuite.",
      lead: "Pas de liste de prix : chaque projet est chiffré selon votre réalité. On comprend votre besoin, vous repartez avec un plan et un devis détaillé sous 48 h. Sans engagement.",
      consultEyebrow: "Consultation gratuite · sans engagement",
      consultTitle: "Ce que vous obtenez",
      consultItems: [
        "Un plan d'action clair & priorisé",
        "Des recommandations concrètes",
        "Un devis détaillé sous 48 h",
      ],
      consultCta: "Réserver ma consultation →",
      factorsHeading: "Ce qui fait varier votre devis",
      factorsNote:
        "Bonne nouvelle : plus vous avez déjà de matière, plus le projet est simple et moins il coûte.",
      factors: [
        "Les outils & abonnements nécessaires",
        "La taille de votre entreprise",
        "Le volume de données à traiter",
        "L'usage de l'IA (tokens & modèle)",
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
          title: "Abonnements payés en direct",
          desc: "Depuis vos comptes, sans marge cachée.",
        },
        {
          no: "03",
          title: "Support en option",
          desc: "Seulement si vous le voulez.",
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
        "Workflows basés sur des règles pour les entrepreneurs du Québec. Consultation gratuite.",
      eyebrow: "Automatisation des workflows",
      live: "7 scénarios · un parcours client",
      h1Before: "Des workflows qui se déclenchent et se passent le ",
      h1Accent: "relais",
      h1After: ".",
      lead: "100 % règles. Un événement lance une séquence. Pas d'IA : votre logique, exécutée à la lettre.",
      pill: "Du premier lead à l'avis Google. ",
      pillMuted: "chaque scénario peut passer le relais au suivant.",
      legend: ["Déclencheur · action", "Condition · règle", "Relais vers un autre scénario", "Sans IA · 100 % règles"],
      ctaLabel: "Sur mesure",
      ctaTitle: "Votre workflow n'est pas dans la liste ? On le bâtit.",
      ctaDescription:
        "Ce ne sont que des exemples. Chaque automatisation se construit selon vos outils, vos règles et votre réalité.",
      ctaButton: "Consultation gratuite",
    },
    agentsIa: {
      metaTitle: "Agents & assistants IA",
      metaDescription:
        "Des agents IA qui comprennent, décident et agissent pour votre entreprise. Consultation gratuite.",
      eyebrow: "Agents & assistants IA",
      live: "agent en direct",
      h1Before: "Un agent qui comprend, ",
      h1Accent: "décide",
      h1After: " et agit.",
      lead: "Regardez-le travailler : chaque scénario se joue en direct.",
      legend: ["Perçoit l'entrée", "Raisonne & choisit l'outil", "Agit & répond"],
      ctaLabel: "Sur mesure",
      ctaTitle: "Un agent calibré à votre métier, pas un chatbot générique.",
      ctaDescription:
        "On conçoit l'agent autour de votre métier, vos données, vos outils, votre ton de voix.",
      ctaButton: "Consultation gratuite",
    },
    sitesBoutiques: {
      metaTitle: "Sites & boutiques en ligne",
      metaDescription:
        "Sites et boutiques conçus pour convertir. Consultation gratuite.",
      eyebrow: "Sites & boutiques en ligne",
      h1Before: "Un site qui travaille pour votre ",
      h1Accent: "pipeline",
      h1After: ".",
      lead: "De la landing page à la boutique : clair, rapide, pensé pour convertir.",
      nicheEyebrow: "Démos · prototypes",
      nicheHint: "Touchez une niche pour explorer",
      nicheTitle: "Ce qu'on peut bâtir pour vous.",
      nicheLead:
        "Voici des pistes par secteur. Votre projet n'a pas à entrer dans une case : explorez et imaginez le vôtre.",
      nicheDemo: "Voir la démo",
      nichePreview: "Aperçu du prototype",
      nicheComingSoon: "Image à venir",
      ctaLabel: "Sur mesure",
      ctaTitle: "Parlons de votre projet.",
      ctaDescription: "Décrivez-nous le vôtre, on revient avec une première piste concrète sous 48 h.",
      ctaButton: "Consultation gratuite",
    },
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
        client: "Éliane Larre — entraîneure privée, Montréal",
        title: "elianelarre.com",
        desc: "Page d'atterrissage complète : approche, accompagnement, témoignages, FAQ et parcours cliente en 5 étapes, avec réservation d'appel découverte et questionnaire d'accueil intégrés.",
        url: "https://elianelarre.com",
        urlLabel: "Visiter elianelarre.com",
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
    skip: "Passer",
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
