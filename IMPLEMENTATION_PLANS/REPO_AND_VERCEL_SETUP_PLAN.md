# aiBuddy — Repo & Vercel Setup Plan

**Status:** Planning (no application code in this plan)  
**Repo:** [https://github.com/aibudoptimization/aiBuddy.git](https://github.com/aibudoptimization/aiBuddy.git)  
**Related:** [FRONTEND_IMPLEMENTATION_PLAN.md](./FRONTEND_IMPLEMENTATION_PLAN.md) · [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md)

This plan covers **GitHub repository hygiene**, **local ↔ remote workflow**, **branch protection**, and **Vercel project configuration** (including **environment variables**). Execute it before or in parallel with the first Next.js scaffold, using **issues and PRs** per the issues guide.

---

## 1. Purpose and definition of done

### Purpose

- One **canonical remote** on GitHub with a predictable **default branch** and **protected** merge rules suitable for solo or small-team work.
- **Vercel** connected to that repo so every push/PR yields **preview** or **production** deploys with **documented env vars** and no secrets in git.

### Definition of done

- Local folder is a **git** working tree whose `origin` points at `aibudoptimization/aiBuddy`.
- Default branch is **`main`** (or documented exception if org policy differs).
- **Branch protection** on `main` matches §3 (minimum viable vs stricter option chosen and recorded in README or team notes).
- **Vercel** project exists, linked to the GitHub repo, with correct **framework preset** (Next.js when app exists) and **root/build** settings if the app is not at repo root.
- **`.env.example`** (or README table) lists every **non-secret** variable name the app expects; **Production** and **Preview** env values are set in Vercel; **local** secrets live only in `.env.local` (gitignored).
- Optional: **custom domain** attached in Vercel with DNS verified (can be a follow-up issue).

---

## 2. Scope

### In scope

- Clone, remote, first push, `.gitignore` expectations for Node/Next.js.
- GitHub: default branch, branch protection, (optional) team access.
- Vercel: import project, Git integration, env var naming, Production vs Preview behavior.
- Documentation expectations for contributors (README section or issue deliverable).

### Out of scope

- Implementing the Next.js app itself (see frontend plan).
- CI beyond what Vercel provides by default (add a separate plan/issue for GitHub Actions if needed).
- DNS provider–specific steps except as a generic checklist.

---

## 3. GitHub: default branch and protection

### Default branch

- Standardize on **`main`**. If the empty repo was created with `master`, rename default branch to `main` in GitHub **Settings → General → Default branch** (or via `git` + GitHub UI) and update local tracking accordingly.

### Branch protection (choose one tier)

**Minimum viable (solo, fast iteration)**

- Require **pull request** before merging to `main` *or* merge directly if you explicitly want speed; if PRs are skipped, still use **feature branches** and clear commits for traceability with issues.

**Recommended (aligns with [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md))**

- **Protect `main`.**
- Require a **pull request** before merging.
- Optional but valuable: require **1 approval** when collaborators exist.
- Enable **“Do not allow bypassing”** for admins if you want the rules to apply to everyone.
- Consider **status checks** later when CI exists; not required on day one.

Record the chosen tier in the repo **README** (one short paragraph) so future you and agents do not guess.

### Labels and milestones

- Create the **label set** and **milestones** suggested in the frontend plan and issues guide *before* heavy coding so every setup task can attach to **Milestone A — Foundation**.

---

## 4. Local repository workflow

### Scenarios

**A — Empty remote, local folder already has files (e.g. plans only)**

1. `git init` if not already a repo.
2. `git remote add origin` using the SSH or HTTPS URL for `aibudoptimization/aiBuddy`.
3. Commit current tree (plans, guide).
4. `git push -u origin main` (create `main` if needed).

**B — Remote already has commits (e.g. README from GitHub UI)**

1. `git clone` into a clean folder **or** add `origin` and `git pull origin main --allow-unrelated-histories` only if you intend to merge histories (prefer clone + copy files if unsure).
2. Resolve conflicts once; then push.

**C — This machine folder must become the source of truth**

- Prefer **force-with-lease** only if you fully understand overwriting remote history; default path is merge or rebase per team preference.

### `.gitignore` (before first Next.js commit)

- When the Next.js scaffold lands, ensure ignore rules cover **`.env*.local`**, **`.vercel`**, **`node_modules`**, **`.next`**, and OS junk. Until then, a root `.gitignore` can be minimal or added in the scaffold issue—do not commit **`.env.local`** or **Vercel tokens**.

---

## 5. Vercel: project setup

### Connect GitHub

1. Vercel **Dashboard → Add New → Project → Import** `aibudoptimization/aiBuddy`.
2. Grant Vercel **repository access** (only this repo if you use fine-grained selection).
3. **Production branch:** `main` (default in Vercel).

### Build settings (after Next.js exists)

- **Framework preset:** Next.js.
- **Root directory:** repository root unless the app lives in a subfolder (e.g. `apps/web`); if monorepo later, set root and document it in README.
- **Build command / output:** leave defaults for Next.js unless customized.
- **Node version:** match `engines` in `package.json` when added, or set in Vercel **Environment Variables** / project settings if required.

### Pre–Next.js state

- If you connect Vercel **before** a Next.js app exists, the first deploy may **fail** until a valid build exists. Options: (1) connect after scaffold PR merges, or (2) connect early and accept failing builds until Milestone A completes—document in an issue to avoid confusion.

---

## 6. Environment variables

### Principles

- **Never commit** API keys, webhook secrets, or private URLs that embed tokens.
- **Document names** in **`.env.example`** (empty or placeholder values) and in **README**.
- Use **Vercel** for **Production** and **Preview** values; developers use **`.env.local`** locally.

### Naming convention

- **Public URLs** (scheduling, public form endpoints): e.g. `NEXT_PUBLIC_SCHEDULE_AUDIT_URL`, `NEXT_PUBLIC_CONTACT_URL` or a single `NEXT_PUBLIC_SITE_*` pattern—pick one convention in the scaffold issue and stick to it.
- **Server-only secrets** (future API routes): **no** `NEXT_PUBLIC_` prefix; set only in Vercel **Production**/**Preview** and local `.env.local`.

### Production vs Preview

- **Production:** live booking/contact endpoints and any prod-only analytics IDs.
- **Preview:** use **test** calendars, **staging** form endpoints, or duplicate vars with safe values so PR previews do not book real slots or spam real inboxes.
- Vercel allows **per-environment** values; set **Development** in Vercel only if you use `vercel dev` with pulled envs.

### Optional: `vercel env pull`

- For local parity, team members can run `vercel link` and `vercel env pull` **after** policy allows (pulls secrets to `.env.local`—still gitignored).

---

## 7. Custom domain (optional follow-up)

- Add domain in Vercel **Project → Settings → Domains**.
- At registrar: **A/AAAA** or **CNAME** per Vercel’s instructions.
- Enable **HTTPS** (automatic on Vercel once DNS propagates).
- Track as a separate **issue** if not blocking v1.
- **wfwonder.com:** step-by-step checklist in [CUSTOM_DOMAIN_IMPL_PLAN.md](./CUSTOM_DOMAIN_IMPL_PLAN.md) ([issue #1](https://github.com/aibudoptimization/aiBuddy/issues/1)).

---

## 8. Suggested GitHub issues (setup milestone)

| Suggested title | Acceptance criteria (summary) |
|----------------|-------------------------------|
| `[Chore] Initialize git remote and push main with planning docs` | `origin` correct; `main` default; plans + guide on remote. |
| `[Chore] Configure GitHub branch protection for main` | Rules match §3 tier; README notes policy. |
| `[Chore] Connect Vercel to GitHub repo and verify deploy pipeline` | Project linked; production branch `main`; first successful deploy after Next.js exists (or issue states intentional pending scaffold). |
| `[Chore] Document environment variables and Vercel env configuration` | `.env.example` + README table; Production/Preview vars set or explicitly “N/A until CTAs wired.” |
| `[Chore] Add custom domain on Vercel (optional)` | DNS verified; HTTPS live. |

Use labels (`type:chore`, `priority:p*`) and **Milestone A — Foundation** from the frontend plan.

---

## 9. Execution order (recommended)

1. Git remote + `main` + initial push (issue 1).  
2. Branch protection + README policy (issue 2).  
3. Next.js scaffold merges (frontend plan).  
4. Vercel import + first green deploy (issue 3).  
5. Env documentation + Vercel env vars for CTAs when URLs exist (issue 4).  
6. Domain issue if needed (issue 5).

---

## 10. Cross-reference

When implementation starts, treat **repo + Vercel** tasks as **prerequisites** or **parallel** work to [FRONTEND_IMPLEMENTATION_PLAN.md](./FRONTEND_IMPLEMENTATION_PLAN.md) §5 and §8 (Milestone A). All PRs should reference issues per [GITHUB_ISSUES_GUIDE.md](../GITHUB_ISSUES_GUIDE.md).
