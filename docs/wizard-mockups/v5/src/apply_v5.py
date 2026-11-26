"""Build the v5 mock: the live preview (mirrored into ../_orig) with /plan/ folded in, light touch.
Run: python3 src/apply_v5.py   (writes ../site)"""
import pathlib, re, shutil, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import icons

V5 = pathlib.Path(__file__).resolve().parent.parent
ORIG, SITE, V4 = V5 / "_orig", V5 / "site", V5.parent / "v4"
shutil.rmtree(SITE, ignore_errors=True)
shutil.copytree(ORIG, SITE)

def sub(s, old, new, count=0, must=True, regex=False):
    n = len(re.findall(old, s)) if regex else s.count(old)
    if must and n == 0:
        raise SystemExit(f"pattern not found: {old[:90]}")
    return re.sub(old, new, s, count=count) if regex else (s.replace(old, new) if not count else s.replace(old, new, count))

CSS_LINK = '<link rel="stylesheet" href="/v5.css">'
PLAN_LABEL = '<span data-start-cta-label>Plan your home</span>'

# ---------- shared chrome: every page ----------
def chrome(s, page):
    s = sub(s, '</head>', CSS_LINK + '</head>')
    # Desktop nav: Contact stays in nav (added after About)
    s = sub(s, '<a href="/about/">About</a></nav><div class="header-actions">',
               '<a href="/about/">About</a><a href="/contact/"' + (' aria-current="page"' if page == "contact" else '') +
               '>Contact</a></nav><div class="header-actions">')
    # Header primary: Plan your home -> /plan/, phone stays beside it
    s = sub(s, '<a class="header-start" href="/contact/" data-start-cta><span data-start-cta-label>Start your home</span></a>',
               '<a class="header-start" href="/plan/" data-start-cta>' + PLAN_LABEL + '</a>')
    # Mobile menu: Contact link + Plan your home
    s = sub(s, r'(<a href="/site-prep-landwork/"[^>]*>Site prep</a>)<a href="tel:\+14239944911" data-event="call_click" data-event-placement="menu">\(423\) 994-4911</a><a href="/contact/" data-start-cta><span data-start-cta-label>Start your home</span></a></nav>',
               r'\1<a href="/contact/">Contact</a><a href="tel:+14239944911" data-event="call_click" data-event-placement="menu">(423) 994-4911</a><a href="/plan/" data-start-cta>' + PLAN_LABEL + '</a></nav>', regex=True)
    # Footer start link -> /plan/
    s = sub(s, '<a class="text-link" href="/contact/" data-start-cta><span data-start-cta-label>Start your home</span></a>',
               '<a class="text-link" href="/plan/" data-start-cta>' + PLAN_LABEL + '</a>')
    # Existing phone bottom bar (Jake, 9:53 PM): keep it as it is, only its start button now goes to /plan/
    # (the label follows the link, so it reads "Plan your home" like every other /plan/ CTA).
    s = sub(s, '<a href="tel:+14239944911" data-event="call_click" data-event-placement="bar">Call</a><a href="/contact/" data-start-cta><span data-start-cta-label>Start your home</span></a></nav>',
               '<a href="tel:+14239944911" data-event="call_click" data-event-placement="bar">Call</a><a href="/plan/" data-start-cta>' + PLAN_LABEL + '</a></nav>', must=(page != "contact"))
    return s

def hero_buttons(s, old_href):
    # Hero: primary Plan your home, secondary See our work (phone stays in the header)
    attr = "" if old_href == "/contact/" else '="true"'
    return sub(s, f'<a class="btn" href="{old_href}" data-start-cta{attr}><span data-start-cta-label>Start your home</span></a><a class="btn btn-ghost" href="tel:+14239944911"',
                  '<a class="btn" href="/plan/" data-start-cta>' + PLAN_LABEL + '</a><a class="btn btn-ghost" href="/projects/" data-see-work',
                  ).replace('data-see-work data-event="call_click" data-event-placement="hero">(423) 994-4911</a>', 'data-see-work>See our work</a>') \
                   .replace('data-see-work>(423) 994-4911</a>', 'data-see-work>See our work</a>')

def close_band(s, href="/plan/"):
    return sub(s, r'<a class="btn" href="/contact/[^"]*" data-start-cta><span data-start-cta-label>Start your home</span></a></div><p class="ask-proof">',
                  f'<a class="btn" href="{href}" data-start-cta>{PLAN_LABEL}</a></div><p class="ask-proof">', regex=True)

LAND_CARDS = [
    ("yes", icons.LAND_YES, "I have land.", "A lot you own, or one under contract."),
    ("no", icons.LAND_LOOKING, "Still looking.", "Come back when you find a spot, or talk to us now. Daniel can often walk a lot with you before you buy."),
    ("unsure", icons.LAND_UNSURE, "I’m not sure.", "We can start either way."),
]
LAND_NEXT = {"yes": "place", "no": "type", "unsure": "type"}

def path_section():
    cards = [
        ("/plan/", icons.NEW_HOME, "Build a new home", "A few easy questions, then a brief and a sketch of the house.", "Plan your home"),
        ("/contact/?work=renovation", icons.RENOVATE, "Renovate or add on", "A short form about the house and what you want to change.", "Tell us about it"),
        ("/contact/?work=site-prep", icons.LOT_READY, "Get a lot ready", "Clearing, grading, a drive, a pad.", "Tell us about it"),
    ]
    li = "".join(
        f'<li><a class="path-card" href="{h}"' + f'>{icons.svg(b)}'
        f'<span class="path-card-title">{t}</span><span class="path-card-note">{n}</span>'
        f'<span class="path-card-go">{g}<span aria-hidden="true"> →</span></span></a></li>'
        for h, b, t, n, g in cards)
    return ('<section class="section" aria-labelledby="path-title"><div class="container stack">'
            '<h2 id="path-title">What are you looking to do?</h2>'
            f'<ul class="path-cards" role="list">{li}</ul></div></section>')

def land_teaser():
    li = "".join(
        f'<li><a class="land-card" href="/plan/?land={v}&amp;step={LAND_NEXT[v]}">{icons.svg(b)}'
        f'<span class="land-card-title">{t}</span><span class="land-card-note">{n}</span></a></li>'
        for v, b, t, n in LAND_CARDS)
    return ('<section class="section plan-teaser" aria-labelledby="teaser-title"><div class="container">'
            '<div class="teaser-frame"><div class="teaser-copy"><p class="label">Plan your home</p>'
            '<h2 id="teaser-title">Do you have land?</h2>'
            '<p class="measure">If you don’t have land yet, that’s fine. Pick one and the plan opens with it already answered.</p></div>'
            f'<ul class="land-cards" role="list">{li}</ul>'
            '<p class="talk-exit"><a href="/contact/?work=custom-home">Rather just talk? Contact Heartwood</a></p></div></div></section>')

def fix_qualifier_land(s):
    # Contact qualifier (on /contact/ and Custom Homes): "Not yet" -> "Still looking"
    return sub(s, '<input type="radio" name="land" value="Not yet"> Not yet</label>',
                  '<input type="radio" name="land" value="Still looking"> Still looking</label>', must=False)

pages = {
    "index.html": "home", "custom-homes/index.html": "custom", "contact/index.html": "contact",
    "renovations/index.html": "reno", "site-prep-landwork/index.html": "siteprep",
    "projects/ten-mile-lake-house/index.html": ("project", "lake"),
    "projects/spring-city-lake-house/index.html": ("project", "lake"),
    "projects/a-frame-cabin-airbnb/index.html": ("project", "aframe"),
}
for rel, kind in pages.items():
    p = SITE / rel
    s = p.read_text()
    page = kind if isinstance(kind, str) else kind[0]
    s = chrome(s, page)
    s = fix_qualifier_land(s)
    if page == "home":
        s = hero_buttons(s, "/contact/")
        # Timeline scrubber: Finish CTA (and the quiet per-chapter link) -> /plan/
        s = sub(s, r'href="/contact/\?project=flat-top-mountain&amp;chapter=finish&amp;work=custom-home" data-scrubber-cta data-start-cta><span data-start-cta-label>Start your home</span>',
                   'href="/plan/" data-scrubber-cta data-start-cta>' + PLAN_LABEL, regex=True)
        s = sub(s, '<a class="scrub-quiet" href="/contact/?project=flat-top-mountain&amp;chapter=lot&amp;work=custom-home" data-scrub-quiet>Start your home</a>',
                   '<a class="scrub-quiet" href="/plan/" data-scrub-quiet>Plan your home</a>')
        s = close_band(s)
    elif page == "custom":
        s = hero_buttons(s, "/contact/?work=custom-home")
        a = s.index('<section class="section"><div class="container stack"><div class="path-picker"')
        b = s.index('</section>', a) + len('</section>')
        s = s[:a] + path_section() + s[b:]
        # Inline teaser mid-page: after "Dream, build, move in", before "Houses we've built"
        m = re.search(r'<section[^>]*>(?:(?!<section).)*?Houses we(?:&#39;|’|\')ve built', s, re.S)
        if not m: raise SystemExit("houses section not found")
        s = s[:m.start()] + land_teaser() + s[m.start():]
        # Jake, 9:53 PM: drop the old short form ("Tell us about the house." qualifier) near the bottom;
        # the land teaser and its "Rather just talk?" link replace it.
        a = s.index('<section class="section"><div class="container stack"><div class="ask-head">') if '<div class="ask-head">' in s else None
        if a is None:
            m = re.search(r'<section class="section">(?:(?!<section).)*?Tell us about the house\.', s, re.S)
            if not m: raise SystemExit("qualifier section not found")
            a = m.start()
        b = s.index('</section>', a) + len('</section>')
        assert 'Tell us about the house.' in s[a:b] and 'close-band' not in s[a:b]
        s = s[:a] + s[b:]
        s = close_band(s)
    elif page == "project":
        slug = rel.split("/")[1]
        s = sub(s, '<section class="close-band"><div class="container stack"><h2>Tell us about the house.</h2><p class="measure">A few questions first. Then we&#39;ll call or write you back.</p>',
                   '<section class="close-band"><div class="container stack"><h2>Want something like this?</h2><p class="measure">A few easy questions, and you get a brief and a sketch of your house.</p>')
        s = sub(s, rf'<a class="btn" href="/contact/\?work=custom-home&amp;project={slug}" data-start-cta><span data-start-cta-label>Start your home</span></a>',
                   f'<a class="btn" href="/plan/?type={kind[1]}">Plan yours</a>', regex=True)
    elif page in ("reno", "siteprep"):
        pass  # body CTAs stay on the short form (work=renovation / site-prep)
    p.write_text(s)
    left = re.findall(r'find-land|help finding land|lot comes up|Not yet', s)
    print(f"{rel}: ok" + (f"  LEFT: {left}" if left else ""))

# ---------- JS: CTA label follows the link (Plan your home for /plan/, unchanged elsewhere) ----------
js = SITE / "_astro/Base.astro_astro_type_script_index_0_lang.D4K8nycs.js"
t = js.read_text()
old = "let r=n===0?`Start your home`:n===1?`Start your home (1 saved)`:`Start your home (${n} saved)`;e.querySelectorAll(`[data-start-cta]`).forEach(e=>{"
new = ("let R=b=>n===0?b:n===1?`${b} (1 saved)`:`${b} (${n} saved)`;e.querySelectorAll(`[data-start-cta]`).forEach(e=>{"
       "let r=R((e.getAttribute(`href`)||``).startsWith(`/plan/`)?`Plan your home`:`Start your home`);")
t = sub(t, old, new); js.write_text(t)
q = SITE / "_astro/Qualifier.astro_astro_type_script_index_0_lang.D4LmeXWE.js"
q.write_text(sub(q.read_text(), "r===`find-land`?`Not yet`", "r===`find-land`?`Still looking`"))
pp = SITE / "_astro/PathPicker.astro_astro_type_script_index_0_lang.BqC6kGLH.js"
pp.write_text(sub(pp.read_text(), "a===`find-land`?`Not yet`", "a===`find-land`?`Still looking`"))

# ---------- /plan/ ----------
plan = SITE / "plan"; plan.mkdir()
for n in ["scene.js"]: shutil.copy2(V4 / n, plan / n)
for d in ["fonts", "img", "vendor"]: shutil.copytree(V4 / d, plan / d)
import plan_v5
(plan / "index.html").write_text(plan_v5.build((V4 / "plan.html").read_text()))
shutil.copy2(V5 / "src/v5.css", SITE / "v5.css")
print("plan: ok")
