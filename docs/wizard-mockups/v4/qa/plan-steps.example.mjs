// Example --steps module for cls-run.mjs (Heartwood v4 mock flow).
export default async function (p, { pause }) {
  const pick = async (name, value) => { await p.locator(`label:has(input[name="${name}"][value="${value}"])`).click(); await pause(); };
  const next = async () => { await p.locator('.panel.is-on [data-go="next"]').click(); await pause(500); };
  await pick('land', 'yes'); await next();
  await p.fill('#place', 'Sale Creek, Hamilton County'); await p.fill('#parcel', 'https://maps.app.goo.gl/x'); await pick('acres', '3-10'); await next();
  await pick('terrain', 'water'); await pick('cover', 'heavy'); await next();
  for (const [n, v] of [['access','paved'],['power','yes'],['water','well'],['sewer','septic'],['internet','yes'],['structure','no']]) await pick(n, v);
  await next();
  await pick('type', 'aframe'); await next();
  for (const k of ['beds', 'baths']) for (let i = 0; i < 2; i++) { await p.locator(`[data-stepper="${k}"] [data-dir="1"]`).click(); await pause(250); }
  await pick('stories', '2'); await next();
  await p.locator('label:has(input[name="who"][value="us"])').click(); await pick('use', 'second'); await next();
  await pick('plans', 'sketch');
  for (const n of ['porch', 'deck', 'garage', 'basement', 'shop']) { await p.locator(`label:has(input[name="need"][value="${n}"])`).click(); await pause(450); }
  await next();
  await pick('budget', 'comfortable'); await pick('pay', 'loan'); await next();
  await pick('timing', 'next'); await pick('sell', 'no');
  await p.locator('.panel.is-on [data-go="brief"]').click(); await pause(2600);
}
