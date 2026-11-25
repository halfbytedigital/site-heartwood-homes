/* Heartwood line-house sketch. viewBox 0 0 320 220, stroke 1.55, pathLength 1. */
export function houseSVG() {
  return `<svg viewBox="0 0 320 220" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="house-title">
  <title id="house-title">A line drawing of the lot and the house, built from your answers</title>

  <!-- Distant ridge, steep lots only -->
  <g class="house-part" data-part="ridge">
    <path pathLength="1" d="M8 96 C 50 86, 90 104, 140 92 C 188 80, 230 98, 312 88"/>
  </g>

  <!-- Back trees (cover) -->
  <g class="house-part" data-part="trees-back">
    <g data-tree="a"><path pathLength="1" d="M16 164 V122"/><path pathLength="1" d="M16 124 c-10 0-14-9-10-18 9 2 12 2 20 0 2 11-2 18-10 18 z"/></g>
    <g data-tree="b"><path pathLength="1" d="M302 168 V124"/><path pathLength="1" d="M302 126 c-11 0-15-10-10-19 9 2 13 2 21 0 3 11-2 19-11 19 z"/></g>
    <g data-tree="c"><path pathLength="1" d="M278 166 V118"/><path pathLength="1" d="M278 120 c-12 0-16-11-11-21 10 2 14 3 23 0 3 12-3 21-12 21 z"/></g>
    <g data-tree="d"><path pathLength="1" d="M4 166 V128"/><path pathLength="1" d="M4 130 c-9 0-12-8-8-16 8 2 11 2 17 0 2 10-1 16-9 16 z"/></g>
  </g>

  <!-- Ground: exclusive -->
  <g class="house-part is-on" data-part="ground-flat">
    <path pathLength="1" d="M8 168 H312"/>
  </g>
  <g class="house-part" data-part="ground-gentle">
    <path pathLength="1" d="M8 168 H226 L312 192"/>
  </g>
  <g class="house-part" data-part="ground-steep">
    <path pathLength="1" d="M8 168 H226 L312 208"/>
  </g>
  <g class="house-part" data-part="ground-water">
    <path pathLength="1" d="M8 168 H226 L272 198 L312 202"/>
  </g>
  <g class="house-part" data-part="ground-walkout">
    <path pathLength="1" d="M8 168 H226 V198 H312"/>
  </g>
  <g class="house-part" data-part="ground-walkout-water">
    <path pathLength="1" d="M8 168 H226 V198 H272"/>
  </g>

  <!-- Water, waterfront only -->
  <g class="house-part" data-part="water">
    <path pathLength="1" d="M226 168 L272 198"/>
    <path pathLength="1" d="M240 188 C 270 192, 296 200, 316 204"/>
    <path pathLength="1" d="M252 198 C 280 202, 300 208, 316 212"/>
  </g>
  <g class="house-part" data-part="water-walkout">
    <path pathLength="1" d="M272 198 C 292 200, 306 206, 316 208"/>
    <path pathLength="1" d="M276 206 C 296 208, 308 214, 316 214"/>
  </g>

  <!-- Drive -->
  <g class="house-part" data-part="drive-paved">
    <path pathLength="1" d="M8 168 C 20 168, 28 168, 36 168"/>
    <path pathLength="1" d="M8 174 C 22 174, 30 172, 36 168"/>
  </g>
  <g class="house-part" data-part="drive-gravel">
    <path pathLength="1" d="M8 168 C 20 168, 28 168, 36 168" stroke-dasharray="0.08 0.04"/>
    <path pathLength="1" d="M8 174 C 22 174, 30 172, 36 168" stroke-dasharray="0.08 0.04"/>
  </g>
  <g class="house-part" data-part="drive-needs">
    <path pathLength="1" d="M8 170 C 18 170, 24 170, 34 168" stroke-dasharray="0.04 0.06"/>
  </g>

  <!-- Existing structure to remove -->
  <g class="house-part" data-part="old-shed">
    <path pathLength="1" d="M270 168 V148 H300 V168" stroke-dasharray="0.06 0.05"/>
    <path pathLength="1" d="M268 148 L285 136 L302 148" stroke-dasharray="0.06 0.05"/>
    <path pathLength="1" d="M278 168 V156 h8 v12" stroke-dasharray="0.06 0.05"/>
  </g>

  <!-- Shared garage, left of the house -->
  <g class="house-part" data-part="garage">
    <path pathLength="1" d="M38 168 V132 H110 V168"/>
    <path pathLength="1" d="M34 132 L74 108 L114 132"/>
    <path pathLength="1" d="M50 168 V142 h48 v26"/>
    <path pathLength="1" d="M50 152 h48"/>
  </g>

  <!-- Walkout: downhill wall past the porch, patio on the lower grade -->
  <g class="house-part" data-part="basement">
    <path pathLength="1" d="M226 168 V198"/>
    <path pathLength="1" d="M226 198 H270"/>
    <path pathLength="1" d="M226 198 V176 h18 v22"/>
    <path pathLength="1" d="M234 186 v4"/>
    <path pathLength="1" d="M230 198 V190 H266 V198"/>
  </g>

  <!-- FAMILY: classic centered gable -->
  <g data-house="family">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M110 168 V118 H230 V168"/>
      <path pathLength="1" d="M156 168 V136 h26 v32"/>
      <path pathLength="1" d="M122 130 h22 v20 h-22 z"/>
      <path pathLength="1" d="M196 130 h22 v20 h-22 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M104 118 L170 78 L236 118"/>
      <path pathLength="1" d="M200 98 V70 h10 v20"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M110 118 V78 H230 V118"/>
      <path pathLength="1" d="M122 88 h22 v18 h-22 z"/>
      <path pathLength="1" d="M196 88 h22 v18 h-22 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M104 78 L170 40 L236 78"/>
      <path pathLength="1" d="M200 60 V34 h10 v18"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M150 124 H188"/>
      <path pathLength="1" d="M144 134 H194"/>
      <path pathLength="1" d="M150 124 L144 134 M188 124 L194 134"/>
      <path pathLength="1" d="M146 168 V134 M192 168 V134"/>
      <path pathLength="1" d="M144 168 H194"/>
      <path pathLength="1" d="M144 168 v4 H194 v-4"/>
    </g>
  </g>

  <!-- LAKE: wider, shallower roof, deck to the view -->
  <g data-house="lake">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M110 168 V122 H226 V168"/>
      <path pathLength="1" d="M154 168 V138 h26 v30"/>
      <path pathLength="1" d="M122 132 h20 v18 h-20 z"/>
      <path pathLength="1" d="M190 132 h20 v18 h-20 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M104 122 L168 88 L232 122"/>
      <path pathLength="1" d="M208 104 V80 h10 v16"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M110 122 V84 H226 V122"/>
      <path pathLength="1" d="M122 94 h20 v16 h-20 z"/>
      <path pathLength="1" d="M190 94 h20 v16 h-20 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M104 84 L168 50 L232 84"/>
      <path pathLength="1" d="M208 68 V46 h10 v14"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M148 126 H186"/>
      <path pathLength="1" d="M142 136 H192"/>
      <path pathLength="1" d="M148 126 L142 136 M186 126 L192 136"/>
      <path pathLength="1" d="M144 168 V136 M190 168 V136"/>
      <path pathLength="1" d="M142 168 H192"/>
      <path pathLength="1" d="M142 168 v4 H192 v-4"/>
    </g>
    <g class="house-part" data-part="deck">
      <path pathLength="1" d="M226 168 H274"/>
      <path pathLength="1" d="M226 168 v4 H274 v-4"/>
      <path pathLength="1" d="M232 168 V158 H268 V168"/>
      <path pathLength="1" d="M232 158 h36"/>
      <path pathLength="1" d="M241 158 v10 M250 158 v10 M259 158 v10"/>
    </g>
  </g>

  <!-- CABIN: smaller, steeper roof -->
  <g data-house="cabin">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M126 168 V120 H220 V168"/>
      <path pathLength="1" d="M160 168 V138 h22 v30"/>
      <path pathLength="1" d="M136 132 h18 v18 h-18 z"/>
      <path pathLength="1" d="M192 132 h18 v18 h-18 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M118 120 L173 70 L228 120"/>
      <path pathLength="1" d="M204 96 V68 h10 v20"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M136 120 V92 H210 V120"/>
      <path pathLength="1" d="M148 100 h16 v12 h-16 z"/>
      <path pathLength="1" d="M182 100 h16 v12 h-16 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M118 92 L173 48 L228 92"/>
      <path pathLength="1" d="M204 72 V48 h10 v16"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M152 126 H190"/>
      <path pathLength="1" d="M146 136 H196"/>
      <path pathLength="1" d="M152 126 L146 136 M190 126 L196 136"/>
      <path pathLength="1" d="M148 168 V136 M194 168 V136"/>
      <path pathLength="1" d="M146 168 H196"/>
      <path pathLength="1" d="M146 168 v4 H196 v-4"/>
    </g>
  </g>

  <!-- A-FRAME -->
  <g data-house="aframe">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M118 168 L170 36 L222 168"/>
      <path pathLength="1" d="M130 168 H210"/>
      <path pathLength="1" d="M158 168 V140 h24 v28"/>
      <path pathLength="1" d="M164 110 h12 v16 h-12 z"/>
    </g>
    <g class="house-part" data-part="roof1"></g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M140 110 H200"/>
      <path pathLength="1" d="M166 70 h8 v12 h-8 z"/>
    </g>
    <g class="house-part" data-part="roof2"></g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M150 168 H194"/>
      <path pathLength="1" d="M150 168 v5 H194 v-5"/>
      <path pathLength="1" d="M152 168 V160 H192 V168"/>
      <path pathLength="1" d="M152 160 h40"/>
    </g>
  </g>

  <!-- RENTAL: front-facing cottage with a dormer -->
  <g data-house="rental">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M110 168 V124 H230 V168"/>
      <path pathLength="1" d="M158 168 V138 h24 v30"/>
      <path pathLength="1" d="M122 134 h22 v18 h-22 z"/>
      <path pathLength="1" d="M198 134 h22 v18 h-22 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M106 124 H234"/>
      <path pathLength="1" d="M106 124 V116 H234 V124"/>
      <path pathLength="1" d="M148 124 L170 94 L192 124"/>
      <path pathLength="1" d="M214 116 V90 h10 v16"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M110 124 V88 H230 V124"/>
      <path pathLength="1" d="M122 98 h22 v14 h-22 z"/>
      <path pathLength="1" d="M198 98 h22 v14 h-22 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M106 88 H234"/>
      <path pathLength="1" d="M106 88 V80 H234 V88"/>
      <path pathLength="1" d="M148 88 L170 60 L192 88"/>
      <path pathLength="1" d="M214 80 V58 h10 v14"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M148 124 H192"/>
      <path pathLength="1" d="M142 134 H198"/>
      <path pathLength="1" d="M148 124 L142 134 M192 124 L198 134"/>
      <path pathLength="1" d="M144 168 V134 M196 168 V134"/>
      <path pathLength="1" d="M142 168 H198"/>
      <path pathLength="1" d="M142 168 v4 H198 v-4"/>
    </g>
  </g>

  <!-- TOWNHOMES: a joined pair -->
  <g data-house="townhome">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M110 168 V120 H170 V168"/>
      <path pathLength="1" d="M170 168 V120 H230 V168"/>
      <path pathLength="1" d="M170 120 V168"/>
      <path pathLength="1" d="M128 168 V140 h18 v28"/>
      <path pathLength="1" d="M188 168 V140 h18 v28"/>
      <path pathLength="1" d="M150 132 h14 v16 h-14 z"/>
      <path pathLength="1" d="M210 132 h14 v16 h-14 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M104 120 L140 86 L176 120"/>
      <path pathLength="1" d="M164 120 L200 86 L236 120"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M110 120 V86 H170 V120"/>
      <path pathLength="1" d="M170 120 V86 H230 V120"/>
      <path pathLength="1" d="M170 86 V120"/>
      <path pathLength="1" d="M126 96 h14 v14 h-14 z"/>
      <path pathLength="1" d="M186 96 h14 v14 h-14 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M104 86 L140 54 L176 86"/>
      <path pathLength="1" d="M164 86 L200 54 L236 86"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M122 126 H152"/>
      <path pathLength="1" d="M118 134 H156"/>
      <path pathLength="1" d="M122 126 L118 134 M152 126 L156 134"/>
      <path pathLength="1" d="M120 168 V134 M154 168 V134"/>
      <path pathLength="1" d="M182 126 H212"/>
      <path pathLength="1" d="M178 134 H216"/>
      <path pathLength="1" d="M182 126 L178 134 M212 126 L216 134"/>
      <path pathLength="1" d="M180 168 V134 M214 168 V134"/>
    </g>
  </g>

  <!-- SOMETHING ELSE: a simple generic gable -->
  <g data-house="else">
    <g class="house-part" data-part="first">
      <path pathLength="1" d="M118 168 V122 H226 V168"/>
      <path pathLength="1" d="M160 168 V140 h22 v28"/>
      <path pathLength="1" d="M130 134 h18 v16 h-18 z"/>
      <path pathLength="1" d="M196 134 h18 v16 h-18 z"/>
    </g>
    <g class="house-part" data-part="roof1">
      <path pathLength="1" d="M112 122 L172 86 L232 122"/>
    </g>
    <g class="house-part" data-part="second">
      <path pathLength="1" d="M118 122 V86 H226 V122"/>
      <path pathLength="1" d="M130 96 h18 v14 h-18 z"/>
      <path pathLength="1" d="M196 96 h18 v14 h-18 z"/>
    </g>
    <g class="house-part" data-part="roof2">
      <path pathLength="1" d="M112 86 L172 50 L232 86"/>
    </g>
    <g class="house-part" data-part="porch">
      <path pathLength="1" d="M152 126 H190"/>
      <path pathLength="1" d="M146 136 H196"/>
      <path pathLength="1" d="M152 126 L146 136 M190 126 L196 136"/>
      <path pathLength="1" d="M148 168 V136 M194 168 V136"/>
      <path pathLength="1" d="M146 168 H196"/>
    </g>
  </g>

  <!-- Shop / outbuilding -->
  <g class="house-part" data-part="shop">
    <path pathLength="1" d="M268 168 V146 H302 V168"/>
    <path pathLength="1" d="M266 146 L285 132 L304 146"/>
    <path pathLength="1" d="M276 168 V154 h12 v14"/>
  </g>

  <!-- Power pole, near the road -->
  <g class="house-part" data-part="power">
    <path pathLength="1" d="M12 168 V88"/>
    <path pathLength="1" d="M4 96 H20"/>
    <path pathLength="1" d="M6 96 v4 M18 96 v4"/>
    <path pathLength="1" d="M4 96 C 2 92, 1 90, 0 90"/>
  </g>

  <!-- Well -->
  <g class="house-part" data-part="well">
    <circle pathLength="1" cx="30" cy="164" r="5"/>
    <circle pathLength="1" cx="30" cy="164" r="2"/>
    <path pathLength="1" d="M25 159 L30 150 L35 159"/>
  </g>

  <!-- Septic -->
  <g class="house-part" data-part="septic">
    <rect pathLength="1" x="48" y="176" width="26" height="10" rx="3"/>
    <path pathLength="1" d="M74 181 h16" stroke-dasharray="0.06 0.05"/>
    <path pathLength="1" d="M78 186 h14" stroke-dasharray="0.06 0.05"/>
  </g>

  <!-- Front tree, low bank / right, moves with slope in JS via two groups -->
  <g class="house-part is-on" data-part="tree-flat">
    <path pathLength="1" d="M308 168 V130"/>
    <path pathLength="1" d="M308 132 c-11 0-15-9-10-18 9 2 13 2 21 0 2 11-2 18-11 18 z"/>
  </g>
  <g class="house-part" data-part="tree-low">
    <path pathLength="1" d="M308 198 V160"/>
    <path pathLength="1" d="M308 162 c-11 0-15-9-10-18 9 2 13 2 21 0 2 11-2 18-11 18 z"/>
  </g>
</svg>`;
}


export function syncSketch(root, state) {
  const on = (part, yes) => {
    root.querySelectorAll(`[data-part="${part}"]`).forEach(g => {
      const was = g.classList.contains("is-on");
      if (yes && !was) {
        g.classList.remove("is-on");
        void g.offsetWidth;
        g.classList.add("is-on");
      } else {
        g.classList.toggle("is-on", !!yes);
      }
    });
  };

  const type = state.type || "";
  const needs = state.needs || [];
  const basement = needs.includes("basement");
  const terrain = state.terrain || (basement ? "gentle" : "");
  const isWater = terrain === "water";
  const sloped = terrain === "gentle" || terrain === "steep" || isWater || basement;
  const shop = needs.includes("shop");
  const structure = state.structure === "yes";

  root.querySelectorAll("[data-house]").forEach(g => {
    g.classList.toggle("is-on", g.getAttribute("data-house") === type);
  });

  on("ridge", terrain === "steep");
  on("ground-flat", !sloped && !basement);
  on("ground-gentle", sloped && !basement && terrain === "gentle");
  on("ground-steep", sloped && !basement && terrain === "steep");
  on("ground-water", sloped && !basement && isWater);
  on("ground-walkout", basement && !isWater);
  on("ground-walkout-water", basement && isWater);
  on("water", isWater && !basement);
  on("water-walkout", isWater && basement);

  const cover = state.cover || "";
  const treeCount = cover === "heavy" ? 4 : cover === "partly" ? 2 : 0;
  const back = root.querySelector('[data-part="trees-back"]');
  if (back) {
    back.classList.toggle("is-on", treeCount > 0);
    [...back.querySelectorAll("[data-tree]")].forEach((el, i) => {
      let show = i < treeCount;
      const id = el.getAttribute("data-tree");
      // c sits at x=278, on the downhill side — keep it off the patio, shop, or shed
      if (id === "c" && (type === "lake" || structure || shop || basement)) show = false;
      el.style.display = show ? "" : "none";
    });
  }
  // Front right tree sits past the patio; hide it if a shop or shed occupies that bank
  const rightOccupied = shop || structure;
  on("tree-flat", treeCount > 0 && !sloped && !rightOccupied);
  on("tree-low", treeCount > 0 && sloped && !rightOccupied);

  on("drive-paved", state.access === "paved");
  on("drive-gravel", state.access === "gravel");
  on("drive-needs", state.access === "needs");
  on("old-shed", structure);
  on("garage", needs.includes("garage"));
  on("basement", basement);
  on("power", state.power === "yes");
  on("well", state.water === "well");
  on("septic", state.sewer === "septic" || state.sewer === "unsure");
  on("shop", shop);

  // Well stays on the high pad, left of the garage — never translated onto the bank
  const well = root.querySelector('[data-part="well"]');
  if (well) well.removeAttribute("transform");

  // Shop and old shed sit on the lower grade when the walkout cuts the bank
  const lower = basement ? "translate(0, 30)" : "";
  const shed = root.querySelector('[data-part="old-shed"]');
  const shopEl = root.querySelector('[data-part="shop"]');
  if (shed) {
    // If both a shop and a shed would share the lower right, slide the shed further right
    if (basement && shop) shed.setAttribute("transform", "translate(20, 30)");
    else if (lower) shed.setAttribute("transform", lower);
    else shed.removeAttribute("transform");
  }
  if (shopEl) {
    if (lower) shopEl.setAttribute("transform", lower);
    else shopEl.removeAttribute("transform");
  }

  if (type) {
    const house = root.querySelector(`[data-house="${type}"]`);
    const two = String(state.stories) === "2" || String(state.stories) === "3" || needs.includes("story2");
    house?.querySelectorAll('[data-part="first"]').forEach(g => g.classList.add("is-on"));
    house?.querySelectorAll('[data-part="roof1"]').forEach(g => g.classList.toggle("is-on", !two));
    house?.querySelectorAll('[data-part="second"]').forEach(g => g.classList.toggle("is-on", two));
    house?.querySelectorAll('[data-part="roof2"]').forEach(g => g.classList.toggle("is-on", two));
    const porchOn = needs.includes("porch") || needs.includes("screened");
    house?.querySelectorAll('[data-part="porch"]').forEach(g => g.classList.toggle("is-on", porchOn));
    // Lake deck sits on the pad. When a walkout is on, the patio is the downhill deck.
    house?.querySelectorAll('[data-part="deck"]').forEach(g => g.classList.toggle("is-on", type === "lake" && !basement));
  }
}
