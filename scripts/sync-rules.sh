#!/usr/bin/env bash
# Regenerate .cursor/rules/*.mdc from CLAUDE.md and skills/*/SKILL.md so Cursor and Claude Code follow the same text.
# Run from the repo root after editing any skill:  bash scripts/sync-rules.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .cursor/rules

body() { # strip YAML frontmatter from a SKILL.md
  awk 'BEGIN{fm=0} NR==1 && /^---$/ {fm=1; next} fm==1 && /^---$/ {fm=0; next} fm==0 {print}' "$1"
}

write_rule() { # file description globs alwaysApply source [extra refs...]
  local out=".cursor/rules/$1" desc="$2" globs="$3" always="$4" src="$5"; shift 5
  {
    echo "---"
    echo "description: '${desc//\'/\'\'}'"
    echo "globs: $globs"
    echo "alwaysApply: $always"
    echo "---"
    echo "<!-- GENERATED from $src by scripts/sync-rules.sh. Edit the source, not this file. -->"
    echo
    if [[ "$src" == CLAUDE.md ]]; then cat "$src"; else body "$src"; fi
    for ref in "$@"; do echo; echo "Reference file (read when this rule applies): @$ref"; done
  } > "$out"
  echo "wrote $out"
}

write_rule 00-halfbyte-workflow.mdc \
  "Half Byte Digital site-builder workflow for this repo only: intake → brand kit → site plan → build → review, with stop points for Jake. Applies to every request in halfbyte-sites." \
  "" true CLAUDE.md

write_rule 10-intake.mdc \
  "Use when Jake asks to build a new website (\"let's build a website for …\") or says \"learn from their existing site\": one question per message (existing site → brand kit → work mix → art direction), just-in-time, recommended picks, \"use your recommendations\" shortcut, or learn mode (crawl confirmed site, summarize, ask only gaps)." \
  "" false skills/intake/SKILL.md skills/intake/question-bank.md templates/intake-brief.md templates/sources.md

write_rule 20-design-foundation.mdc \
  "Bare-metal UI/UX rules, expression knobs and token contract for every Half Byte site. Apply whenever writing or editing markup, CSS, components or pages in sites/." \
  "sites/**/*.astro,sites/**/*.css,sites/**/*.ts,sites/**/*.tsx,sites/**/*.js,sites/**/*.mjs,sites/**/*.md" false \
  skills/design-foundation/SKILL.md skills/design-foundation/grounded-references.md templates/tokens.css templates/site.ts

write_rule 30-brand-kit.mdc \
  "Use after intake answers: map a client brand kit (logo, colors, fonts, guidelines PDF) faithfully into tokens, derive missing pieces with contrast checks, or generate a kit from the chosen art direction." \
  "sites/**/brief/brand.md,sites/**/src/styles/tokens.css" false skills/brand-kit/SKILL.md templates/tokens.css

write_rule 40-site-plan.mdc \
  "Use after brand kit: propose sitemap, then walk page by page asking page-specific questions and facts one at a time only when that page needs them (unknowns null/hidden), write section outlines, get a go." \
  "sites/**/brief/plan.md" false skills/site-plan/SKILL.md skills/page-build/archetypes.md skills/page-build/compositions.md skills/page-build/delight.md skills/page-build/conversion.md templates/measurement-plan.md templates/monthly-client-report.md templates/project-page.md

write_rule 50-page-build.mdc \
  "Use when building an approved plan into an Astro site: scaffold, motion, composition and delight layers, null-config facts, archetype sections, one signature interaction, forms, SEO, Cloudflare Pages." \
  "sites/**/src/**" false skills/page-build/SKILL.md skills/page-build/archetypes.md skills/page-build/compositions.md skills/page-build/conversion.md skills/page-build/delight.md skills/page-build/signature-interactions.md templates/project-page.md templates/styles/motion.css templates/styles/project-page.css templates/styles/project-filters.css templates/scripts/motion.ts templates/scripts/analytics.ts templates/scripts/project-page.ts templates/scripts/project-filters.ts templates/copy-voice.md templates/data/estimator.ts templates/components/Animate.astro templates/components/ProjectHero.astro templates/components/WalkRail.astro templates/components/ProjectShot.astro templates/components/SaveHouse.astro templates/components/NextHouse.astro templates/components/PhotoViewer.astro

write_rule 60-review.mdc \
  "Use before showing Jake any site or change: Playwright screenshots 1440/390, agency-craft rubric, delight and motion checks, token/contrast/overflow audits, Lighthouse, honesty, checklist report." \
  "sites/**/brief/review/**" false skills/review/SKILL.md scripts/review.mjs skills/design-foundation/grounded-references.md skills/page-build/conversion.md
