# Workflow Wonder — Brand & Build Handoff

> Single source of truth for any agent building or extending the Workflow Wonder site. Pair with `design-reference/Brand Guidelines.dc.html`.

**Agency site:** No Sanity CMS for this project. Marketing copy is static in code for now.

## Routes

| Reference file | Route |
|---|---|
| `design-reference/Workflow Wonder website.dc.html` | `/` |
| `design-reference/Service Animation Workflow.dc.html` | `/services/automatisation` |
| `design-reference/Service Agents IA.dc.html` | `/services/agents-ia` |
| `design-reference/Service Sites Boutiques.dc.html` | `/services/sites-boutiques` |
| `design-reference/Blog Index.dc.html` | `/journal` |
| `design-reference/Article.dc.html` | `/journal/[slug]` |

## Stack (marketing v1)

- Next.js App Router at repo root (`./` on Vercel)
- React + TypeScript
- Plain CSS tokens in `src/app/globals.css` (no Tailwind)
- Schibsted Grotesk + JetBrains Mono via `next/font/google`
- lucide-react for icons
- Front-end only: no Cal, Supabase, or Sanity until requested

Full brand tokens, typography, voice, and motion rules are in the original handoff document and `Brand Guidelines.dc.html`.
