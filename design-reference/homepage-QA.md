# Homepage QA — `/`

**Status:** Signed off  
**Source of truth:** `design-reference/Workflow Wonder website.dc.html`  
**Build target:** `src/components/home/*`, `src/app/globals.css`, `src/components/canvas/HeroAmbient.tsx`  
**Rule:** Do not convert other pages until all items below are checked off.

---

## Sign-off checklist

| # | Section | Status |
|---|---------|--------|
| 1 | Hero — eyebrow bullet | ☑ |
| 2 | Hero — title accent word | ☑ |
| 3 | Page background — homepage (full-page canvas) | ☑ |
| 4 | Page background — other routes (hero-only canvas) | ☐ |
| 5 | Services — no card hover fill | ☑ |

---

## 1. Hero — eyebrow bullet

**Priority:** P0  
**Status:** ☐ Open

### Expected
- The dot before "Automatisation IA" in the hero eyebrow is **teal** (`#4bfac8` / `var(--teal)`), with teal glow.

### Current (wrong)
- Uses `ww-glow-dot--iris` → purple/iris dot.

### Where to fix
- `src/components/home/HomeHero.tsx` — remove `ww-glow-dot--iris`, use default `ww-glow-dot` (teal).

### Design reference
```html
<!-- design-reference/Workflow Wonder website.dc.html ~line 47 -->
background:#4bfac8; box-shadow:0 0 12px rgba(75,250,200,0.8);
```

### Acceptance
- [ ] Eyebrow dot matches teal used elsewhere on homepage (e.g. fit/not-fit bullets).
- [ ] No iris/purple on hero eyebrow dot.

---

## 2. Hero — title accent word ("entreprise")

**Priority:** P0  
**Status:** ☐ Open

### Expected
- Keep the **shine / animated gradient** effect on "entreprise".
- Change gradient colors to **blue-teal** (not pure purple/iris).

### Current (wrong)
- Effect is correct; color reads as iris/purple.
- CSS: `linear-gradient(100deg, var(--iris), #c08bff, var(--iris))` in `.ww-gradient-word`.

### Where to fix
- `src/app/globals.css` — `.ww-gradient-word`

### Design reference (HTML export)
```html
<!-- ~line 99 — note: export uses iris, user wants blue-teal -->
linear-gradient(100deg,#8b7cff,#c08bff,#8b7cff)
```

### Clarification for implementer
> **User override:** If "blue-teal" differs from the HTML export, prefer the user's visual intent.  
> Suggested starting point: gradient between `--sky` (`#6aa8ff`) and `--teal` (`#4bfac8`), e.g.  
> `linear-gradient(100deg, #6aa8ff, #4bfac8, #6aa8ff)` — confirm with user if unsure.

### Acceptance
- [ ] Shine animation unchanged (6s linear infinite).
- [ ] Word reads as blue-teal, not purple.
- [ ] Readable on dark animated background at all viewport sizes.

---

## 3. Animated background — homepage (`/`)

**Priority:** P0 — architectural  
**Status:** ☐ Open

### Expected
- The **flow canvas + globe** (`HeroAmbient`) stays visible while scrolling the **entire homepage**.
- Sections and cards are **transparent or semi-transparent** so the animation shows through.
- Individual cards may use subtle fills (e.g. `rgba(255,255,255,0.02)`) — that's fine.
- **Footer is the exception:** remains opaque / blurred panel (`rgba(9,8,12,0.74)` + backdrop blur), blocking the canvas behind it.

### Current (wrong)
- Opaque black layers hide the canvas below the hero:
  - `.ww-page { background: var(--ink) }` on marketing layout
  - `.ww-section { background: var(--ink) }` on every homepage section
- Result: animation only visible in hero zone; rest of page looks flat black.

### Design reference behavior
- Sections have **no solid ink background** — only `position:relative; z-index:2; padding…`
- Service cards: `background:transparent` (no hover fill — see item 5)
- Carousel cards: `background:rgba(255,255,255,0.02)`
- Footer: `background:rgba(9,8,12,0.74)` + blur

### Where to fix (suggested approach)
- `src/app/globals.css` — remove or override `.ww-section` solid background **on homepage only**
- `src/app/(marketing)/layout.tsx` — homepage may need transparent page wrapper (not global for all routes)
- `src/components/home/HomePage.tsx` — ensure `HeroAmbient` spans full scroll height (fixed canvas already `position: fixed`)
- Audit each section component for inline `background: var(--ink)` or opaque fills

### Affected sections (verify each)
- [ ] Hero — transparent (already)
- [ ] Services (`HomeServicesSection`)
- [ ] Audience + carousel (`HomeAudienceSection`, `AudienceCarousel`)
- [ ] Tools (`HomeToolsSection`)
- [ ] Ownership (`HomeOwnershipSection`)
- [ ] Pricing (`HomePricingSection`)
- [ ] Journal preview (`HomeJournalSection`)
- [ ] Footer (`SiteFooter`) — **keep opaque**

### Acceptance
- [ ] Scroll full homepage: animated background visible between and behind sections.
- [ ] Cards remain readable (borders / subtle fills OK).
- [ ] Footer clearly "grounds" the page — canvas not visible through footer body.
- [ ] No performance regression from full-page fixed canvas.

---

## 4. Animated background — other pages (not homepage)

**Priority:** P1 — document now, implement when those pages are built  
**Status:** ☐ Open (policy)

### Expected
- **Service pages** (`/services/*`), **journal index** (`/journal`), **article pages** (`/journal/[slug]`):
  - Animated background visible **only in the page header / hero zone** (roughly first viewport).
  - Content below hero uses **solid ink** (`#07070b`) — no canvas bleed-through.

### Current
- Homepage `HeroAmbient` is homepage-only today.
- Service/blog shells don't yet have scoped ambient canvas — policy should be locked before converting those pages.

### Implementation note (for later)
- Reuse `HeroAmbient` with a **clipped / height-limited** wrapper (e.g. hero section only), not `position: fixed` full viewport.
- Or: fixed canvas + solid ink overlay below hero fold.

### Acceptance (when those pages are converted)
- [ ] Canvas animation in hero/header only.
- [ ] Body content on solid ink background.
- [ ] Footer opaque on all pages.

---

## 5. Services — no card hover fill

**Priority:** P1  
**Status:** ☑ Done

### Expected
- The four service cards in the homepage services grid have **no hover background** — no light wash on mouse over.

### Current (wrong)
- `.ww-service-card:hover` applies `background: var(--hover-fill)` (`rgba(255,255,255,0.03)`).

### Where to fix
- `src/app/globals.css` — remove `.ww-service-card:hover` background rule.

### Acceptance
- [x] Hovering any of the 4 service cards does not change card background.
- [x] Cards remain clickable links with no visual fill on hover.

---

## Global background architecture (reference)

| Surface | Homepage `/` | Service / Journal pages |
|---------|--------------|-------------------------|
| Canvas (flow + globe) | Full viewport, always visible | Hero/header zone only |
| Section wrappers | Transparent | N/A (solid ink below hero) |
| Cards | Semi-transparent OK | Per design |
| Footer | Opaque + blur | Opaque + blur |
| Page wrapper | Transparent over canvas | Solid ink below hero |

---

## Additional homepage items (add as you find them)

### [Section name] — [short title]

**Priority:** P1 / P2  
**Status:** ☐ Open

**Expected:**  
**Current (wrong):**  
**Where to fix:**  
**Acceptance:**
- [ ] …

---

## Known deferred items (not in this pass unless you add them)

- Tool strip SVG brand icons (text-only today)
- Per-service accent colors on homepage service cards
- Full footer parity (phone, social, legal links)
- Concept switcher (flow / aurora / grid)
- Pricing CTA arrow removal

---

## How to verify

1. Open `design-reference/Workflow Wonder website.dc.html` in browser (local file).
2. Run `npm run dev` → `http://localhost:3000`
3. Side-by-side or tab-switch compare:
   - Hero eyebrow dot color
   - "entreprise" gradient hue
   - Scroll homepage: canvas visible through sections, not through footer
4. Check mobile (~375px) for same three items.

---

## Changelog

| Date | Author | Notes |
|------|--------|-------|
| 2025-06-27 | User | Initial tweaks: eyebrow teal, entreprise blue-teal, full-page canvas on homepage |
| 2025-06-27 | User | Remove hover background on homepage service cards |
