import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = '/Users/jakejohnson/www/halfbyte/site-heartwood-homes/sites/heartwood-homes/brief/review';
const SHOTS = path.join(OUT, 'plan-fixes');
const base = 'http://127.0.0.1:4321';
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function page(w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  return ctx.newPage();
}

const height = { viewports: [] };
for (const vp of [{ w: 1440, h: 900, name: '1440' }, { w: 390, h: 844, name: '390' }]) {
  const p = await page(vp.w, vp.h);
  await p.goto(base + '/plan/', { waitUntil: 'load' });
  await p.waitForTimeout(200);
  const steps = [];
  const seen = new Set();
  const note = async () => {
    const m = await p.evaluate(() => {
      const panels = document.querySelector('.panels');
      const on = document.querySelector('.panel.is-on');
      const footer = document.querySelector('.site-footer');
      const ph = panels.getBoundingClientRect().height;
      const oh = on.getBoundingClientRect().height;
      return {
        step: on.id.replace('panel-', ''),
        panels: Math.round(ph * 100) / 100,
        panel: Math.round(oh * 100) / 100,
        delta: Math.round(Math.abs(ph - oh) * 100) / 100,
        gap: Math.round((footer.getBoundingClientRect().top - on.getBoundingClientRect().bottom) * 100) / 100,
      };
    });
    const i = steps.findIndex((s) => s.step === m.step);
    if (i === -1) steps.push(m);
    else steps[i] = m;
    seen.add(m.step);
  };
  await note();
  const mod = await import(OUT + '/plan-steps.mjs');
  await mod.default(p, { pause: async (ms = 120) => { await p.waitForTimeout(Math.min(ms, 180)); await note(); } });
  const land = steps.find((s) => s.step === 'land');
  height.viewports.push({
    viewport: vp.name,
    steps,
    pass: steps.every((s) => s.delta <= 2) && land.gap <= 160,
  });
  await p.context().close();
}
fs.writeFileSync(path.join(OUT, 'plan-height.json'), JSON.stringify(height, null, 2));
console.log(JSON.stringify(height.viewports.map((v) => ({ viewport: v.viewport, pass: v.pass, land: v.steps[0], deltas: v.steps.map((s) => s.delta) })), null, 2));

const shot = async (url, file, w, h) => {
  const p = await page(w, h);
  await p.goto(base + url, { waitUntil: 'load' });
  await p.waitForTimeout(350);
  await p.screenshot({ path: path.join(SHOTS, file), fullPage: true });
  await p.context().close();
};
await shot('/plan/', 'plan-step1-1440.png', 1440, 900);
await shot('/plan/', 'plan-step1-390.png', 390, 844);
await shot('/plan/#q-type', 'plan-q-type-1440.png', 1440, 900);
await shot('/plan/#q-type', 'plan-q-type-390.png', 390, 844);

for (const vp of [{ w: 1440, h: 900, tag: '1440' }, { w: 390, h: 844, tag: '390' }]) {
  const p = await page(vp.w, vp.h);
  await p.goto(base + '/plan/#q-brief', { waitUntil: 'load' });
  await p.waitForTimeout(400);
  const info = await p.evaluate(() => {
    const lede = document.querySelector('#panel-brief .brief-copy .lede');
    const r = lede.getBoundingClientRect();
    return { step: document.querySelector('.panel.is-on').id, y: r.y, margin: getComputedStyle(lede).marginBottom };
  });
  console.log('brief', vp.tag, info);
  await p.screenshot({
    path: path.join(SHOTS, `brief-lede-${vp.tag}.png`),
    clip: { x: 0, y: Math.max(0, info.y - 140), width: vp.w, height: 420 },
  });
  await p.context().close();
}

{
  const p = await page(390, 844);
  await p.goto(base + '/renovations/', { waitUntil: 'load' });
  const bar = await p.locator('.action-bar').boundingBox();
  await p.screenshot({
    path: path.join(SHOTS, 'renovations-bar-390.png'),
    clip: { x: 0, y: Math.max(0, bar.y - 20), width: 390, height: 844 - Math.max(0, bar.y - 20) },
  });
  await p.context().close();
}
for (const vp of [{ w: 1440, h: 900, tag: '1440' }, { w: 390, h: 844, tag: '390' }]) {
  const p = await page(vp.w, vp.h);
  await p.goto(base + '/projects/signal-mountain-renovation/', { waitUntil: 'load' });
  await p.waitForTimeout(250);
  const band = await p.locator('.close-band').boundingBox();
  await p.screenshot({
    path: path.join(SHOTS, `renovation-close-${vp.tag}.png`),
    clip: { x: 0, y: Math.max(0, band.y), width: vp.w, height: Math.min(vp.h, band.height + 2) },
  });
  await p.context().close();
}
{
  const p = await page(390, 844);
  await p.goto(base + '/', { waitUntil: 'load' });
  await p.screenshot({ path: path.join(SHOTS, 'hamburger-closed-390.png'), clip: { x: 0, y: 0, width: 390, height: 90 } });
  await p.locator('button.menu-toggle').click();
  await p.waitForTimeout(90);
  await p.screenshot({ path: path.join(SHOTS, 'hamburger-mid-390.png') });
  await p.waitForTimeout(240);
  await p.screenshot({ path: path.join(SHOTS, 'hamburger-open-390.png'), clip: { x: 0, y: 0, width: 390, height: 520 } });
  await p.context().close();
}
await browser.close();
console.log('done');
