/** Steps for templates/scripts/qa/cls-run.mjs. Selectors match the built /plan/ page. */
export default async function (p, { pause }) {
  const pick = async (name, value) => {
    const el = p.locator(`.panel.is-on label:has(input[name="${name}"][value="${value}"])`);
    await el.scrollIntoViewIfNeeded();
    await el.click();
    await pause();
  };
  const next = async () => {
    const el = p.locator('.panel.is-on [data-go="next"]');
    await el.scrollIntoViewIfNeeded();
    await el.click();
    await pause(500);
  };
  await pick("land", "yes");
  await next();
  await p.locator("#place").scrollIntoViewIfNeeded();
  await p.fill("#place", "Sale Creek, Hamilton County");
  await p.fill("#parcel", "https://maps.app.goo.gl/x");
  await pick("acres", "3-10");
  await next();
  await pick("terrain", "water");
  await pick("cover", "heavy");
  await next();
  for (const [n, v] of [["access", "paved"], ["power", "yes"], ["water", "well"], ["sewer", "septic"], ["internet", "yes"], ["structure", "no"]]) await pick(n, v);
  await next();
  await pick("type", "aframe");
  await next();
  for (const k of ["beds", "baths"]) {
    for (let i = 0; i < 2; i++) {
      const btn = p.locator(`[data-stepper="${k}"] [data-dir="1"]`);
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      await pause(250);
    }
  }
  await pick("stories", "2");
  const slider = p.locator("#sqft");
  await slider.scrollIntoViewIfNeeded();
  await slider.fill("2800");
  await pause();
  await next();
  await p.locator('.panel.is-on label:has(input[name="who"][value="us"])').click();
  await pick("use", "second");
  await next();
  await pick("plans", "sketch");
  for (const n of ["porch", "deck", "garage", "basement", "shop"]) {
    const chip = p.locator(`.panel.is-on label:has(input[name="need"][value="${n}"])`);
    await chip.scrollIntoViewIfNeeded();
    await chip.click();
    await pause(450);
  }
  await next();
  await pick("budget", "comfortable");
  await pick("pay", "loan");
  await next();
  await pick("timing", "next");
  await pick("sell", "no");
  const brief = p.locator('.panel.is-on [data-go="brief"]');
  await brief.scrollIntoViewIfNeeded();
  await brief.click();
  await pause(2600);
}
