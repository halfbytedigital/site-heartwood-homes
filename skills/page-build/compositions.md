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
show **large thumbnails** (full-width or two-up, not a 72px chip). Keyboard and touch work without hover;
reduced motion shows the selected photo immediately.

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

A short band directly under the hero: Google rating and review count (linked to the real profile when we have
it), years, licence or warranty, associations — only confirmed facts. Quiet type, no badge soup (Teton).
This is the default proof after the hero (P1).

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
