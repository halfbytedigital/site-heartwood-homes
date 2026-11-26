import { chromium } from 'playwright';
const OUT = '/workspace/heartwood-review/wizard/mockups/v5';
const B = 'http://localhost:8770';
const b = await chromium.launch();
const errs = [];
async function page(w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1, isMobile: w < 500, hasTouch: w < 500 });
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(w + ' ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(w + ' ' + m.text()); });
  return p;
}
async function settle(p) { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } }); await p.waitForTimeout(400); }
async function section(p, sel, file, pad = 0) {
  const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
  const bb = await el.boundingBox(); const vw = p.viewportSize().width;
  await p.screenshot({ path: `${OUT}/${file}`, fullPage: true, clip: { x: 0, y: Math.max(0, bb.y + await p.evaluate(() => scrollY) - pad), width: vw, height: bb.height + pad * 2 } });
}
for (const [w, h] of [[1440, 900], [390, 844]]) {
  let p = await page(w, h);
  await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/${w}-home-header-hero.png` });
  await settle(p); await section(p, '[data-scrubber]', `${w}-home-scrubber.png`);
  await p.locator('[data-stop="3"]').click({ force: true }).catch(() => {}); await p.waitForTimeout(900);
  await section(p, '[data-scrubber]', `${w}-home-scrubber-finish.png`);
  await p.goto(B + '/custom-homes/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/${w}-custom-hero.png` });
  await settle(p);
  await section(p, '[aria-labelledby="path-title"]', `${w}-custom-what-are-you-looking-to-do.png`);
  await section(p, '.plan-teaser', `${w}-custom-teaser-land.png`);
  { const y = await p.evaluate(() => { const q = [...document.querySelectorAll('h2')].find(h => /Questions we hear/.test(h.textContent)); return q.closest('section').getBoundingClientRect().top + scrollY; });
    const y2 = await p.evaluate(() => document.querySelector('.close-band').getBoundingClientRect().bottom + scrollY);
    await p.screenshot({ path: `${OUT}/${w}-custom-bottom-no-form.png`, fullPage: true, clip: { x: 0, y, width: p.viewportSize().width, height: y2 - y } }); }
  if (w < 500) { await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.evaluate(() => scrollTo({ top: 1400, behavior: 'instant' })); await p.waitForTimeout(900); await p.screenshot({ path: `${OUT}/390-home-bottom-bar.png` }); }
  await p.goto(B + '/projects/ten-mile-lake-house/', { waitUntil: 'networkidle' }); await settle(p);
  await section(p, '.close-band', `${w}-project-cta-ten-mile.png`);
  await p.goto(B + '/plan/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/${w}-plan-step1.png` });
  await p.locator('label:has(input[name="land"][value="no"])').click(); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/${w}-plan-step1-still-looking.png` });
  if (w < 500) { await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.locator('.menu-toggle').click(); await p.waitForTimeout(500); await p.screenshot({ path: `${OUT}/390-home-menu-open.png` }); }
  await p.context().close();
}
console.log(errs.join('\n') || 'no errors');
await b.close();
