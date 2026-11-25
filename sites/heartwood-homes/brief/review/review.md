# Heartwood Homes review — 2026-11-25

Result: Ready for your look. The build follows the grounded kit. A few facts stay blank until Heartwood supplies them.

Screenshots: `brief/review/home-desktop-fold.png`, `home-mobile-fold.png`, `contact-desktop-fold.png`, `custom-homes-hero-check.png`, `scrubber-cleared.png`, `scrubber-finished.png`.

Preview of this build: http://localhost:4322/

## Checklist

- [x] 25 pages screenshotted at 1440 and 390, plus reduced motion
- [x] Agency: the first screen is the A-frame, full bleed, with the headline and one primary action in the shared container
- [x] Care: first person, Daniel and Laura’s own words, phone and “Start your home” on every page, plain language
- [x] Type: body 16px minimum, nothing under 14px. Display is the luxury-modern knob, about 97px at 1440, capped at 120
- [x] Composition: full-bleed hero, trust strip, featured house card, scrubber, calm photo index, dark close
- [x] Delight: the Ten Mile lot-to-finish scrubber. Missing chapters stay words. The index crossfades; it is not a second trick
- [x] Motion: one hero load-in, the scrubber, short hovers. Reduced motion leaves everything visible
- [x] Template smell test: not a boxed hero, not a tile grid, not badge soup
- [x] Conversion: one primary label, “Start your home.” Proof sits beside the ask. Contact details are the last step. No price tool, no pop-up, no fake deadline
- [x] Measurement: events are wired. Plausible is named in `brief/measurement.md`. No project exists yet, so nothing was sent to a dashboard
- [x] No horizontal overflow. Type and spacing on the scale. Touch targets at least 44px
- [x] Contrast: headline and buttons sit on a solid mist panel, not on the photograph
- [x] Signature: cleared-lot (words) and finished-home (photo) screenshotted
- [x] Lighthouse mobile — Home: perf 99, a11y 100, best practices 100, SEO 100, LCP 2.0s, CLS 0, TBT 50ms. Custom homes: perf 99, LCP 2.0s, CLS 0.02, TBT 0. Contact: perf 100, LCP 1.4s, CLS 0, TBT 0. A11y, best practices, and SEO were 100 on all three
- [x] Honesty: claims in `brief/review/claims.md`. No street, no prices, no review quotes, no `aggregateRating`
- [ ] Needs you: the list below

The image “upscaled” notes in `audit.md` are the srcset check reading a density-corrected width. The files are real WebPs. They were left in place.

JS is about 3KB gzip, CSS about 6KB gzip, three font files.

## What changed in this pass

The A-frame at dusk is the home hero and the featured house, because it is the photograph you remember. Ten Mile stays in the scrubber. The project list shows the houses at rest, with a large photo that changes as you move through the names. Header is shorter, with four links, the phone, and “Start your home.” A trust line sits under the hero. A dark close sits at the end of each page. The contact page is five easy questions, name and phone last. If the form cannot be delivered, the thank-you page says so and gives the phone number. City pages were not added. There are no invented portraits.

## Still needed from Heartwood

- Cost ranges by finish, what is included, the date, and whether land is separate, before any price tool
- Photos of Daniel, Laura, and the crew
- A direct Google Business Profile URL (the rating currently uses the search link you gave)
- Mid-phase photos of the Ten Mile house, if those chapters should show pictures
- Towns they actually work, each with a project or a review, before any city page: Ten Mile, Hixson, Flat Top, Spring City, Pikeville, Sewanee, Signal Mountain, Red Bank, East Brainerd
- A published response time, if the thank-you page should say when they reply
- `GHL_WEBHOOK_URL`, full review text, and a Plausible project before launch
