# Heartwood /plan/ wizard: v4 notes (extends v3)

v4 is a copy of v3. Everything in NOTES-v3.md still holds except where this file says otherwise.
Serve it with `python3 -m http.server 8765` from this folder, then open `plan.html` or `scene-qa.html`.

## What changed
1. **House-type scenes.** There are now five hand-drawn scenes in the same slot map: lake/mountain, family house, cabin, A-frame and townhome.
   - They all live in `scene-lake.svg`. The file name is kept from v3 so nothing else has to change.
   - Built by `src/build_scene.py`.
2. **Type mapping** (`sceneType()` in scene.js).
   - Lake, family, cabin, A-frame and townhome map to their own scenes.
   - Short-term rental and "Something else" use the lake house when terrain is Waterfront, and the family house otherwise.
3. **Larger sketch at desktop.** At 1280px and wider the rail is 556px (`minmax(0,1fr) 556px`), so the drawing stage is **522px wide at 1440**.
   - Measured box: x784, y199, w556.
   - At 390 it is unchanged: still docked at the bottom (390×131).
   - The form column narrows to about 644px at 1440.
4. **No default deck.**
   - The deck only appears when "A deck" is picked. That is a new must-have chip, so there are now 9 chips in a 3-column grid.
   - The brief lists "A deck".
   - Deck and screened porch share the side slot. If both are picked, the screened porch is drawn and both still appear in the brief list.
5. **Townhome message.** Choosing townhomes shows: "We’ll talk through whether this is a fit for us." It promises nothing.

## How type swapping works
- The shared layers stay at the top level of the SVG: ground, trees, utilities, drive, garage, walkout/basement, patio, deck, screened porch and outbuildings.
- Each type is a `<g data-type="…">` that holds the **same layer names**: `house`, `roof1`, `second`, `roof2`, `porch`, `link` (link is the garage breezeway).
- A type can also override a shared layer by having a child with the same `data-layer` name. While that type is active, the shared copy is hidden.
  - Cabin overrides `screened`.
  - A-frame overrides `screened` and `screened-wo`.
- `syncScene()` handles visibility:
  - A layer inside a type group shows only when that group is the active type and the layer is switched on.
  - A shared layer hides itself when the active type has an override for it.
- GSAP draws or undraws only what changed, so switching type redraws the house and keeps the land.

## Per-type differences (all on the same 520×256 grid, pad grade y=204)
| Slot | Lake/mountain (v3) | Family house | Cabin (1½ story) | A-frame | Townhomes (row of 3) |
|---|---|---|---|---|---|
| house | 2-bay, big glass right | symmetrical box, 2 windows + paneled door | low log walls (lines), 2 windows | tall triangle legs 190–330, glass gable with mullions and transom | 3 units, party-wall dividers, 3 doors + 3 windows |
| roof1 (1 story) | gable + gable vent | low gable, chimney left | steep gable, chimney right, gable vent | none; the legs are the roof. Stovepipe only | zig-zag of 3 small gables |
| second | full 2nd story box | full 2nd story, 3 windows | **loft dormer windows + small balcony inside the roof; no box** | **interior loft floor + rail in the glass; no box** | 2nd story on all 3 units |
| roof2 | gable over 2nd story | hip roof, chimney left | same steep roof (no vent; loft windows take its place) | stovepipe (same as roof1) | zig-zag raised 44 |
| porch | covered stoop | gabled portico on 2 posts | shed-roof porch | full-width open front deck, floor and rail meet the sloped legs, no roof | small canopy over each door |
| screened porch | shared | shared | **override:** roof drops below the low cabin eave | **override:** freestanding gabled screen room clear of the sloped leg (+ walkout variant) | shared |
| deck / walkout / patio / basement | shared | shared | shared | shared | shared (one walkout box under units 2–3) |
| garage + link | breezeway | breezeway | breezeway at 180 | breezeway at 192 (meets the leg below the deck rail) | breezeway |

## QA results (all re-run after the last art change)
- **Collision (pixel) check:** `src/check-all-v4.mjs` covers 6 types (rental included) × 4 terrains × walkout × deck/screened/none × shop/old shed/none × 3 drives × 2 story counts × 2 utility sets × 2 cover levels, for **10,368 combos**.
  - Result: **0 collisions** (`_qa-overlap-all.json`), and no combo is missing its house.
  - Worst margins to the edge of the viewBox: left 19, top 23.5, right 19.5, bottom 17.5.
  - Pairs inside the building cluster are excluded by design and were checked by eye only.
- **CLS:** **0** on desktop at 1440 (A-frame run, twice), 0 on mobile at 390 and 0 with reduced motion (`_cls-*.json`). One desktop run made while the 10k-combo collision check was hammering the CPU showed 0.0006: a web-font swap at 460 ms that nudged the header nav and headings. `font-display: optional` normally prevents that; in the Astro build, give the fallback fonts matching metrics (`size-adjust` / `ascent-override`) so a late swap can't move anything.
- **Reduced motion:** the scene renders complete with no drawing animation (`_reduced-brief-sketch.png`).

## Deliverables
- Per-type full scenes: `1440-scene-{lake,family,cabin,aframe,townhome}.png`
- Side-by-side comparison, every slot on (2-story and 1-story): `1440-types-compare.png`
- Buildup grid for a non-lake type: `1440-sketch-buildup-cabin.png`
- Type-switch video (lake → family → cabin → A-frame → townhome → rental → lake): `house-types.mp4` (full page, 18.6 s), `house-types-rail.mp4` (rail crop), `house-types.gif`
- Wizard screens: `1440-01…11*.png` (cabin run), `390-*.png`
- Scripts: `src/build_scene.py`, `src/build_page.py`, `src/run-v4.mjs`, `src/check-all-v4.mjs`, `src/types-video.mjs`, `src/shot-qa.mjs`
  - The scripts expect Playwright at /tmp/rt/node_modules.

## Known weak spots
- Townhomes are intentionally minimal: a stoop per unit and one shared walkout box.
- Rental and "Something else" have no art of their own; they reuse the family or lake house.
- The walkout, basement, deck and patio boxes are the same for every type. They read as generic under the A-frame and cabin.
- A-frame: the screened porch is a separate little building rather than attached. (The front deck was fixed after Jake's v4 approval: the floor and rail now run leg to leg, and the garage link dropped to y 192 so it no longer lines up with the rail.)
- Cabin: the garage roof meets the steep cabin eave closely. It touches without crossing, but it is tight.
- Deck and screened porch can't both be drawn. If both are picked, the screened porch wins.
- Overlaps inside the building cluster were checked by eye, not by script.
- The form column at 1440 is narrower than in v3 (about 644px). The 3-column chip grid still fits.
- The lake strip gets shorter when a shop or old shed sits on the lower grade (carried over from v3).
