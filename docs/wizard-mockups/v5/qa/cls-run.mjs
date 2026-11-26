#!/usr/bin/env node
// C33 zero-layout-shift check. Drives an interactive page with Playwright and fails if CLS > 0.
// Usage: node cls-run.mjs --url http://localhost:4321/plan/ --steps ./plan-steps.mjs --out brief/review
//   --steps: a module whose default export is `async (page, { pause }) => { ... }` that clicks
//            through the whole flow (every step, to the final screen). Use real clicks/fills.
// Runs desktop 1440x1080, mobile 390x844, and desktop with reduced motion. Writes
// <out>/cls-{desktop,mobile,reduced}.json (total + every shift with its sources).
// Run on an otherwise idle machine: a starved CPU can delay a web font past the optional window.
// Needs: npm i -D playwright && npx playwright install chromium
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => {
  if (v.startsWith('--')) a.push([v.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]); return a; }, []));
if (!args.url || !args.steps) { console.error('need --url and --steps'); process.exit(2); }
const OUT = args.out || 'review'; fs.mkdirSync(OUT, { recursive: true });
const steps = (await import(pathToFileURL(path.resolve(args.steps)).href)).default;

const MODES = [
  { name: 'desktop', viewport: { width: 1440, height: 1080 }, reducedMotion: 'no-preference' },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' },
  { name: 'reduced', viewport: { width: 1440, height: 1080 }, reducedMotion: 'reduce' },
];
const browser = await chromium.launch();
let failed = false;
for (const m of MODES) {
  const { name, ...opts } = m;
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver(list => {
      for (const e of list.getEntries()) window.__shifts.push({
        value: e.value, hadRecentInput: e.hadRecentInput, t: Math.round(e.startTime),
        sources: (e.sources || []).map(s => `${s.node ? (s.node.id || s.node.className || s.node.nodeName) : '?'} ${JSON.stringify(s.previousRect)} -> ${JSON.stringify(s.currentRect)}`),
      });
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto(args.url, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const pause = (ms = 500) => page.waitForTimeout(name === 'desktop' ? ms : Math.min(ms, 250));
  await steps(page, { pause, mode: name });
  await page.waitForTimeout(1500);
  const shifts = await page.evaluate(() => window.__shifts);
  const cls = shifts.filter(s => !s.hadRecentInput).reduce((a, s) => a + s.value, 0);
  const all = shifts.reduce((a, s) => a + s.value, 0);
  const res = { mode: name, cls, allShiftsIncludingInput: all, count: shifts.length, shifts, errors };
  fs.writeFileSync(path.join(OUT, `cls-${name}.json`), JSON.stringify(res, null, 2));
  console.log(`${name}: CLS ${cls} (${shifts.length} entries, ${errors.length} errors)`);
  if (all > 0 || errors.length) failed = true;   // target is zero, input-driven shifts included
  await ctx.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
