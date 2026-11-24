#!/usr/bin/env node
// Half Byte Digital — automated site review.
// Usage: node scripts/review.mjs --base http://localhost:4321 --out sites/<slug>/brief/review [--pages /,/about/]
// Needs: npm i -D playwright (or @playwright/test) && npx playwright install chromium
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
    return acc;
  }, [])
);
const BASE = (args.base || 'http://localhost:4321').replace(/\/$/, '');
const OUT = args.out || 'review';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
fs.mkdirSync(OUT, { recursive: true });

async function discoverPages(browser) {
  if (args.pages) return String(args.pages).split(',');
  const found = new Set(['/']);
  // 1) sitemap
  for (const sm of ['/sitemap-index.xml', '/sitemap-0.xml', '/sitemap.xml']) {
    try {
      const res = await fetch(BASE + sm);
      if (!res.ok) continue;
      const xml = await res.text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const u = new URL(m[1]);
        if (!u.pathname.endsWith('.xml')) found.add(u.pathname);
      }
    } catch {}
  }
  // 2) crawl internal links (dev server has no sitemap)
  const page = await browser.newPage();
  const queue = [...found];
  const seen = new Set();
  while (queue.length && seen.size < 60) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    try {
      await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      for (const h of links) {
        if (!h || h.startsWith('#') || /^(mailto|tel|sms|javascript):/.test(h)) continue;
        const u = new URL(h, BASE + p);
        if (u.origin !== new URL(BASE).origin) continue;
        if (/\.(jpg|jpeg|png|webp|avif|svg|pdf|xml|txt|zip)$/i.test(u.pathname)) continue;
        if (!seen.has(u.pathname)) queue.push(u.pathname), found.add(u.pathname);
      }
    } catch {}
  }
  await page.close();
  return [...found].sort();
}

// Runs inside the page.
function audit() {
  const out = { overflow: [], fontSizes: {}, offScaleFonts: [], smallTargets: [], contrast: [], images: [],
    innerScrollbars: [], sections: [], headings: {}, seo: {}, reveal: [] };
  const vw = document.documentElement.clientWidth;
  const root = getComputedStyle(document.documentElement);

  // Resolve token values to px at this viewport.
  const probe = document.createElement('div');
  probe.style.position = 'absolute'; probe.style.visibility = 'hidden';
  document.body.appendChild(probe);
  const px = (v) => { probe.style.fontSize = v; return parseFloat(getComputedStyle(probe).fontSize); };
  const steps = ['--step--1','--step-0','--step-1','--step-2','--step-3','--step-4','--step-5','--step-display']
    .map((t) => [t, root.getPropertyValue(t).trim()]).filter(([, v]) => v).map(([t, v]) => [t, px(v)]);
  const padOf = (v) => { probe.style.paddingTop = v; return parseFloat(getComputedStyle(probe).paddingTop); };
  const sectionPads = ['--section-pad','--section-pad-tight','--section-pad-loose']
    .map((t) => root.getPropertyValue(t).trim()).filter(Boolean).map(padOf);
  probe.remove();
  out.tokens = { steps: Object.fromEntries(steps), sectionPads, missingTokens: [] };
  for (const t of ['--color-bg','--color-surface','--color-text','--color-muted','--color-line','--color-primary',
    '--color-primary-strong','--color-on-primary','--color-focus','--font-display','--font-body','--step-0','--step-5',
    '--container','--gutter','--section-pad','--btn-h','--dur-base','--ease-out','--radius-m']) {
    if (!root.getPropertyValue(t).trim()) out.tokens.missingTokens.push(t);
  }

  const sel = (el) => {
    if (el.id) return `#${el.id}`;
    const c = [...el.classList].slice(0, 2).join('.');
    return el.tagName.toLowerCase() + (c ? '.' + c : '');
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.01;
  };

  // Horizontal overflow
  if (document.documentElement.scrollWidth > vw + 1) out.pageScrollWidth = document.documentElement.scrollWidth;
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > vw + 1 || r.left < -1)) {
      // ignore descendants of clipping/scroll containers
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') { clipped = true; break; } p = p.parentElement; }
      if (!clipped) out.overflow.push({ el: sel(el), left: Math.round(r.left), right: Math.round(r.right) });
    }
    // Inner scrollbars (visible ones only)
    const s = getComputedStyle(el);
    if (/(auto|scroll)/.test(s.overflowX + s.overflowY) && el !== document.documentElement && el !== document.body) {
      const barW = el.offsetWidth - el.clientWidth, barH = el.offsetHeight - el.clientHeight;
      if ((barW > 0 && el.scrollHeight > el.clientHeight) || (barH > 0 && el.scrollWidth > el.clientWidth))
        out.innerScrollbars.push(sel(el));
    }
  }
  out.overflow = out.overflow.slice(0, 20);

  // Font sizes vs scale
  const textEls = [...document.body.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,button,span,label,dt,dd,blockquote,figcaption,input,select,textarea')]
    .filter((el) => visible(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
  for (const el of textEls) {
    const fs = Math.round(parseFloat(getComputedStyle(el).fontSize) * 10) / 10;
    out.fontSizes[fs] = (out.fontSizes[fs] || 0) + 1;
    if (steps.length && !steps.some(([, v]) => Math.abs(v - fs) <= 0.6) && out.offScaleFonts.length < 25)
      out.offScaleFonts.push({ el: sel(el), size: fs, text: el.textContent.trim().slice(0, 40) });
  }

  // Contrast (solid backgrounds only; text over images is flagged for manual check)
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const bgOf = (el) => {
    let e = el; const layers = [];
    while (e) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none' && !/gradient/.test(s.backgroundImage)) return { image: true };
      if (e.tagName === 'IMG' || e.querySelector?.(':scope > img, :scope > picture')) { /* sibling images handled below */ }
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
      e = e.parentElement;
    }
    let base = { r: 255, g: 255, b: 255 };
    for (const c of layers.reverse()) base = { r: c.r * c.a + base.r * (1 - c.a), g: c.g * c.a + base.g * (1 - c.a), b: c.b * c.a + base.b * (1 - c.a) };
    return base;
  };
  for (const el of textEls) {
    const s = getComputedStyle(el); const fg = parse(s.color); if (!fg) continue;
    const bg = bgOf(el);
    const size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    // detect text positioned over an image (hero overlays)
    const r = el.getBoundingClientRect();
    const under = document.elementsFromPoint(Math.min(vw - 1, Math.max(0, r.left + 2)), Math.max(0, Math.min(innerHeight - 1, r.top + r.height / 2)));
    const overImage = under.some((u) => u.tagName === 'IMG' || u.tagName === 'VIDEO');
    if (bg.image || (overImage && r.top < innerHeight)) { out.contrast.push({ el: sel(el), manual: 'text over image: check scrim on screenshot' }); continue; }
    const cr = ratio(fg, bg);
    if (cr < (large ? 3 : 4.5)) out.contrast.push({ el: sel(el), ratio: Math.round(cr * 100) / 100, need: large ? 3 : 4.5, text: el.textContent.trim().slice(0, 40) });
  }
  out.contrast = out.contrast.slice(0, 30);

  // Touch targets
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], summary')) {
    if (!visible(el) || el.matches('.skip-link, .visually-hidden, .sr-only')) continue;
    const r = el.getBoundingClientRect();
    const inline = getComputedStyle(el).display === 'inline' && el.closest('p, li');
    if (!inline && (r.width < 44 || r.height < 44)) out.smallTargets.push({ el: sel(el), w: Math.round(r.width), h: Math.round(r.height), text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30) });
  }
  out.smallTargets = out.smallTargets.slice(0, 30);

  // Images
  const imgs = [...document.images];
  for (const img of imgs) {
    const issues = [];
    if (!img.hasAttribute('alt')) issues.push('no alt');
    if (!img.getAttribute('width') && !img.getAttribute('height') && getComputedStyle(img).aspectRatio === 'auto') issues.push('no dimensions');
    if (img.naturalWidth && img.getBoundingClientRect().width * devicePixelRatio > img.naturalWidth * 1.15) issues.push(`upscaled (${img.naturalWidth}px shown at ${Math.round(img.getBoundingClientRect().width)}css px)`);
    if (img.currentSrc && /\.(png|jpe?g)(\?|$)/i.test(img.currentSrc) && img.naturalWidth > 600) issues.push('not AVIF/WebP');
    if (issues.length) out.images.push({ src: (img.currentSrc || img.src).replace(location.origin, ''), issues });
  }
  const firstImg = imgs.find((i) => i.getBoundingClientRect().top < innerHeight && visible(i));
  if (firstImg) out.heroImage = { src: (firstImg.currentSrc || firstImg.src).replace(location.origin, ''), loading: firstImg.loading, fetchpriority: firstImg.getAttribute('fetchpriority') };

  // Sections: padding vs tokens
  for (const s of document.querySelectorAll('main > section, main > div > section, footer')) {
    const cs = getComputedStyle(s);
    const pt = parseFloat(cs.paddingTop), pb = parseFloat(cs.paddingBottom);
    const ok = (v) => !sectionPads.length || v === 0 || sectionPads.some((p) => Math.abs(p - v) <= 1);
    s.dataset.reviewId = s.dataset.reviewId || Math.random().toString(36).slice(2, 7);
    out.sections.push({ el: sel(s), y: Math.round(s.getBoundingClientRect().top + scrollY), pt, pb, onScale: ok(pt) && ok(pb), bg: cs.backgroundColor, heading: s.querySelector('h1,h2')?.textContent.trim().slice(0, 50) || null });
  }
  for (let i = 1; i < out.sections.length; i++) {
    if (out.sections[i].bg === out.sections[i - 1].bg && out.sections[i].bg !== 'rgba(0, 0, 0, 0)') out.sections[i].sameBgAsPrevious = true;
  }

  // Headings + SEO
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  out.headings.h1 = hs.filter((h) => h.tagName === 'H1').map((h) => h.textContent.trim());
  let last = 0; out.headings.skips = [];
  for (const h of hs) { const l = +h.tagName[1]; if (last && l > last + 1) out.headings.skips.push(`${'h' + last} → ${h.tagName.toLowerCase()} "${h.textContent.trim().slice(0, 30)}"`); last = l; }
  const meta = (n) => document.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.content || null;
  out.seo = {
    title: document.title, titleLen: document.title.length,
    description: meta('description'), descLen: (meta('description') || '').length,
    canonical: document.querySelector('link[rel=canonical]')?.href || null,
    ogImage: meta('og:image'), lang: document.documentElement.lang || null,
    jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return [].concat(j['@graph'] || j).map((x) => x['@type']); } catch { return ['INVALID JSON-LD']; } }),
    skipLink: !!document.querySelector('a[href="#main"], a[href="#content"], .skip-link'),
    mainCount: document.querySelectorAll('main').length,
  };
  // Placeholder / honesty smells in visible text
  const txt = document.body.innerText;
  out.placeholders = [...new Set((txt.match(/lorem ipsum|\bXX+\b|\bTBD\b|\[[^\]]{2,30}\]|coming soon|\b(?:null|undefined|NaN)\b|555-\d{4}|\{\{.*?\}\}/gi) || []))];
  out.claims = [...new Set((txt.match(/[^.\n]*(\b\d{2,}\+?\s*(years?|homes|projects|acres|reviews|customers|jobs)\b|since \d{4}|\d\.\d\s*(stars?|★)|#\s?\d{3,}|licensed|insured|bonded|certified|award|guarantee|warranty|best|#1|top[- ]rated)[^.\n]*/gi) || []).map((s) => s.trim()))].slice(0, 40);
  // Reveal elements stuck hidden
  for (const el of document.querySelectorAll('[data-reveal]')) if (parseFloat(getComputedStyle(el).opacity) < 0.05) out.reveal.push(sel(el));
  return out;
}

const browser = await chromium.launch();
const pages = await discoverPages(browser);
const report = { base: BASE, date: new Date().toISOString(), pages: {} };

for (const vp of VIEWPORTS) {
  for (const reduced of [false, true]) {
    if (reduced && vp.name === 'desktop') continue; // reduced motion checked on mobile
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor || 1, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    for (const p of pages) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      const failed = [];
      page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url().replace(BASE, '')}`));
      const key = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
      try {
        await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 30000 });
        // scroll through to trigger reveals and lazy images, then back to top
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
        await page.waitForTimeout(800);
        const tag = `${key}-${vp.name}${reduced ? '-reduced' : ''}`;
        await page.screenshot({ path: path.join(OUT, `${tag}.png`), fullPage: true });
        await page.screenshot({ path: path.join(OUT, `${tag}-fold.png`) });
        const result = reduced ? { reveal: (await page.evaluate(audit)).reveal } : await page.evaluate(audit);
        report.pages[key] ??= { path: p };
        report.pages[key][vp.name + (reduced ? '_reduced' : '')] = { ...result, consoleErrors: errors, failedRequests: failed };
      } catch (e) {
        report.pages[key] ??= { path: p };
        report.pages[key][vp.name] = { error: String(e) };
      }
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();

fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(report, null, 2));

// Short markdown summary for the agent to turn into review.md
const lines = [`# Automated audit — ${BASE}`, `Run: ${report.date}`, ''];
for (const [key, pg] of Object.entries(report.pages)) {
  lines.push(`## ${key} (${pg.path})`);
  for (const vpName of ['desktop', 'mobile']) {
    const r = pg[vpName]; if (!r) continue;
    if (r.error) { lines.push(`- **${vpName}: ERROR** ${r.error}`); continue; }
    const flag = (ok) => (ok ? '✔' : '✘');
    lines.push(`- **${vpName}**`,
      `  - ${flag(!r.pageScrollWidth && !r.overflow.length)} horizontal overflow ${r.pageScrollWidth ? `(page ${r.pageScrollWidth}px)` : ''} ${r.overflow.slice(0, 5).map((o) => o.el).join(', ')}`,
      `  - ${flag(!r.innerScrollbars.length)} inner scrollbars ${r.innerScrollbars.join(', ')}`,
      `  - ${flag(!r.offScaleFonts.length)} font sizes on scale ${r.offScaleFonts.slice(0, 6).map((f) => `${f.el} ${f.size}px`).join(', ')}`,
      `  - ${flag(r.sections.every((s) => s.onScale))} section padding on tokens ${r.sections.filter((s) => !s.onScale).map((s) => `${s.el} ${s.pt}/${s.pb}`).join(', ')}`,
      `  - ${flag(!r.sections.some((s) => s.sameBgAsPrevious))} adjacent sections differ ${r.sections.filter((s) => s.sameBgAsPrevious).map((s) => s.heading || s.el).join(', ')}`,
      `  - ${flag(!r.contrast.some((c) => c.ratio))} contrast ${r.contrast.filter((c) => c.ratio).slice(0, 6).map((c) => `${c.el} ${c.ratio}:1<${c.need}`).join(', ')}${r.contrast.some((c) => c.manual) ? ` · manual: ${r.contrast.filter((c) => c.manual).length} over images` : ''}`,
      `  - ${flag(!r.smallTargets.length)} touch targets ≥44 ${r.smallTargets.slice(0, 6).map((t) => `${t.el} ${t.w}×${t.h}`).join(', ')}`,
      `  - ${flag(!r.images.length)} images ${r.images.slice(0, 5).map((i) => `${i.src}: ${i.issues.join('/')}`).join('; ')}`,
      `  - ${flag(r.heroImage ? r.heroImage.loading !== 'lazy' : true)} first image eager ${r.heroImage ? JSON.stringify(r.heroImage) : '(none)'}`,
      `  - ${flag(r.headings.h1.length === 1 && !r.headings.skips.length)} headings: h1×${r.headings.h1.length} ${r.headings.skips.join('; ')}`,
      `  - ${flag(!r.placeholders.length)} placeholders ${r.placeholders.join(', ')}`,
      `  - ${flag(!r.consoleErrors.length && !r.failedRequests.length)} console/network ${[...r.consoleErrors, ...r.failedRequests].slice(0, 4).join(' | ')}`,
      `  - ${flag(!r.tokens.missingTokens.length)} token contract ${r.tokens.missingTokens.join(', ')}`);
    if (vpName === 'desktop') {
      const s = r.seo;
      lines.push(`  - ${flag(s.titleLen > 0 && s.titleLen <= 60 && s.descLen >= 50 && s.descLen <= 155 && s.canonical && s.ogImage && s.lang && s.skipLink && s.mainCount === 1)} SEO/a11y basics: title ${s.titleLen}c, desc ${s.descLen}c, canonical ${!!s.canonical}, og ${!!s.ogImage}, lang ${s.lang}, skip ${s.skipLink}, main×${s.mainCount}, schema [${s.jsonLdTypes.join(', ')}]`);
      if (r.claims.length) lines.push(`  - claims to verify against sources.md:`, ...r.claims.map((c) => `    - "${c}"`));
    }
  }
  const red = pg.mobile_reduced;
  if (red) lines.push(`- **reduced motion**: ${red.reveal?.length ? '✘ hidden [data-reveal]: ' + red.reveal.join(', ') : '✔ nothing stuck hidden'}`);
  lines.push('');
}
fs.writeFileSync(path.join(OUT, 'audit.md'), lines.join('\n'));
console.log(`Reviewed ${pages.length} page(s): ${pages.join(', ')}\n→ ${OUT}/audit.md, audit.json, screenshots`);
