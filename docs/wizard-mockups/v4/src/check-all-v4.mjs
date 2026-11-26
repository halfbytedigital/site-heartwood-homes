import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
await p.goto('http://localhost:8765/scene-qa.html?mode=real'); await p.waitForFunction(() => window.__ready);
const res = await p.evaluate(async () => {
  const { syncScene, initScene } = await import('./scene.js');
  const BUILD = /^(garage|link|house|roof1|roof2|second|porch|deck|deck-wo|screened|screened-wo|walkout|basement|patio)$/;
  [...svg0().querySelectorAll('[data-layer]')].forEach((g, i) => g.dataset.uid = 'L' + i);
  const css = `.s2{stroke-width:1.2}.fine{stroke-width:.8}.dash.long{stroke-dasharray:5 4}.dash.dots{stroke-dasharray:.1 4.2;stroke-width:2.2}.glass{fill:none}.dot{fill:#000}.lbl{font:600 9px sans-serif;fill:#000;stroke:none}`;
  function svg0(){ return document.querySelector('figure svg'); }
  const svg = svg0();
  const S = 2, W = 520 * S, H = 256 * S;
  
  const cache = new Map();
  const mask = async (uid, tf) => {
    const key = uid + '|' + tf; if (cache.has(key)) return cache.get(key);
    const c = svg.cloneNode(true);
    c.querySelectorAll('[data-layer]').forEach(g => { if (g.dataset.uid !== uid) g.remove(); else { g.removeAttribute('style'); g.setAttribute('transform', tf); g.querySelectorAll('*').forEach(e => e.removeAttribute('style')); } });
    c.setAttribute('width', W); c.setAttribute('height', H); c.setAttribute('color', '#000');
    const st = document.createElementNS('http://www.w3.org/2000/svg', 'style'); st.textContent = css; c.prepend(st);
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(c)); await img.decode();
    const cv = new OffscreenCanvas(W, H); const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
    const d = cx.getImageData(0, 0, W, H).data; const m = new Uint8Array(W * H); let maxy = 0, maxx = 0, minx = W, miny = H;
    for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 60) { m[i] = 1; const x = i % W, y = (i / W) | 0; maxy = Math.max(maxy, y); maxx = Math.max(maxx, x); minx = Math.min(minx, x); miny = Math.min(miny, y); }
    const r = { m, box: [minx / S, miny / S + 32, maxx / S, maxy / S + 32] }; cache.set(key, r); return r;
  };
  let combos = 0; const bad = []; let worst = { l: 99, t: 99, r: 99, b: 99 };
  const TYPES = ['lake', 'family', 'cabin', 'aframe', 'townhome', 'rental']; const perType = {};
  for (const type of TYPES) for (const terrain of ['flat', 'gentle', 'steep', 'water']) for (const wo of [0, 1]) for (const porchKind of ['deck', 'screened', 'none']) for (const out of ['shop', 'oldshed', 'none'])
  for (const access of ['paved', 'gravel', 'needs']) for (const stories of ['1', '2']) for (const util of ['well+septic', 'public']) for (const cover of ['heavy', 'partly']) {
    const needs = ['porch', 'garage']; if (wo) needs.push('basement'); if (porchKind !== 'none') needs.push(porchKind); if (out === 'shop') needs.push('shop');
    const st = { land: 'yes', type, terrain, cover, access, power: 'yes', stories, needs, structure: out === 'oldshed' ? 'yes' : 'no',
      water: util === 'public' ? 'public' : 'well', sewer: util === 'public' ? 'public' : 'septic' };
    initScene(svg); syncScene(svg, st, { instant: true });
    const on = [...svg.querySelectorAll('[data-layer]')].filter(g => g.dataset.on === '1').map(g => [g.dataset.layer, g.dataset.uid, g.getAttribute('transform') || '']);
    const ms = []; for (const [n, uid, tf] of on) ms.push([n, await mask(uid, tf)]);
    perType[type] = (perType[type] || 0) + 1; if (!on.some(([n]) => n === 'house')) bad.push(type + ': no house drawn');
    for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) {
      const [a, A] = ms[i], [c, C] = ms[j];
      if (a.startsWith('ground') || c.startsWith('ground')) continue;
      if (BUILD.test(a) && BUILD.test(c)) continue;
      // quick reject
      if (A.box[2] < C.box[0] || C.box[2] < A.box[0] || A.box[3] < C.box[1] || C.box[3] < A.box[1]) continue;
      let n = 0; for (let k = 0; k < A.m.length; k++) if (A.m[k] && C.m[k]) n++;
      if (n) bad.push(`${JSON.stringify(st)}: ${a} × ${c} ${n}px`);
    }
    const all = ms.reduce((m, [, q]) => [Math.min(m[0], q.box[0]), Math.min(m[1], q.box[1]), Math.max(m[2], q.box[2]), Math.max(m[3], q.box[3])], [1e9, 1e9, -1e9, -1e9]);
    worst = { l: Math.min(worst.l, all[0]), t: Math.min(worst.t, all[1] - 32), r: Math.min(worst.r, 520 - all[2]), b: Math.min(worst.b, 288 - all[3]) };
    combos++;
  }
  return { combos, perType, collisions: bad.length, sample: bad.slice(0, 15), worstMargins: worst, masks: cache.size };
});
fs.writeFileSync('/workspace/heartwood-review/wizard/mockups/v4/_qa-overlap-all.json', JSON.stringify(res, null, 2));
console.log(JSON.stringify(res, null, 1));
await b.close();
