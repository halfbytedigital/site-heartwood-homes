# Example: what intake replies to the Heartwood Homes prompt

**Jake's prompt:**

> Let's build a website for a general contractor/custom home builder based in Chattanooga, TN called Heartwood Homes

**What the agent did before replying:** matched the trade to two question-bank entries (General contractor + Custom
home builder), created `sites/heartwood-homes/brief/intake.md`, and treated everything about Heartwood Homes as
unknown. In a live run it also does a quick search for an existing site or Google profile and, if it finds a likely
match, shows it under question A for Jake to confirm. Nothing from an unconfirmed match gets used. This example
assumes nothing was confirmed, so it contains **no facts about Heartwood Homes**. Everything below is a question,
a choice, or a design proposal.

---

## The agent's reply

Before I build anything, I need a few answers so the first draft is close to right. Reply as short as you like,
e.g. "1b, 2a, 3c…". Anything you don't know is fine: unknown facts stay hidden on the site until confirmed.

### A. What already exists

**1. Does Heartwood Homes have a website now?**
a) Yes: send the URL. I'll pull the logo, photos, service list, project info, reviews, colors, fonts, contact
   details and socials, list where each came from, and set up redirects so they keep their Google rankings.
b) No website.
c) Only a Facebook / Google Business / Houzz page: send the link and I'll pull what's public.
**Recommended:** if there's anything at all (even a Facebook page), send it. Real photos and reviews beat anything I can write.

**2. Is there a brand kit?**
a) Full kit (logo files, colors, fonts, guidelines PDF): send it, and I'll follow it exactly.
b) Just a logo: I'll build colors and fonts around it.
c) Nothing: pick one of the art directions below.
**Recommended:** a or b if they exist. If the logo is only a low-res image, send it anyway and I'll flag it.

### B. The business

**3. What mix of work do they do?**
a) Custom homes only
b) Custom homes + major renovations/additions
c) Mostly remodeling, some new builds
d) Residential + light commercial
**Recommended:** ask them. This decides whether Renovations gets its own page.

**4. Where do they build?**
a) On the client's land
b) On their own lots (spec homes for sale)
c) Both
**If b or c:** I'll add an "Available homes & lots" page.

**5. Design services?**
a) In-house design/drafting
b) They work with the client's architect
c) Both
d) They have a library of plans clients can customize (→ a Floor plans page)

**6. Price on the site?**
a) Show a range ("homes from $X" or a per-sq-ft range)
b) No numbers; explain how budgeting works in the Process page
c) No numbers, but ask for budget range on the inquiry form
**Recommended:** c. It filters out mismatched leads without publishing prices they may not want competitors to see.

**7. What's the main thing a visitor should do?**
a) "Start your project" form (project type, lot status, timeline, budget range, optional photos/plans)
b) Book a consult call on a calendar
c) Call
**Recommended:** a as the main button, with the phone number always visible. Custom-home buyers usually research
before they call, so a good form catches them at the right moment.

**8. Who's the ideal client?**
a) First-time custom builders who need hand-holding through the process
b) Move-up families who've built or remodeled before
c) Luxury/second-home buyers (mountain or lake properties)
d) A mix
**Recommended:** pick the one they most want more of. The copy and photos lean toward that buyer.

### C. Proof

**9. How many finished projects can we show?**
a) 10+ with professional photos → a page for each project (best for trust and Google)
b) A handful, mostly phone photos → one strong gallery
c) Mostly renderings / in progress → a "Current builds" feature
d) Not sure
**Recommended:** if a, we'll do project pages. If b, a photo shoot of 2–3 homes before launch would pay for itself.

**10. Do they have a defined process** (e.g. consult → design → pricing → build → walkthrough), or use a client
portal like Buildertrend or CoConstruct?
a) Yes, defined steps (send them or I'll draft from a call)
b) Informal, so we'll write one with them
c) Portal too (I'll mention it on the Process page)

**11. Reviews:** where do their reviews live?
a) Google  b) Houzz  c) Facebook  d) Written testimonials they can send  e) None yet
**Note:** I'll only use reviews word for word, with the source.

**12. Warranty, associations, awards?** (e.g. a written warranty, Home Builders Association membership,
Parade of Homes entries). List what's real; anything unconfirmed stays off the site.

### D. Look and feel

**13. Pick an art direction** (details below): 1, 2, 3, mix two ("1's fonts with 2's colors"), or describe something else.

### E. Facts checklist (fill in what you know, "unknown" is fine)

- Phone (and can customers text it?):
- Email for form leads:
- Public office address, or service-area only:
- Hours:
- Year founded:
- TN contractor license number(s) and classification:
- Insured / bonded:
- Owner name(s) and anyone else who should be on the About page (photos?):
- Towns/counties they build in:
- Google Business Profile link:
- Social links:
- Forms: Resend (email to them) or GoHighLevel? If GHL, which account?
- Domain (have one, or need one?):

### F. Anything else

- Pages you already know you want (financing partners, careers, trade partners, FAQ)?
- Any builder sites they love or hate?

**What happens next:** I set up the brand colors and fonts → send you a page plan with an outline of every page
for approval → build → screenshot and self-check every page on desktop and phone → show you the result.

---

## Art directions

### Direction 1: "Timber & Hearthstone" *(Recommended)*
Warm, editorial and personal. It reads like a craftsman who cares about every joint, aimed at families building
their one big home.

- **Type:** Fraunces (headings, soft serif, sentence case) + Public Sans (body).
- **Palette (light):** linen bg `#F7F3EC`, surface `#EDE5D8`, walnut text `#2A211B`, muted `#6B5D52`,
  cedar accent `#8A4B2A` (white button text 6.7:1). All pairs pass AA.
- **Imagery:** warm golden-hour grade, material close-ups (wood grain, stone, trim details), people on porches.
  Photos framed with a thin offset border.
- **Layout rhythm:** H2 split hero (photo bleeding off the right edge) → S4 alternating service rows →
  W5 feature project → R2 vertical process timeline → P3 big quote. Airy density, 4px corners.
- **Motion:** calm (soft fades, 600ms, nothing flashy).
- **Signature interaction:** **Build timeline scrubber.** Drag through one real project from bare lot to
  move-in, with a photo per phase. Needs a phase-by-phase photo set from one build.
- **Best if:** they're relationship-driven and their homes are traditional/craftsman. Works even with a modest photo library.
- **Watch out:** can feel too cozy if their work is sleek and modern.

### Direction 2: "Mountain Modern"
Crisp, architectural and confident, aimed at buyers who want clean lines, big glass and a builder who runs a tight ship.

- **Type:** Archivo (headings, semi-expanded, bold, small uppercase labels) + IBM Plex Sans (body).
- **Palette (light, cool):** white bg `#FFFFFF`, surface `#F2F4F3`, slate text `#15191C`, muted `#5A6268`,
  spruce accent `#2F5D50` (white text 7.5:1), brass `#C8A165` for thin rules and details only (not text on white).
- **Imagery:** natural daylight, true-to-life color, wide architectural shots and strong verticals. Full-bleed with
  no borders.
- **Layout rhythm:** H4 type-led hero (big headline + one large framed photo) → S2 numbered services with dividers →
  W2 project grid with filter chips (the only control on that gallery) → R1 steps row → C2 CTA card.
  Balanced density, 0px corners (sharp).
- **Motion:** crisp (short 320ms slides, staggered card reveals).
- **Signature interaction:** **Finish explorer.** Pick a style (e.g. modern farmhouse / mountain contemporary /
  classic craftsman) and the same home swaps siding, roof and trim colors. Uses their real finish options, or a
  generic set they approve.
- **Best if:** their portfolio is contemporary, or they want to stand out from the sea of rustic builder sites.
- **Watch out:** needs good architectural photos; phone snapshots look weak in this layout.

### Direction 3: "Ember & Dusk"
Dark, moody and premium, aimed at higher-end and second-home buyers. It feels like pulling up to a lit house at twilight.

- **Type:** DM Serif Display (headings, large, high contrast) + DM Sans (body).
- **Palette (dark):** charcoal bg `#161412`, surface `#221F1C`, warm white text `#F3EEE7`, muted `#B9B0A4`,
  ember accent `#D08A4E` (dark button text 6.5:1). All pairs pass AA.
- **Imagery:** dusk exteriors with warm lit windows, interiors at night, fireplaces. Full-bleed with a subtle film grain.
- **Layout rhythm:** H1 full-bleed hero with scrim (or H6 short video loop if they have footage) → A5 owner letter →
  W4 horizontal project rail (arrows only, hidden scrollbar) → R2 timeline → C3 big closing CTA.
  Airy, 2px corners.
- **Motion:** bold (one hero moment: headline rises as the image settles; everything else calm).
- **Signature interaction:** **Day-to-dusk slider.** Drag across a finished home photographed in daylight and at
  dusk. Needs a matched photo pair from the same tripod spot.
- **Best if:** their homes are high-end and they have (or will pay for) professional twilight photography.
- **Watch out:** dark sites need excellent photos and can feel less approachable to first-time builders.

**Why I recommend Direction 1:** it fits the widest range of custom-home buyers and holds up even if the photo
library is thin at launch. If the portfolio turns out to be modern, I'd switch to Direction 2.
