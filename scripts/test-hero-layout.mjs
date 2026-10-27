import assert from 'node:assert/strict';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });

for (const viewport of [{ width: 1852, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.hero-copy').evaluate(element => {
    const stress = document.createElement('p');
    stress.textContent = 'A high-performance transformational coach for life, business, and personal development. Together, we turn insight into action so you can move forward with clarity. What would you attempt if you knew you could not fail? Make it happen.';
    element.insertBefore(stress, element.querySelector('.button-row'));
  });
  const geometry = await page.evaluate(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect();
    const hero = rect('.hero');
    const header = rect('.site-header');
    const photo = rect('.hero-photo');
    const actions = rect('.hero .button-row');
    const services = rect('.services');
    return {
      heroTop: hero.top,
      heroBottom: hero.bottom,
      headerBottom: header.bottom,
      photoTop: photo.top,
      photoBottom: photo.bottom,
      photoHeight: photo.height,
      actionsBottom: actions.bottom,
      servicesTop: services.top,
      viewportWidth: innerWidth,
      documentWidth: document.documentElement.scrollWidth
    };
  });
  assert.ok(Math.abs(geometry.photoTop - geometry.heroTop) < 1, `photo must start at hero top: ${JSON.stringify(geometry)}`);
  assert.ok(Math.abs(geometry.headerBottom - geometry.heroTop) < 1, `hero must start below header: ${JSON.stringify(geometry)}`);
  if (viewport.width > 800) {
    assert.ok(geometry.photoHeight <= viewport.width * 0.57, `desktop portrait must retain its wide scale: ${JSON.stringify(geometry)}`);
  } else {
    assert.ok(Math.abs(geometry.photoBottom - geometry.heroBottom) < 1, `mobile photo must fill hero height: ${JSON.stringify(geometry)}`);
  }
  assert.ok(geometry.actionsBottom <= geometry.heroBottom, `actions must remain inside hero: ${JSON.stringify(geometry)}`);
  assert.ok(geometry.servicesTop >= geometry.actionsBottom, `services must follow hero actions: ${JSON.stringify(geometry)}`);
  assert.equal(geometry.documentWidth, geometry.viewportWidth, `page must not overflow horizontally: ${JSON.stringify(geometry)}`);
  console.log(`${viewport.width}px hero geometry`, geometry);
  if (process.env.HERO_SCREENSHOTS_DIR) {
    await page.screenshot({ path: path.join(process.env.HERO_SCREENSHOTS_DIR, `hero-fill-${viewport.width}.png`), fullPage: false });
  }
  await page.close();
}

await browser.close();
console.log('Responsive hero fill checks passed.');
