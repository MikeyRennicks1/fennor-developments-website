import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const localSolarRoutes = ['/solar-panels-slane', '/solar-panels-navan', '/solar-panels-meath', '/solar-panels-louth'];

test.beforeEach(async ({ page }) => {
  await page.route('**/api/contact', route => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('local solar guides are real indexable pages with unique canonicals', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 950 });
  const titles = new Set<string>();
  for (const route of localSolarRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://fennor.ie${route}`);
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} mobile overflow`).toBe(true);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(localSolarRoutes.length);
});

test('domestic solar installation hands customers into the system builder', async ({ page }) => {
  await page.goto('/solar/domestic');
  const sequence = page.locator('.fennor-solar-sequence');
  await expect(sequence).toBeVisible();
  const stages = sequence.getByRole('group', { name: 'Solar installation stages' }).getByRole('button');
  await expect(stages).toHaveCount(6);
  await stages.nth(5).click();
  const handoff = sequence.getByRole('link', { name: /Build your starting system/ });
  await expect(handoff).toHaveAttribute('href', '#design');
  await handoff.click();
  await expect(page.locator('#design')).toBeInViewport();
});

test('new-build construction explorer exposes blockwork and ICF journeys', async ({ page }) => {
  await page.goto('/building/new-builds');
  const explorer = page.locator('.fn-build-explorer');
  const blockworkTab = explorer.getByRole('tab', { name: /Traditional blockwork/ });
  const icfTab = explorer.getByRole('tab', { name: /Insulated concrete formwork/ });
  await expect(blockworkTab).toHaveAttribute('aria-selected', 'true');
  for (const tab of [blockworkTab, icfTab]) {
    const panelId = await tab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    await expect(page.locator(`#${panelId}`)).toHaveCount(1);
  }
  await expect(explorer.getByRole('group', { name: 'Blockwork construction stages' }).getByRole('button')).toHaveCount(5);
  await icfTab.click();
  await expect(icfTab).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('group', { name: 'ICF construction stages' }).getByRole('button')).toHaveCount(6);
});

test('new interactive journeys retain mobile accessibility', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 950 });
  for (const route of ['/solar/domestic', '/electrical/domestic', '/building/new-builds']) {
    await page.goto(route);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, reason: node.failureSummary })) })), route).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} mobile overflow`).toBe(true);
  }
});
