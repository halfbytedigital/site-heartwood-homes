/** CLS check for /plan/. Exits non-zero if any layout shift is recorded. */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("brief/review");
const URL = process.env.PLAN_URL || "http://127.0.0.1:4321/plan/";
const mode = process.argv[2] || "desktop";
const W = mode === "mobile" ? 390 : 1440;
const H = mode === "mobile" ? 844 : 1080;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: W, height: H },
  reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
});
await context.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__shifts.push({
        value: entry.value,
        recent: entry.hadRecentInput,
        t: Math.round(entry.startTime),
        src: (entry.sources || []).map((source) => {
          const node = source.node;
          const name = node ? (node.id || node.className || node.nodeName) : "";
          return `${name} ${JSON.stringify(source.previousRect)}→${JSON.stringify(source.currentRect)}`;
        }),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(900);
const pause = (ms = 400) => page.waitForTimeout(mode === "desktop" ? ms : 180);
const pick = async (name, value) => {
  await page.locator(`label:has(input[name="${name}"][value="${value}"])`).click({ force: true });
  await pause();
};
const next = async () => {
  await page.locator(".panel.is-on [data-go='next']").click({ force: true });
  await pause(300);
};

await pick("land", "yes");
await next();
await page.fill("#place", "Sale Creek, Hamilton County");
await page.fill("#parcel", "https://maps.app.goo.gl/sale-creek-lot");
await pick("acres", "3-10");
await next();
await pick("terrain", "water");
await pick("cover", "heavy");
await next();
await pick("access", "paved");
await pick("power", "yes");
await pick("water", "well");
await pick("sewer", "septic");
await pick("internet", "yes");
await pick("structure", "no");
await next();
await pick("type", process.env.TYPE || "cabin");
await pause(500);
await next();
for (const [key, count] of [["beds", 2], ["baths", 2]]) {
  for (let i = 0; i < count; i++) {
    await page.locator(`[data-stepper="${key}"] [data-dir="1"]`).click({ force: true });
    await pause(120);
  }
}
await pick("stories", "2");
await next();
await page.locator('label:has(input[name="who"][value="us"])').click({ force: true });
await pick("use", "second");
await next();
await pick("plans", "sketch");
for (const need of ["porch", "deck", "garage", "basement", "shop"]) {
  await page.locator(`label:has(input[name="need"][value="${need}"])`).click({ force: true });
  await pause(200);
}
await next();
await pick("budget", "comfortable");
await pick("pay", "loan");
await next();
await pick("timing", "next");
await pick("sell", "no");
await page.locator(".panel.is-on [data-go='brief']").click({ force: true });
await page.waitForTimeout(mode === "reduced" ? 200 : 1200);

const shifts = await page.evaluate(() => window.__shifts || []);
const cls = shifts.filter((shift) => !shift.recent).reduce((sum, shift) => sum + shift.value, 0);
const result = { mode, cls, count: shifts.length, shifts, errors };
const file = path.join(OUT, `plan-cls-${mode}.json`);
fs.writeFileSync(file, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ mode, cls, count: shifts.length, errors, file }));
await browser.close();
if (cls > 0 || errors.length) process.exit(1);
