import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  {
    path: '/',
    lang: 'pt-BR',
    heading: 'Emanuel Umbelino',
    contact: 'Vamos construir algo juntos?',
  },
  {
    path: '/en/',
    lang: 'en',
    heading: 'Emanuel Umbelino',
    contact: "Let's build something together?",
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
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
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
  await page.goto('/');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
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
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  await toggle.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Projetos' }).click();
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
