import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/electrical', '/electrical/domestic', '/electrical/commercial', '/electrical/industrial-maintenance'];

// This local regression suite never sends real enquiries.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/contact', route => route.abort());
});

test('electrical pages are complete, accessible and fit small screens', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('[data-electrical-page]')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://fennor.ie${route}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/fennor\.ie\/images\//);
    await expect(page.locator('.fe-hero-image img')).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.fe-hero-image img')).toHaveAttribute('fetchpriority', 'high');
    await expect(page.locator('.fe-faq-list details')).toHaveCount(route === '/electrical' ? 5 : 7);
    const hashes = await page.locator('main a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!));
    for (const hash of hashes) await expect(page.locator(hash)).toHaveCount(1);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflow at ${width}`).toBe(true);
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      const audit = await new AxeBuilder({ page }).include('[data-electrical-page]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, reason: node.failureSummary })) })), route).toEqual([]);
    }
  }
  expect(runtimeErrors).toEqual([]);
});

test('electrical finder sends customers to the selected service', async ({ page }) => {
  await page.goto('/electrical');
  const finder = page.locator('#explore');
  await finder.getByRole('button', { name: /Industrial & maintenance/ }).click();
  await expect(finder.getByRole('button', { name: /Industrial & maintenance/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(finder.getByRole('link', { name: 'Explore industrial & maintenance' })).toHaveAttribute('href', '/electrical/industrial-maintenance');
  await finder.getByRole('link', { name: 'Explore industrial & maintenance' }).click();
  await expect(page.locator('[data-electrical-page]')).toHaveAttribute('data-electrical-page', 'industrial-maintenance');
  await page.getByRole('button', { name: /Investigate an issue/ }).click();
  await expect(page.locator('.fe-maintenance-result')).toContainText('Describe the pattern. Let the findings lead.');
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Electrical fault investigation');
});

test('electrical choices reach the shared enquiry and failed sends remain retryable', async ({ page }) => {
  let attempts = 0;
  await page.route('**/api/contact', async route => {
    attempts += 1;
    await route.fulfill(attempts === 1 ? { status: 503, json: { success: false, error: 'The enquiry could not be sent. Please try again.' } } : { json: { success: true } });
  });
  await page.goto('/electrical/domestic');
  const evening = page.getByRole('button', { name: 'Evening & ambient lighting' });
  await evening.click();
  await expect(evening).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.fes-architecture')).toHaveClass(/fes-focus-1/);
  await expect(page.locator('.fes-architecture .fes-luminaire.is-active')).toHaveCount(1);
  await page.getByLabel('Your name', { exact: true }).fill('Electrical preview test');
  await page.getByLabel('How should we contact you?', { exact: true }).fill('electrical-preview@example.com');
  await page.getByLabel('Town / county', { exact: true }).fill('Slane, Meath');
  await page.getByLabel('What work do you have in mind?', { exact: true }).fill('Plan lighting and sockets as part of a kitchen renovation.');
  const request = page.waitForRequest(request => request.url().endsWith('/api/contact') && request.method() === 'POST');
  await page.getByRole('button', { name: 'Send my electrical enquiry' }).click();
  expect((await request).postDataJSON()).toMatchObject({ topic: 'Domestic electrical enquiry', page: '/electrical/domestic', area: 'Slane, Meath', context: 'Lighting priority: Evening and ambient lighting.' });
  await expect(page.locator('.fe-enquiry-form').getByRole('alert')).toContainText('could not be sent');
  await page.getByRole('button', { name: 'Send my electrical enquiry' }).click();
  await expect(page.locator('.enquiry-status-success')).toContainText('accepted for delivery');
  expect(attempts).toBe(2);
});

test('commercial and maintenance studies update the enquiry brief', async ({ page }) => {
  await page.goto('/electrical/commercial');
  await page.getByRole('button', { name: /Staff & work areas/ }).click();
  await expect(page.locator('.fe-premises-copy')).toContainText('Give the working day room to work.');
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Premises priority: Staff & work areas.');
  await page.goto('/electrical/industrial-maintenance');
  await page.getByRole('button', { name: /Change equipment/ }).click();
  await expect(page.locator('.fe-site-record')).toContainText('Equipment specification and load information');
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Site enquiry: Equipment supply or relocation.');
});

test('each electrical service explains the applicable supports without implying routine work is grant funded', async ({ page }) => {
  const expected: Record<string,string[]> = {
    '/electrical/domestic': ['Home EV charger','Heating controls','Routine electrical work'],
    '/electrical/commercial': ['Small-business energy-efficiency investment','Business building-management controls','Routine electrical work'],
    '/electrical/industrial-maintenance': ['Air-handling unit efficiency upgrade','Efficient building-water pumps','Existing BMS optimisation','Routine electrical work'],
  };
  for (const [route,titles] of Object.entries(expected)) {
    await page.goto(route);
    const directory=page.locator('[data-grant-directory]');
    await expect(directory).toHaveAttribute('data-grant-directory',route);
    for (const title of titles) await expect(directory.getByRole('heading',{name:title,exact:true})).toBeVisible();
    await expect(directory).toContainText('No general grant');
    await expect(page.getByRole('link',{name:/Grants & support/})).toHaveAttribute('href','#grant-options');
  }
});

test('main navigation nests heat pumps under Retrofitting and keeps Electrical at top level', async ({ page }) => {
  await page.goto('/heat-pumps');
  const primary=page.getByRole('navigation',{name:'Main navigation'});
  await expect(primary.getByRole('link',{name:'Electrical',exact:true})).toBeVisible();
  await expect(primary.getByRole('link',{name:'Heat pumps',exact:true})).toHaveCount(0);
  await expect(primary.getByRole('link',{name:'Retrofitting',exact:true})).toHaveClass(/fn-current/);
  await page.locator('.fn-directory > summary').click();
  const directory=page.getByRole('navigation',{name:'Explore all pages'});
  await expect(directory.getByText('HEAT PUMPS',{exact:true})).toBeVisible();
  await expect(directory.getByRole('link',{name:'Heat pumps overview',exact:true})).toHaveAttribute('href','/heat-pumps');
});

test('central grants guide includes electrical support and omits the unsupported rafter card', async ({ page }) => {
  await page.goto('/advice/grant-updates');
  const directory=page.locator('[data-grant-directory="all"]');
  await expect(directory.getByRole('button',{name:/Electrical & energy efficiency/})).toBeVisible();
  await expect(directory.getByRole('heading',{name:'Home EV charger',exact:true})).toBeVisible();
  await expect(directory.getByRole('heading',{name:'Air-handling unit efficiency upgrade',exact:true})).toBeVisible();
  await expect(directory.getByRole('heading',{name:'Small-business energy-efficiency investment',exact:true})).toBeVisible();
  await expect(directory.getByText('Rafter insulation in a whole-home upgrade',{exact:true})).toHaveCount(0);
});

test('electrical content and enquiry alternatives remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.route('**/api/contact', route => route.abort());
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('.fe-faq-list summary').first().click();
    await expect(page.locator('.fe-faq-list details').first()).toHaveAttribute('open', '');
    const alternatives = page.locator('.fe-contact-options');
    await expect(alternatives.getByRole('link', { name: 'Talk to Fennor · 089 403 2737' })).toBeVisible();
    await expect(alternatives.getByRole('link', { name: 'Talk to Fennor · 089 403 2737' })).toHaveAttribute('href', 'tel:+353894032737');
    const email = alternatives.getByRole('link', { name: 'Email info@fennor.ie & mikey@fennor.ie' });
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute('href', /^mailto:info@fennor\.ie,mikey@fennor\.ie\?subject=/);
    await expect(page.getByRole('navigation', { name: 'Explore electrical services' }).getByRole('link')).toHaveCount(3);
  }
  await context.close();
});
