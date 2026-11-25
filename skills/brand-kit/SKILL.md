---
name: brand-kit
description: 'Turn the client''s brand kit (logo files, colors, fonts, guidelines PDF) into the site''s tokens faithfully, derive only what''s missing with contrast checks, and never override the brand. If there''s no kit, generate one from the art direction Jake picked. Runs after intake answers, before site-plan.'
---

# Brand kit

Output: `sites/<slug>/brief/material-board.md` (written **first**, before tokens or markup),
`sites/<slug>/brief/brand.md` (decisions + knob settings + contrast table) and
`sites/<slug>/src/styles/tokens.css` (all tokens from the contract in design-foundation, Section C).

## Material board (before any code)

Do this before writing `tokens.css` or a single component. If you skip it, the site will default to a generic
palette and type pairing.

Write `brief/material-board.md` with three things, and show Jake a short version in chat:

1. **Color, sampled from the client's world.** Pull 6–8 colors from *their* photos (and from a provided kit, if
   any) — not from a "warm editorial" preset. Name where each swatch came from ("metal roof, Ten Mile Lake House
   (Travis Jacobs)", "stone chimney", "summer canopy"). Build bg / text / accent from those samples. **Do not
   default to warm cream + terracotta + a serif display** — that pairing is an AI-generic tell (A20) unless
   the photos or kit actually are that.
2. **Fonts chosen for the subject.** Pick a display + body that fit *this* trade and these pictures (a mountain
   custom-home builder is not automatically Fraunces; a metal shop is not automatically a grotsesk). Self-hostable.
   Show why the pairing belongs to this client.
3. **Hero and featured photography.** Rank the client's photos by how striking and distinctive they are,
   not by the order they were found. Lead the hero and the featured project with the most memorable image
   (for a custom-home builder, that may be the coolest house, not the newest or the first file in the folder).
   Write the choice and the reason on the board.
4. **The one memorable element.** One sentence: the moment the site will be remembered for (a lot-to-finish
   scrubber of *their* job, the address as type, a clip-path from their roofline, a heading that changes color
   over a photo of their work). This is the delight/motion-plan signature, not a list of five widgets.

Only after the board exists do you map Path A/B/C into tokens.

Decide the path first:

- **Path A — full kit provided** (guidelines and/or explicit colors + fonts).
- **Path B — partial** (logo only, or colors without fonts, or an existing site with a consistent look).
- **Path C — nothing**: generate from the chosen art direction.

## Path A — Map a provided kit

1. **Collect the files** into `brief/assets/brand/`: logos (all versions), guidelines PDF, font files or names.
2. **Read the guidelines.** For PDFs use `pdftotext -layout` and `pdfimages`/`pdftoppm` to see the pages. Write down
   exactly what they say about:
   - primary/secondary colors (HEX; convert from RGB/CMYK/Pantone only if no HEX is given, and say it's a conversion),
   - fonts (names, weights, which for headings/body), fallbacks,
   - logo versions, clear space, minimum size, backgrounds it may sit on, don'ts,
   - tone of voice, photography style, iconography, patterns.
3. **Map to tokens**, brand values first:
   - Brand primary → `--color-primary` (exact hex). Secondary → `--color-accent-2` or a surface, per the guidelines'
     own usage rules.
   - Brand neutrals → `--color-text`, `--color-bg`, `--color-surface`.
   - Brand fonts → `--font-display` / `--font-body`. If the font is licensed (Adobe, commercial), ask Jake whether
     we have a web license; until then use the closest free match and flag it in `brand.md`.
4. **Derive only the missing pieces** (Section "Deriving" below).
5. **Contrast check every text/background pair** you plan to use (Section "Contrast"). If a brand pairing fails
   (e.g. white text on a light brand orange):
   - do **not** change the brand color;
   - keep the brand color for large text, shapes, icons and accents where it passes 3:1;
   - use a derived `--color-primary-strong` (same hue, darker) for button fills/small text, or dark text on the brand color;
   - **STOP and tell Jake** in one short note with the options and your pick.
6. Respect logo rules: correct version per background, clear space, minimum size in header (≥ 32px tall mobile).

Never "improve" a brand: no recoloring the logo, no swapping the brand font for a trendier one, no new primary color.

## Path B — Partial kit

1. Logo: extract its palette (vector fills if SVG; otherwise sample dominant colors with a quantize step, e.g.
   Python Pillow `quantize(6)`). Record hexes and where they come from.
2. Existing site: use colors/fonts from the crawl (`sources.md`) as the brand unless Jake says the client wants a change.
3. Fill gaps from the chosen art direction, making sure new colors harmonize with the logo (shared hue family or
   a deliberate complement) and the logo still reads on `--color-bg` and `--color-surface`.
4. Show Jake a short palette summary in your next message (no need to stop unless something conflicts).

## Path C — Generate from the art direction

1. Start from the direction's fonts and palette (intake Step 5).
2. Build the full token set: neutrals (bg, surface, surface-2, line, muted, text), primary + strong + tint + on-primary,
   optional support color, status colors, focus.
3. Pick a simple wordmark treatment for the header if no logo exists (business name in the display font) and tell
   Jake a real logo is a separate job. Don't design a fake logo mark.

## Deriving (all paths)

- **Tints/shades**: derive in OKLCH (keep hue, change lightness/chroma), not by mixing with white/black in RGB.
  `--color-primary-tint` ≈ L 95%, low chroma for backgrounds; `--color-primary-strong` = darker until on-primary passes 4.5:1.
- **Dark/light**: if the direction uses a dark base, define light-on-dark text colors; make sure brand colors still pass on it.
  Only build a user-toggle dark mode if Jake asks.
- **On-primary**: test white and the darkest neutral; pick whichever passes 4.5:1; if neither, use primary-strong for fills.
- **Muted text**: the lightest gray that still passes 4.5:1 on both bg and surface.
- **Line color**: subtle (≈ 1.3–1.6:1) for dividers; input borders must pass 3:1.
- **Focus**: high-visibility color, ≥ 3:1 against bg and surface (often the primary-strong or a contrasting hue).
- **Status**: success/warning/danger tuned to sit with the palette, each ≥ 3:1 on its background.

## Contrast

Write a table in `brand.md` for every pair actually used:

| Foreground | Background | Ratio | Use | Pass |
|---|---|---|---|---|
| --color-text | --color-bg | 14.2 | body | AA ✔ |

Compute with the WCAG relative-luminance formula (a 10-line script is fine; e.g. Node
`wcag-contrast` or a Python snippet). Thresholds: 4.5 body text, 3.0 large text and UI. Fail = fix before building.

## Fonts

- Self-host woff2 via `@fontsource` packages or files in `public/fonts/`; subset Latin; ≤ 4 files total.
- `@font-face` with `font-display: swap`; preload the display face (above-the-fold weight only).
- Set fallback metrics (`size-adjust`, `ascent-override`) or use `@fontsource` fallbacks to keep CLS ≈ 0.

## brand.md contents

1. Path used (A/B/C) and source files.
2. Brand rules quoted from the guidelines (if any).
3. Every expression knob value (design-foundation Section B) + why.
4. Variation guard check vs. the two most recent sites (list which knobs differ).
5. Contrast table.
6. Flags for Jake (font licenses, low-res logo, failing brand pairs, stock photos).

Then move to `skills/site-plan/SKILL.md`.

## Motion personality and display type

When writing `brand.md` and `tokens.css`:

- Set the **motion personality** knob (`calm` / `crisp` / `bold`) and say that `<html data-motion="…">` must match it.
  High-ticket, editorial, or "wow" directions default to **bold** unless Jake picked a calm direction.
- Generate `--step-display` in the **default 56–88px at 1440** band, tight leading, slight negative tracking.
  Only when the plan names a luxury-modern / Eppright direction may it go up to **120px**. Body
  **16px minimum** (16–18px); labels/meta **14px minimum**. Never smaller than 14px, never 11px. The drama
  comes from display size, not from shrinking the body.
- Set the **Direction** knob: grounded (default), or an opt-in premium-editorial (Cormack) or playful-retro
  (Thelen) direction if Jake asked for it. See `design-foundation/grounded-references.md`.
- Fill the new motion tokens (`--dur-hero`, `--dur-count`, `--ease-reveal`, `--reveal-y`, `--stagger`, `--parallax-max`)
  or leave the `templates/tokens.css` + `motion.css` personality defaults.

