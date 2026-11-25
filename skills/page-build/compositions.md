# Composition and recipe library

These are **craft moves**, not a look. Tokens, typefaces, color and the motion plan still change per site.
A new site must use at least **four** moves on Home (and at least **two** on every interior page), and must differ
from each of the two most recent sites on at least **two** of the moves used (plus the existing knob / hero-archetype
variation guard). Record the chosen moves in `brief/plan.md` and `brief/brand.md`.

Pick from this list, or invent a new move and add it here. Do not implement a section as "eyebrow + heading +
paragraph + equal card grid" just because that is easy.

## Moves

### C1 Split bleed
One side is type (aligned to the container). The other is media that **bleeds to the viewport edge** — no rounded
card, no inner padding that shrinks the photo. Desktop min-height ~100vh. Mobile: type first, then the photo
full-bleed underneath. Type and image may use different vertical alignments (center vs. bottom, or top vs. fill).
Motion: type and media can enter from different directions.

### C2 Type field
A short headline in `--step-display` or `--step-5` sits in a large quiet field (cream, ink, or a color block) with
little or no competing UI. Optional small supporting image or a single hairline. This is the antithesis of a
card grid. Good for inner-page heroes and one manifesto moment on Home. At most one heading on the page may also
use word-stagger (`data-animate-words`).

### C3 Broken grid / overlap
At least one element escapes the regular columns: a photo overlaps the following section (or a tinted band), a
caption or index hangs into the gutter, a 7/5 split has the media extending past the container, or a rule runs
edge-to-edge while the type does not. Use negative margins or a full-bleed wrapper; clip `overflow-x` on `body`
so nothing causes horizontal scroll. Overlaps must still make sense at 390.

### C4 Peek rail
A horizontal snap rail whose **next item is clipped by the viewport**, so the layout obviously continues. Arrows
only (no second control). Photo-led cards; captions under or over the image. Not a wrapped 3-up grid that just
happens to scroll on mobile.

### C5 Ruled board
A 2×2 or list structured with **hairline rules** (`--color-line`), not card chrome (no shadow, no rounded box
around each cell). Generous cell padding. Often sits on a tinted `--color-surface` band. Numerals or titles can
be the graphic.

### C6 Band shift
A full-bleed material change: inverted ink band, a wide tint, or a large photo field. Text may stay in the
container. Use this to reset rhythm (e.g. a dark closing CTA before a dark footer, or a mid-page photo band).
Don't only "alternate white and light gray."

### C7 Index typography
Large lining numerals (`01`, `02`, or a single proof number) set in the display face at `--step-4` or larger, as
a graphic device. Labels stay small and muted. These may be larger than the nearby H2, but they are not a second
page H1. Confirm every number (null-config). Count-up is allowed when the number is confirmed.

### C8 Overlay title
Type (title, year, index) sits on the photograph with a scrim that passes contrast on the actual crop. Not every
image should also have a caption box below — pick one relationship and commit.

### C9 Asymmetric feature
A 7/5, 8/4 or 5/7 split with **uneven vertical alignment** (image top-aligned, type bottom-aligned, or a short
column of type against a tall photo). Equal 6/6, both columns vertically centered, is the template default — use
it rarely.

### C10 Sticky intertitle
On desktop, a short type column (`position: sticky`) holds while a stack of photos or steps scrolls beside it.
Never scroll-jack the page. Collapse to a normal stack at 768.

### C11 Magazine spread
A large photo and a pull-quote or short paragraph share a spread; the quote may overlap the photo's edge or sit
in a narrow column with a hairline. Used once, for a story or a standout review (verbatim, sourced).

### C12 Chip + feature
A single row of chips (one selector) swaps a featured service or project: large photo, short copy, a few specific
bullets, optional "related work" thumbnails. Changing a chip should feel immediate.

### C13 Inset / mask
A photo is clipped by a deliberate shape, an offset frame, or a typographic crop (image sits behind a chopped
headline). One consistent idea per site, not a different mask on every image.

### C14 Hairline architecture
Hairlines, not boxes, do the structuring work of a section or a whole page (rules under the header, between
cells, above a footer, beside a quote). Line color from tokens; thickness 1px unless the brand kit says otherwise.

### C15 Project index (photo-forward, calm)

The default for a work or project index on **local-service sites**. Homeowners buy with their eyes: lead with
photographs, keep the interaction calm, and stay on the shared container grid.

**Default (use this unless the plan says otherwise):** a photo-led index, or a split list with a **sticky
large image that crossfades** (240–400ms, opacity only, no layout shift). One image panel, shared by the
rows — do not mount a full-viewport photo on every row and snap `opacity` from 0 to 1. Type (name, place or
year, optional numeral) stays readable at 14px+ and lines up with the site's container left edge. On mobile,
show **large thumbnails** (full-width or two-up, not a 72px chip). Titles and the first row must
**clear the sticky header and the sticky call bar** (scroll-margin or padding). Fail if a house name
tucks under the bar. Keyboard and touch work without hover; reduced motion shows the selected photo immediately.
Each card may include the save-this-house heart (C28d).

**Filters (default when the index has 8 or more projects):** job-type pill chips at the top of the
list, with counts and an All option — composition **C29**. A project may belong to more than one
type. No empty categories. Keep the plan's intended first project first under All.

**Not the default:** a type-first list whose photo is a studio-style cursor-follow or a sudden full-bleed
takeover. That variant is allowed only when `brief/plan.md` justifies it for a more editorial audience. It is
the wrong default for families hiring a local contractor.

Still not a grid of identical photo/title/date cards (W3).

### C16 Featured project + info card (Eppright)

The default **feature-house** treatment, especially for custom-home builders. One large project photograph
(inside the container or a restrained bleed), with a small "Latest project" / "Featured home" info card on
or beside it: name, town, a short line, a link. Lead with the most striking photo (material board). This is
the bar Jake named for luxury-modern builders.

### C17 One big plus two small (Nature's Call)

A project or work band: one large photo plus two smaller ones, each with a name and town caption. A strong
Home alternative to C16 when we have three good photos. Keep the crop generous; don't shrink them into a
Legacy-style identical tile grid.

### C18 Trust strip

A short band directly under the hero: Google rating and review count (linked to the **real Google
Business Profile** when we have the URL), years, licence or warranty, associations — only confirmed facts.
If we do not have a profile URL, show the rating as plain text — **do not link to a Google search**.
Quiet type, no badge soup (Teton). This is the default proof after the hero (P1).

### C19 Dark closing CTA band

Every page ends on a dark inverted band (headline, one line of what happens next, the primary CTA, and the
phone). This is the default C3. Don't also stack a second CTA strip immediately above it.

### C20 Owners on a job site

When we have the photos, show the owners (and crew) on a real job, with a short story in their voice. S2 and
Nature's Call are the references. Don't substitute a stock portrait or a logo. If we don't have photos, omit
the section and list them as a fact Jake may still get — don't invent people or pictures.

### C21 Heading left, intro right (S2)

A section header row: the heading in the left columns, a short intro in the right, snapped to the shared
container. A restrained, grid-snapped asymmetry that still feels centered and orderly. Use it on interiors
and mid-page bands; don't drift the left edge off the container.

## How to write a section from a move

1. Pick the move (or two, if they combine cleanly, e.g. C4 + C8).
2. Set the surface (bg, surface, inverted, image).
3. Place one typographic champion (a display line, a photo, or a numeral) and let everything else support it.
4. Most sections stay in the shared container. If you use a restrained break (a bleed photo, a peek, an
   offset image), snap it to the grid and record it in the plan. Do not invent a break just to have one.
5. Leave the section still unless it *is* the site's one hero load-in or one scroll-driven signature. Quick
   hover is always fine. Do not fade-up every block.
6. Check 390: the idea should still read, even if the bleed/overlap simplifies.

## Anti-combinations

- Don't put two equal card grids next to each other, even with different surfaces. Don't use a card grid
  for the project index when C15, C16, or C17 would do.
- Don't use C7 on every section (numeral fatigue).
- Don't overlay type on every image (C8 is a choice, not a default).
- Don't invert every CTA (C6 works because it is rare).

### C22 Build-story scroll (lot → foundation → frame → finish)

Use only when the harvested photos (or video) actually show construction phases. A vertical story, in order:
cleared lot or site, foundation, frame, finishes, the lived-in house. Short captions in plain language. This
can also fill a Home lot-to-finish scrubber — but only with photos of *that same house*. Never paste one
project's foundation onto another project's finished shot. Missing chapters stay honest (words, no stock).

Do not put an enter/reveal animation (`data-animate`, `data-reveal`, `hb-fade`, a `view()` fade with
`fill: both`, or a parent at `opacity: 0`) on the scrubber section, its stage, or its first
photograph. The first chapter must be visible as soon as the section enters the viewport. A sticky
or scroll-driven scrubber cannot leave an empty runway (A25).

### C23 Room-by-room walkthrough

Use when there are distinct interior rooms (kitchen, living, bath, bedroom, porch). The default highlight
is the **Walk through rail (C28b)** — tappable section dots, current one lit, `scroll-margin-top` on the
sections themselves (not on the nav links). Infer rooms from the photo when filenames or captions already
name them (e.g. `jp-11-kitchen.webp`); otherwise use plain, obvious labels ("Kitchen", "Primary bath") only
when the picture is unambiguous. Don't invent room names.

### C24 Editorial photo spreads

The **default** treatment for a builder project page with a real gallery. Varied layouts — a full-bleed hero,
a two-up, a vertical next to a square, a wide aerial — with optional material or credit notes pulled from the
source ("Photo by Travis Jacobs", "hardwood and finish carpentry in house"). Not an identical tile grid
(Legacy). Not a typographic list with one tiny thumb.

### C25 Before/after or day/dusk drag slider

Use only when we have a **matched pair of the same vantage**: the same view before and after, or the same
elevation in daylight and at dusk/blue hour. It must be a **real drag reveal** (a continuous range input,
not `step="1"` and not a snap toggle). Do not force a slider from unrelated photos, and do not caption two
different angles as "the same front." Unmatched frames stay editorial (C24). If the story is a renovation or
a dusk exterior but we only have the after (or only the day), say so and use C24 until Jake can get the missing frame.

### C26 Detail hotspots on a hero photo

Use only when we have close detail shots *and* something true to say (a named material, a piece the crew
built, a credit). Pins or quiet marks on a wide photo that reveal the detail. Needs labels from the client
or from unambiguous captions. Without those, skip it — don't invent "premium fixtures" callouts.

### C27 Next-house handoff

Every project page ends with the **C28e next-house card** (a big photo of the next project, its name, a
one-line teaser, and a small Previous link) before the dark closing band. Gentle zoom on hover; tap or swipe
on mobile; View Transitions API with a short opacity fallback. No door animation. Teaser copy must be sourced
or plainly descriptive of the photo — do not invent a story.

### Fullscreen view (utility only)

A fullscreen / lightbox is **not** the project page and **not** the feature. It is a utility on top of
C22–C28: Close at the top right, Previous and Next on the sides, swipe on a touch device, arrow keys, Esc
to close, focus trapped, reduced motion shows the photo with no flourish. Never put a "View larger" badge
on every photograph — the photo itself is the control (C28c). Never ship a project page that is only a
hero plus "click to open gallery."

### C28 Project-page shell (default on every project page)

Ship this shell on **every** project page, across sites — not as a per-project option. Content inside the
shell still follows C22–C26 according to what the photos can support. Templates live in
`templates/components/` (`ProjectHero`, `WalkRail`, `ProjectShot`, `SaveHouse`, `NextHouse`, `PhotoViewer`)
with `templates/styles/project-page.css` and `templates/scripts/project-page.ts`.

**(a) Photo-first opening.** The first viewport at 1440 and at 390 is the project's most striking photograph,
full-bleed, with the title over it or just under it. A gentle settle-in plays once: a slight scale ease on
the photo plus the title fading up, 600–900ms. The long description moves *below* the hero, as a short lede
— never a wall of boilerplate above the first picture. Reduced motion: no animation, photo and title visible
immediately. This *is* the page's hero load-in; don't add a second one.

**(b) Walk through rail.** A thin rail fills as you scroll, with tappable dots per section (exterior, living,
kitchen, outdoor — only sections that exist). The current section is lit via IntersectionObserver. Put
`scroll-margin-top` on the **sections**, not on the nav links. On mobile the rail is a slim top or bottom bar
that never collides with the sticky call bar.

**(c) Reactive photos.** On hover, a slight lift, brighten, and soft shadow (150–250ms). On touch, brief
pressed feedback. No "View larger" badge on every photo. Tapping a photo opens the cleaned-up fullscreen
utility (above).

**(d) Save-this-house heart.** A heart on each project page and on index cards. Saves persist in
`localStorage` with no account. A small saved count appears in the header or near the CTA. The Start-your-home
CTA reads e.g. "Start your home (2 saved)" when the visitor has saves. The qualifier form receives the saved
house names as a hidden or visible "Houses you liked" field. Fire `save_house` (slug, name, saved true/false,
count). Accessible: `aria-pressed`. Honest: no fake counts — only houses this visitor saved.

**(e) Next-house card.** See C27. One calm card at the bottom, then the dark closing band.

### C29 Job-type filters (portfolio index, 8+ projects)

The default on a work or project index with **8 or more** projects. Pill chips at the top of the
list: **All** plus one chip per job type the data actually supports (no empty categories). Show a
count on each chip. A project may belong to more than one type. The shareable URL is `?type=slug`
(All clears the param). Keyboard and `aria-pressed` on every chip. The reflow is a calm crossfade
plus FLIP so cards keep their place; `prefers-reduced-motion` is instant. On mobile the chip row
scrolls horizontally and stays clear of the sticky header and the sticky call bar.

Derive types from the harvest and the plan — for a custom-home builder that often means New builds,
Lake & cabin homes, Short-term rentals, Renovations, Townhomes & investment, trimmed to what the
set actually contains. Templates: `templates/styles/project-filters.css`,
`templates/scripts/project-filters.ts`.

### C30 Primary service page

The default for the client's **primary offering** (Custom Homes, the main trade, the page a
homeowner hires from). It should feel as considered as Home and the project pages, not like a
leftover service template.

Ship, in this spirit:

1. A photo-first hero from the harvest (first viewport is a photograph, title over or just under it).
2. How this service works with this company — a compact, page-specific widget (a picker, a short
   three-beat row), **not** a paste of the Home scrubber or the full Process timeline (see
   "One widget, one page" below).
3. What is included, and what the crew self-performs, only when those trades are sourced. A photo
   grid beats a text list when we have the pictures.
4. Featured examples pulled from real project pages (save hearts are welcome).
5. Cost guidance only with numbers the client gave. If there is no range, say what happens next
   ("Plans, then an estimate") and do not narrate the absence of a price (A24).
6. A short FAQ or objections block, in the owner's voice.
7. Trust beside the ask, then the same qualifier as the rest of the site.
8. One or two delight touches that already belong to the site (C28-consistent), not a new gimmick.

### One widget, one page

A distinctive interactive widget — a lot-to-finish scrubber, a full process timeline, a
design-build picker, a long sticky pin — lives on **one** page. Other pages may link to it or use
a compact teaser (a three-step row, not the same component). Never ship the same widget on Custom
Homes and Our Process, or paste the Home scrubber onto a service page.

