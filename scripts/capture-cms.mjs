import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const output = new URL('../research/qa-cms/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [size, viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]) {
  const context = await browser.newContext({ viewport });
  await context.route('https://hqltzxmqrowllxcvejwe.supabase.co/**', route => route.abort());
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/admin/', { waitUntil:'networkidle' });
  await page.screenshot({ path:fileURLToPath(new URL(`login-${size}.png`, output)), fullPage:true });
  await page.evaluate(() => localStorage.setItem('mary_cms_session', JSON.stringify({ access_token:'visual-review', user:{ id:'review', email:'Mary@MaryMcNutt.com' }, expires_at:4102444800 })));
  await page.reload({ waitUntil:'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path:fileURLToPath(new URL(`dashboard-${size}.png`, output)), fullPage:true });
  const layout = await page.evaluate(() => ({ client:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth, height:document.body.scrollHeight }));
  console.log(`${size}: ${JSON.stringify(layout)}`);
  await context.close();
}
for (const [size, viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]) {
  const context = await browser.newContext({ viewport });
  await context.route('https://hqltzxmqrowllxcvejwe.supabase.co/**', route => route.abort());
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil:'domcontentloaded' });
  await page.evaluate(() => localStorage.setItem('mary_cms_session', JSON.stringify({ access_token:'visual-review', user:{ id:'review', email:'Mary@MaryMcNutt.com' }, expires_at:4102444800 })));
  await page.goto('http://127.0.0.1:4173/?cms-edit=1', { waitUntil:'domcontentloaded' });
  await page.waitForSelector('.cms-toolbar', { timeout:10000 });
  await page.locator('[data-cms-type="text"]:visible').first().click();
  await page.screenshot({ path:fileURLToPath(new URL(`editor-${size}.png`, output)), fullPage:false });
  await context.close();
}
await browser.close();
