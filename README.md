# emanuelumbelino.github.io

[![Deploy](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml)

Personal portfolio of **Emanuel Umbelino**, a full-stack software engineer specialized in AI and automation.
🔗 **https://emanuelumbelino.github.io** · English at `/`, Portuguese at [`/pt/`](https://emanuelumbelino.github.io/pt/)

## Tech stack

- [Astro](https://astro.build): static site, zero JavaScript by default
- [Tailwind CSS v4](https://tailwindcss.com): design tokens with a palette built around `#002882`, light and dark themes
- TypeScript (strictest)
- i18n: English (`/`) and Brazilian Portuguese (`/pt/`), see [Languages](#languages)
- Playwright + axe-core: end-to-end and accessibility tests (WCAG 2.2 AA and axe best practices), see [Accessibility](#accessibility)
- Lighthouse CI: accessibility and SEO must score 100, best practices 95+, performance 90+
- GitHub Actions: CI on pull requests and automatic deploy to GitHub Pages

## What's on the page

Hero · companies and clients · about · AI & automation · tech stack · experience · projects · recommendations (autoplay carousel) · education & languages · contact. Everything is available in both languages, with light and dark themes.

## Getting started

Requires Node.js 22.23.4+. CI uses Node 24, pinned in `.nvmrc`.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs ./dist
npm run preview      # serves ./dist
npm run ci           # format:check + lint + type-check + build
npm run test:e2e     # Playwright (run after a build)
```

## Editing content

All content lives in [`src/data/profile.ts`](src/data/profile.ts), typed and bilingual (`{ pt, en }`). UI strings live in [`src/i18n/ui.ts`](src/i18n/ui.ts). Components only handle layout. The pages, the JSON-LD and the `llms.txt` files are all built from this data, so one edit updates all of them.

| Export                         | Section                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `profile`                      | name, headline, intro, links, résumé paths, `openToWork` badge                                    |
| `employers`, `clients`         | companies I worked at and the clients served through them                                         |
| `about`                        | about text, stats and quick facts                                                                 |
| `aiHighlights`                 | AI & automation cards                                                                             |
| `skills`, `marquee`            | tech stack groups and the scrolling strip                                                         |
| `experience`, `projects`       | career timeline (with ISO `startDate`/`endDate`) and project cards (`featured`, `live`, `code`)   |
| `testimonials`                 | LinkedIn recommendations; set `translatedFrom` when a quote was translated, so the page labels it |
| `education`, `spokenLanguages` | education and language levels                                                                     |

Other assets:

- **Photo:** `src/assets/face.jpg` (square, high resolution; Astro generates optimized sizes at build time)
- **Résumés:** `public/cv/Emanuel_Umbelino_PT.pdf` and `public/cv/Emanuel_Umbelino_EN.pdf`
- **Social sharing images:** `public/og-pt.png`, `public/og-en.png` (1200×630); `public/og-avatar.png` is the `Person` image in the JSON-LD
- **Icons:** `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`

## Project structure

```
src/
├── assets/        images optimized by Astro
├── components/    page sections (Hero, About, Experience…)
├── data/          typed, bilingual content and its Markdown rendering
├── i18n/          translations and helpers
├── layouts/       <head>, SEO, JSON-LD, theme
├── pages/         / (en), /pt/, 404, llms.txt endpoints
├── scripts/       client-side interactions (theme, language, menu, typing, reveal, nav, copy, carousel)
└── styles/        Tailwind and color tokens
tests/             Playwright + axe
```

## Languages

- `/` is English (default locale) and `/pt/` is Portuguese. Both are linked with `hreflang`, and `x-default` points to `/`.
- On the root page, a small inline script sends browsers whose primary language is Portuguese to `/pt/` before the page renders.
- Choosing a language with the EN/PT switch is stored in `localStorage` (`lang`) and always wins over detection.
- Old `/en/` links redirect to `/` (configured in `astro.config.mjs`).

## Machine and AI readability

- JSON-LD graph in [`Base.astro`](src/layouts/Base.astro): `WebSite`, `ProfilePage` and `Person` with employers, credentials, skills and projects.
- [`/llms.txt`](https://emanuelumbelino.github.io/llms.txt) follows [llmstxt.org](https://llmstxt.org) and links the full Markdown profile in English ([`/llms-full.txt`](https://emanuelumbelino.github.io/llms-full.txt)) and Portuguese ([`/pt/llms-full.txt`](https://emanuelumbelino.github.io/pt/llms-full.txt)). Both are generated at build time from [`src/data/profile.ts`](src/data/profile.ts) by [`src/data/markdown.ts`](src/data/markdown.ts), so they stay in sync with the pages.
- `robots.txt` allows every crawler, lists the main AI crawlers explicitly and points to `llms.txt`. The sitemap carries `lastmod`.

## Accessibility

- Semantic landmarks and headings, a skip link, and a visible focus ring on every interactive element.
- Accessible names include the visible text (WCAG 2.5.3), and touch targets are at least 24×24px (2.5.8).
- `prefers-reduced-motion` turns off scroll reveals, the typing effect and the carousel autoplay.
- Decorative loops (cursor blink, status pulse, scroll hint) stop within 5 seconds, and the typing effect runs once while screen readers get the full list of roles (2.2.2). The tech-stack marquee still loops; it pauses on hover and is hidden from assistive technology.
- Every PR runs axe (WCAG 2.2 AA + best practices) on both languages, both themes, on desktop and mobile, plus Lighthouse with the accessibility score locked at 100.

## Recommendations carousel

Scroll-snap carousel ([`src/scripts/carousel.ts`](src/scripts/carousel.ts)) that highlights one recommendation at a time. It can be navigated with arrows, dots, swipe or the keyboard, and autoplays every 7 seconds. Autoplay pauses on hover, keyboard focus, when off-screen or in a hidden tab, and via a pause button. It is disabled for users who prefer reduced motion.

## CI/CD

| Workflow     | Trigger                                     | What it does                                                                               |
| ------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ci.yml`     | Pull requests and pushes (except `develop`) | Prettier, ESLint, `astro check`, build, Playwright (desktop + mobile, a11y) and Lighthouse |
| `deploy.yml` | Push to `develop`                           | Runs CI, then publishes `dist` to GitHub Pages                                             |

> **One-time setup:** under _Settings → Pages → Build and deployment → Source_, select **GitHub Actions**.

Dependabot opens grouped npm updates weekly (`astro`, `tailwind`, `lint-and-test`) and GitHub Actions updates monthly.
