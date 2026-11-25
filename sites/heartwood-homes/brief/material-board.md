# Material board — Heartwood Homes

Written before the redo’s CSS. Colors are sampled from Heartwood’s own project photos. Fonts are chosen for this builder and these pictures.

## What it should feel like

A family sitting at a table, deciding to build a house. The page should feel like the job site in the morning: cool mist, a dark tree line, metal roof, and one piece of cedar. Big type, a lot of air, and the house itself doing the talking. Sharp corners, like a board end, not a rounded card.

## Palette

Sampled 2026-11-24 by averaging a 4×3 grid of each photo (sharp). The page ground is the Ten Mile sky lifted so the black logo and body text sit on it. It is a cool stone mist, not a warm cream.

| Role | Hex | Where it came from |
|---|---|---|
| Canopy shadow | `#2F341E` | A-frame cabin lawn in shade. Photo: `a-frame.jpg`. Caleb Jones (@gcalebjones). This is the button and link color. White on it is 12.88:1. |
| Spring canopy | `#324216` | Spring City tree line. Photo: `spring-city.jpg`. Wes Holland (@DroneLogix). Reserved; the A-frame shadow won because it is darker and still from a real house. |
| Sky mist, lifted | `#E7EBE7` | Ten Mile sky `#C3CACF`, raised so text and the black logo pass. Photo: `ten-mile.jpg`. Travis Jacobs (@scenicpropertymedia). Page ground. |
| Metal roof | `#6C6A60` | Ten Mile standing-seam roof. Travis Jacobs. Too light for body type. Used only as a memory of the roof, not as text. |
| Pikeville metal | `#3A403A` | Treehouse siding in shade. Photo: `pikeville-treehouses.jpg`. Not a page color. |
| Cedar | `#5E3B2E` | A-frame timber in the sun. Caleb Jones. Hairline accent only. Not buttons, not body text. |
| Timber | `#9C7C5A` | Ten Mile porch wood. Travis Jacobs. Not a page color. |
| Hixson board | `#5B5C5C` | Hixson siding. Photo: `hixson.jpg`. Wes Holland. Not a page color. |
| Ink | `#1A1E18` | Canopy shadow pushed darker so body type is 14:1 on the mist. |
| Muted | `#545C4E` | A step lighter than the canopy, still 4.94:1 on the darkest surface. |

## Type

- **Display:** Bricolage Grotesque, 600. It is a constructed grotesque that stays clear at 100px. It is not an editorial serif. Chosen because the houses are built objects (frames, roofs, boards), and the type should feel constructed too.
- **Body:** Source Sans 3, 400 and 600. Plain, wide, easy to read for a family who is not here to admire typography.
- **Scale:** luxury-modern / Eppright display knob, named in `brief/plan.md`. Display is about 97px at 1440px and caps at 120px. It does not jump to 150px. Body stays 16–18px. Labels and meta are 14–15px. Nothing is smaller than 14px. Inputs are 16px.

## The one memorable thing

The Ten Mile Lake House, told as four chapters: cleared lot, foundation, frame, finished home. Land work is chapter one. Only the finished chapter has a photograph of that house (Travis Jacobs). The earlier chapters stay words.

The first picture a visitor sees is the A-frame cabin at dusk (Caleb Jones). It is the most distinctive photograph in the set, so it is the Home hero and the featured house. Ten Mile stays in the scrubber. It does not lead the first viewport just because it is early in the file.

## Layout

One shared container, 1240px, centered. Full-bleed is the hero, the scrubber, and the dark closing band. Project indexes show the houses at rest. The A-frame feature is a large photo with a small info card.

## Motion

Recorded in `brief/brand.md`. One hero load-in. The scrubber photo is the one scroll-driven move. Hovers are quick. Everything else stays still.
