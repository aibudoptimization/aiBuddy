# Services Page Implementation Plan (`/services`)

**Status:** Planned  
**Tracking issue:** [#9](https://github.com/aibudoptimization/aiBuddy/issues/9)  
**Branch:** `feat/9-services-page-toggle`  
**Milestone:** `Milestone B - Rebrand`

---

## 1) Goal

Build a new `/services` page for wfwonder.com that matches existing site brand standards and delivers an **exclusive service toggle** UX:

- exactly two services are available,
- exactly one service panel is visible at any time,
- switching is JavaScript-driven on a single route,
- inactive content is fully removed from layout flow.

---

## 2) Requirements Mapping

### Core UX behavior

- Two service options only:
  - `Web Design & Development`
  - `Automated Workflows`
- Toggle/tab control appears prominently near top of content area.
- Active panel: visible (`display: block` or equivalent).
- Inactive panel: hidden (`display: none` or equivalent), no remnant layout space.
- No side-by-side presentation and no scroll-based service switching.

### Brand consistency

- Reuse/replicate existing site header and footer.
- Ensure header nav contains `Services` linking to `/services`.
- Match established color palette, typography, spacing, and component style.
- Active toggle/tab state uses primary accent color token from existing design system.

### Accessibility + motion

- Toggle buttons expose `aria-selected`.
- Panels use `role="tabpanel"` with valid `aria-labelledby` mappings.
- Add subtle panel entrance animation (fade/slide) aligned with current site motion style.
- Respect reduced-motion preferences if existing global styles include reduced-motion handling.

### Content placeholders

- Service body copy: `[Lorem ipsum placeholder text]`.
- Service imagery: neutral placeholder block labeled `Service image placeholder`.

---

## 3) Proposed File Touchpoints

Expected primary changes:

- `web/src/app/services/page.tsx` (new page route)
- Header/nav component(s) already used by current pages (ensure `Services` link exists and targets `/services`)
- Shared style tokens/utilities if needed for tab active state and subtle transitions

Optional supporting changes:

- Reusable service toggle/panel component file if page logic grows
- Minor footer/header refactor if needed to keep consistency without duplication

---

## 4) Implementation Steps

1. **Discovery and reuse**
   - Identify current header/footer source components used on existing pages.
   - Confirm nav link structure and add/update `Services -> /services` if missing.

2. **Route scaffolding**
   - Create `web/src/app/services/page.tsx`.
   - Compose page with shared header and footer wrappers consistent with current app architecture.

3. **Exclusive toggle UX**
   - Add a client-side stateful tab/toggle control for exactly two services.
   - Render one active panel and hide inactive panel with `display: none` (or equivalent).
   - Ensure no hidden panel occupies layout space.

4. **Service panel content placeholders**
   - Service 1 heading: `Web Design & Development`
   - Service 2 heading: `Automated Workflows`
   - Body copy: `[Lorem ipsum placeholder text]`
   - Image block placeholder text: `Service image placeholder`

5. **Brand styling alignment**
   - Apply existing typography, spacing, and card/button styles from site tokens/components.
   - Style active toggle state using the site's primary accent color.

6. **Animation**
   - Add subtle active panel transition (fade/slide).
   - Keep animation lightweight and aligned with existing motion language.

7. **Accessibility**
   - Add `aria-selected` to tab controls.
   - Add `role="tabpanel"` and matching `aria-labelledby`.
   - Verify keyboard interaction and focus visibility.

8. **Responsive QA**
   - Validate mobile and desktop layouts.
   - Ensure no horizontal overflow or panel clipping issues.

---

## 5) Acceptance Checklist (Issue #9 alignment)

- [ ] `/services` route is implemented and renders correctly.
- [ ] Header/footer match existing site components/style.
- [ ] Nav includes `Services` link to `/services`.
- [ ] Exactly two services are present.
- [ ] Only one service panel is visible at a time.
- [ ] Inactive panel is fully removed from layout flow.
- [ ] Switching is JS-driven without page reload/sub-route navigation.
- [ ] Active toggle uses primary accent color.
- [ ] Subtle entrance animation exists for active panel.
- [ ] Required ARIA roles/attributes are correctly wired.
- [ ] Body copy and imagery remain placeholders as requested.
- [ ] Mobile + desktop responsiveness verified.

---

## 6) Risks and Mitigations

- **Risk:** Header/nav is duplicated in multiple places and can drift.
  - **Mitigation:** Reuse existing shared components where possible; avoid one-off header markup.
- **Risk:** Hidden panel still affects layout through visibility-only styles.
  - **Mitigation:** Use `display: none` (or equivalent unmounted rendering path), then verify layout in both states.
- **Risk:** Animation conflicts with reduced-motion expectations.
  - **Mitigation:** Keep transition minimal and rely on existing reduced-motion handling patterns.

---

## 7) Definition of Done

- Issue `#9` acceptance criteria are all checked.
- Implementation merged via PR referencing `Closes #9`.
- Progress and completion comments posted in issue per `GITHUB_ISSUES_GUIDE.md`.
- Milestone status remains accurate (`Milestone B - Rebrand`).
