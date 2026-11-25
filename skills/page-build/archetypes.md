# Section archetype library

Pick per section in `plan.md`. Each one is a layout pattern, not a look: tokens and knobs decide the look.
Mix them so no two sites, and no two adjacent sections, feel the same. Add new archetypes here when a site invents one.

**Recipes are mandatory.** Don't implement only the title. Each entry lists layout, type, and a "done when"
so a first run already feels finished.

**Motion.** Only the hero uses a load-in (`[data-hero]` + stepped children). Other sections are still by default.
A recipe's "Motion:" line is a suggestion *if* that section is the site's one scroll-driven signature — not a
requirement to fade every block. Count-ups are optional and must be justified in the plan (they are a generic
tell when used as a default proof row).

## Heroes (H)

A desktop hero fills the first viewport (min-height ~100vh, or a split whose photo column does). One H1 at
`--step-display` (default 56–88px at 1440; tight leading, slightly tight tracking), one lede ≤ 55ch, one
primary CTA plus a quieter Call. Wrap in `[data-hero]`. Lead with the ranked memorable photo.

- **H1 Full-bleed photo + scrim.** Big image, headline bottom-left, 1–2 CTAs. Bold, outdoor trades. (316 used this.)
  Photo is the LCP `<img>`, scrim from `--scrim`, type over the image must pass contrast on the actual crop.
  Motion: image `hero-image`, type and CTAs `fade-up` steps 1–3. Parallax `slow` on the image wrapper only if bold/crisp.
- **H2 Split 50/50.** Text one side, photo the other (photo bleeds to the viewport edge, no rounded "card" that
  shrinks it). Editorial, custom homes, professional services. On mobile: type first, then the photo full-bleed
  underneath (not a small inset). Motion: type steps fade-up; photo `fade-left` or `hero-image`.
- **H3 Split with stat rail.** Split hero + a rail of 3 confirmed facts under it (hidden facts collapse the rail).
  Stats use display type; leave them static unless the motion plan explicitly justifies a count-up.
- **H4 Type-led.** Oversized headline, small supporting photo or none, strong color field. Modern, confident.
  Use this when photos are scarce so the first viewport still feels designed. Motion: H1 `blur-up` or `fade-up`.
- **H5 Framed photo.** Photo inset with an offset border or shape mask, headline overlapping the frame edge.
- **H6 Video loop.** Short muted loop with a poster; poster is the LCP image. Only if the budget allows.
- **H7 Interactive hero.** The signature interaction *is* the hero (e.g. a before/after wipe or the build scrubber).
  The control is usable in the first viewport; default HTML shows a meaningful finished state.

## Proof (P)
- **P1 Proof bar / trust strip.** Default directly under the hero (C18). Quiet facts: license, insured, years,
  Google rating and count (linked to the real profile). Null items drop out. Not a Teton-style badge soup.
- **P2 Logo/cert wall.** Manufacturer certs, associations. Only real ones.
- **P3 Big quote.** One standout review, large type, name + source. Motion: `fade-up`.
- **P4 Review cards.** 3–6 `<ReviewCards>` + `<GoogleBadge>`; scroll-snap rail on mobile (hidden scrollbar, one selector).
  Rating + count link to Google; no invented quotes.
- **P5 Stat band.** 3–4 *confirmed* numbers in display type, static by default. `data-count-up` only if the
  plan justifies it (otherwise this is a generic-AI tell). Prefer typographic scale contrast over animation.
  Labels in muted 14–15px type (`--step--1`, never smaller). A hairline divider. Don't use this just to have a proof row.

## Services (S)
- **S1 Card grid.** 3 or 6 cards with photo/icon, title, one line, link. Use sparingly; do not repeat the same
  grid on Home, a service page, *and* Projects. For a project index prefer W7 / C15.
- **S2 Numbered list / ruled grid.** Big numerals or a 2×2 (desktop) ruled board with `border-y` and column rules
  (316 "rule-grid" style). Generous cell padding. A tinted `--color-surface` band often helps. Motion: heading
  then cells stagger.
- **S3 Tabs/accordion.** Service names as tabs (desktop) / accordion (mobile) with photo + detail.
- **S4 Alternating rows.** Photo/text zig-zag, one row per service; good for 3–4 services with depth.
  Alternate `fade-left` / `fade-right`.
- **S5 Feature + list.** One featured service large, the rest as a compact list.
- **S6 Filter + feature.** Chip row (one selector) that swaps a featured service: large photo, short copy,
  3–5 specific bullets, and a "see work" thumbnail row underneath. Done when choosing a chip feels immediate.

## Story / About (A)
- **A1 Split highlight.** Photo + short story + link (316 "Steep ground is our ground"). Photo edge-aware,
  `img-reveal`. Optional `data-animate-words` on the heading if this is the page's one manifesto moment.
- **A2 Timeline.** Company milestones (only dated, confirmed ones).
- **A3 Team grid.** Real people, real photos. Skip if no photos — don't invent a roster.
- **A7 Owners on a job site.** Default when we have owner or crew photos (C20). A real job, a short story in their voice.
- **A4 Values / reasons.** 3–4 reasons with icons; must be specific to this business. Skip generic icon why-choose grids (even Buchanan's).
- **A5 Owner letter.** Signed note from the owner in their voice (client approves wording).
- **A6 Manifesto band.** A short sentence in `--step-4` or `--step-5`, max ~20ch-per-line, lots of air, no photo.
  Best place for `data-animate-words`. Use at most once on the site.

## Work (W)
- **W1 Before/after slider.** One draggable wipe (accessible range input).
- **W2 Masonry/grid gallery.** Consistent ratio or a deliberate masonry; lightbox with one navigation method.
- **W3 Project cards.** Cards to project detail pages (location only if confirmed). Avoid as the default index.
- **W7 Project index.** **Default for `/projects/`.** Photo-forward and calm (C15): a photo-led list, or a
  split list with one sticky large image that crossfades as the row changes. Large thumbnails on mobile.
  The studio-style typographic list + cursor-follow or instant full-viewport hover is **not** the default;
  use it only if the plan justifies it. Keyboard, touch, and reduced-motion notes in C15.
- **W4 Horizontal snap rail.** Scroll-snap rail with **arrows only** (hidden scrollbar). Cards are photo-led,
  often portrait. **Peek the next card** on desktop so it obviously continues. Captions can sit under the image
  or as an overlay (title + year). Motion: the rail `fade-up`; don't stagger so hard that cards pop in one-by-one
  after the peek is already visible.
- **W5 Feature project.** One project large with specs and a short story. Prefer the Eppright **big photo + info card** (C16). Nature's Call one-big-plus-two-small (C17) is the alternative when we have three strong photos.
- **W6 Numbered project rail.** Like W4, with a large index (`01`) and a "n / total" readout plus arrows.
  Interior `/projects/` pages can be this plus filter chips (All / category) when 8+ projects exist.

## Process (R)
- **R1 Steps row.** 3–5 numbered steps across (stack on mobile). Big numerals in display font.
- **R2 Vertical timeline.** Steps down a line with notes on each.
- **R3 FAQ accordion.** `<details>` based; FAQPage schema only for real questions.

## Tools (T)
- **T1 Estimator card.** Inputs + result + CTA. Ship only when `src/data/estimator.ts` has real client rates;
  otherwise hide the number and show the CTA, or don't build T1 at all (see T4). The range is visible **before**
  any contact field (anti-paywall rule). "Send me this estimate" is when we ask for a name.
- **T2 Quiz/checker.** 3–5 questions → a recommendation + CTA. Same contact-last rule.
- **T3 Signature interaction block.** Hosts the site's one signature element. On Home this should be large
  (full container width or full-bleed), in or right under the hero — never a small widget buried mid-page.
- **T4 Multi-step qualifier.** Default when the client cannot supply pricing inputs (Adair / Schumacher /
  Bath Fitter "start your design"). Easy questions first (town, land, timeline, budget range); **contact last**.
  Progress visible. Carry answers into hidden fields and onto the thank-you page.

## Calls to action (C)
- **C1 CTA strip.** `.cta-strip` band, headline + button (+ phone).
- **C2 CTA card.** `.cta-strip.is-card` inside the container on a surface.
- **C3 Closing CTA.** Large final section before footer: headline, short line of what happens next, primary + phone. Every page ends with C3 or C1.
  Default: a **dark inverted band** (C19). Don't stack a second CTA strip immediately above it.
- **C4 Inline form.** Short form on the page (contact page, landing pages). Visible labels, 52px submit. Contact-last on multi-step. Thank-you page after success.
- **C5 Comparison table.** A "with us vs. without" protections table (Block). Use when the client has real, specific guarantees — never invented.

## Location (L)
- **L1 Area list + map image.** Towns/counties served (confirmed), static map image (no heavy embed above the fold).
- **L2 Area cards.** Links to real town pages.

## Interior page heroes

Inner pages (Services, Projects, About, Contact) also get a real first viewport: usually **H4** (type-led) or a
compact **H2**. Don't drop the visitor onto a heading-and-cards stack with no typographic or photographic presence.
