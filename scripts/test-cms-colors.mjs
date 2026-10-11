import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

// Local-only fixture: start node scripts/serve-cms-test.mjs before this test.
const base = 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/about/?cms-edit=1`);
  await page.locator('.cms-toolbar').waitFor();
  const target = page.locator('main p[data-cms-key]:not(.breadcrumb)').first();
  const key = await target.getAttribute('data-cms-key');
  const seed = 'Alpha <strong>beta</strong> <a href="/contact/">gamma</a>.<br><br>Second paragraph.';
  const response = await page.request.post(`${base}/rest/v1/cms_content`, {
    headers: { Authorization: 'Bearer test-token' },
    data: { page_path: '/about/', element_key: key, element_type: 'text', value: { html: seed } }
  });
  assert.equal(response.ok(), true);
  await page.reload();
  await page.locator('.cms-toolbar').waitFor();
  await target.click();
  const editor = page.locator('[data-cms-text]');
  const select = async (start, end) => {
    await editor.evaluate((node, offsets) => {
      node.focus();
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let position = 0, started = false;
      while (walker.nextNode()) {
        const text = walker.currentNode;
        if (!started && offsets.start < position + text.length) {
          range.setStart(text, offsets.start - position); started = true;
        }
        if (started && offsets.end <= position + text.length) {
          range.setEnd(text, offsets.end - position); break;
        }
        position += text.length;
      }
      getSelection().removeAllRanges(); getSelection().addRange(range);
      document.dispatchEvent(new Event('selectionchange'));
    }, { start, end });
  };
  const applyColor = async (color, scope) => {
    if (!(await page.locator('[data-color-panel]').isVisible())) await page.locator('[data-color-toggle]').click();
    await page.locator('[data-text-color]').fill(color);
    await page.locator('[data-color-scope]').selectOption(scope);
    assert.equal(await page.locator('[data-color-apply]').isEnabled(), true);
    await page.locator('[data-color-apply]').click();
  };
  const colors = locator => locator.evaluate(node => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT), result = [];
    while (walker.nextNode()) for (const character of walker.currentNode.data) result.push({ character, color: getComputedStyle(walker.currentNode.parentElement).color });
    return result;
  });
  const assertColors = async (locator, start, end, color) => {
    const value = await colors(locator);
    assert.deepEqual(value.slice(start, end).map(item => item.color), Array(end - start).fill(color));
  };
  const save = async () => {
    await page.locator('[data-cms-save]').click();
    await page.getByRole('button', { name: 'Saved', exact: true }).waitFor();
  };

  // A view choice is mandatory; moving focus through picker/menu keeps selection.
  await page.locator('[data-color-toggle]').click();
  assert.equal(await page.locator('[data-color-apply]').isDisabled(), true);
  await select(6, 10);
  assert.equal(await page.locator('[data-color-apply]').isDisabled(), true);
  await applyColor('#aa1122', 'both');
  await assertColors(target, 6, 10, 'rgb(170, 17, 34)');
  assert.equal(await target.locator('strong').innerText(), 'beta');

  // Overlap a single letter on mobile, then a phrase spanning bold runs on desktop.
  await select(7, 8);
  await applyColor('#1122cc', 'mobile');
  await assertColors(editor, 7, 8, 'rgb(17, 34, 204)');
  await assertColors(target, 7, 8, 'rgb(170, 17, 34)');
  await select(0, 10);
  await applyColor('#116633', 'desktop');
  await assertColors(target, 0, 10, 'rgb(17, 102, 51)');
  // Formatting after coloring must preserve scoped color metadata too.
  await select(11, 16);
  await page.getByRole('button', { name: 'Italic', exact: true }).click();
  await applyColor('#884400', 'both');
  assert.equal(await target.locator('a').getAttribute('href'), '/contact/');
  assert.equal(await target.locator('i,em').innerText(), 'gamma');
  await save();

  for (const width of [1280, 801, 800, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/about/`);
    await page.locator(`[data-cms-key="${key}"] [data-cms-color-desktop]`).first().waitFor();
    if (width > 800) await assertColors(target, 0, 10, 'rgb(17, 102, 51)');
    else {
      await assertColors(target, 6, 7, 'rgb(170, 17, 34)');
      await assertColors(target, 7, 8, 'rgb(17, 34, 204)');
      await assertColors(target, 8, 10, 'rgb(170, 17, 34)');
      assert.notEqual((await colors(target))[0].color, 'rgb(17, 102, 51)', 'Desktop-only color must not leak onto mobile');
    }
    await assertColors(target, 11, 16, 'rgb(136, 68, 0)');
    assert.equal(await target.innerText(), 'Alpha beta gamma.\n\nSecond paragraph.');
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${base}/about/?cms-edit=1`);
  await page.locator('.cms-toolbar').waitFor();
  await target.click();
  const before = await target.innerHTML();
  await select(0, 34);
  await applyColor('#663399', 'both');
  await assertColors(target, 0, 34, 'rgb(102, 51, 153)');
  await page.locator('[data-cms-cancel]').click();
  assert.equal(await target.innerHTML(), before, 'Cancel restores all per-view colors and inline formatting');

  // Recolor all text and persist, replacing prior mobile/desktop overrides.
  await target.click();
  await select(0, 34);
  await applyColor('#663399', 'both');
  await mkdir('research/qa-cms', { recursive: true });
  await page.locator('.cms-inspector').screenshot({ path: 'research/qa-cms/colors-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.cms-inspector').screenshot({ path: 'research/qa-cms/colors-mobile.png' });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await save();
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/about/`);
    await page.locator(`[data-cms-key="${key}"] [data-cms-color-desktop]`).first().waitFor();
    await assertColors(target, 0, 34, 'rgb(102, 51, 153)');
    assert.equal(await target.locator('strong').innerText(), 'beta');
    assert.equal(await target.locator('a').getAttribute('href'), '/contact/');
  }
  console.log('Color tests passed: selected words/letters/all text, mandatory view choice, overlapping device colors, breakpoint boundaries, save/reload, recolor, cancel, links/emphasis, and mobile layout.');
} finally { await browser.close(); }
