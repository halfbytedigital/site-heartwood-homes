# Type files (SIL Open Font License 1.1)

Default pairing for trades and builders (see `skills/design-foundation/SKILL.md`, A26):

- **Newsreader** — display and headings. Variable `opsz`, `wght`. Designed by Production Type.
  `OFL-Newsreader.txt` must travel with the font file.
- **Source Sans 3** — body, buttons, filters, dates, kickers. Variable `wght`. Designed by Adobe
  (Reserved Font Name "Source"). `OFL-SourceSans3.txt` must travel with the font file.

Copy the `.woff2` files and the matching `OFL-*.txt` into the site (`public/fonts/` or
`src/fonts/`). Import `templates/styles/fonts.css` (adjust the urls) and preload Newsreader
in the base layout. Use `font-display: swap` and optical sizing on display type
(`font-optical-sizing: auto`, or `font-variation-settings: "opsz" 72` at display size).
