export const homeContent = {
  brand: "WorkflowWonder",
  tagline: "Web design & automation for teams that outgrow brittle tools.",
  hero: {
    headline: "Design that converts. Automation that lasts.",
    sub:
      "We build premium digital experiences and connect your stack so your business runs calmer, faster, and with less manual work.",
  },
  trust: {
    title: "Trusted by operators who care about craft",
    items: ["Strategy-led delivery", "Documentation-first handoffs", "Senior-friendly collaboration"],
    comparison: {
      title: "Why teams choose a different kind of partner",
      subtitle:
        "Same budget window, different outcomes—clarity, ownership, and systems that survive the handoff.",
      otherLabel: "Typical project flow",
      usLabel: "WorkflowWonder",
      other: [
        "Scope that drifts as deadlines tighten",
        "Knowledge stuck in chats and one person’s head",
        "Launch day support, then radio silence",
      ],
      us: [
        "Written plan with milestones you can track",
        "Documentation-first so your team can operate it",
        "Senior-led collaboration without the theater",
      ],
    },
  },
  calculator: {
    title: "What manual glue work may be costing you",
    sub: "Indicative only—adjust the sliders to reflect your reality.",
    teamLabel: "People involved in repetitive workflows",
    hoursLabel: "Hours per person per week on manual steps",
    rateLabel: "Average loaded hourly cost",
    currency: "$",
    resultIntro: "Rough monthly time cost",
    reclaimLine:
      "Well-designed automation and clearer handoffs often reclaim a large share of this over time—not as magic, but as momentum.",
    footnote: "Not financial advice; for discussion on a call.",
  },
  services: {
    title: "Our Services",
    intro: "Two disciplines, one accountable partner—from first impression to repeatable workflows.",
    pillars: [
      {
        name: "Web design & development",
        points: [
          {
            title: "Easy-to-Use Visual Design",
            body: "We create websites that look great and feel natural to use. We map out exactly how a customer moves through your site to make sure they never get lost or frustrated. By focusing on clarity, we guarantee your visitors understand exactly what you offer the moment they arrive.",
          },
          {
            title: "Organized Building Blocks",
            body: "We build a master \"toolkit\" of digital parts for your brand. This ensures every page on your site looks and acts the same way. It's a smarter way to build because it prevents technical messes and makes it much faster (and cheaper) to add new features or make changes in the future.",
          },
          {
            title: "Launch, Visibility, and Growth",
            body: "We handle the technical side of your launch, focusing on SEO (getting found on search engines like Google), GEO (appearing in AI-powered search results), and AEO (being the top answer for voice assistants and AI chats). We make sure your site loads fast and stays healthy. Once live, we watch how people actually use the site and make improvements based on real data to ensure your business keeps growing.",
          },
        ],
      },
      {
        name: "Automated Workflows",
        description:
          "Stop letting repetitive tasks stall your growth and drain your team's creativity. We build intelligent, self-operating systems that bridge the gap between your apps, ensuring your business runs like clockwork even while you sleep.",
        points: [
          {
            title: "Agentic AI",
            body: "Go beyond simple triggers with smart systems that can analyze data and make informed decisions on your behalf. These autonomous agents handle complex problem-solving and task execution, acting as a tireless digital extension of your team.",
          },
          {
            title: "Custom Workflows",
            body: "Every business has a unique rhythm, so we build tailored pathways designed specifically for your internal logic. We map out your manual \"messy\" steps and turn them into a streamlined, private engine that fits your exact operational needs.",
          },
          {
            title: "Socials Automation",
            body: "Maintain a consistent online presence without spending all day behind a screen. From auto-posting content to intelligently responding to inquiries, we ensure your brand stays active and engaged across all platforms effortlessly.",
          },
        ],
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
    ctaLabel: "Get started",
    ctaSub:
      "Ready to map your next milestone? Start with a short audit—we’ll outline scope and sequencing.",
  },
  differentiators: {
    title: "Why WorkflowWonder",
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
    kicker: "FAQ",
    heading: "Frequently asked questions",
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
  footer: {
    rights: "All rights reserved.",
    ctaTitle: "Ready for calmer, clearer operations?",
    ctaSub:
      "Book a short audit or send a note—we’ll reply with practical next steps, not a generic pitch deck.",
    aboutLabel: "About us",
    pages: [
      { label: "Services", href: "/services" },
      { label: "Web design & development", href: "/services/web-design" },
      { label: "Automated workflows", href: "/services/automation" },
      { label: "Estimate", href: "#calculator" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "#" },
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
} as const;
