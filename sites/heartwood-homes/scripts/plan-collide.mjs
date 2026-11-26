/** Pixel collision check for the layered scene. Ports the v4 10,368-combo run. */
import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.PLAN_URL || "http://127.0.0.1:4321/plan/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__planScene);
const result = await page.evaluate(async () => {
  const { syncScene, initScene } = window.__planScene;
  const BUILD = /^(garage|link|house|roof1|roof2|second|porch|deck|deck-wo|screened|screened-wo|walkout|basement|patio)$/;
  const svg = document.querySelector("#sketch-stage svg");
  const css = `.s2{stroke-width:1.2}.fine{stroke-width:.8}.dash.long{stroke-dasharray:5 4}.dash.dots{stroke-dasharray:.1 4.2;stroke-width:2.2}.glass{fill:none}.dot{fill:#000}.lbl{font:600 9px sans-serif;fill:#000;stroke:none}`;
  [...svg.querySelectorAll("[data-layer]")].forEach((g, i) => { g.dataset.uid = "L" + i; });
  const S = 2, W = 520 * S, H = 256 * S;
  const cache = new Map();
  const mask = async (uid, tf) => {
    const key = uid + "|" + tf;
    if (cache.has(key)) return cache.get(key);
    const clone = svg.cloneNode(true);
    clone.querySelectorAll("[data-layer]").forEach((g) => {
      if (g.dataset.uid !== uid) g.remove();
      else {
        g.removeAttribute("style");
        if (tf) g.setAttribute("transform", tf);
        g.querySelectorAll("*").forEach((el) => el.removeAttribute("style"));
      }
    });
    clone.setAttribute("width", W);
    clone.setAttribute("height", H);
    clone.setAttribute("color", "#000");
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = css;
    clone.prepend(style);
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
    await img.decode();
    const canvas = new OffscreenCanvas(W, H);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, W, H).data;
    const bits = new Uint8Array(W * H);
    let maxy = 0, maxx = 0, minx = W, miny = H;
    for (let i = 0; i < W * H; i++) {
      if (data[i * 4 + 3] > 60) {
        bits[i] = 1;
        const x = i % W, y = (i / W) | 0;
        maxy = Math.max(maxy, y); maxx = Math.max(maxx, x); minx = Math.min(minx, x); miny = Math.min(miny, y);
      }
    }
    const box = { m: bits, box: [minx / S, miny / S + 32, maxx / S, maxy / S + 32] };
    cache.set(key, box);
    return box;
  };
  let combos = 0;
  const bad = [];
  let worst = { l: 99, t: 99, r: 99, b: 99 };
  const types = ["lake", "family", "cabin", "aframe", "townhome", "rental"];
  const perType = {};
  for (const type of types) for (const terrain of ["flat", "gentle", "steep", "water"]) for (const walk of [0, 1]) for (const porchKind of ["deck", "screened", "none"]) for (const out of ["shop", "oldshed", "none"])
  for (const access of ["paved", "gravel", "needs"]) for (const stories of ["1", "2"]) for (const util of ["well+septic", "public"]) for (const cover of ["heavy", "partly"]) {
    const needs = ["porch", "garage"];
    if (walk) needs.push("basement");
    if (porchKind !== "none") needs.push(porchKind);
    if (out === "shop") needs.push("shop");
    const state = {
      land: "yes", type, terrain, cover, access, power: "yes", stories, needs,
      structure: out === "oldshed" ? "yes" : "no",
      water: util === "public" ? "public" : "well",
      sewer: util === "public" ? "public" : "septic",
    };
    initScene(svg);
    syncScene(svg, state, { instant: true });
    const on = [...svg.querySelectorAll("[data-layer]")].filter((g) => g.dataset.on === "1").map((g) => {
      const y = Number(g._gsap?.y || 0);
      return [g.dataset.layer, g.dataset.uid, y ? `translate(0 ${y})` : ""];
    });
    const masks = [];
    for (const [name, uid, tf] of on) masks.push([name, await mask(uid, tf)]);
    perType[type] = (perType[type] || 0) + 1;
    if (!on.some(([name]) => name === "house")) bad.push(type + ": no house drawn");
    for (let i = 0; i < masks.length; i++) for (let j = i + 1; j < masks.length; j++) {
      const [a, A] = masks[i], [c, C] = masks[j];
      if (a.startsWith("ground") || c.startsWith("ground")) continue;
      if (BUILD.test(a) && BUILD.test(c)) continue;
      if (A.box[2] < C.box[0] || C.box[2] < A.box[0] || A.box[3] < C.box[1] || C.box[3] < A.box[1]) continue;
      let hits = 0;
      for (let k = 0; k < A.m.length; k++) if (A.m[k] && C.m[k]) hits++;
      if (hits) bad.push(`${type}/${terrain}: ${a} × ${c} ${hits}px`);
    }
    const all = masks.reduce((acc, [, q]) => [Math.min(acc[0], q.box[0]), Math.min(acc[1], q.box[1]), Math.max(acc[2], q.box[2]), Math.max(acc[3], q.box[3])], [1e9, 1e9, -1e9, -1e9]);
    worst = { l: Math.min(worst.l, all[0]), t: Math.min(worst.t, all[1] - 32), r: Math.min(worst.r, 520 - all[2]), b: Math.min(worst.b, 288 - all[3]) };
    combos++;
  }
  return { combos, perType, collisions: bad.length, sample: bad.slice(0, 12), worstMargins: worst, masks: cache.size };
});
fs.mkdirSync("brief/review", { recursive: true });
fs.writeFileSync("brief/review/plan-collide.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 1));
await browser.close();
if (result.collisions || result.combos !== 10368) process.exit(1);
