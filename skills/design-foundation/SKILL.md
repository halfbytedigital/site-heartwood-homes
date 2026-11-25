---
name: design-foundation
description: 'The "bare metal" UI/UX rules every Half Byte site follows (spacing, grid, type, contrast, touch, focus, motion, images, performance, mobile action bar, forms, nav, footer, SEO, accessibility, honesty), agency-level composition and a delight layer, the expression knobs that make each site look different, and the CSS token contract. Read before writing any markup or CSS.'
---

# Design foundation

## Principle: cutting edge but caring

This is the top-level test for every Half Byte site. Award-site craft is the standard for how it *looks*;
care is the standard for how it *feels*. We are selling to **local service businesses and their customers** —
often families and homeowners making a big, emotional purchase (a custom home, a remodel, a steep lot). The
craft has to be modern and agency-grade, and also warm, human, and trustworthy.

**Cutting edge.** Agency-level composition, photography, type contrast, and one memorable moment. The question
"would a design agency ship this?" still stands. Clean-but-generic fails.

**Caring.** Real people, faces, and owner voice when we have them. Plain-language copy. Obvious next steps:
**call, quote, and contact are always easy to find** (header, mobile action bar, and a clear closing path).
Text is legible for older audiences — **body 16px minimum; no 11px type anywhere.** No experimental or
mystery-meat navigation, and no style that gets in the way of understanding. Motion reassures and guides; it
never shows off. Delight feels like hospitality, not cleverness. The second question, asked on every page:
**would the client's customer feel cared for?**

A site that is stunning but cold, hard to read, or hard to act on fails. A site that is friendly but generic
also fails. Both questions have to pass.

Two layers:

1. **Invariants.** Rules every site follows. They are why our sites look professional and "pop" right away.
   Breaking one needs Jake's OK, written down in `brief/brand.md`.
2. **Expression knobs.** Choices each site makes differently. They are why our sites don't all look the same.

Every value in CSS comes from a token (Section C). No raw hex, px font sizes or magic spacing in components.

## A0. First impression (non-negotiable)

The first viewport at **1440 and 390** must pass **both** bars: a **design agency would ship this**, and the
**client's customer would feel cared for**. It is not a skeleton, and not merely a clean site a capable
business owner could assemble in a website builder this afternoon. A polished website-builder first-run is the
*floor*. We beat it with composition (A18), concentrated delight (A19), a trade-specific signature feature,
honesty, and a human, trustworthy tone (A21).

If a sharp designer would say "that's a tidy template with nicer fonts," it is not ready. If a homeowner would
say "I don't know who these people are, or how to reach them, or what this says," it is not ready either.

Required in the first viewport:

- A **real photograph** from the client's existing site or assets, or a typographic / color-field composition that still feels designed. Never a gray box, a labeled placeholder as the hero, or an empty band. If learn mode found photos, use them.
- **Display type** at `--step-display` (default for trades and builders: **56–72px at 1440**; luxury-modern / Eppright up to 120px only when the plan names it), tight leading (`--leading-tight`, about 1.1), slightly tight tracking (about −0.02em). `--step-display` must be clearly larger than H2. Body stays 16px+. See A26.
- Hero fills the viewport on desktop (min-height ~100vh, or a split hero whose photo column does). One H1 that names the outcome, one primary CTA plus a quieter Call, the phone visible in the header, no clutter. A trust strip (C18) sits immediately under the hero.
- The **hero load-in** from the motion system plays once on arrival (see A7).
- If facts or photos are still `null`, do **not** leave a hole. Use editorial type, ruled layouts, and the images you do have so the page still feels complete. Ask Jake once, with options (labeled placeholder / skip / stock with his OK). Prefer pulling every usable photo from the confirmed existing site before asking.

---

## A. Invariants

### A1. Spacing: 8pt system

- Scale (px): `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160` → `--space-3xs … --space-4xl` (see tokens).
- All margins, paddings and gaps come from the scale. 4 and 12 are only for tight UI (icon gaps, chips).
- Spacing shows relationships: space inside a group < space between groups < space between sections.
  Typical: eyebrow → heading 12–16, heading → lede 16–24, lede → content 40–48, card padding 24–32,
  grid gap 24 (mobile 16) to 64 for two-column splits.
- Vertical rhythm comes from the scale, not from line-height hacks or `<br>`.

### A2. Layout grid and containers

- **Default: one shared, centered container and a consistent grid.** Most text, lists, forms and mid-page
  sections sit in `--container` with the same left edge and the same gutters. Local service businesses and
  their customers expect this. Wildly off-center or wandering layouts are a mistake, not a craft flex.
  - `--container` = **1240px** default content width (grounded band: about 1200–1280px).
  - `--container-narrow` = **720px** for text-heavy pages, forms, legal.
  - `--container-wide` = **1440px** for galleries and full-width media.
  - Full-bleed is reserved for the hero, one dark band, and at most one mid-page photo band. Body text stays in the
  container. Do not shrink photos into a padded, rounded box just to be tidy.
- **Asymmetry is optional and restrained.** A split hero, an occasional offset image, or a peeking rail is
  allowed when it is **snapped to the grid** (columns and gutters, not a random leftover margin) and recorded
  in `brief/plan.md`. It is not a requirement. Do **not** require off-center placement, and do **not** require
  that "something on every page breaks the container."
- Gutters: 16px under 640, 24px 640–1023, 48px at 1024+ (`--gutter`). Left edges of in-container content must
  line up across sections at 1440 and 390. If two sections' text left edges differ by more than a gutter, it
  is drift — fix it.
- 12-column mental grid on desktop. Default to a straightforward split (including 6/6) when it reads clearly.
  Uneven splits (7/5, 8/4) are a choice, not a goal.
- Broken-grid and overlapping compositions (C3) are optional, rare, and must snap to the grid. Clip
  `overflow-x` on `body` after you've checked nothing important is cut off.
- Breakpoints: 640, 768, 1024, 1280. Prefer **container queries** (`@container`) for card/rail internals so
  they adapt inside a column, not only at the viewport. Design and verify at **390** and **1440**; check 320, 768 and 1024 too.
- Nothing ever causes horizontal scroll at any width ≥ 320px.

### A3. Section rhythm

- Section padding starts at **96px desktop / 64px mobile** (`--section-pad`), with tight 64/48 and loose 128/80.
  CTA strips: 64/48. **Do not use the same padding on every section** — that evenness is a template tell.
  Tighten groups that belong together; give manifesto type, a peek rail, or a closing band extra air.
- Alternate section surfaces deliberately (bg → surface → bg, or a darker band, or a ruled/divided block).
  Never two identical-looking sections in a row with different content.
- Mix **layout shapes**, not just background colors: a full-bleed or split media band, a horizontal snap rail
  that peeks the next card, a ruled 2×2, a type-led manifesto, a dark closing CTA. A page of stacked card
  grids or stacked heading+paragraph blocks is not enough, even if the spacing is correct.
- Each section has one job and one primary action at most.
- Order on a home page follows the visitor's questions: What do you do? → Can I trust you? → Show me →
  What would my job take? → What do others say? → How do I start?

### A4. Typography

- Max **2 families** (display + text), self-hosted woff2, `font-display: swap`, preload the display face.
  A third face only for a logo-matched accent, and only with Jake's OK. Ship the font license files
  (OFL or equivalent) next to the files. Recommended default for trades and builders: Newsreader +
  Source Sans 3 (`templates/fonts/`, `templates/styles/fonts.css`).
- Body: 16px mobile, 17–18px desktop. Line height: body 1.55–1.7, headings 0.95–1.2 (tighter as size grows).
- **Fluid type scale.** Mobile ratio 1.2 at 390px; desktop ratio per the "type contrast" knob at 1440px.
  Formula for each step: `clamp(MIN, calc(MIN - SLOPE*390px) + SLOPE*100vw, MAX)` where
  `SLOPE = (MAX - MIN) / 1050`. Default (desktop ratio 1.333):

  | Token | 390px | 1440px | CSS |
  |---|---|---|---|
  | `--step--1` | 14 | 15 | `clamp(0.875rem, 0.852rem + 0.095vw, 0.9375rem)` |
  | `--step-0` | 16 | 18 | `clamp(1rem, 0.954rem + 0.190vw, 1.125rem)` |
  | `--step-1` | 19 | 24 | `clamp(1.1875rem, 1.071rem + 0.476vw, 1.5rem)` |
  | `--step-2` | 23 | 32 | `clamp(1.4375rem, 1.229rem + 0.857vw, 2rem)` |
  | `--step-3` | 28 | 43 | `clamp(1.75rem, 1.402rem + 1.429vw, 2.6875rem)` |
  | `--step-4` | 33 | 57 | `clamp(2.0625rem, 1.505rem + 2.286vw, 3.5625rem)` |
  | `--step-5` | 40 | 76 | `clamp(2.5rem, 1.664rem + 3.429vw, 4.75rem)` |

  Calm sites use desktop ratio 1.25 (step-5 ≈ 55px). Bold sites use 1.5 only when the plan names the
  **luxury-modern / Eppright** display knob (see below).
  The hero H1 uses `--step-display`. **Default for trades and builders at 1440 is 56–72px**
  (`clamp(2.5rem, 6vw, 4.5rem)` lands at 72px). Tight leading (about 1.1), slight negative tracking
  (about −0.02em), optical sizing when the face supports it. Prefer two-line hero breaks. At 390 it
  can be smaller (~40px), but the clamp must still feel oversized next to body type. Never leave
  `--step-display` equal to `--step-5`. Never set a single giant one-line sans headline.
  **Luxury-modern knob:** when the plan names an Eppright-style custom-home direction, `--step-display` may go
  up to **120px at 1440**, still as a serif display with two-line breaks, not a one-line sans billboard.
  Do not default to 150px display lines (Eppright's own outlier). Do not silently shrink body type to buy contrast.
- **Body stays comfortably readable. Drama comes from display size, not from shrinking the text.** Body
  (`--step-0`) is **16px minimum** — 16px at 390, 17–18px at 1440. Captions, indexes, asides, eyebrows and
  meta (`--step--1`) are **14px minimum** (14–15px). **No text on the site is smaller than 14px. Never 11px,
  never 12px, never 13px** — award-site micro type is not appropriate for older homeowners or for a local
  service business. Inputs stay ≥ 16px (also avoids iOS zoom). Type contrast is a 16–18px body (and 14–15px
  labels) next to a 56–72px (or, if named, up to 120px) word, not a tiny index next to a modest heading.
- Map: H1 = step-display, H2 = step-4, H3 = step-2, H4/card title = step-1, body = step-0, small/meta = step--1.
- **Mixed weights and contrast.** A heavy display against a lighter body (or the reverse) is a craft tool. A
  single stressed word in a headline may be heavier or italic; don't set every heading the same weight.
- **Eyebrows** are optional and scarce — a few per page at most, never on every section (that is a template tell).
- **Graphic numerals** (proof stats, `01` indexes) may be set in the display face at step-4 or larger, even larger
  than a nearby H2, as a device (composition C7). They are not a second page H1. The page H1 remains the typographic
  champion of the first viewport. Every number is confirmed or hidden (A17).
- **Line length:** body 45–75 characters (`max-width: 65ch`), lede ≤ 55ch, headings ≤ ~20ch with `text-wrap: balance`;
  paragraphs `text-wrap: pretty`.
- One H1 per page. Heading levels never skip. Eyebrows are not headings (use `<p>`).
- Uppercase only for eyebrows, short labels and (if the knob says so) display headings, with letter-spacing
  0.04–0.16em. Never uppercase body copy.
- No widows on hero headings at 390 and 1440 (check screenshots).

### A5. Color and contrast (WCAG 2.2 AA)

- Text ≥ **4.5:1** against its background; large text (≥ 24px, or ≥ 18.66px bold) ≥ **3:1**.
- UI components, icons that carry meaning, input borders and focus rings ≥ **3:1** against adjacent colors.
- Text on the accent (button labels) must hit 4.5:1. If neither white nor near-black passes on the brand accent,
  use a darker `--color-primary-strong` for the button fill and keep the brand accent for decoration.
- Text over photos: guarantee contrast with a scrim/gradient token (`--scrim`), checked on the actual photo at
  both breakpoints.
- **One accent** carries action (buttons, links, key highlights). A support color is allowed for status or a
  secondary surface, never competing with the primary CTA.
- Never use color alone to signal state (add text or an icon).
- Status colors: `--color-success`, `--color-warning`, `--color-danger`, each passing 3:1 on its background.

### A6. Touch targets and interactive states

- Min touch target **44×44px**. Standard buttons are **52px tall** (316 default), inputs 48px+, min 8px between targets.
- Every interactive element has: default, hover (pointer devices only, `@media (hover:hover)`), `:focus-visible`,
  active/pressed, disabled (where it applies), and loading (for submit buttons).
- Focus: `outline: 2px solid var(--color-focus); outline-offset: 3px;` ≥ 3:1 contrast. Never `outline: none`
  without a visible replacement.
- Buttons: primary (filled accent), secondary (outline or ghost), text link. Max one primary button per view.
  Labels are verbs that say what happens: "Get a free quote", "Call (423) …". No "Submit", no "Click here".
- Links in body text are underlined (offset 0.15em, thickness 1–2px). Nav links may drop the underline but need
  a clear current state (`aria-current="page"`).
- Cursor pointer only on actual links and buttons.

### A7. Motion plan (not a baseline applied to every section)

Do **not** fade every section up on scroll. That, plus count-up stat rows, is now a generic-AI tell (A20).

**Before any animation is written**, record a short **motion plan** in `brief/brand.md`:

1. **One hero load-in** — a single entrance for the first viewport (headline, or headline + image), once, on
   arrival. Stagger at most the hero's own children, not the rest of the page.
2. **One scroll-driven signature**, in **plain CSS** where possible (`animation-timeline: view()` with an
   IntersectionObserver fallback). This is the memorable move: a heading that changes color as it crosses the
   viewport, a photo that clips or wipes, a sticky line of type, the trade-specific interaction. One per site,
   maybe two if an interior page truly needs its own.
3. **Quick hover and press states** — 120–200ms, `--ease-out`, `@media (hover: hover)`. Buttons, links, and
   the work index. No laggy 700ms fades on cards.
4. **Optional** same-document view transitions (project thumbnail ↔ page/modal), with a no-transition fallback.

Everything else stays still. A quiet page with one excellent move beats a page where every block eases in.

**Motion reassures and guides; it never shows off.** Prefer a calm, readable entrance and one meaningful
signature (the scrubber, a photo wipe, a heading that changes color over their work) over tricks that ask
the visitor to admire the animation. If a move would confuse a homeowner or hide a next step, cut it.

Use `templates/styles/motion.css` and `templates/scripts/motion.ts` as **utilities** for the hero load-in and
the one signature — do not stamp `data-animate` on every section. Count-ups (`data-count-up`) are **optional**
and only when a confirmed number is worth a moment *and* the plan justifies it; they are not a default proof-row
pattern.

- Durations: `--dur-fast` 120ms (hover/press), `--dur-base` 200ms (UI), `--dur-hero` for the one load-in
  (600–900ms), `--dur-reveal` only for the one signature (≤ 700ms). No 1.4s decorations.
- Easing: `--ease-out: cubic-bezier(.2,.7,.2,1)`; `--ease-reveal: cubic-bezier(.22,1,.36,1)` for the signature.
  Never linear for UI.
- Animate only `transform`, `opacity`, `filter` and `clip-path`. No layout-shifting animation.
- **Content is visible without JS and under reduced motion.** Gate pending states with `html.js`.
  `@media (prefers-reduced-motion: reduce)`: no load-in, no signature motion, no view transitions; **final
  states shown immediately** (no element left at `opacity: 0`, no loader that hides content). Interactions
  still work. Visible `:focus-visible` is never removed.
- No autoplaying carousels. Background video only if muted, short, with a poster, paused under reduced motion,
  and under the performance budget.

### A8. Images and media

- Use Astro `<Image>`/`<Picture>` (AVIF + WebP, responsive `widths`, `sizes`). Always width/height or aspect-ratio
  so nothing shifts.
- **LCP image** (usually the hero): a real `<img>`, `loading="eager"`, `fetchpriority="high"`, not a CSS background,
  not hidden behind an animation. Everything else `loading="lazy" decoding="async"`.
- Fixed aspect ratios per role (set by the photo knob): hero 16:9 or 3:2 desktop and 4:5 or 1:1 mobile (use
  `<Picture>` art direction when the crop changes), cards 4:3 or 3:2, portraits 4:5, galleries one consistent ratio.
- `object-fit: cover` with deliberate `object-position` per image so subjects aren't cropped out.
- Alt text describes what's shown and why it matters ("Finished cedar porch on a hillside home in Signal Mountain"
  only if the location is confirmed). Decorative images: `alt=""`.
- Real photos over stock. Stock only with Jake's OK, logged in `sources.md`, never presented as the client's work.
- Logos: SVG preferred; never stretch; clear space ≥ the logo's x-height.

### A9. Performance budgets (mobile, Lighthouse "Mobile" profile)

Accessibility and performance are a **differentiator**, not a cleanup pass. First paint is real content — **no
splash, skeleton, or loader that hides the page**. Images use `width`/`height` or aspect-ratio so they don't jump.
The hero image is the LCP element.


| Metric | Budget |
|---|---|
| LCP | ≤ 2.5s (target 2.0s) |
| CLS | ≤ 0.05 |
| TBT / INP | ≤ 150ms / ≤ 200ms |
| JS per page | ≤ 50KB gzip (signature interaction may add ≤ 30KB, loaded only on its page) |
| CSS | ≤ 40KB gzip |
| Fonts | ≤ 2 families, ≤ 4 woff2 files, subset to Latin |
| Hero image | ≤ 200KB mobile, ≤ 350KB desktop |
| Page weight | ≤ 1.2MB mobile first load |
| Lighthouse | Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 |

No jQuery, no carousel libraries, no animation libraries unless Jake approves. Third-party embeds (maps, review
widgets, chat) load on interaction or below the fold with a facade.

### A10. Mobile action bar

- Under 768px, a fixed bottom bar with 2–3 actions from intake (e.g. **Call · Text · Quote**). Icons + labels.
  Targets ≥ 48px. Hiller is the approved reference (conversion P2).
- Height 64px + `env(safe-area-inset-bottom)`; body gets matching `padding-bottom` so nothing hides behind it.
- Uses `tel:` and `sms:` links with the confirmed number (`sms:` only if they answer texts); if the phone is
  `null`, the bar shows only the quote action.
- Hide it while the on-page quote form is in view, while the keyboard is open, and while the mobile menu is
  open. Never stack it with a chat bubble (move the bubble up or drop it). Quiet motion only.

### A11. Forms

- Visible labels (never placeholder-only). Correct `type`, `autocomplete`, `inputmode`. Inputs ≥ 16px text (iOS zoom).
- Short default quote form: **3–5 visible fields** (name, phone or email with one required, service, optional
  details). Trade-specific fields (acreage, budget, timeline) only if intake chose them.
- **Multi-step qualifier** (Adair / Schumacher / Bath Fitter "start your design"): easy questions first, **contact
  last**, progress visible. See `page-build/conversion.md`.
- Inline validation on blur, error text tied with `aria-describedby`, error summary on submit, focus moves to the
  first error. Don't clear fields on error.
- Spam: honeypot + Cloudflare Turnstile. No CAPTCHA puzzles.
- Submit button shows loading, then a **thank-you page** that confirms what they sent, who will reply and by when.
- Delivery: Resend via a Cloudflare Pages Function (`functions/api/quote.ts`, key in env vars), or GoHighLevel
  (form embed or webhook), per intake. No API keys in client code.
- Query params and hidden fields can pre-fill service, tool inputs, page, and UTMs.
- Full form, tool, CTA, and banned-pattern rules: `skills/page-build/conversion.md`.

### A12. Navigation

- The header is a **designed object**, not default website-builder chrome. Pick a treatment in `brand.md` and
  vary it from the last two sites: frosted sticky bar, a contained pill/cluster for the links, an oversized
  wordmark, a brutal full-bleed bar, etc. Height 64–80px. Sticky or reveal-on-scroll-up, with the
  `[data-header-sticky]` frost/border transition from the motion system when it stays on screen.
- Logo left (links home), ≤ 6 primary items with **plain, obvious labels** (Homes, Process, Work, About,
  Contact — not cryptic words or icons-only). A primary CTA that is *crafted* (not every site uses the same
  filled 52px pill). **Call, quote, or contact is always visible**: phone at ≥ 1024px when we have a number;
  a quote/contact CTA in the header; the mobile action bar (A10) on small screens. A visitor should never
  hunt for how to start.
- **No experimental or mystery-meat navigation.** No hidden hover-only menus as the only path, no icon-only
  nav without a text label, no spatial/canvas navigation, no "find the link" games. Style must not get in
  the way of understanding.
- Dropdowns only when needed (e.g. Services); open on click and on hover-with-delay, work with the keyboard.
- Mobile: menu button with `aria-expanded`/`aria-controls`, full-height sheet, focus trapped, Esc and backdrop close it,
  body scroll locked, large tap rows (≥ 48px), CTA and phone at the bottom.
- Skip link "Skip to content" as the first focusable element.

### A13. Footer

- The footer continues the art direction (often an inverted or ink band). It is **not** four equal gray columns
  on every site. Options: typographic (large wordmark + compact NAP), a single hairline + small type, a
  three-group cluster, a short ticker of confirmed phrases above it. Vary from the last two sites.
- NAP (name, address or "Serving <area>", phone) identical to the schema and Google profile.
- Hours, service area, license/insured line (only confirmed values), socials, key page links, privacy link,
  © year (auto), "Website by Half Byte Digital" (this line may carry on-brand microcopy, D11).
- Repeat a compact CTA above or inside the footer (C3 often sits just above).

### A14. SEO and schema

- Unique `<title>` ≤ 60 chars ("Custom Homes in Chattanooga, TN | Brand"); meta description ≤ 155 chars; canonical;
  Open Graph + Twitter image 1200×630 per page or site default.
- `@astrojs/sitemap`, `robots.txt`, clean URLs (`/services/roof-repair/`), breadcrumbs on deep pages (+ BreadcrumbList).
- JSON-LD `LocalBusiness`, using the most specific subtype (e.g. `GeneralContractor`, `RoofingContractor`,
  `HVACBusiness`, `Plumber`, `Electrician`, `HousePainter`, otherwise `HomeAndConstructionBusiness` or `LocalBusiness`):
  name, url, logo, image, telephone, address or `areaServed`, `openingHoursSpecification`, `sameAs` socials.
  Fields that are `null` in `site.ts` are omitted, never guessed. No `aggregateRating` unless Jake asks and the
  reviews are shown on the site itself.
- `Service` schema on service pages; `FAQPage` only for real FAQs on the page.
- Existing site: map every old URL to a new one in `public/_redirects` (Cloudflare Pages format, 301).
- Area pages must have real, different content (projects there, specifics). No doorway pages with swapped town names.

### A15. Accessibility

Accessibility is a differentiator (with A9). A beautiful site that fails a keyboard or reduced-motion pass fails review.

- Landmarks: `header`, `nav`, `main`, `footer`; `lang="en"`; one `main`.
- Everything works with keyboard only, in a sensible order. Custom controls use native elements first
  (`<input type="range">`, `<button>`, `<details>`), ARIA only when needed.
- **Visible `:focus-visible`** on every interactive control, never removed or replaced with `outline: none`
  unless an equally visible custom ring is provided (`:focus-visible`, not `:focus` on mouse click).
- **`prefers-reduced-motion: reduce`** is required (A7): no load-in, no signature motion, no view transitions;
  final states immediately; no element left at `opacity: 0`.
- **No loader or overlay that hides content** while JS or images arrive. Content is in the HTML.
- Dynamic results announce with `aria-live="polite"` (debounced).
- Works at 200% zoom and 320px width without loss. No text baked into images.
- Video: captions; no audio autoplay.

### A16. Scrolling and controls

- **No visible scrollbars inside components.** Horizontal rails/galleries hide their scrollbar
  (`scrollbar-width: none; &::-webkit-scrollbar { display: none }`), use scroll-snap, and stay operable with
  buttons, keyboard and swipe. The page itself never scrolls sideways. (Don't hide the browser's main scrollbar.)
- **One selector per gallery.** A gallery or slider gets exactly one way to navigate: arrows, *or* thumbnails,
  *or* filter chips, *or* dots. Never two competing controls on the same gallery.
- No scroll-jacking. Smooth scrolling only for same-page anchors, off under reduced motion.

### A17. Honesty (hard rule)

- No invented facts, stats, years, counts, ratings, awards, licenses, team members, testimonials, prices,
  guarantees or service areas.
- Every claim on the site traces to `brief/sources.md` (URL or "Jake, date") or comes from `src/data/site.ts`
  where unconfirmed values are `null` and the component renders nothing (no "XX+", no lorem ipsum, no "Coming soon").
- Copy may describe the trade in general ("Steep lots need different equipment") but must not imply specifics
  about this business that aren't confirmed.
- Reviews are quoted verbatim with name/initials and source as given.

### A18. Agency craft (non-negotiable)

A Half Byte site has to look like a specialized studio designed it. "Clean, even, and correct" is not enough.

**Point of view.** In `brief/brand.md`, one sentence: what this site is *doing* formally (e.g. "editorial split
and quiet type fields, hairlines instead of cards, one manifesto you can quote"). If you can't say it, the site
will read as a stack of template sections.

**Layout carries the design, without showing off.** Strong photography (a hero may bleed; mid-page photos
should still feel large). Generous negative space. Oversized display against a **comfortable 16px+ body**
(labels 14px+, never smaller). The drama is the display size and the photos, plus one signature moment — not
off-center type or a broken grid. **Default to the shared centered container.** **Project and work indexes
are photo-forward and calm** (C15, or a featured-house card C16 / one-big-plus-two-small C17), not a grid of
identical cards (Legacy), and not a studio-style cursor-follow type list unless the plan justifies that variant.

**Composition.** Home uses at least **four** moves from `page-build/compositions.md`; every interior page uses at
least **two**. At least two of Home's moves differ from each of the two most recent sites. Breaking the
container (bleed, peek, overlap) is optional, not required. A typographic champion in each section;
everything else supports it. If a layout would make a homeowner wonder whether something is misaligned, it is.

**Negative space and rhythm.** Space is a material. Uneven: tight families, loose between groups, occasional
oversized air around a manifesto or a photo. Same padding + white/gray/white is a tell.

**Imagery.** Photos are cropped with intent (`object-position` per image). Allow layering, overlap, typographic
crop, a mask or offset frame (C13), overlay titles (C8), or a tilted stack (delight D9) — not the same rounded
16:9 rectangle in every section. One site, one photo idea, applied with judgment.

**Modern CSS (with fallbacks).** Use these when they help, not as a trophy list:
- `clamp()` fluid type (already required) and `text-wrap: balance` / `pretty`.
- `@container` queries for internals of cards, rails and features.
- `:has()` for card hover/focus-within and form invalid/success states.
- Scroll-driven animation **only for the one signature moment** (`animation-timeline: view()`, IO fallback).
- CSS **subgrid** when a row of cards must align titles across varied image heights.
- `color-mix()` for frosted header/scrim tints.
- Optional `view-transition-name` on project thumbnails ↔ modal/page, with a no-transition fallback.
Always provide a sensible `@supports` / no-JS fallback. No library required for any of the above.

**Micro-detail.** Hairline rules as structure (C14). Link underlines with offset and a hover/focus draw (D1).
Visible `:focus-visible`. Buttons with crafted padding, tracking and a press state — not a generic component.
If the only "detail" is a 52px filled pill and an 8px radius on every image, it isn't crafted.

**Art direction consistency.** Type, color, photo crop, hairlines, the motion plan and the memorable element should
feel like one hand. A single off-style section (default cards in the middle of an editorial page) fails this.

### A19. Delight (concentrated, not sprinkled)

Full library and recipes: `page-build/delight.md`.

Delight is **1–2 memorable moments for the whole site**, drawn from **this client's world** — a local clock, the
address set as type, shapes clipped from their architecture, a button set into a headline, text that changes
color as you scroll, a lot-to-finish scrubber built from *their* job. Not a pack of generic ticks on every page.

**Delight should feel like hospitality, not cleverness.** A warm owner greeting, a scrubber that helps someone
picture their build, a phone number set as type they can tap — those care. A trick that shows off the studio
does not.

- Home carries the site's one signature feature (the trade interaction, or the one scroll-driven CSS moment
  from the motion plan). An interior page may host the second moment if it belongs there (a work index hover,
  a designed 404). Do not invent a third.
- Quiet chrome (a well-made underline, a focus ring, a press state) is craft, not "delight to tally."
- Never add count-up rows, word-stagger on every heading, stickers, or marquees just to have a count of details.
- Don't invent facts to feed a moment. Reduced motion and no-JS leave the moment in a complete, usable state.

### A20. Anti-template checklist

Treat these as **template tells**. If **three or more** are true on a page, the build fails review, even when
tokens, contrast and Lighthouse pass. (A deliberate, written exception in `brief/plan.md` / `brand.md` can
justify a specific tell — never a page of them.)

**Anti-generic (current AI-site tells — reject unless the plan justifies each one by name):**

- An **eyebrow on every heading** (or most of them). Eyebrows are optional and rare: at most one or two on a
  page, only when they add meaning.
- **Identical card grids** (equal 2- or 3-up photo/title/date cards, repeated across Home, a services page, and
  Projects). Prefer a **photo-forward** work section (C15, C16, or C17) for work.
- **Every section fading up** on scroll (the old "motion baseline"). See A7.
- **Count-up stat rows** as a default proof band. Count-ups are optional, not mandatory.
- **Warm cream + serif display + terracotta** (or rust, clay, "editorial" Fraunces/Newsreader on beige). This
  palette/type pairing has become a generic AI look. Do not offer it as a default "premium local business"
  direction. If the client's *photos or kit* actually are cream and serif, the plan must say so and the rest
  of the design (layout, type scale, memorable element) must still be specific.

Other tells:

- Every section is eyebrow + H2 + paragraph + an equal card grid.
- Eyebrows appear on most or all sections.
- All photos live in the same rounded rectangle, same ratio, same inset, inside the container.
- The hero is a contained, boxed image plus a heading and two same-size buttons, all vertically centered in a padded box (Legacy).
- Award or association badges stacked on the hero, or a logo strip doing the work of proof (Teton).
- The only designed header objects are a phone pill or a portal link on a standard remodeler skeleton (Hammond).
- Section padding is even (all 96/64) and surfaces only alternate white / light gray.
- Equal 3-up icon or feature cards with drop shadows and identical heights.
- Every mid-page block has a different left edge, or type is wildly off-center without a planned, grid-snapped reason (alignment drift).
- H1 is only modestly larger than H2 (less than ~1.5× at 1440).
- Nav is default "logo | links | generic pill" with no designed material; footer is four equal columns on gray.
- Headings could be swapped to "Our Services / About Us / Get in Touch" without changing the layout's meaning.
- Sections could be reordered without loss because none has a compositional idea or a typographic champion.
- No hairlines, overlays, masks, or typographic numerals — only boxes and body copy.
- Motion is the same fade-up on every section, or there is no motion plan at all.
- Delight is a pile of generic ticks, or there is no memorable client-specific moment.

Run the **template smell test** in `design-foundation/grounded-references.md` (Legacy, Teton, Hammond) in
addition to this list. Two or more rejected-set tells, unexplained, fail the build.

### A21. Care and trust (non-negotiable)

Asked on every page, next to "would a design agency ship this?": **would the client's customer feel cared for?**

- **People.** When we have real photos of the owners, crew, or homeowners (with permission), use them. Faces
  build trust on a high-stakes purchase. Don't hide the people behind only architecture. Owner voice — a short
  letter, a signed note, a first-person line — belongs on About and can appear on Home when we have the words.
- **Plain language.** Write the way a good contractor talks to a family, not the way a studio talks to other
  designers. Short sentences, concrete words, no jargon unless it's explained. Headings name the outcome.
- **Obvious next steps.** Call, quote, and contact are easy to find on every page (A10, A12). The closing CTA
  says what happens next. Don't bury the phone or the form behind a clever interaction.
- **Legible to older eyes.** Body 16px+; nothing under 14px (A4). Strong contrast. No pale gray body text.
- **Clarity over performance.** If a composition, type lockup, or motion makes the page harder to understand,
  simplify it. Cutting edge never outruns caring.

### A22. Grounded target band (non-negotiable default)

The default look is the **approved grounded-agency band**, not award-site experimental work. Full library,
Jake's notes, opt-in directions, and the template smell test: `design-foundation/grounded-references.md`.

- **Bar to beat:** Buchanan, Eppright, Yardie, Maple Crest, Nature's Call.
- **Floor:** S2, Brydon, William David, Way Cool (structure, not noise), MLG — safe but sellable, still passing the smell test.
- **Opt-in only** (Jake or the plan must name them): Cormack as a premium / editorial direction; Thelen as a playful / retro direction. Neither is a default for a typical local-service client.
- **Rejected as template (anti-references):** Legacy, Teton, Hammond.
- Home, mid-page, usually reads: full-bleed hero → trust strip → featured work (C16 or C17 or a calm photo grid) → process, reviews, service area, FAQ → dark closing CTA. Owners on a job site when we have the photos.
- Award-set experimental patterns (hover takeovers, half-empty off-center splits, custom cursors, horizontal-scroll rails, loaders, scroll-jacking) are not defaults.

### A23. Conversion and measurement

Lead visitors to call, text, use a tool, or ask for a quote without pushing. Full rules (P1–P22), approved
examples, and Jake's decision rules: `page-build/conversion.md`. Measurement: `templates/measurement-plan.md`.

Hard rules Jake named:

- Every pre-contact tool **shows value and a price range before asking for contact details**. Contact comes last and is optional for seeing the result. Fewest fields. A gated quote feels like a paywall — don't build one (T3).
- Build a quote or estimator **only when the client can supply real pricing inputs**. Otherwise use a qualifying multi-step form (Adair / Schumacher). Never invent rates. A no-data tool is a labeled placeholder plus the list of facts Jake must get.
- One primary CTA per page (verb + outcome), proof next to the ask, a header phone and CTA, a sticky mobile call bar, a dark closing band, a thank-you page. City pages only with real local proof (Renewal).
- Every site ships the event list, Plausible (default), a monthly one-page client report, and a 90-day baseline — not an industry conversion number.

### A24. Copy voice (non-negotiable)

Write like the owners talking to a customer: short, concrete, plain. For a Southern trades company,
Southern-plain. Full rule and the banned-phrase list: `templates/copy-voice.md`. `review.mjs` flags
those phrases in visible copy.

- Never put internal kit or sourcing language on the public site ("what [Name] already lists,"
  "sourced," "confirmed," "placeholder," "listed on the current site").
- Never explain a missing fact to the visitor ("we don't publish a price," "we don't have a response
  time," "a cost range needs numbers from us before it can be shown"). Omit it, or say what actually
  happens ("Plans, then an estimate, then we build.").
- No self-labels ("honest cost guidance"), generic filler ("seamless," "elevate," "nestled,"
  "crafted with care"), stacked triads, or em-dash cadence in body copy.
- Do not talk about the website when you should be talking about the work.

### A25. No empty runway (sticky / scroll-driven sections)

A sticky, pinned, or scroll-driven section cannot leave an empty vertical runway. The first frame
of the section — including a lot-to-finish scrubber or a view-timeline photo — must show the content.
Do not put `opacity: 0`, `data-animate`, `data-reveal`, or a `view()` fade with `animation-fill-mode: both`
on a large stage, its photograph, or an ancestor, if that would hide the block until the visitor
scrolls through hundreds of pixels of blank page.

`review.mjs` flags any vertical gap with no visible content over **~240px at 1440** or **~160px at 390**.

### A26. Type for trades and builders

The default pairing for trades and builders is a **warm serif display with a sans UI**. Newsreader
(display and headings) plus Source Sans 3 (body, buttons, filters, dates, kickers) is the recommended
OFL pairing; files live in `templates/fonts/` with their license text. Another warm OFL serif is fine
when the brand kit names it, but do not default to a large grotesque or geometric sans for the H1.

- Display at 1440 is **56–72px**. Default H1: `clamp(2.5rem, 6vw, 4.5rem)`, weight 700, leading 1.1,
  tracking −0.02em, optical sizing on. Allow and prefer **two-line hero breaks**.
- **Never** a single giant one-line sans headline (the "tech / generic" look).
- Self-host woff2, `font-display: swap`, preload the display face, and keep the OFL (or other license)
  files in the repo.
- This is a type rule, not a palette rule. Do not take it as permission to default the colors to
  cream + terracotta (the anti-generic skin still needs justification).

### A27. Hero card padding

Text inside a light card or panel that sits on or over a photograph (`.hero-panel`, `.info-card`,
and equivalents) has **at least 32px padding on all sides at desktop**, and **24px under 800px**.
Never go under 24px. Do not leave `padding-inline: 0` or a one-sided zero that flush-mounts the
display type to the box edge. Keep the card's position on the photo; just pad the type inside it.
Type on a photo scrim with no light box is not this rule.

---

## B. Expression knobs (set per site in `brief/brand.md`)

Pick a value for every knob. **Variation guard:** a new site must differ from each of the two most recent sites
in `sites/*/brief/brand.md` on at least **4** knobs (font pairing and hero archetype must be two of them,
unless a client brand kit forces fonts), on at least **two** composition moves, and on its **memorable element** (not the same signature moment).

| Knob | Options (examples, not limits) |
|---|---|
| Font pairing | **Default for trades and builders:** warm serif display + sans UI (Newsreader + Source Sans 3, or equivalent OFL). Other options: condensed grotesk + neutral sans (rugged); geometric sans only (modern, not the trades default); slab + sans (workmanlike); rounded sans (friendly) |
| Heading case/weight | uppercase heavy / sentence-case light / sentence-case bold |
| Type contrast | default for trades and builders (display 56–72px at 1440, two-line breaks) / calm 1.25 / luxury-modern (up to 120px, named in the plan, still not a one-line sans) |
| Base | light / dark / mixed (dark hero + light body) |
| Accent | one hue from brand or direction; plus optional support color |
| Corner radius | 0 (sharp) / 4–8 (crisp) / 12–20 (soft) / pill buttons only |
| Density | airy (loose sections, big media) / balanced / compact (service-heavy, info-dense) |
| Photo treatment | full-bleed natural / warm grade / duotone / framed with offset border / masked shapes / B&W with accent overlay |
| Texture | none / subtle grain / topo or blueprint lines / paper / diagonal hatch (always ≤ 6% opacity, no contrast loss) |
| Section styles | dividers vs. alternating surfaces vs. color blocks; numbered sections; oversized eyebrows |
| Motion plan | one hero load-in, one CSS scroll-driven signature, hover; optional view transitions; everything else still |
| Iconography | none / line icons 1.5px / solid / custom trade glyphs |
| Layout archetypes | which hero, services, proof, gallery and CTA archetypes (see `page-build/archetypes.md`) |
| Direction | **grounded (default)** / premium-editorial (Cormack, opt-in) / playful-retro (Thelen, opt-in) |
| Composition moves | which C1–C21 moves from `page-build/compositions.md` (Home ≥ 4, interiors ≥ 2) |
| Signature interaction | one per site, tied to the trade (see `page-build/signature-interactions.md`) |
| Delight | 1–2 client-specific moments from `page-build/delight.md` (not a per-page tally) |
| Voice | plain-spoken / warm and personal / polished and premium / technical and exact |

---

## C. Token contract

Every site defines all of these in `src/styles/tokens.css` (start from `templates/tokens.css`). Components only read
tokens. Adding site-specific tokens is fine; removing or renaming these is not.

```
/* Color */
--color-bg  --color-surface  --color-surface-2  --color-text  --color-muted  --color-line
--color-primary  --color-primary-strong  --color-on-primary  --color-primary-tint
--color-accent-2 (optional support)  --color-focus
--color-success  --color-warning  --color-danger
--scrim (gradient for text over photos)

/* Type */
--font-display  --font-body  --font-mono (optional)
--weight-body  --weight-bold  --weight-display
--step--1 --step-0 --step-1 --step-2 --step-3 --step-4 --step-5 --step-display
--leading-tight  --leading-snug  --leading-body
--tracking-eyebrow  --tracking-display
--measure (65ch)

/* Space and layout */
--space-3xs(4) --space-2xs(8) --space-xs(12) --space-s(16) --space-m(24) --space-l(32)
--space-xl(40) --space-2xl(48) --space-3xl(64) --space-4xl(80) --space-5xl(96) --space-6xl(128) --space-7xl(160)
--container(1240px) --container-narrow(720px) --container-wide(1440px) --gutter
--section-pad --section-pad-tight --section-pad-loose
--header-h  --actionbar-h

/* Shape and depth */
--radius-s  --radius-m  --radius-l  --radius-pill  --border-w
--shadow-1  --shadow-2

/* Controls */
--btn-h(52px)  --btn-pad-x(32px)  --input-h(48px)

/* Motion */
--dur-fast --dur-base --dur-slow --dur-reveal --dur-hero --dur-count
--ease-out --ease-in-out --ease-reveal
--reveal-y --reveal-scale --stagger --parallax-max
```

---

## D. Defaults learned on 316 Land Clearing (starting points, not mandates)

Use these unless the art direction gives a reason to change them, and write the reason in `brand.md`.

- **Container 1240**, gutters 16/24/48, section padding **96 / 64**, CTA strip 64. Display type **56–72px** at 1440 by default for trades and builders.
- **Eyebrow component** (`<Eyebrow>`): small uppercase label in the accent, letter-spaced, sits 12–16px above
  the heading. **Optional and rare** — at most one or two on a page, never on every section (A20). It is a `<p>`, not a heading.
- **`.photo` treatment**: one shared wrapper for all content photos (same radius, aspect ratio per role,
  `object-fit: cover`, optional grade/overlay from the photo knob) so photos look like one set.
- **`.cta-strip` (+ `.is-card`)**: reusable call-to-action band; the card variant sits inside the container with a
  surface fill. Don't stack more than one CTA strip in a row, and keep at least one content section between
  CTA strips and the closing CTA.
- **52px buttons**, 32px horizontal padding, transition 150ms.
- **Motion plan** (`templates/styles/motion.css` + `templates/scripts/motion.ts` as utilities): one hero
  load-in, one scroll-driven signature in CSS, quick hover. Do not apply reveals to every section. Visible
  without JS; off for reduced motion; no loader that hides content.
- **`<ReviewCards>` + `<GoogleBadge>`**: real reviews only, verbatim, with a link to the Google profile. The badge
  shows rating/count only from `site.ts`; null → badge shows "Read our reviews on Google" without numbers.
- **Null config pattern**: facts live in `src/data/site.ts`; `null` hides the element (see `templates/site.ts`).
  Same for estimator math (`src/data/estimator.ts` with null values → output hidden, CTA shown instead).
  An estimator ships only when the client supplied real rates; otherwise a multi-step qualifier. Value and a
  price range are visible before any contact field (conversion.md).
- Signature interaction lessons (slope dial): the default HTML state is the final state; animate only when the
  element itself is ≥ 60% visible; never show a number past the real claim, even during overshoot; let the user
  drive it; on touch, only the control area captures the gesture so vertical swipes still scroll the page;
  messages change by range, not every step, with `aria-live="polite"`.
- Estimator placement lesson: put tools after the proof that makes people want them (Services → Recent work →
  Estimator → Reviews), within the top half of the page on mobile.
