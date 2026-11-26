"""v5 changes to the approved v4 /plan/ mock: real site header, step 1 rework, scroll + focus rules."""
import re, icons

def sub(s, old, new, regex=False):
    n = len(re.findall(old, s, re.S)) if regex else s.count(old)
    if n == 0: raise SystemExit("plan pattern not found: " + old[:90])
    return re.sub(old, new, s, flags=re.S) if regex else s.replace(old, new)

LAND = [
    ("yes", icons.LAND_YES, "I have land.", "A lot you own, or one under contract."),
    ("no", icons.LAND_LOOKING, "Still looking.", "Come back when you find a spot, or talk to us now. Daniel can often walk a lot with you before you buy."),
    ("unsure", icons.LAND_UNSURE, "I’m not sure.", "We can start either way."),
]

CSS = """
    /* v5: step 1 land cards. Equal heights; 3 across from 760px, stacked rows below. */
    .land-grid { display: grid; gap: 12px; grid-template-columns: 1fr; }
    .land-grid .choice { height: 100%; }
    .land-grid .choice-face { height: 100%; align-items: center; }
    .land-grid .choice-face svg { width: 44px; height: 44px; }
    @media (width >= 760px) {
      .land-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .land-grid .choice-face { grid-template-columns: 1fr; align-content: start; align-items: start; gap: 12px; padding: 18px 16px 20px; }
    }
    .land-grid small { display: block; margin-top: 4px; }
    /* Step 1 never shows a cheer line (the card notes carry it), so it reserves no space for one. */
    #panel-land .cheer { display: none; }
    #panel-land .lede { margin-bottom: var(--space-l); }
    /* Header nav at the live site's size */
    .nav-desktop a { font-size: var(--step--1); }
    /* Focus target for step headings (moved programmatically, so no ring for mouse users). */
    .panel h1[tabindex="-1"]:focus { outline: none; }
    .panel h1[tabindex="-1"]:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }
"""

def build(html):
    s = html
    # Real site header: Contact in nav, phone beside the primary, primary = Plan your home (current page)
    s = sub(s, r'<header class="site-header">.*?</header>', """<header class="site-header">
    <div class="header-bar">
      <a class="logo" href="/" aria-label="Heartwood Homes, Chattanooga">
        <img src="img/logo.webp" alt="Heartwood Homes" width="160" height="64">
      </a>
      <nav class="nav-desktop" aria-label="Primary">
        <a href="/custom-homes/">Custom homes</a>
        <a href="/projects/">Projects</a>
        <a href="/our-process/">Our process</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:+14239944911">(423) 994-4911</a>
        <a class="header-start" href="/plan/" aria-current="page" data-plan-here>Plan your home</a>
      </div>
      <button class="menu-toggle" type="button" aria-label="Open the menu">Menu</button>
    </div>
  </header>""", regex=True)
    # Step 1
    cards = "".join(f"""
            <label class="choice">
              <input type="radio" name="land" value="{v}">
              <span class="choice-face">{icons.svg(b, cls="")}<span><strong>{t}</strong><small>{n}</small></span></span>
            </label>""" for v, b, t, n in LAND)
    s = sub(s, r'(<section class="panel is-on" id="panel-land".*?<h1 id="land-title")>Do you have land\?</h1>\s*<p class="lede">.*?</p>(\s*<p class="cheer" data-cheer></p>)\s*<div class="type-grid">.*?</div>(\s*<div class="actions">)',
               r'\1 tabindex="-1">Do you have land?</h1>\n          <p class="lede">If you don’t have land yet, that’s fine.</p>\2\n          <div class="land-grid">' + cards.replace('\\', '\\\\') + r'\n          </div>\3', regex=True)
    # Every step heading can take focus
    s = re.sub(r'(<section class="panel[^"]*" id="panel-(?!land)[a-z]+"[^>]*>\s*(?:<p class="kicker">[^<]*</p>\s*)?<h1 id="[a-z-]+")>', r'\1 tabindex="-1">', s)
    # No stray cheer lines on step 1 (the card notes carry it)
    s = sub(s, """        if (state.land === "yes") return "We’ll walk it with you.";
        if (state.land === "no") return "We can help you look.";
        if (state.land === "unsure") return "We can start either way.";""", """        return "";""")
    # No-land path never promises land help
    s = sub(s, 'items.push("Where you want to be, and what kind of lot will carry this house.");',
               'items.push("The house you want, so it’s ready when you find a spot. Daniel can often walk a lot with you before you buy.");')
    s = sub(s, 'items.push("Whether you already have land, or still need to find it.");',
               'items.push("Whether you already have land, or are still looking.");')
    s = sub(s, 'rows.push(["The lot", "Land still to find."]);', 'rows.push(["The lot", "Still looking for land."]);')
    # Scroll + focus on step change
    s = sub(s, """      const h = document.querySelector(".panel.is-on h1");
      // Only when the new question would sit under the sticky header; reveals never scroll
      const headerH = document.querySelector(".site-header").offsetHeight;
      if (h && h.getBoundingClientRect().top < headerH + 8) window.scrollTo({ top: 0, behavior: "instant" });
      refresh();""", """      refresh();
      if (opts.focus !== false) bringQuestionIntoView();""")
    s = sub(s, "    function showPanel(name) {", """    // Scroll rule: option picks never scroll. On a step change (Continue, Back, a deep link),
    // if the new heading is hidden under the sticky header or below the fold, jump (no smooth
    // scroll) so it sits just under the header, then move focus to it without a second scroll.
    function bringQuestionIntoView() {
      const h = document.querySelector(".panel.is-on h1");
      if (!h) return;
      const headerH = document.querySelector(".site-header").offsetHeight;
      const top = h.getBoundingClientRect().top;
      const kicker = h.previousElementSibling && h.previousElementSibling.matches(".kicker") ? h.previousElementSibling : h;
      const progress = document.querySelector(".progress");
      if (top < headerH + 8 || top > window.innerHeight * 0.6) {
        const anchor = progress || kicker;
        window.scrollTo({ top: Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - headerH - 16), behavior: "instant" });
      }
      h.focus({ preventScroll: true });
    }

    function showPanel(name, opts = {}) {""")
    # Always open at the top: manual restoration, top on load and on back/forward cache restore
    s = sub(s, "    applyFromLocation();\n", """    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // The site sets html { scroll-behavior: smooth }, so every programmatic jump says "instant".
    window.scrollTo({ top: 0, behavior: "instant" });
    applyFromLocation();
    window.addEventListener("pageshow", (e) => { if (e.persisted) window.scrollTo({ top: 0, behavior: "instant" }); });
    document.querySelector("[data-plan-here]").addEventListener("click", (e) => { e.preventDefault(); bringQuestionIntoView(); });
""")
    # Initial load: a plain visit stays at the top and does not grab focus; a deep link to a later step focuses its heading
    s = sub(s, """      const hash = (location.hash || "#land").slice(1);
      refresh();
      showPanel(hash || "land");""", """      const hash = (location.hash || "#land").slice(1);
      refresh();
      showPanel(hash || "land", { focus: hash !== "land" });""")
    s = sub(s, '<h1 id="brief-title">', '<h1 id="brief-title" tabindex="-1">')
    # Step in the URL: "#q-<step>" so it never matches an element id (the v4 "#place" matched input#place,
    # and the browser scrolled to and focused that field). ?step= is accepted too, for deep links.
    s = sub(s, 'history.replaceState(null, "", "#" + name);', 'history.replaceState(null, "", "#q-" + name);')
    s = sub(s, """      const hash = (location.hash || "#land").slice(1);
      refresh();
      showPanel(hash || "land", { focus: hash !== "land" });""", """      const hash = location.hash ? location.hash.slice(1).replace(/^q-/, "") : (params.get("step") || "land");
      refresh();
      showPanel(hash || "land", { focus: hash !== "land" });""")
    s = sub(s, """      const hash = (location.hash || "#land").slice(1);
      if (hash) showPanel(hash);""", """      const hash = (location.hash || "#land").slice(1).replace(/^q-/, "");
      if (hash) showPanel(hash);""")
    # Same cross-document view transitions as the live Base CSS, so the mock behaves like the real build
    s = sub(s, "</style>", "\n    @view-transition { navigation: auto; }\n" + CSS + "  </style>")
    return s
