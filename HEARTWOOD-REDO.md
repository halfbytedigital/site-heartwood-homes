Guiding principle: **cutting edge but caring.** Two ship/fail questions, both required: "would a design agency ship this?" and "would the client's customer feel cared for?" Heartwood's customers are families and homeowners making a big, emotional purchase. The craft has to be modern and agency-grade, and also warm, human, and trustworthy.

Do not copy text or assets from any other site (including any Duda preview). Pull the updated kit. Some earlier kit advice is now wrong: do not fade every section, do not add count-up stat rows by default, do not sprinkle 3–5 delight ticks on every page, and do not keep or default to warm cream + Fraunces/Newsreader + terracotta as the "editorial" look. That pairing is a generic AI-site tell unless a material board sampled from Heartwood's own photos (or a real brand kit) actually supports it, and even then the layout and the memorable element have to be specific.

Do this in order:

1. In `astro.config.mjs` add `vite.server.allowedHosts` and `vite.preview.allowedHosts` of `['.trycloudflare.com']`, confirm `package.json` has `dev` / `build` / `preview`, and restart `npm run dev` so a Cloudflare tunnel can be reviewed.

2. Before any new visual code, write `brief/material-board.md` (use `templates/material-board.md`). Sample 6–8 colors from Heartwood's house photos (metal roofs, timber, stone, lake, canopy — name the photo and photographer). Choose display + body fonts for *this* builder and these pictures — not a preset Fraunces + Outfit on warm cream, and not "because Direction 2 said so." Name the one memorable element (the lot-to-finish scrubber of their job is the natural candidate, if you make it large and photographic). Then write a short motion plan in `brief/brand.md`: one hero load-in, one scroll-driven signature in plain CSS, quick hovers, optional view transitions on project thumbnails. Everything else stays still. Motion should reassure and guide, never show off. Rebuild tokens from the board (`--step-display` 70–160px at 1440, tight leading ~0.9–1.05, tracking about −0.03em; **body 16px minimum**, 16–18px; labels/meta 14–15px; **never 11px, never smaller than 14px**; inputs ≥ 16px). Drama comes from display size, not from shrinking the body.

3. Layout carries the design. Full-bleed photography (no rounded inset hero card). Generous negative space. Off-center placement. Something on every page must break the container (bleed, peek, overlap, edge-to-edge rule). Home: at least four moves from `skills/page-build/compositions.md`. Every interior page: at least two. The header and footer are designed objects, not default logo|links|pill / four-column gray — but navigation stays obvious: plain labels, no experimental or mystery-meat UI, no style that gets in the way of understanding.

4. Care and trust (A21), visible on every page:
   - Real people, faces, and owner voice when we have them (Daniel and Laura Hertgers; project photography with people in it if it exists). Don't hide the family-owned story behind only architecture.
   - Plain-language copy. Fix the Home voice slip ("They build the house"). Headings name the outcome.
   - Call, quote, and contact are always easy to find (header CTA + phone when we have it, mobile action bar, a clear closing path). Don't bury the next step.
   - Delight is hospitality, not cleverness.

5. Projects: `/projects/` is a typographic index list with a hover/focus image (composition C15 / archetype W7), not a grid or rail of identical cards. Names stay readable (14px+). Keep one template per house at `/projects/<slug>`, modal from the index, full page on the direct link.

6. Delight is 1–2 moments from their world, not a per-page tally. Home's signature is the lot-to-finish scrubber (cleared lot → foundation → frame → finished home), full width, in or right under the hero, native range input, keyboard + touch, aria-live, default finished state. Be honest when a phase has no photo. A second moment is optional (index hover, a heading that changes color over one of their photos, a designed 404). Do not add word-stagger on every heading, stickers, marquees, or count-up proof rows just to have details.

7. Motion follows the plan only. Wire a hero load-in (`[data-hero]` + its own children). Do not stamp `data-animate` on every section. Copy `motion.css` / `motion.ts` as utilities, not as a site-wide baseline. Hovers are 120–200ms. Reduced motion: final states immediately, no leftover `opacity: 0`, interactions still work. No loader that hides content. Visible `:focus-visible` on every control.

8. Anti-generic check (design-foundation A20) — fail and fix if any of these appear without a written justification in the plan: an eyebrow on every (or most) headings; identical card grids (especially the 8-up on Custom Homes and the 3-card project rail); every section fading up; count-up stat rows; cream + serif display + terracotta as a default look; display type stuck around 55px at 1440; body type under 16px or any text under 14px.

9. Positioning, facts, reviews — unchanged and non-negotiable:
   - Heartwood is a CUSTOM HOME BUILDER first. The Home H1 and every page hero lead with custom homes. Land work is a supporting strength — one homepage moment like "We start with the land, too" and the Site Prep & Landwork page, never the headline.
   - Reviews: 5.0 from 19 Google reviews, linked to Google (prefer a profile URL if we have one; a search URL is acceptable if that is all we have). No invented quotes.
   - Null-config: no invented phone, license, years, address, prices, or owner names; hide nulls; don't leave empty sections. There is no public street address; they don't publish prices. The current owners (Daniel and Laura Hertgers), 2017, and the phone already on the site stay if they are already sourced.
   - Fix the broken `/_astro/a-frame…` image. Don't invent mid-phase scrubber photos; keep the honest empty state or ask for images.
   - Don't repeat the same dark "Start your project" band as the only interior-page idea.

10. Self-check against A0 / A7 / A9 / A15 / A18 / A19 / A20 / A21 (both review questions), then tell me the tunnel is ready for another review.
