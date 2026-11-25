# halfbyte-sites — how this works

This is the Half Byte Digital website toolkit. It is **not** a template to copy. It is a set of written
instructions ("skills") that an AI agent in Cursor or Claude Code follows to build a brand-new, custom site
for each client, with the same professional quality every time.

Think of it like this:

- **The skills are the playbook.** They tell the agent what to ask, which design rules never bend, and how to
  check its own work before you see it.
- **Each client site is built fresh** in its own folder under `sites/`. 316 Land Clearing can live there too as a
  reference, but new sites never start as a copy of it.
- **First runs have to pop, and look like a studio designed them.** The playbook starts with a material board
  (colors from the client's photos, fonts for the subject, one memorable element). Layout carries the design.
  Delight is one or two moments from the client's world, not a sprinkle of widgets. Motion is a short plan
  (one hero load-in, one scroll-driven signature, hovers) — not a fade-in on every section. Accessibility and
  performance are a differentiator. The review questions are "would a design agency ship this?" and "would the client's customer feel cared for?" The guiding principle is **cutting edge but caring**. Clean-but-generic
  fails, including the usual AI-site tells (eyebrow on every heading, identical card grids, cream + serif +
  terracotta as a default). Sites still have to look unlike each other.

## Start a new site

1. Open this repo in Cursor (or run `claude` in this folder for Claude Code).
2. Paste something like:

   > Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes

3. The agent will **not** start coding, and it won't send you a questionnaire. It asks **one question at a time**,
   each with a few lettered options, its own pick and a one-line reason:
   - A. Does the client have a website? (If it found one, it asks "Is this them?" and does nothing with it until you say yes.)
   - B. Is there a brand kit?
   - C. What mix of work do they do? (The question depends on the trade.)
   - Then three short "art directions" to choose from.
4. Answer with a letter ("b"), a few words, or several answers at once ("no site, no kit, custom + remodels").
   It skips whatever you've already answered. Say **"use your recommendations"** any time to let it pick the rest.
5. Next it shows the page list and walks through it page by page. It only asks things like phone number, license
   or years in business when it reaches a section that would show them. "Unknown" is always fine; that item just
   stays hidden until you fill it in.
6. It builds the site, screenshots every page on desktop and phone, checks itself against the rules, fixes what it
   can, and then shows you the screenshots and a checklist.

**Already have their website?** Say something like:

> Let's build a website for Heartwood Homes. Learn as much as you can from their existing site (heartwoodhomes.example) and ask me any outlying questions.

Other phrasings work too: "pull everything from <URL> and just ask what's missing", "start from their current site",
"crawl their site and fill in what you can". The agent confirms the URL (if you didn't give it), reads the whole
site (pages, logo, photos, reviews, colors, fonts, contact details, social links), logs where every fact came from,
sends you a short "What I learned" summary, and then asks only about the gaps, one at a time.

See `EXAMPLE-heartwood-intake.md` for what the first few turns look like, in both modes.

## The six skills

| Skill | What it does in one line |
|---|---|
| **intake** | Asks one trade-specific question at a time (or learns from the old site and asks only the gaps), then offers 3 looks. |
| **design-foundation** | The rules every site follows (first impression, spacing, type, contrast, motion, mobile call bar, speed, honesty, conversion), plus the "knobs" that make each site look different. Approved references and a template smell test live alongside it. |
| **brand-kit** | Writes a material board first (colors from their photos, fonts for the subject, one memorable element), then uses the client's real brand exactly if they have one, or builds tokens from the board if they don't. |
| **site-plan** | Proposes pages, maps the funnel and tools, plans city pages and measurement, then outlines every page before building. |
| **page-build** | Builds the Astro site from the material board and motion plan, with composition moves, conversion patterns (forms, tools, CTAs), 1–2 client-specific moments, and one signature interactive piece on the Home page. |
| **review** | Screenshots and self-checks, including "would a design agency ship this?", "would the client's customer feel cared for?", the template smell test, and a conversion / tracking audit, before you see it. |

## Folder layout

```
halfbyte-sites/
  CLAUDE.md            instructions Claude Code reads automatically
  .cursor/rules/       the same instructions for Cursor
  skills/              the playbook (edit these to change how every future site is built)
  templates/           starting files (token list, motion.css / motion.ts, facts file, brief formats)
  scripts/             review script, rule sync script
  sites/
    heartwood-homes/   one folder per client, each a normal Astro project
      brief/           the answers, sources, brand notes, page plan and review screenshots
      src/ public/ ...
```

## Facts the client hasn't confirmed

Anything like "Since 2008", "4.9 stars from 120 reviews" or "Licensed TN contractor #12345" lives in
`src/data/site.ts`. If nobody has confirmed it, it is `null`, and the site simply doesn't show it.
When the client confirms, fill in the value and it appears. No fake numbers ever ship.

## Changing the rules

Edit the file in `skills/`. Then run `bash scripts/sync-rules.sh` so Cursor's copy in `.cursor/rules/` matches.
(Claude Code reads `skills/` directly through `CLAUDE.md`.)

## Keep this separate

These files belong only in this repo. Don't put them in your global Cursor rules or anywhere near ACD work.

## Commands (inside a site folder)

```
npm install
npm run dev          # local preview at http://localhost:4321
                     # for a tunnel, astro.config.mjs must allow .trycloudflare.com (see page-build)
npm run build        # production build for Cloudflare Pages
node ../../scripts/review.mjs --base http://localhost:4321 --out brief/review
```
