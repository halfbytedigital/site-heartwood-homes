# Example: the first few turns of intake

Two sample conversations for the same prompt. Nothing here is a real fact about Heartwood Homes. Anything that would
come from a real crawl is shown as `‹placeholder›`.

---

## Mode 1: normal intake (one question at a time)

**Jake:**
> Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes

**Agent (turn 1, question A):**
> Before I design anything, a few quick questions, one at a time.
>
> **Does Heartwood Homes have a website now?**
> a) Yes, here's the URL, so learn everything from it and only ask what's missing
> b) Yes, but only pull the logo, photos and reviews
> c) No website
> d) Only a Facebook / Google / Houzz page
> **I'd pick a** if there's anything at all: their real photos and reviews beat anything I'd write.
> Or tell me something else.

*(If the agent's quick search had turned up a likely match, turn 1 would instead be "I found ‹URL›. Is that
Heartwood Homes?" It doesn't open or use the site until Jake says yes.)*

**Jake:**
> c, and no brand kit either

**Agent (turn 2):** *(Jake batched B, so it's skipped; next unanswered question is C1)*
> Got it: no site, no brand kit. I'll design the look from scratch.
>
> **What mix of work does Heartwood do?**
> a) Custom homes only
> b) Custom homes + major renovations/additions
> c) Mostly remodels, some new builds
> d) Residential + light commercial
> **I'd pick b** if they take on renovations at all: it's a second set of leads and its own page.
> Or tell me something else.

**Jake:**
> a

**Agent (turn 3, art direction E):**
> Three directions for a custom-home builder:
>
> **1. "Timber & Hearthstone"**: warm, editorial, personal; for families building their one big home
> Type: Fraunces + Public Sans · Palette: `#F7F3EC` / `#2A211B` / `#8A4B2A` (light)
> Photos: warm golden-hour, thin offset frame · Layout: split hero, alternating service rows, feature project · Motion: calm
> Signature piece: build timeline scrubber (bare lot → move-in)
> Best if: traditional/craftsman homes; holds up with a modest photo library
>
> **2. "Mountain Modern"**: crisp, architectural, confident
> Type: Archivo + IBM Plex Sans · Palette: `#FFFFFF` / `#15191C` / `#2F5D50` (light)
> Photos: true-color daylight, full-bleed · Layout: type-led hero, numbered services, filterable project grid · Motion: crisp
> Signature piece: finish explorer (swap siding/roof/trim on one home)
> Best if: contemporary portfolio with good architectural photos
>
> **3. "Ember & Dusk"**: dark, moody, premium
> Type: DM Serif Display + DM Sans · Palette: `#161412` / `#F3EEE7` / `#D08A4E` (dark)
> Photos: twilight exteriors, lit windows, subtle grain · Layout: full-bleed hero, owner letter, project rail · Motion: bold
> Signature piece: day-to-dusk slider on a finished home
> Best if: high-end homes with professional twilight photos
>
> **Which direction?**
> a) 1  b) 2  c) 3  d) Mix (e.g. 1's fonts with 3's colors)
> **I'd pick a:** it fits the widest range of custom-home buyers and works even if photos are thin at launch.
> Or tell me something else.

**Jake:**
> use your recommendations

**Agent:**
> Going with Timber & Hearthstone and my picks for the rest. Setting up colors and fonts now, then I'll show you the
> page list. Facts like phone, license and years stay hidden until you have them.

*(Later, in site-plan, a fact gets asked only when its section comes up, e.g. while outlining the Home hero:
"The mobile bar can show Call and Text. **What's their phone number?** a) tell me, b) unknown, so show only 'Start your
project' for now, c) form only, no phone on the site. **I'd pick b** until you have it. Or tell me something else.")*

---

## Mode 2: learn mode (learn from their existing site)

**Jake:**
> Let's build a website for Heartwood Homes, a custom home builder in Chattanooga. Learn as much as you can from their existing site and ask me any outlying questions.

**Agent (turn 1, confirm URL once):**
> **Is ‹candidate URL› their site?**
> a) Yes
> b) No, it's a different URL (send it)
> c) They don't have one
> **I'd pick a** only if it's clearly them; I won't touch it until you confirm.
> Or tell me something else.

*(If Jake had included the URL in his first message, this turn is skipped.)*

**Jake:**
> a

**Agent (turn 2, after crawling the whole site; "What I learned" + first gap question):**
> I read ‹N› pages. Everything below is logged with its URL and the exact quote in `sources.md`.
>
> **What I learned**
> - Services: ‹as listed on their services page›
> - Area: ‹exact wording from footer/about›
> - Contact: ‹phone› (header, footer and schema agree: high confidence), ‹email›
> - Proof: ‹N› testimonials (verbatim), ‹license line as written in footer›
> - Experience: "‹exact quote›" (vague, so I'll ask before showing a number)
> - Photos: ‹N› usable at full size, ‹N› look like stock
> - Brand: ‹logo format/quality›, colors ‹hex›/‹hex›, fonts ‹name›
> - Looks outdated: ‹e.g. copyright year, broken gallery›
>
> First gap, since it decides the whole look:
>
> **Keep their current brand, or refresh it?**
> a) Keep: same logo, colors and fonts, on our new layout
> b) Light refresh: keep the logo, update colors/fonts to match it
> c) Full refresh: new look (the logo stays unless they want a new one)
> **I'd pick b:** ‹one-line reason based on what was found, e.g. the logo is solid but the fonts are dated›.
> Or tell me something else.

**Jake:**
> b

**Agent (turn 3, art direction, pre-suggested from the existing brand):**
> Three directions. **#1 is pre-suggested** because it keeps their logo's ‹color/feel›:
>
> **1. "‹Name›" (evolves their brand)**: ‹feel›
> Type: ‹…› · Palette: ‹their logo color as accent› / ‹…› · Photos/Layout/Motion: ‹…›
> Signature piece: ‹…› · Best if: they want continuity with what customers already know
>
> **2. "‹Name›"** ‹…›  **3. "‹Name›"** ‹…›
>
> **Which direction?** a) 1  b) 2  c) 3  d) Mix
> **I'd pick a:** it updates the look without making past customers wonder if it's the same company.
> Or tell me something else.

*(After this, the agent asks the remaining gaps one at a time, most build-blocking first: work mix only if the site
was unclear, main action, conflicting contact details, the vague years-in-business line. Then it moves on to the page
plan. Anything Jake doesn't know stays hidden.)*
