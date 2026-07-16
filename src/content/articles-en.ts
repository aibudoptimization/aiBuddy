import type { Article, ArticleBlock } from "./articles";

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
  cat: "Automation",
  motif: "flow",
  accent: "#4bfac8",
  title: "Automation and AI for lead generation: who benefits the most?",
  dek: "The trap of doing everything by hand, and how automation generates leads even while you sleep.",
  date: "March 12, 2026",
  read: "5 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "You have traction. Your clients speak well of you. Inquiries come in, but between answering emails, preparing quotes, delivering projects, and following up with prospects, the day is over before it even began.",
    ),
    p(
      "That is what we call the trap of doing everything by hand. And that is exactly where automation and artificial intelligence change the game.",
    ),
    h2("What is an automated workflow, concretely?"),
    p(
      "An automated workflow is a sequence of actions triggered without human intervention. Someone fills out a form on your site → they automatically receive a personalized welcome email → their name is added to your CRM → you get an alert to follow up at the right moment.",
    ),
    pull("No copy-paste. No open tabs. No forgotten follow-ups."),
    p(
      "Combined with AI, this logic becomes even more powerful: the system does not just pass information along, it analyzes it, sorts it, prioritizes it, and personalizes responses based on each prospect's profile.",
    ),
    h2("How automation generates leads even while you sleep"),
    h3("1. Automatic capture and qualification"),
    p(
      "A smart contact form can ask the right questions and, in a few seconds, qualify a prospect: are they ready to buy? What is their budget? What problem are they trying to solve? That data feeds directly into your CRM, without you lifting a finger.",
    ),
    h3("2. Effortless nurturing"),
    p(
      "Most prospects are not ready to buy the first time around. Automation keeps the relationship going, by email, SMS, or social media, in a consistent and personalized way, until they take action. A well-designed sequence can run for months, 24/7.",
    ),
    h3("3. Systematic follow-up"),
    p(
      "How many leads have you lost because you forgot to call someone back? Automation eliminates that risk. Reminders, follow-ups, and proposals go out at exactly the right time, with no effort on your part.",
    ),
    h3("4. Personalization at scale"),
    p(
      "AI can analyze your visitors' behavior (pages viewed, time spent, actions taken) and adapt messages accordingly. A prospect who views a product page receives different content from someone who downloads a guide or requests a quote.",
    ),
    h2("The numbers speak for themselves"),
    p("Recent data confirms what our clients experience on the ground:"),
    stats([
      {
        value: "91 %",
        label: "of SMBs using AI report an increase in revenue",
        source: "Salesforce, 2025",
      },
      {
        value: "+83 %",
        label: "growing companies are more likely to have adopted AI",
        source: "McKinsey",
      },
      {
        value: "250 %",
        label: "average ROI of AI automation over 18 months",
        source: "Click Vision",
      },
      {
        value: "39 → 55 %",
        label: "AI adoption among small businesses, from 2024 to 2025",
        source: "USM Systems",
      },
    ]),
    p("Not acting now means letting your competitors pull ahead."),
    h2("Who benefits the most from automation and AI?"),
    p(
      "Automation is not reserved for large companies with IT teams. In fact, it is often the opposite: smaller organizations have the most to gain.",
    ),
    h3("The solopreneur or independent professional"),
    p(
      "When you are alone doing everything, selling, delivering, invoicing, communicating, automation acts as a virtual right hand. It frees up hours every week so you can focus on what you do best.",
    ),
    h3("The small team of 2 to 10 people"),
    p(
      "At this stage, the challenge is not finding clients: it is handling the volume without hiring nonstop. Automation lets you scale operations without necessarily growing your payroll.",
    ),
    h3("The business with traction but few systems"),
    p(
      "You generate revenue, but everything depends on you. Processes live in your head. Automation turns that implicit know-how into repeatable systems, and you get out of the bottleneck.",
    ),
    h3("The sectors that benefit the most"),
    ul([
      {
        lead: "Professional services",
        text: " (consultants, accountants, coaches, lawyers): client follow-up, appointment booking, reminders.",
      },
      {
        lead: "Retail and e-commerce",
        text: " : cart abandonment, loyalty, inventory management.",
      },
      {
        lead: "Agencies and creative studios",
        text: " : client onboarding, project management, invoicing.",
      },
      {
        lead: "Real estate and brokerage",
        text: " : lead qualification, prospect follow-up, automatic reminders.",
      },
      {
        lead: "Restaurants and hospitality",
        text: " : reservations, loyalty, review management.",
      },
    ]),
    h2("Where to start?"),
    p(
      "Good news: you do not need to automate everything at once. Start by identifying the process that costs you the most time or creates the most forgotten steps. Often, it is:",
    ),
    ul([
      { text: "Responding to new contact requests." },
      { text: "Follow-up after a quote." },
      { text: "Invoicing and payment reminders." },
    ]),
    p(
      "A single well-designed workflow can reclaim hours every week, and revenue that was slipping away without you knowing it.",
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
  cat: "AI Agents",
  motif: "aurora",
  accent: "#8b7cff",
  title: "24/7 support: the competitive advantage your competitors do not have",
  dek: "Why an always-on assistant captures the leads you lose every evening.",
  date: "February 4, 2026",
  read: "5 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "It is 10:47 p.m. A potential client just visited your site. They have a simple question about your pricing. They just want confirmation before clicking \"Send a request.\"",
    ),
    p("But there is no one there. So they close the tab."),
    p(
      "The next morning, when you get to the office, that lead no longer exists. They found an answer elsewhere.",
    ),
    p(
      "This scenario repeats every evening, every weekend, every holiday, for every business without support outside office hours. And the silent cost of those missed opportunities piles up much faster than people think.",
    ),
    h2("The problem with business hours in an always-on economy"),
    p(
      "Your clients do not keep business hours. They check their phone in the evening, shop on Sunday, and compare providers during lunch. Buying behavior has changed, but many small businesses still offer a service that stops at 5 p.m.",
    ),
    p(
      "The result: you lose clients not because you offer bad service, but because you simply were not there at the right moment.",
    ),
    h2("What 24/7 support changes in practice"),
    h3("You capture the leads you would otherwise lose"),
    p(
      "A well-configured virtual assistant can answer common questions, qualify prospects, book appointments, and collect contact details at any hour. This is not a simple chatbot that replies \"I do not understand your question.\" It is an intelligent system that guides the visitor toward the right action at the right time.",
    ),
    h3("You reduce friction in the buying journey"),
    p(
      "One of the main reasons a prospect drops off? They have a question and no one to answer it. Always-available support removes that friction. The answer arrives immediately, trust builds, and conversion follows.",
    ),
    h3("You free your team from repetitive questions"),
    p(
      "How many times a week do you answer the same questions? \"What are your timelines?\", \"Do you accept credit cards?\", \"Do you serve my area?\" These questions all have known answers. An automated system handles them for you, and your team focuses on high-value conversations.",
    ),
    h3("You improve the overall customer experience"),
    p(
      "A client who gets an answer in 2 minutes at 11 p.m. does not forget it. That is the kind of detail that generates 5-star reviews, referrals, and loyalty. Customer experience is the sum of every interaction, even the smallest ones.",
    ),
    h2("The numbers that should convince you"),
    p("This is not anecdotal. The data is clear:"),
    stats([
      {
        value: "74 %",
        label: "of companies cite 24/7 availability as the main reason to adopt an AI chatbot",
        source: "Chatmaxima, 2026",
      },
      {
        value: "92 %",
        label: "report improved customer satisfaction after a virtual assistant",
        source: "Master of Code",
      },
      {
        value: "6 h → 4 min",
        label: "average response time, thanks to AI support",
        source: "Freshworks",
      },
      {
        value: "11 → 2 min",
        label: "Klarna reduced its average resolution time with AI",
        source: "Klarna",
      },
      {
        value: "3,50 $",
        label: "returned for every dollar invested in AI support",
        source: "Fullview",
      },
    ]),
    p(
      "For a small business, these gains are not marginal. They can mean dozens of recovered leads per month, and thousands of dollars in additional revenue.",
    ),
    h2("But does it replace human contact?"),
    p("No, and that is precisely why it works so well."),
    p(
      "The goal of automated support is not to replace your human conversations. It is to prepare them. The system qualifies, informs, and filters. When you or your team step in, the prospect is already informed, engaged, and often ready to decide.",
    ),
    pull("You spend less time explaining the basics, and more time closing sales."),
    h2("What it looks like in practice"),
    p("Here are a few concrete examples of what 24/7 support can do for a Quebec SMB:"),
    ul([
      {
        lead: "For a consultant or coach",
        text: " : answer questions about your services, offer consultation slots, and automatically send your brochure or portfolio.",
      },
      {
        lead: "For a local business",
        text: " : share hours, available products, and promotions, and redirect to your online store.",
      },
      {
        lead: "For an agency or studio",
        text: " : qualify new inquiries by project type, budget, and timeline, before you even read the email.",
      },
      {
        lead: "For a service provider",
        text: " : handle quote requests, confirm appointments, send reminders, and reduce no-shows.",
      },
    ]),
    h2("The competition is sleeping. You are not."),
    p(
      "24/7 support is no longer a luxury reserved for big brands. The tools exist today to implement it in any SMB, at an accessible cost, in a few weeks.",
    ),
    p(
      "The question is no longer \"is this for me?\" It is \"how many leads am I losing every week because I have not done this yet?\"",
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
  cat: "Visibility",
  motif: "grid",
  accent: "#6aa8ff",
  title: "Your website, SEO, GEO, and AEO: the invisible foundation of your growth",
  dek: "Three layers of one visibility strategy, from Google results to ChatGPT answers.",
  date: "January 21, 2026",
  read: "7 min",
  author: "Workflow Wonder",
  blocks: [
    p(
      "In 2026, if someone is looking for your services and cannot find you online, you do not exist, no matter how good you are at what you do.",
    ),
    p(
      "That is a hard truth for many Quebec entrepreneurs who built their reputation on word of mouth. Those channels still work. But on their own, they are no longer enough to support real growth.",
    ),
    p(
      "Your digital presence, starting with your website, is now your most powerful business development tool. And with the rise of AI in online search, the rules of the game have changed.",
    ),
    h2("A professional website: much more than an online business card"),
    p(
      "Too often, entrepreneurs see their site as an obligation, a place to put their phone number and a few photos. In reality, a well-designed site is a salesperson that works for you 24/7, with no breaks and no days off.",
    ),
    h3("Credibility first"),
    stats([
      {
        value: "81 %",
        label: "of consumers research online before making a purchase",
        source: "Marketing LTB, 2026",
      },
    ]),
    p(
      "If your site is missing, poorly designed, or outdated, the decision is made before you even get a chance to speak with the prospect. A professional site does not make you credible: it confirms a credibility you already deserve.",
    ),
    h3("Your best conversion tool"),
    p(
      "Among all available digital tools, social media, Google Maps, directories, the website is the one SMBs identify as the most useful, far ahead of Facebook and Google Business. Why? Because it is the only space you fully control: your message, your brand image, your offers, your calls to action.",
    ),
    h3("A presence that works even without you"),
    p(
      "Combined with automation tools, your site can capture leads, answer questions, send proposals, and book appointments, even when you are in a meeting, on vacation, or asleep.",
    ),
    h2("SEO: being found before your competitors"),
    p(
      "Search engine optimization (SEO) covers the strategies that help your site appear in the top Google results when a potential client searches for what you offer. Someone types \"accountant in Quebec City\" or \"event caterer Montreal\": do you appear, or does your competitor?",
    ),
    p("SEO rests on three fundamental pillars:"),
    steps([
      {
        n: "1",
        lead: "Relevant content",
        text: " : blog articles, service pages, case studies, content that answers your clients' real questions.",
      },
      {
        n: "2",
        lead: "Site authority",
        text: " : links from other recognized sites that validate your expertise in Google's eyes.",
      },
      {
        n: "3",
        lead: "Technical performance",
        text: " : a site that is fast, secure, mobile-friendly, and well structured for proper indexing.",
      },
    ]),
    p(
      "SEO takes time. It is a medium- and long-term investment. But unlike paid advertising, organic results do not disappear when you stop paying.",
    ),
    h2("GEO: being cited by AI"),
    p(
      "Here is the big shift of 2025-2026: your clients are no longer searching only on Google. They ask questions directly to ChatGPT, Claude, Perplexity, or Gemini, and these tools answer by citing sources.",
    ),
    p(
      "GEO (Generative Engine Optimization) is the art of optimizing your content so large language models cite you as a reliable source. Concretely: if someone asks ChatGPT \"Which web agency do you recommend for SMBs in Quebec?\", does your name appear in the answer?",
    ),
    stats([
      {
        value: "31,3 %",
        label: "of the U.S. population will use generative AI search in 2026",
        source: "eMarketer",
      },
    ]),
    p("To be visible there, your content must:"),
    ul([
      { text: "Be clearly structured (headings, subheadings, lists, precise data)." },
      { text: "Cite recognized and verifiable sources." },
      { text: "Answer the questions your clients actually ask." },
      { text: "Demonstrate real expertise in your field." },
    ]),
    p(
      "GEO does not replace SEO, it complements it. The companies best positioned in AI answers are those that already have solid SEO content.",
    ),
    h2("AEO: owning instant answers"),
    p(
      "AEO (Answer Engine Optimization) helps you appear in Google's quick-answer boxes, featured snippets, and AI Overviews that now show up at the top of most searches.",
    ),
    stats([
      {
        value: "~50 %",
        label: "of Google searches now display an AI Overview at the top of the page",
        source: "Jasper AI, 2026",
      },
    ]),
    p(
      "AEO means structuring your content to answer your clients' questions precisely, in a format Google and AI engines can extract and highlight. Examples of questions you should answer on your site:",
    ),
    ul([
      { text: "\"How much does a residential move cost in Quebec City?\"" },
      { text: "\"What is the best restaurant for a business dinner in Montreal?\"" },
      { text: "\"What are your timelines for appliance repair?\"" },
    ]),
    p(
      "If you answer these questions better than your competitors, you are the one who appears. As simple, and as strategic, as that.",
    ),
    h2("SEO + GEO + AEO: three layers, one strategy"),
    p(
      "These three approaches are not separate options. They are three layers of the same online visibility strategy.",
    ),
    table(
      ["Strategy", "Goal", "Channel"],
      [
        ["SEO", "Appear in organic results", "Traditional search engines"],
        ["AEO", "Be cited in instant answers", "Google AI Overviews, voice search"],
        ["GEO", "Be cited by generative AI", "ChatGPT, Claude, Gemini, Perplexity"],
      ],
    ),
    p(
      "Well-made content can perform across all three channels at once. That is the competitive advantage of a smart content strategy.",
    ),
    h2("What this means for you, concretely"),
    p(
      "If you are a solopreneur or a small team in Quebec, here is what a strong web strategy can do:",
    ),
    ul([
      {
        lead: "Generate qualified leads passively",
        text: ", people who find you because they have a real need.",
      },
      {
        lead: "Build your authority",
        text: " in your sector, even against larger competitors.",
      },
      {
        lead: "Reduce your dependence",
        text: " on paid advertising and word of mouth alone.",
      },
      {
        lead: "Be visible in the AI ecosystem",
        text: ", where your clients of tomorrow will look for answers.",
      },
    ]),
    stats([
      {
        value: "228 000",
        label: "small businesses in Quebec; most have a site, few have a real strategy",
        source: "ISED, Government of Canada, 2025",
      },
    ]),
    sources([
      {
        text: "Key Small Business Statistics 2025, ISED Canada",
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

export const ARTICLES_EN: Record<string, Article> = {
  "generer-des-leads": ARTICLE_A,
  "support-24-7": ARTICLE_B,
  "seo-geo-aeo": ARTICLE_C,
};
