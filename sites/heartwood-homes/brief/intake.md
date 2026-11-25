# Intake — Heartwood Homes

- Slug: heartwood-homes
- Date started: 2026-11-24
- Prompt (verbatim): "Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes"
- Trade(s) matched: General contractor / custom home builder (question bank §1)
- Location: Chattanooga, TN
- Mode: learn (Jake picked A on 2026-11-24: learn everything from https://www.heartwoodchatt.com/)

## Unconfirmed candidates (do not use until Jake says yes)

- Existing site: https://www.heartwoodchatt.com/ — confirmed by Jake, 2026-11-24. Crawled. See sources.md.
- Off-site profiles found in search before confirmation were not opened and are not sources.

## Conversation log (one question per message)

| # | Step | Question | Recommended | Answer |
|---|---|---|---|---|
| 1 | A | Is https://www.heartwoodchatt.com/ Heartwood Homes? | a) yes, learn mode | a) learn mode. Jake, 2026-11-24 |
| 2 | gap: brand | Keep the current brand, or refresh it? | b) refresh, keep the logo | b) refresh, keep the logo. Jake, 2026-11-24 |
| 3 | E | Which direction? | 1 Clear Mark | b) Heartwood. Jake, 2026-11-24. Then narrowed: custom homes lead; landwork is one homepage section and a Site Prep & Landwork page; scrubber is the home's story, land is chapter one. |
| 4 | sitemap | Does this page list look right? | a) yes, go page by page | a) yes. Jake, 2026-11-24 |
| 5 | Home | How should people start? | a) form + phone | a) Start your project form, phone stays on every page. Jake, 2026-11-24 |
| 6 | Home | Can we use the photos on the current site? | a) yes | a) yes, including credited ones. Jake, 2026-11-24. Keep the photographer credit the old page already printed. |
| 7 | Home | Which house does the scrubber follow? | a) Ten Mile Lake House | a) Ten Mile Lake House. Jake, 2026-11-24 |
| 8 | Services | Should prices appear? | a) no public prices; form asks budget | a) no public prices, form asks budget, and explain how a budget gets built. Jake, 2026-11-24 |
| 9 | Contact | Where should the form go? | a) Resend to info@heartwoodchatt.com | d) unset for now. Lean GoHighLevel, and recommend that to the client. Jake, 2026-11-24 |
| 10 | Contact | Public street address? | a) no, service area only | a) service area only. Jake, 2026-11-24 |
| 11 | Contact | What area do we name? | a) Chattanooga only | a) Chattanooga only, until a town list exists. Jake, 2026-11-24 |
| 12 | Contact | What hours should the site show? | a) hide them | a) hide hours. Jake, 2026-11-24 |
| 13 | Projects | Which projects get a page? | a) all distinct named projects, custom homes first | a) all distinct jobs, and the index should be an interactive rail with modals. Jake, 2026-11-24. Then he asked if the 15 URLs are needed. |
| 14 | Projects | Modals only, or one shared template with a URL per house? | b) one template, a URL per house | b) one template, a URL per house, and make the rail very interactive. Jake, 2026-11-24. Google panel confirmed via https://share.google/SsjDUDZkBvGfsEk5P |
| 15 | Reviews | What should the site do with reviews for now? | a) 5.0 and 19, link only | a) 5.0 and 19, linked to https://www.google.com/search?q=Heartwood+Homes%2C+LLC+Chattanooga+TN. Full text later. Jake, 2026-11-24 |

## Learn mode: what I learned

- Three pages only: Home, Services, Projects. Contact is a form on each page. No about, FAQ, privacy, or blog.
- Work on the site: residential and commercial new construction, in-house remodeling, excavation and land clearing, septic, plus decks, fences, and finish trades. Design-build is listed.
- Founded by Daniel and Laura Hertgers in 2017. Logo says Est. 2017, Chattanooga, TN. Family-owned.
- Phone (423) 994-4911 and info@heartwoodchatt.com on every page. Call Now dials 123-456-7890. No address or hours.
- No reviews on the site. "Licensed" is stated for GC and septic, with no license number. Footer still says © 2021.
- About 16 named projects and 4 videos. 124 photos are large enough to use. Several are credited to photographers.
- Look: black hammer logo, white header, steel-blue buttons (#5990CF), Raleway headings. Hero slides all say "Complete Remodeling". Meta description spells it "quailty".
- Facebook and Instagram are linked. No Google review link on the site.

Details: `sites/heartwood-homes/brief/sources.md`.

## Gaps and low-confidence items (ask one at a time, most build-blocking first)

| Priority | Item | Why it matters | Current value / confidence |
|---|---|---|---|
| 1 | Keep brand or refresh | Decides colors, type, and art direction | Current look is a Wix template around a real logo |
| 2 | Work mix | Answered. Custom homes lead. Landwork is supporting, with its own page. Renovations stay in the draft sitemap because the old site shows them. | Jake, 2026-11-24 |
| 3 | Main action | Call button is a fake number. Form exists; destination unknown. | Displayed phone is real. tel:123-456-7890 is not. |
| 4 | Photo rights | Several galleries credit photographers by name. | Do not reuse until Jake says the photos are theirs to use. |
| 5 | License number | Home would show it if we have it. | "Licensed" only. Number null. |
| 6 | Address, hours, service-area towns, warranty length, Google reviews | Hidden until a page needs them | null |

## Confirmed facts

| Field (site.ts) | Value | Source |
|---|---|---|
| name | Heartwood Homes | Jake, 2026-11-24; site home |
| legalName | Heartwood Homes, LLC | site home, 2026-11-24 |
| trade | General contractor / custom home builder | Jake, 2026-11-24 |
| location | Chattanooga, TN | Jake, 2026-11-24; "Chattanooga-based" on the home page |
| phone | (423) 994-4911 | site contact block, all three pages |
| email | info@heartwoodchatt.com | site contact block |
| yearFounded | 2017 | About sentence and logo |
| team | Daniel Hertgers, Founder; Laura Hertgers, Founder | "Founded by Daniel and Laura Hertgers" |
| socials.facebook | https://www.facebook.com/HeartwoodHomesChatt | home footer |
| socials.instagram | https://www.instagram.com/heartwoodhomeschatt/ | home footer |

## Unknown → null (hidden until confirmed)

- address, hours, areaServed, license number, insured, warranty terms, Google profile, review counts, form destination, text messaging, new domain

## Chosen art direction

**Heartwood.** Refresh, keep the black logo. Fraunces + Outfit. Cream `#F3EEE4`, ink `#1C1915`, forest `#2C4A3A`. Split hero of a finished custom home. Signature: lot-to-finish scrubber (cleared lot, foundation, frame, finished home).

Jake, 2026-11-24: custom homes lead every page. Landwork is supporting. Homepage section title "We start with the land, too". Own page: Site Prep & Landwork. Not the hero.

## Open items

- Plan is ready for a yes or a change. See brief/plan.md.
- Do not publish the Call Now placeholder number.
- Do not turn project towns into a service-area list.
- Redirect targets wait on the sitemap.
