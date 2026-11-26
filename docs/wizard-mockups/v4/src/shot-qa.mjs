import { chromium } from 'playwright';
const [,, url, out, w='1200', h='800'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:+w,height:+h}, deviceScaleFactor:2 });
p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(url); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(300);
await p.screenshot({ path: out, fullPage: true }); await b.close();
