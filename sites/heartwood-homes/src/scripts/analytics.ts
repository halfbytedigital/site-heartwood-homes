/**
 * Tiny analytics adapter. Import once from the base layout.
 * Reads data-event / data-event-* attributes and forwards to the chosen tool.
 * Fill in the Plausible / Umami / GA4 branch from brief/measurement.md.
 * Never invent a vendor snippet the client has not set up.
 */
type Props = Record<string, string | undefined>;

export function track(event: string, props: Props = {}) {
  const payload = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v != null && v !== "")
  );
  const w = window as Window & {
    plausible?: (e: string, o?: { props?: Props }) => void;
    umami?: { track: (e: string, d?: Props) => void };
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.plausible === "function") w.plausible(event, { props: payload });
  else if (w.umami && typeof w.umami.track === "function") w.umami.track(event, payload);
  else if (typeof w.gtag === "function") w.gtag("event", event, payload);
}

export function bindDataEvents(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-event]").forEach((el) => {
    if (el.dataset.eventBound) return;
    el.dataset.eventBound = "true";
    const ev = el.dataset.event;
    if (!ev) return;
    const fire = () => {
      const props: Props = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k === "event" || k === "eventBound") continue;
        if (k.startsWith("event") && k.length > 5) {
          const name = k.slice(5, 6).toLowerCase() + k.slice(6);
          props[name] = v;
        }
      }
      props.page = location.pathname;
      track(ev, props);
    };
    el.addEventListener("click", fire);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bindDataEvents());
  } else {
    bindDataEvents();
  }
}
