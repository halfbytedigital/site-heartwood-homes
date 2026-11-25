---
name: intake
description: 'Start of every new site. A short conversation with Jake, ONE question per message, asked only when needed: existing website → brand kit → work mix → art direction. Facts are not collected here; they''re asked later, when a page needs them, and default to null/hidden. Learn mode crawls a confirmed existing site, summarizes it, then asks only the gaps. Use when Jake says "let''s build a website for …" or "learn from their existing site".'
---

# Intake

Goal: learn just enough to pick a look and plan pages, through a quick back-and-forth that feels like talking to a
designer, not filling in a form.

## Conversation rules (apply to every message in intake and site-plan)

1. **One question per message.** Never send a list of questions, a facts checklist, or a questionnaire.
2. **Just in time.** Ask a question only when the next step actually needs the answer. If you can proceed without it,
   don't ask; use the default and move on.
3. **Format every question like this** (keep it short; no long explanations):

   ```
   <One-line context, only if needed.>

   **<The question>?**
   a) <short option>
   b) <short option>
   c) <short option>
   (3–5 options max)
   **I'd pick <letter>:** <one-line why>.
   Or tell me something else.
   ```

4. **Shortcuts Jake can use at any time:**
   - **"use your recommendations"** (or "your call", "go with your picks"): accept the recommended pick for the
     current question *and every remaining intake question*, say in one or two lines what you chose, and move on to
     the next stage (brand kit → site plan). Facts still stay `null`.
   - **Batching:** if Jake answers several things at once ("no site, no kit, custom + remodels, direction 2"),
     record all of them, skip those questions, and ask only the next unanswered one.
   - **"skip"**: use the default for that one question and continue.
5. **Never repeat a question** that's already answered (check `brief/intake.md`).
6. **Recommendations are based only on** Jake's prompt, Jake's answers, confirmed sources in `brief/sources.md`, and
   general knowledge of the trade. **Never** base a recommendation on a site or profile Jake hasn't confirmed.
7. **Competitors:** don't name any competitor unless it's in `sources.md` with a URL. Speak in general terms
   ("most builder sites in the area lean rustic") only if you actually looked; otherwise say nothing about them.
8. **No facts in intake.** Phone, license, years, team, reviews, area, warranty, etc. are *not* asked here. They're
   asked by site-plan/page-build at the moment a page or section needs them (see `skills/site-plan/SKILL.md`).
   Until confirmed, they're `null` in `src/data/site.ts` and hidden.
9. Keep every message short: aim for under ~12 lines, except the art directions message.

## Before the first question (silent setup)

1. Parse Jake's prompt: business name → slug, trade(s) → entries in `question-bank.md` (reference only, not a
   script), location, anything stated (URL, kit, phone…).
2. Create `sites/<slug>/brief/intake.md` from `templates/intake-brief.md`; record the prompt verbatim and anything
   stated as "Jake, <date>".
3. Optional quick search for an existing site/profile: `"<business name>" <city>`. Keep anything you find as an
   **unconfirmed candidate** in `intake.md` only. Don't open, crawl, or use it yet.

## The question sequence

Skip any step that's already answered. Stop after each question and wait.

### A. Existing website (always first, unless Jake already said)

- If you found a candidate: "I found **<URL>**. Is that <Business>?" a) yes, so learn everything from it and only
  ask what's missing (learn mode), b) yes, but only pull assets (logo, photos, reviews), c) no, they have a different
  site (send it), d) no website, e) only a Facebook/Google/Houzz page (send it).
- If not: "Does <Business> have a website now?" a) yes, so send the URL and I'll learn everything from it (learn mode),
  b) yes, but only pull assets, c) no, d) only a Facebook/Google/Houzz page.
- Recommended: "if there's anything (even a Facebook page), send it, because real photos and reviews beat anything I write."

A "learn everything" answer switches to **Learn mode** (below). **Otherwise, after a "yes" with a URL:** crawl it (Step "Crawl" below). Tell Jake in one line what you pulled
("Got the logo, 34 photos, 6 services, 12 reviews, their colors and phone. Details are in sources.md.") and fold
that into the next question's options. Facts pulled from a confirmed site still count as *sourced*, but anything
that changes often (ratings, review counts, hours) is marked "confirm before launch".

### B. Brand kit

"Is there a brand kit?" a) full kit (logo, colors, fonts, guidelines): send it, b) logo only, c) nothing,
d) use what's on their current site (only offer if A confirmed a site).
Recommended depends on what you have (e.g. "d, since their site already has a consistent look" or "c is fine, and
I'll design around the direction you pick").
If a full kit arrives, the art directions in E change only layout, imagery and motion, not brand colors/fonts.

### C1. Work mix

The single trade question that most changes the site. Take it from the trade's entry in `question-bank.md`
(the first "C1" question). For a home builder: "What mix of work do they do?" a) custom homes only, b) custom homes
+ major renovations, c) mostly remodels, d) residential + light commercial.
If the crawl already answered it, skip it, or ask for a one-tap confirmation ("Their site lists custom homes and
renovations. Still right?").

Any other trade question from the bank is **not** asked here. It's asked later only if a page needs it.

### E. Art direction (3 directions, compact)

One message with three named directions and one question. Keep each direction to **5 short lines**:

```
**1. "<Name>"**: <feel, who it's for, in one line>
Type: <Display> + <Body> · Palette: <bg hex> / <text hex> / <accent hex> (light|dark)
Photos: <treatment> · Layout: <hero archetype + 1–2 signature sections> · Motion: <calm|crisp|bold>
Signature piece: <interaction, in a few words>
Best if: <one line>
```

Then: "**Which direction?** a) 1, b) 2, c) 3, d) mix (e.g. 1's fonts with 3's colors). **I'd pick <n>:** <why>.
Or tell me something else."

Rules for directions: real Google/self-hostable fonts; hex values that pass the contrast rules in
design-foundation; directions differ on fonts, palette, photo style, layout and signature piece; if there's a brand
kit, all three use it. **Sample palettes from the client's photos** (or kit) — do not offer "warm cream +
Fraunces/Newsreader + terracotta" (or rust/clay) as a default "premium / editorial" direction; that combo is a
generic AI tell unless their pictures actually look like that. Fonts should be chosen for the subject, not from
a preset list. Each direction names **one memorable element**. Full details go into `brief/material-board.md`
and `brief/brand.md` after Jake picks, not into the chat.

**Opt-in directions.** Do not offer Cormack (premium / editorial) or Thelen (playful / retro) as one of the
three default directions unless Jake asks, or the client clearly fits (a high-end custom builder with cinematic
photos; a personality-forward trade with a real retro or mascot identity). Those are skill options, used
selectively. The default three stay in the grounded band (see `design-foundation/grounded-references.md`).

### Hand-off

After E, write the choices into `intake.md` and move to `skills/brand-kit/SKILL.md`. That skill starts with a
**material board** (colors from their photos, fonts for the subject, one memorable element) *before* tokens.
It only stops if a brand kit has a real conflict. Then `skills/site-plan/SKILL.md`. Tell Jake: "Got it. I'll
put a material board together from their photos, then we'll walk the pages."

## Learn mode ("learn from their existing site")

Use this mode instead of the normal sequence when Jake says something like:
- "Learn as much as you can from their existing site and ask me any outlying questions"
- "Pull everything from <URL> and just ask what's missing"
- "Start from their current site"
- "Crawl their site and fill in what you can"
- "Use their website as the source"
(Also offer it as option a) in question A when a site is confirmed: "Learn everything from it and only ask what's missing".)

Steps:

1. **Confirm the URL once.** If Jake gave the URL, skip this. If you only have a search candidate, ask one
   question: "Is **<URL>** their site?" a) yes, b) no, it's <other>, c) they don't have one. Nothing is crawled or
   used before a yes.
2. **Full crawl** (same domain, respect robots.txt, up to ~150 pages):
   - Discover pages from `sitemap.xml` / `sitemap_index.xml`, `robots.txt` sitemap lines, header/footer nav, and
     internal links.
   - Always cover: home, about, contact, services (and each service page), gallery/portfolio/projects, reviews/
     testimonials, FAQ, areas, careers, blog index (titles only), privacy.
   - From every page: title, meta description, H1/H2s, body copy, JSON-LD schema (LocalBusiness fields, hours,
     geo, sameAs), Open Graph image.
   - Site-wide: logo (header img/SVG), favicon/apple-touch-icon, colors (computed styles of header, buttons, links,
     backgrounds; CSS custom properties), fonts (`font-family`, Google Fonts/Typekit links), footer (NAP, hours,
     license lines, copyright year, associations).
   - **Project and gallery harvest (required, not optional):** crawl every projects/portfolio/gallery index *and* every project, album, or lightbox-detail page you can reach without violating robots.txt (do not request `*?lightbox=` if robots disallows it — read the full-resolution media URLs already on the page instead). Download **every** photo and video poster at the **full-resolution original**, not a cropped srcset, not the first image only, not a single cover per project. On Wix, that is `https://static.wixstatic.com/media/{id}` without `/v1/fill` crop params; on other hosts, pick the largest untransformed source. Save to `brief/assets/projects/<slug>/` with a `manifest.json` per project (name, location, size, style, dates, description, photo credits, captions, alt, width, height, source URL). Log **per-project photo counts** (source vs downloaded) in `brief/sources.md` and in the "What I learned" summary. **This is a fail** if a project is later built with only one photo while the source had more.
   - Reviews/testimonials verbatim with name and page URL; embedded Google review widgets.
   - Social links, Google Business Profile / Maps links, BBB, Houzz, Nextdoor, Yelp links found **on the site**.
     Only follow those exact links; don't search for other profiles.
3. **Log everything** in `brief/sources.md`: value, URL, exact quote, date, and a confidence tag:
   - **high**: stated plainly and consistently (e.g. the same phone in header, footer and schema).
   - **low**: conflicting (two phone numbers), stale (copyright 2019, "serving since" with no year), vague
     ("decades of experience"), or likely to change (ratings, review counts, hours, promotions).
4. **Fill the files:** `brief/intake.md` (answers inferred from the site, each marked "from site, <URL>") and
   `src/data/site.ts` values for **high-confidence facts only**. Low-confidence items stay `null` and go on the gap list.
   Save assets to `brief/assets/`. Note old URLs for redirects.
5. **Send a short "What I learned" summary** (≤ 10 bullets, no wall of text): services, area, contact, proof found
   (reviews, licenses, years, as quoted), **per-project photo counts** (and any project that has only a cover),
   brand (logo quality, colors, fonts), what looks outdated. Link to `sources.md` for the details. End the same
   message with the **first gap question** (one only).
6. **Ask only the gaps and low-confidence items, one per message, most build-blocking first:**
   1. Keep the existing brand or refresh it? (decides brand kit + art direction)
   2. Work mix, if the site was unclear or looks outdated
   3. Main action (call / form / book / text), if the site doesn't make it clear
   4. Conflicting contact details (which phone/email is current?)
   5. Low-confidence proof that would show on Home (years, license, review numbers)
   6. Everything else only when a page needs it (site-plan rules)
   Each question uses the normal format (3–5 options, **I'd pick …** with a one-line why, "or tell me something else").
   Offer the site's own value as an option ("a) keep (423) … as on their contact page").
7. **Art direction:**
   - If Jake chooses to **keep the existing brand** (or a brand kit exists): skip the 3-direction pick. Send one
     message with the proposed treatment (their colors/fonts mapped to our foundation, plus a suggested layout and
     signature piece) and ask "Good, or want options?"
   - If **refresh**: send the normal 3 directions, with one marked **pre-suggested** that evolves the existing brand
     (keeps the logo's colors or feel), plus two that move further away.
8. Hand off to brand-kit (Path B, using the crawled brand) and site-plan as usual. Site-plan skips any question the
   crawl already answered with high confidence.

## Crawl (only after Jake confirms a site)

Use Playwright or fetch; stay on that domain; respect robots.txt; max ~40 pages. Save files to
`brief/assets/` and log every item in `sources.md` (value, URL, exact quote, date):

- Logo (prefer SVG; note low-res), service names, about copy, reviews (verbatim, with source), colors and fonts
  (computed styles), phone/email/address/hours, socials, licensing/years/area statements (exact sentence),
  page titles and URLs (for redirects).
- **Every project/gallery photo at full resolution**, with captions and project details, as in Learn mode's
  project and gallery harvest. One cover per project is a fail when the source has a gallery. Log counts.
- Record "Over 20 years of experience" exactly as written. Don't convert it to "Since 2004".

## What never happens in intake

- More than one question in a message, or a facts checklist.
- Crawling or using a site Jake hasn't confirmed, or recommending based on it.
- Naming a competitor without a URL in `sources.md`.
- Inventing a fact, review, team member, number, town list or license.
- Picking the art direction for Jake (unless he said "use your recommendations").
