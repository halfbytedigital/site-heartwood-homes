# Intake question bank (reference, not a script)

This is a menu, not a questionnaire. **Never send these as a list.** Ask one question per message, and only when
the step you're on needs the answer (see the conversation rules in `skills/intake/SKILL.md`).

How to use it:
- **Question 1 in each entry is the trade's "C1 work mix" question.** Intake asks it (one message) right after the
  brand kit question.
- **Every other question waits for the page or section it affects.** site-plan and page-build ask it when they reach
  that page, e.g. pricing stance when outlining Services/Contact, portfolio depth when deciding on project pages,
  emergency service when planning the hero and action bar, financing when deciding on a Financing page.
- **Facts** (license, years, team, area, warranty, ratings) are asked only when a section that shows them is being
  built. If Jake doesn't know, the value stays `null` and the section hides it.
- Options and recommendations here are starting points. Rewrite them in 3–5 short options for the actual message,
  and drop options already ruled out by earlier answers or confirmed sources.
- Recommendations come from Jake's answers, confirmed sources and general trade knowledge, never from an
  unconfirmed site. Don't name competitors unless they're in `sources.md` with a URL.

Licensing note: never state what license a trade "requires". Ask for the license types and numbers the client
actually holds, and show them only once confirmed (null until then).

Typical "ask when" triggers (any trade):

| Topic | Ask when planning/building |
|---|---|
| Main action (call / form / book / text) | the hero and mobile action bar (first page outline) |
| Pricing stance | Services or Pricing page, quote form fields |
| Emergency / hours | hero, header phone, action bar, Contact |
| Portfolio / photos available | Home "work" section, deciding on Portfolio/project pages |
| Process | the Process page or Home process section |
| Financing, maintenance plans, careers | deciding whether that page exists |
| Reviews source | the proof section (Home/About/Reviews) |
| Service area | Contact, footer, area pages, schema |
| Licenses, insured, years, warranty, team | the proof bar, About page, footer |
| Form destination (Resend / GoHighLevel) | building the quote form |

---

## 1. General contractor / custom home builder

**Buyer:** a homeowner or landowner spending six or seven figures, deciding over months. Trust, taste and
process matter more than speed.

Questions (reference)
1. **[C1 work mix]** What mix of work do they do? a) custom homes only, b) custom homes + major renovations/additions,
   c) mostly remodels, d) commercial too. *Rec: depends on the business; it decides the whole sitemap.*
2. Do they build on the client's lot, their own lots, or both? a) client's lot, b) own lots / spec homes,
   c) both. (If b or c: an "Available homes / lots" page.)
3. Typical project size? a) under $500k, b) $500k–$1M, c) $1M+, d) varies, prefer not to say.
   *Used only to set tone and filter leads. Never shown unless they say so.*
4. Pricing on the site? a) "Homes from $X" / price per sq ft range, b) no numbers, explain the process and
   budgeting instead, c) a budget question on the inquiry form. *Rec: c, because it filters leads without
   publishing numbers.*
5. Design services? a) in-house design/drafting, b) they work with the client's architect, c) both, d) they
   have stock plans to customize. (d → a plans gallery.)
6. How do they want leads? a) "Start your project" form with budget, timeline and lot status,
   b) book a consult call (calendar), c) phone first. *Rec: a + phone.*
7. Portfolio depth? a) 10+ finished homes with pro photos, b) a few, phone photos, c) mostly renderings.
   *Rec: if a, project pages per home (big SEO + trust win).*
8. Process story: do they have defined phases (consult → design → pricing → build → walkthrough)? Any
   client portal or build tracking app (Buildertrend, CoConstruct)?
9. Warranty offered? (type + length, or unknown → hidden)
10. Awards, associations (Home Builders Association of Greater Chattanooga, Parade of Homes entries, NAHB)?
11. Do they do land/lot help (finding land, site work, financing partners, construction loans)?

Facts (ask only when a section needs them; null until then): TN contractor license number(s) and classification; years building; number of homes built;
team (owner, PM, designer); service area towns/counties; warranty terms; review count/rating.

Usual pages: Home, Custom homes, Renovations (if b/c), Portfolio + project detail pages, Our process, About/team,
Reviews, Contact/start a project. Optional: Available homes/lots, Floor plans, Building on your lot, Financing
partners, FAQ, Careers, Trade partners.

Design cues: editorial and calm, big photography, generous whitespace, refined serif or modern grotesk,
warm naturals or deep neutrals. Signature ideas: finish/material explorer, floor-plan explorer, build timeline
scrubber, before/after for renovations.

---

## 2. Land clearing / forestry mulching

**Buyer:** a landowner, developer or HOA with overgrown acreage; often urgent (sale, build, fire risk).

Questions (reference)
1. **[C1 work mix]** Main services? a) forestry mulching, b) full clearing + hauling, c) lot clearing for builds, d) right-of-way /
   fence lines, e) stump grinding. (Multiple OK.)
2. Equipment angle: do they have a standout machine (steep-slope, remote, tracked)? *If yes, it becomes the hero
   story and maybe the signature interaction.*
3. Typical job size? a) under 1 acre, b) 1–10 acres, c) 10+ acres, d) mixed.
4. Pricing stance? a) per-acre range, b) by the day, c) free on-site quote only. *Rec: c, plus an estimator that
   shows time, not money.*
5. Service radius? a) county, b) ~50 miles, c) ~100 miles, d) other.
6. Leads: a) call, b) quote form with acreage + photos upload, c) text a photo. *Rec: b + call bar.*
7. Before/after photos available? a) lots, b) some, c) none yet.
8. Commercial/government work, or residential only?

Facts (ask only when a section needs them; null until then): equipment specs (max slope, cut diameter), insurance, years, acres cleared, radius, reviews.
Usual pages: Home, Services (+ per-service pages if 4+), Our machine/equipment, Where we serve, Gallery, About,
Contact. Design cues: rugged, high-contrast, dark base with one hot accent, condensed headings. Signature ideas:
slope dial, acreage/time estimator, overgrowth wipe, draw-your-lot map.

---

## 3. Roofing

**Buyer:** a homeowner with a leak or storm damage (urgent), or one planning a replacement (shopping around).
Insurance is often involved.

Questions (reference)
1. **[C1 work mix]** Mix? a) residential replacement, b) repairs, c) storm/insurance claims, d) commercial (TPO, metal), e) gutters/siding.
2. Materials? a) asphalt shingle, b) metal, c) tile/slate, d) flat/low-slope.
3. Manufacturer certifications (GAF, Owens Corning, CertainTeed tiers)? They're strong trust badges, so ask for exact tier.
4. Insurance help? a) they work directly with adjusters, b) the homeowner handles it, c) they don't advertise this.
5. Financing? a) yes, through <provider>, b) no.
6. Emergency/tarp service? a) 24/7, b) business hours, c) no. (a → a red "Emergency" CTA variant + call bar priority.)
7. Leads: a) free inspection form, b) call, c) instant estimate tool (satellite-measure type). *Rec: a + call.*
8. Warranties (workmanship length, manufacturer system warranties)?

Facts (ask only when a section needs them; null until then): license/insurance, certifications with tier, warranty terms, years, roofs installed, reviews, storm-chaser
concern (are they local? say so with proof, e.g. address and years). Pages: Home, Roof replacement, Repairs,
Storm damage & insurance, Commercial, Materials, Financing, Gallery, Reviews, About, Contact, Service area pages.
Design cues: confident, clean, trust-forward; blue/charcoal or bold red; strong photography of finished roofs.
Signature ideas: roof-pitch visualizer, shingle color picker on a house, storm checker ("Hail near you?" from
public NOAA data, only if reliable), roof-age self-check quiz.

---

## 4. HVAC

**Buyer:** someone with no heat/AC (urgent) or someone planning a replacement or maintenance plan.

Questions (reference)
1. **[C1 work mix]** Mix? a) repair, b) replacement/installs, c) maintenance plans, d) commercial, e) indoor air quality, f) ductwork.
2. Emergency service? a) 24/7, b) extended hours, c) business hours.
3. Brands installed / dealer status (Trane, Carrier, Lennox, etc.)?
4. Maintenance plan / membership? a) yes (name, price?), b) no. (a → plan comparison section.)
5. Financing? a) yes (provider), b) no.
6. Pricing stance? a) flat-rate diagnostic fee shown, b) no prices, c) "starting at" for tune-ups.
7. Leads: a) call, b) online booking (ServiceTitan/Housecall Pro widget?), c) request form. *Rec: whatever their
   dispatch tool supports + call bar.*
8. Rebates (TVA EnergyRight, manufacturer)? Only if they actually process them.

Facts (ask only when a section needs them; null until then): license numbers, EPA certification, dealer status, years, trucks/techs, service area, guarantees.
Pages: Home, Heating, Cooling, Maintenance plans, IAQ, Commercial, Financing, Specials (only if real), About,
Reviews, Service areas, Contact. Design cues: clean, bright, fast; blue + warm accent or a fresh brand color;
friendly icons, tech photos. Signature ideas: "What's that noise?" symptom checker, system age/efficiency
estimator, comfort-zone thermostat slider.

---

## 5. Plumbing

**Buyer:** often urgent (leak, no hot water, clog). Next most common: water heater and remodel plumbing.

Questions (reference)
1. **[C1 work mix]** Mix? a) service/repair, b) water heaters (tank/tankless), c) drain/sewer (camera, hydro-jetting), d) remodel/new
   construction, e) commercial, f) water treatment.
2. Emergency? a) 24/7, b) extended, c) business hours.
3. Pricing: a) upfront flat-rate pricing (mention it), b) no prices, c) show a dispatch/trip fee.
4. Leads: a) call, b) book online, c) text. *Rec: call-first hero + call bar.*
5. Guarantees (satisfaction, on-time)? Only real ones.
6. Do they want a "Is this an emergency?" helper (shut-off valve guide)?

Facts (ask only when a section needs them; null until then): license numbers (state/local), insurance, years, techs, area, reviews. Pages: Home, Services (+ water heaters,
drains, sewer), Emergency, Commercial, About, Reviews, Service areas, Contact. Design cues: trustworthy, clear,
high-legibility; navy/teal + bright accent; real tech + truck photos. Signature ideas: emergency shut-off guide
stepper, water-heater sizing helper, "How old is your water heater?" serial decoder (only if reliable).

---

## 6. Landscaping / lawn care / hardscaping

**Buyer:** design-build homeowners (bigger, visual) or recurring maintenance customers (price + reliability).

Questions (reference)
1. **[C1 work mix]** Mix? a) design-build (patios, walls, outdoor living), b) installs (plants, sod, irrigation), c) recurring lawn
   maintenance, d) commercial grounds, e) lighting, f) drainage.
2. Which is the priority to grow? *This decides the hero.*
3. Maintenance plans/tiers? a) yes, b) no.
4. Design service: a) 3D renderings, b) sketches, c) on-site only.
5. Season: year-round work or seasonal (leaf, snow)?
6. Portfolio: a) lots of pro photos, b) phone photos, c) few.
7. Leads: a) design consult form, b) quote form for maintenance with property size, c) call.

Facts (ask only when a section needs them; null until then): licenses (pesticide applicator if they spray), certifications (ICPI/NCMA for pavers), years, crew size, area.
Pages: Home, Design & build, Hardscapes, Maintenance, Lighting, Portfolio, Process, About, Contact, Service areas.
Design cues: organic, lush photography, earthy palette or crisp modern greens; soft radius. Signature ideas:
season slider (same yard spring → winter), before/after wipe, patio material picker.

---

## 7. Electrician

**Buyer:** urgent repair, panel/EV charger/generator upgrade, or remodel/new construction.

Questions (reference)
1. **[C1 work mix]** Mix? a) service/repair, b) panel upgrades, c) EV chargers, d) generators (Generac dealer?), e) lighting,
   f) new construction/remodel, g) commercial/industrial.
2. Emergency? a) 24/7, b) extended, c) business hours.
3. Any dealer/installer certifications (Generac, Tesla, ChargePoint)?
4. Leads: a) call, b) form, c) book online.
5. Pricing stance? a) none, b) "starting at" for common jobs (EV charger install), c) free estimates.

Facts (ask only when a section needs them; null until then): license numbers and classification, insurance, years, team, area. Pages: Home, Residential, Commercial,
EV chargers, Generators, Panel upgrades, About, Reviews, Service areas, Contact. Design cues: crisp, technical,
high contrast; electric accent (yellow, cyan) on dark or bright white. Signature ideas: home load / panel capacity
helper, EV charging time calculator, generator sizing helper.

---

## 8. Cleaning (house / commercial / move-out)

**Buyer:** busy households wanting recurring cleaning (price + trust + easy booking), offices, property managers.

Questions (reference)
1. **[C1 work mix]** Mix? a) recurring residential, b) deep/one-time, c) move-in/move-out, d) commercial/office, e) post-construction,
   f) Airbnb turnovers.
2. Pricing: a) show prices by bedrooms/bathrooms, b) "starting at", c) quote only. *Rec: a or b if they're
   comfortable, because this trade converts on price clarity.*
3. Booking: a) online booking (Launch27/BookingKoala/Jobber widget?), b) quote form, c) call/text.
4. Products: eco/pet-safe? Do they bring supplies?
5. Trust items: background-checked staff, bonded/insured, satisfaction guarantee (only real ones).
6. Team-facing: do they also need a "Join our team" hiring page? (Common and important for cleaning.)

Facts (ask only when a section needs them; null until then): insured/bonded, years, team size, guarantee terms, area. Pages: Home, Services (Recurring, Deep, Move-out,
Commercial), Pricing, How it works, About, Reviews, Careers, Contact/Book. Design cues: fresh, bright, friendly;
airy layouts, soft radius, light palette with one cheerful accent. Signature ideas: instant price estimator
(only with real prices), "Clean checklist" room-by-room explorer, frequency savings toggle.

---

## 9. Tree service / stump grinding

**Buyer:** a homeowner with a dangerous tree or a stump to remove, or storm cleanup. Urgent and price-sensitive.

Questions (reference)
1. **[C1 work mix]** Mix? a) removal, b) trimming/pruning, c) stump grinding, d) storm/emergency, e) land clearing, f) firewood/mulch.
2. Certified arborist on staff (ISA number)? Only shown if confirmed.
3. Pricing: a) stump grinding per-stump/per-inch pricing shown, b) free quotes only.
4. Emergency service? a) 24/7, b) no.
5. Leads: a) "text us a photo", b) quote form with photo upload, c) call. *Rec: a + b.*
6. Insurance proof: will they show they're insured (big trust item in this trade)?

Facts (ask only when a section needs them; null until then): insurance, ISA cert, years, area, equipment. Pages: Home, Tree removal, Trimming, Stump grinding, Storm
cleanup, Gallery, About, Reviews, Contact. Design cues: grounded, outdoorsy, bold; green or orange accents.
Signature ideas: stump-size price/time helper (time only unless real prices), "Is my tree dangerous?" checklist,
before/after wipe.

---

## 10. Painting (interior / exterior / cabinets)

**Buyer:** homeowners wanting a refresh, color guidance, and a clean, respectful crew.

Questions (reference)
1. **[C1 work mix]** Mix? a) interior, b) exterior, c) cabinets, d) commercial, e) decks/staining, f) drywall repair.
2. Color help? a) they offer color consults, b) they partner with Sherwin-Williams/Benjamin Moore, c) no.
3. Pricing: a) room-based "starting at", b) quote only.
4. Warranty terms (years on workmanship)?
5. Leads: a) estimate form with photos, b) call, c) book an estimate visit.

Facts (ask only when a section needs them; null until then): license/insurance, warranty, years, crew, area. Pages: Home, Interior, Exterior, Cabinets, Gallery, Process,
About, Reviews, Contact. Design cues: color-confident, gallery-led, clean grid. Signature ideas: room color
visualizer (swap wall color on a photo), cabinet before/after, paint quantity helper.

---

## Generic fallback (any other trade or practice)

Use when nothing above fits (dentist, salon, auto repair, law office, pet groomer…). Adapt the wording to the trade.

1. **[C1 work mix]** What does the business sell, ranked by what they most want more of?
2. Who is the ideal customer? (homeowners, businesses, families, seniors, patients…)
3. What is the main action? a) call, b) book online (which system?), c) form, d) visit in person (map + hours).
4. Is it urgent-need or planned? (Urgent → call-first hero + call bar. Planned → proof + process + form.)
5. Pricing stance? a) show prices, b) "starting at", c) none.
6. Why them over competitors, in their words? (Ask Jake for one sentence from the owner, when writing the Home hero/About.)
7. Proof available: reviews, photos of real work/space/team, certifications, awards, years.
8. Regulated? (Health care: no outcome promises, privacy-safe forms, no patient photos without consent.
   Legal/financial: required disclaimers.) Ask what the client's rules are.
9. Booking/integration tools they already use (Calendly, Square, Vagaro, Jobber, ServiceTitan, GoHighLevel).
10. Physical location customers visit, or service-area only?

Design cues: derive from audience. Calm/clinical for health, warm for family services, bold for automotive.
Signature ideas: pick from page-build/signature-interactions.md "any trade" list.
