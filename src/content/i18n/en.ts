import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    titleDefault: "Workflow Wonder",
    titleTemplate: "%s · Workflow Wonder",
    description:
      "Automation, AI agents, and websites for Québec entrepreneurs. Free consultation.",
  },
  chrome: {
    services: "Services",
    approach: "Approach",
    realisations: "Work",
    consultCta: "Free consultation",
    allArticles: "All articles",
    langSwitchLabel: "Langue",
    langFr: "FR",
    langEn: "EN",
    skipIntro: "Skip",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary navigation",
  },
  nav: {
    services: [
      { title: "Workflow automation", tag: "Workflows · rules · handoffs" },
      { title: "AI agents & assistants", tag: "Agents · AI · decisions" },
      { title: "Websites & online stores", tag: "Sites · stores · e‑commerce" },
    ],
  },
  footer: {
    blurb:
      "We help Québec entrepreneurs automate the busywork and grow, without losing ownership of their systems.",
    servicesHeading: "Services",
    exploreHeading: "Explore",
    blog: "Journal",
    contact: "Contact",
    realisations: "Work",
    privacy: "Privacy",
    cookiePreferences: "Manage cookies",
    rights: "All rights reserved.",
    homeCtaEyebrow: "Free consultation · no commitment",
    homeCtaTitle: "Ready to get your time back?",
    homeCtaLead:
      "Tell us about your business. We’ll reply within 48 hours with a concrete first step.",
    homeCtaButton: "Free consultation",
    homeCtaAlt: "or email us",
    faqLabel: "FAQ",
    faq: [
      {
        q: "How long does a project take?",
        a: "Most projects: 2 to 6 weeks. Clear timeline from the consultation.",
        open: true,
      },
      {
        q: "Do I keep ownership?",
        a: "Yes. Built on your accounts. Code, access, and docs are yours.",
      },
      {
        q: "What does it cost?",
        a: "Free consultation, then a detailed quote within 48 hours. No commitment.",
      },
      {
        q: "Do I need to be technical?",
        a: "No. We set it up and train you on what matters.",
      },
      {
        q: "Which tools do you use?",
        a: "We adapt to your stack (CRM, email, e‑commerce…) instead of ripping everything out.",
      },
    ],
  },
  home: {
    city: "Lanaudière",
    hero: {
      eyebrow: "AI automation",
      h1Line1: "Less busywork",
      h1Line2Before: "More ",
      h1GradientWords: ["growth", "time", "freedom"],
      h1MobileBreak: false,
      leadBefore: "Based in ",
      leadCity: "Lanaudière",
      leadAfter:
        ". We automate workflows, ship AI agents, and build sites that convert, for Québec entrepreneurs who want to grow without doing everything by hand.",
      primaryCta: "Free consultation",
      secondaryCta: "See services",
      meta: ["Workflows · AI agents · Sites", "Quote within 48 h", "No commitment"],
    },
    services: {
      eyebrow: "WHAT WE DELIVER",
      titleLine1: "Three levers.",
      titleLine2: "One goal: give you time back.",
      lead: "Rules where they're reliable, AI where it's useful — never the other way around.",
      soon: "Soon",
      cards: [
        {
          no: "01",
          pathKey: "automatisation",
          tag: "Automation",
          title: "Workflow automation",
          accent: "#4bfac8",
          desc: "Your rules, your tools, no forgotten follow-ups. Repetitive work goes away. You stay on sales and delivery.",
          outcome: "The result: no missed follow-ups and hours back every week.",
          items: [
            { t: "Automated marketing emails" },
            { t: "Onboarding sequences" },
            { t: "CRM & customer data sync" },
            { t: "Automated sorting of recurring data" },
          ],
          cta: "See the demo",
        },
        {
          no: "02",
          pathKey: "agentsIa",
          tag: "AI",
          title: "AI agents & assistants",
          accent: "#8b7cff",
          desc: "Agents that understand the request, pick the action, and reply, 24/7, in your voice.",
          outcome: "The result: every request gets an answer within minutes, day or night.",
          items: [
            { t: "Agentic AI workflows" },
            { t: "Customer support chatbots" },
            { t: "AI-assisted client management" },
            { t: "Social media automation", soon: true },
          ],
          cta: "See the demo",
        },
        {
          no: "03",
          pathKey: "sitesBoutiques",
          tag: "Web",
          title: "Websites & online stores",
          accent: "#f0a94e",
          desc: "A site or store built to convert: clear, fast, aligned with your offer.",
          outcome: "The result: a site that generates leads while you work.",
          items: [
            { t: "Brand & visual identity" },
            { t: "Custom sites & web apps" },
            { t: "E‑commerce stores" },
            { t: "Landing pages that convert" },
          ],
          cta: "See the demo",
        },
      ],
    },
    proof: {
      eyebrow: "Work",
      title: "We don't tell. We show.",
      caseTag: "Personal training · Montréal",
      caseTitle: "elianelarre.com",
      caseDesc:
        "Landing page for a personal trainer: client journey, testimonials, FAQ, and integrated discovery-call booking.",
      caseCta: "Visit the site",
      pageCta: "All work →",
      demoNote:
        "Want more? Every service page ships with an interactive demo: try them.",
    },
    audience: {
      titleLine1: "Built for entrepreneurs",
      titleLine2: "who want to scale, without burning out.",
      lead: "Solo or small Québec team, already moving, stuck doing everything by hand.",
      fitTitle: "You’re a fit if…",
      notFitTitle: "Not the right time if…",
      slidesHeading: "You’re in the right place if…",
      prev: "Previous",
      next: "Next",
      goToSlide: "Go to slide",
      slideLinkLabel: "See the fix →",
      slides: [
        {
          no: "01",
          text: "Too many hours on work a system could handle.",
          pathKey: "automatisation",
        },
        {
          no: "02",
          text: "Demand is growing faster than you can keep up.",
          pathKey: "agentsIa",
        },
        { no: "03", text: "You want AI without a technical maze.", pathKey: "agentsIa" },
        {
          no: "04",
          text: "Your tools don’t talk, too much copy-paste.",
          pathKey: "automatisation",
        },
        {
          no: "05",
          text: "You want a site that generates leads, not a brochure.",
          pathKey: "sitesBoutiques",
        },
      ],
      fit: [
        "Solo or small team (2 to 10 people)",
        "Already some volume and revenue to optimize",
        "Ready to invest to get time back",
        "Open to change, with a long-term view",
      ],
      notFit: [
        "Large company with heavy, rigid processes",
        "Project with no budget or revenue to automate yet",
        "Looking mainly for the cheapest vendor",
      ],
    },
    tools: {
      title: "We connect to your stack.",
      subtitle: "Nothing to replace — we plug into what you already use.",
      more: "+ dozens more",
    },
    visibility: {
      eyebrow: "Included in everything we ship",
      title: "Get found. On Google. In AI answers.",
      lead: "SEO, GEO, and AEO: every site and piece of content we deliver lays these foundations, so customers find you — not just your competitors.",
      micro: "Search · AI answers · Measurement",
      primaryCta: "Free consultation",
      secondaryCta: "How it works →",
    },
    ownership: {
      title: "We build. You own.",
      lead: "Like a house on your land: your accounts, your access, your systems.",
      footer: "Zero lock-in. Your system stays with you, with or without us.",
      steps: [
        {
          no: "01",
          title: "On your accounts",
          desc: "Everything is set up on your own access, tools, and data.",
        },
        {
          no: "02",
          title: "Everything is documented",
          desc: "Every automation is clearly documented, nothing depends on our memory.",
        },
        {
          no: "03",
          title: "We hand you the keys",
          desc: "Access, code, docs: all transferred to you. We host for convenience, not lock-in.",
        },
        {
          no: "04",
          title: "100% yours",
          desc: "You can take everything and keep it running, with or without us.",
        },
      ],
    },
    pricing: {
      titleLine1: "What does it cost?",
      titleLine2: "It starts with a free consultation.",
      lead: "No price list: every project is quoted on your reality. We map the need; you leave with a plan and a detailed quote within 48 hours. No commitment.",
      consultEyebrow: "Free consultation · no commitment",
      consultTitle: "What you get",
      consultItems: [
        "A clear, prioritized action plan",
        "Concrete recommendations",
        "A detailed quote within 48 hours",
      ],
      consultCta: "Book my consultation →",
      factorsHeading: "What changes your quote",
      factorsNote:
        "Good news: the more you already have in place, the simpler and cheaper the project.",
      factors: [
        "Tools & subscriptions required",
        "Size of your business",
        "Volume of data to process",
        "AI usage (tokens & model)",
        "Level of customization",
        "Content already in place",
      ],
      payment: [
        {
          no: "01",
          title: "Flexible payment",
          desc: "Staged payments by project.",
        },
        {
          no: "02",
          title: "Subscriptions paid direct",
          desc: "On your accounts, no hidden markup.",
        },
        {
          no: "03",
          title: "Support optional",
          desc: "Only if you want it.",
        },
      ],
    },
    journal: {
      title: "The Journal",
      allArticles: "All articles →",
    },
  },
  founder: {
    name: "Christopher",
    role: "Automation specialist",
    region: "Lanaudière",
    note: "Hi, I'm Christopher. I've always loved finding ways to do more with less effort. Today I help local businesses win their hours back by automating the grunt work. Write to me: I'm the one who answers.",
    consultLine: "Your consultation is with me.",
    photoAlt: "Christopher, automation specialist at Workflow Wonder",
  },
  contact: {
    eyebrow: "Free consultation · no commitment",
    title: "Tell us about your project.",
    lead: "We reply within 48 hours with a first path and a quote. No commitment.",
    emailPrompt: "Prefer email?",
    form: {
      firstName: "First name",
      firstNameOptional: "optional",
      lastName: "Last name",
      lastNameOptional: "optional",
      company: "Company name",
      email: "Email address",
      message: "Your project in a few words",
      messageOptional: "optional",
      consent:
        "I agree that Workflow Wonder may keep my contact details to process my request, in accordance with its",
      consentLinkLabel: "privacy policy",
      submit: "Send my request",
      submitting: "Sending…",
      successTitle: "Message received, thank you!",
      successBody: "We’ve sent a confirmation email. We’ll get back to you within 48 hours.",
      errorGeneric: "Something went wrong. Try again or email us directly.",
    },
  },
  journalIndex: {
    eyebrow: "The Journal",
    title: "Ideas, data, and tactics.",
    lead: "Practical analysis for Québec SMEs that want to automate, save time, and grow.",
    read: "Read →",
    featured: "Featured",
    readingSuffix: " read",
    toc: "Contents",
    readNext: "Read next",
    sources: "Sources",
  },
  services: {
    automatisation: {
      metaTitle: "Workflow automation",
      metaDescription:
        "Rule-based workflows for Québec entrepreneurs. Free consultation.",
      eyebrow: "Workflow automation",
      live: "7 scenarios · one client journey",
      h1Before: "Workflows that trigger and hand off the ",
      h1Accent: "baton",
      h1After: ".",
      lead: "100% rules. An event starts a sequence. No AI: your logic, executed exactly.",
      pill: "From first lead to Google review. ",
      pillMuted: "each scenario can hand off to the next.",
      legend: ["Trigger · action", "Condition · rule", "Handoff to another scenario", "No AI · 100% rules"],
      ctaLabel: "Custom",
      ctaTitle: "Don’t see your workflow? We’ll build it.",
      ctaDescription:
        "These are examples. Every automation is built around your tools, rules, and reality.",
      ctaButton: "Free consultation",
    },
    agentsIa: {
      metaTitle: "AI agents & assistants",
      metaDescription:
        "AI agents that understand, decide, and act for your business. Free consultation.",
      eyebrow: "AI agents & assistants",
      live: "agent live",
      h1Before: "An agent that understands, ",
      h1Accent: "decides",
      h1After: ", and acts.",
      lead: "Watch it work: every scenario plays out live.",
      legend: ["Senses input", "Reasons & picks the tool", "Acts & replies"],
      ctaLabel: "Custom",
      ctaTitle: "An agent tuned to your business, not a generic chatbot.",
      ctaDescription:
        "We design the agent around your craft, data, tools, and voice.",
      ctaButton: "Free consultation",
    },
    sitesBoutiques: {
      metaTitle: "Websites & online stores",
      metaDescription: "Sites and stores built to convert. Free consultation.",
      eyebrow: "Websites & online stores",
      h1Before: "A website that works your ",
      h1Accent: "pipeline",
      h1After: ".",
      lead: "From landing page to store: clear, fast, built to convert.",
      nicheEyebrow: "Demos · prototypes",
      nicheHint: "Tap a niche to explore",
      nicheTitle: "What we can build for you.",
      nicheLead:
        "Ideas by sector. Your project doesn’t have to fit a box. Explore and imagine yours.",
      nicheDemo: "See the demo",
      nichePreview: "Prototype preview",
      nicheComingSoon: "Image coming soon",
      ctaLabel: "Custom",
      ctaTitle: "Let’s talk about your project.",
      ctaDescription:
        "Describe yours. We’ll come back with a concrete first path within 48 hours.",
      ctaButton: "Free consultation",
    },
  },
  realisations: {
    metaTitle: "Work",
    metaDescription:
      "Websites, automations, and AI agents delivered by Workflow Wonder for Québec entrepreneurs.",
    eyebrow: "Work",
    title: "Real, and live.",
    lead: "No mockups: sites and systems actually in service. Every delivered project lands here.",
    visitLabel: "Visit",
    works: [
      {
        tag: "Landing page · Integrated booking",
        client: "Éliane Larre — personal trainer, Montréal",
        title: "elianelarre.com",
        desc: "Complete landing page: approach, coaching pillars, testimonials, FAQ, and a 5-step client journey, with integrated discovery-call booking and intake questionnaire.",
        url: "https://elianelarre.com",
        urlLabel: "Visit elianelarre.com",
      },
    ],
    upcomingNote: "More projects are on the way. This page grows with every delivery.",
    ctaLabel: "Your project",
    ctaTitle: "The next project here could be yours.",
    ctaDescription:
      "Tell us about your reality: we reply within 48 hours with a first path and a quote.",
    ctaButton: "Free consultation",
  },
  splash: {
    ariaLabel: "Workflow Wonder introduction",
    choose: "Choose your language · Choisissez votre langue",
  },
  cookies: {
    iconAriaLabel: "Cookie with a bite taken out, symbol for cookie preferences",
    banner: {
      title: "We respect your privacy.",
      body: "We only use the cookies needed to run the site. Nothing else without your say-so.",
      acceptAll: "Accept all",
      rejectNonEssential: "Decline",
      managePreferences: "Customize",
      privacyLinkLabel: "Privacy policy",
    },
    modal: {
      title: "Cookie preferences",
      intro:
        "Here's what we use, and why. Essential cookies can't be turned off.",
      alwaysOn: "Always on",
      saveButton: "Save my preferences",
      acceptAllButton: "Accept all",
      rejectAllButton: "Reject non-essential",
      closeLabel: "Close",
      updatedLabel: "Choice saved on",
      privacyLinkLabel: "See the full privacy policy",
    },
    categories: [
      {
        id: "necessary",
        title: "Essential",
        description:
          "Required for the site to work properly. Set by us, never by third parties.",
        entries: [
          {
            label: "Your cookie choice",
            purpose: "Remembers the decision you make here, so we don't ask again on every visit.",
            duration: "12 months",
          },
          {
            label: "Intro animation",
            purpose: "Remembers you've already seen the welcome animation, so it doesn't replay.",
            duration: "Your visit",
          },
        ],
      },
      {
        id: "analytics",
        title: "Analytics",
        description:
          "Would help us understand how the site is used, anonymously and in aggregate. Off by default.",
        emptyNote:
          "No analytics tool is active right now. If we add one, it will show up here and stay off without your say-so.",
        entries: [],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "July 19, 2026",
    intro:
      "Workflow Wonder (“we”) is committed to protecting the personal information you share with us. This policy explains what information we collect, why, how it's handled, and what your rights are, in accordance with Québec's **Law 25** (An Act to modernize legislative provisions as regards the protection of personal information).",
    sections: [
      {
        heading: "Person in charge of personal information protection",
        blocks: [
          {
            type: "p",
            text: "Any question about your personal information or this policy can be addressed to our person in charge of the protection of personal information at {{email}}.",
          },
        ],
      },
      {
        heading: "Information we collect",
        blocks: [
          {
            type: "p",
            text: "When you fill out our contact form, we collect only the information needed to process your request:",
          },
          {
            type: "list",
            items: [
              "**Company name** (required)",
              "**Email address** (required)",
              "**First and last name** (optional)",
              "**The message** you choose to send us (optional)",
            ],
          },
          {
            type: "p",
            text: "We apply the principle of data minimization: we only ask for what's strictly necessary to respond to you.",
          },
        ],
      },
      {
        heading: "Purposes of collection",
        blocks: [
          { type: "p", text: "Your information is used exclusively to:" },
          {
            type: "list",
            items: [
              "Send you a confirmation email that we've received your request;",
              "Communicate with you and respond to your request;",
              "Prepare a proposal or quote, where applicable.",
            ],
          },
          {
            type: "p",
            text: "We do not use your information for marketing purposes without your separate, explicit consent, and we never sell or rent it to third parties.",
          },
        ],
      },
      {
        heading: "Consent",
        blocks: [
          {
            type: "p",
            text: "By checking the consent box and submitting the form, you consent to us collecting and retaining your information for the purposes described above. You can withdraw your consent at any time by writing to us at {{email}}.",
          },
        ],
      },
      {
        heading: "Disclosure to third parties and hosting",
        blocks: [
          {
            type: "p",
            text: "Processing your request relies on an automation provider, **n8n**, whose cloud infrastructure is located in the **European Union (Germany)**. That jurisdiction is governed by the General Data Protection Regulation (GDPR), which offers protection comparable to what Law 25 requires. We make no other transfer of your information beyond what these purposes require.",
          },
        ],
      },
      {
        heading: "Retention period",
        blocks: [
          {
            type: "p",
            text: "We keep your information only as long as needed to fulfill these purposes, for a maximum of **12 months** from your last communication with us, after which it is securely deleted, unless an established business relationship justifies additional retention.",
          },
        ],
      },
      {
        heading: "Your rights",
        blocks: [
          { type: "p", text: "In accordance with Law 25, you have the right to:" },
          {
            type: "list",
            items: [
              "Access the personal information we hold about you;",
              "Request its correction if it is inaccurate or incomplete;",
              "Withdraw your consent and request its deletion;",
              "File a complaint with the Commission d'accès à l'information (CAI).",
            ],
          },
          {
            type: "p",
            text: "To exercise any of these rights, write to us at {{email}}. We will respond within the timeframes required by law (at most 30 days).",
          },
        ],
      },
      {
        heading: "Security",
        blocks: [
          {
            type: "p",
            text: "Data transmissions are made over encrypted (HTTPS) connections. We maintain reasonable security measures to protect your information against loss, unauthorized access, or disclosure. In the event of a privacy incident presenting a risk of serious harm, we will notify the CAI and the affected individuals, as required by law.",
          },
        ],
      },
      {
        heading: "Cookies and similar technologies",
        showCookieTable: true,
        blocks: [
          {
            type: "p",
            text: "A banner lets you make a choice the first time you visit. You can change it at any time via the **Manage cookies** link at the bottom of every page.",
          },
          {
            type: "p",
            text: "Strictly necessary cookies: always on, they keep the site working (for example, remembering your consent choice) and don't require your consent, in accordance with Law 25.",
          },
          {
            type: "p",
            text: "Analytics cookies: optional and off by default. No analytics tool is active on the site right now; if we add one, it will only run after your explicit consent, and this section will be updated accordingly.",
          },
          { type: "p", text: "In plain terms, here's what the site uses:" },
        ],
      },
      {
        heading: "Changes",
        blocks: [
          {
            type: "p",
            text: "This policy may be updated. The last-updated date is shown at the top of the page. We invite you to review it periodically.",
          },
        ],
      },
    ],
  },
};
