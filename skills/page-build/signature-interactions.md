# Signature interactions

One per site. It should make the site feel custom, show off something true about the business, and end in a lead.
All follow page-build Step 4 (default final state, native controls, reduced motion, touch scrolling, ≤ 30KB, null math → CTA).

**Prominence (non-negotiable).** Build it for the first run, not as a follow-up. Place it on Home, in the hero (H7)
or as the first content section (T3), full container width or full-bleed. Someone who only sees the first screen
and one scroll should still find it. If a photo set isn't confirmed yet, ship a labeled, beautiful frame with the
phases/copy in place and swap photos the moment they arrive — don't omit the interaction.

**Visual and interaction bar.** It has to feel like a feature: large type or a large visual, a tactile native
control (`<input type="range">` or clearly labeled buttons), a live result or label, and a next-step CTA. Hover,
keyboard, and touch all work. Phase/message changes use `aria-live="polite"` and don't fire on every pixel.
On touch, only the control surface uses `touch-action: none` so the page still scrolls.

| Trade | Idea | What it does | Data it needs (null until confirmed) |
|---|---|---|---|
| Land clearing | **Slope dial** (316) | Drag a gauge 0–75°; machine tilts; range messages; past max → "call us" | Max working slope |
| Land clearing | Acreage estimator | Acres + brush density + terrain → "about X–Y days" | Acres/day by density, slope factor |
| Land clearing | Overgrowth wipe | Hero wipes from overgrown to cleared, once per session | Before/after photo pair |
| GC / home builder | **Finish explorer** | Pick a style (e.g. modern farmhouse / mountain craftsman) and swap exterior materials/colors on one home photo or illustration | Client's real finish options or approved generic set |
| GC / home builder | Floor-plan explorer | Toggle rooms/options on a plan (bonus room, porch); show sq ft | Real plans + sq ft |
| GC / home builder | **Build timeline scrubber** (lot-to-finish) | Full-width scrubber: drag (range input) through phases of a real project (cleared lot → foundation → frame → finished home, or the client's real phases). Large photos crossfade or wipe; phase label + short line; optional peek of adjacent phases. Keyboard and touch. Ends with "Start your project" carrying the phase into the form. | Real project photo set + phase names (placeholder frames until photos arrive) |
| Remodeler | Before/after wipe | Accessible range-input wipe on real projects | Real pairs |
| Roofing | Roof-pitch visualizer | Drag pitch 3/12–12/12; house silhouette changes; walkable vs. steep notes | Which pitches they handle |
| Roofing | Shingle color picker | Swap shingle color on a house image | Manufacturer color names they install |
| Roofing | Storm checker | Show recent hail/wind reports near a ZIP from public NOAA/NWS data | Reliable public API (verify before building) |
| HVAC | "What's that noise?" checker | Pick a symptom → likely cause + "safe to wait or call now" + CTA | Client-approved symptom list |
| HVAC | System age check | Enter install year → age band message + tune-up/replacement CTA | Client-approved bands |
| Plumbing | Shut-off stepper | Step-by-step emergency guide with the call button pinned | Client-approved steps |
| Landscaping | Season slider | Same yard across seasons | Real seasonal photo set |
| Landscaping | Patio material picker | Swap pavers/stone on a patio photo | Materials they install |
| Electrician | EV charging time helper | Car battery + charger level → hours to charge | Generic physics, clearly labeled "about" |
| Cleaning | Price estimator | Beds/baths/frequency → price | Real price table (else CTA only) |
| Tree service | Stump helper | Stump count + diameter → time estimate | Client's numbers |
| Painting | Room color visualizer | Swap wall color in a room photo (masked layer) | Paint brands/colors they use |

**Any trade:** service-area checker (enter ZIP/town → "yes, we serve you" from the confirmed area list),
"which service do I need?" quiz, before/after wipe, animated process stepper.

Pick by asking: what's the one thing this client does better or differently? Make that tangible and touchable.
Keep it playful but professional: no gimmicks that slow the page or hide the phone number.
