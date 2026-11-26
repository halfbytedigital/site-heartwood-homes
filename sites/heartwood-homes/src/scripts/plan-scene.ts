/** Layer controller for the hand-drawn scene. Art stays in scene.svg. */
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
gsap.config({ nullTargetWarn: false });

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type SceneState = {
  type?: string;
  terrain?: string;
  land?: string;
  needs?: string[];
  access?: string;
  power?: string;
  water?: string;
  sewer?: string;
  cover?: string;
  structure?: string;
  stories?: string;
};

export function sceneType(state: SceneState) {
  const t = state.type || "";
  if (!t) return "";
  if (["lake", "family", "cabin", "aframe", "townhome"].includes(t)) return t;
  return state.terrain === "water" ? "lake" : "family";
}

export function layersFor(state: SceneState) {
  const needs = state.needs || [];
  const basement = needs.includes("basement");
  let terrain = state.terrain || "";
  if (!terrain && basement && state.land !== "yes") terrain = "gentle";
  if (!terrain) terrain = "flat";
  const walkout = basement && terrain !== "flat";
  const wo = walkout ? "-wo" : "";
  const shape = terrain === "water" ? "flat" : terrain;
  const on = new Set<string>();
  const open = terrain === "water" && !(needs.includes("shop") || state.structure === "yes");
  on.add("ground-" + (terrain === "flat" ? "flat" : terrain + (open ? "-open" : "") + wo));
  if (terrain === "steep") on.add("ridge");
  const shop = needs.includes("shop") || state.structure === "yes";
  if (terrain === "water") on.add((shop ? "water" : "water-open") + wo);

  if (["paved", "gravel", "needs"].includes(state.access || "")) on.add(`drive-${state.access}-${shape}`);
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
    on.add("house");
    on.add(two ? "second" : "roof1");
    if (two) on.add("roof2");
    if (needs.includes("porch")) on.add("porch");
    if (needs.includes("screened")) on.add("screened" + wo);
    else if (needs.includes("deck")) on.add("deck" + wo);
  }
  if (needs.includes("garage")) { on.add("garage"); if (state.type) on.add("link"); }
  if (walkout) { on.add("walkout"); on.add("patio"); }
  if (basement && !walkout) on.add("basement");
  if (needs.includes("shop")) on.add("shop");
  else if (state.structure === "yes") on.add("oldshed");

  const leftKey = terrain === "gentle" || terrain === "steep" ? terrain : "";
  const rightKey = terrain === "flat" || terrain === "water" ? (walkout ? "flat-wo" : "") : terrain + wo;
  return { on, leftKey, rightKey, low: walkout, type: sceneType(state) };
}

function strokes(g: Element) {
  return [...g.querySelectorAll("path,rect,circle,line,polyline,polygon")];
}

export function syncScene(svg: Element, state: SceneState, opts: { instant?: boolean; force?: boolean } = {}) {
  const instant = opts.instant || reduce();
  const { on, leftKey, rightKey, low, type } = layersFor(state);
  const typeGroup = type ? svg.querySelector(`[data-type="${type}"]`) : null;
  const tl = gsap.timeline();
  let delay = 0;
  svg.querySelectorAll<SVGGElement>("[data-layer]").forEach((g) => {
    const name = g.dataset.layer || "";
    const owner = g.parentElement?.closest("[data-type]");
    const want = owner
      ? owner === typeGroup && on.has(name)
      : on.has(name) && !(typeGroup && typeGroup.querySelector(`:scope > [data-layer="${name}"]`));
    if (g.dataset.dy) {
      const dy = JSON.parse(g.dataset.dy) as Record<string, number>;
      const key = g.classList.contains("tree") && name.startsWith("tree-r") ? rightKey
        : (name === "shop" || name === "oldshed") ? (low ? "low" : "")
        : leftKey;
      const y = dy[key] || 0;
      if (instant || g.dataset.on !== "1") gsap.set(g, { y });
      else gsap.to(g, { y, duration: 0.6, ease: "power2.inOut" });
    }
    const was = g.dataset.on === "1";
    if (want === was && !opts.force) return;
    g.dataset.on = want ? "1" : "0";
    gsap.killTweensOf(g);
    const parts = strokes(g);
    parts.forEach((p) => gsap.killTweensOf(p));
    if (!want) {
      if (instant) gsap.set(g, { autoAlpha: 0 });
      else tl.to(g, { autoAlpha: 0, duration: 0.28, ease: "power1.out" }, 0);
      return;
    }
    const solid = parts.filter((p) => !p.classList.contains("dash"));
    const dashed = parts.filter((p) => p.classList.contains("dash"));
    const glass = parts.filter((p) => p.classList.contains("glass"));
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

export function initScene(svg: Element) {
  svg.querySelectorAll<SVGGElement>("[data-layer]").forEach((g) => {
    g.dataset.on = "0";
    gsap.set(g, { autoAlpha: 0 });
  });
}

if (import.meta.env.DEV) {
  Object.assign(window, { __planScene: { syncScene, initScene, layersFor, sceneType } });
}
