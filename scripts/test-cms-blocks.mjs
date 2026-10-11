import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

// Run against scripts/serve-cms-test.mjs; all writes stay in its local memory.
const base = 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const table of ['cms_content', 'cms_blocks']) {
    const response = await page.request.delete(`${base}/rest/v1/${table}?page_path=eq.%2Fabout%2F`, { headers: { Authorization: 'Bearer test-token' } });
    assert.equal(response.ok(), true);
  }
  await page.goto(`${base}/__richtext-tests__/`);
  await page.locator('#run').click();
  assert.deepEqual(await page.locator('#results li').allTextContents().then(items => items.filter(item => item.startsWith('FAIL'))), []);

  await page.goto(`${base}/about/?cms-edit=1`);
  await page.locator('.cms-toolbar').waitFor();
  const target = page.locator('main p[data-cms-key]:not(.breadcrumb)').first();
  const key = await target.getAttribute('data-cms-key');
  await target.click();
  const editor = page.locator('[data-cms-text]');
  await editor.fill('First  paragraph.');
  await editor.press('End');
  await editor.press('Enter');
  await editor.press('Enter');
  await editor.pressSequentially('Second paragraph.');
  await editor.press('Enter');
  await editor.press('Enter');
  await editor.pressSequentially('Third paragraph.');
  const expected = 'First  paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
  assert.equal(await target.innerText(), expected);
  await page.locator('[data-cms-save]').click();
  await page.getByRole('button', { name: 'Saved', exact: true }).waitFor();
  await page.goto(`${base}/about/`);
  await page.locator(`[data-cms-key="${key}"].cms-rich-content`).waitFor();
  assert.equal(await target.innerText(), expected, 'Saved paragraphs and repeated spaces survive visitor reload');

  // Raw newline text from pasting and older plain-text saves must render too.
  const raw = await page.evaluate(() => {
    const node = document.createElement('p');
    node.innerHTML = 'One <strong>two</strong> three';
    document.querySelector('main').append(node);
    MaryRichText.apply(node, { text: 'One  two\n\nthree' });
    const legacy = node.innerText;
    const bold = node.querySelector('strong')?.textContent;
    MaryRichText.apply(node, { html: 'Pasted  first\n\nPasted second\nThird' });
    const pasted = node.innerText;
    node.remove();
    return { legacy, bold, pasted };
  });
  assert.equal(raw.legacy, 'One  two\n\nthree');
  assert.equal(raw.bold, 'two');
  assert.equal(raw.pasted, 'Pasted  first\n\nPasted second\nThird');

  await page.goto(`${base}/about/?cms-edit=1`);
  await page.locator('.cms-toolbar').waitFor();
  const add = page.locator('[data-cms-add]');
  await add.click();
  await page.locator('[data-block-text]').fill('Cancel this block');
  assert.equal(await page.locator('[data-provisional]').count(), 1);
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  assert.equal(await page.locator('[data-provisional]').count(), 0);
  await add.click();
  await page.locator('[data-block-text]').fill('Discard when selecting existing content');
  await target.click();
  assert.equal(await page.locator('[data-provisional]').count(), 0);
  await page.locator('[data-cms-cancel]').click();

  for (const kind of ['title', 'subheading', 'text', 'button', 'image']) {
    await add.click();
    await page.locator('[data-block-kind]').selectOption(kind);
    await page.locator('[data-block-text]').fill(`${kind} first  line\n\nSecond paragraph`);
    if (kind === 'button') await page.locator('[data-block-link]').fill('/contact/');
    if (kind === 'image') {
      await page.locator('[data-block-file]').setInputFiles('dist/assets/images/mary-ai-about-768.webp');
      await page.waitForFunction(() => !document.querySelector('[data-block-save]').disabled);
    }
    await page.locator('[data-block-save]').click();
    await page.locator('.cms-inspector').waitFor({ state: 'hidden' });
    const block = page.locator('[data-cms-added-block]').last();
    assert.equal(await block.locator('[data-block-delete]').count(), 1, `${kind} is deletable immediately`);
    const content = block.locator('h2,h3,p,figcaption,a.button').first();
    assert.equal((await content.innerText()).toLowerCase(), `${kind} first  line\n\nsecond paragraph`);
  }

  await page.reload();
  await page.locator('.cms-toolbar').waitFor();
  assert.equal(await page.locator('[data-block-delete]').count(), 5, 'All saved block kinds are deletable after reload');
  await mkdir('research/qa-cms', { recursive: true });
  await page.locator('[data-cms-added-block]').last().scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'research/qa-cms/blocks-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-cms-added-block]').last().scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'research/qa-cms/blocks-mobile.png' });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

  const api = '**/rest/v1/cms_blocks*';
  for (const failure of [{ status: 403, body: '{"message":"No permission"}' }, { status: 200, body: '[]' }]) {
    await page.route(api, async route => {
      if (route.request().method() === 'DELETE') await route.fulfill({ ...failure, contentType: 'application/json' });
      else await route.continue();
    });
    await page.locator('[data-block-delete]').last().click();
    await page.waitForFunction(() => document.querySelector('.cms-added-block:last-child [role="status"]').textContent.length > 0);
    assert.equal(await page.locator('[data-cms-added-block]').count(), 5, 'Unconfirmed deletion keeps the block and permits retry');
    assert.equal(await page.locator('[data-block-delete]').last().isEnabled(), true);
    await page.unroute(api);
  }
  while (await page.locator('[data-block-delete]').count()) {
    const block = page.locator('[data-cms-added-block]').last();
    const id = await block.getAttribute('data-cms-added-block');
    await block.locator('[data-block-delete]').click();
    await page.locator(`[data-cms-added-block="${id}"]`).waitFor({ state: 'detached' });
  }
  await page.goto(`${base}/about/`);
  await page.locator(`[data-cms-key="${key}"].cms-rich-content`).waitFor();
  assert.equal(await page.locator('[data-cms-added-block]').count(), 0, 'Deleted blocks stay deleted for visitors');
  assert.equal(await page.locator('[data-block-delete]').count(), 0, 'Visitor pages have no editing controls');
  assert.equal(await target.innerText(), expected);
  console.log('CMS blocks passed: keyboard paragraphs, spaces, legacy/pasted newlines, preview cleanup, all five block kinds, reload, deletion failures/retry, desktop/mobile.');
} finally {
  await browser.close();
}
