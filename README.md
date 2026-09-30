# emanuelumbelino.github.io

[![Deploy](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/EmanuelUmbelino/emanuelumbelino.github.io/actions/workflows/deploy.yml)

Portfólio pessoal de **Emanuel Umbelino**, engenheiro de software full-stack especializado em IA e automação.
🔗 **https://emanuelumbelino.github.io** · 🇺🇸 [/en/](https://emanuelumbelino.github.io/en/)

## Stack

- [Astro](https://astro.build): site estático, zero JS por padrão
- [Tailwind CSS v4](https://tailwindcss.com): design tokens com paleta baseada em `#002882`, tema claro/escuro
- TypeScript (strictest)
- i18n: PT-BR (`/`) e EN (`/en/`)
- Playwright + axe-core: testes E2E e de acessibilidade (WCAG 2 AA)
- Lighthouse CI: orçamento de performance, a11y, boas práticas e SEO
- GitHub Actions: CI em PRs e deploy automático no GitHub Pages

## Desenvolvimento

Requer Node.js 22.12+ (veja `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # gera ./dist
npm run preview      # serve ./dist
npm run ci           # format:check + lint + type-check + build
npm run test:e2e     # Playwright (rode depois do build)
```

## Editando o conteúdo

Todo o conteúdo fica em [`src/data/profile.ts`](src/data/profile.ts): experiências, projetos, skills, formação e links. Os textos de interface ficam em [`src/i18n/ui.ts`](src/i18n/ui.ts). Os componentes cuidam só do layout.

- **Foto:** `src/assets/face.webp` (fundo transparente; é otimizada no build)
- **Currículos:** `public/cv/Emanuel_Umbelino_PT.pdf` e `public/cv/Emanuel_Umbelino_EN.pdf`
- **Badge "Aberto a oportunidades":** `profile.openToWork`
- **Imagens de compartilhamento:** `public/og-pt.png`, `public/og-en.png` (1200×630)

## Estrutura

```
src/
├── assets/        imagens otimizadas pelo Astro
├── components/    seções da página (Hero, About, Experience…)
├── data/          conteúdo tipado e bilíngue
├── i18n/          traduções e helpers
├── layouts/       <head>, SEO, JSON-LD, tema
├── pages/         / (pt), /en/, 404
├── scripts/       interações client-side (tema, menu, typing, reveal)
└── styles/        Tailwind + tokens de cor
tests/             Playwright + axe
```

## CI/CD

| Workflow     | Quando                          | O que faz                                                                                |
| ------------ | ------------------------------- | ---------------------------------------------------------------------------------------- |
| `ci.yml`     | PRs e pushes (exceto `develop`) | Prettier, ESLint, `astro check`, build, Playwright (desktop + mobile, a11y) e Lighthouse |
| `deploy.yml` | push na `develop`               | Roda o CI e publica o `dist` no GitHub Pages                                             |

> **Configuração única:** em _Settings → Pages → Build and deployment → Source_, selecione **GitHub Actions**.

Dependabot mantém as dependências npm e as GitHub Actions atualizadas.
