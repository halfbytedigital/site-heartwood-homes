---
name: review
description: 'Self-QA before Jake sees anything. Headless Playwright screenshots of every page at 1440 and 390 (plus reduced motion), automated audits (overflow, type and spacing vs tokens, contrast, touch targets, images, headings, SEO/schema, console errors), Lighthouse, a manual visual pass, and a copy honesty check where every claim is sourced or null. Fix, re-run, then report with a checklist.'
---

# Review

Output: `sites/<slug>/brief/review/` with screenshots, `audit.md`/`audit.json` (from the script), `lighthouse/`,
`claims.md` and `review.md` (the checklist you show Jake).

Never tell Jake a site, page or change is ready without running this. Small changes: re-run for affected pages
(`--pages /,/about/`).

## Step 1 — Build and serve

```
cd sites/<slug>
npm run build && npx astro preview --port 4321 &     # review the production build, not the dev server
```

If a page 404s or the build warns, fix first.

If Jake (or you) is reviewing over a Cloudflare quick tunnel (`*.trycloudflare.com`) and you get
`403 Blocked request. This host is not allowed`, add `vite.server.allowedHosts` and `vite.preview.allowedHosts`
of `['.trycloudflare.com']` to `astro.config.mjs` and restart. Do not screenshot the 403 as if it were the site.
For full-page stills of pages that use scroll-driven animations, prefer reduced-motion (or force final states)
so mid-page sections are not captured at `opacity: 0`.

## Step 2 — Automated audit + screenshots

```
npx playwright install chromium                       # first time only
node ../../scripts/review.mjs --base http://localhost:4321 --out brief/review
```

The script finds every page (sitemap + link crawl) and for each one, at **1440×900** and **390×844**
(and 390 with reduced motion), saves full-page and above-the-fold screenshots and checks:
horizontal overflow, visible inner scrollbars, font sizes off the token scale, section padding off tokens, adjacent
sections with the same background, text contrast (solid backgrounds; text over images is flagged for a manual look),
touch targets under 44px, image issues (alt, dimensions, upscaled, not AVIF/WebP, eager first image),
heading order and single H1, placeholder text, console/network errors, missing tokens from the contract,
title/description/canonical/OG/lang/skip link/schema, claim-like sentences, and `[data-reveal]` stuck hidden under
reduced motion.

## Step 3 — Lighthouse (mobile)

```
npx lighthouse http://localhost:4321/ --preset=perf --form-factor=mobile --quiet --chrome-flags="--headless=new" \
  --output=json --output=html --output-path=brief/review/lighthouse/home
```

Run for Home + one service page + Contact (at minimum). Compare with the budgets in design-foundation A9
(Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95, LCP ≤ 2.5s, CLS ≤ 0.05, TBT ≤ 150ms). Also check total JS/CSS/font
bytes from `dist/` (`find dist -name '*.js' | xargs gzip -c | wc -c`).

## Step 4 — Look at every screenshot (manual pass)

Open the images. The script can't judge taste, so check:

- **Would a design agency ship this?** This is a ship/fail rubric, not a compliment. Score each page
  (agency / competent / DIY) on: first viewport, composition, type scale and contrast, rhythm/negative space,
  imagery, motion, micro-detail, nav/footer craft, delight, and point of view. **DIY on the first viewport,
  or DIY on two or more other axes, or three or more template tells from A20, fails the build** — even if
  tokens, contrast and Lighthouse pass. "Clean and professional, like something the business could have built
  itself" is a fail, not a soft pass. A website-builder first-run is the floor we have to beat.
- **Would the client's customer feel cared for?** Equal ship/fail, asked on every page (A21). Warm, human,
  trustworthy: real people/faces/owner voice when we have them; plain-language copy; call, quote, and contact
  always easy to find; body type 16px+ and nothing under 14px (never 11px); no experimental or mystery-meat
  nav; motion that reassures rather than shows off; delight that feels like hospitality, not cleverness.
  A stunning but cold, hard-to-read, or hard-to-act-on page fails. A friendly but generic page also fails.
  Both questions have to pass. Guiding principle: **cutting edge but caring.**
- **First impression at the fold** (desktop and mobile): display-scale H1, one primary action, a strong photograph
  or typographic field, a compositional idea (split bleed, type field, overlap — not a padded box of image +
  heading + two buttons). No gray holes.
- **Composition and anti-template:** count the composition moves (Home ≥ 4, interiors ≥ 2). Run the A20 tell
  list. Note every tell in `review.md`.
- **Delight:** 1–2 client-specific moments for the site (Home: the signature, hard to miss). List them in
  `review.md`. A pile of generic ticks, or no memorable moment at all, is a fail. Missing a 3–5 "details per
  page" count is *not* a fail — that rule was retired.
- **Motion plan, not a baseline.** On a preview *with motion enabled* (not `prefers-reduced-motion`), confirm:
  one hero load-in plays once; one scroll-driven signature (plain CSS) works; hovers/press are quick; optional
  view transitions if planned. **Everything else stays still.** Fail if every section fades up, if count-up
  stat rows were added without a written justification, or if there is no motion plan. Watch a slow scroll
  (or a short Playwright video) at 1440. Record a couple of signature-interaction states.
- **Reduced motion, focus, no hidden content:** emulate `prefers-reduced-motion: reduce` and screenshot every
  page again if needed. Every section must be visible (no leftover `opacity: 0`). Visible `:focus-visible` on
  interactive controls (Tab a few times and screenshot). No loader or overlay hiding content. This is also
  how you take full-page stills without "holes."
- **Anti-generic (A20) and template smell test:** reject eyebrow-on-every-heading, identical card grids
  (especially on Projects — prefer photo-forward C15 / C16 / C17), cream + serif display + terracotta unless
  the material board sampled it from *their* photos or kit and the plan justifies it, and a boxed Legacy hero,
  Teton badge soup, or Hammond remodeler chrome (see `grounded-references.md`). Default display for trades and builders is 56–72px at
  1440; under ~56px usually fails; above 120px only if the plan named the luxury-modern knob.
- **Alignment:** one shared container, consistent left edges at 1440 and 390. Headings and body in the same section share an alignment. Asymmetry (a split hero, an offset image) is grid-snapped and clearly deliberate — not drift, not wildly off-center type. The automated audit flags a left-edge spread of 16px or more; confirm each flag visually.
- Nothing hugging the screen edge on mobile unless it is a planned full-bleed photo.
- Section rhythm: generous, consistent spacing; no cramped or empty bands; surfaces alternate sensibly.
- Type: no widows/orphans in headings, no overly long lines, hierarchy obvious at a glance, readouts not bigger than H2s.
- Photos look like one set (`.photo` treatment), subjects not cropped out, no stretched logos, no blurry images.
- Mobile action bar visible and not covering content or the footer; hides over the form and open menu.
- Mobile menu opens/closes; keyboard Tab order through the header makes sense; focus ring visible (take a
  screenshot with `page.keyboard.press('Tab')` a few times if unsure).
- Text over images is readable (scrim) on both crops.
- **Variation check:** compare Home with the two most recent sites' Home screenshots (`sites/*/brief/review/home-desktop.png`).
  If it looks like a sibling (same hero layout + same type feel), fix before showing Jake.
- Signature interaction: actually on the Home page and hard to miss; works with mouse, touch (390 emulation,
  vertical swipe still scrolls), keyboard, screen reader text (`aria-valuetext`, live region), reduced motion;
  numbers never exceed real claims; CTA carries values to the form. Screenshot at least two states.
- Forms: required/invalid states, success state, submission reaches the endpoint (use a test address / GHL test
  contact; don't spam the client). Multi-step qualifiers ask for contact last. Estimators show a range before
  any contact field.
- **Conversion audit (P16):** at 1440 and 390, does screen one state the outcome, the place, the next step, and
  the proof? Is the primary CTA visible? Only one primary button style? Trust beside every ask? Field count
  3–5 on a short form? Targets ≥ 48px for primary actions? Banned patterns (load pop-ups, self-opening chat,
  fake urgency, gated prices) absent? Header phone and CTA present? Sticky mobile call bar? Dark closing band?
- **Tracking test (P19):** fire every event in the preview (`quote_submit`, `call_click`, `estimator_*`,
  `qualifier_*`, `save_house`, …) and confirm it in the dashboard before launch. `brief/measurement.md` is filled in.
  Toggle a heart and confirm the CTA reads "Start your home (N saved)", the qualifier "Houses you liked" field
  fills, and `save_house` fires.
- **Project galleries and C28 shell:** every project page uses the harvested gallery, not a single cover, when the source
  had more than one photo. Compare `brief/assets/projects/<slug>/manifest.json` (source count) to the built
  page. **Fail the build** if a project has only one photo on the site while the source has more.
  **Fail the build** if a project page's first viewport at 1440 or 390 does not show a photograph (the
  striking photo, not a title-and-boilerplate stack). The `review.mjs` audit flags this as `projectHeroPhoto`.
  Confirm the rest of the C28 shell: Walk through rail with the current section lit and jumps landing on the
  section heading (scroll-margin on the sections); no "View larger" badges; viewer chrome is Close top-right
  and Prev/Next on the sides, with swipe, arrows, Esc, and reduced motion; heart buttons use `aria-pressed`
  and do not show a fake count; next-house is a calm card, no door animation. A day/dusk or before/after
  slider is only a real drag reveal of a same-vantage pair. On the mobile work index, house names must clear
  the sticky call bar. Google ratings must not link to a search. Content patterns still match C22–C26.
  With 8 or more projects, confirm C29 filters (chips, counts, `?type=`, keyboard / `aria-pressed`,
  reduced-motion instant, in-place fade with no fly-in from 0,0, mobile chip row clear of sticky bars).
  With 6 or more projects and good photographs, confirm the C32 portrait rail: 2:3–3:4 cards, five plus
  a sliver at 1440 and one or two plus a sliver at 390, first card on the type margin, 16–24px gaps,
  live `01 / N` counter, 1:1 scrollbar (no snap, no custom momentum), prev/next, overflow-x auto
  (trackpad / Shift+wheel), keyboard-focusable cards and arrows, no page scroll-jacking.
- **Empty runway (A25):** fail any vertical gap with no visible content over ~240px at 1440 or ~160px
  at 390. A sticky or scroll-driven section (scrubber, pin, `view()` fade) must show its content on the
  first frame — `review.mjs` reports `emptyGaps`. Do not leave an opacity-0 stage as blank page.
- **Overlay scrubber (C31):** if the Home (or equivalent) has a lot-to-finish scrubber, confirm the
  photograph and its controls share the viewport at 1440×900 and 390×844; the photo is the drag/swipe
  control — a drag or swipe on the stage, including above the glass bar, must change chapters (threshold
  then snap); tappable stops; arrow keys work when the stage or the slider is focused; a restyled
  range or `role="slider"` (`aria-valuetext`, live region); no pinned or scroll-jacked scroll; a glass
  bar sits on the photo with a margin, both `backdrop-filter` and `-webkit-backdrop-filter`, and a
  solid fallback; the track is a branded material line, not a second icon timeline; the primary CTA
  appears prominently only on the last chapter; reduced motion is an instant swap; the photo credit
  is visible; query params on the CTA are honored by the qualifier.
- **Build-brief wizard (C33):** if the site has a `/plan/` brief, confirm the branched flow (land
  details only when they have land; one qualitative money screen with **no dollar figures**); the
  sketch is the layered scene + GSAP, not runtime geometry (each house type distinct, rental /
  something else borrow lake or family, deck only when picked, walkout a stepped grade inside the
  frame, garage on grade, `scene-collisions.mjs` reports 0 collisions); **zero layout shift**
  (`cls-run.mjs`: CLS 0 with zero entries at desktop, mobile, and reduced motion; no unrequested scroll
  on option picks, a step change brings the new question into view and focuses it, `/plan/` opens at the top; branded steppers,
  upload, chip grid, and progress bar; no map picker, no service-area promise); "Rather just talk?" carries answers into the
  Contact qualifier; the path picker's "Start your home" goes to `/plan/` and `?path=` / `?work=` /
  `?land=` / `?timeline=` are applied on load; localStorage resumes a draft (no contact fields
  stored); the brief can be printed / saved as PDF, copied as a link, and sent through the existing
  contact endpoint as a formatted email; look-at-first is rule-driven and capped at five; events
  `wizard_start`, `wizard_step`, `wizard_complete`, `brief_save`, `brief_send`, and
  `wizard_exit_contact` fire; radios / fieldsets, focus moves to the step heading, reduced motion
  is instant, and the mobile sketch dock is clear of the sticky call bar. Copy is A24.
- **Hero card padding (A27):** light cards or panels over a photograph (`.hero-panel`, `.info-card`,
  equivalents) have at least 32px padding on all sides at desktop and 24px under 800px. Fail a flush
  `padding-inline: 0` or any inner padding under 24px.
- **Type for trades and builders (A26):** display is a warm serif at 56–72px at 1440, with two-line
  hero breaks, not a single giant one-line sans. Body, buttons, filters, dates, and kickers stay in
  the sans. Fonts are self-hosted, `font-display: swap`, display face preloaded, license files present.

## Step 5 — Copy honesty check

1. Collect every claim: the script's "claims to verify" + anything in `brief/review/claims.md` + manual read of each page
   (numbers, years, ratings, licenses, insured/bonded, certifications, awards, warranties, guarantees, prices,
   "best/#1/top-rated", areas served, team names, review quotes).
2. For each one, find the source in `sources.md` (URL + quote) or a confirmed value in `src/data/site.ts`.
3. Any claim without a source → remove or rewrite it, or move the value into `site.ts` as `null`.
4. Reviews: compare to source text character by character.
5. Write `claims.md`: claim | page | source | status (✔ sourced / ✘ removed / ⚠ needs client confirmation).
6. **Copy voice (A24):** run a read of every page against `templates/copy-voice.md`. `review.mjs` flags
   banned and internal/meta phrases (`copyVoice`). Rewrite anything that talks about sources, what is
   "listed" or "published," missing prices, or generic filler. Missing facts are omitted, not explained
   to the visitor.

## Step 6 — Fix and re-run

Fix everything you can (overflow, contrast, spacing, sizes, alt text, schema, claims). Re-run Steps 2–5 until the
automated checks pass or each remaining item has a reason.

## Step 7 — Report to Jake (`review.md`)

Keep it short. Lead with the result, then show the evidence:

```
## <Site> review — <date>
Result: Ready for your look / Needs your input on 2 things

Screenshots: brief/review/home-desktop.png, home-mobile.png, … (attach the 4–6 most useful)

Checklist
- [x] Every page screenshotted at 1440 and 390 (N pages)
- [x] Agency rubric: would a design agency ship this? (fail if DIY at the fold or on two+ axes, or 3+ template tells)
- [x] Care rubric: would the client's customer feel cared for? (people/voice, plain language, obvious call/quote/contact, body 16px+, no mystery nav, hospitality not cleverness)
- [x] Type: body 16px minimum, no text under 14px; drama is in display size
- [x] First impression bar: first viewport feels finished at 1440 and 390
- [x] Composition moves present (Home ≥ 4, interiors ≥ 2); anti-template checklist passed
- [x] Delight: 1–2 client-specific moments listed; not a sprinkle of generic ticks
- [x] Motion plan followed (one hero load-in, one CSS signature, hovers; the rest still); Playwright scroll video or equivalent watched
- [x] Anti-generic: no default eyebrow parade, card-grid indexes, fade-every-section, unjustified count-ups, or cream+serif+terracotta unless sampled and justified
- [x] Project galleries: no project ships one photo when the source harvest had more; first viewport at 1440 and 390 shows a photo; C28 shell (rail, hearts, viewer, next-house) is present; C22–C26 match the photos; C29 filters when 8+ projects; C32 portrait rail when 6+ projects have good photos
- [x] Copy voice (A24): no banned or internal/meta phrases; missing facts omitted, not explained
- [x] No empty runway (A25): no visible-content gap over ~240px at 1440 or ~160px at 390; sticky/scroll-driven sections show content on the first frame
- [x] One widget, one page: a distinctive interactive widget is not repeated across pages
- [x] Overlay scrubber (C31, if present): photo + controls share the viewport at 1440 and 390; photo drag/swipe (including above the glass) changes chapters; arrow keys work when the stage or slider is focused; unprefixed + `-webkit-` backdrop-filter with a solid fallback; no scroll-jacking; CTA at the last chapter; reduced motion instant
- [x] Build-brief wizard (C33, if present): 10/7 branched steps, no dollar figures, layered scene + GSAP (0 collisions, deck opt-in, type mapping), CLS 0 (desktop / mobile / reduced), stepped walkout sketch, path-picker deep links applied, "Rather just talk?" carries answers, localStorage resume, brief print / copy-link / send (formatted email), look-at-first rules, wizard events fire, radios / fieldsets, focus per step, reduced motion, mobile sketch dock, A24
- [x] Hero card padding (A27): light photo-over cards have ≥ 32px padding on all sides at desktop, 24px under 800px, never under 24px
- [x] Type (A26, trades and builders): warm serif display 56–72px at 1440, two-line hero breaks, no giant one-line sans; sans UI for body/buttons/filters; self-hosted, swap, preload, license files
- [x] Template smell test: not a Legacy boxed hero + tile grid, not Teton badge soup, not Hammond remodeler chrome
- [x] Conversion: one primary CTA, trust beside the ask, contact last on tools/qualifiers, thank-you page, no banned patterns
- [x] Measurement: events fired in preview, brief/measurement.md filled, 90-day baseline noted
- [x] No horizontal overflow or inner scrollbars
- [x] Type and spacing on tokens
- [x] Contrast AA (manual check on hero text over photos)
- [x] Touch targets ≥ 44px; mobile action bar OK
- [x] Reduced motion: everything visible (no opacity-0 holes), interactions work; focus-visible obvious; no content-hiding loader
- [x] Signature interaction on Home, two states screenshotted
- [x] Lighthouse mobile: Perf 96 / A11y 100 / BP 100 / SEO 100; LCP 1.8s; CLS 0.01
- [x] SEO: titles, descriptions, canonical, OG, sitemap, LocalBusiness schema (null fields omitted)
- [x] Honesty: 14 claims checked, all sourced; 3 facts hidden until confirmed (list)
- [ ] Needs Jake: <e.g. client photos for Process page; license number>

Facts hidden until confirmed: year founded, license #, review count…
What I fixed during review: …
```

Then stop and wait for Jake's feedback.
