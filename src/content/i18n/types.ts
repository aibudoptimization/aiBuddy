export type HomeServiceItem = {
  t: string;
  soon?: boolean;
};

export type ServicePathKey =
  | "automatisation"
  | "agentsIa"
  | "integration"
  | "sitesBoutiques"
  | "conseil";

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
  /** Screenshot of the live site; falls back to the browser mockup when absent. */
  shot?: { src: string; alt: string };
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
};

/**
 * Icon names available to service rows. Keys map to lucide components in
 * `serviceRowIcons`; keeping them as a union means a typo fails the build
 * rather than silently rendering nothing.
 */
export type ServiceRowIcon =
  | "split"
  | "workflow"
  | "repeat"
  | "mail"
  | "route"
  | "userPlus"
  | "receipt"
  | "inbox"
  | "calendarClock"
  | "send";

/** Title + one-line description, used for "included", "process" and "use case" rows. */
export type ServiceRow = {
  title: string;
  desc: string;
  /** Falls back to a plain accent dot when absent. */
  icon?: ServiceRowIcon;
};

/** A result tile: an optional short stat plus a label. */
export type ServiceOutcome = {
  stat: string;
  label: string;
};

/** Unified copy shape for the text/section-based service pages. */
export type ServiceDetailCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1Before: string;
  h1Accent: string;
  h1After: string;
  lead: string;
  whatTitle: string;
  whatBody: string[];
  includedTitle: string;
  included: ServiceRow[];
  processTitle: string;
  process: ServiceRow[];
  useCasesTitle: string;
  useCases: ServiceRow[];
  outcomesTitle: string;
  outcomes: ServiceOutcome[];
  faqTitle: string;
  faq: FaqItem[];
  /** Small label above the closing CTA band. */
  ctaLabel: string;
  ctaTitle: string;
  ctaDescription: string;
};

/** Shared labels for the discovery-call CTA + embedded form on every service page. */
export type ServiceContactCopy = {
  eyebrow: string;
  bookLabel: string;
  phonePrompt: string;
  formHeading: string;
  emailPrompt: string;
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
    realisations: string;
    consultCta: string;
    allArticles: string;
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
    /** Full FAQ page link label shown under the footer FAQ. */
    faqAllLabel: string;
    phoneLabel: string;
  };
  home: {
    city: string;
    hero: {
      eyebrow: string;
      h1Line1: string;
      h1Line2Before: string;
      /** Rotating gradient words; the first is the SSR/static one. */
      h1GradientWords: string[];
      /** Break before the gradient word on narrow screens (long-word locales). */
      h1MobileBreak: boolean;
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
      /** Accessible name of the sphere carousel region. */
      carouselLabel: string;
      /** Prefix for the "bring this card to front" card labels. */
      goTo: string;
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
      fit: string[];
      notFit: string[];
      resolveLine: string;
      resolveCta: string;
    };
    tools: {
      title: string;
      subtitle: string;
      more: string;
    };
    included: {
      label: string;
      items: string[];
      cta: string;
    };
    ownership: {
      title: string;
      lead: string;
      footerStrong: string;
      footerMuted: string;
      footerCta: string;
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
      factorsNoteStrong: string;
      factorsNote: string;
      factors: string[];
      payment: { no: string; title: string; desc: string }[];
    };
    journal: {
      title: string;
      allArticles: string;
    };
  };
  founder: {
    name: string;
    role: string;
    region: string;
    note: string;
    consultLine: string;
    photoAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    emailPrompt: string;
    phonePrompt: string;
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
    automatisation: ServiceDetailCopy;
    agentsIa: ServiceDetailCopy;
    integration: ServiceDetailCopy;
    conseil: ServiceDetailCopy;
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
      faqTitle: string;
      faq: FaqItem[];
      ctaLabel: string;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
    };
  };
  /** Shared discovery-call CTA + form labels reused on every service page. */
  serviceContact: ServiceContactCopy;
  faqPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    generalTitle: string;
    general: FaqItem[];
    ctaTitle: string;
    ctaDescription: string;
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
