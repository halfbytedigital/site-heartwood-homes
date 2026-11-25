/**
 * C29 job-type filters for a portfolio index (8+ projects).
 *
 * Markup contract:
 *   <div class="project-filters" data-project-filters>
 *     <div class="filter-chips" role="group" aria-label="Filter projects by type">
 *       <button type="button" data-filter="all" aria-pressed="true">All <span class="filter-count">14</span></button>
 *       <button type="button" data-filter="new-builds" aria-pressed="false">New builds <span class="filter-count">8</span></button>
 *     </div>
 *     <ul>
 *       <li data-types="new-builds lake-cabin">…</li>
 *     </ul>
 *   </div>
 *
 * Shareable via ?type=new-builds. A project may belong to more than one type.
 * Reduced motion: the reflow is instant (no FLIP or crossfade).
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

  const first = new Map<HTMLElement, DOMRect>();
  if (!reduced()) {
    for (const el of items) first.set(el, el.getBoundingClientRect());
  }

  for (const el of items) {
    const types = (el.dataset.types || "").trim().split(/\s+/);
    const show = next === "all" || types.includes(next);
    el.hidden = !show;
    if (show) el.removeAttribute("data-filtered-out");
    else el.setAttribute("data-filtered-out", "");
  }

  if (!reduced()) {
    for (const el of items) {
      if (el.hidden) continue;
      const a = first.get(el);
      if (!a) continue;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
        el.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 220, easing: "ease" });
      } else {
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)`, opacity: 0.85 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        );
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
