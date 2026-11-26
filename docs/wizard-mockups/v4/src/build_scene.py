"""Hand-composed layered scene: lake / mountain house.
Every coordinate below is chosen by hand on a fixed slot map (see NOTES-v3.md).
Nothing is computed at runtime; the page only switches layers on/off and moves a few
grade-dependent pieces by the pre-measured offsets stored in data-dy.
viewBox 0 0 520 300. Pad (main-floor grade) y=204. Lower (walkout) grade y=238."""
import json, pathlib

PAD, LOW = 204, 238
ROAD_Y = {"flat": 204, "gentle": 194, "steep": 182, "water": 204}

def g_left(x, t):
    y0 = ROAD_Y[t]
    if x >= 96: return PAD
    return y0 + (PAD - y0) * (x - 20) / 76

def bez(p0, p1, p2, p3, x):
    # find y on cubic for given x (author-time measurement only)
    lo, hi = 0.0, 1.0
    for _ in range(60):
        t = (lo + hi) / 2
        bx = (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0]
        if bx < x: lo = t
        else: hi = t
    return (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]

# Right-hand fall, x 446 -> 500, per terrain, without (pad) and with walkout (low)
FALL = {
    "flat":       None,
    "gentle":     ((446, PAD), (466, PAD), (480, 212), (500, 220)),
    "steep":      ((446, PAD), (462, PAD), (482, 222), (500, 244)),
    "gentle-wo":  ((446, LOW), (466, LOW), (482, 242), (500, 248)),
    "steep-wo":   ((446, LOW), (462, LOW), (482, 250), (500, 262)),
}
def g_right(x, key):
    f = FALL.get(key)
    if key == "flat" or key == "flat-wo" or f is None:
        return PAD
    return bez(*f, x)

def r1(v): return round(v, 1)

out = []
A = out.append

def layer(name, body, cls="", dy=None, extra=""):
    d = f' data-dy=\'{json.dumps(dy)}\'' if dy else ""
    A(f'<g data-layer="{name}"{d} class="{cls}"{extra}>{body}</g>')

# ---------- SKY: ridge (steep only), split around the house so it never crosses a roof
layer("ridge",
      '<path class="s2" d="M20 88 C 44 78, 70 84, 96 74 C 116 66, 136 70, 160 62"/>'
      '<path class="s2" d="M356 66 C 380 56, 404 70, 430 60 C 452 52, 476 62, 500 56"/>')

# ---------- GROUND variants (exclusive)
def left_part(t):
    y0 = ROAD_Y[t]
    return f"M20 {y0} L96 {PAD}" if y0 != PAD else f"M20 {PAD}"
GROUND = {
    "flat":      left_part("flat") + " H500",
    "gentle":    left_part("gentle") + " H446 C 466 204, 480 212, 500 220",
    "steep":     left_part("steep") + " H446 C 462 204, 482 222, 500 244",
    "water":     left_part("water") + " H446 C 458 204, 466 222, 476 230",
    "gentle-wo": left_part("gentle") + " H268 V238 H446 C 466 238, 482 242, 500 248",
    "steep-wo":  left_part("steep") + " H268 V238 H446 C 462 238, 482 250, 500 262",
    "water-wo":  left_part("water") + " H268 V238 H446 C 456 238, 462 248, 470 252",
    # Waterfront with no outbuilding: the bank moves in to x 396 so the lake reads
    "water-open":    left_part("water") + " H396 C 408 204, 414 222, 424 230",
    "water-open-wo": left_part("water") + " H268 V238 H396 C 406 238, 412 248, 420 252",
}
for k, d in GROUND.items():
    layer(f"ground-{k}", f'<path d="{d}"/>', cls="ground")

# water surface + ripples (secondary stroke)
layer("water",
      '<path d="M470 232 H500"/>'
      '<path class="s2" d="M478 240 c4 -2.4 8 2.4 12 0 s8 2.4 10 0.8"/>'
      '<path class="s2" d="M486 248 c3 -2 6 2 9 0 s4 1.4 5 0.6"/>')
layer("water-wo",
      '<path d="M466 254 H500"/>'
      '<path class="s2" d="M474 261 c4 -2.4 8 2.4 12 0 s8 2.4 12 0"/>'
      '<path class="s2" d="M484 268 c3 -2 6 2 9 0 s4 1.4 7 0.6"/>')

layer("water-open",
      '<path d="M418 232 H500"/>'
      '<path class="s2" d="M430 240 c5 -2.6 10 2.6 15 0 s10 2.6 15 0 s10 2.6 15 0"/>'
      '<path class="s2" d="M446 248 c4 -2.2 8 2.2 12 0 s8 2.2 12 0 s8 2.2 12 0"/>'
      '<path class="s2" d="M470 256 c3 -2 6 2 9 0 s6 2 9 0"/>')
layer("water-open-wo",
      '<path d="M416 254 H500"/>'
      '<path class="s2" d="M428 262 c5 -2.6 10 2.6 15 0 s10 2.6 15 0 s10 2.6 15 0"/>'
      '<path class="s2" d="M446 270 c4 -2.2 8 2.2 12 0 s8 2.2 12 0 s8 2.2 12 0"/>')

# ---------- DRIVE: foreground band 4-9 px below grade, road (left edge) -> garage door (x 172)
for shape in ("flat", "gentle", "steep"):
    y0 = ROAD_Y[shape]
    top = f"M20 {y0+4} L96 {PAD+4} H172" if y0 != PAD else f"M20 {PAD+4} H172"
    bot = f"M20 {y0+9} L96 {PAD+9} H172" if y0 != PAD else f"M20 {PAD+9} H172"
    cap = f"M172 {PAD+4} V{PAD+9}"
    layer(f"drive-paved-{shape}", f'<path d="{top}"/><path d="{bot}"/><path d="{cap}"/>')
    mid = f"M20 {y0+6.5} L96 {PAD+6.5} H172" if y0 != PAD else f"M20 {PAD+6.5} H172"
    layer(f"drive-gravel-{shape}",
          f'<path class="dash dots" d="{top}"/><path class="dash dots" d="{bot}"/>'
          f'<path class="dash dots fine s2" d="{mid}"/>')
    layer(f"drive-needs-{shape}",
          f'<path class="dash long s2" d="{top}"/><path class="dash long s2" d="{bot}"/>')

def dyl(x):
    return {t: r1(g_left(x, t) - PAD) for t in ("gentle", "steep")}

# ---------- ROAD SLOT x 20-40: power pole (pole at x 30)
layer("pole",
      '<path d="M30 204 V118"/><path d="M20 126 H40"/><path d="M22 126 V121 M38 126 V121"/>'
      '<rect x="32" y="136" width="6" height="10" rx="2"/>',
      dy=dyl(30))
# ---------- MAILBOX SLOT x 42-56 (paved/gravel)  |  stake (needs a drive)
layer("mailbox",
      '<path d="M46 204 V188"/><path d="M39 188 V182 a7 6 0 0 1 14 0 V188 Z"/><path d="M53 184 h3 v-6"/>',
      dy=dyl(46))
layer("stake",
      '<path d="M46 204 V180"/><path class="s2" d="M46 180 L55 183.5 L46 187"/>',
      dy=dyl(46))

# ---------- TREES: zone L (x 59-99), zone R (x 457-497)
def conifer(x, g=PAD):
    return (f'<path d="M{x} {g} V{g-10}"/>'
            f'<path d="M{x-9} {g-10} L{x} {g-28} L{x+9} {g-10} Z"/>'
            f'<path d="M{x-7.5} {g-22} L{x} {g-40} L{x+7.5} {g-22}"/>'
            f'<path d="M{x-5.5} {g-34} L{x} {g-52} L{x+5.5} {g-34}"/>')
def leafy(x, g=PAD):
    return (f'<path d="M{x} {g} V{g-24}"/>'
            f'<path d="M{x-8} {g-24} C {x-12} {g-34}, {x-7} {g-48}, {x} {g-48} C {x+7} {g-48}, {x+12} {g-34}, {x+8} {g-24} Z"/>'
            f'<path class="s2" d="M{x} {g-30} l-4 -5 M{x} {g-36} l4 -5"/>')
layer("tree-l1", conifer(68), cls="tree", dy=dyl(68))
layer("tree-l2", leafy(90), cls="tree", dy=dyl(90))
def dyr(x):
    return {k: r1(g_right(x, k) - PAD) for k in ("gentle", "steep", "gentle-wo", "steep-wo", "flat-wo")}
layer("tree-r1", conifer(466), cls="tree", dy=dyr(466))
layer("tree-r2", leafy(488), cls="tree", dy=dyr(488))

# ---------- UTILITIES
# Well slot x 104-120 (small well house)
layer("well",
      '<path d="M106 204 V194 H118 V204"/><path d="M104 190 L112 182 L120 190"/>'
      '<path d="M106 190 V194 M118 190 V194"/><path class="s2" d="M110 199 h4"/>')
# Public tie-ins: buried service lines from the main under the road (x 24) to the house, risers in the 182-190 gap
for shape in ("flat", "gentle", "steep"):
    y0 = ROAD_Y[shape]
    def run(depth, riser_x):
        if y0 != PAD:
            return f"M24 {y0+depth+(PAD-y0)*4/76:.1f} L96 {PAD+depth} H{riser_x} V{PAD}"
        return f"M24 {PAD+depth} H{riser_x} V{PAD}"
    yw = (y0 + (PAD - y0) * 4 / 76) if y0 != PAD else PAD
    layer(f"tie-water-{shape}",
          f'<circle cx="24" cy="{yw+26:.1f}" r="3"/><path class="dash long s2" d="{run(26,184)}"/>'
          f'<text class="lbl" x="124" y="{PAD+23}">water</text>')
    layer(f"tie-sewer-{shape}",
          f'<circle cx="24" cy="{yw+38:.1f}" r="3"/><path class="dash long s2" d="{run(38,188)}"/>'
          f'<text class="lbl" x="124" y="{PAD+35}">sewer</text>')
# Septic: cutaway tank + riser + drain field, below the yard slot (x 398-444); low variant with a walkout
layer("septic",
      '<rect x="340" y="212" width="22" height="13" rx="4"/><path d="M347 212 V204"/>'
      '<path class="dash long s2" d="M366 215 H386 M366 220 H386 M366 225 H386"/>'
      '<text class="lbl" x="340" y="235">septic</text>')
# With a walkout the patio sits over this slot, so the tank drops below the lower grade with no riser
layer("septic-low",
      '<rect x="340" y="246" width="22" height="13" rx="4"/>'
      '<path class="dash long s2" d="M366 249 H386 M366 254 H386 M366 259 H386"/>'
      '<text class="lbl" x="340" y="269">septic</text>')

# ---------- GARAGE ZONE x 126-186 (shared by every type; the link to the house is per type)
layer("garage",
      '<path d="M130 204 V168 H182 V204"/><path d="M126 170 L156 148 L186 170"/>'
      '<path d="M140 204 V178 H172 V204"/><path class="s2" d="M140 185 H172 M140 192 H172 M140 198 H172"/>')

# ---------- HOUSE TYPES. Each type is a <g data-type> holding the same layer names:
# house, roof1 (one story), second + roof2 (two stories / loft), porch, link (garage connector),
# and optional overrides of shared side-slot layers (screened, screened-wo).
TYPES = {}
def house_type(name):
    def deco(fn):
        TYPES[name] = fn
        return fn
    return deco

def segs(y, spans, cls="s2 fine"):
    return f'<path class="{cls}" d="' + " ".join(f"M{a} {y} H{b}" for a, b in spans) + '"/>'

@house_type("lake")
def _lake():
    layer("house",
          '<path d="M190 204 V150 H330 V204 H190"/>'
          '<rect class="glass" x="200" y="162" width="22" height="26"/><path class="s2" d="M211 162 V188 M200 175 H222"/>'
          '<path d="M242 204 V170 H262 V204"/><circle cx="257" cy="188" r="0.9" class="dot"/>'
          '<rect class="glass" x="284" y="158" width="36" height="38"/><path class="s2" d="M296 158 V196 M308 158 V196 M284 168 H320"/>')
    layer("roof1",
          '<path d="M182 152 L260 108 L338 152"/><path class="s2" d="M252 136 L260 128 L268 136 Z"/>'
          '<path d="M296 128.3 V112 H308 V135"/><path d="M294 112 H310"/>')
    layer("second",
          '<path d="M190 150 V106 H330 V150"/>'
          '<rect class="glass" x="202" y="116" width="20" height="22"/><path class="s2" d="M212 116 V138"/>'
          '<rect class="glass" x="240" y="116" width="24" height="22"/><path class="s2" d="M252 116 V138"/>'
          '<rect class="glass" x="288" y="116" width="28" height="22"/><path class="s2" d="M302 116 V138"/>')
    layer("roof2",
          '<path d="M182 108 L260 64 L338 108"/><circle class="s2" cx="260" cy="88" r="5"/>'
          '<path d="M296 84.3 V68 H308 V91"/><path d="M294 68 H310"/>')
    layer("porch",
          '<path d="M226 166 L232 158 H272 L278 166 Z"/><path d="M232 166 V198 M272 166 V198"/>'
          '<path d="M228 198 H276"/><path d="M244 201 H260"/>'
          '<path class="s2" d="M232 186 H242 M262 186 H272 M236 186 V198 M239 186 V198 M265 186 V198 M268 186 V198"/>')
    layer("link", '<path d="M182 178 H190"/>')

@house_type("family")
def _family():
    # Symmetric farmhouse: low-pitch gable (1 story) or full second story under a hip roof; chimney on the left.
    win = lambda x, y, w, h: (f'<rect class="glass" x="{x}" y="{y}" width="{w}" height="{h}"/>'
                              f'<path class="s2" d="M{x+w/2} {y} V{y+h} M{x} {y+h/2} H{x+w}"/><path d="M{x-2} {y+h+2} H{x+w+2}"/>')
    layer("house",
          '<path d="M190 204 V150 H330 V204 H190"/>' + win(200, 162, 22, 26) + win(298, 162, 22, 26) +
          '<path d="M242 204 V172 H262 V204"/><path class="s2" d="M246 176 H258 V188 H246 Z"/><circle cx="257" cy="194" r="0.9" class="dot"/>')
    layer("roof1",
          '<path d="M182 152 L260 118 L338 152"/>'
          '<path d="M206 141.5 V122 H216 V137.2"/><path d="M204 122 H218"/>')
    layer("second",
          '<path d="M190 150 V106 H330 V150"/>' + win(200, 116, 22, 24) + win(249, 116, 22, 24) + win(298, 116, 22, 24))
    layer("roof2",
          '<path d="M182 108 L218 80 H302 L338 108"/>'
          '<path d="M206 89.3 V66 H216 V81.6"/><path d="M204 66 H218"/>')
    layer("porch",
          '<path d="M224 168 L252 152 L280 168 Z"/><path class="s2" d="M244 164 L252 159.5 L260 164"/>'
          '<path d="M230 168 V198 M274 168 V198"/><path d="M226 198 H278"/><path d="M244 201 H260"/>'
          '<path class="s2" d="M230 186 H242 M262 186 H274 M234 186 V198 M238 186 V198 M266 186 V198 M270 186 V198"/>')
    layer("link", '<path d="M182 178 H190"/>')

@house_type("cabin")
def _cabin():
    # Log cabin, gable end facing: low walls (164-204), steep roof. Two stories = 1.5 story loft in the gable.
    logs = (segs(170, [(190, 225), (279, 330)]) + segs(178, [(190, 202), (222, 225), (279, 292), (318, 330)])
            + segs(186, [(190, 202), (222, 225), (279, 292), (318, 330)]) + segs(198, [(190, 225), (279, 330)]))
    layer("house",
          '<path d="M190 204 V164 H330 V204 H190"/>' + logs +
          '<rect class="glass" x="202" y="174" width="20" height="18"/><path class="s2" d="M212 174 V192"/>'
          '<path d="M242 204 V178 H262 V204"/><circle cx="257" cy="192" r="0.9" class="dot"/>'
          '<rect class="glass" x="292" y="174" width="26" height="18"/><path class="s2" d="M305 174 V192"/>')
    roof = '<path d="M182 166 L260 96 L338 166"/><path d="M300 131.9 V100 H312 V142.7"/><path d="M298 100 H314"/>'
    layer("roof1", roof + '<rect class="glass" x="252" y="130" width="16" height="12"/><path class="s2" d="M260 130 V142"/>')
    layer("second",
          '<rect class="glass" x="246" y="118" width="12" height="18"/><rect class="glass" x="262" y="118" width="12" height="18"/>'
          '<path d="M240 146 H280"/><path d="M240 139 H280"/>'
          '<path class="s2" d="M246 139 V146 M252 139 V146 M258 139 V146 M264 139 V146 M270 139 V146 M276 139 V146"/>'
          '<path class="s2" d="M242 146 l4 4 M278 146 l-4 4"/>')
    layer("roof2", roof)
    layer("porch",
          '<path d="M225 176 L232 168 H272 L279 176 Z"/><path d="M230 176 V198 M274 176 V198"/>'
          '<path d="M226 198 H278"/><path d="M244 201 H260"/>'
          '<path class="s2" d="M230 188 H242 M262 188 H274 M234 188 V198 M238 188 V198 M266 188 V198 M270 188 V198"/>')
    layer("link", '<path d="M182 180 H190"/>')
    # Screened porch roof drops under the cabin's low eave (338,166)
    mesh = " ".join(f"M{x} 180 V192" for x in range(338, 382, 4) if x != 358)
    layer("screened",
          f'<path d="M330 172 L388 178"/><path d="M334 174.4 V194 M358 176.9 V194 M382 179.4 V194"/>'
          f'<path d="M330 194 H384"/><path class="s2 fine" d="{mesh}"/><path d="M334 194 V204 M382 194 V204"/>')

@house_type("aframe")
def _aframe():
    # A-frame: the roof is the house. Two stories = a loft inside the glass gable (no second-story box).
    layer("house",
          '<path d="M190 204 L260 70 L330 204"/>'
          '<path class="glass" d="M208 204 L260 104 L312 204 Z"/>'
          '<path class="s2" d="M260 104 V172 M232 157.8 V204 M288 157.8 V204 M224.6 172 H295.4"/>'
          '<path d="M242 204 V176 H262 V204"/><circle cx="257" cy="192" r="0.9" class="dot"/>')
    pipe = '<path d="M300 146.6 V126"/><path d="M297 126 H303"/>'
    layer("roof1", pipe)
    layer("second",
          '<path d="M241.3 140 H278.7"/><path d="M246 132 H274"/>'
          '<path class="s2" d="M251 132 V140 M256 132 V140 M264 132 V140 M269 132 V140"/>')
    layer("roof2", pipe)
    # Full-width front deck: floor and rail run leg to leg so they meet the sloped sides.
    layer("porch",
          '<path d="M194.2 196 H325.8"/><path d="M200 196 V204 M320 196 V204"/>'
          '<path d="M200.4 184 H242 M262 184 H319.6"/><path class="s2" d="M206 184 V196 M211 184 V196 M216 184 V196 M221 184 V196 M226 184 V196 M231 184 V196 M236 184 V196 M266 184 V196 M271 184 V196 M276 184 V196 M281 184 V196 M286 184 V196 M291 184 V196 M296 184 V196 M301 184 V196 M306 184 V196 M311 184 V196 M316 184 V196"/>')
    layer("link", '<path d="M182 192 H196.3"/>')
    # Side screened room has its own gable; the A-frame leg has no wall to lean on
    mesh = " ".join(f"M{x} 178 V192" for x in range(346, 384, 4) if x != 362)
    layer("screened",
          f'<path d="M338 174 L364 158 L390 174"/><path d="M342 174 V194 M364 174 V194 M386 174 V194"/>'
          f'<path d="M324 194 H390"/><path class="s2 fine" d="{mesh}"/><path d="M342 194 V204 M386 194 V204"/>')
    mesh2 = " ".join(f"M{x} 188 V202" for x in range(346, 384, 4) if x != 362)
    layer("screened-wo",
          f'<path d="M338 184 L364 168 L390 184"/><path d="M342 184 V204 M364 184 V204 M386 184 V204"/>'
          f'<path d="M330 204 H390"/><path class="s2 fine" d="{mesh2}"/><path d="M342 204 V234 M386 204 V234"/>')

@house_type("townhome")
def _townhome():
    # Minimal: a row of three attached units across the house zone. Stoops instead of a porch.
    layer("house",
          '<path d="M190 204 V150 H330 V204 H190"/><path d="M236 150 V204 M284 150 V204"/>'
          + "".join(f'<path d="M{d} 204 V174 H{d+14} V204"/><rect class="glass" x="{w}" y="162" width="12" height="22"/>'
                    for d, w in ((198, 218), (244, 264), (290, 310))))
    layer("roof1", '<path d="M182 152 L213 128 L236 144 L260 126 L284 144 L307 128 L338 152"/>')
    layer("second",
          '<path d="M190 150 V106 H330 V150"/><path d="M236 106 V150 M284 106 V150"/>'
          + "".join(f'<rect class="glass" x="{x}" y="116" width="18" height="22"/>' for x in (204, 251, 298)))
    layer("roof2", '<path d="M182 108 L213 84 L236 100 L260 82 L284 100 L307 84 L338 108"/>')
    layer("porch",
          "".join(f'<path d="M{d-3} 170 H{d+17}"/><path class="s2" d="M{d-2} 170 l3 3 M{d+16} 170 l-3 3"/>' for d in (198, 244, 290)))
    layer("link", '<path d="M182 178 H190"/>')

for tname, fn in TYPES.items():
    A(f'<g data-type="{tname}">')
    fn()
    A('</g>')

# Walkout: exposed lower level (x 268-330, y 204-238) + earth hatch on the buried side
layer("walkout",
      '<path d="M268 204 V238 H330 V204"/>'
      '<rect class="glass" x="282" y="214" width="34" height="24"/><path class="s2" d="M299 214 V238"/>'
      '<path class="s2 fine" d="M202 214 l5 -5 M210 214 l5 -5 M218 214 l5 -5 M226 214 l5 -5 M234 214 l5 -5 M242 214 l5 -5 M250 214 l5 -5 M258 214 l5 -5"/>')
# Basement on a flat lot: dashed outline below grade + two window wells
layer("basement",
      '<path class="dash long s2" d="M198 208 V232 H322 V208"/>'
      '<path d="M210 204 a6 5 0 0 0 12 0 M298 204 a6 5 0 0 0 12 0"/>')

# ---------- SIDE OUTDOOR SLOT x 330-386 (deck or screened porch), pad and elevated variants
bal = " ".join(f"M{x} 182 V194" for x in range(338, 382, 8))
layer("deck",
      f'<path d="M330 194 H382"/><path d="M330 182 H382"/><path d="M382 182 V194"/>'
      f'<path class="s2" d="{bal}"/><path d="M334 194 V204 M378 194 V204"/>')
bal2 = " ".join(f"M{x} 192 V204" for x in range(338, 382, 8))
layer("deck-wo",
      f'<path d="M330 204 H382"/><path d="M330 192 H382"/><path d="M382 192 V204"/>'
      f'<path class="s2" d="{bal2}"/><path d="M336 204 V234 M378 204 V234"/><path class="s2" d="M336 210 L378 228"/>')
mesh = " ".join(f"M{x} 172 V192" for x in range(338, 382, 4) if x not in (358,))
layer("screened",
      f'<path d="M330 162 L388 170"/><path d="M334 166 V194 M358 167.5 V194 M382 169.5 V194"/>'
      f'<path d="M330 194 H384"/><path class="s2 fine" d="{mesh}"/><path d="M334 194 V204 M382 194 V204"/>')
mesh2 = " ".join(f"M{x} 182 V202" for x in range(338, 382, 4) if x not in (358,))
layer("screened-wo",
      f'<path d="M330 172 L388 180"/><path d="M334 176 V204 M358 177.5 V204 M382 179.5 V204"/>'
      f'<path d="M330 204 H384"/><path class="s2 fine" d="{mesh2}"/><path d="M336 204 V234 M378 204 V234"/>')
layer("patio",
      '<path d="M332 234 H390 V238 H332 Z"/><path class="s2" d="M342 234 V238 M352 234 V238 M362 234 V238 M372 234 V238 M382 234 V238"/>')

# ---------- OUTBUILDING SLOT x 394-446 (pad, or lower grade with a walkout)
layer("shop",
      '<path d="M398 204 V176 H442 V204"/><path d="M394 178 L420 158 L446 178"/>'
      '<path d="M410 204 V184 H430 V204"/><path class="s2" d="M410 184 L430 204 M430 184 L410 204"/>'
      '<rect class="glass" x="416" y="166" width="8" height="6"/>',
      dy={"low": LOW - PAD})
layer("oldshed",
      '<path class="dash long" d="M404 204 V186 H436 V204"/><path class="dash long" d="M400 188 L420 174 L440 188"/>'
      '<path class="s2" d="M414 192 l8 8 M422 192 l-8 8"/>',
      dy={"low": LOW - PAD})

svg = ('<svg class="scene" viewBox="0 32 520 256" fill="none" stroke="currentColor" stroke-width="1.7" '
       'stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="scene-title">'
       '<title id="scene-title">A line drawing of the lot and the house, built from your answers</title>'
       + "".join(out) + '</svg>')
here = pathlib.Path(__file__).resolve().parent.parent
(here / "scene-lake.svg").write_text(svg)
print(len(svg), "bytes;", len(out), "layers")
