# aiBuddy

Landing and marketing site for **aiBuddy** — web design and automation services.

## Repo

- **Default branch:** `main`
- **Workflow:** meaningful work is tracked in [GitHub Issues](https://github.com/aibudoptimization/aiBuddy/issues) per [GITHUB_ISSUES_GUIDE.md](./GITHUB_ISSUES_GUIDE.md); use feature branches and PRs when branch protection requires it.

## Plans

- [Frontend implementation plan](./IMPLEMENTATION_PLANS/FRONTEND_IMPLEMENTATION_PLAN.md)
- [Repo & Vercel setup](./IMPLEMENTATION_PLANS/REPO_AND_VERCEL_SETUP_PLAN.md)
- [Custom domain (wfwonder.com)](./IMPLEMENTATION_PLANS/CUSTOM_DOMAIN_IMPL_PLAN.md)

## App

The Next.js site lives in **`web/`**.

```bash
cd web
npm install
cp .env.example .env.local   # optional; set booking URL + contact email
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Vercel

Set **Root Directory** to `web`. Configure env vars from `web/.env.example` (`NEXT_PUBLIC_*`). Production custom domain: **wfwonder.com** — see [CUSTOM_DOMAIN_IMPL_PLAN.md](./IMPLEMENTATION_PLANS/CUSTOM_DOMAIN_IMPL_PLAN.md) and [issue #1](https://github.com/aibudoptimization/aiBuddy/issues/1).

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS v4 — see the frontend plan for scope.
