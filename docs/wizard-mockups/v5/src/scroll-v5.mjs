import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/workspace/heartwood-review/wizard/mockups/v5';
const B = 'http://localhost:8770';
const W = +(process.env.W || 1440), H = +(process.env.H || 900);
const video = process.env.VIDEO === '1';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: W < 500, hasTouch: W < 500,
  ...(video ? { recordVideo: { dir: '/tmp/v5vid', size: { width: W, height: H } } } : {}) });
await ctx.addInitScript(() => { window.__shifts = []; new PerformanceObserver(l => { for (const e of l.getEntries()) window.__shifts.push(e.value); }).observe({ type: 'layout-shift', buffered: true }); });
const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const log = []; const check = (name, ok, extra = '') => { log.push({ name, ok, extra }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); };
const wait = (ms) => p.waitForTimeout(ms);
const state = () => p.evaluate(() => { const h = document.querySelector('.panel.is-on h1'); const r = h.getBoundingClientRect();
  return { y: Math.round(scrollY), panel: document.querySelector('.panel.is-on').id, top: Math.round(r.top), header: document.querySelector('.site-header').offsetHeight, vh: innerHeight, focus: document.activeElement && document.activeElement.id, shifts: (window.__shifts || []).reduce((a, b) => a + b, 0) }; });
const inView = (s) => s.top >= s.header && s.top <= s.vh * 0.6;
const smoothTo = async (y) => { await p.evaluate(async (y) => { const s = scrollY, n = 24; for (let i = 1; i <= n; i++) { scrollTo({ top: s + (y - s) * i / n, behavior: 'instant' }); await new Promise(r => setTimeout(r, 25)); } }, y); };
const settle = async () => { let a = -1, b2 = -2; while (a !== b2) { a = await p.evaluate(() => scrollY); await wait(120); b2 = await p.evaluate(() => scrollY); } };

// 1. Custom Homes, mid-page teaser -> plan step 2
await p.goto(B + '/custom-homes/', { waitUntil: 'networkidle' }); await wait(1200);
const ty = await p.evaluate(() => document.querySelector('.plan-teaser').getBoundingClientRect().top + scrollY - 120);
await smoothTo(ty); await wait(1200);
await p.locator('.land-card[href*="land=yes"]').hover(); await wait(600);
await p.locator('.land-card[href*="land=yes"]').click(); await p.waitForLoadState('networkidle'); await wait(1400);
let s = await state(); check('teaser -> /plan/ opens at top on step 2', s.y === 0 && s.panel === 'panel-place', JSON.stringify(s));
check('deep link focuses the step heading', s.focus === 'place-title', s.focus);
await p.fill('#place', 'Soddy-Daisy'); await wait(500);
await p.locator('label:has(input[name="acres"][value="3-10"])').click(); await wait(700);
await p.locator('.panel.is-on [data-go="next"]').click(); await wait(1100);
s = await state(); check('Continue -> step 3 heading in view + focused', inView(s) && s.focus === 'terrain-title', JSON.stringify(s));
for (const [n, v] of [['terrain', 'gentle'], ['cover', 'partly']]) { const L = p.locator(`label:has(input[name="${n}"][value="${v}"])`); await L.evaluate(el => { const r = el.getBoundingClientRect(); if (r.top < 120 || r.bottom > innerHeight - 160) scrollBy({ top: r.top - innerHeight / 3, behavior: 'instant' }); }); await settle(); const y0 = (await state()).y; const bb = await L.boundingBox(); await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await wait(800); const y1 = (await state()).y; check(`pick ${n}=${v} does not scroll`, y0 === y1, `${y0}->${y1}`); }
await p.locator('.panel.is-on [data-go="next"]').click(); await wait(1100);
// utilities: long step; scroll down to answer, then Continue from the bottom
const uy = await p.evaluate(() => document.querySelector('.panel.is-on [data-go="next"]').getBoundingClientRect().top + scrollY - innerHeight + 140);
await smoothTo(uy); await wait(700);
for (const [n, v] of [['access', 'gravel'], ['power', 'yes'], ['water', 'well'], ['sewer', 'septic']]) { const L = p.locator(`label:has(input[name="${n}"][value="${v}"])`); await L.evaluate(el => { const r = el.getBoundingClientRect(); if (r.top < 120 || r.bottom > innerHeight - 160) scrollBy({ top: r.top - innerHeight / 3, behavior: 'instant' }); }); await settle(); const y0 = (await state()).y; const bb = await L.boundingBox(); await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await wait(550); const y1 = (await state()).y; check(`pick ${n}=${v} does not scroll`, y0 === y1, `${y0}->${y1}`); }
s = await state(); check('scrolled down on the utilities step', s.y > 0, 'y=' + s.y);
await p.locator('.panel.is-on [data-go="next"]').click(); await wait(1300);
s = await state(); check('Continue from the bottom -> new heading brought into view + focused', inView(s) && s.focus === 'type-title', JSON.stringify(s));
await p.locator('label:has(input[name="type"][value="cabin"])').click(); await wait(1500);
await p.locator('.panel.is-on [data-go="back"]').click(); await wait(1300);
s = await state(); check('Back -> previous heading in view + focused', inView(s) && s.focus === 'utilities-title', JSON.stringify(s));
await p.locator('.panel.is-on [data-go="next"]').click(); await wait(1500);
s = await state(); check('Continue again -> type step in view', inView(s), JSON.stringify(s));
check('CLS 0 on /plan/ through the run', s.shifts === 0, 'cls=' + s.shifts);
if (!video) {
  // 2. Leave and come back (bfcache / history): opens at top
  await smoothTo(300); await p.goBack(); await wait(800); await p.goForward(); await wait(1200);
  s = await state(); check('history back/forward -> /plan/ at top', s.y === 0, JSON.stringify(s));
  await smoothTo(250); await p.reload({ waitUntil: 'networkidle' }); await wait(900);
  s = await state(); check('reload while scrolled -> top', s.y === 0, JSON.stringify(s));
  // 3. Project CTA -> type preselected
  await p.goto(B + '/projects/spring-city-lake-house/', { waitUntil: 'networkidle' });
  await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })); await wait(600);
  await p.locator('.close-band a.btn').click(); await p.waitForLoadState('networkidle'); await wait(1200);
  s = await state(); const type = await p.evaluate(() => document.querySelector('input[name=type]:checked')?.value);
  check('project CTA -> /plan/?type=lake at top, step 1, lake preselected', s.y === 0 && s.panel === 'panel-land' && type === 'lake', JSON.stringify({ ...s, type }));
  check('plain visit does not steal focus', s.focus !== 'land-title', s.focus);
  // 4. Header "Plan your home" on /plan/ does not restart
  await p.locator('label:has(input[name="land"][value="no"])').click(); await p.locator('.panel.is-on [data-go="next"]').click(); await wait(600);
  if (W > 1000) { await smoothTo(400); await p.locator('.site-header [data-plan-here]').click(); await wait(500);
  s = await state(); check('header Plan your home on /plan/ keeps the step, brings it into view', s.panel === 'panel-type' && inView(s), JSON.stringify(s)); }
}
check('no console errors', errs.length === 0, errs.join(' | '));
fs.writeFileSync(`${OUT}/_scroll-check-${W}${video ? '-video' : ''}.json`, JSON.stringify(log, null, 2));
await ctx.close(); await b.close();
