import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/workspace/heartwood-review/wizard/mockups/v4';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 }, recordVideo: { dir: '/tmp/v4types', size: { width: 1440, height: 1100 } } });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:8765/plan.html?land=yes&terrain=gentle&cover=partly&access=paved&power=yes&water=well&sewer=septic&stories=2&needs=porch,garage,deck,basement#type');
await p.waitForTimeout(2200);
const box = await p.locator('#sketch-rail').boundingBox();
const stage = await p.locator('#sketch-stage').boundingBox();
for (const t of ['lake', 'family', 'cabin', 'aframe', 'townhome', 'rental', 'lake']) {
  await p.locator(`label:has(input[name="type"][value="${t}"])`).click();
  await p.waitForTimeout(2300);
}
fs.writeFileSync(OUT + '/_types-video.json', JSON.stringify({ box, stage, errs }));
await ctx.close(); await b.close(); console.log(JSON.stringify({ box, stage, errs }));
