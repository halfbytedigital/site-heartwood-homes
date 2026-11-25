# Delight (concentrated moments)

The things that make a site feel considered are not a pack of decorations added to every section. They are **one
or two memorable moments drawn from this client's world**. Quiet chrome (underlines, focus rings, press states)
is craft, not a tally.

**Hard rule.** The *site* ships:

1. **One signature moment** you would point to — usually on Home. Prefer something that could only belong to
   this client: a lot-to-finish scrubber of *their* job, a local clock, the address set as type, a clip-path
   from their roofline or chimney, a button set into a headline, text that changes color as you scroll over
   their photography. The trade-specific signature interaction counts as this moment when it is specific and
   large.
2. **At most one second moment**, only if it earns its place (a work-index hover image, a designed 404). Do not
   invent a third. Do not sprinkle 3–5 "details" across every page.

The library below is a menu for those moments and for quiet chrome — not a checklist to empty onto the site.

**Personality.** Professional-playful, never gimmicky. **Hospitality, not cleverness** — a moment that makes a
family feel looked after (a scrubber that helps them picture the build, a tappable phone set as type, a warm
owner greeting), not a trick that shows off the studio. If a detail would embarrass the client in front of a
customer, or get in the way of calling or writing, don't use it.

**Variation.** A new site must not reuse the same signature moment as either of the two most recent sites.
Record the 1–2 moments in `brief/plan.md` and `brief/brand.md` (and on the material board).

**Honesty.** Details must not invent facts. No fake counts on a ticker, no "since 1998" stamp, no "as seen in"
badges, no owner-name microcopy unless confirmed. Reduced motion always gets the final, usable state.

---

## What a strong first-run actually uses (catalog, patterns only)

Observed on the Heartwood Duda first-run — learn the *kinds* of details, never copy its text, art, or components:

- A **word-by-word manifesto reveal** as the first scroll moment (staggered fade-up, ~65ms, ~750ms, strong easing).
- **One scroll-driven moment** (a heading or photo, not every section easing in).
- A **peeking work rail** (next card clipped by the viewport, arrows only) that invites a drag.
- **Filter chips** that swap a featured service and its photos.
- **Overlay titles** on project photos, with a year, a large index numeral (`01`), and a small arrow.
- A **frosted sticky header** that the hero slides under.
- **Press feedback** on buttons (`scale(0.98)`).
- A **pill-shaped nav cluster** (the header is a designed object, not default chrome).
- **Hairline-ruled** service cells instead of shadowed cards.
- **Display-scale proof numerals** with tiny labels.
- **Personal, confirmed microcopy** on the CTA and contact path (a named person, not "Submit").

It did *not* use (on that preview) cursor-follow labels, marquees, hand-drawn marks, stickers, stamp rotation,
before/after wipes, tilted stacks, scroll-progress bars, or magnetic buttons. Those are still fair game for us
when they fit the brand — they are how we can feel more considered than a website-builder first-run, not a
checklist to dump onto every page.

---

## Library

Each entry is a reusable detail. Implement with tokens and the motion system; keep it ≤ a few KB. Pointer-only
behavior must never be required in order to understand or use the page.

### D1 Animated underline
- **What.** Links and text-style CTAs draw or thicken an underline on hover/focus, with an offset (~0.15em) and
  a 150–200ms ease.
- **Recipe.** `background` linear-gradient or `text-decoration` + `text-underline-offset`; transform scaleX from
  0→1 on hover/focus-visible (`@media (hover:hover)`). Use `--color-primary` or currentColor.
- **Suits.** Body links, H2 text CTAs, footer links, nav current-state. Almost any archetype.
- **A11y.** Must also appear on `:focus-visible`. Reduced motion: underline is simply on/off, no draw.
- **Personality.** Quiet; default-safe for calm sites.

### D2 Hover reveal
- **What.** A card or photo reveals a caption, arrow, year, or short label on hover; the image may scale to 1.04
  inside `overflow: hidden`.
- **Recipe.** Overlay at rest `opacity: 0` (or a quieter state); hover/focus-within reveals it. Keyboard users
  reach it by tabbing to the link. Don't hide the title at rest unless a visible title exists nearby.
- **Suits.** W3, W4, W6, project rails, S1 cards, C8 overlay titles.
- **A11y.** `:focus-within` equals hover. Reduced motion: no scale, overlay can be visible at rest or a hard cut.
- **Personality.** Wide range; keep overlays readable (scrim + contrast).

### D3 Cursor-follow label
- **What.** On a gallery or hero, a small label (project name, "Drag", "View") follows the pointer inside the
  media frame.
- **Recipe.** Pointer-only (`@media (hover:hover) and (pointer:fine)`). A `position: absolute` label, `transform`
  translated in `pointermove`, clipped to the frame. Hidden when the pointer leaves. Do not replace the real
  caption on the page.
- **Suits.** W2, W4, W5, H1/H2 media, galleries.
- **A11y.** Never the only label. Off entirely for touch, keyboard, and reduced motion (show a static caption).
  Don't hijack the cursor on inputs or buttons.
- **Personality.** Bold/editorial. Skip on reserved professional directions if it feels flashy.

### D4 Marquee ticker
- **What.** A slow horizontal ticker of *confirmed* phrases (service names, towns served, a short motto).
- **Recipe.** Duplicated list, CSS animation on `transform`. Pause on hover and focus-within. Content is also
  readable as a static wrapped list (that's the DOM). Never the only place a fact appears.
- **Suits.** A thin band between hero and work (P1-adjacent), footer top, a service-area moment (L1).
- **A11y.** `prefers-reduced-motion`: static, no scroll. Pause on hover/focus. Don't autoplay at a reading-
  unfriendly speed (one cycle ≥ 20s). No `marquee` element.
- **Personality.** Bold/crisp. Avoid on calm legal/medical tones. No fake "as seen in" logos.

### D5 Hand-drawn accent
- **What.** A small annotation: a circle around a word, an arrow to a photo, an underline squiggle, a thin
  rule that doesn't look like a box border. SVG, in the brand ink, ≤ 2–3 uses per page.
- **Recipe.** Inline SVG or a CSS mask, sized in `em` so it tracks type. Decorative (`aria-hidden="true"`).
  Place it so it still works if the SVG fails to load (the type remains).
- **Suits.** A6 manifesto, A1/A5 story, H4 type field, a single H2.
- **A11y.** Decorative only. Reduced motion: static (no "draw on" unless a 600ms once-in-view that's skipped
  under reduced motion).
- **Personality.** Warm, editorial, craft-oriented trades. Don't fake a child's handwriting on a buttoned-up brand.

### D6 Sticker or badge
- **What.** A small stamp-like badge ("Family owned", "Serving [area]", a monogram) that sits slightly rotated
  or overlaps a photo corner.
- **Recipe.** A circle or rounded square, display type, `--color-primary` or inverted ink. 1–2°–6° rotation max.
  Only confirmed claims. One or two per site, not per card.
- **Suits.** Hero corner, about photo (A1/A3), project feature (W5).
- **A11y.** If it carries a claim, it is real text (not baked into a raster). Rotation is visual only.
- **Personality.** Playful-professional. Skip if the brand kit is strict and formal.

### D7 Stamp / rotating text
- **What.** A circular "stamp" of a short confirmed phrase, optionally rotating very slowly, or a static tilt.
- **Recipe.** Text on a circle (SVG textPath) or a CSS rotate. If it moves, one revolution ≥ 16s, pause on
  hover/focus, stop under reduced motion (leave the stamp readable at a fixed angle).
- **Suits.** About, a project feature, a footer mark. Never as the only heading.
- **A11y.** The phrase exists as accessible text. Reduced motion: no rotation.
- **Personality.** Bold, craft, hospitality. Easy to overuse — at most one on the site.

### D8 Before/after reveal
- **What.** A draggable (range-input) wipe between two real photos, or a hover-to-reveal if a drag already
  exists elsewhere.
- **Recipe.** Follow signature-interaction rules if it *is* the page feature: native range, keyboard, live
  label, default shows a meaningful state. As a *small* detail, a single pair in a project or service section.
- **Suits.** W1, remodelers, land work, painting, a project page.
- **A11y.** Range input, visible label ("Before / after"), reduced motion still allows drag, no autoplay wipe.
- **Personality.** Almost any trade that has real pairs. Don't invent a pair.

### D9 Tilted or overlapping photo stack
- **What.** Two or three photos stacked with slight rotation and offset, like a desk of prints.
- **Recipe.** A small grid with `rotate(±2–5deg)`, overlapping 8–16% , consistent shadow token. Hover/focus-within
  can lift the top print (`translateY(-4px)`). Clip the wrapper so rotations don't cause horizontal scroll.
- **Suits.** About, a process step, a service feature, 404. Not a whole gallery (that's W2/W4).
- **A11y.** Each image has alt (or empty if truly decorative in a set that already has a label). Reduced motion:
  no hover lift required; a slight static tilt is fine.
- **Personality.** Warm, editorial, residential. Avoid on hard-edged modern brands that want flush crops only.

### D10 Small animated icon
- **What.** A line icon that animates once when it enters view (a plus, a chevron that draws, a simple tool).
- **Recipe.** SVG stroke-dashoffset, 400–700ms, once, triggered by the motion IO. Max a handful per page.
  No looping spinners as decoration.
- **Suits.** S2/S6 lists, R1 steps, P1 badges, form success.
- **A11y.** Decorative (`aria-hidden`). Reduced motion: final drawn state, no animation. 44px hit area if interactive.
- **Personality.** Crisp or bold. Calm sites can use static line icons instead.

### D11 Easter-egg microcopy
- **What.** A short, on-brand line in a low-stakes place: 404, form success, footer colophon, empty gallery.
  It should sound like the client, not like a startup.
- **Recipe.** One sentence, confirmed voice. Never hides a needed instruction. No invented jokes about facts
  (years, prices, names) we don't have.
- **Suits.** 404 (see D16), C4 success state, footer "Website by Half Byte Digital" line, an empty filter result.
- **A11y.** Real text, not a hover-only surprise. Humor is optional; clarity isn't.
- **Personality.** All, if the voice supports it. Skip if the client is formal.

### D12 Scroll progress
- **What.** A thin, brand-colored bar (or a small numeric "01 / 04" for a long story page) that tracks scroll.
- **Recipe.** A `position: fixed` 2px bar at the top (under or in the header), `transform: scaleX` from scroll
  progress, `transform-origin: left`, `aria-hidden="true"` (it's redundant with the scrollbar). Don't build a
  custom scrollbar in its place (see A16).
- **Suits.** Long Home, project articles, process pages. Skip on short Contact pages.
- **A11y.** Redundant; hide from AT. Reduced motion: jump or hide, don't ease every tick in a way that jitters.
- **Personality.** Quiet, widely usable.

### D13 Magnetic button
- **What.** The primary CTA slightly eases toward the pointer when it's nearby.
- **Recipe.** Pointer-fine only. Translate the button ≤ 6–8px toward the cursor, spring back on leave, 120–200ms
  `--ease-out`. Never move it enough to dodge a click. No effect on keyboard focus (focused button stays put).
- **Suits.** Hero primary, C3 closing CTA. One per view.
- **A11y.** Pointer-only enhancement. Reduced motion: no pull. Don't use on small mobile buttons.
- **Personality.** Bold/crisp. Skip for calm.

### D14 Number ticker
- **What.** Confirmed stats count up once in view (`data-count-up` from the motion system).
- **Recipe.** Already in `templates/scripts/motion.ts`. Default HTML is the final number.
- **Suits.** P5, H3 stat rail, S6 proof, Services opening.
- **A11y.** Final number in the DOM. Reduced motion: no count, show the value. Never exceed the claim.
- **Personality.** All, when the numbers are real. Don't add fake stats just to have a ticker.

### D15 Pinned storytelling
- **What.** A short type column stays sticky while photos or steps scroll beside it (composition C10).
- **Recipe.** See `compositions.md` C10. Desktop only; stack on mobile. No scroll-jacking.
- **Suits.** Process (R2), About, a case-study page.
- **A11y.** Keyboard scroll is normal page scroll. Reduced motion: still sticky is fine (it's layout, not motion).
- **Personality.** Editorial, high-ticket, case-study-led sites.

### D16 Playful 404
- **What.** The 404 is on-brand: a short line in the client's voice, one useful photo or a small stack (D9),
  and a clear path Home / Contact. Not a generic "Page not found."
- **Recipe.** Same tokens, designed first viewport, one delight (a stamp, a tilted photo, a dry one-liner).
  Links to Home and the primary CTA. No jokes that blame the visitor.
- **Suits.** The 404 page only (still counts as that page's signature feature).
- **A11y.** Real heading ("This page isn't here"), visible links, no autoplay.
- **Personality.** All; volume of play matches the brand.

### D17 Word-stagger heading
- **What.** A short manifesto or inner-page title reveals word by word (`data-animate-words`).
- **Recipe.** Already in the motion system. At most one or two headings per page. Default HTML is the full sentence.
- **Suits.** A6, H4, a single Home manifesto, an interior hero.
- **A11y.** Screen readers get the complete heading. Reduced motion: no stagger, text is visible at rest.
- **Personality.** Bold/editorial. Don't stagger body copy or every H2.

### D18 Peek invite
- **What.** A rail or gallery that *visually* says there's more (clipped next card, a "01 / 16" readout, arrows
  that react on hover).
- **Recipe.** Composition C4. Arrow buttons are the only control. Hover can nudge the next card a few pixels.
- **Suits.** W4, W6, P4, Home work section.
- **A11y.** Buttons have names ("Next project"). Keyboard operable. Reduced motion: no nudge, still peek.
- **Personality.** All, when there's real work to show.

### D19 Chip swap
- **What.** Chips swap a featured service or project without a page reload.
- **Recipe.** Composition C12. Selected chip has a clear `aria-selected` / `aria-pressed`. Panel is a live region
  if the swap is substantial, or the chips are links to in-page anchors if you want zero JS.
- **Suits.** S6, Projects filters, a Home "pick a service" block.
- **A11y.** Keyboard, visible selected state, no information only in color. Reduced motion: instant swap, no cover-fade required.
- **Personality.** All.

### D20 Confirmed personal microcopy
- **What.** A CTA or contact line that speaks like the business ("Talk to [Name]", "We'll call you back today")
  *only* with confirmed names and promises.
- **Recipe.** Copy from intake/sources. Fallback is a plain verb CTA ("Start your project") — never invent a person.
- **Suits.** C3, C4, header button, form success.
- **A11y.** Normal text and buttons. No time-limited promises we can't keep.
- **Personality.** Warm and personal voices. This is often the cheapest, best detail on the page.

---

## How to place them

- Spread details across the page: one in the hero chrome, one in the work/services block, one in about or proof,
  one in the close or footer. Don't cluster five hovers on the same grid.
- The page-level signature feature should be obvious in the first or second viewport (Home: the trade interaction).
- If you're short on photos or facts, lean on D1, D5, D11, D12, D16, D17, D20 — they don't need a new asset.
- If a detail needs JS, keep it in the existing motion island or a tiny companion; no new libraries.
