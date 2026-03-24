# aiBuddy — Frontend Landing Page Implementation Plan

**Status:** Planning (no implementation yet)  
**Repo:** [https://github.com/aibudoptimization/aiBuddy.git](https://github.com/aibudoptimization/aiBuddy.git)  
**Deployment:** GitHub → Vercel  
**Stack:** React, Next.js  

**Process:** Follow [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md) — every significant slice of work gets a GitHub issue, milestone, branch, and PR before coding starts.

---

## 1. Purpose and success criteria

### What the site is for

- **Position aiBuddy** as a credible partner for **web design** and **automation** services.
- **Primary conversions:** visitors **schedule an audit** and **get in touch** (contact).
- **Tone:** professional, **premium, high-end** — calm confidence, not loud marketing.

### Definition of “done” for v1 frontend

- Single primary landing experience (homepage) that clearly explains offer, proof direction, and next steps.
- **Two prominent paths:** “Schedule an audit” and “Get in touch,” usable on desktop and mobile.
- Deployed on **Vercel** from **GitHub** with a clean default branch workflow.
- Performance and accessibility baselines met (see §7).
- Brand tokens (colors, type, spacing) live in code as **design tokens** so the visual system can evolve without a full rewrite.

---

## 2. Scope

### In scope (this plan)

- Next.js app scaffold, layout, homepage sections, responsive UI, basic SEO metadata, Vercel project wiring.
- **Lead capture UX:** CTAs, forms or deep links (Calendly, Tally, etc.) — exact backend TBD in §6.
- **Emergent brand system:** typography, color palette, spacing scale, component primitives — decided during build, documented in-repo (e.g. short `DESIGN_TOKENS` section in README or a minimal design doc — issue-driven).

### Explicitly out of scope for “frontend first” v1

- Full CMS, blog, case-study CMS, unless added via a new plan/issue.
- Custom auth, client portals, payments.
- Heavy animation libraries unless justified by a dedicated issue.

---

## 3. Information architecture (homepage)

Order is intentional: trust → clarity → action.

| Section | Role |
|--------|------|
| **Hero** | Name, one-line value prop (design + automation), primary CTA (audit), secondary (contact). |
| **Social proof strip** | Logos, metrics, or testimonial placeholders — can start with “as seen / trusted by” structure until real assets exist. |
| **Services** | Two pillars: **Web design** and **Automation** — outcomes, not jargon. |
| **Process / “How we work”** | Short steps that reduce friction for booking an audit. |
| **Differentiators** | Why aiBuddy vs. generic agency (to be refined in copy issues). |
| **FAQ (optional v1)** | 3–5 questions that objections to booking. |
| **Final CTA band** | Repeat audit + contact. |
| **Footer** | Legal links placeholder, contact, social placeholders. |

**Global:** Sticky or repeated **Schedule audit** affordance on scroll (mobile-friendly) — implement only if it passes an accessibility/contrast check in implementation issue.

---

## 4. Design direction (premium, no fixed brand yet)

Until formal brand assets exist, optimize for **systematic** premium feel:

- **Typography:** One distinctive display or high-quality sans for headings + highly readable body font (pairing chosen in a dedicated issue). Avoid default “AI slop” aesthetic; prefer restrained, editorial spacing.
- **Color:** Deep neutrals, one restrained accent, high contrast for text. Dark or light theme: pick one for v1; second theme can be a follow-up issue.
- **Layout:** Generous whitespace, clear grid, max-width content column, subtle borders or glass only if they stay performant.
- **Motion:** Minimal — respect `prefers-reduced-motion`.
- **Imagery:** Abstract gradients, geometric patterns, or tasteful stock/placeholder art via issue; no blocking dependency for first deploy.

Deliverable: **design tokens** (CSS variables or Tailwind theme) + **component primitives** (Button, Section, Container, typography scale) before building marketing sections.

---

## 5. Technical approach

### Framework

- **Next.js** (App Router recommended for new projects) + **React**.
- **TypeScript** recommended for maintainability (decision in scaffold issue).

### Styling (choose one path in first chore issue)

- **Tailwind CSS** (fast iteration, token-friendly) *or* **CSS Modules + design tokens** (more manual, very explicit). Default recommendation: Tailwind + a small set of semantic tokens.

### Content

- v1: **static copy in components** or a single `content/home.ts` module for easy edits without CMS.
- i18n: English first; structure code so strings are centralized if French or other locales appear later.

### SEO and sharing

- Metadata API: title, description, Open Graph, Twitter card placeholders.
- `robots.txt` / `sitemap.xml` as follow-up issues if not in v1.

### Repository and deployment

- Connect **GitHub** `aibudoptimization/aiBuddy` to **Vercel**.
- Environments: **Production** = default branch; **Preview** = PRs.
- Document in README: Node version, `pnpm`/`npm`/`yarn` choice, env vars (see §6).

---

## 6. Lead capture: schedule audit & get in touch

**Decision record (before building forms):**

| Option | Pros | Cons |
|--------|------|------|
| **Third-party booking** (Calendly, Cal.com, etc.) | Fast, reliable, no backend | Less on-brand until styled/embed |
| **Form → email** (Resend, Formspree, etc.) | Simple | Rate limits, spam handling |
| **API route + DB** | Full control | Backend scope; defer unless required |

**Plan:** Start with **external scheduling link** + **contact** via mailto or a lightweight form provider, wired through **environment variables** so production vs. preview stays safe. Upgrade path documented in a later issue.

---

## 7. Quality bar (acceptance themes for testing issues)

- **Accessibility:** Keyboard navigable CTAs, visible focus, semantic landmarks, heading order, color contrast (WCAG AA target).
- **Performance:** Reasonable LCP on Vercel (images optimized, `next/image`, no huge client bundles for static sections).
- **Responsive:** Breakpoints tested for small phone, tablet, desktop.
- **Cross-browser:** Latest Chrome, Safari, Firefox, Edge smoke test.

---

## 8. Suggested GitHub milestones and issues

Align milestones with [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md). Example structure:

### Milestone A — Foundation

| Suggested issue title | Notes |
|----------------------|--------|
| `[Chore] Bootstrap Next.js app and repo hygiene` | TypeScript, lint, format, README, `.env.example`, Vercel project link. |
| `[Design] Define design tokens and base UI primitives` | Colors, type scale, Button, Container, Section. |
| `[Chore] Configure Vercel deployment from GitHub` | Build command, env docs, preview deployments. |

### Milestone B — Landing page v1

| Suggested issue title | Notes |
|----------------------|--------|
| `[Homepage] Implement layout shell (header, footer, navigation)` | Mobile menu, focus management. |
| `[Homepage] Build hero with primary and secondary CTAs` | Copy placeholder OK; wire hrefs to env-based URLs. |
| `[Homepage] Add services and process sections` | Two-pillar narrative. |
| `[Homepage] Add proof, FAQ, and closing CTA sections` | Placeholder content allowed with TODO in issue if assets missing. |
| `[SEO] Add default metadata and social preview tags` | aiBuddy name, description, OG image placeholder. |
| `[UX] Responsive polish and accessibility pass` | Lighthouse/a11y checklist in acceptance criteria. |

### Milestone C — Launch hardening (optional split)

| Suggested issue title | Notes |
|----------------------|--------|
| `[Analytics] Add privacy-conscious analytics` | Only if product decision made (Plausible, Vercel Analytics, etc.). |
| `[Legal] Privacy policy and cookie notice placeholders` | If EU traffic or forms collect data. |

Each issue should include **acceptance criteria**, **labels**, **priority**, and **milestone** per the guide.

---

## 9. Execution order (recommended)

1. Clone/connect repo, scaffold Next.js, README + env template (**Milestone A**).
2. Tokens + primitives — visual direction locked enough to build sections (**Milestone A**).
3. Shell → Hero → body sections → footer (**Milestone B**).
4. SEO + responsive/a11y pass (**Milestone B**).
5. Vercel production deploy + domain (issue if custom domain).

---

## 10. Risks and open decisions

| Risk | Mitigation |
|------|------------|
| No brand yet causes rework | Tokens + centralized content; avoid hard-coding one-off colors everywhere. |
| Booking tool changes | All external URLs from env vars. |
| Scope creep (blog, CMS) | New plan file in `IMPLEMENTATION_PLANS/` + new milestone. |

**Open decisions to resolve in issues:** exact Next.js version, Tailwind vs. CSS Modules, scheduling provider, contact mechanism, single vs. dual theme for v1.

---

## 11. Suggestions and improvements

- **Name the default branch** `main` and protect it; require PRs for merges if working with collaborators.
- **Add a one-page `CONTRIBUTING.md`** later (issue) describing branch naming from the issues guide.
- **OG image:** generate a simple branded default in Figma or code when name/tagline stabilize — cheap win for shares.
- **“Schedule audit”** microcopy: A/B or iterate in content issues (“Book a 20-min audit” often outperforms vague “Schedule”).
- **Future plan files:** e.g. `BACKEND_LEADS_PLAN.md`, `BRAND_ASSETS_PLAN.md`, `CONTENT_COPY_PLAN.md` when those tracks start.

---

## 12. Related files

| File | Role |
|------|------|
| [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md) | Issue/PR/milestone discipline for every session. |
| [REPO_AND_VERCEL_SETUP_PLAN.md](./REPO_AND_VERCEL_SETUP_PLAN.md) | Git remote, branch protection, Vercel, env vars. |
| This file | Frontend landing scope, IA, milestones, and sequencing. |

When implementation starts, create or link the matching **GitHub issues** first, then branch per `feat/<issue>-slug` as in the guide.
