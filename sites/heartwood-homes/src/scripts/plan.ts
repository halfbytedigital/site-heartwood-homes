/**
 * C33 build brief on /plan/. Copy and flow follow the approved v2 mock.
 * Contact details are never written to localStorage.
 */
import { track } from "./analytics";
import { loadSaved } from "./project-page";
import { houseSVG, syncSketch } from "./sketch-lib.js";

const DRAFT_KEY = "heartwood-build-brief";

const TYPE_LABELS: Record<string, string> = {
  family: "A house for your family",
  lake: "A lake or mountain house",
  cabin: "A cabin",
  aframe: "An A-frame",
  rental: "A short-term rental",
  townhome: "Townhomes or a small investment",
  else: "Something else",
};
const ACRE_LABELS: Record<string, string> = {
  under1: "Under 1 acre",
  "1-3": "1–3 acres",
  "3-10": "3–10 acres",
  "10+": "10 or more acres",
  unsure: "Acreage still to confirm",
};
const TERRAIN_LABELS: Record<string, string> = {
  flat: "A fairly flat lot",
  gentle: "A gentle slope",
  steep: "Steep or mountain ground",
  water: "Waterfront",
};
const COVER_LABELS: Record<string, string> = { cleared: "Cleared", partly: "Partly wooded", heavy: "Heavily wooded" };
const ACCESS_LABELS: Record<string, string> = {
  paved: "Paved access",
  gravel: "Gravel access",
  needs: "A drive still to build",
  unsure: "Access still to confirm",
};
const NEED_LABELS: Record<string, string> = {
  porch: "A porch",
  screened: "A screened porch",
  garage: "A garage",
  basement: "A walkout or basement",
  bedroom: "A main-level bedroom",
  fireplace: "A fireplace",
  office: "A home office",
  shop: "A shop or outbuilding",
};
const BUDGET_LABELS: Record<string, string> = {
  modest: "A modest budget for the house",
  mid: "A mid-range budget for the house",
  higher: "A higher-end budget for the house",
  unsure: "Budget still to talk through",
};
const PAY_LABELS: Record<string, string> = {
  cash: "Paying cash",
  loan: "A construction loan",
  unsure: "Still deciding how to pay",
};
const TIMING_LABELS: Record<string, string> = {
  ready: "Ready to start",
  year: "This year",
  next: "Next year",
  looking: "Just looking",
};
const WHO_LABELS: Record<string, string> = {
  us: "Just us",
  kids: "Kids at home",
  aging: "Aging in place",
  multi: "More than one generation",
  guests: "Guests, often",
};
const USE_LABELS: Record<string, string> = {
  full: "A full-time home",
  second: "A second home",
  rental: "A short-term rental",
  unsure: "Use still to confirm",
};
const LAND_OUT: Record<string, string> = { yes: "Yes", no: "Not yet", unsure: "Not sure" };
const TIMING_OUT: Record<string, string> = {
  ready: "Ready to start",
  year: "This year",
  next: "Next year",
  looking: "Just looking",
};

type State = {
  land: string;
  place: string;
  pinned: boolean;
  pinX: number;
  pinY: number;
  acres: string;
  terrain: string;
  cover: string;
  access: string;
  power: string;
  water: string;
  sewer: string;
  internet: string;
  structure: string;
  type: string;
  typeOther: string;
  beds: string;
  baths: string;
  stories: string;
  sqft: number;
  who: string[];
  use: string;
  plans: string;
  plansLink: string;
  plansFile: string;
  needs: string[];
  budget: string;
  pay: string;
  timing: string;
  sell: string;
  survey: string;
  hoa: string;
  otherPerson: string;
  callTime: string;
  source: string;
};

const root = document.querySelector<HTMLElement>("[data-plan]");
if (root) {
  const state: State = {
    land: "", place: "", pinned: false, pinX: 0, pinY: 0, acres: "",
    terrain: "", cover: "", access: "",
    power: "", water: "", sewer: "", internet: "", structure: "",
    type: "", typeOther: "",
    beds: "", baths: "", stories: "", sqft: 2400,
    who: [], use: "",
    plans: "", plansLink: "", plansFile: "",
    needs: [],
    budget: "", pay: "",
    timing: "", sell: "",
    survey: "", hoa: "", otherPerson: "", callTime: "", source: "",
  };

  const stage = document.getElementById("sketch-stage");
  const briefSlot = document.getElementById("brief-sketch-slot");
  if (stage) stage.innerHTML = houseSVG();

  const wideSteps = new Set(["brief", "extra"]);
  let lastQuestion = "land";
  let entryPath = "";
  let started = false;
  let completed = false;
  let skipDraft = false;

  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel);
  const val = (name: string) => root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value || "";
  const vals = (name: string) => [...root.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map((i) => i.value);
  const field = (id: string) => document.getElementById(id) as HTMLInputElement | null;

  const flow = () => {
    const steps = ["land"];
    if (state.land === "yes") steps.push("place", "terrain", "utilities");
    steps.push("type", "size", "people", "plans", "money", "timing");
    return steps;
  };

  const readForm = () => {
    state.land = val("land");
    state.place = field("place")?.value.trim() || "";
    state.acres = val("acres");
    state.terrain = val("terrain");
    state.cover = val("cover");
    state.access = val("access");
    state.power = val("power");
    state.water = val("water");
    state.sewer = val("sewer");
    state.internet = val("internet");
    state.structure = val("structure");
    state.type = val("type");
    state.typeOther = field("else-text")?.value.trim() || "";
    state.beds = val("beds");
    state.baths = val("baths");
    state.stories = val("stories");
    state.sqft = Number(field("sqft")?.value) || 2400;
    state.who = vals("who");
    state.use = val("use");
    state.plans = val("plans");
    state.plansLink = field("plans-link")?.value.trim() || "";
    state.needs = vals("need");
    state.budget = val("budget");
    state.pay = val("pay");
    state.timing = val("timing");
    state.sell = val("sell");
    state.survey = val("survey");
    state.hoa = val("hoa");
    state.otherPerson = field("other-person")?.value.trim() || "";
    state.callTime = val("call");
    state.source = val("source");
  };

  const setRadio = (name: string, value: string) => {
    const el = root.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
    if (el) el.checked = true;
  };
  const setChecks = (name: string, values: string[]) => {
    const set = new Set(values);
    root.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((el) => {
      el.checked = set.has(el.value);
    });
  };

  const normLand = (value: string) => {
    const v = value.toLowerCase();
    if (v === "yes" || v === "have-land") return "yes";
    if (v === "no" || v === "not yet" || v === "find-land") return "no";
    if (v === "unsure" || v === "not sure") return "unsure";
    return "";
  };
  const normTiming = (value: string) => {
    const v = value.toLowerCase();
    if (v === "ready" || v === "ready to start") return "ready";
    if (v === "year" || v === "this year") return "year";
    if (v === "next" || v === "next year") return "next";
    if (v === "looking" || v === "just looking") return "looking";
    return "";
  };

  const typeLabel = () => {
    if (state.type === "else" && state.typeOther) return state.typeOther;
    return TYPE_LABELS[state.type] || "";
  };
  const sqftLabel = () => "About " + Number(state.sqft).toLocaleString("en-US") + " square feet";

  const cheerFor = (name: string) => {
    if (name === "land") {
      if (state.land === "yes") return "We’ll walk it with you.";
      if (state.land === "no") return "We can help you look.";
      if (state.land === "unsure") return "We can start either way.";
    }
    if (name === "place" && (state.place || state.acres)) return "That’s enough to start.";
    if (name === "terrain") {
      if (state.terrain === "water") return "We’ll plan for the view and the bank.";
      if (state.terrain === "steep") return "We’ve built on ground like this.";
      if (state.cover === "heavy" || state.cover === "partly") return "We’ll plan around the trees you want to keep.";
      if (state.terrain === "gentle") return "A little slope is often a gift for the house.";
    }
    if (name === "utilities") {
      if (state.sewer === "unsure" || state.sewer === "septic") return "A perc test comes early, if you go that way.";
      if (state.power === "unsure" || state.water === "unsure") return "We’ll find that out with you.";
      if (state.structure === "yes") return "We’ll look at what’s already there, and whether it comes down.";
    }
    if (name === "type" && state.type) return "The lot will have a say in the final shape.";
    if (name === "size") return "A starting size is all we need for now.";
    if (name === "people") {
      if (state.who.includes("aging")) return "We’ll keep the main floor easy to live on.";
      if (state.who.includes("multi")) return "We’ll plan for how you all live together.";
      if (state.use === "second") return "A house you come home to, when you can.";
    }
    if (name === "plans") {
      if (state.plans === "fresh") return "That’s most of the people we work with.";
      if (state.plans === "have") return "We’ll read the plans against the lot.";
      if (state.plans === "sketch") return "A starting point is plenty.";
    }
    if (name === "money") {
      if (state.budget === "unsure" || (!state.budget && state.pay === "unsure")) return "That’s fine. We’ll talk through it.";
      if (state.pay === "cash") return "That keeps the path simple.";
      if (state.pay === "loan") return "We’ll work with your lender.";
    }
    if (name === "timing") {
      if (state.sell === "yes") return "We’ll time the work around the house you need to sell.";
      if (state.timing === "looking") return "No rush. The brief still helps the first conversation.";
      if (state.timing === "ready") return "We’ll start with the lot.";
    }
    return "";
  };

  const lookAtFirst = () => {
    const items: string[] = [];
    if (state.land === "yes") {
      items.push("Walk the lot with you.");
      if (state.terrain === "water") items.push("The bank, the view, and what the water setbacks will allow.");
      if (state.terrain === "steep") items.push("How to sit the house on the slope, and how you get to it.");
      if (state.cover === "heavy" || state.cover === "partly") items.push("Which trees to keep.");
      if (state.sewer === "unsure" || state.sewer === "septic") items.push("A perc test, before anything is settled.");
      if (state.water === "unsure" || state.water === "well") items.push("Water — a well, or a public line, if one is close.");
      if (state.power === "no" || state.power === "unsure") items.push("Power to the lot.");
      if (state.access === "needs") items.push("A drive in, and whether the road can take construction traffic.");
      if (state.structure === "yes") items.push("The structure that’s already there, and whether it comes down.");
      if (state.survey === "none" || state.survey === "unsure") items.push("Whether a survey is already in hand.");
    } else if (state.land === "no") {
      items.push("Where you want to be, and what kind of lot will carry this house.");
    } else {
      items.push("Whether you already have land, or still need to find it.");
    }
    if (state.plans === "have") items.push("The plans you have, read against the lot.");
    else if (state.plans === "sketch") items.push("The sketches or pictures you’ve saved.");
    else if (state.type) items.push("How you want to live in the house, then a plan that fits the lot.");
    if (state.who.includes("aging")) items.push("A main floor that’s easy to stay on.");
    if (state.who.includes("multi")) items.push("How more than one generation will use the house.");
    if (state.sell === "yes") items.push("Timing around the house you need to sell first.");
    const seen = new Set<string>();
    return items.filter((item) => (seen.has(item) ? false : (seen.add(item), true))).slice(0, 5);
  };

  const briefRows = () => {
    const rows: [string, string][] = [];
    const type = typeLabel();
    if (type) rows.push(["The house", type + "."]);
    const sizeBits: string[] = [];
    if (state.sqft) sizeBits.push(sqftLabel());
    if (state.beds) sizeBits.push(state.beds === "5" ? "5 or more bedrooms" : state.beds + " bedrooms");
    if (state.baths) {
      const baths = state.baths === "2.5" ? "2½" : state.baths === "4" ? "4 or more" : state.baths;
      sizeBits.push(baths + " baths");
    }
    if (state.stories && state.stories !== "unsure") sizeBits.push(state.stories === "1" ? "One story" : state.stories + " stories");
    if (sizeBits.length) rows.push(["Size", sizeBits.join(". ") + "."]);
    if (state.who.length || state.use) {
      const bits = [...state.who.map((w) => WHO_LABELS[w]), USE_LABELS[state.use] || ""].filter(Boolean);
      rows.push(["Who it’s for", bits.join(". ") + "."]);
    }
    if (state.needs.length) {
      const labels = state.needs.map((n) => (NEED_LABELS[n] || n).replace(/^A /, "a "));
      let phrase = labels[0] || "";
      if (labels.length === 2) phrase = labels[0] + " and " + labels[1];
      else if (labels.length > 2) phrase = labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1];
      rows.push(["Must-haves", phrase.charAt(0).toUpperCase() + phrase.slice(1) + "."]);
    }
    if (state.plans === "have") {
      const extra = [state.plansLink ? "Link: " + state.plansLink : "", state.plansFile ? "File: " + state.plansFile : ""].filter(Boolean);
      rows.push(["Plans", "They have a set of plans." + (extra.length ? " " + extra.join(" ") : "")]);
    } else if (state.plans === "sketch") rows.push(["Plans", "A sketch or a board, as a starting point."]);
    else if (state.plans === "fresh") rows.push(["Plans", "Starting fresh."]);
    if (state.land === "yes") {
      const lotBits: string[] = [];
      if (state.acres && ACRE_LABELS[state.acres]) {
        lotBits.push(ACRE_LABELS[state.acres].replace(/^A/, "a").replace("Acreage still to confirm", "acreage still to confirm"));
      }
      if (state.terrain) lotBits.push(TERRAIN_LABELS[state.terrain].replace(/^A /, "a ").replace(/^Steep/, "steep").replace(/^Waterfront/, "waterfront"));
      if (state.cover) lotBits.push(COVER_LABELS[state.cover].toLowerCase());
      if (state.access && state.access !== "unsure") lotBits.push(ACCESS_LABELS[state.access].toLowerCase().replace(/^a /, ""));
      if (state.pinned) lotBits.push("with a pin on the lot");
      let lotText = state.place || "They have land";
      if (lotBits.length) {
        lotText += ". " + lotBits[0].charAt(0).toUpperCase() + lotBits[0].slice(1) + (lotBits.length > 1 ? ", " + lotBits.slice(1).join(", ") : "");
      }
      rows.push(["The lot", lotText + "."]);
      const util: string[] = [];
      if (state.power === "yes") util.push("Power at the road");
      if (state.power === "no") util.push("Power not yet at the road");
      if (state.water === "well") util.push("A well, or plans for one");
      if (state.water === "public") util.push("Public water");
      if (state.water === "unsure") util.push("Water still to confirm");
      if (state.sewer === "septic") util.push("Septic");
      if (state.sewer === "public") util.push("Public sewer");
      if (state.sewer === "unsure") util.push("Sewer still to confirm");
      if (state.internet === "yes") util.push("Internet at the road");
      if (state.structure === "yes") util.push("A structure to take down");
      if (util.length) rows.push(["On the lot", util.join(". ") + "."]);
    } else if (state.land === "no") rows.push(["The lot", "Land still to find."]);
    else if (state.land === "unsure") rows.push(["The lot", "Land situation still to confirm."]);
    const money: string[] = [];
    if (state.budget) money.push(BUDGET_LABELS[state.budget]);
    if (state.pay) money.push(PAY_LABELS[state.pay]);
    if (money.length) rows.push(["The house budget", money.join(". ") + "."]);
    const time: string[] = [];
    if (state.timing) time.push(TIMING_LABELS[state.timing]);
    if (state.sell === "yes") time.push("They need to sell a house first");
    if (state.sell === "no") time.push("They don’t need to sell first");
    if (time.length) rows.push(["Timing", time.join(". ") + "."]);
    return rows;
  };

  const subjectLine = () => {
    const type = typeLabel() || "a custom house";
    const where = state.place ? " in " + state.place : "";
    return "Build brief — " + type.charAt(0).toLowerCase() + type.slice(1) + where;
  };

  const messageText = () => {
    const lines = briefRows().map(([, dd]) => dd);
    const first = lookAtFirst();
    const houses = fieldValue("houses");
    const parts = [subjectLine(), "", ...lines, "", "Look at first", ...first.map((item) => "- " + item)];
    if (houses) parts.push("", "Houses you liked: " + houses);
    return parts.join("\n");
  };

  const text = (value: string) => document.createTextNode(value);
  const el = (tag: string, className?: string) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  const updateBrief = () => {
    const dl = document.getElementById("brief-dl");
    const list = document.getElementById("look-first-list");
    const frame = document.getElementById("email-frame");
    if (!dl || !list || !frame) return;
    dl.replaceChildren();
    briefRows().forEach(([dt, dd]) => {
      const row = el("div");
      const term = el("dt");
      term.append(text(dt));
      const def = el("dd");
      def.append(text(dd));
      row.append(term, def);
      dl.append(row);
    });
    list.replaceChildren();
    lookAtFirst().forEach((item) => {
      const li = el("li");
      li.append(text(item));
      list.append(li);
    });
    frame.replaceChildren();
    const meta = el("div", "email-meta");
    const to = el("div");
    const toLabel = el("b");
    toLabel.append(text("To"));
    to.append(toLabel, text(" Heartwood Homes"));
    const subject = el("div");
    const subjectLabel = el("b");
    subjectLabel.append(text("Subject"));
    subject.append(subjectLabel, text(" " + subjectLine()));
    meta.append(to, subject);
    const body = el("div", "email-body");
    const heading = el("h3");
    heading.append(text("Build brief"));
    body.append(heading);
    briefRows().forEach(([, dd]) => {
      const p = el("p");
      p.append(text(dd));
      body.append(p);
    });
    const look = el("p");
    const lookLabel = el("b");
    lookLabel.append(text("Look at first"));
    look.append(lookLabel);
    body.append(look);
    const ul = el("ul");
    lookAtFirst().forEach((item) => {
      const li = el("li");
      li.append(text(item));
      ul.append(li);
    });
    body.append(ul);
    frame.append(meta, body);
  };

  const refresh = () => {
    readForm();
    document.getElementById("else-field")?.classList.toggle("is-on", state.type === "else");
    document.getElementById("plans-attach")?.classList.toggle("is-on", state.plans === "have" || state.plans === "sketch");
    const n = Number(field("sqft")?.value) || 2400;
    const readout = document.getElementById("sqft-readout");
    if (readout) readout.textContent = "About " + n.toLocaleString("en-US") + " square feet";
    const num = field("sqft-num");
    if (num && document.activeElement !== num) num.value = String(n);
    if (stage) syncSketch(stage, state);
    const onBrief = !document.getElementById("panel-brief")?.hidden;
    if (onBrief && briefSlot && stage) {
      briefSlot.innerHTML = stage.innerHTML;
      syncSketch(briefSlot, state);
      updateBrief();
    }
    const items: string[] = [];
    const t = typeLabel();
    if (t) items.push(t);
    if (state.sqft && t) items.push(sqftLabel());
    if (state.terrain) items.push(TERRAIN_LABELS[state.terrain]);
    if (state.cover) items.push(COVER_LABELS[state.cover]);
    state.needs.forEach((n) => items.push(NEED_LABELS[n]));
    const caption = document.getElementById("sketch-caption");
    if (caption) caption.textContent = items.length ? items.slice(0, 2).join(". ") + "." : "Answer a few questions, and the lot and the house will fill in.";
    const list = document.getElementById("sketch-list");
    if (list) {
      list.replaceChildren();
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.append(li);
      });
    }
    const panel = root.querySelector<HTMLElement>(".panel.is-on");
    const cheer = panel?.querySelector<HTMLElement>("[data-cheer]");
    if (cheer && panel) cheer.textContent = cheerFor(panel.id.replace("panel-", ""));
  };

  const markStart = () => {
    if (started) return;
    started = true;
    track("wizard_start", { page: location.pathname });
  };

  const persist = (step: string) => {
    if (skipDraft) return;
    if (!answered() && step === "land") {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, path: entryPath, state }));
  };

  const showPanel = (name: string, opts: { focus?: boolean; trackStep?: boolean } = {}) => {
    readForm();
    const steps = flow();
    if (name === "next") {
      const cur = root.querySelector(".panel.is-on")?.id.replace("panel-", "") || "land";
      const i = steps.indexOf(cur);
      name = i >= 0 && i < steps.length - 1 ? steps[i + 1] : "brief";
    }
    if (name === "back") {
      const cur = root.querySelector(".panel.is-on")?.id.replace("panel-", "") || "land";
      const i = steps.indexOf(cur);
      name = i > 0 ? steps[i - 1] : steps[0];
    }
    if (!document.getElementById("panel-" + name)) return;
    if (!wideSteps.has(name)) lastQuestion = name;

    root.querySelectorAll<HTMLElement>(".panel").forEach((panel) => {
      const on = panel.id === "panel-" + name;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });
    document.getElementById("layout")?.classList.toggle("is-wide", wideSteps.has(name));
    const rail = document.getElementById("sketch-rail");
    if (rail) rail.hidden = wideSteps.has(name);

    const label = document.getElementById("progress-label");
    const railBar = document.getElementById("progress-rail");
    const idx = steps.indexOf(name);
    if (label && railBar) {
      railBar.style.gridTemplateColumns = `repeat(${steps.length}, 1fr)`;
      if (name === "brief" || name === "extra") {
        label.textContent = name === "brief" ? "Your brief" : "A few more details";
        railBar.replaceChildren(...steps.map(() => {
          const span = document.createElement("span");
          span.className = "is-done";
          return span;
        }));
      } else {
        const n = idx + 1;
        label.textContent = `Step ${n} of ${steps.length}`;
        railBar.replaceChildren(...steps.map((_, i) => {
          const span = document.createElement("span");
          span.className = i + 1 < n ? "is-done" : i + 1 === n ? "is-on" : "";
          return span;
        }));
      }
    }

    if (name === "brief") {
      if (briefSlot && stage) {
        briefSlot.innerHTML = stage.innerHTML;
        syncSketch(briefSlot, state);
      }
      updateBrief();
      if (!completed) {
        completed = true;
        track("wizard_complete", { page: location.pathname });
      }
    }

    if (opts.trackStep !== false && steps.includes(name)) {
      track("wizard_step", { step: name, index: String(steps.indexOf(name) + 1) });
    }
    history.replaceState(null, "", "#" + name);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    refresh();
    persist(name);
    if (opts.focus !== false) {
      document.getElementById(name === "brief" ? "brief-title" : name + "-title")?.focus();
    }
  };

  const applyStateToForm = () => {
    if (state.land) setRadio("land", state.land);
    if (field("place")) field("place")!.value = state.place;
    if (state.acres) setRadio("acres", state.acres);
    (["terrain", "cover", "access", "power", "water", "sewer", "internet", "structure", "type", "beds", "baths", "stories", "use", "plans", "budget", "pay", "timing", "sell", "survey", "hoa", "source"] as const)
      .forEach((name) => { if (state[name]) setRadio(name, state[name]); });
    setRadio("call", state.callTime);
    setChecks("who", state.who);
    setChecks("need", state.needs);
    if (field("else-text")) field("else-text")!.value = state.typeOther;
    if (field("plans-link")) field("plans-link")!.value = state.plansLink;
    if (field("other-person")) field("other-person")!.value = state.otherPerson;
    if (field("sqft")) field("sqft")!.value = String(state.sqft || 2400);
    if (field("sqft-num")) field("sqft-num")!.value = String(state.sqft || 2400);
    if (state.pinned) placePin(state.pinX, state.pinY);
  };

  const placePin = (xRatio: number, yRatio: number) => {
    const frame = document.getElementById("map-frame");
    document.getElementById("map-box")?.classList.add("is-on");
    if (!frame) return;
    let pin = frame.querySelector<HTMLElement>(".map-pin-el");
    if (!pin) {
      pin = document.createElement("span");
      pin.className = "map-pin-el";
      pin.innerHTML = `<svg viewBox="0 0 18 26" width="18" height="26" aria-hidden="true"><path d="M9 24 C 9 24, 2 14, 2 9 a 7 7 0 1 1 14 0 C 16 14, 9 24, 9 24 z" fill="currentColor" stroke="none"/><circle cx="9" cy="9" r="2.5" fill="#E7EBE7"/></svg>`;
      frame.append(pin);
    }
    const box = frame.getBoundingClientRect();
    const x = xRatio ? xRatio * (box.width || frame.clientWidth) : frame.clientWidth / 2;
    const y = yRatio ? yRatio * (box.height || frame.clientHeight) : frame.clientHeight / 2;
    pin.style.left = x + "px";
    pin.style.top = y + "px";
    const note = document.getElementById("pin-note");
    if (note) note.textContent = "Pinned. You can move it, or leave it.";
  };

  const briefParams = () => {
    readForm();
    const params = new URLSearchParams();
    const work = field("data-brief-work") ? "" : (root.querySelector<HTMLInputElement>("[data-brief-work]")?.value || "custom-home");
    params.set("work", root.querySelector<HTMLInputElement>("[data-brief-work]")?.value || "custom-home");
    if (entryPath) params.set("path", entryPath);
    if (state.land) params.set("land", LAND_OUT[state.land] || state.land);
    if (state.timing) params.set("timeline", TIMING_OUT[state.timing] || state.timing);
    if (state.timing) params.set("timing", state.timing);
    const singles: [string, string][] = [
      ["place", state.place], ["acres", state.acres], ["terrain", state.terrain], ["cover", state.cover],
      ["access", state.access], ["power", state.power], ["water", state.water], ["sewer", state.sewer],
      ["internet", state.internet], ["structure", state.structure], ["type", state.type],
      ["beds", state.beds], ["baths", state.baths], ["stories", state.stories], ["use", state.use],
      ["plans", state.plans], ["budget", state.budget], ["pay", state.pay], ["sell", state.sell],
      ["survey", state.survey], ["hoa", state.hoa], ["call", state.callTime], ["source", state.source],
      ["else", state.typeOther], ["plansLink", state.plansLink], ["person", state.otherPerson],
    ];
    singles.forEach(([key, value]) => { if (value) params.set(key, value); });
    if (state.sqft) params.set("sqft", String(state.sqft));
    if (state.who.length) params.set("who", state.who.join(","));
    if (state.needs.length) params.set("needs", state.needs.join(","));
    if (state.pinned) {
      params.set("pin", "1");
      if (state.pinX) params.set("pinx", String(Math.round(state.pinX * 1000) / 1000));
      if (state.pinY) params.set("piny", String(Math.round(state.pinY * 1000) / 1000));
    }
    void work;
    return params;
  };

  const exitToContact = (step: string) => {
    markStart();
    track("wizard_exit_contact", { step });
    const params = briefParams();
    params.set("from", "plan");
    params.set("step", step);
    params.set("said", briefRows().map(([, dd]) => dd).join(" · ").slice(0, 700));
    location.assign("/contact/?" + params.toString());
  };

  const answered = () => Boolean(
    state.land || state.type || state.place || state.terrain || state.timing || state.budget || entryPath
  );

  const applyQuery = (params: URLSearchParams) => {
    entryPath = params.get("path") || "";
    if (entryPath === "have-land") setRadio("land", "yes");
    if (entryPath === "find-land") setRadio("land", "no");
    if (entryPath === "dreaming") setRadio("timing", "looking");
    const land = normLand(params.get("land") || "");
    if (land) setRadio("land", land);
    const timing = normTiming(params.get("timing") || params.get("timeline") || "");
    if (timing) setRadio("timing", timing);
    const radios = ["acres", "terrain", "cover", "access", "power", "water", "sewer", "internet", "structure", "type", "beds", "baths", "stories", "use", "plans", "budget", "pay", "sell", "survey", "hoa", "call", "source"];
    radios.forEach((name) => { const v = params.get(name); if (v) setRadio(name, v); });
    if (params.get("place") && field("place")) field("place")!.value = params.get("place") || "";
    if (params.get("else") && field("else-text")) field("else-text")!.value = params.get("else") || "";
    if (params.get("plansLink") && field("plans-link")) field("plans-link")!.value = params.get("plansLink") || "";
    if (params.get("person") && field("other-person")) field("other-person")!.value = params.get("person") || "";
    if (params.get("sqft")) {
      if (field("sqft")) field("sqft")!.value = params.get("sqft") || "";
      if (field("sqft-num")) field("sqft-num")!.value = params.get("sqft") || "";
    }
    if (params.get("who")) setChecks("who", params.get("who")!.split(",").filter(Boolean));
    if (params.get("needs")) setChecks("need", params.get("needs")!.split(",").filter(Boolean));
    if (params.get("pin") === "1") {
      state.pinned = true;
      state.pinX = Number(params.get("pinx")) || 0.5;
      state.pinY = Number(params.get("piny")) || 0.5;
      placePin(state.pinX, state.pinY);
    }
    const work = params.get("work");
    const workField = root.querySelector<HTMLInputElement>("[data-brief-work]");
    if (workField && work) workField.value = work;
    const pathField = root.querySelector<HTMLInputElement>("[data-brief-path]");
    if (pathField) pathField.value = entryPath;
  };

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { step?: string; path?: string; state?: Partial<State> };
      if (!parsed?.state) return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const startStep = (params: URLSearchParams) => {
    const hash = (location.hash || "").replace("#", "");
    if (hash && document.getElementById("panel-" + hash)) return hash;
    const land = normLand(params.get("land") || "") || (params.get("path") === "have-land" ? "yes" : params.get("path") === "find-land" ? "no" : "");
    if (land === "yes" && (params.has("path") || params.has("land"))) return "place";
    if (land === "no" && (params.has("path") || params.has("land"))) return "type";
    return "land";
  };

  const clearForm = () => {
    root.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      if (input.name === "kind" || input.name === "company") return;
      if (input.type === "radio" || input.type === "checkbox") input.checked = false;
      else if (input.id === "sqft" || input.id === "sqft-num") input.value = "2400";
      else if (input.name !== "work") input.value = input.name === "work" ? input.value : "";
    });
    const workField = root.querySelector<HTMLInputElement>("[data-brief-work]");
    if (workField) workField.value = "custom-home";
    state.pinned = false;
    state.pinX = 0;
    state.pinY = 0;
    entryPath = "";
    document.getElementById("map-pin-el")?.remove();
    document.querySelector(".map-pin-el")?.remove();
    document.getElementById("map-box")?.classList.remove("is-on");
    const note = document.getElementById("pin-note");
    if (note) note.textContent = "";
  };

  root.querySelectorAll<HTMLInputElement>("input, textarea").forEach((el) => {
    el.addEventListener("change", () => { markStart(); refresh(); persist(lastQuestion); });
    el.addEventListener("input", () => {
      if (el.id === "sqft" || el.id === "sqft-num" || el.id === "place" || el.id === "else-text") {
        if (el.id === "sqft-num" && field("sqft")) field("sqft")!.value = (el as HTMLInputElement).value;
        markStart();
        refresh();
      }
    });
  });

  field("plans-file")?.addEventListener("change", (ev) => {
    const f = (ev.target as HTMLInputElement).files?.[0];
    const note = document.getElementById("plans-file-note");
    if (note) note.textContent = f ? "We’ll look at " + f.name + " with your brief." : "";
    state.plansFile = f ? f.name : "";
    markStart();
  });

  root.querySelectorAll<HTMLElement>("[data-go]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      const go = el.getAttribute("data-go");
      if (!go || go === "contact") return;
      ev.preventDefault();
      markStart();
      showPanel(go);
    });
  });
  root.querySelectorAll<HTMLAnchorElement>("[data-exit]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.preventDefault();
      const step = root.querySelector(".panel.is-on")?.id.replace("panel-", "") || lastQuestion;
      exitToContact(step);
    });
  });

  document.getElementById("btn-print")?.addEventListener("click", () => {
    track("brief_save", { method: "print" });
    window.print();
  });
  document.getElementById("btn-copy")?.addEventListener("click", async () => {
    const params = briefParams();
    const url = new URL("/plan/", location.origin);
    url.search = params.toString();
    url.hash = "brief";
    const text = url.toString();
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        copied = await Promise.race([
          navigator.clipboard.writeText(text).then(() => true).catch(() => false),
          new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 700)),
        ]);
      }
    } catch {
      copied = false;
    }
    if (!copied) {
      const box = document.createElement("textarea");
      box.value = text;
      document.body.append(box);
      box.select();
      document.execCommand("copy");
      box.remove();
    }
    const note = document.getElementById("copied");
    if (note) note.hidden = false;
    track("brief_save", { method: "link" });
  });

  document.getElementById("btn-pin")?.addEventListener("click", () => {
    document.getElementById("map-box")?.classList.add("is-on");
  });
  document.getElementById("map-frame")?.addEventListener("click", (ev) => {
    const frame = ev.currentTarget as HTMLElement;
    const box = frame.getBoundingClientRect();
    const x = (ev as MouseEvent).clientX - box.left;
    const y = (ev as MouseEvent).clientY - box.top;
    state.pinned = true;
    state.pinX = box.width ? x / box.width : 0;
    state.pinY = box.height ? y / box.height : 0;
    placePin(state.pinX, state.pinY);
    markStart();
    refresh();
    persist(lastQuestion);
  });

  const form = root.querySelector<HTMLFormElement>("[data-brief-form]");
  const fieldValue = (name: string) => form?.querySelector<HTMLInputElement>(`[name="${name}"]`)?.value.trim() || "";
  const showSaved = () => {
    const names = loadSaved().map((house) => house.name).join(", ");
    const input = root.querySelector<HTMLInputElement>("[data-saved-houses-field]");
    const wrap = root.querySelector<HTMLElement>("[data-saved-wrap]");
    if (input && names) input.value = names;
    if (wrap) wrap.hidden = !names;
  };
  showSaved();

  form?.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const name = fieldValue("name");
    const phone = fieldValue("phone");
    const email = fieldValue("email");
    const status = root.querySelector<HTMLElement>("[data-brief-status]");
    if (!name && !phone && !email) {
      if (status) {
        status.hidden = false;
        status.textContent = "Add a name, a phone number, or an email, so we can reply.";
      }
      return;
    }
    if (fieldValue("company")) return;
    readForm();
    const subject = root.querySelector<HTMLInputElement>("[data-brief-subject]");
    const message = root.querySelector<HTMLInputElement>("[data-brief-message]");
    const pathField = root.querySelector<HTMLInputElement>("[data-brief-path]");
    if (subject) subject.value = subjectLine();
    if (message) message.value = messageText();
    if (pathField) pathField.value = entryPath;
    const payload = new FormData(form);
    payload.set("subject", subjectLine());
    payload.set("message", messageText());
    if (state.land) payload.set("land", LAND_OUT[state.land] || state.land);
    if (state.timing) payload.set("timeline", TIMING_OUT[state.timing] || state.timing);
    if (state.place) payload.set("area", state.place);
    if (state.budget) payload.set("budget", BUDGET_LABELS[state.budget] || state.budget);
    payload.set("path", entryPath);
    let sent = false;
    try {
      const response = await fetch(form.action, { method: "POST", body: payload });
      sent = response.ok;
    } catch {
      sent = false;
    }
    if (sent) {
      track("brief_send", { page: location.pathname });
      localStorage.removeItem(DRAFT_KEY);
    }
    const thanks = new URL("/contact/thanks/", location.origin);
    thanks.searchParams.set("sent", sent ? "1" : "0");
    thanks.searchParams.set("brief", "1");
    if (name) thanks.searchParams.set("name", name);
    if (phone) thanks.searchParams.set("phone", phone);
    if (email) thanks.searchParams.set("email", email);
    if (typeLabel()) thanks.searchParams.set("house", typeLabel());
    if (state.place) thanks.searchParams.set("place", state.place);
    location.assign(thanks.pathname + thanks.search);
  });

  root.querySelector<HTMLButtonElement>("[data-start-over]")?.addEventListener("click", () => {
    skipDraft = true;
    localStorage.removeItem(DRAFT_KEY);
    clearForm();
    const note = root.querySelector<HTMLElement>("[data-resume]");
    if (note) note.hidden = true;
    Object.assign(state, {
      land: "", place: "", pinned: false, acres: "", terrain: "", cover: "", access: "",
      power: "", water: "", sewer: "", internet: "", structure: "", type: "", typeOther: "",
      beds: "", baths: "", stories: "", sqft: 2400, who: [], use: "", plans: "", plansLink: "",
      plansFile: "", needs: [], budget: "", pay: "", timing: "", sell: "", survey: "", hoa: "",
      otherPerson: "", callTime: "", source: "",
    });
    skipDraft = false;
    showPanel("land");
  });

  const params = new URLSearchParams(location.search);
  const queryKeys = ["work", "path", "land", "timeline", "place", "acres", "terrain", "cover", "access", "power", "water", "sewer", "internet", "structure", "type", "beds", "baths", "stories", "sqft", "who", "use", "plans", "needs", "budget", "pay", "timing", "sell", "survey", "hoa", "call", "source", "pin", "else", "plansLink", "person"];
  const hasQuery = queryKeys.some((key) => params.get(key));
  if (hasQuery) {
    applyQuery(params);
    refresh();
    if (answered() || params.get("work") && (params.get("path") || params.get("land") || params.get("timeline"))) markStart();
    showPanel(startStep(params));
  } else {
    const draft = loadDraft();
    if (draft?.state) {
      Object.assign(state, draft.state);
      if (draft.path) entryPath = draft.path;
      applyStateToForm();
      const note = root.querySelector<HTMLElement>("[data-resume]");
      if (note) note.hidden = false;
      const hash = (location.hash || "").replace("#", "");
      const step = hash && document.getElementById("panel-" + hash) ? hash : (draft.step || "land");
      showPanel(step);
    } else {
      showPanel("land");
    }
  }

  window.addEventListener("hashchange", () => {
    const hash = (location.hash || "").replace("#", "");
    if (hash) showPanel(hash);
  });
}
