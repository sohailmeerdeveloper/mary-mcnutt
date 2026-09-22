import assert from 'node:assert/strict';
import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const browser = await chromium.launch({ headless:true, executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const session = { access_token:'test-token', user:{ id:'test-user', email:'Mary@MaryMcNutt.com' }, expires_at:4102444800 };
const saved = [];

{
  const context = await browser.newContext({ viewport:{ width:1280, height:900 } });
  await context.route('https://hqltzxmqrowllxcvejwe.supabase.co/**', async route => {
    if (route.request().method() === 'POST') saved.push(JSON.parse(route.request().postData() || '{}'));
    const body = route.request().method() === 'POST' ? JSON.stringify([saved.at(-1)]) : route.request().url().includes('/cms_admins') ? '[{"user_id":"test-user"}]' : '[]';
    await route.fulfill({ status:200, contentType:'application/json', body });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(value => localStorage.setItem('mary_cms_session', JSON.stringify(value)), session);
  await page.goto('http://127.0.0.1:4173/?cms-edit=1');
  await page.waitForSelector('.cms-toolbar');
  const title = page.locator('[data-cms-type="text"]:visible').first();
  const original = (await title.innerText()).trim();
  const originalMarkup = await title.innerHTML();
  await title.click();
  const editor = page.locator('[data-cms-text]');
  await editor.fill('A live preview change');
  assert.equal((await title.innerText()).trim(), 'A live preview change');
  assert.equal(await page.locator('[data-cms-save]').isEnabled(), true);
  await page.locator('[data-cms-cancel]').click();
  assert.equal((await title.innerText()).replace(/\s+/g, ' ').trim(), original.replace(/\s+/g, ' ').trim());
  assert.equal(await title.innerHTML(), originalMarkup, 'Cancel must restore inline formatting, not only plain text');
  await title.click();
  await page.locator('[data-cms-text]').fill('A saved preview change');
  await page.locator('[data-cms-save]').click();
  await page.getByRole('button', { name:'Saved', exact:true }).waitFor();
  assert.equal(saved.at(-1).value.text, 'A saved preview change');
  assert.equal(saved.at(-1).value.html, 'A saved preview change');
  assert.equal(saved.at(-1).page_path, '/');
  await page.locator('[data-cms-text]').fill('An auto-saved exit change');
  await page.locator('[data-cms-exit]').click();
  await page.waitForURL('**/admin/');
  assert.equal(saved.at(-1).value.text, 'An auto-saved exit change');
  await context.close();
}

{
  const context = await browser.newContext({ viewport:{ width:1280, height:900 } });
  await context.route('https://hqltzxmqrowllxcvejwe.supabase.co/**', async route => {
    const url = route.request().url();
    const body = url.includes('/cms_admins') ? '[{"user_id":"test-user"}]' : '[]';
    await route.fulfill({ status:200, contentType:'application/json', body });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/admin/');
  await page.evaluate(value => localStorage.setItem('mary_cms_session', JSON.stringify(value)), session);
  await page.reload();
  await page.locator('[data-view="blog"]').click();
  await page.locator('[name="title"]').fill('A New Beginning');
  await page.locator('[name="excerpt"]').fill('A short and useful article summary.');
  await page.locator('[name="body"]').fill('The opening paragraph.');
  assert.equal(await page.locator('#preview-title').innerText(), 'A New Beginning');
  assert.equal(await page.locator('#post-form button[type="submit"]').isEnabled(), true);
  await page.locator('#link-label').fill('Helpful resource');
  await page.locator('#link-url').fill('https://example.com/resource');
  await page.locator('#insert-link').click();
  assert.match(await page.locator('[name="body"]').inputValue(), /\[Helpful resource\]\(https:\/\/example.com\/resource\)/);
  await context.close();
}

await browser.close();
console.log('CMS interaction tests passed: live preview, cancel, save, exit auto-save, blog preview, and link insertion.');
