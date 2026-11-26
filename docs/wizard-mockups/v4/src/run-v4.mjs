import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/workspace/heartwood-review/wizard/mockups/v4';
const URL = 'http://localhost:8765/plan.html';
const mode = process.argv[2] || 'desktop';   // desktop | mobile | reduced
const W = mode === 'mobile' ? 390 : 1440, H = mode === 'mobile' ? 844 : (process.env.VH ? +process.env.VH : 1080);
const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: W, height: H }, deviceScaleFactor: mode === 'mobile' ? 3 : 1,
  reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
  ...(mode === 'desktop' ? { recordVideo: { dir: '/tmp/v3video', size: { width: 1440, height: (process.env.VH ? +process.env.VH : 1080) } } } : {}),
});
await ctx.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver(list => {
    for (const e of list.getEntries()) window.__shifts.push({ value: e.value, recent: e.hadRecentInput, t: Math.round(e.startTime),
      src: (e.sources || []).map(s => (s.node && (s.node.id || s.node.className || s.node.nodeName)) + ` ${JSON.stringify(s.previousRect)}→${JSON.stringify(s.currentRect)}`) });
  }).observe({ type: 'layout-shift', buffered: true });
});
const p = await ctx.newPage(); const T0 = Date.now();
const errs = [];
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type()==='warning') errs.push(m.text()); });
await p.goto(URL); await p.waitForTimeout(900);
const pause = (ms = 700) => p.waitForTimeout(mode === 'desktop' ? ms : 250);
const pick = async (name, value) => { await p.locator(`label:has(input[name="${name}"][value="${value}"])`).click(); await pause(); };
const next = async () => { await p.locator('.panel.is-on [data-go="next"]').click(); await pause(500); };
const tiles = [];
const tile = async (cap) => { if (mode !== 'desktop') return; const f = `${OUT}/_tile-${tiles.length}.png`; await p.locator('#sketch-rail').screenshot({ path: f }); tiles.push({ f, cap }); };
const shot = async (n) => { if (mode === 'reduced') return; if (mode === 'mobile') await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(mode==='mobile'?200:0); await p.screenshot({ path: `${OUT}/${W}-${n}.png`, fullPage: false }); if (mode === 'mobile' && n === '08-plans') { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(200); await p.screenshot({ path: `${OUT}/${W}-08-plans-scrolled.png` }); } };

fs.writeFileSync(OUT + '/_railbox-' + mode + '.json', JSON.stringify(await p.locator('#sketch-rail').boundingBox())); await tile('Before any answers');
await pick('land', 'yes'); await shot('01-land'); await next();
await p.fill('#place', 'Sale Creek, Hamilton County'); await pause(300);
await p.fill('#parcel', 'https://maps.app.goo.gl/sale-creek-lot'); await pause(300);
await pick('acres', '3-10'); await shot('02-where'); await next();
await pick('terrain', 'water'); await tile('Waterfront');
await pick('cover', 'heavy'); await tile('Heavily wooded'); await shot('03-ground'); await next();
await pick('access', 'paved'); await pick('power', 'yes'); await pick('water', 'well'); await pick('sewer', 'septic'); await pick('internet', 'yes'); await pick('structure', 'no');
await tile('Paved drive, power, a well, septic'); await shot('04-utilities'); await next();
await pick('type', process.env.TYPE || 'lake'); await pause(600); await tile('A lake house appears'); await shot('05-type'); await next();
for (const [k, n] of [['beds', 2], ['baths', 2]]) for (let i = 0; i < n; i++) { await p.locator(`[data-stepper="${k}"] [data-dir="1"]`).click(); await pause(250); }
await pick('stories', '2'); await pause(500); await tile('Two stories'); await shot('06-size'); await next();
await p.locator('label:has(input[name="who"][value="us"])').click(); await pick('use', 'second'); await shot('07-people'); await next();
await pick('plans', 'sketch'); await shot('08a-plans-attach');
for (const n of ['porch', 'deck', 'garage']) await p.locator(`label:has(input[name="need"][value="${n}"])`).click(), await pause(450);
await tile('Porch, deck, garage');
await p.locator('label:has(input[name="need"][value="basement"])').click(); await pause(900); await tile('Walkout: stepped grade, patio below');
await p.locator('label:has(input[name="need"][value="shop"])').click(); await pause(900); await tile('A shop on the lower grade');
await shot('08-plans'); await next();
await pick('budget', 'comfortable'); await pick('pay', 'loan'); await shot('09-money'); await next();
await pick('timing', 'next'); await pick('sell', 'no'); await shot('10-timing');
fs.writeFileSync(OUT + '/_video-marks.json', JSON.stringify({ briefAt: (Date.now() - T0) / 1000 })); await p.locator('.panel.is-on [data-go="brief"]').click(); await p.waitForTimeout(mode === 'desktop' ? 2600 : 600);
await shot('11-brief-fold');
if (mode !== 'reduced') await p.screenshot({ path: `${OUT}/${W}-11-brief.png`, fullPage: true });
if (mode === 'reduced') await p.locator('#brief-sketch-slot').screenshot({ path: `${OUT}/_reduced-brief-sketch.png` });
const shifts = await p.evaluate(() => window.__shifts);
const cls = shifts.filter(s => !s.recent).reduce((a, s) => a + s.value, 0);
const all = shifts.reduce((a, s) => a + s.value, 0);
const res = { mode, cls, allShiftsIncludingInput: all, count: shifts.length, shifts, errs };
fs.writeFileSync(`${OUT}/_cls-${mode}.json`, JSON.stringify(res, null, 2));
fs.writeFileSync(`${OUT}/_tiles.json`, JSON.stringify(tiles));
console.log(JSON.stringify({ mode, cls, all, count: shifts.length, errs }, null, 1));
await ctx.close(); await b.close();
