# emanuelumbelino.github.io

[![Deploy](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml)

Personal portfolio of **Emanuel Umbelino**, a full-stack software engineer specialized in AI and automation.
🔗 **https://emanuelumbelino.github.io** · Portuguese at `/`, English at [`/en/`](https://emanuelumbelino.github.io/en/)

## Tech stack

- [Astro](https://astro.build): static site, zero JavaScript by default
- [Tailwind CSS v4](https://tailwindcss.com): design tokens with a palette built around `#002882`, light and dark themes
- TypeScript (strictest)
- i18n: Brazilian Portuguese (`/`) and English (`/en/`)
- Playwright + axe-core: end-to-end and accessibility tests (WCAG 2 AA)
- Lighthouse CI: performance, accessibility, best-practices and SEO budgets
- GitHub Actions: CI on pull requests and automatic deploy to GitHub Pages

## Getting started

Requires Node.js 22.12+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs ./dist
npm run preview      # serves ./dist
npm run ci           # format:check + lint + type-check + build
npm run test:e2e     # Playwright (run after a build)
```

## Editing content

All content lives in [`src/data/profile.ts`](src/data/profile.ts): experience, projects, skills, education and links. UI strings live in [`src/i18n/ui.ts`](src/i18n/ui.ts). Components only handle layout.

- **Photo:** `src/assets/face.jpg` (square, high resolution; Astro generates optimized sizes at build time)
- **Résumés:** `public/cv/Emanuel_Umbelino_PT.pdf` and `public/cv/Emanuel_Umbelino_EN.pdf`
- **"Open to opportunities" badge:** `profile.openToWork`
- **Social sharing images:** `public/og-pt.png`, `public/og-en.png` (1200×630)

## Project structure

```
src/
├── assets/        images optimized by Astro
├── components/    page sections (Hero, About, Experience…)
├── data/          typed, bilingual content
├── i18n/          translations and helpers
├── layouts/       <head>, SEO, JSON-LD, theme
├── pages/         / (pt), /en/, 404
├── scripts/       client-side interactions (theme, menu, typing, reveal)
└── styles/        Tailwind and color tokens
tests/             Playwright + axe
```

## CI/CD

| Workflow     | Trigger                                     | What it does                                                                               |
| ------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ci.yml`     | Pull requests and pushes (except `develop`) | Prettier, ESLint, `astro check`, build, Playwright (desktop + mobile, a11y) and Lighthouse |
| `deploy.yml` | Push to `develop`                           | Runs CI, then publishes `dist` to GitHub Pages                                             |

> **One-time setup:** under _Settings → Pages → Build and deployment → Source_, select **GitHub Actions**.

Dependabot keeps npm dependencies and GitHub Actions up to date.
