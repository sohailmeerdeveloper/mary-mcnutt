import { chromium } from "file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const output = new URL("../research/qa-screenshots/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
for (const [name, url] of [
  ["services", "http://127.0.0.1:4173/services/"],
  ["service-family", "http://127.0.0.1:4173/services/family-coaching/"],
  ["resources", "http://127.0.0.1:4173/resources/"],
  ["resource-12-steps", "http://127.0.0.1:4173/resources/the-12-steps/"],
  ["center", "http://127.0.0.1:4173/center-for-excellence/"],
]) {
  for (const [size, viewport] of [["desktop", { width: 1440, height: 1000 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 35));
      }
      window.scrollTo(0, 0);
    });
    await page.screenshot({ path: fileURLToPath(new URL(`${name}-${size}.png`, output)), fullPage: true });
    const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    console.log(`${name} ${size}: ${dimensions.client}/${dimensions.scroll}`);
    await context.close();
  }
}
await browser.close();
