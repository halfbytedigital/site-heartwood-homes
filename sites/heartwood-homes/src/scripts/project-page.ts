/**
 * Default project-page shell (C28): walk-rail spy, fullscreen viewer,
 * saved-houses (localStorage, no account), next-house navigation.
 * Copy to src/scripts/project-page.ts and import once from Base.astro
 * (after analytics.ts). Works without JS: hero, in-page links, and
 * next-house links stay usable; saves and the viewer need this file.
 */
import { track } from "./analytics";

export type SavedHouse = { slug: string; name: string };

const STORAGE_KEY = "halfbyte:saved-houses";

export function loadSaved(): SavedHouse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((h): h is SavedHouse => !!h && typeof h.slug === "string" && typeof h.name === "string");
  } catch {
    return [];
  }
}

function persist(list: SavedHouse[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isSaved(slug: string): boolean {
  return loadSaved().some((h) => h.slug === slug);
}

export function toggleSave(slug: string, name: string): SavedHouse[] {
  const current = loadSaved();
  const exists = current.some((h) => h.slug === slug);
  const next = exists ? current.filter((h) => h.slug !== slug) : [...current, { slug, name }];
  persist(next);
  track("save_house", { slug, name, saved: exists ? "false" : "true", count: String(next.length) });
  return next;
}

export function savedNames(): string {
  return loadSaved().map((h) => h.name).join(", ");
}

export function syncSaveUI(root: ParentNode = document) {
  const list = loadSaved();
  const n = list.length;
  root.querySelectorAll<HTMLButtonElement>("[data-save-house]").forEach((btn) => {
    const slug = btn.dataset.houseSlug || "";
    const on = list.some((h) => h.slug === slug);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    const label = btn.dataset.houseName || "this house";
    btn.setAttribute("aria-label", on ? `Unsave ${label}` : `Save ${label}`);
  });
  root.querySelectorAll<HTMLElement>("[data-saved-count]").forEach((el) => {
    if (n === 0) {
      el.hidden = true;
      el.textContent = "";
    } else {
      el.hidden = false;
      el.textContent = String(n);
    }
  });
  const label = n === 0 ? "Start your home" : n === 1 ? "Start your home (1 saved)" : `Start your home (${n} saved)`;
  root.querySelectorAll<HTMLElement>("[data-start-cta]").forEach((el) => {
    const text = el.querySelector("[data-start-cta-label]") || el;
    if (text.childNodes.length === 1 && text.childNodes[0].nodeType === 3) {
      text.textContent = label;
    } else if (el.matches("[data-start-cta]") && el.children.length === 0) {
      el.textContent = label;
    } else {
      const slot = el.querySelector("[data-start-cta-label]");
      if (slot) slot.textContent = label;
      else el.setAttribute("aria-label", label);
    }
  });
  const names = savedNames();
  root.querySelectorAll<HTMLElement>("[data-saved-houses-field]").forEach((el) => {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.value = names;
    } else {
      el.textContent = names;
      el.hidden = n === 0;
    }
  });
}

function initWalkRail() {
  const rail = document.querySelector("[data-walk-rail]");
  const fill = document.querySelector<HTMLElement>("[data-walk-fill]");
  const sections = [...document.querySelectorAll<HTMLElement>("[data-walk-section]")];
  if (!sections.length) return;

  const dots = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>("[data-walk-dot]").forEach((a) => {
    const id = a.getAttribute("data-walk-dot") || a.getAttribute("href")?.replace(/^#/, "") || "";
    if (id) dots.set(id, a);
  });

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setCurrent = (id: string | null) => {
    dots.forEach((el, key) => {
      if (key === id) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
  };

  const updateFill = () => {
    if (!fill) return;
    const first = sections[0];
    const last = sections[sections.length - 1];
    const start = first.getBoundingClientRect().top + window.scrollY - 80;
    const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.4;
    const p = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
    fill.style.transform = `scaleX(${p})`;
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setCurrent(visible.target.id);
    },
    { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
  );
  sections.forEach((s) => io.observe(s));
  updateFill();
  window.addEventListener("scroll", updateFill, { passive: true });
  if (reduced && fill) fill.style.transition = "none";
}

function initViewer() {
  const viewer = document.querySelector<HTMLDialogElement>("[data-viewer]");
  if (!viewer) return;
  const frame = viewer.querySelector<HTMLImageElement>("[data-viewer-frame]");
  const count = viewer.querySelector("[data-viewer-count]");
  const triggers = [...document.querySelectorAll<HTMLElement>("[data-view]")];
  if (!frame || !triggers.length) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) frame.style.transition = "none";

  let index = 0;
  let touchX = 0;

  const show = (i: number) => {
    index = (i + triggers.length) % triggers.length;
    const t = triggers[index];
    const img = t.closest("figure, .project-shot")?.querySelector("img") || t.querySelector("img");
    frame.src = img?.currentSrc || img?.src || t.getAttribute("data-src") || "";
    frame.alt = t.getAttribute("data-alt") || img?.alt || "";
    if (count) count.textContent = `${index + 1} of ${triggers.length}`;
  };

  triggers.forEach((t, i) => {
    t.addEventListener("click", () => {
      show(i);
      viewer.showModal();
      viewer.querySelector<HTMLElement>("[data-viewer-close]")?.focus();
    });
  });

  viewer.querySelector("[data-viewer-close]")?.addEventListener("click", () => viewer.close());
  viewer.querySelector("[data-viewer-prev]")?.addEventListener("click", () => show(index - 1));
  viewer.querySelector("[data-viewer-next]")?.addEventListener("click", () => show(index + 1));
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
  });
  viewer.addEventListener("touchstart", (e) => {
    touchX = e.changedTouches[0]?.clientX ?? 0;
  }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX;
    if (Math.abs(dx) < 40) return;
    show(dx < 0 ? index + 1 : index - 1);
  }, { passive: true });
}

function initSaves() {
  syncSaveUI();
  document.querySelectorAll<HTMLButtonElement>("[data-save-house]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.houseSlug || "";
      const name = btn.dataset.houseName || slug;
      if (!slug) return;
      toggleSave(slug, name);
      syncSaveUI();
    });
  });
}

function initNextHouse() {
  const supportsMpa = CSS.supports("at-rule", "@view-transition") || "startViewTransition" in document;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = (href: string, event?: Event) => {
    if (reduced || supportsMpa) return; // allow default navigation; CSS @view-transition handles MPA
    event?.preventDefault();
    document.documentElement.classList.add("is-leaving");
    window.setTimeout(() => { location.href = href; }, 180);
  };

  document.querySelectorAll<HTMLAnchorElement>("[data-next-house], [data-prev-house]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href) go(href, e);
    });
  });

  const card = document.querySelector<HTMLElement>("[data-next-house-wrap]");
  if (!card) return;
  let x = 0;
  card.addEventListener("touchstart", (e) => { x = e.changedTouches[0]?.clientX ?? 0; }, { passive: true });
  card.addEventListener("touchend", (e) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - x;
    if (Math.abs(dx) < 40) return;
    const sel = dx < 0 ? "[data-next-house]" : "[data-prev-house]";
    const link = document.querySelector<HTMLAnchorElement>(sel);
    const href = link?.getAttribute("href");
    if (href) go(href);
  }, { passive: true });
}

function init() {
  initWalkRail();
  initViewer();
  initSaves();
  initNextHouse();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}
