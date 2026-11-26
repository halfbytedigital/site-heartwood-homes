# C33 layered scene: slot map and house types

`house-scene.svg` is the starter art for the build-brief sketch. It is one hand-composed, layered SVG side elevation. `scene.js` (templates/scripts) only switches layers on and off and moves a few grade-dependent pieces by offsets that were measured once and stored in `data-dy`. **Nothing is computed geometrically at runtime.** The old procedural `sketch-lib.js` is retired, because runtime geometry is what produced walkout overflow and overlaps.

To regenerate the SVG after editing coordinates: `python3 build_scene.py [out.svg]`. All art lives in that file, written by hand on the grid below. To keep a client's art, copy the generated SVG and inline it. Do not ship the Python.

## Style
- viewBox `0 32 520 256`. Primary strokes are 1.7 (`currentColor`) with round caps and joins.
- Secondary strokes use `.s2`: 1.2, `--color-line-strong`. `.fine` is 0.8.
- Dashed and dotted strokes use `.dash.long` / `.dash.dots`. GSAP fades these in, because DrawSVG overwrites dasharray.
- Window glass uses `.glass`, a warm fill added after the outline draws.
- `.lbl` text labels (water, sewer, septic) are hidden in the rail and shown in the brief.

## Slot map
Uphill and the road are on the LEFT; downhill and water are on the RIGHT. The pad (main floor) is at **y = 204**, and the lower walkout grade at **y = 238**.

| Slot | x | Contents |
|---|---|---|
| Road / utility | 20–40 | Power pole; water/sewer mains below the road |
| Mailbox | 39–56 | Mailbox **or** survey stake |
| Trees L | 59–99 | Conifer at x 68 (heavy cover), leafy at x 90 |
| Well | 104–120 | Well house |
| Garage | 126–190 | Shared garage; per-type `link` breezeway |
| Riser gap | 182–190 | Water riser (x 184), sewer riser (x 188) |
| House | walls 190–330, eaves 182–338 | Per-type groups (below) |
| Porch | 226–278 | Over the door (door 242–262); windows held clear of it |
| Walkout | 268–330 × 204–238 | Lower level; earth hatch 202–262 |
| Side slot | 330–388 | Deck **or** screened porch (screened wins). `-wo` variants sit on posts |
| Patio | 332–390 × 234–238 | Walkout only |
| Septic | 340–386, below grade | `septic-low` with a walkout |
| Outbuilding | 394–446 | Shop **or** dashed old structure (to take down) |
| Fall zone | 446–500 | Gentle, steep, or bank + water |
| Trees R | 457–497 | Hidden on waterfront |
| Drive band | 20–172 | Paved / gravel / needs a drive, one path per approach |

Every answer combination keeps ≥17 viewBox units of margin on every edge, so the walkout never overflows.

## House types (same layer names in each `<g data-type="…">`)
Every type group has `house`, `roof1` (1 story), `second` + `roof2` (2 stories), `porch`, and `link`. A type may also override a shared layer by having a child with the same `data-layer`; the shared copy then hides while that type is active.

| Type | 2 stories means | Porch | Overrides |
|---|---|---|---|
| lake | full 2nd-story box | covered stoop | none |
| family | full 2nd story, hip roof | gabled portico | none |
| cabin | 1½ story: loft windows + balcony in the steep roof | shed-roof porch | `screened` (sits below the low eave) |
| aframe | loft floor + rail behind the glass, no box | full-width open deck meeting the legs | `screened`, `screened-wo` (freestanding) |
| townhome | 2nd story on all 3 units | small canopy over each door | none (minimal: use only if the builder builds them) |

`sceneType()` maps any other answer (short-term rental, something else) to `lake` on waterfront and `family` otherwise.

### Drawing a new type
- Keep the pad at 204, walls inside 190–330, and eaves inside 182–338.
- Keep the door centered under the porch slot.
- Reuse the layer names, and add the type to `sceneType()`.
- Then run `templates/scripts/qa/scene-collisions.mjs`. The target is 0 collisions, and every type must draw a house. Also check the building cluster by eye with every slot on.

## Motion
- GSAP 3.13+ with DrawSVGPlugin, from npm `gsap`; the plugin is in the public package.
- It is free under GreenSock's Standard "no charge" license; just don't use it in a tool that competes with Webflow.
- Load it only on the page that uses the scene.
- Solid strokes draw in. Dashed strokes, labels, and glass fade. Layers that switch off fade out in 0.28s.
- Grade moves tween `y`.
- Under `prefers-reduced-motion: reduce`, everything is set instantly.
