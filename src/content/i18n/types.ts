export type HomeServiceItem = {
  t: string;
  soon?: boolean;
};

export type ServicePathKey = "automatisation" | "agentsIa" | "sitesBoutiques";

export type HomeServiceCopy = {
  no: string;
  pathKey: ServicePathKey;
  tag: string;
  title: string;
  accent: string;
  desc: string;
  /** One-line result the client gets — outcomes, not features. */
  outcome: string;
  items: HomeServiceItem[];
  cta: string;
};

export type WorkEntry = {
  tag: string;
  client: string;
  title: string;
  desc: string;
  url: string;
  urlLabel: string;
};

export type FaqItem = {
  q: string;
  a: string;
  open?: boolean;
};

export type CookieTableEntry = {
  /** Plain-language name shown to visitors (never the technical cookie name). */
  label: string;
  purpose: string;
  duration: string;
};

export type CookieCategoryCopy = {
  id: "necessary" | "analytics";
  title: string;
  description: string;
  /** Shown instead of a table row when `entries` is empty. */
  emptyNote?: string;
  entries: CookieTableEntry[];
};

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type PrivacySection = {
  heading: string;
  blocks: PrivacyBlock[];
  /** Renders the live cookie-categories table (shared with the preference modal) after this section's blocks. */
  showCookieTable?: boolean;
};

export type Dictionary = {
  meta: {
    titleDefault: string;
    titleTemplate: string;
    description: string;
  };
  chrome: {
    services: string;
    approach: string;
    realisations: string;
    consultCta: string;
    allArticles: string;
    langSwitchLabel: string;
    langFr: string;
    langEn: string;
    skipIntro: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
  };
  nav: {
    services: { title: string; tag: string }[];
  };
  footer: {
    blurb: string;
    servicesHeading: string;
    exploreHeading: string;
    blog: string;
    contact: string;
    realisations: string;
    privacy: string;
    cookiePreferences: string;
    rights: string;
    homeCtaEyebrow: string;
    homeCtaTitle: string;
    homeCtaLead: string;
    homeCtaButton: string;
    homeCtaAlt: string;
    faqLabel: string;
    faq: FaqItem[];
  };
  home: {
    city: string;
    hero: {
      eyebrow: string;
      h1Line1: string;
      h1Line2Before: string;
      h1Gradient: string;
      h1Line2After: string;
      leadBefore: string;
      leadCity: string;
      leadAfter: string;
      primaryCta: string;
      secondaryCta: string;
      meta: string[];
    };
    services: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      /** Resolves the rules-vs-AI tension in one line. */
      lead: string;
      soon: string;
      cards: HomeServiceCopy[];
    };
    proof: {
      eyebrow: string;
      title: string;
      caseTag: string;
      caseTitle: string;
      caseDesc: string;
      caseCta: string;
      pageCta: string;
      demoNote: string;
    };
    audience: {
      titleLine1: string;
      titleLine2: string;
      lead: string;
      fitTitle: string;
      notFitTitle: string;
      slidesHeading: string;
      prev: string;
      next: string;
      goToSlide: string;
      slideLinkLabel: string;
      slides: { no: string; text: string; pathKey: ServicePathKey }[];
      fit: string[];
      notFit: string[];
    };
    tools: {
      title: string;
      subtitle: string;
    };
    visibility: {
      eyebrow: string;
      title: string;
      lead: string;
      micro: string;
      primaryCta: string;
      secondaryCta: string;
    };
    ownership: {
      title: string;
      lead: string;
      footer: string;
      steps: { no: string; title: string; desc: string }[];
    };
    pricing: {
      titleLine1: string;
      titleLine2: string;
      lead: string;
      consultEyebrow: string;
      consultTitle: string;
      consultItems: string[];
      consultCta: string;
      factorsHeading: string;
      factorsNote: string;
      factors: string[];
      payment: { no: string; title: string; desc: string }[];
    };
    journal: {
      title: string;
      allArticles: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: string[];
    emailPrompt: string;
    form: {
      firstName: string;
      firstNameOptional: string;
      lastName: string;
      lastNameOptional: string;
      company: string;
      email: string;
      message: string;
      messageOptional: string;
      consent: string;
      consentLinkLabel: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorGeneric: string;
    };
  };
  journalIndex: {
    eyebrow: string;
    title: string;
    lead: string;
    read: string;
    featured: string;
    readingSuffix: string;
    toc: string;
    readNext: string;
    sources: string;
  };
  services: {
    automatisation: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      live: string;
      h1Before: string;
      h1Accent: string;
      h1After: string;
      lead: string;
      pill: string;
      pillMuted: string;
      legend: string[];
      ctaLabel: string;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
    };
    agentsIa: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      live: string;
      h1Before: string;
      h1Accent: string;
      h1After: string;
      lead: string;
      legend: string[];
      ctaLabel: string;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
    };
    sitesBoutiques: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      h1Before: string;
      h1Accent: string;
      h1After: string;
      lead: string;
      nicheEyebrow: string;
      nicheHint: string;
      nicheTitle: string;
      nicheLead: string;
      nicheDemo: string;
      nichePreview: string;
      nicheComingSoon: string;
      ctaLabel: string;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
    };
  };
  realisations: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    visitLabel: string;
    works: WorkEntry[];
    upcomingNote: string;
    ctaLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
  splash: {
    skip: string;
    ariaLabel: string;
  };
  cookies: {
    iconAriaLabel: string;
    banner: {
      title: string;
      body: string;
      acceptAll: string;
      rejectNonEssential: string;
      managePreferences: string;
      privacyLinkLabel: string;
    };
    modal: {
      title: string;
      intro: string;
      alwaysOn: string;
      saveButton: string;
      acceptAllButton: string;
      rejectAllButton: string;
      closeLabel: string;
      updatedLabel: string;
      privacyLinkLabel: string;
    };
    categories: CookieCategoryCopy[];
  };
  privacy: {
    eyebrow: string;
    title: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
    intro: string;
    sections: PrivacySection[];
  };
};
