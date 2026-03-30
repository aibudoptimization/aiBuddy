# WorkflowWonder — Main page brand polish & motion plan

**Status:** Planning · **Next:** Create working branch, execute section-by-section PRs or commits, then mobile QA gate  
**Repo:** `aibuddywebsite`  
**Stack:** Next.js App Router (`web/src/app`), React 19, Tailwind v4, design tokens in `web/src/app/globals.css`  
**Brand alignment:** [REBRAND_IMPL_PLAN.md](./REBRAND_IMPL_PLAN.md) (WorkflowWonder, Option 3 primary mark, Option 1 compact fallback, mobile-first trust)

---

## A) Goal

Polish the **main landing page** with **smooth, subtle** motion and elevated brand presence—without hurting performance, readability, or accessibility. Work proceeds **one section at a time** from **header through footer**, with a **dedicated mobile QA pass** before the update is accepted.

---

## B) Page map (execution order)

Sections as composed in `web/src/app/page.tsx`:

| Order | Section        | Component path (approx.)              |
|------:|----------------|----------------------------------------|
| 1     | Header         | `web/src/components/sections/Header`   |
| 2     | Hero           | `web/src/components/sections/Hero`     |
| 3     | Trust strip    | `web/src/components/sections/TrustStrip` |
| 4     | Services       | `web/src/components/sections/Services` |
| 5     | Process        | `web/src/components/sections/Process`  |
| 6     | Differentiators| `web/src/components/sections/Differentiators` |
| 7     | FAQ            | `web/src/components/sections/Faq`      |
| 8     | CTA band       | `web/src/components/sections/CtaBand`  |
| 9     | Footer         | `web/src/components/sections/Footer`   |

Each section gets its own small, reviewable change set: motion tokens, entrance/scroll behavior (where appropriate), spacing rhythm, and brand asset usage—then a quick desktop smoke check before moving on.

---

## C) Brand-guided improvement themes

Apply these consistently with existing tokens (`--accent`, `--glow-1`, `--glow-2`, surfaces, borders) and [REBRAND_IMPL_PLAN.md](./REBRAND_IMPL_PLAN.md):

1. **Trust and clarity first** — Motion supports hierarchy (what to read next), never competes with copy or CTAs.
2. **WorkflowWonder marks** — Primary wordmark + path icon in hero/header/footer as layout allows; compact mark (`WFW`) where space is tight; verify legibility at 16px–32px contexts on mobile.
3. **Gold accent discipline** — Use `--accent` / `--accent-hover` for primary actions and key highlights; avoid rainbow or noisy effects that read as “generic SaaS.”
4. **Depth without clutter** — Soft gradients, border tokens, and restrained glow (`--glow-1`, `--glow-2`) for cards and hero backdrop; keep contrast WCAG-minded on `--background` / `--surface`.
5. **Typography rhythm** — Display font for headings (`font-display` / `h1–h3` in globals); body for UI; consistent tracking and line-height per section.
6. **Micro-interactions** — Short duration (e.g. ~150–300ms), ease-out or custom cubic-bezier; hover/focus states on links and buttons must remain obvious for keyboard users.
7. **Reduced motion** — Respect `prefers-reduced-motion: reduce` (already global in `globals.css`); no essential information only in animation; prefer CSS transitions + `opacity`/`transform` over heavy JS loops.

---

## D) Section-by-section checklist (build the plan this way)

Use as a living checklist during implementation; tick when merged for that section.

### 1. Header
- [ ] Sticky/header behavior polish (backdrop, border, shadow) if aligned with brand.
- [ ] Logo/mark: correct variant (light/dark), sizing at `360px` / `390px` / `412px`.
- [ ] Nav links: subtle hover/focus; optional gentle nav reveal on load (reduced-motion safe).
- [ ] Primary CTA (“Schedule audit” / header policy): visually consistent with accent tokens.

### 2. Hero
- [ ] Headline/subhead hierarchy and optional staggered fade/slide (CSS or small utility).
- [ ] Background: gradient or mesh using existing glow tokens—keep LCP-friendly (no huge videos unless already planned).
- [ ] Primary/secondary CTAs: hover, focus ring (`--ring`), touch targets on mobile.

### 3. Trust strip
- [ ] Logos/text: even spacing, optional low-amplitude scroll fade-in.
- [ ] Ensure partner/client marks do not flash or distract; static fallback is acceptable.

### 4. Services
- [ ] Card lift or border glow on hover (subtle); keyboard focus visible.
- [ ] Grid rhythm and section intro animation (optional, one-shot).

### 5. Process
- [ ] Step connectors or timeline: subtle motion on scroll (Intersection Observer or CSS only if possible).
- [ ] Numbers/icons aligned with brand gold, not competing colors.

### 6. Differentiators
- [ ] Iconography or bullets: consistent spacing; optional icon fade-in.
- [ ] Avoid parallax that harms readability on small screens.

### 7. FAQ
- [ ] Accordion expand/collapse: smooth height/opacity; `aria-expanded` unchanged for a11y.
- [ ] Focus management when opening items (if not already).

### 8. CTA band
- [ ] High-contrast band using surface/accent tokens; clear single primary action.
- [ ] Optional background shimmer or gradient—very subtle, performant.

### 9. Footer
- [ ] Mark + link columns: hover states, spacing, mobile stack order.
- [ ] Legal/social links: same focus/hover language as header.

---

## E) Mobile QA gate (required before accepting the update)

Run this **after all sections are integrated** on a **Preview/staging** build (e.g. Vercel preview). Do not accept the release until the gate passes.

### Devices / viewports
- [ ] **360px, 390px, 412px** widths (or real devices: small Android + iPhone class).
- [ ] **Safari iOS** and **Chrome Android** (or closest available).

### Functional
- [ ] Header: menu (if hamburger), scroll, no horizontal overflow.
- [ ] All primary CTAs tappable; no overlap with safe areas / notches where applicable.
- [ ] Cal / schedule flows still work if touched by CTA styling (header vs modal policy unchanged unless issue scope says otherwise).

### Motion & accessibility
- [ ] **Reduce motion** on OS: animations collapse to minimal; content remains readable.
- [ ] No layout shift from late-loading fonts/images beyond acceptable CLS budget.
- [ ] Focus visible on interactive elements while tabbing (external keyboard if possible).

### Brand
- [ ] WorkflowWonder mark readable; compact fallback where intended.
- [ ] Accent gold not muddy on OLED/sunlit conditions (spot check).

### Performance (lightweight)
- [ ] Lighthouse mobile (or similar): no major regression vs baseline on Performance/Best Practices (record scores in PR or issue comment).

Document results (pass/fail + screenshots or notes) in the **tracking issue** before merge to production.

---

## F) Suggested files to touch (expectation only)

- Section components under `web/src/components/sections/*`
- Shared UI: `web/src/components/brand/*`, shared primitives if motion is reused
- Global tokens / keyframes: `web/src/app/globals.css` (prefer shared utilities over one-off magic numbers)
- Assets: `web/public/brand/*` only if new variants are required

---

## G) Out of scope (unless issue expanded)

- Full rebrand copy rewrite beyond polish.
- New marketing pages or blog.
- Replacing Cal integration behavior (unless a separate issue).

---

## H) Definition of done

- [ ] All section checklists above addressed or explicitly deferred with issue comment.
- [ ] Mobile QA gate completed and recorded.
- [ ] `prefers-reduced-motion` verified.
- [ ] Tracking GitHub issue closed per [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md) after merge.
