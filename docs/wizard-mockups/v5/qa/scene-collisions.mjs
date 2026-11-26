#!/usr/bin/env node
// C33 scene collision check. Renders each visible layer of the layered scene alone at 2x, then
// ANDs every pair of independent layers across every answer combination. Ground lines and
// pairs inside the building cluster (designed to touch) are skipped; check those by eye.
// Usage: node scene-collisions.mjs --url http://localhost:4321/plan/?scene-qa --out brief/review
// The page at --url must expose, once ready:
//   window.sceneQA = { svg, initScene, syncScene }   // the inlined <svg class="scene"> + scene.js exports
// (expose it only behind a query flag or in dev). Edit TYPES / the loops if the client's flow differs.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => {
  if (v.startsWith('--')) a.push([v.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]); return a; }, []));
const OUT = args.out || 'review'; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
await p.goto(args.url); await p.waitForFunction(() => window.sceneQA && window.sceneQA.svg);
const res = await p.evaluate(async () => {
  const { svg, initScene, syncScene } = window.sceneQA;
  const BUILD = /^(garage|link|house|roof1|roof2|second|porch|deck|deck-wo|screened|screened-wo|walkout|basement|patio)$/;
  [...svg.querySelectorAll('[data-layer]')].forEach((g, i) => g.dataset.uid = 'L' + i);
  const [vx, vy, vw, vh] = svg.getAttribute('viewBox').split(/\s+/).map(Number);
  const css = `.s2{stroke-width:1.2}.fine{stroke-width:.8}.dash.long{stroke-dasharray:5 4}.dash.dots{stroke-dasharray:.1 4.2;stroke-width:2.2}.glass{fill:none}.dot{fill:#000}.lbl{font:600 9px sans-serif;fill:#000;stroke:none}`;
  const S = 2, W = vw * S, H = vh * S; const cache = new Map();
  const mask = async (uid, tf) => {
    const key = uid + '|' + tf; if (cache.has(key)) return cache.get(key);
    const c = svg.cloneNode(true);
    c.querySelectorAll('[data-layer]').forEach(g => { if (g.dataset.uid !== uid) g.remove(); else { g.removeAttribute('style'); g.setAttribute('transform', tf); g.querySelectorAll('*').forEach(e => e.removeAttribute('style')); } });
    c.setAttribute('width', W); c.setAttribute('height', H); c.setAttribute('color', '#000');
    const st = document.createElementNS('http://www.w3.org/2000/svg', 'style'); st.textContent = css; c.prepend(st);
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(c)); await img.decode();
    const cv = new OffscreenCanvas(W, H); const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
    const d = cx.getImageData(0, 0, W, H).data; const m = new Uint8Array(W * H); let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 60) { m[i] = 1; const x = i % W, y = (i / W) | 0; x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    const r = { m, box: [x0 / S + vx, y0 / S + vy, x1 / S + vx, y1 / S + vy] }; cache.set(key, r); return r;
  };
  let combos = 0; const bad = []; let worst = { l: 1e9, t: 1e9, r: 1e9, b: 1e9 };
  const TYPES = ['lake', 'family', 'cabin', 'aframe', 'townhome', 'rental'];
  for (const type of TYPES) for (const terrain of ['flat', 'gentle', 'steep', 'water']) for (const wo of [0, 1])
  for (const side of ['deck', 'screened', 'none']) for (const out of ['shop', 'oldshed', 'none'])
  for (const access of ['paved', 'gravel', 'needs']) for (const stories of ['1', '2'])
  for (const util of ['well+septic', 'public']) for (const cover of ['heavy', 'partly']) {
    const needs = ['porch', 'garage']; if (wo) needs.push('basement'); if (side !== 'none') needs.push(side); if (out === 'shop') needs.push('shop');
    const st = { land: 'yes', type, terrain, cover, access, power: 'yes', stories, needs, structure: out === 'oldshed' ? 'yes' : 'no',
      water: util === 'public' ? 'public' : 'well', sewer: util === 'public' ? 'public' : 'septic' };
    initScene(svg); syncScene(svg, st, { instant: true });
    const on = [...svg.querySelectorAll('[data-layer]')].filter(g => g.dataset.on === '1').map(g => [g.dataset.layer, g.dataset.uid, g.getAttribute('transform') || '']);
    if (!on.some(([n]) => n === 'house')) bad.push(`${type}: no house drawn`);
    const ms = []; for (const [n, uid, tf] of on) ms.push([n, await mask(uid, tf)]);
    for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) {
      const [a, A] = ms[i], [c, C] = ms[j];
      if (a.startsWith('ground') || c.startsWith('ground')) continue;
      if (BUILD.test(a) && BUILD.test(c)) continue;
      if (A.box[2] < C.box[0] || C.box[2] < A.box[0] || A.box[3] < C.box[1] || C.box[3] < A.box[1]) continue;
      let n = 0; for (let k = 0; k < A.m.length; k++) if (A.m[k] && C.m[k]) n++;
      if (n) bad.push(`${JSON.stringify(st)}: ${a} x ${c} ${n}px`);
    }
    const all = ms.reduce((m, [, q]) => [Math.min(m[0], q.box[0]), Math.min(m[1], q.box[1]), Math.max(m[2], q.box[2]), Math.max(m[3], q.box[3])], [1e9, 1e9, -1e9, -1e9]);
    worst = { l: Math.min(worst.l, all[0] - vx), t: Math.min(worst.t, all[1] - vy), r: Math.min(worst.r, vx + vw - all[2]), b: Math.min(worst.b, vy + vh - all[3]) };
    combos++;
  }
  return { combos, collisions: bad.length, sample: bad.slice(0, 20), worstMargins: worst };
});
fs.writeFileSync(path.join(OUT, 'scene-collisions.json'), JSON.stringify(res, null, 2));
console.log(JSON.stringify(res, null, 1));
await b.close();
process.exit(res.collisions ? 1 : 0);
