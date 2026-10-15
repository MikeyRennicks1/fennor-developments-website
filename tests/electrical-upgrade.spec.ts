import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/electrical', '/electrical/domestic', '/electrical/commercial', '/electrical/industrial-maintenance'];

// Never send real enquiries: this suite only checks client behaviour and payloads.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 200, json: { success: true } }));
});

async function expectNoOverflow(page: Page, description: string) {
  const dimensions = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, description).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body, description).toBeLessThanOrEqual(dimensions.viewport);
}

for (const route of routes) {
  for (const width of [320, 390, 1440]) {
    test(`${route}: complete photographs and proportion at ${width}px`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 950 });
      await page.goto(route);
      await expect(page.locator('[data-electrical-page]')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://fennor.ie${route}`);
      await expect(page.locator('.fe-hero-image img')).toHaveAttribute('loading', 'eager');
      await expect(page.locator('.fe-hero-image img')).toHaveAttribute('fetchpriority', 'high');
      await expectNoOverflow(page, `${route} at ${width}px before interaction`);

      const images = page.locator('main img');
      expect(await images.count()).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(node => {
          const img = node as HTMLImageElement;
          return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
        }), { message: `Image failed to decode on ${route}` }).toBe(true);
        expect((await image.getAttribute('alt'))?.trim()).toBeTruthy();
      }

      await page.locator('.fe-faq-list summary').first().click();
      await expect(page.locator('.fe-faq-list details').first()).toHaveAttribute('open', '');
      await expectNoOverflow(page, `${route} at ${width}px after interaction`);
      for (const hash of await page.locator('main a[href^="#"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')!))) {
        await expect(page.locator(hash)).toHaveCount(1);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('Electrical photography is specific to the service and different from the previous solar and kitchen images', async ({ page }) => {
  const heroSources: Record<string, string> = {};
  for (const route of routes) {
    await page.goto(route);
    const src = await page.locator('.fe-hero-image img').getAttribute('src');
    expect(src).toBeTruthy();
    const source = new URL(src!, 'http://127.0.0.1').searchParams.get('url') || src!;
    expect(source).toMatch(/^\/images\/electrical-/);
    expect(source).not.toMatch(/commercial-film-poster|solar|renovation|kitchen/i);
    heroSources[route] = source;
  }
  expect(heroSources['/electrical/domestic']).toBe('/images/electrical-domestic-img-3032-v2.jpg');
  expect(heroSources['/electrical/industrial-maintenance']).toBe('/images/electrical-control-panel.webp');
  await page.goto('/electrical');
  const allImages = await page.locator('main img').evaluateAll(nodes => nodes.map(node => node.getAttribute('src') || ''));
  expect(allImages.join('\n')).not.toMatch(/commercial-film-poster|fennor-renovations/);
  expect(allImages.join('\n')).toContain('electrical-visible-difference-4k.jpg');
});

test('industrial maintenance uses one large control-panel hero photograph', async ({ page }) => {
  await page.goto('/electrical/industrial-maintenance');
  await expect(page.locator('.fe-hero-visual .fe-hero-image')).toHaveCount(1);
  await expect(page.locator('.fe-hero-visual .fe-site-detail')).toHaveCount(0);
  await expect(page.locator('.fe-hero-image img')).toHaveAttribute('alt', /Industrial control cabinet/);
  await expect(page.locator('.fe-site-photo-caption')).toContainText('To the control behind it.');
});

test('domestic electrical uses the supplied consumer-unit detail and a finished kitchen photograph', async ({ page }) => {
  await page.goto('/electrical/domestic');
  const heroImage = page.locator('.fe-hero-image img');
  await expect(heroImage).toHaveAttribute('alt', /Macro detail of neatly arranged domestic consumer-unit conductors/);
  await expect(heroImage).toHaveAttribute('src', /electrical-domestic-img-3032-v2\.jpg/);
  await expect(heroImage).toHaveCSS('object-fit', 'cover');
  const photoFrame = await page.locator('.fe-hero-domestic .fe-hero-image').boundingBox();
  expect(photoFrame).not.toBeNull();
  expect(photoFrame!.width / photoFrame!.height).toBeCloseTo(0.75, 2);
  const finishedRoom = page.locator('.fe-domestic-finish');
  await expect(finishedRoom.getByRole('heading', { name: /Clean at the finish/ })).toBeVisible();
  const image = finishedRoom.locator('img');
  await expect(image).toHaveAttribute('alt', /Freshly renovated kitchen/);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(node => {
    const photo = node as HTMLImageElement;
    return photo.complete && photo.naturalWidth > 0 && photo.naturalHeight > 0;
  })).toBe(true);
});

test('homepage service families include a useful description before every destination link', async ({ page }) => {
  await page.goto('/');
  for (const tabName of ['Renovations', 'Retrofit', 'Building', 'Electrical']) {
    await page.getByRole('tab', { name: new RegExp(tabName) }).click();
    const panel = page.getByRole('tabpanel');
    const details = panel.locator('.solar-service-list details');
    expect(await details.count()).toBeGreaterThan(0);
    for (const item of await details.all()) {
      await item.locator('summary').click();
      await expect(item.locator('div > p')).not.toBeEmpty();
      await expect(item.locator('div > a[href]')).toBeVisible();
    }
  }
  await page.getByRole('tab', { name: /Electrical/ }).click();
  await expect(page.locator('.service-photo img')).toHaveAttribute('alt', /Commercial air-handling plant/);
});

test('overview enquiry asks for services and sends the chosen topic in a mocked submission', async ({ page }) => {
  await page.goto('/electrical');
  const service = page.getByRole('combobox', { name: 'What services are you enquiring about?', exact: true });
  await expect(service).toBeVisible();
  await expect(page.getByLabel('What kind of property?', { exact: true })).toHaveCount(0);
  await service.selectOption('commercial');
  await page.getByLabel('Your name', { exact: true }).fill('Automated preview test');
  await page.getByLabel('How should we contact you?', { exact: true }).fill('preview@example.com');
  await page.getByLabel('Town / county', { exact: true }).fill('Slane, Meath');
  await page.getByLabel('What work do you have in mind?', { exact: true }).fill('Please review the lighting and additional sockets for our premises.');
  const request = page.waitForRequest(request => request.url().endsWith('/api/contact') && request.method() === 'POST');
  await page.getByRole('button', { name: 'Send my electrical enquiry' }).click();
  expect((await request).postDataJSON()).toMatchObject({
    topic: 'Commercial electrical enquiry',
    page: '/electrical',
    area: 'Slane, Meath',
  });
  await expect(page.locator('.enquiry-status-success')).toContainText('accepted for delivery');
});

test('commercial and industrial selections carry through to the enquiry and email alternative', async ({ page }) => {
  await page.goto('/electrical/commercial');
  await page.getByRole('button', { name: /Staff & work areas/ }).click();
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Premises priority: Staff & work areas.');
  await page.goto('/electrical/industrial-maintenance');
  await page.getByRole('button', { name: /Change equipment/ }).click();
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Site enquiry: Equipment supply or relocation.');
  const mailto = new URL((await page.locator('.fe-contact-options a[href^="mailto:"]').getAttribute('href'))!);
  expect(mailto.pathname).toBe('info@fennor.ie,mikey@fennor.ie');
  expect(mailto.searchParams.get('body')).toContain('Equipment supply or relocation');
});

test('project finder provides detailed expandable services with keyboard controls and a consistent enquiry', async ({ page }) => {
  await page.goto('/electrical');
  const details = page.locator('.fes-service-details');
  await expect(details.locator('details')).toHaveCount(3);
  const rewire = details.locator('details').filter({ has: page.locator('summary', { hasText: 'Rewiring & upgrades' }) });
  await expect(rewire).toHaveAttribute('open', '');
  await expect(rewire).toContainText('planned power interruptions');
  await expect(rewire).toContainText('testing and certification');
  const lighting = details.locator('details').filter({ has: page.locator('summary', { hasText: 'Lighting & sockets' }) });
  await lighting.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(lighting).toHaveAttribute('open', '');
  await expect(rewire).not.toHaveAttribute('open');
  await expect(lighting).toContainText('socket positions');
  await expect(lighting.locator('p')).toHaveCount(2);
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Domestic electrical: Lighting & sockets.');
  await page.getByRole('group', { name: 'Choose your electrical service' }).getByRole('button', { name: /Industrial & maintenance/ }).click();
  await expect(page.getByRole('combobox', { name: 'What services are you enquiring about?', exact: true })).toHaveValue('industrial-maintenance');
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Industrial & maintenance: Equipment supplies.');
  await expect(page.locator('.fes-service-details details')).toHaveCount(3);
  await expect(page.locator('.fes-service-details details').first()).toContainText('Machine commissioning', { ignoreCase: true });
  // Changing the form topic must remove a stale brief from another service.
  await page.getByRole('combobox', { name: 'What services are you enquiring about?', exact: true }).selectOption('commercial');
  await expect(page.locator('.fe-enquiry-selection')).toHaveCount(0);
  const email = new URL((await page.locator('.fe-contact-options a[href^="mailto:"]').getAttribute('href'))!);
  expect(email.searchParams.get('subject')).toBe('Commercial electrical enquiry');
  expect(email.searchParams.get('body')).toBeNull();
});

test('the architectural study pauses, resumes, stops offscreen and honours reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/electrical');
  const study = page.locator('.fes-architecture');
  await study.scrollIntoViewIfNeeded();
  await expect(study).toHaveAttribute('data-motion', 'running');
  const path = study.locator('.fes-circuit-travel');
  await expect(path).toHaveCSS('animation-play-state', 'running');
  await study.getByRole('button', { name: 'Pause study animation', exact: true }).click();
  await expect(study).toHaveAttribute('data-motion', 'paused');
  await expect(path).toHaveCSS('animation-play-state', 'paused');
  const resume = study.getByRole('button', { name: 'Play study animation', exact: true });
  await resume.focus();
  await page.keyboard.press('Enter');
  await expect(study).toHaveAttribute('data-motion', 'running');
  await page.locator('#enquiry').scrollIntoViewIfNeeded();
  await expect(study).toHaveAttribute('data-motion', 'paused');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await study.scrollIntoViewIfNeeded();
  await expect(study.getByRole('button', { name: 'Animation disabled by reduced motion preference' })).toBeDisabled();
  await expect(study).toHaveAttribute('data-motion', 'paused');
  await expect(path).toHaveCSS('animation-name', 'none');
  await page.getByRole('group', { name: 'Choose your electrical service' }).getByRole('button', { name: /Commercial electrical/ }).click();
  await expect(page.locator('.fes-architecture')).toHaveClass(/fes-kind-commercial/);
  await expect(page.locator('.fes-architecture .fes-circuit-travel')).toHaveCSS('animation-name', 'none');
});

test('domestic lighting changes the correct zones and carries that brief in a mocked enquiry', async ({ page }) => {
  await page.goto('/electrical/domestic');
  const study = page.locator('.fes-architecture');
  await expect(study.locator('.fes-luminaire.is-active')).toHaveCount(2);
  const evening = page.getByRole('button', { name: 'Evening & ambient lighting', exact: true });
  await evening.focus();
  await page.keyboard.press('Enter');
  await expect(evening).toHaveAttribute('aria-pressed', 'true');
  await expect(study.locator('.fes-luminaire.is-active')).toHaveCount(1);
  await expect(study).toHaveClass(/fes-focus-1/);
  await expect(page.locator('.fe-enquiry-selection')).toContainText('Lighting priority: Evening and ambient lighting.');
  await page.getByRole('button', { name: 'Entrance & circulation lighting', exact: true }).click();
  await expect(study.locator('.fes-arrival.is-active')).toHaveCount(1);
  await expect(study.locator('.fes-luminaire.is-active')).toHaveCount(0);
  await page.getByLabel('Your name', { exact: true }).fill('Automated preview test');
  await page.getByLabel('How should we contact you?', { exact: true }).fill('preview@example.com');
  await page.getByLabel('Town / county', { exact: true }).fill('Slane, Meath');
  await page.getByLabel('What work do you have in mind?', { exact: true }).fill('Discuss entrance lighting and sockets during a renovation.');
  const request = page.waitForRequest(request => request.url().endsWith('/api/contact') && request.method() === 'POST');
  await page.getByRole('button', { name: 'Send my electrical enquiry' }).click();
  expect((await request).postDataJSON()).toMatchObject({
    topic: 'Domestic electrical enquiry',
    context: 'Lighting priority: Entrance and circulation lighting.',
    page: '/electrical/domestic',
  });
  await expect(page.locator('.enquiry-status-success')).toContainText('accepted for delivery');
});

test('the four Electrical pages pass focused mobile accessibility checks', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 390, height: 950 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    await page.goto(route);
    const audit = await new AxeBuilder({ page }).include('[data-electrical-page]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, reason: node.failureSummary })) })), route).toEqual([]);
  }
});

test('the four Electrical pages have usable enquiry alternatives without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 950 } });
  const page = await context.newPage();
  // Also intercept this independent context; no real submissions are permitted.
  await page.route('**/api/contact', route => route.abort());
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('.fe-faq-list summary').first().click();
    await expect(page.locator('.fe-faq-list details').first()).toHaveAttribute('open', '');
    await expect(page.getByRole('button', { name: 'Send my electrical enquiry' })).toBeDisabled();
    await expect(page.locator('.fe-contact-options a[href="tel:+353894032737"]')).toBeVisible();
    await expect(page.locator('.fe-contact-options a[href^="mailto:info@fennor.ie,mikey@fennor.ie"]')).toBeVisible();
    await expectNoOverflow(page, `${route} without JavaScript`);
  }
  await context.close();
});
