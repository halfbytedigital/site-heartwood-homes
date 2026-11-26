import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
await p.goto('http://localhost:8765/scene-qa.html?mode=stress'); await p.waitForFunction(() => window.__ready);
const res = await p.evaluate(async () => {
  const BUILD = /^(garage|house|roof1|roof2|second|porch|deck|deck-wo|screened|screened-wo|walkout|basement|patio)$/;
  const css = `.s2{stroke-width:1.2}.fine{stroke-width:.8}.dash.long{stroke-dasharray:5 4}.dash.dots{stroke-dasharray:.1 4.2;stroke-width:2.2}.glass{fill:none}.dot{fill:#000}.lbl{font:600 9px sans-serif;fill:#000;stroke:none}`;
  const S = 3, W = 520 * S, H = 256 * S;
  const mask = async (svg, name) => {
    const c = svg.cloneNode(true);
    c.querySelectorAll('[data-layer]').forEach(g => { if (g.dataset.layer !== name) g.remove(); else { g.style.visibility = 'visible'; g.style.opacity = 1; g.querySelectorAll('*').forEach(e => { e.style.opacity = ''; e.style.strokeDasharray = ''; e.style.strokeDashoffset = ''; }); } });
    c.setAttribute('width', W); c.setAttribute('height', H); c.setAttribute('color', '#000');
    const st = document.createElementNS('http://www.w3.org/2000/svg', 'style'); st.textContent = css; c.prepend(st);
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(c));
    const img = new Image(); img.src = url; await img.decode();
    const cv = new OffscreenCanvas(W, H); const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
    const d = cx.getImageData(0, 0, W, H).data; const m = new Uint8Array(W * H);
    let minx = W, miny = H, maxx = 0, maxy = 0;
    for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 60) { m[i] = 1; const x = i % W, y = (i / W) | 0; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    return { m, box: [minx / S, miny / S + 32, maxx / S, maxy / S + 32] };
  };
  const out = [];
  for (const fig of document.querySelectorAll('figure')) {
    const title = fig.querySelector('figcaption').textContent; const svg = fig.querySelector('svg');
    const names = [...svg.querySelectorAll('[data-layer]')].filter(g => g.dataset.on === '1').map(g => g.dataset.layer);
    const masks = {}; for (const n of names) masks[n] = await mask(svg, n);
    const hits = [];
    for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
      const a = names[i], c = names[j];
      if (a.startsWith('ground') || c.startsWith('ground')) continue;
      if (BUILD.test(a) && BUILD.test(c)) continue;
      let n = 0; const A = masks[a].m, C = masks[c].m; for (let k = 0; k < A.length; k++) if (A[k] && C[k]) n++;
      if (n) hits.push(`${a} × ${c}: ${n}px`);
    }
    const all = Object.values(masks).reduce((m, q) => [Math.min(m[0], q.box[0]), Math.min(m[1], q.box[1]), Math.max(m[2], q.box[2]), Math.max(m[3], q.box[3])], [1e9, 1e9, -1e9, -1e9]);
    const wo = masks['walkout'] || masks['basement'];
    out.push({ title, layers: names.length, hits, inkBox: all.map(v => +v.toFixed(1)), marginsToViewBox: { left: +all[0].toFixed(1), top: +(all[1] - 32).toFixed(1), right: +(520 - all[2]).toFixed(1), bottom: +(288 - all[3]).toFixed(1) }, walkoutBox: masks['walkout'] ? masks['walkout'].box : null, patioBox: masks['patio'] ? masks['patio'].box : null });
  }
  return out;
});
fs.writeFileSync('/workspace/heartwood-review/wizard/mockups/v3/_qa-overlap.json', JSON.stringify(res, null, 2));
for (const r of res) console.log(r.title.padEnd(18), 'layers', r.layers, '| collisions:', r.hits.length ? r.hits.join('; ') : 'none', '| margins', JSON.stringify(r.marginsToViewBox), r.patioBox ? '| walkout+patio ink ' + JSON.stringify([r.walkoutBox, r.patioBox].map(b => b.map(v => +v.toFixed(1)))) : '');
await b.close();
