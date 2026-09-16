import { chromium } from 'file:///C:/Users/sohai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const report = { pages: [], checks: {}, errors: [] };
const routes = [...(await readFile('dist/sitemap.xml','utf8')).matchAll(/<loc>https:\/\/marymcnutt.com([^<]*)<\/loc>/g)].map(m=>m[1]);
const browser = await chromium.launch({ headless:true, executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
await mkdir('research/qa-refresh', {recursive:true});
for (const [name, viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]) {
  const context = await browser.newContext({viewport});
  const page = await context.newPage();
  page.on('pageerror', error=>report.errors.push({viewport:name,error:error.message}));
  for (const route of routes) {
    const response = await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});
    const facts = await page.evaluate(async()=>{
      const images=[...document.querySelectorAll('img')];
      images.forEach(img=>img.loading='eager');
      await Promise.all(images.map(img=>img.decode().catch(()=>{})));
      const title=document.querySelector('h1');
      const hero=title?.closest('section,header');
      const bounds=title?.getBoundingClientRect();
      const heroBounds=hero?.getBoundingClientRect();
      return {width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,
        h1:document.querySelectorAll('h1').length,
        brokenImages:images.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src),
        headingOutsideHero:heroBounds&&bounds&&(bounds.top<heroBounds.top-1||bounds.bottom>heroBounds.bottom+1),
        title:document.title};
    });
    report.pages.push({route,viewport:name,status:response.status(),...facts});
    if (['/about/','/services/family-coaching/','/blog/','/resources/the-12-steps/','/center-for-excellence/'].includes(route)) {
      await page.screenshot({path:`research/qa-refresh/${route.replaceAll('/','_')}-${name}.png`});
    }
  }
  if(name==='mobile') {
    await page.goto('http://127.0.0.1:4173/coaching/');
    const toggle=page.locator('.menu-toggle');
    await toggle.click();
    report.checks.mobileMenuOpens=await toggle.getAttribute('aria-expanded')==='true';
    await page.keyboard.press('Escape');
    report.checks.mobileMenuEscape=await toggle.getAttribute('aria-expanded')==='false';
    report.checks.menuFocusReturned=await toggle.evaluate(el=>el===document.activeElement);
  }
  await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
await page.goto('http://127.0.0.1:4173/');
await page.locator('.numbers').scrollIntoViewIfNeeded();
await page.waitForTimeout(1400);
report.checks.counterFinals=await page.locator('.stat-ring').evaluateAll(els=>els.every(el=>el.querySelector('.stat-number').textContent===el.dataset.stat&&getComputedStyle(el).getPropertyValue('--ring-progress').trim()==='100'));
report.checks.ratioUnchanged=await page.locator('[data-stat="1:1"] .stat-number').textContent()==='1:1';
await page.locator('.credentials').screenshot({path:'research/qa-refresh/counters-desktop.png'});
const slides=page.locator('[data-slide]');
if(await slides.count()>1){await slides.nth(1).click();report.checks.testimonialControl=await slides.nth(1).getAttribute('aria-pressed')==='true';}
await page.goto('http://127.0.0.1:4173/contact/');
report.checks.formRequiredFields=await page.locator('form').evaluate(form=>!form.checkValidity());
await page.locator('input[required]').evaluateAll(els=>els.forEach(el=>el.value=el.type==='email'?'preview@example.com':'Preview check — do not send'));
await page.locator('textarea[required]').fill('Preview check — do not send.');
// Mailto is a local-client handoff, never a backend message submission.
await page.locator('form button[type=submit]').click();
report.checks.emailDraftFallback=await page.locator('.email-fallback').isVisible();
report.checks.emailDraftContainsMessage=(await page.locator('#email-draft').inputValue()).includes('Preview check');
await context.close();
const reduced=await browser.newContext({reducedMotion:'reduce'});
const reducedPage=await reduced.newPage();
await reducedPage.goto('http://127.0.0.1:4173/');
await reducedPage.locator('.numbers').scrollIntoViewIfNeeded();
report.checks.reducedMotion=await reducedPage.locator('.stat-ring').evaluateAll(els=>els.every(el=>el.querySelector('.stat-number').textContent===el.dataset.stat));
await reduced.close();
const nojs=await browser.newContext({javaScriptEnabled:false});
const nojsPage=await nojs.newPage();
await nojsPage.goto('http://127.0.0.1:4173/');
report.checks.noJavaScriptContent=await nojsPage.locator('h1').isVisible()&&await nojsPage.locator('[data-stat="25+"] .stat-number').textContent()==='25+';
await nojs.close();
const failures=report.pages.filter(r=>r.status!==200||r.scroll>r.width+1||r.h1!==1||r.brokenImages.length||r.headingOutsideHero);
report.failures=failures;
await writeFile('research/qa-refresh/browser-report.json',JSON.stringify(report,null,2));
await browser.close();
console.log(JSON.stringify({pages:report.pages.length,failures,checks:report.checks,errors:report.errors},null,2));
if(failures.length||report.errors.length||Object.values(report.checks).some(v=>!v))process.exitCode=1;
