/* Heartwood layered scene controller (lake / mountain house).
   The art in scene-lake.svg is hand-placed on fixed slots. This file only decides which
   layers are on, and moves grade-dependent pieces by their pre-measured data-dy offsets.
   Requires gsap + DrawSVGPlugin (window.gsap). */
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Which drawn scene a house-type answer uses. Rental and "something else" borrow the family house,
// or the lake house on a waterfront lot.
export function sceneType(state) {
  const t = state.type || "";
  if (!t) return "";
  if (["lake", "family", "cabin", "aframe", "townhome"].includes(t)) return t;
  return state.terrain === "water" ? "lake" : "family";
}

export function layersFor(state) {
  const needs = state.needs || [];
  const basement = needs.includes("basement");
  let terrain = state.terrain || "";
  if (!terrain && basement && state.land !== "yes") terrain = "gentle";
  if (!terrain) terrain = "flat";
  const walkout = basement && terrain !== "flat";
  const wo = walkout ? "-wo" : "";
  const shape = terrain === "water" ? "flat" : terrain;           // drive + tie-in approach shape
  const on = new Set();
  const open = terrain === "water" && !(needs.includes("shop") || state.structure === "yes");
  on.add("ground-" + (terrain === "flat" ? "flat" : terrain + (open ? "-open" : "") + wo));
  if (terrain === "steep") on.add("ridge");
  const shop = needs.includes("shop") || state.structure === "yes";
  if (terrain === "water") on.add((shop ? "water" : "water-open") + wo);

  if (["paved", "gravel", "needs"].includes(state.access)) on.add(`drive-${state.access}-${shape}`);
  if (state.access === "paved" || state.access === "gravel") on.add("mailbox");
  if (state.access === "needs") on.add("stake");
  if (state.power === "yes") on.add("pole");
  if (state.water === "public") on.add("tie-water-" + shape);
  if (state.sewer === "public") on.add("tie-sewer-" + shape);
  if (state.water === "well") on.add("well");
  if (state.sewer === "septic") on.add(basement && terrain !== "flat" ? "septic-low" : "septic");

  const cover = state.cover || "";
  if (cover === "partly" || cover === "heavy") { on.add("tree-l2"); if (terrain !== "water") on.add("tree-r1"); }
  if (cover === "heavy") { on.add("tree-l1"); if (terrain !== "water") on.add("tree-r2"); }

  if (state.type) {
    const two = state.stories === "2" || state.stories === "3";
    on.add("house"); on.add(two ? "second" : "roof1"); if (two) on.add("roof2");
    if (needs.includes("porch")) on.add("porch");
    // Deck and screened porch share the side slot; the screened porch wins if both are picked
    if (needs.includes("screened")) on.add("screened" + wo);
    else if (needs.includes("deck")) on.add("deck" + wo);
  }
  if (needs.includes("garage")) { on.add("garage"); if (state.type) on.add("link"); }
  if (walkout) { on.add("walkout"); on.add("patio"); }
  if (basement && !walkout) on.add("basement");
  if (needs.includes("shop")) on.add("shop");
  else if (state.structure === "yes") on.add("oldshed");

  // grade key for data-dy lookups
  const leftKey = terrain === "gentle" || terrain === "steep" ? terrain : "";
  const rightKey = terrain === "flat" || terrain === "water" ? (walkout ? "flat-wo" : "") : terrain + wo;
  return { on, leftKey, rightKey, low: walkout, type: sceneType(state) };
}

function strokes(g) { return [...g.querySelectorAll("path,rect,circle,line,polyline,polygon")]; }

export function syncScene(svg, state, opts = {}) {
  const gsap = window.gsap;
  if (gsap) gsap.config({ nullTargetWarn: false });
  const instant = opts.instant || reduce() || !gsap;
  const { on, leftKey, rightKey, low, type } = layersFor(state);
  const typeGroup = type ? svg.querySelector(`[data-type="${type}"]`) : null;
  const tl = gsap ? gsap.timeline() : null;
  let delay = 0;
  svg.querySelectorAll("[data-layer]").forEach(g => {
    const name = g.dataset.layer;
    const owner = g.parentElement.closest("[data-type]");
    // type layers show only for the active type; a shared layer steps aside if the active type overrides it
    const want = owner ? (owner === typeGroup && on.has(name))
      : (on.has(name) && !(typeGroup && typeGroup.querySelector(`:scope > [data-layer="${name}"]`)));
    // pre-measured grade offsets
    if (g.dataset.dy) {
      const dy = JSON.parse(g.dataset.dy);
      const key = g.classList.contains("tree") && name.startsWith("tree-r") ? rightKey
        : (name === "shop" || name === "oldshed") ? (low ? "low" : "")
        : leftKey;
      const y = dy[key] || 0;
      if (instant || g.dataset.on !== "1") { if (gsap) gsap.set(g, { y }); else g.setAttribute("transform", `translate(0 ${y})`); }
      else gsap.to(g, { y, duration: 0.6, ease: "power2.inOut" });
    }
    const was = g.dataset.on === "1";
    if (want === was && !opts.force) return;
    g.dataset.on = want ? "1" : "0";
    if (!gsap) { g.style.visibility = want ? "visible" : "hidden"; return; }
    gsap.killTweensOf(g);
    const parts = strokes(g);
    parts.forEach(p => gsap.killTweensOf(p));
    if (!want) {
      if (instant) gsap.set(g, { autoAlpha: 0 });
      else tl.to(g, { autoAlpha: 0, duration: 0.28, ease: "power1.out" }, 0);
      return;
    }
    const solid = parts.filter(p => !p.classList.contains("dash"));
    const dashed = parts.filter(p => p.classList.contains("dash"));
    const glass = parts.filter(p => p.classList.contains("glass"));
    const labels = [...g.querySelectorAll("text")];
    if (instant) {
      gsap.set(g, { autoAlpha: 1 });
      gsap.set(solid, { drawSVG: "100%" });
      gsap.set([...dashed, ...labels], { opacity: 1 });
      gsap.set(glass, { fillOpacity: 1 });
      return;
    }
    gsap.set(g, { autoAlpha: 1 });
    gsap.set(solid, { drawSVG: "0%" });
    gsap.set([...dashed, ...labels], { opacity: 0 });
    gsap.set(glass, { fillOpacity: 0 });
    const at = delay;
    tl.to(solid, { drawSVG: "100%", duration: 0.75, ease: "power2.inOut", stagger: 0.035 }, at);
    if (dashed.length) tl.to(dashed, { opacity: 1, duration: 0.45, ease: "power1.out", stagger: 0.04 }, at + 0.2);
    if (labels.length) tl.to(labels, { opacity: 1, duration: 0.4 }, at + 0.45);
    if (glass.length) tl.to(glass, { fillOpacity: 1, duration: 0.5 }, at + 0.6);
    delay += 0.12;
  });
  return tl;
}

export function initScene(svg) {
  svg.querySelectorAll("[data-layer]").forEach(g => {
    g.dataset.on = "0";
    if (window.gsap) window.gsap.set(g, { autoAlpha: 0 }); else g.style.visibility = "hidden";
  });
}
