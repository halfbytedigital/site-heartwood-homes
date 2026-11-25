/**
 * C29 job-type filters. Motion stays in place: survivors FLIP from their real
 * previous box, entering cards fade and scale in their final cell, leaving
 * cards fade out before they are removed. Never animate from 0,0.
 * Reduced motion swaps instantly. Shareable via ?type=.
 */
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyFilter(root: HTMLElement, type: string, push = true) {
  const chips = [...root.querySelectorAll<HTMLButtonElement>("[data-filter]")];
  const items = [...root.querySelectorAll<HTMLElement>("[data-types]")];
  const valid = new Set(chips.map((c) => c.dataset.filter).filter(Boolean) as string[]);
  const next = valid.has(type) ? type : "all";

  for (const chip of chips) {
    chip.setAttribute("aria-pressed", String(chip.dataset.filter === next));
  }

  const wants = (el: HTMLElement) => {
    const types = (el.dataset.types || "").trim().split(/\s+/);
    return next === "all" || types.includes(next);
  };
  const shown = (el: HTMLElement) => !el.hidden && !el.hasAttribute("data-filtered-out");

  const place = (el: HTMLElement, show: boolean) => {
    el.hidden = !show;
    if (show) el.removeAttribute("data-filtered-out");
    else el.setAttribute("data-filtered-out", "");
    el.style.transform = "";
    el.style.opacity = "";
  };

  if (reduced() || !push) {
    for (const el of items) place(el, wants(el));
  } else {
    const before = new Map<HTMLElement, DOMRect>();
    for (const el of items) {
      if (!shown(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width > 1 && rect.height > 1) before.set(el, rect);
    }
    const leaving = items.filter((el) => shown(el) && !wants(el));
    const entering = items.filter((el) => !shown(el) && wants(el));
    const staying = items.filter((el) => shown(el) && wants(el));

    const hideLeaving = () => {
      for (const el of leaving) place(el, false);
      for (const el of entering) {
        place(el, true);
        el.style.opacity = "0";
      }
      requestAnimationFrame(() => {
        for (const el of staying) {
          const start = before.get(el);
          if (!start) continue;
          const end = el.getBoundingClientRect();
          const dx = start.left - end.left;
          const dy = start.top - end.top;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
            { duration: 230, easing: "ease-out" },
          );
        }
        for (const el of entering) {
          el.style.opacity = "";
          el.animate(
            [
              { opacity: 0, transform: "scale(0.98)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 180, easing: "ease-out" },
          );
        }
      });
    };

    if (!leaving.length) {
      hideLeaving();
    } else {
      let pending = leaving.length;
      for (const el of leaving) {
        const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease-out" });
        const done = () => {
          pending -= 1;
          if (pending === 0) hideLeaving();
        };
        animation.finished.then(done).catch(done);
      }
    }
  }

  if (push) {
    const url = new URL(location.href);
    if (next === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", next);
    history.replaceState({}, "", url);
  }
}

function init(root: HTMLElement) {
  const fromUrl = new URLSearchParams(location.search).get("type") || "all";
  applyFilter(root, fromUrl, false);
  root.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-filter]");
    if (!btn || !root.contains(btn)) return;
    applyFilter(root, btn.dataset.filter || "all", true);
  });
}

document.querySelectorAll<HTMLElement>("[data-project-filters]").forEach(init);
