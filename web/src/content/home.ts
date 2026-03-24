export const homeContent = {
  brand: "aiBuddy",
  tagline: "Web design & automation for teams that outgrow brittle tools.",
  hero: {
    headline: "Design that converts. Automation that lasts.",
    sub:
      "We build premium digital experiences and connect your stack so your business runs calmer, faster, and with less manual work.",
  },
  trust: {
    title: "Trusted by operators who care about craft",
    items: ["Strategy-led delivery", "Documentation-first handoffs", "Senior-friendly collaboration"],
  },
  services: {
    title: "What we do",
    intro: "Two disciplines, one accountable partner—from first impression to repeatable workflows.",
    pillars: [
      {
        name: "Web design",
        description:
          "Brand-aligned sites and product marketing pages with editorial typography, resilient layout systems, and performance budgets baked in.",
        bullets: ["UX & visual design", "Design systems & components", "Launch & iteration"],
      },
      {
        name: "Automation",
        description:
          "Integrations, internal tools, and workflow design that remove copy-paste and keep data flowing where it should.",
        bullets: ["Process mapping", "APIs & no/low-code where fit", "Monitoring & handoff docs"],
      },
    ],
  },
  process: {
    title: "How we work",
    steps: [
      {
        title: "Discover",
        body: "We align on goals, constraints, and what “done” means for your audit.",
      },
      {
        title: "Shape",
        body: "A clear plan: scope, sequence, risks, and what you’ll have at each milestone.",
      },
      {
        title: "Build & ship",
        body: "Measured execution with visible progress—no black-box weeks.",
      },
      {
        title: "Hand off",
        body: "You get working systems plus the context your team needs to own them.",
      },
    ],
  },
  differentiators: {
    title: "Why aiBuddy",
    points: [
      {
        title: "Premium execution",
        body: "Restrained aesthetics, sharp typography, and interfaces that feel intentional—not template-driven.",
      },
      {
        title: "Business fluency",
        body: "We speak outcomes: leads, margin, time saved—not just tickets and widgets.",
      },
      {
        title: "Long-term clarity",
        body: "Automation and design decisions are documented so you’re not locked into one person’s head.",
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        q: "What happens on the audit call?",
        a: "We review your goals, current site or stack, and quick wins vs. deeper investments. You leave with a concise next-step recommendation—even if we’re not a fit.",
      },
      {
        q: "Do you work with existing tools?",
        a: "Yes. We’ll meet you where you are (CMS, CRM, data warehouse, SaaS APIs) and propose the smallest reliable integration path.",
      },
      {
        q: "Typical timelines?",
        a: "Landing experiences often move in weeks, not months. Automation depth depends on systems and governance; we’ll quote a phased plan after discovery.",
      },
      {
        q: "How do we get started?",
        a: "Book an audit or send a note with what you’re trying to fix. We reply with two or three concrete options.",
      },
    ],
  },
  cta: {
    title: "Ready when you are",
    sub: "Choose a time for an audit, or write us a short note—whichever fits your day.",
  },
  footer: {
    rights: "All rights reserved.",
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
} as const;
