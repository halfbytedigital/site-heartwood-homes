# Line icons in the site's language: 48x48, fill none, stroke currentColor 1.6, round caps/joins.
def svg(body, cls="line-icon"):
    return (f'<svg class="{cls}" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" '
            f'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{body}</svg>')

# Step 1 / teaser
LAND_YES = ('<path d="M7 35 L19 27 L41 30 L31 40 Z"/>'                       # the parcel, in perspective
            '<path d="M7 35 V30 M41 30 V25 M31 40 V35"/>'                     # corner stakes
            '<path d="M19 27 V11"/><path d="M19 11 L27 13.5 L19 16"/>')       # stake with a small flag
LAND_LOOKING = ('<path d="M24 41 C 24 41 12 29.5 12 20 A 12 12 0 0 1 36 20 C 36 29.5 24 41 24 41 Z"/>'  # map pin
                '<path d="M20.6 17.4 A 3.6 3.6 0 1 1 25.4 20.8 C 24.4 21.3 24 22 24 23.2 V24"/>'     # question mark
                '<circle cx="24" cy="28" r="1.1" fill="currentColor" stroke="none"/>')
LAND_UNSURE = ('<path d="M24 43 V7"/>'                                        # post
               '<path d="M24 11 H36 L40 14.5 L36 18 H24"/>'                   # sign pointing right
               '<path d="M24 22 H12 L8 25.5 L12 29 H24"/>'                    # sign pointing left
               '<path d="M17 43 H31"/>')

# Build your path
NEW_HOME = ('<path d="M10 40 V22 L24 11 L38 22 V40"/><path d="M20 40 V30 H28 V40"/><path d="M6 40 H42"/>')
RENOVATE = ('<path d="M8 40 V24 L20 14 L32 24 V40"/><path d="M16 40 V32 H24 V40"/>'
            '<path d="M32 30 H42 V40" stroke-dasharray="2.5 3"/><path d="M4 40 H44"/>'
            '<path d="M37 21 V27 M34 24 H40"/>')                               # small plus: the addition
LOT_READY = ('<path d="M4 34 L14 30 H34 L44 25"/>'                            # graded ground with a level pad
             '<path d="M14 30 V21 M34 30 V21"/><path d="M14 22.5 H34" stroke-dasharray="2 2.5"/>'  # stakes and string line
             '<path d="M4 41 C 14 39, 22 39, 30 36"/>')                         # a drive coming in
