import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = '/Users/jakejohnson/www/halfbyte/site-heartwood-homes/sites/heartwood-homes/brief/review';
const SHOTS = path.join(OUT, 'plan-fixes');
fs.mkdirSync(SHOTS, { recursive: true });
const base = 'http://127.0.0.1:4321';

const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function fonts(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  return page.evaluate(() => performance.getEntriesByType('resource')
    .filter((e) => /font|woff/i.test(e.name))
    .map((e) => e.name));
}

async function measure(page) {
  return page.evaluate(() => {
    const panels = document.querySelector('.panels');
    const on = document.querySelector('.panel.is-on');
    const footer = document.querySelector('.site-footer');
    const ph = panels.getBoundingClientRect().height;
    const oh = on.getBoundingClientRect().height;
    return {
      step: on?.id?.replace('panel-', '') ?? '',
      panels: Math.round(ph * 100) / 100,
      panel: Math.round(oh * 100) / 100,
      delta: Math.round(Math.abs(ph - oh) * 100) / 100,
      gap: Math.round((footer.getBoundingClientRect().top - on.getBoundingClientRect().bottom) * 100) / 100,
    };
  });
}

const height = { viewports: [] };
for (const vp of [{ w: 1440, h: 900, name: '1440' }, { w: 390, h: 844, name: '390' }]) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto(base + '/plan/', { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const steps = [];
  const seen = new Set();
  const note = async () => {
    const m = await measure(page);
    if (!seen.has(m.step)) { seen.add(m.step); steps.push(m); }
    else {
      const i = steps.findIndex((s) => s.step === m.step);
      steps[i] = m;
    }
  };
  await note();
  const mod = await import('/Users/jakejohnson/www/halfbyte/site-heartwood-homes/sites/heartwood-homes/brief/review/plan-steps.mjs');
  await mod.default(page, { pause: async (ms = 200) => { await page.waitForTimeout(Math.min(ms, 250)); await note(); } });
  height.viewports.push({
    viewport: vp.name,
    steps,
    pass: steps.every((s) => s.delta <= 2) && (steps.find((s) => s.step === 'land')?.gap ?? 999) <= 160,
  });
  await page.close();
}
fs.writeFileSync(path.join(OUT, 'plan-height.json'), JSON.stringify(height, null, 2));

const fontReport = {};
for (const url of ['/', '/plan/']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  fontReport[url] = await fonts(page, base + url);
  await page.close();
}
fs.writeFileSync(path.join(OUT, 'font-resources.json'), JSON.stringify(fontReport, null, 2));

async function menuCheck(reduced) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  const shifts = [];
  await page.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__shifts.push({ value: e.value, recent: e.hadRecentInput });
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForTimeout(200);
  const button = page.locator('button.menu-toggle');
  const box = await button.boundingBox();
  const before = await button.evaluate((el) => ({
    label: el.getAttribute('aria-label'),
    expanded: el.getAttribute('aria-expanded'),
    controls: el.getAttribute('aria-controls'),
    w: el.getBoundingClientRect().width,
    h: el.getBoundingClientRect().height,
  }));
  const headerClosed = await page.locator('.site-header').evaluate((el) => el.getBoundingClientRect().height);
  const duration = await page.locator('#mobile-nav').evaluate((el) => getComputedStyle(el).transitionDuration);
  await button.click();
  if (!reduced) await page.waitForTimeout(90);
  const midOpen = await page.locator('#mobile-nav').evaluate((el) => {
    const rows = getComputedStyle(el).gridTemplateRows;
    return { rows, h: el.getBoundingClientRect().height, visibility: getComputedStyle(el).visibility };
  });
  if (!reduced) await page.screenshot({ path: SHOTS + '/hamburger-mid-390.png' });
  await page.waitForTimeout(reduced ? 40 : 280);
  const open = await page.evaluate(() => {
    const b = document.querySelector('button.menu-toggle');
    const panel = document.querySelector('#mobile-nav');
    const inner = panel.querySelector('.menu-panel-inner');
    return {
      label: b.getAttribute('aria-label'),
      expanded: b.getAttribute('aria-expanded'),
      rows: getComputedStyle(panel).gridTemplateRows,
      visibility: getComputedStyle(panel).visibility,
      inert: panel.hasAttribute('inert'),
      inner: inner.getBoundingClientRect().height,
      focus: document.activeElement === b,
    };
  });
  const headerOpen = await page.locator('.site-header').evaluate((el) => el.getBoundingClientRect().height);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(reduced ? 40 : 280);
  const afterEsc = await page.evaluate(() => ({
    expanded: document.querySelector('button.menu-toggle').getAttribute('aria-expanded'),
    focus: document.activeElement === document.querySelector('button.menu-toggle'),
    inert: document.querySelector('#mobile-nav').hasAttribute('inert'),
  }));
  await button.click();
  await page.waitForTimeout(reduced ? 40 : 280);
  await page.mouse.click(20, 700);
  await page.waitForTimeout(reduced ? 40 : 280);
  const afterOut = await page.evaluate(() => document.querySelector('button.menu-toggle').getAttribute('aria-expanded'));
  await button.click();
  await page.waitForTimeout(reduced ? 40 : 280);
  await page.locator('#mobile-nav a[href="/about/"]').click();
  await page.waitForURL('**/about/**');
  const afterLink = page.url();
  const cls = await page.evaluate(() => window.__shifts);
  await page.close();
  return { reduced, box, before, headerClosed, headerOpen, duration, midOpen, open, afterEsc, afterOut, afterLink, cls, headerSame: Math.abs(headerClosed - headerOpen) < 1 };
}

const menu = { normal: await menuCheck(false), reduced: await menuCheck(true) };
fs.writeFileSync(path.join(OUT, 'hamburger.json'), JSON.stringify(menu, null, 2));

const shot = async (url, file, vp, clip) => {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base + url, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  if (clip) await page.screenshot({ path: path.join(SHOTS, file), clip });
  else await page.screenshot({ path: path.join(SHOTS, file), fullPage: true });
  await page.close();
};
await shot('/plan/', 'plan-step1-1440.png', { width: 1440, height: 900 });
await shot('/plan/', 'plan-step1-390.png', { width: 390, height: 844 });
await shot('/plan/#q-type', 'plan-q-type-1440.png', { width: 1440, height: 900 });
await shot('/plan/#q-type', 'plan-q-type-390.png', { width: 390, height: 844 });

for (const vp of [{ width: 1440, height: 900, tag: '1440' }, { width: 390, height: 844, tag: '390' }]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base + '/plan/#q-brief', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const box = await page.locator('#panel-brief .lede').boundingBox();
  await page.screenshot({
    path: path.join(SHOTS, `brief-lede-${vp.tag}.png`),
    clip: { x: 0, y: Math.max(0, (box?.y ?? 80) - 80), width: vp.width, height: 360 },
  });
  await page.close();
}

const reno = await browser.newPage({ viewport: { width: 390, height: 844 } });
await reno.goto(base + '/renovations/', { waitUntil: 'load' });
await reno.waitForTimeout(300);
const bar = await reno.locator('.action-bar').boundingBox();
await reno.screenshot({
  path: path.join(SHOTS, 'renovations-bar-390.png'),
  clip: { x: 0, y: Math.max(0, (bar?.y ?? 700) - 40), width: 390, height: 844 - Math.max(0, (bar?.y ?? 700) - 40) },
});
await reno.close();

for (const vp of [{ width: 1440, height: 900, tag: '1440' }, { width: 390, height: 844, tag: '390' }]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base + '/projects/signal-mountain-renovation/', { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const band = await page.locator('.close-band').boundingBox();
  await page.screenshot({
    path: path.join(SHOTS, `renovation-close-${vp.tag}.png`),
    clip: { x: 0, y: Math.max(0, band?.y ?? 0), width: vp.width, height: Math.min(vp.height, (band?.height ?? 400) + 8) },
  });
  await page.close();
}

const ham = await browser.newPage({ viewport: { width: 390, height: 844 } });
await ham.goto(base + '/', { waitUntil: 'load' });
await ham.waitForTimeout(200);
await ham.screenshot({ path: path.join(SHOTS, 'hamburger-closed-390.png'), clip: { x: 0, y: 0, width: 390, height: 90 } });
await ham.locator('button.menu-toggle').click();
await ham.waitForTimeout(260);
await ham.screenshot({ path: path.join(SHOTS, 'hamburger-open-390.png'), clip: { x: 0, y: 0, width: 390, height: 520 } });
await ham.close();

await browser.close();
console.log('height', JSON.stringify(height, null, 2));
console.log('fonts', JSON.stringify(fontReport, null, 2));
console.log('menu', JSON.stringify(menu, null, 2));
