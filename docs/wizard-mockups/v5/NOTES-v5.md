# Heartwood v5: /plan/ folded into the site (light touch)

Mock built from the public preview (https://9860d6fd.heartwood-preview-erj.pages.dev), not from Jake's local build.
Serve it with `cd site && python3 -m http.server 8770`. `_orig/` is the untouched mirror. `src/apply_v5.py` rebuilds `site/` from `_orig/`.

**Jake's calls (Nov 25, 9:53 PM EST), now in the mock:** the existing phone bottom bar's start button goes to /plan/ (the label follows the link, so it reads "Plan your home"), and the old short form near the bottom of Custom Homes ("Tell us about the house.") is gone. The land teaser now carries a quiet "Rather just talk? Contact Heartwood" link (→ /contact/?work=custom-home), and the closing band keeps the phone.

No popups, slide-ins, exit-intent or new sticky bars. All entry points are ordinary links in places that already had a CTA.

## What changed, by scope item
1. **Header** (every page): the primary button is "Plan your home" and goes to /plan/. The phone stays beside it, and Contact is added to the nav after About. The mobile menu also gets Contact and "Plan your home". The footer text link goes to /plan/.
2. **Hero** (Home, Custom Homes): the primary button is "Plan your home". The secondary is a ghost "See our work" that goes to /projects/ (it replaces the hero phone button; the phone is still in the header).
3. **Build your path → "What are you looking to do?"** (Custom Homes): three cards, all in the site's 48px line-icon style.
   - Build a new home → /plan/ ("Plan your home →").
   - Renovate or add on → /contact/?work=renovation.
   - Get a lot ready ("Clearing, grading, a drive, a pad.") → /contact/?work=site-prep.
   - Land-finding wording is gone. In the Qualifier and PathPicker, "Not yet / find land" now reads "Still looking". The old value id `find-land` survives only inside the JS.
4. **Wizard step 1**:
   - Subhead: "If you don't have land yet, that's fine." The stray "We'll walk it with you." line is removed.
   - Cards: I have land. ("A lot you own, or one under contract.") / Still looking. ("Come back when you find a spot, or talk to us now. Daniel can often walk a lot with you before you buy.") / I'm not sure. ("We can start either way.").
   - New icons: a parcel with corner stakes and a flag; a map pin with "?"; a signpost.
   - Layout: 3 equal-height columns from 760px, stacked rows below that.
   - The no-land path goes straight to house type. The brief says "Still looking for land." and "What Daniel will look at first" says "The house you want, so it's ready when you find a spot. Daniel can often walk a lot with you before you buy." Nothing promises land help.
5. **Scroll** (see below).
6. **Timeline scrubber**: Finish "Start your home" → /plan/. The quiet link under it → "Plan your home".
7. **Project pages**: the closing band is "Want something like this?" / "A few easy questions, and you get a brief and a sketch of your house." with a "Plan yours" button.
   - Ten Mile and Spring City link to /plan/?type=lake.
   - The A-frame project links to /plan/?type=aframe.
8. **Custom Homes teaser**: one tinted block before "Houses we've built", showing "Do you have land?" with the same three cards.
   - I have land → /plan/?land=yes&step=place (opens on "Where is it?").
   - Still looking → ?land=no&step=type.
   - Not sure → ?land=unsure&step=type.

## Scroll and focus rules (/plan/)
- **Opening /plan/:** it always opens at the top.
  - `history.scrollRestoration = "manual"`, plus an instant scroll to top on load and on a bfcache `pageshow`.
  - The site uses cross-document `@view-transition` (not Astro ClientRouter), so I added that rule to /plan/ too. Without it the transition aborted with a console error.
- **Selecting an option never scrolls.**
- **Step change** (Continue, Back, deep link): if the new heading is under the sticky header or low in the viewport, the page jumps instantly so the progress bar and heading sit just under the header. Then the h1 (`tabindex=-1`) is focused with `preventScroll`.
  - The jump must be instant: the site sets `scroll-behavior: smooth` globally, so scrolls pass `behavior: "instant"`.
- **URL:** the step is kept as `#q-<step>`.
  - v4 used `#place`, which matched `input#place`, so the browser scrolled to that field and focused it.
  - `?step=` is also read on load.
- **"Plan your home" in the header while already on /plan/:** it keeps the current step and brings the question into view.
- **Kit:** C33 now reads "No unrequested scroll on option picks; on step change, bring the new question into view", with the details above. The review checklist is updated the same way. Rules are re-synced and `/workspace/halfbyte-skills.zip` is rebuilt. The diff is in `../../KIT-PATCH-NOTES-scroll.md`.

## QA
- `_scroll-check-1440.json` and `_scroll-check-390.json`: 20 checks at 1440 and 19 at 390 (the header-on-/plan/ check is skipped on mobile), all pass.
  - Opens at top from the teaser, from the project CTA (lake preselected), after reload, and after back/forward.
  - Option picks move scroll by 0.
  - Continue from the bottom of the long "getting in" step brings "What kind of house?" into view and focuses it. Back does the same.
  - Deep links focus the heading. A plain visit doesn't steal focus.
- `_qa/cls-*.json` (kit `cls-run.mjs`): /plan/ CLS 0 with 0 entries at desktop, mobile and reduced motion.
- Site pages show tiny CLS (≈0.0002–0.0015) from header font swaps. The original preview has the same shifts (Ten Mile 0.0012 with 8 entries), so v5 didn't introduce them.
- No console errors.

## Files
- `assets/icons/*.svg` (the six line icons), `assets/v5.css`, `snippets/*.html` (the exact markup of each changed block, plus `REMOVED-custom-short-form.html` for reference), `plan/` (the v5 /plan/ mock).
- `qa/`: `scroll-check.mjs` (scroll, focus, entry points, land wording; `--url --out --w --h`), plus the kit's `cls-run.mjs`, `scene-collisions.mjs` and `plan-steps.example.mjs`.
- Extra screenshots: `390-home-bottom-bar.png`, and `1440-` / `390-custom-bottom-no-form.png`.
- Screenshots `1440-*.png` and `390-*.png`:
  - home-header-hero, home-scrubber(-finish), home-menu-open (390)
  - custom-hero, custom-what-are-you-looking-to-do, custom-teaser-land
  - project-cta-ten-mile
  - plan-step1 and plan-step1-still-looking
- `plan-entry-scroll.mp4` (22 s, 1440): click from mid-page on Custom Homes into /plan/, then step Continue/Back with correct scroll.
- `src/`: `apply_v5.py`, `plan_v5.py`, `icons.py`, `v5.css`, plus the Playwright scripts `shots-v5.mjs`, `scroll-v5.mjs`, `page-scroll-steps.mjs` and `plan-steps.mjs`.

## Weak spots / decisions for Jake
- **Source:** the mock is built on the preview, not Jake's local build. Selectors and copy may differ.
- **Plan header:** the /plan/ header is a replica of the site header, not the Astro component. It is close but not pixel-identical.
- **Phone bottom bar:** it now goes to /plan/ on every page that has it, including Renovations and Site prep, where a renovation visitor might expect the short form. To keep `/contact/?work=…` there, make that a per-page override.
- **"Get a lot ready" icon:** it's the most abstract of the icons.
- **Unmirrored pages:** Our process, About and the Projects index weren't mirrored. Their text on the preview has no land-finding wording (checked with curl, Nov 25). `qa/scroll-check.mjs` re-checks them on the real build.
- **Deep-link params:** the real build should accept `?land=` + `?step=` the way the mock does, and keep the hash from matching any element id.
- **Focus ring on deep links:** a deep link shows the focus ring on the heading. That is `:focus-visible` behaviour after a programmatic focus, and it's good for accessibility, but some may find it odd. Mouse-driven Continue/Back shows no ring.
