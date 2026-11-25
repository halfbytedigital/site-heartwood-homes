# Brand — Heartwood Homes

## Path

**Path B, partial.** The only brand asset is the black logo. Jake chose a refresh (2026-11-24): keep the logo, new type and color. Direction **Heartwood**, then narrowed the same day.

The old site's steel blue (`#5990CF`) and Raleway are not the brand. White text on that blue is 3.33:1, and Jake said the blue can go.

## What Jake set

- Custom homes lead every page. The hero is a custom home, not the land.
- Landwork is supporting. One homepage section, headline **"We start with the land, too"**, plus a **Site Prep & Landwork** page. It is not a headline and not the hero.
- Signature piece: a lot-to-finish build scrubber, framed as one home's story. Chapters: cleared lot, foundation, frame, finished home. The land work is chapter one.

## Logo

Sampled from `brief/assets/logo-brand-black.png` (1176×933 PNG). Opaque pixels average **#000000**. A second file, `logo-wordmark-black.png`, is the wordmark only.

No guidelines PDF. Rules we will follow:

- Do not recolor it. Black on `--color-bg` and `--color-surface` only.
- There is no white or reversed version. Do not place it on forest, on photos, or on the scrim.
- Header lockup at least 32px tall on mobile. Clear space around the mark at least the height of the "EST." line.
- The mark already says "EST. 2017" and "CHATTANOOGA, TN". Don't repeat those as a second lockup next to it.

## Point of view

Heartwood builds the house a family will live in, and they stay through the last piece of trim. The site should feel like that morning on the job: cool mist, a dark tree line, and the house itself doing the talking. Custom homes lead. The land is the first chapter, not the headline.

## Expression knobs

| Knob | Value | Why |
|---|---|---|
| Font pairing | Bricolage Grotesque + Source Sans 3 | Chosen for these houses. A constructed grotesque at huge sizes, a plain sans for the family reading it. Not Fraunces, not a cream editorial preset. |
| Heading case / weight | Sentence case, weight 600 | The size carries it. |
| Type contrast | Luxury-modern, named | Display is about 97px at 1440px and caps at 120px. Body stays 16–18px. |
| Base | Light | Black logo needs a light header. The ground is stone mist `#E7EBE7`. |
| Accent | Canopy `#2F341E` | Sampled from the A-frame lawn in shade (Caleb Jones). White labels pass at 12.88:1. |
| Support | Cedar `#5E3B2E` | A-frame timber (Caleb Jones). Hairlines only. Buttons stay canopy. |
| Corner radius | 0 | Board ends. Not a card, not a pill. |
| Density | Airy | Full-bleed photos and room around the scrubber. |
| Photo treatment | As shot | No warm grade. Credits stay on the photo. |
| Texture | None | The photographs are the texture. |
| Section styles | Mist, then a full-bleed photo or a type field | Not a stack of identical tinted bands. |
| Motion | Crisp, one signature | See the motion plan. |
| Iconography | None | The photos and the scrubber do the work. |
| Hero | Split bleed, full viewport | Words on the mist, the finished Ten Mile house flush to the right edge. |
| Signature | Build scrubber, full width, just under the hero | Cleared lot, foundation, frame, finished home. Only the finished chapter has a photo of that house. |
| Voice | First person, plain | “We build the house.” Daniel and Laura’s own words where we have them. |

## Composition moves

Home: full-bleed A-frame photograph with the headline in the shared container, trust strip, featured house card, full-width scrubber, calm photo index, and a dark close. “We start with the land, too” stays one section inside the container.

Interior pages use at least two moves, and something on every page runs past the container: a bleed photo, an edge-to-edge rule, or the index image.

## Motion plan

Written before the animation. Motion should reassure a family, not perform for them.

- **Hero load-in.** The home hero (`[data-hero]`) fades and rises its own children once, on arrival. About 600ms, ease-out. Not on scroll, and not on every page.
- **One scroll-driven piece.** The Ten Mile photograph in the scrubber uses `animation-timeline: view()`, with an IntersectionObserver fallback. It reveals once as it enters. The range control is the interaction.
- **Hovers.** Links underline in about 160ms. The project index swaps its photograph. The hero photo does not scale.
- **Page changes stay still.** No site-wide view-transition fade.
- **Reduced motion.** Final states immediately. No leftover `opacity: 0`. The scrubber still changes chapters. Focus rings stay visible.
- **Not used.** No word-stagger, no count-up, no loader, no fade on every section.

## Variation guard

No other `sites/*/brief/brand.md` in this repo. This pairing (Bricolage Grotesque + Source Sans 3) and this hero (split bleed of the Ten Mile house) belong to Heartwood and must not be copied onto the next client.

## Type

Self-host at build, Latin subset, `font-display: swap`. Three files, under the four-file cap:

- Bricolage Grotesque 600 (preload this one)
- Source Sans 3 400
- Source Sans 3 600

Packages: `@fontsource/bricolage-grotesque`, `@fontsource/source-sans-3`. The old site's DIN Next is a Wix-hosted commercial face. We are not using it.

Display: `clamp(3.25rem, 1.2rem + 5.4vw, 7.5rem)`. At 1440px that is about 97px. Leading 0.96. Tracking −0.03em. Body `clamp(1rem, 0.96rem + 0.15vw, 1.125rem)`. Meta 14–15px. Inputs at least 16px.

## Color, and where each came from

Sampled from Heartwood’s photos. See `brief/material-board.md`.

| Token | Hex | Source |
|---|---|---|
| `--color-bg` | `#E7EBE7` | Ten Mile sky `#C3CACF` (Travis Jacobs), lifted so type and the black logo pass |
| `--color-text` | `#1A1E18` | A-frame canopy `#2F341E` (Caleb Jones), pushed darker |
| `--color-primary` | `#2F341E` | A-frame canopy in shade, Caleb Jones |
| `--color-primary-strong` | `#242A18` | Same canopy, darker, for hover |
| `--color-on-primary` | `#FFFFFF` | Passes on primary (12.88:1) and strong (14.80:1) |
| `--color-primary-tint` | `#E4E8DD` | A cool wash of the mist |
| `--color-surface` | `#DEE3DC` | Mist, a step darker |
| `--color-surface-2` | `#D5DBD4` | Darkest light surface. Muted text still clears 4.5:1 |
| `--color-muted` | `#545C4E` | A step off the canopy. 4.94:1 on surface-2 |
| `--color-line` | `#B7BEB4` | Divider, 1.58:1 on bg |
| `--color-line-strong` | `#6A7264` | Input borders, 3.55:1 on surface-2 |
| `--color-accent-2` | `#5E3B2E` | A-frame cedar, Caleb Jones. Hairline only |
| `--color-focus` | `#242A18` | Same as strong |
| `--color-success` | `#1E6B3A` | Status |
| `--color-warning` | `#8A4B12` | Status |
| `--color-danger` | `#8C2F2A` | Status |

Logo black `#000000` on `#E7EBE7` is 17.44:1. Spring City canopy `#324216` (Wes Holland) was the runner-up for the button and was not used. Ten Mile metal `#6C6A60` (Travis Jacobs) and porch timber `#9C7C5A` were sampled and left off the page.

## Contrast

Recomputed 2026-11-24 with the WCAG relative-luminance formula, after the material board. Body and links need 4.5:1. UI and large text need 3:1.

| Foreground | Background | Ratio | Use | Pass |
|---|---|---|---|---|
| `#1A1E18` text | `#E7EBE7` bg | 14.03 | Body | AA |
| `#1A1E18` | `#DEE3DC` surface | 12.98 | Body on surface | AA |
| `#1A1E18` | `#D5DBD4` surface-2 | 12.00 | Body on surface-2 | AA |
| `#1A1E18` | `#E4E8DD` tint | 13.59 | Body on tint | AA |
| `#545C4E` muted | `#E7EBE7` | 5.78 | Meta | AA |
| `#545C4E` | `#DEE3DC` | 5.34 | Meta on surface | AA |
| `#545C4E` | `#D5DBD4` | 4.94 | Meta on surface-2 | AA |
| `#2F341E` primary | `#E7EBE7` | 10.69 | Links | AA |
| `#FFFFFF` | `#2F341E` | 12.88 | Button label | AA |
| `#FFFFFF` | `#242A18` strong | 14.80 | Button hover | AA |
| `#242A18` focus | `#E7EBE7` | 12.28 | Focus ring | AA (3:1) |
| `#6A7264` line-strong | `#E7EBE7` | 4.15 | Input border | AA (3:1) |
| `#6A7264` | `#DEE3DC` | 3.84 | Input on surface | AA (3:1) |
| `#6A7264` | `#D5DBD4` | 3.55 | Input on surface-2 | AA (3:1) |
| `#B7BEB4` line | `#E7EBE7` | 1.58 | Dividers only | n/a |
| `#1E6B3A` | `#E7EBE7` | 5.42 | Success text | AA |
| `#8A4B12` | `#E7EBE7` | 5.63 | Warning text | AA |
| `#8C2F2A` | `#E7EBE7` | 6.82 | Danger text | AA |
| `#000000` logo | `#E7EBE7` | 17.44 | Header logo | AA |

## Flags

- No white logo. The header stays on the mist, even when a photo runs behind the hero.
- Jake said the current-site photos may be used, including photographer credits. Keep the credit the old page already prints.
- Google may show 5.0 from 19 reviews, as a link only. No quoted review text until Jake pastes it. No `aggregateRating`.
- No license number and no street address. Hours stay hidden.
- The old Call Now button dials 123-456-7890. We will not copy that.
- Cedar `#5E3B2E` is a hairline, not a button.
