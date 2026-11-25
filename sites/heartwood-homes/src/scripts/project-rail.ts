/**
 * C32 horizontal portrait rail.
 * 1:1 scrollbar (no snap, no custom momentum), live "01 / N" counter,
 * prev/next, overflow-x auto. No page scroll-jacking.
 */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

function setupRail(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-rail-track]");
  const count = root.querySelector<HTMLElement>("[data-rail-count]");
  const range = root.querySelector<HTMLInputElement>("[data-rail-scroll]");
  const prev = root.querySelector<HTMLButtonElement>("[data-rail-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-rail-next]");
  if (!track) return;

  const cards = () => [...track.querySelectorAll<HTMLElement>("[data-rail-card]")].filter((el) => {
    const cs = getComputedStyle(el);
    return !el.hidden && cs.display !== "none" && !el.hasAttribute("data-filtered-out");
  });

  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  const visibleIndex = () => {
    const list = cards();
    if (!list.length) return 1;
    const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft || "0");
    let best = 0;
    let bestDist = Infinity;
    list.forEach((el, i) => {
      const dist = Math.abs(el.getBoundingClientRect().left - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best + 1;
  };

  const sync = () => {
    const list = cards();
    const n = list.length;
    list.forEach((el, nIndex) => {
      const indexEl = el.querySelector<HTMLElement>(".index");
      if (indexEl) indexEl.textContent = pad(nIndex + 1);
    });
    const i = visibleIndex();
    if (count) count.textContent = `${pad(Math.min(i, Math.max(n, 1)) || 1)} / ${pad(n)}`;
    const max = maxScroll();
    if (range) {
      range.max = String(Math.max(1, Math.round(max)));
      range.value = String(Math.round(Math.min(track.scrollLeft, max)));
      range.disabled = max <= 0;
    }
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = max <= 0 || track.scrollLeft >= max - 2;
  };

  track.addEventListener("scroll", sync, { passive: true });

  range?.addEventListener("input", () => {
    track.scrollLeft = Number(range.value);
  });

  const step = (dir: number) => {
    const list = cards();
    if (!list.length) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const w = list[0].getBoundingClientRect().width + gap;
    track.scrollBy({ left: dir * w, behavior: "auto" });
  };
  prev?.addEventListener("click", () => step(-1));
  next?.addEventListener("click", () => step(1));

  const onArrows = (event: KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const target = event.target as HTMLElement;
    const onControl = target === track || target === range || target === prev || target === next;
    if (!onControl) return;
    event.preventDefault();
    step(event.key === "ArrowRight" ? 1 : -1);
  };
  root.addEventListener("keydown", onArrows);

  const mo = new MutationObserver(() => {
    track.scrollLeft = 0;
    sync();
  });
  mo.observe(track, { subtree: true, attributes: true, attributeFilter: ["hidden", "data-filtered-out"] });

  const ro = new ResizeObserver(sync);
  ro.observe(track);
  sync();
}

export function initProjectRails(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-project-rail]").forEach(setupRail);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initProjectRails());
  } else {
    initProjectRails();
  }
}
