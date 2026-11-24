# halfbyte-sites — how this works

This is the Half Byte Digital website toolkit. It is **not** a template to copy. It is a set of written
instructions ("skills") that an AI agent in Cursor or Claude Code follows to build a brand-new, custom site
for each client, with the same professional quality every time.

Think of it like this:

- **The skills are the playbook.** They tell the agent what to ask, which design rules never bend, and how to
  check its own work before you see it.
- **Each client site is built fresh** in its own folder under `sites/`. 316 Land Clearing can live there too as a
  reference, but new sites never start as a copy of it.

## Start a new site

1. Open this repo in Cursor (or run `claude` in this folder for Claude Code).
2. Paste something like:

   > Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes

3. The agent will **not** start coding. It replies with:
   - questions picked for that trade (a home builder gets asked about portfolio, process and price range;
     a stump grinder gets asked about per-stump pricing and emergency calls),
   - whether the client has an existing website (if yes, it pulls the logo, photos, copy, reviews and contact
     info from it and lists where each thing came from),
   - whether there is a brand kit (logo files, colors, fonts, guidelines PDF),
   - three named "art directions" to choose from, each with its own fonts, colors, photo style, layout feel and
     one signature interactive piece.
4. Answer in plain words. Short is fine: "B, yes they have heartwoodhomes.com, no brand kit, go with direction 2."
5. The agent proposes the page list and asks about extra pages (financing? careers? a page per town?). Say "go"
   when it looks right.
6. It builds the site, screenshots every page on desktop and phone, checks itself against the rules, fixes what it
   can, and then shows you the screenshots and a checklist.

See `EXAMPLE-heartwood-intake.md` for exactly what step 3 looks like.

## The six skills

| Skill | What it does in one line |
|---|---|
| **intake** | Asks smart, trade-specific questions, crawls the old site, proposes 3 looks. |
| **design-foundation** | The rules every site follows (spacing, type, contrast, mobile call bar, speed, honesty), plus the "knobs" that make each site look different. |
| **brand-kit** | Uses the client's real brand exactly if they have one; builds one from the chosen look if they don't. |
| **site-plan** | Proposes pages, asks about extras and missing info, outlines every page before building. |
| **page-build** | Builds the Astro site, mixing section styles so no two sites look alike, plus one signature interactive piece. |
| **review** | Screenshots and self-checks every page before you see it. |

## Folder layout

```
halfbyte-sites/
  CLAUDE.md            instructions Claude Code reads automatically
  .cursor/rules/       the same instructions for Cursor
  skills/              the playbook (edit these to change how every future site is built)
  templates/           starting files (token list, facts file, brief formats)
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
npm run build        # production build for Cloudflare Pages
node ../../scripts/review.mjs --base http://localhost:4321 --out brief/review
```
