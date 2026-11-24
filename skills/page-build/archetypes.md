# Section archetype library

Pick per section in `plan.md`. Each one is a layout pattern, not a look: tokens and knobs decide the look.
Mix them so no two sites, and no two adjacent sections, feel the same. Add new archetypes here when a site invents one.

## Heroes (H)
- **H1 Full-bleed photo + scrim.** Big image, headline bottom-left, 1–2 CTAs. Bold, outdoor trades. (316 used this.)
- **H2 Split 50/50.** Text one side, photo the other (photo can bleed off-edge). Calm, editorial.
- **H3 Split with stat rail.** Split hero + a rail of 3 confirmed facts under it (hidden facts collapse the rail).
- **H4 Type-led.** Oversized headline, small supporting photo or none, strong color field. Modern, confident.
- **H5 Framed photo.** Photo inset with an offset border or shape mask, headline overlapping the frame edge.
- **H6 Video loop.** Short muted loop with a poster; poster is the LCP image. Only if the budget allows.
- **H7 Interactive hero.** The signature interaction is the hero (e.g. a before/after wipe or season slider).

## Proof (P)
- **P1 Proof bar.** Thin band of badges/facts (license, insured, years, Google rating). Null items drop out.
- **P2 Logo/cert wall.** Manufacturer certs, associations. Only real ones.
- **P3 Big quote.** One standout review, large type, name + source.
- **P4 Review cards.** 3–6 `<ReviewCards>` + `<GoogleBadge>`; scroll-snap rail on mobile (hidden scrollbar, one selector).
- **P5 Stat counters.** 3–4 numbers that count up once. Only confirmed numbers; otherwise don't use this archetype.

## Services (S)
- **S1 Card grid.** 3 or 6 cards with photo/icon, title, one line, link.
- **S2 Numbered list.** Big numerals, title + line, dividers (316 "rule-grid" style).
- **S3 Tabs/accordion.** Service names as tabs (desktop) / accordion (mobile) with photo + detail.
- **S4 Alternating rows.** Photo/text zig-zag, one row per service; good for 3–4 services with depth.
- **S5 Feature + list.** One featured service large, the rest as a compact list.

## Story / About (A)
- **A1 Split highlight.** Photo + short story + link (316 "Steep ground is our ground").
- **A2 Timeline.** Company milestones (only dated, confirmed ones).
- **A3 Team grid.** Real people, real photos. Skip if no photos.
- **A4 Values / reasons.** 3–4 reasons with icons; must be specific to this business.
- **A5 Owner letter.** Signed note from the owner in their voice (client approves wording).

## Work (W)
- **W1 Before/after slider.** One draggable wipe (accessible range input).
- **W2 Masonry/grid gallery.** Consistent ratio or a deliberate masonry; lightbox with one navigation method.
- **W3 Project cards.** Cards to project detail pages (location only if confirmed).
- **W4 Horizontal rail.** Scroll-snap rail with arrows only (hidden scrollbar).
- **W5 Feature project.** One project large with specs and a short story.

## Process (R)
- **R1 Steps row.** 3–5 numbered steps across (stack on mobile).
- **R2 Vertical timeline.** Steps down a line with notes on each.
- **R3 FAQ accordion.** `<details>` based; FAQPage schema only for real questions.

## Tools (T)
- **T1 Estimator card.** Inputs + result + CTA (null math → CTA only).
- **T2 Quiz/checker.** 3–5 questions → a recommendation + CTA.
- **T3 Signature interaction block.** Hosts the site's one signature element.

## Calls to action (C)
- **C1 CTA strip.** `.cta-strip` band, headline + button (+ phone).
- **C2 CTA card.** `.cta-strip.is-card` inside the container on a surface.
- **C3 Closing CTA.** Large final section before footer: headline, short line, primary + phone. Every page ends with C3 or C1.
- **C4 Inline form.** Short form on the page (contact page, landing pages).

## Location (L)
- **L1 Area list + map image.** Towns/counties served (confirmed), static map image (no heavy embed above the fold).
- **L2 Area cards.** Links to real town pages.
