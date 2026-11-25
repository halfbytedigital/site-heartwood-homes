---
name: page-build
description: 'Build the approved site plan as an Astro project on the site''s tokens. Pick section archetypes per page from the library so sites differ, wire facts through the null config, build one trade-specific signature interaction, set up forms (Resend or GoHighLevel) and Cloudflare Pages deploy. Runs only after Jake approves plan.md.'
---

# Page build

Inputs: `brief/intake.md`, `brief/sources.md`, `brief/material-board.md`, `brief/brand.md`, `brief/plan.md`, `src/styles/tokens.css`.
Do **not** write page markup until the material board exists (colors sampled from the client's photos, fonts
chosen for the subject, the one memorable element) and a **motion plan** is written in `brand.md` (A7).
Rules: `skills/design-foundation/SKILL.md` applies to every line you write.

## Step 1 — Scaffold (fresh, never a copy of another client)

```
cd sites
npm create astro@latest <slug> -- --template minimal --typescript strict --no-git --install
cd <slug>
npx astro add sitemap --yes
npm i -D @playwright/test
```

- `astro.config.mjs`: `site: 'https://<domain>'`, `output: 'static'`, `trailingSlash: 'always'`, sitemap integration.
  Also set Vite allowed hosts so Cloudflare quick tunnels work for review (dev *and* preview):

  ```js
  vite: {
    server: { allowedHosts: ['.trycloudflare.com'] },
    preview: { allowedHosts: ['.trycloudflare.com'] },
  }
  ```

  Without this, `https://*.trycloudflare.com` returns `403 Blocked request. This host is not allowed`
  (Vite may mention `preview.allowedHosts` in vite.config.js — in Astro it belongs under `vite` as above).
  Restart the dev server after adding it.
- `package.json` scripts **must** include, before you tell Jake to run anything:

  ```json
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
  ```

  (`npm create astro` usually writes these; if a mid-build preview is missing `dev`, add them immediately.)
- Fonts: `@fontsource/<family>` (or files in `public/fonts/`), imported once in the base layout.
- Motion utilities: copy `templates/styles/motion.css`, `templates/scripts/motion.ts`, `templates/components/Animate.astro`.
  They are tools for the **motion plan** (one hero load-in, one CSS scroll-driven signature, hover), not a system
  to stamp on every section. Delight utilities: copy `templates/styles/delight.css` only if a chosen moment needs
  them. Import `motion.css` after `tokens.css`. Import `motion.ts` once (`import "../scripts/motion";`).
  In `<head>`, before paint: `<script is:inline>document.documentElement.classList.add("js");</script>`.
  Content must be visible without JS; never add a loader that hides the page.
- **Project-page shell (C28):** copy `templates/styles/project-page.css`, `templates/scripts/project-page.ts`,
  and the components `ProjectHero`, `WalkRail`, `ProjectShot`, `SaveHouse`, `NextHouse`, `PhotoViewer`.
- **Project index filters (C29):** when the index has 8 or more projects, copy
  `templates/styles/project-filters.css` and `templates/scripts/project-filters.ts`, and put job-type
  chips above the list (All + types the harvest supports, counts, `?type=`, `aria-pressed`).
- **Home lot-to-finish scrubber (C31):** when phase photos of the same house exist, use the overlay
  scrubber (photo-as-control, glass bar on the media, branded track, no scroll-jacking, primary CTA
  only at the last chapter). Do not put the controls in a panel below a tall photograph.
  Import the CSS from Base (hearts also appear on the work index). Import the script once after `analytics.ts`.
  Mark the primary CTA with `data-start-cta` (optional inner `data-start-cta-label`) and add a
  `data-saved-count` element in the header. On the qualifier, include a `data-saved-houses-field` input
  named something like `housesLiked` ("Houses you liked").
- Structure:

```
src/
  styles/tokens.css        ← from brand-kit
  styles/base.css          ← reset, typography, utilities (container, section, visually-hidden), focus, reduced motion
  styles/motion.css        ← from templates/styles/motion.css
  scripts/motion.ts        ← from templates/scripts/motion.ts (imported once in Base.astro)
  scripts/project-page.ts  ← from templates/scripts/project-page.ts (C28 rail, viewer, saves)
  styles/project-page.css  ← from templates/styles/project-page.css
  data/site.ts             ← facts (null-config, from templates/site.ts)
  data/services.ts, reviews.ts, projects.ts, nav.ts
  layouts/Base.astro       ← <head> (SEO, OG, JSON-LD, preloads), header, main, footer, action bar
  components/              ← Header (data-header-sticky), MobileNav, Footer, ActionBar, Eyebrow, Button, Photo,
                             CtaStrip, ReviewCards, GoogleBadge, QuoteForm, SectionHeading, Schema, Animate.astro,
                             ProjectHero, WalkRail, ProjectShot, SaveHouse, NextHouse, PhotoViewer,
                             + archetype components
  components/signature/    ← the one signature interaction
  pages/                   ← per plan.md
public/ _redirects, robots.txt, og-default.jpg, favicon.svg
functions/api/quote.ts     ← only if Resend
```

Shared components may be adapted from earlier sites only if restyled through tokens. Never copy page layouts or copy.

## Step 2 — Facts and content

- Copy `templates/site.ts` to `src/data/site.ts`; fill confirmed values from `intake.md`/`sources.md`; everything
  else stays `null`.
- Every component that shows a fact checks it: `{site.yearFounded && <span>Since {site.yearFounded}</span>}`.
  No fallbacks like "XX", "Since 20__", "100+".
- Copy: write in the chosen voice from intake answers and the crawl. Short sentences, concrete nouns, the customer's
  words. Follow `templates/copy-voice.md` (A24): no internal sourcing language, no narrating missing facts, no
  generic filler. Headlines say an outcome or a difference, not "Welcome to …". Each service page answers: what it is, who it's
  for, how it works with them, what it costs or how pricing works (if agreed), proof, next step. The primary
  offering uses composition C30. Do not repeat a distinctive widget across pages (compositions.md,
  "One widget, one page").
- Reviews: verbatim from `sources.md`, with source link.
- Put any copy you wrote that contains a claim on the honesty list in `brief/review/claims.md` (review checks it).

## Step 3 — Build pages from archetypes

- Use the archetypes listed in `plan.md` (IDs from `archetypes.md`). Each archetype is a component with props,
  styled only through tokens and the knob settings in `brand.md`. Follow the **recipe** (layout, type, motion)
  in `archetypes.md`, not just the one-line name.
- Variation rules:
  - No two adjacent sections share an archetype or the same surface color.
  - Home uses ≥ 5 different archetypes, and at least three different *layout shapes* (e.g. split hero, snap rail,
    ruled grid, manifesto type band, dark CTA — not five stacked card grids).
  - Don't reuse the hero archetype from either of the two most recent sites.
- **First impression bar** (design-foundation A0) applies to Home and every interior page hero. If you don't
  have a photo yet, compose a type-led hero (H4) that still fills the viewport; don't ship a sparse stub.
- **Composition:** pick moves from `compositions.md` (Home ≥ 4, each interior page ≥ 2) and actually build the
  recipe (bleed, peek, overlap, ruled board, a featured-house card, a trust strip, a dark closing band, etc.).
  Write the picks in `plan.md`. Breaking the container is optional, not required.
- **Delight:** the site has **1–2 memorable moments** from this client's world (`delight.md`), not 3–5 ticks on
  every page. Home usually hosts the signature (trade interaction or the one scroll-driven CSS moment). Record
  them in `plan.md`. Implement a11y and reduced-motion notes.
- **Agency craft and anti-template** (A18, A20): run the anti-generic / anti-template checklist on every page
  before review. Eyebrows are rare. Work indexes are photo-forward and calm (C15, C16, or C17), not a
  typographic hover takeover and not a Legacy-style identical tile grid. Do not default to cream + serif
  display + terracotta. Run the template smell test in `grounded-references.md`.
  Use modern CSS as specified (`@container`, `:has()`, subgrid when it helps, one view-timeline for the
  signature moment) with fallbacks.
- **Motion plan** (A7): wire the one hero load-in (`[data-hero]` + stepped children, once) and the one
  scroll-driven signature in plain CSS. Hover/press are quick (120–200ms). Everything else stays still — do
  **not** put `data-animate` on every section, stagger every card group, or attach `data-count-up` to every
  number. Count-ups only if the plan names them.
- Mobile first. Build each section at 390, then widen. Check 768 and 1024 for awkward in-betweens.
- Images: `<Image>`/`<Picture>` from `src/assets/`, explicit `sizes`, LCP rules from design-foundation A8.
  In learn mode, download **every** project and gallery original (full resolution, all captions and details)
  into `brief/assets/projects/<slug>/` *and* the site `src/assets/projects/<slug>/` *before* building the hero
  or any project page. Don't wait to be asked. A project page that ships one photo when the source had more
  fails review.
- **Every project page uses the C28 shell** (`compositions.md`, `templates/project-page.md`): photo-first
  opening (the most striking photo is visible in the first viewport at 1440 *and* 390; long copy below);
  Walk through rail; reactive photos with no "View larger" badges; a cleaned-up fullscreen utility; a
  save-this-house heart; a calm next-house card. A C25 slider is only a real drag reveal of a same-vantage
  pair; otherwise use editorial frames and do not caption different angles as the same view. Don't paste a
  raw URL into a paragraph when a text link exists. Google ratings link to the real Business Profile URL, or
  to nothing — never to a search. The settle-in is the project page's hero load-in (once, 600–900ms).

## Step 4 — The signature interaction (exactly one per site)

Pick the one approved in intake/plan from `signature-interactions.md` and build it as one island.
It is a first-run feature, not a nice-to-have: put it **on the Home page, in or immediately under the hero,
or as the first content section** so nobody has to hunt for it. It should feel large, tactile, and specific
to this business (the thing Jake would show the client first).


- Plain TypeScript in an Astro component `<script>` or a tiny island; no framework unless it needs one; ≤ 30KB gzip.
- **Default HTML = meaningful final state** (works without JS, prints well, readable by search engines).
- Native controls first (`<input type="range">`, buttons, radio cards) with labels, keyboard support,
  `aria-valuetext`, and `aria-live="polite"` for results (announce on meaningful change, not every frame).
- Touch: only the control area uses `touch-action: none`; the rest of the page scrolls normally.
- Reduced motion: no intro animation; the control still works.
- Starts animating only when ≥ 60% visible, plays once.
- Numbers shown never exceed real claims; unknown math (`null` in its data file) hides the result and shows a CTA.
- **Value before contact:** the result (and a price range, when we have rates) is visible before any name,
  email, or phone field. Contact is last and optional for seeing the result. Fewest fields. See `conversion.md`.
- Ends in an action: "Send me this estimate" / the qualifier, passing values via query params / hidden fields.
- Loaded only on the page that uses it.
- Build an estimator only when `src/data/estimator.ts` has real rates from the client. Otherwise ship a
  multi-step qualifier (T4) and leave a labeled placeholder listing the missing inputs.

## Step 5 — Forms

- `QuoteForm.astro` per design-foundation A11 and `conversion.md`, with fields from intake.
- Default short form: 3–5 visible fields. Multi-step qualifier: easy questions first, contact last.
- Wire `data-event` attributes (`form_start`, `quote_submit`, `qualifier_*`, `call_click`, …) from
  `templates/measurement-plan.md`. Include `templates/scripts/analytics.ts`.
- Every form success lands on a thank-you page (what they sent, who replies, by when).
- **Resend:** `functions/api/quote.ts` (Cloudflare Pages Function) validates input, checks Turnstile, sends with
  Resend to the client's address (`RESEND_API_KEY`, `QUOTE_TO`, `QUOTE_FROM` env vars), returns JSON. From-address on
  a verified domain.
- **GoHighLevel:** use the client's GHL form embed (lazy-loaded facade) or post to their inbound webhook from a Pages
  Function. Ask Jake for the embed/webhook if not in intake.
- Never commit keys. List required env vars in the site's `README.md`.

## Step 6 — SEO, schema, deploy setup

- Base layout: title/description/canonical/OG per page; JSON-LD from `site.ts` (null fields omitted).
- `public/_redirects` for old URLs (from plan.md). `robots.txt` with sitemap URL.
- Cloudflare Pages: build command `npm run build`, output `dist`, Node 20+. Note env vars. Don't connect domains or
  change DNS. That's Jake's call.

## Step 7 — Self-check, then review

- `npm run build` passes with no warnings you can fix.
- `npm run dev` is a real script; a tunnel to the dev server does not 403 on `*.trycloudflare.com`.
- Every project page's first viewport at 1440 and 390 shows the striking photograph (C28a), not a title-and-paragraph stack.
- First viewport at 1440 and 390 passes the first-impression bar (A0). The motion plan (A7) is followed:
  one hero load-in, one signature, hovers; the rest is still. Reduced-motion shows the page complete with no
  `opacity: 0` leftovers; focus-visible is obvious; no loader hides content.
- Composition, the 1–2 delight moments, and the anti-generic / anti-template checklist (A18–A20) pass on
  every page. You would honestly say a design agency would ship it, **and** that the client's customer would
feel cared for (A21): plain language, visible call/quote/contact, body 16px+, people/voice when we have them.
- Run through `skills/review/SKILL.md` before telling Jake anything is ready.

## Stop points during build

Ask Jake only when blocked, **one question per message** (conversation rules in `skills/intake/SKILL.md`):
- a section needs an asset we don't have (options: labeled placeholder block, skip the section, or stock with OK);
- a fact is needed for a sentence to make sense (rewrite the sentence instead, if you can; otherwise the value stays `null`);
- a third-party account is required (Resend domain, GHL webhook, Turnstile key).
