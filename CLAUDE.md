# Half Byte Digital — site builder instructions

This repo (`halfbyte-sites`) builds custom websites for local service businesses around Chattanooga, TN.
Half Byte Digital is Jake and Cassie. Jake is the person you talk to.

These instructions apply **only inside this repo**. They are not global rules and have nothing to do with
Jake's day job (ACD). Never copy them into a global config, and never pull ACD material in here.

## The one-line start

Jake starts a site with something like:

> Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes

When you see a request like that, **do not start coding.** Run the workflow below from step 1, starting with
question A (existing website), alone.

## Workflow (always in this order)

| Step | Skill | Output file(s) | How Jake is involved |
|---|---|---|---|
| 1 | `skills/intake/SKILL.md` | `sites/<slug>/brief/intake.md`, `sources.md` | A short conversation, **one question per message**: A existing website → B brand kit → C1 work mix → E art direction. Or **learn mode**: crawl the confirmed site, summarize, ask only the gaps. |
| 2 | `skills/brand-kit/SKILL.md` | `brief/brand.md`, `src/styles/tokens.css` | Only asks if a brand kit has a real conflict (e.g. contrast fails). |
| 3 | `skills/site-plan/SKILL.md` | `brief/plan.md` | Shows the sitemap, then walks page by page, asking page-specific questions and facts **one at a time, only when that page needs them**. Ends with "Good to build?" |
| 4 | `skills/page-build/SKILL.md` | the Astro site in `sites/<slug>/` | Only if blocked (missing asset, account). |
| 5 | `skills/review/SKILL.md` | `brief/review/` screenshots + `review.md` checklist | Fix everything you can, then show Jake. |

`skills/design-foundation/SKILL.md` is not a step. It is the rulebook that applies to steps 2–5 all the time.
Read it before you write any CSS or markup.

### Conversation rules (intake, site-plan, and any question to Jake)

- **One question per message.** Never a list of questions or a facts checklist.
- **Just in time.** Ask only when the next step needs the answer; otherwise use the default and continue.
- Each question has **3–5 short lettered options**, **"I'd pick X:"** with a one-line why, and "Or tell me something else."
- **"use your recommendations"** → take the recommended picks for all remaining questions and move on; facts stay `null`.
- **Batching:** if Jake answers several things at once, record them all and ask only the next unanswered question.
- **Facts** (phone, license, years, team, area, reviews…) are asked only when a page/section needs them and default
  to `null` (hidden).
- Recommendations never rest on a site Jake hasn't confirmed. Never name a competitor unless it's in `sources.md` with a URL.
- **Learn mode** triggers: "learn as much as you can from their existing site and ask me any outlying questions",
  "pull everything from <URL> and just ask what's missing", "start from their current site", "crawl their site and
  fill in what you can", "use their website as the source".

## Non-negotiables (short version)

1. **No invented facts.** Years in business, license numbers, review counts, star ratings, acreage, team names,
   awards, warranties, prices, service radius: each one must come from Jake, the client, or a cited page.
   Otherwise it is `null` in `src/data/site.ts` and the component that shows it renders nothing.
2. **Brand kit wins.** If the client has a brand kit, use it exactly. Derive only what is missing.
3. **Every site looks custom.** Same foundation rules, different expression knobs and section archetypes.
   Do not copy another client's site as a starting point.
4. **Mobile first, fast, accessible.** WCAG AA, 44px+ touch targets (we use 52px buttons), reduced motion respected,
   performance budgets met.
5. **One signature interaction per site**, tied to the trade (like the slope dial on 316 Land Clearing).

## Stack

- Astro (static output), plain CSS with custom properties. No CSS framework, no UI kit.
- Hosting: Cloudflare Pages (`npm run build` → `dist/`).
- Forms: Resend (via a Cloudflare Pages Function) or GoHighLevel (embed or webhook). Ask in intake which one.
- Review: Playwright (headless Chromium) + the script in `scripts/review.mjs`.

## File map

```
CLAUDE.md                     ← you are here (entry point for Claude Code)
README.md                     ← plain-English guide for Jake
.cursor/rules/*.mdc           ← same content for Cursor (generated from skills/ by scripts/sync-rules.sh)
skills/
  intake/SKILL.md             ← one-question-at-a-time intake, learn mode, art directions
  intake/question-bank.md     ← reference menu of trade questions (10 trades + fallback), not a script
  design-foundation/SKILL.md  ← the "bare metal" rules + expression knobs + token contract
  brand-kit/SKILL.md          ← map a client kit to tokens, or generate one
  site-plan/SKILL.md          ← sitemap, extra-page questions, section outlines
  page-build/SKILL.md         ← how to build pages in Astro
  page-build/archetypes.md    ← section archetype library (pick per page so sites differ)
  page-build/signature-interactions.md ← one per trade
  review/SKILL.md             ← self-QA before Jake sees anything
templates/
  tokens.css                  ← token contract with placeholder values
  site.ts                     ← null-config pattern for facts
  intake-brief.md             ← shape of brief/intake.md
  sources.md                  ← shape of brief/sources.md
scripts/
  review.mjs                  ← Playwright screenshots + automated audits
  sync-rules.sh               ← regenerate .cursor/rules from skills/
sites/<client-slug>/          ← one Astro project per client (created in step 4)
  brief/                      ← intake.md, sources.md, brand.md, plan.md, assets/, review/
```

## How to talk to Jake

- Plain, direct language. Short paragraphs. No jargon without a one-line explanation.
- One question per message, multiple choice, with your pick and why. Always allow "something else."
- Keep messages short. Detail goes in the brief files, not the chat.
- When you are unsure of a fact, say so and leave it `null`. Never paper over it.
