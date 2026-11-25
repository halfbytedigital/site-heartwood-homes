/**
 * motion.ts — utilities for a site's motion PLAN (not a baseline on every section).
 * Use for: one hero load-in, one scroll-driven signature (IO fallback when view()
 * is unsupported), quick hover helpers, optional count-up / view transitions only
 * when the plan names them. Do not attach data-animate to every section.
 * Copy to sites/<slug>/src/scripts/motion.ts and import once from Base.astro:
 *   import "../scripts/motion";
 * In <head> before paint:
 *   <script is:inline>document.documentElement.classList.add("js");</script>
 * All no-ops under prefers-reduced-motion (final states, no leftover opacity: 0).
 * No libraries.
 */
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsViewTimeline = () => {
  try {
    return typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
  } catch {
    return false;
  }
};

const io = (cb: (el: Element) => void, rootMargin = "0px 0px -10% 0px", threshold = 0.2) => {
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        cb(e.target);
        obs.unobserve(e.target);
      }
    },
    { rootMargin, threshold },
  );
  return obs;
};

function prepareWords(root: HTMLElement) {
  if (root.dataset.wordsReady) return;
  const text = root.textContent ?? "";
  const tokens = text.split(/(\s+)/);
  if (tokens.filter((t) => t.trim()).length < 2) return;
  root.textContent = "";
  let i = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (/^\s+$/.test(tok)) {
      root.append(tok);
      continue;
    }
    const span = document.createElement("span");
    span.dataset.word = "";
    span.style.setProperty("--i", String(i++));
    span.textContent = tok;
    root.append(span);
  }
  root.dataset.wordsReady = "true";
}

function reveal(el: Element) {
  el.classList.add("is-in");
}

function initHero() {
  const heroes = document.querySelectorAll<HTMLElement>("[data-hero]");
  heroes.forEach((hero) => {
    const steps = [...hero.querySelectorAll<HTMLElement>("[data-hero-step]")];
    steps.forEach((el, idx) => {
      if (!el.style.getPropertyValue("--hero-step")) {
        const n = el.getAttribute("data-hero-step");
        el.style.setProperty("--hero-step", n && !Number.isNaN(Number(n)) ? String(Number(n) - 1) : String(idx));
      }
    });
    if (reduced()) {
      steps.forEach(reveal);
      return;
    }
    // Play once on arrival (rAF so the initial hidden state can paint).
    requestAnimationFrame(() => steps.forEach(reveal));
  });
}

function initReveals() {
  const viewOk = supportsViewTimeline();
  const wordHeads = document.querySelectorAll<HTMLElement>("[data-animate-words]");
  wordHeads.forEach(prepareWords);

  if (reduced()) {
    document.querySelectorAll("[data-animate], [data-animate-words], [data-hero-step]").forEach(reveal);
    return;
  }

  const observeList: HTMLElement[] = [];

  document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
    const delay = el.getAttribute("data-animate-delay");
    if (delay) el.style.setProperty("--animate-delay", delay);
    // Hero steps are started by initHero. View-timeline CSS covers simple reveals
    // in supporting browsers. Everything else (and img-reveal, stagger children
    // that should fire as a group) uses IO.
    if (el.hasAttribute("data-hero-step")) return;
    if (viewOk && el.getAttribute("data-animate") !== "hero-image") return;
    observeList.push(el);
  });

  document.querySelectorAll<HTMLElement>("[data-animate-stagger]").forEach((parent) => {
    const ms = parent.getAttribute("data-animate-stagger") || getComputedStyle(parent).getPropertyValue("--stagger") || "65";
    const step = Number(String(ms).replace("ms", "").trim()) || 65;
    parent.style.setProperty("--stagger", `${step}ms`);
    [...parent.children].forEach((child, i) => {
      if (child instanceof HTMLElement) {
        if (!child.hasAttribute("data-animate")) child.setAttribute("data-animate", "fade-up");
        child.style.setProperty("--animate-delay", String(i));
        if (!viewOk || true) {
          // Stagger groups always go through IO so they start together when the
          // group enters, not as each child crosses the view range alone.
          if (!observeList.includes(child)) observeList.push(child);
        }
      }
    });
  });

  wordHeads.forEach((el) => observeList.push(el));

  if (!observeList.length) return;
  const obs = io((el) => reveal(el), "0px 0px -8% 0px", 0.15);
  observeList.forEach((el) => obs.observe(el));
}

function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-header-sticky]");
  if (!header) return;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initCountUps() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-count-up]");
  if (!nodes.length) return;

  const animate = (el: HTMLElement) => {
    const raw = el.getAttribute("data-count-to") || el.textContent || "0";
    const match = raw.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
    if (!match) return;
    const target = Number(match[0]);
    const decimals = (match[1] || "").replace(".", "").length;
    const prefix = raw.slice(0, raw.indexOf(match[0]));
    const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
    if (reduced()) {
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }
    const dur = parseFloat(getComputedStyle(el).getPropertyValue("--dur-count")) || 1200;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = from + (target - from) * eased;
      // Never exceed the real claim, even mid-overshoot (there isn't one).
      const shown = t === 1 ? target : Math.min(val, target);
      el.textContent = `${prefix}${decimals ? shown.toFixed(decimals) : Math.round(shown)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const obs = io((el) => animate(el as HTMLElement), "0px 0px -10% 0px", 0.4);
  nodes.forEach((el) => {
    // Keep the final number in the DOM for no-JS / crawlers. Hide it only when
    // we're about to count (element is still offscreen).
    if (reduced()) return;
    obs.observe(el);
  });
}

function initParallax() {
  const items = document.querySelectorAll<HTMLElement>("[data-parallax]");
  if (!items.length || reduced()) return;
  const motion = document.documentElement.getAttribute("data-motion") || "bold";
  if (motion === "calm") return;

  const factors: Record<string, number> = { slow: 0.12, medium: 0.2, med: 0.2, fast: 0.3 };
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    items.forEach((el) => {
      const key = el.getAttribute("data-parallax") || "slow";
      const factor = factors[key] ?? Number(key) || 0.12;
      const rect = el.getBoundingClientRect();
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const max = parseFloat(getComputedStyle(el).getPropertyValue("--parallax-max")) || 8;
      const px = Math.max(-max, Math.min(max, progress * factor * 100));
      // max is %, convert roughly to px via element height * %
      const y = (px / 100) * Math.max(rect.height, 200);
      el.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
    });
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

function init() {
  initHero();
  initReveals();
  initHeader();
  initCountUps();
  initParallax();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

export {};
