---
name: site-plan
description: Propose the sitemap from the trade and intake answers (core pages + industry-specific pages), ask follow-up questions about extra pages and missing info, then write a per-page section outline. Stop for Jake's approval before any building.
---

# Site plan

Output: `sites/<slug>/brief/plan.md`. Nothing gets built until Jake approves it.

## Step 1 — Draft the sitemap

Start from the "Usual pages" list for the trade in `skills/intake/question-bank.md`, then adjust to the answers.

Core pages (almost always):
- **Home**
- **Services** (overview) + one page per major service when there are 3+ services with real content to say
- **About** (story, team, credentials: only confirmed)
- **Contact / Get a quote** (form + phone + area/hours + map if public address)
- **Privacy policy** (forms collect data)
- **404** (on-brand, helpful, maybe playful)

Industry pages (add when the answers support them):

| Page | Add when |
|---|---|
| Portfolio / Projects + project detail pages | builders, remodelers, landscapers, painters with 6+ real projects |
| Our process | high-ticket or multi-step work (builders, design-build, roofing claims) |
| Financing | the client really offers it (name the partner) |
| Service area hub + town pages | they serve several towns and can give real, town-specific content (projects, notes) |
| Reviews | 10+ real reviews worth a page; otherwise reviews live on Home/About |
| Equipment / Our machine | the equipment is a selling point (316) |
| Maintenance plans / memberships | HVAC, lawn, pest, pools with real plans |
| Emergency service | 24/7 is confirmed |
| Storm damage & insurance | roofing/tree with real insurance-claim help |
| Available homes / lots, Floor plans | builders with spec homes or plan libraries |
| FAQ | there are at least 6 real questions from the client or reviews |
| Careers / Join our team | they're hiring (common for cleaning, HVAC, trades) |
| Pricing | the client agreed to show prices |
| Gallery / Before & after | strong visual proof and no project pages |
| Partner/sister business | linked businesses (like Scenic City Stump Grinding) |

Rule of thumb: every page needs a real job and real content. If it would be thin, fold it into another page.

## Step 2 — Navigation

- Primary nav ≤ 6 items + CTA button. Put service pages under a Services dropdown when there are more than 4.
- Footer nav carries secondary pages (Careers, Privacy, FAQ, Areas).
- Mobile action bar actions (from intake): e.g. Call · Text · Quote.

## Step 3 — Follow-up questions (STOP)

Send Jake one message with:

1. The sitemap as an indented list, with one line per page saying why it's there.
2. **Pages I'd consider adding** (multiple choice, with a recommendation each), e.g.
   "Financing page? a) yes, they use <partner>, b) no, c) not sure (I'll leave it out)."
3. **Missing info that blocks a page**, e.g. "Project pages need 6+ projects with 4+ photos each. How many do they have?"
   or "Town pages need something specific about each town. Should we skip them for launch?"
4. **Content sources**: who writes/approves copy (we draft from intake + crawl, client approves?), photo shoot needed?
5. Anything you're assuming, stated plainly so Jake can correct it.

Wait for answers. Update the sitemap.

## Step 4 — Per-page section outline

For every page, list sections top to bottom. For each section:

```
### Home
1. Hero — archetype: H3 "Split with stat rail" | H1: "<draft>" | lede draft | CTA: Get a free quote (+ Call) | image: <file or "needs photo">
2. Proof bar — archetype: P1 | items: years (null→hidden), license (null), Google badge (null→link only)
3. Services — archetype: S2 "Numbered list" | 6 services from intake
...
```

- Use archetype IDs from `skills/page-build/archetypes.md`. Vary archetypes between pages (no two adjacent sections
  with the same archetype, and the Home page uses at least 5 different ones).
- Mark where the **signature interaction** lives (one site-wide element, usually Home or a key service page).
- Draft headlines in the chosen voice. Mark every fact with its source or `null`.
- List the assets each section needs and whether we have them (`brief/assets/`), so gaps are visible.
- Note SEO: page title, meta description draft, target query ("custom home builder Chattanooga"), H1.
- Existing site: list old URL → new URL redirects.

## Step 5 — Approval (STOP)

Show Jake the outline (or a summary + link to `plan.md`). Ask: "Good to build, or changes?"
Build only after a clear go. Then `skills/page-build/SKILL.md`.
