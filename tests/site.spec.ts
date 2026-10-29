import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  {
    path: '/',
    lang: 'en',
    heading: 'Emanuel Umbelino',
    contact: "Let's build something together?",
  },
  {
    path: '/pt/',
    lang: 'pt-BR',
    heading: 'Emanuel Umbelino',
    contact: 'Vamos construir algo juntos?',
  },
];

for (const p of pages) {
  test.describe(`home ${p.path}`, () => {
    test('renders main content and metadata', async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('html')).toHaveAttribute('lang', p.lang);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.heading);
      await expect(page.locator('#contact h2')).toHaveText(p.contact);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /og-(pt|en)\.png$/,
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    });

    test('exposes SEO metadata and structured data', async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new URL(p.path, 'https://emanuelumbelino.github.io').href,
      );
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length ?? 0).toBeLessThanOrEqual(160);
      const jsonLd = JSON.parse(
        (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
      ) as { '@graph': { '@type': string; workExample?: unknown[]; hasCredential?: unknown[] }[] };
      const types = jsonLd['@graph'].map((node) => node['@type']);
      expect(types).toEqual(expect.arrayContaining(['WebSite', 'ProfilePage', 'Person']));
      const person = jsonLd['@graph'].find((node) => node['@type'] === 'Person');
      expect(person?.workExample?.length).toBeGreaterThan(0);
      expect(person?.hasCredential?.length).toBeGreaterThan(0);
      await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute(
        'href',
        `${p.path}llms-full.txt`,
      );
    });

    test('serves a Markdown profile for language models', async ({ request }) => {
      const res = await request.get(`${p.path}llms-full.txt`);
      expect(res.ok()).toBeTruthy();
      expect(res.headers()['content-type']).toContain('text/plain');
      const body = await res.text();
      expect(body.startsWith('# Emanuel Umbelino\n')).toBeTruthy();
      for (const text of ['PUC-Rio · GTEP', 'Vonex.AI', 'ShopList', 'umbelino.emanuel@gmail.com']) {
        expect(body).toContain(text);
      }
    });

    test('has no horizontal overflow', async ({ page }) => {
      await page.goto(p.path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const theme of ['dark', 'light'] as const) {
      test(`has no detectable a11y violations (${theme})`, async ({ page }) => {
        await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(p.path);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
          .analyze();
        expect(
          results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`),
        ).toEqual([]);
      });
    }
  });
}

test('theme toggle persists the choice', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('language switch goes to the other locale', async ({ page }) => {
  await page.goto('/pt/');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test.describe('language detection', () => {
  test.use({ locale: 'pt-BR' });

  test('Portuguese browsers are sent to /pt/ from the root', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/pt\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test('a manual switch to English is remembered', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Switch to English' }).click();
    await expect(page).toHaveURL(/:\d+\/$/);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test('other browsers stay on English at the root', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('old /en/ links redirect to the root', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('llms.txt indexes the machine-readable resources', async ({ request }) => {
  const res = await request.get('/llms.txt');
  expect(res.ok()).toBeTruthy();
  const body = await res.text();
  expect(body.startsWith('# Emanuel Umbelino\n\n> ')).toBeTruthy();
  expect(body).toContain('https://emanuelumbelino.github.io/llms-full.txt');
  expect(body).toContain('https://emanuelumbelino.github.io/pt/llms-full.txt');
});

test('robots.txt allows AI crawlers and points to llms.txt', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).not.toMatch(/Disallow:\s*\/\s*$/m);
  expect(body).toContain('User-agent: GPTBot');
  expect(body).toContain('User-agent: ClaudeBot');
  expect(body).toContain('llms.txt');
});

test('CV files are served', async ({ request }) => {
  for (const cv of ['/cv/Emanuel_Umbelino_PT.pdf', '/cv/Emanuel_Umbelino_EN.pdf']) {
    const res = await request.get(cv);
    expect(res.ok()).toBeTruthy();
    expect(res.headers()['content-type']).toContain('pdf');
  }
});

test('mobile menu opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/pt/');
  const toggle = page.locator('[data-menu-toggle]');
  await toggle.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Projetos' }).click();
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test.describe('testimonials carousel', () => {
  test('arrows and dots change the highlighted slide', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const carousel = page.locator('[data-carousel]');
    const slides = carousel.locator('[data-slide]');
    await carousel.scrollIntoViewIfNeeded();

    await expect(slides.nth(0)).toHaveAttribute('data-active', '');
    await carousel.locator('[data-next]').click();
    await expect(slides.nth(1)).toHaveAttribute('data-active', '');
    await carousel.locator('[data-dot]').nth(3).click();
    await expect(slides.nth(3)).toHaveAttribute('data-active', '');
    await expect(carousel.locator('[data-dot]').nth(3)).toHaveAttribute('aria-current', 'true');
    await carousel.locator('[data-prev]').click();
    await expect(slides.nth(2)).toHaveAttribute('data-active', '');
  });

  test('autoplay is disabled for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const carousel = page.locator('[data-carousel]');
    await expect(carousel).toHaveAttribute('data-autoplay', 'false');
    await expect(carousel.locator('[data-toggle]')).toHaveCount(0);
  });

  test('pause button stops autoplay', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('[data-carousel]');
    await carousel.scrollIntoViewIfNeeded();
    const toggle = carousel.locator('[data-toggle]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('data-state', 'paused');
    await expect(carousel).toHaveAttribute('data-paused', '');
    await toggle.click();
    await expect(toggle).toHaveAttribute('data-state', 'playing');
  });
});
