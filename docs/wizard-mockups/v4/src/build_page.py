import re, pathlib
here = pathlib.Path(__file__).resolve().parent.parent
s = (here.parent / "v2" / "plan.html").read_text()
svg = (here / "scene-lake.svg").read_text()

def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n >= 1, ("missing", old[:80])
    if count == 1: assert n == 1, ("multiple", old[:80], n)
    s = s.replace(old, new)

def rep_re(pat, new, flags=re.S):
    global s
    s2, n = re.subn(pat, new, s, count=1, flags=flags)
    assert n == 1, ("re missing", pat[:80])
    s = s2

# ---------------- CSS
rep_re(r"    \.progress \{ margin: 0 0 var\(--space-l\); \}.*?\.progress-rail span\.is-on \{ box-shadow[^\n]*\n", """    .progress { margin: 0 0 var(--space-l); }
    .progress-top { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin: 0 0 10px; }
    .progress-label { font-weight: var(--weight-bold); font-size: var(--step-0); margin: 0; font-variant-numeric: tabular-nums; }
    .progress-label .sec { font-weight: var(--weight-body); color: var(--color-muted); }
    .progress-time { font-size: var(--step--1); color: var(--color-muted); margin: 0; font-variant-numeric: tabular-nums; white-space: nowrap; width: 12em; flex: none; text-align: right; }
    .progress-rail { display: grid; gap: 4px; height: 8px; }
    .progress-rail span { background: var(--color-surface-2); display: block; position: relative; overflow: hidden; }
    .progress-rail span::after {
      content: ""; position: absolute; inset: 0; background: var(--color-primary);
      transform: scaleX(0); transform-origin: left center; transition: transform 480ms var(--ease-out), background var(--dur-base);
    }
    .progress-rail span.is-done::after { transform: scaleX(1); }
    .progress-rail span.is-on::after { transform: scaleX(1); background: var(--color-accent-2); }
    @media (prefers-reduced-motion: reduce) { .progress-rail span::after { transition: none; } }
""")
rep("""      color: var(--color-text); min-height: 1.6em;
    }""", """      color: var(--color-text); min-height: calc(1.6em * 2);
    }
    @media (width >= 800px) { .cheer { min-height: 1.6em; } }""")
rep("""    .sqft-readout {""", """    .sqft-readout { min-width: 13.5em; font-variant-numeric: tabular-nums;""")
rep("""    input[type="number"], input[type="text"], input[type="url"], input[type="tel"], input[type="email"], input[type="file"] {""",
    """    input[type="number"], input[type="text"], input[type="url"], input[type="tel"], input[type="email"] {""")
rep("""    input[type="file"] { padding: 12px 14px; }\n""", "")
rep_re(r"    \.else-field, \.plans-attach, \.map-box \{ display: none;[^\n]*\n[^\n]*\n", """    .helper { color: var(--color-muted); font-size: var(--step--1); margin: 6px 0 0; max-width: 34rem; }
    .field .opt { font-weight: var(--weight-body); color: var(--color-muted); }

    /* Reserved slot: both states occupy the same grid cell, so nothing below ever moves */
    .reserve { display: grid; margin: 0 0 var(--space-l); }
    .reserve > * {
      grid-area: 1 / 1; transition: opacity var(--dur-base) var(--ease-out), visibility var(--dur-base);
    }
    .reserve > [aria-hidden="true"] { opacity: 0; visibility: hidden; }
    .reserve-note {
      border: 1px dashed var(--color-line); padding: 18px 20px; color: var(--color-muted);
      display: flex; align-items: center; gap: 14px; font-size: var(--step--1);
    }
    .reserve-note svg { width: 28px; height: 28px; flex: none; color: var(--color-line-strong); }
    .attach { border: 1px solid var(--color-line); background: var(--color-bg); padding: 16px 18px; display: grid; gap: 14px; }
    @media (width >= 800px) { .attach { grid-template-columns: 1fr 1fr; align-items: start; } }
    .attach .field > label, .attach .field > .group-label { display: block; font-weight: var(--weight-bold); margin: 0 0 6px; line-height: 1.6; }
    .size-grid { margin-bottom: var(--space-l); }
    .brief-sketch { align-items: flex-start !important; }
    .brief-sketch .scene { position: sticky; top: calc(var(--header-h) + 24px); }
    .brief-copy > .lede { margin-bottom: var(--space-m); }
    .attach .field { margin: 0; }
    .upload { display: flex; align-items: center; gap: 12px; min-height: var(--input-h); flex-wrap: nowrap; }
    .upload input[type="file"] { position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; }
    .field .upload-btn, .upload-btn {
      margin: 0; display: inline-flex; align-items: center; gap: 10px; min-height: var(--input-h); padding: 0 18px;
      border: 1px solid var(--color-primary); color: var(--color-primary); background: var(--color-bg);
      font-weight: var(--weight-bold); cursor: pointer; white-space: nowrap;
      transition: background var(--dur-fast), color var(--dur-fast);
    }
    .upload-btn svg { width: 20px; height: 20px; }
    .upload-btn:hover { background: var(--color-primary); color: var(--color-on-primary); }
    .upload input:focus-visible + .upload-btn { outline: 3px solid var(--color-focus); outline-offset: 3px; }
    .upload-name { color: var(--color-muted); font-size: var(--step--1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }

    /* Steppers */
    .stepper { display: inline-grid; grid-template-columns: 48px 4.5rem 48px; align-items: stretch; border: 1px solid var(--color-line-strong); background: var(--color-bg); }
    .stepper button {
      appearance: none; border: 0; background: var(--color-primary-tint); color: var(--color-primary);
      display: grid; place-items: center; cursor: pointer; min-height: 48px;
      transition: background var(--dur-fast), color var(--dur-fast);
    }
    .stepper button svg { width: 18px; height: 18px; }
    .stepper button:hover:not(:disabled) { background: var(--color-primary); color: var(--color-on-primary); }
    .stepper button:disabled { color: var(--color-line-strong); background: var(--color-surface); cursor: default; }
    .stepper button:focus-visible { outline: 3px solid var(--color-focus); outline-offset: -3px; }
    .stepper output {
      display: grid; place-items: center; font-family: var(--font-display); font-weight: 600;
      font-variation-settings: "opsz" 36, "wght" 600; font-size: 1.35rem; font-variant-numeric: tabular-nums;
      border-left: 1px solid var(--color-line); border-right: 1px solid var(--color-line);
    }
    .stepper[data-set="0"] output { color: var(--color-muted); }
    .stepper-hint { font-size: var(--step--1); color: var(--color-muted); margin: 6px 0 0; min-height: 1.4em; }

    /* Even must-have grid */
    .need-grid { display: grid; gap: 8px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (width >= 700px) { .need-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (width >= 1024px) { .need-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .need-grid .chip, .need-grid .chip-face { height: 100%; width: 100%; }
    .need-grid .chip-face { min-height: 56px; line-height: 1.25; }

    /* Budget cards */
    .budget-grid { display: grid; gap: 8px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (width >= 900px) { .budget-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .budget-grid .chip, .budget-grid .chip-face { height: 100%; width: 100%; }
    .budget-grid .chip-face { flex-direction: column; align-items: flex-start; gap: 2px; padding: 12px 14px; }
    .budget-grid .chip-face b { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; font-variation-settings: "opsz" 36, "wght" 600; }
    .budget-grid .chip-face small { font-size: var(--step--1); color: var(--color-muted); line-height: 1.35; }
    .budget-grid .chip:has(input:checked) small { color: rgb(231 235 231 / 0.85); }
""")
rep_re(r"    \.map-frame \{.*?\n    \.map-pin-el \{.*?\n    \}\n", "")
rep("""    .sketch-list li { padding: 1px 0; }""", """    .sketch-list li { padding: 1px 0; }
    #sketch-caption { min-height: calc(1.45em * 2); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }""")
rep_re(r"    \.house-part \{ opacity: 0; \}.*?@media \(prefers-reduced-motion: reduce\) \{\n      \.house-part\.is-on path,.*?\n    \}\n", """    /* Layered scene (scene-lake.svg). Layers start hidden; GSAP reveals them. */
    .scene { color: var(--color-text); overflow: visible; }
    .scene [data-layer] { visibility: hidden; }
    .scene .s2 { stroke: var(--color-line-strong); stroke-width: 1.2; }
    .scene .fine { stroke-width: 0.8; }
    .scene .dash.long { stroke-dasharray: 5 4; }
    .scene .dash.dots { stroke-dasharray: 0.1 4.2; stroke-width: 2.2; }
    .scene .glass { fill: #EFE4CC; }
    .scene .dot { fill: currentColor; }
    .scene .lbl { font: 600 9px var(--font-body); fill: var(--color-muted); stroke: none; letter-spacing: 0.04em; }
    .sketch-stage .scene .lbl { display: none; }
    @media (width >= 1024px) { .sketch-stage { aspect-ratio: 520 / 256; } }
    .brief-sketch .scene { width: 100%; height: auto; }
""")
# mobile dock: keep the scene a fixed size so the dock never changes height
rep(""".sketch-stage svg { max-height: 118px; width: auto; max-width: 100%; margin: 0 auto; }""",
    """.sketch-stage { aspect-ratio: 520 / 256; height: auto; }
      .sketch-stage svg { width: 100%; height: auto; }""")
rep("display: grid; grid-template-columns: minmax(132px, 44%) 1fr;", "display: grid; grid-template-columns: 58% 1fr;")

rep("font-display: swap;", "font-display: optional;", count=2)
rep("""  <style>""", """  <link rel="preload" href="fonts/Newsreader[opsz,wght].woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="fonts/SourceSans3[wght].woff2" as="font" type="font/woff2" crossorigin>
  <style>""")

# ---------------- HTML
rep("""      <p class="progress-label" id="progress-label">Step 1 of 7</p>""",
    """      <div class="progress-top">
        <p class="progress-label" id="progress-label">Step 1 of 7 <span class="sec">· Your land</span></p>
        <p class="progress-time" id="progress-time">About 2 minutes</p>
      </div>""")
rep("""<p class="lede">A town or a county is enough. You can pin it if you like, or leave that for later.</p>""",
    """<p class="lede">A town or a county is enough to start.</p>""")
rep_re(r'          <p><button class="btn-ghost btn" type="button" id="btn-pin".*?<p class="muted" id="pin-note"[^\n]*\n          </div>\n',
    """          <div class="field">
            <label for="parcel">Address, Google Maps link, or parcel number <span class="opt">(optional)</span></label>
            <input id="parcel" name="parcel" type="text" autocomplete="street-address" placeholder="Paste whatever you have">
            <p class="helper">Any one of these lets us look up the lot before we call. Skip it if it’s not handy.</p>
          </div>
""")
rep("""          <div class="else-field" id="else-field">
            <label for="else-text">What do you have in mind?</label>""",
    """          <div class="field else-field" id="else-field" style="margin-top: var(--space-m)">
            <label for="else-text">Anything else about the house? <span class="opt">(optional)</span></label>""")
# steppers for beds + baths
rep_re(r'          <div class="size-grid">\n            <fieldset>\n              <legend class="group-label">Bedrooms</legend>.*?</fieldset>\n            <fieldset>\n              <legend class="group-label">Baths</legend>.*?</fieldset>\n',
"""          <div class="size-grid">
            <div>
              <span class="group-label" id="beds-label">Bedrooms</span>
              <div class="stepper" data-stepper="beds" data-min="1" data-max="6" data-step="1" data-start="3" data-set="0" role="group" aria-labelledby="beds-label">
                <button type="button" data-dir="-1" aria-label="One fewer bedroom"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10 H16"/></svg></button>
                <output aria-live="polite">–</output>
                <button type="button" data-dir="1" aria-label="One more bedroom"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10 H16 M10 4 V16"/></svg></button>
              </div>
              <input type="hidden" name="beds" id="beds" value="">
              <p class="stepper-hint" data-hint="beds">Tap + or − to set it</p>
            </div>
            <div>
              <span class="group-label" id="baths-label">Baths</span>
              <div class="stepper" data-stepper="baths" data-min="1" data-max="5" data-step="0.5" data-start="2.5" data-set="0" role="group" aria-labelledby="baths-label">
                <button type="button" data-dir="-1" aria-label="Half a bath fewer"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10 H16"/></svg></button>
                <output aria-live="polite">–</output>
                <button type="button" data-dir="1" aria-label="Half a bath more"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10 H16 M10 4 V16"/></svg></button>
              </div>
              <input type="hidden" name="baths" id="baths" value="">
              <p class="stepper-hint" data-hint="baths">Half baths count</p>
            </div>
""")
# plans attach -> reserved slot
rep_re(r'          <div class="plans-attach" id="plans-attach">.*?<p class="muted" id="plans-file-note"[^\n]*\n            </div>\n          </div>\n',
"""          <div class="reserve" id="plans-reserve">
            <div class="reserve-note" id="plans-note-empty">
              <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4 H17 L22 9 V24 H7 Z"/><path d="M17 4 V9 H22"/><path d="M11 15 H18 M11 19 H16"/></svg>
              <span>If you have plans, a sketch, or a board, you can add it here. Nothing to add is fine too.</span>
            </div>
            <div class="attach" id="plans-attach" aria-hidden="true">
              <div class="field">
                <label for="plans-link">A link, if you have one</label>
                <input id="plans-link" name="plans-link" type="url" placeholder="Pinterest, Dropbox, Google Drive" tabindex="-1">
              </div>
              <div class="field">
                <span class="group-label">Or a file</span>
                <div class="upload">
                  <input id="plans-file" name="plans-file" type="file" accept=".pdf,.jpg,.jpeg,.png,.heic,.dwg" tabindex="-1">
                  <label class="upload-btn" for="plans-file"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13 V3 M6 7 l4 -4 4 4"/><path d="M3 13 v4 h14 v-4"/></svg>Choose a file</label>
                  <span class="upload-name" id="plans-file-note">PDF or photos</span>
                </div>
              </div>
            </div>
          </div>
""")
rep("""            <legend class="group-label">Must-haves, if you already know them</legend>
            <div class="chips">""", """            <legend class="group-label">Must-haves, if you already know them</legend>
            <div class="need-grid">""")
rep_re(r'            <legend class="group-label">A budget for the house</legend>\n            <div class="chips">.*?</div>\n          </fieldset>',
"""            <legend class="group-label">A budget for the house</legend>
            <div class="budget-grid">
            <label class="chip"><input type="radio" name="budget" value="simple"><span class="chip-face"><b>Simple</b><small>Good, durable basics</small></span></label>
            <label class="chip"><input type="radio" name="budget" value="comfortable"><span class="chip-face"><b>Comfortable</b><small>Room for a few upgrades</small></span></label>
            <label class="chip"><input type="radio" name="budget" value="premium"><span class="chip-face"><b>Premium</b><small>The finishes you really want</small></span></label>
            <label class="chip"><input type="radio" name="budget" value="unsure"><span class="chip-face"><b>Not sure yet</b><small>We’ll talk it through</small></span></label>
            </div>
          </fieldset>""")
rep("""<p class="lede">Next is plans, then an estimate, then we build.</p>""",
    """<p class="lede">Plans, then an estimate, then we build.</p>""")
rep("""        <div class="sketch-stage" id="sketch-stage"></div>""",
    """        <div class="sketch-stage" id="sketch-stage">""" + svg + """</div>""")

# ---------------- JS
rep("""  <script type="module">
    import { houseSVG, syncSketch } from "./sketch-lib.js";
""", """  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/DrawSVGPlugin.min.js"></script>
  <script type="module">
    import { syncScene, initScene } from "./scene.js";
    // CDN first; fall back to the vendored copy if the CDN is unreachable
    async function loadLocal(src) { await new Promise((ok, no) => { const t = document.createElement("script"); t.src = src; t.onload = ok; t.onerror = no; document.head.appendChild(t); }); }
    if (!window.gsap) await loadLocal("vendor/gsap.min.js");
    if (!window.DrawSVGPlugin) await loadLocal("vendor/DrawSVGPlugin.min.js");
    gsap.registerPlugin(DrawSVGPlugin);
""")
rep("""    const BUDGET_LABELS = { modest: "A modest budget for the house", mid: "A mid-range budget for the house", higher: "A higher-end budget for the house", unsure: "Budget still to talk through" };""",
    """    const BUDGET_LABELS = { simple: "Simple: good, durable basics", comfortable: "Comfortable: room for a few upgrades", premium: "Premium: the finishes they really want", unsure: "Budget still to talk through" };""")
rep("""      land: "", place: "", pinned: false, acres: "",""", """      land: "", place: "", parcel: "", acres: "",""")
rep("""    const stage = document.getElementById("sketch-stage");
    const briefSlot = document.getElementById("brief-sketch-slot");
    stage.innerHTML = houseSVG();
""", """    const stage = document.getElementById("sketch-stage");
    const briefSlot = document.getElementById("brief-sketch-slot");
    const stageSvg = stage.querySelector("svg");
    const pristine = stageSvg.cloneNode(true);
    initScene(stageSvg);
    const SECTION = { land: "Your land", place: "The lot", terrain: "The lot", utilities: "The lot", type: "The house", size: "The house", people: "The house", plans: "The house", money: "The money", timing: "Timing" };
""")
rep("""      state.place = document.getElementById("place").value.trim();""",
    """      state.place = document.getElementById("place").value.trim();
      state.parcel = document.getElementById("parcel").value.trim();""")
rep("""      state.beds = val("beds");
      state.baths = val("baths");""", """      state.beds = document.getElementById("beds").value;
      state.baths = document.getElementById("baths").value;""")
rep("""      if (name === "place" && (state.place || state.acres)) return "That’s enough to start.";""",
    """      if (name === "place" && state.place) return `We’ll check where ${state.place.split(",")[0]} sits for us.`;
      if (name === "place" && (state.parcel || state.acres)) return "That’s enough to start.";""")
rep("""      if (state.baths) sizeBits.push((state.baths === "2.5" ? "2½" : state.baths === "4" ? "4 or more" : state.baths) + " baths");""",
    """      if (state.baths) sizeBits.push(fmtBaths(state.baths) + (state.baths === "1" ? " bath" : " baths"));""")
rep("""      if (state.beds) sizeBits.push(state.beds === "5" ? "5 or more bedrooms" : state.beds + " bedrooms");""",
    """      if (state.beds) sizeBits.push(state.beds === "6" ? "6 or more bedrooms" : state.beds === "1" ? "1 bedroom" : state.beds + " bedrooms");""")
rep("""        if (state.pinned) lotBits.push("with a pin on the lot");\n""", "")
rep("""        rows.push(["The lot", lotText + "."]);""", """        rows.push(["The lot", lotText + "."]);
        if (state.parcel) rows.push(["Where to look", esc(state.parcel)]);""")
rep("""    function typeLabel() {""", """    const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const fmtBaths = (b) => { const n = Number(b); const w = Math.floor(n); return (n >= 5 ? "5 or more" : (w + (n % 1 ? "½" : ""))); };
    function typeLabel() {""")
rep("""      if (state.access === "needs") items.push("A drive in, and whether the road can take construction traffic.");""",
    """      if (state.access === "needs") items.push("A drive in, and whether the road can take construction traffic.");
        if (state.parcel) items.splice(1, 0, "The parcel you sent, pulled up before the first call.");""")
# sync + sketch
rep("""      document.getElementById("else-field").classList.toggle("is-on", state.type === "else");
      document.getElementById("plans-attach").classList.toggle("is-on", state.plans === "have" || state.plans === "sketch");""",
    """      const attachOn = state.plans === "have" || state.plans === "sketch";
      document.getElementById("plans-attach").setAttribute("aria-hidden", attachOn ? "false" : "true");
      document.getElementById("plans-note-empty").setAttribute("aria-hidden", attachOn ? "true" : "false");
      document.querySelectorAll("#plans-attach input").forEach(i => i.tabIndex = attachOn ? 0 : -1);""")
rep("""      syncSketch(stage, state);
      if (!document.getElementById("panel-brief").hidden) {
        briefSlot.innerHTML = stage.innerHTML;
        syncSketch(briefSlot, state);
        updateBrief();
      }""", """      syncScene(stageSvg, state);
      if (!document.getElementById("panel-brief").hidden) {
        const b = briefSlot.querySelector("svg");
        if (b) syncScene(b, state);
        updateBrief();
      }""")
rep("""      if (name === "brief") {
        briefSlot.innerHTML = stage.innerHTML;
        syncSketch(briefSlot, state);
        updateBrief();
      }""", """      if (name === "brief") {
        const fresh = pristine.cloneNode(true);
        fresh.querySelector("title").id = "scene-title-brief";
        fresh.setAttribute("aria-labelledby", "scene-title-brief");
        briefSlot.replaceChildren(fresh);
        initScene(fresh);
        syncScene(fresh, state);
        updateBrief();
      }""")
# progress: update in place
rep_re(r"      const label = document.getElementById\(\"progress-label\"\);.*?\n      \}\n\n      if \(name === \"brief\"\) \{", """      const label = document.getElementById("progress-label");
      const rail = document.getElementById("progress-rail");
      const timeEl = document.getElementById("progress-time");
      if (rail.children.length !== total) {
        rail.style.gridTemplateColumns = `repeat(${total}, 1fr)`;
        rail.replaceChildren(...stepsAll.map(() => document.createElement("span")));
      }
      const done = name === "brief" || name === "extra" || name === "contact";
      const n = done ? total + 1 : idx + 1;
      [...rail.children].forEach((sp, i) => {
        sp.classList.toggle("is-done", i + 1 < n);
        sp.classList.toggle("is-on", i + 1 === n);
      });
      if (done) {
        label.innerHTML = name === "brief" ? "Your brief <span class=\\"sec\\">· All done</span>" : name === "extra" ? "A few more details <span class=\\"sec\\">· Optional</span>" : "Contact Heartwood";
        timeEl.textContent = "";
      } else {
        label.innerHTML = `Step ${n} of ${total} <span class="sec">· ${SECTION[name] || ""}</span>`;
        const left = Math.max(1, Math.ceil((total - n + 1) * 15 / 60));
        timeEl.textContent = left <= 1 ? "Under a minute left" : `About ${left} minutes left`;
      }

      if (name === "brief") {""")
# no auto scroll: only bring the question into view if its heading is off screen
rep("""      window.scrollTo(0, 0);
      refresh();""", """      const h = document.querySelector(".panel.is-on h1");
      // Only when the new question would sit under the sticky header; reveals never scroll
      const headerH = document.querySelector(".site-header").offsetHeight;
      if (h && h.getBoundingClientRect().top < headerH + 8) window.scrollTo({ top: 0, behavior: "instant" });
      refresh();""")
rep("""        if (el.id === "sqft" || el.id === "sqft-num" || el.id === "place" || el.id === "else-text") {""",
    """        if (el.id === "sqft" || el.id === "sqft-num" || el.id === "place" || el.id === "parcel" || el.id === "else-text") {""")
rep("""      document.getElementById("plans-file-note").textContent = f ? ("We’ll look at " + f.name + " with your brief.") : "";""",
    """      document.getElementById("plans-file-note").textContent = f ? f.name : "PDF or photos";""")
rep_re(r"    // Map pin\n.*?\n    \}\);\n\n    function applyFromLocation", """    // Steppers
    document.querySelectorAll("[data-stepper]").forEach(st => {
      const key = st.dataset.stepper, min = +st.dataset.min, max = +st.dataset.max, step = +st.dataset.step;
      const out = st.querySelector("output"), input = document.getElementById(key);
      const show = (v) => {
        out.textContent = st.dataset.set !== "1" ? "–" : key === "baths" ? fmtBaths(v) : (v >= max ? max + "+" : String(v));
        st.querySelector('[data-dir="-1"]').disabled = v <= min;
        st.querySelector('[data-dir="1"]').disabled = v >= max;
      };
      st.setValue = (v) => { v = Math.min(max, Math.max(min, v)); st.dataset.value = v; st.dataset.set = "1"; input.value = String(v); show(v);
        const hint = document.querySelector(`[data-hint="${key}"]`); if (hint && key === "beds") hint.textContent = v >= max ? "Six or more" : ""; };
      st.dataset.value = st.dataset.start; show(+st.dataset.start);
      st.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
        const dir = +b.dataset.dir, start = +st.dataset.start;
        // untouched: + lands on the usual size, − one below it; after that it steps normally
        st.setValue(st.dataset.set === "1" ? +st.dataset.value + step * dir : (dir > 0 ? start : start - step));
        refresh();
      }));
    });

    function applyFromLocation""")
rep("""      if (params.get("place")) document.getElementById("place").value = params.get("place");""",
    """      if (params.get("place")) document.getElementById("place").value = params.get("place");
      if (params.get("parcel")) document.getElementById("parcel").value = params.get("parcel");
      ["beds", "baths"].forEach(k => { if (params.get(k)) document.querySelector(`[data-stepper="${k}"]`).setValue(+params.get(k)); });""")
rep("""        type:"type", beds:"beds", baths:"baths", stories:"stories",""", """        type:"type", stories:"stories",""")
rep("""      if (params.get("pin") === "1") state.pinned = true;\n""", "")


# ---------------- v4 additions
rep("""<path d="M16 40 V22 M24 40 V16 M32 40 V22"/></svg>A screened porch</span>
            </label>""", """<path d="M16 40 V22 M24 40 V16 M32 40 V22"/></svg>A screened porch</span>
            </label>
            <label class="chip">
              <input type="checkbox" name="need" value="deck">
              <span class="chip-face"><svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 30 H42"/><path d="M6 20 H42"/><path d="M12 20 V30 M20 20 V30 M28 20 V30 M36 20 V30"/><path d="M10 30 V40 M38 30 V40"/></svg>A deck</span>
            </label>""")
rep("""      screened: "A screened porch",""", """      screened: "A screened porch",
      deck: "A deck",""")
rep("""    @media (width >= 1024px) { .need-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }\n""", "")
rep("""        grid-template-columns: minmax(0, 1fr) 400px;
        gap: var(--space-2xl);""", """        grid-template-columns: minmax(0, 1fr) 400px;
        gap: var(--space-2xl);
        align-items: start;
      }
      .layout.is-wide { grid-template-columns: 1fr; }
    }
    /* Larger sketch where there is room: 556px rail = ~522px drawing at 1440 */
    @media (width >= 1280px) {
      .layout {
        grid-template-columns: minmax(0, 1fr) 556px;
        gap: var(--space-xl);""")
rep("""      if (name === "type" && state.type) return "The lot will have a say in the final shape.";""",
    """      if (name === "type" && state.type === "townhome") return "We’ll talk through whether this is a fit for us.";
      if (name === "type" && state.type) return "The lot will have a say in the final shape.";""")

(here / "plan.html").write_text(s)
print("ok", len(s))
