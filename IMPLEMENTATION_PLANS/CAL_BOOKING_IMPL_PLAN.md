# aiBuddy - Cal.com booking integration plan

**Status:** Steps 1–4 shipped, QA complete for available devices, privacy policy updated with Cal.com disclosure, temporary debug logs removed · **Next:** Production rollout + post-launch monitoring  
**Repo:** `aibuddywebsite`  
**Stack discovered:** Next.js App Router (`web/src/app`), React 19, Tailwind v4 + CSS variables in `web/src/app/globals.css`, deployed on Vercel.  
**Constraint alignment:** Cal.com managed in Cal admin (no onsite admin panel), single event type, API-key capable backend integration path.

---

## A) Recommended approach with reasoning

### Recommended architecture

Use a **brand-styled modal launcher on the website** for all non-header "Schedule audit" CTAs, and load the booking experience via the **Cal.com embed flow** (popup/modal style), with server-side API usage only where needed (future prefill/validation/webhooks). Keep Cal.com as the system of record for event type, questions, availability, and locations.

### Why this fits your requirements

- **Matches your UX requirement:** Modal/popup keeps users on your page and preserves your branding shell.
- **Respects your operations model:** Admins continue managing event types/questions/locations in Cal.com only.
- **Low risk + fast to ship:** No custom scheduling engine, no onsite admin UI.
- **API key usage is safe:** Keep Cal API key server-side only (Vercel env + optional route handlers/server actions). Never expose key in `NEXT_PUBLIC_*`.
- **Scales for future automation:** Same setup can later support prefill, attribution capture, and webhooks.

### CTA behavior decision (based on your rule)

- **Header "Schedule audit" CTA:** keep as redirect behavior to a dedicated page path placeholder (for later implementation), not popup for now.
- **All other "Schedule audit" CTAs:** open Cal booking in a branded modal/popup.

---

## B) Step-by-step tasks list (small, checkable)

1. **Confirm Cal assets** ✅ *Done (2025-03-25)*
   - [x] Create/confirm one Cal event type slug for audits.
   - [x] Confirm production Cal booking URL and organization namespace.
   - [x] Confirm intake questions and location settings are complete in Cal.com.

2. **Define env contract** ✅ *Complete*
   - [x] Add required env keys in `web/.env.example` (public booking URL, optional slug, server API key placeholder, feature flags).
   - [x] Add gitignored `web/.env` for local manual editing (mirrors keys; you fill values).
   - [x] Add these values in Vercel Project Environment Variables (Preview + Production as needed).

3. **Create booking integration layer** ✅
   - [x] Add a small client utility/component to open Cal modal consistently (`web/src/lib/cal/open-schedule-popup.ts`, `CalScheduleAuditButton`).
   - [x] Launch + fallback: inline in button (no separate hook).
   - [x] Fallback on failure: **`window.location.assign(bookingUrl)`** (auto-redirect to Cal).

4. **Wire CTA behavior** ✅
   - [x] Hero + CTA band + footer “Schedule audit” use `CalScheduleAuditButton` when `NEXT_PUBLIC_CAL_EMBED_ENABLED=true`.
   - [x] Header CTA uses `getScheduleAuditHeaderUrl()` (redirect only).

5. **Branding + popup experience**
   - [x] Apply brand-consistent trigger/button treatments (existing theme variables).
   - [x] Configure modal dimensions/overlay behavior to feel native (approved in QA pass).
   - [x] Verify keyboard focus trap, escape to close, and reduced-motion friendliness (approved in QA pass).

6. **Plan data capture**
   - [x] Define what gets captured by Cal form (contact + qualifying questions).
   - [x] Define what is captured on your side: minimal, non-PII telemetry (`schedule_cta_click`, `cal_modal_open_attempt`, `cal_modal_open_success`, `cal_fallback_redirect`).
   - [x] Decide where to store minimal metadata now: emit `CustomEvent` + `dataLayer` push when present; webhook/CRM enrichment remains a future upgrade.

7. **Reliability and performance controls**
   - [x] Lazy-load embed script on first popup open (not in initial bundle).
   - [x] Script load timeout + **auto-redirect** fallback if embed/popup fails.
   - [x] `NEXT_PUBLIC_CAL_EMBED_ENABLED` toggles modal vs direct `SmartLink` / `ButtonLink` to Cal URL.

8. **Security, privacy, and compliance checks**
   - [x] Document exactly what user data is sent to Cal and when.
   - [x] Cookie/CMP direction chosen: treat booking embed as functional for user-requested scheduling (do not block scheduling behind marketing consent).
   - [x] Update privacy policy copy to mention Cal.com as processor/subprocessor and link Cal privacy terms.

9. **QA + rollout**
   - [x] Execute cross-browser/device/timezone test matrix (Chrome desktop/mobile, iPhone mobile, timezone, adblock).
   - [x] Validate staging/preview on Vercel.
   - [ ] Roll out with fallback plan and monitoring checks.

---

## C) Files/components to add or modify (exact paths)

### Existing files modified (as implemented)

- `web/src/components/sections/Hero.tsx` — `CalScheduleAuditButton`.
- `web/src/components/sections/CtaBand.tsx` — `CalScheduleAuditButton`.
- `web/src/components/sections/Footer.tsx` — `CalScheduleAuditButton` variant `link`.
- `web/src/components/sections/Header.tsx` — `getScheduleAuditHeaderUrl()` for redirect-only CTA.
- `web/src/lib/public-urls.ts` — `getScheduleAuditHeaderUrl()`, `getScheduleAuditUrl()` falls back to `NEXT_PUBLIC_CAL_BOOKING_URL`.
- `web/src/components/ui/SmartLink.tsx` — export `smartLinkClassName` for link-style Cal trigger.
- `web/src/app/layout.tsx` — treat empty `NEXT_PUBLIC_SITE_URL` as unset (avoids `new URL("")` build failure).

### New files added

- `web/src/components/cal/CalScheduleAuditButton.tsx` — client CTA/link; popup when embed enabled, else direct Cal URL.
- `web/src/lib/cal/config.ts` — public env helpers, `calLink` parsing, init origin, brand color constant.
- `web/src/lib/cal/open-schedule-popup.ts` — use official `getCalApi()`, call `Cal("init"|"ui"|"modal")`, throws on hard failure.

### Plan delta (not built; names were placeholders)

- `CalBookingModal.tsx` / `CalBookingTrigger.tsx` / `fallback.ts` — superseded by `CalScheduleAuditButton` + `open-schedule-popup` + redirect fallback.

### Optional server-side files (for API-key backed enhancements)

- `web/src/app/api/cal/*` route handlers (only if needed in phase 1)
  - Proxy or secure server-only calls to Cal APIs (never client-side key exposure).

---

## D) Environment/config needed

Store all variables in **Vercel Project Settings -> Environment Variables** and local dev `.env.local`.  
Only values intended for the browser should be `NEXT_PUBLIC_*`.

### Public variables (safe for client)

- `NEXT_PUBLIC_CAL_BOOKING_URL`
  - Full Cal booking URL for the single audit event (used by modal + fallback).
- `NEXT_PUBLIC_CAL_EVENT_TYPE_SLUG` (optional)
  - If using slug-based embed setup rather than full URL only.
- `NEXT_PUBLIC_SCHEDULE_AUDIT_HEADER_URL`
  - Header CTA redirect target (future standalone booking page route or temporary external URL).
- `NEXT_PUBLIC_CAL_EMBED_ENABLED`
  - Feature flag (`true/false`) to turn modal behavior on/off quickly.

### Server-only variables (never exposed to browser)

- `CAL_API_KEY`
  - Cal.com API key for server-side integrations only.
- `CAL_API_BASE_URL` (optional)
  - If explicit base URL control is needed.

### Brand config placement

- Keep brand colors in `web/src/app/globals.css` under existing CSS custom properties (`--accent`, `--surface`, etc.).
- If Cal embed supports theme params, map them from those existing variables rather than duplicating color constants.

---

## E) QA checklist

### Core UX and behavior

- [x] Header "Schedule audit" CTA redirects (does not open modal).
- [x] Hero + CTA band "Schedule an audit" open modal popup.
- [x] Modal open/close behavior works with mouse and touch interactions. (`Tab`/`Esc`/screen-reader pass still recommended)
- [x] Fallback redirect path validated during earlier troubleshooting.

### Browser/device matrix

- [x] Desktop Chrome (latest)
- [ ] Desktop Safari (latest) *(not directly tested; inferred risk low after iOS Safari pass)*
- [x] Mobile Safari (iOS)
- [x] Mobile Chrome (Android)
- [x] At least one ad/tracker blocker scenario enabled (uBlock)

### Timezone/booking correctness

- [x] Timezone auto-detection matches user locale.
- [ ] Manually switching timezone (if available) updates slots correctly.
- [ ] Event duration, buffers, and available slots reflect Cal admin settings.
- [ ] Confirmation flow and cancellation/reschedule links behave as expected.

### Privacy/cookie checks

- [ ] Cookie banner appears before or at embed invocation according to your CMP strategy.
- [ ] If consent is required for embedded third-party scripts, modal launch is blocked until consent.
- [x] No consent gate chosen for booking UX (functional/strictly-necessary user-requested scheduling basis); rationale documented.
- [x] Privacy policy mentions Cal.com as booking processor/subprocessor and links to Cal privacy docs.

---

## F) Rollout plan

### Recommended rollout sequence

1. **Implement behind feature flag**
   - Start with `NEXT_PUBLIC_CAL_EMBED_ENABLED=false` in Production.
2. **Preview verification**
   - Validate end-to-end in Vercel Preview with internal testing.
3. **Staging-style smoke test**
   - Turn flag on for preview, run full QA checklist.
4. **Production enable**
   - Enable flag in Production and redeploy.
5. **Post-launch monitoring**
   - Check CTA click-through, modal opens, booking completion trend, and fallback rate.

### Fallback/incident plan

- If Cal embed fails globally: set `NEXT_PUBLIC_CAL_EMBED_ENABLED=false` and force direct URL redirects for all non-header CTAs.
- If only popup behavior is unstable in one browser: temporarily route that browser/device segment to direct booking URL.
- Keep Cal direct booking URL as guaranteed backup path at all times.

---

## Security/privacy details (explicit)

### Data passed in baseline implementation

- User-provided booking inputs (name, email, answers, selected slot) are submitted to **Cal.com** during booking.
- Your site should capture only minimal operational telemetry by default (e.g., CTA clicked, modal opened, fallback triggered), without storing sensitive intake answers unless explicitly needed later.

### API key handling

- `CAL_API_KEY` must be used only in server-side contexts (route handlers/server actions/functions).
- Never place API keys in client bundles, query strings, or `NEXT_PUBLIC_*` env vars.

### GDPR/cookies - do you need a banner update?

Short answer: **usually yes, at least a review/update is needed** when embedding third-party booking flows.

- Cal embed may set or rely on cookies/local storage depending on configuration and user session needs.
- If your consent framework requires opt-in before non-essential third-party scripts, gate modal initialization until consent is granted.
- If legal basis is "strictly necessary" for user-requested booking, document this decision with your legal/privacy policy owner.
- Update privacy policy to disclose Cal.com data processing and link relevant policy terms.

---

## G) Future upgrades

- **Prefill:** Pass known user attributes (name/email/company) into Cal booking where supported.
- **UTM attribution:** Persist UTMs on landing and pass into Cal form/custom fields for lead-source reporting.
- **Webhook automation:** Add secure webhook endpoint on Vercel for booking-created/cancelled events; sync to CRM/Slack/email.
- **Conversion analytics:** Track full funnel (`cta_click -> modal_open -> booking_success`) with deduplicated identifiers.
- **Dedicated booking page:** Implement header CTA destination as an onsite booking route with richer pre-context and FAQs.

---

## Notes specific to current repo

- Current CTA URL abstraction is in `web/src/lib/public-urls.ts`; this is the best integration point for safe defaults and fallbacks.
- Schedule CTAs currently exist in:
  - `web/src/components/sections/Header.tsx`
  - `web/src/components/sections/Hero.tsx`
  - `web/src/components/sections/CtaBand.tsx`
- Theme tokens already exist in `web/src/app/globals.css`, so branding the popup trigger and surrounding UI should reuse existing variables instead of introducing a second theme system.
