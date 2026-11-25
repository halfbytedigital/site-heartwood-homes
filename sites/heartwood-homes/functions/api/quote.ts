interface Env {
  GHL_WEBHOOK_URL?: string;
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const form = await context.request.formData();
  const company = String(form.get('company') ?? '').trim();
  if (company) return json({ ok: true });

  const name = String(form.get('name') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const work = String(form.get('work') ?? '').trim();
  const area = String(form.get('area') ?? '').trim().slice(0, 160);
  const land = String(form.get('land') ?? '').trim().slice(0, 40);
  const timeline = String(form.get('timeline') ?? '').trim().slice(0, 40);
  const budget = String(form.get('budget') ?? '').trim().slice(0, 120);
  const message = String(form.get('message') ?? '').trim().slice(0, 4000);
  const project = String(form.get('project') ?? '').trim();
  const chapter = String(form.get('chapter') ?? '').trim();
  const houses = String(form.get('houses') ?? '').trim().slice(0, 500);
  const path = String(form.get('path') ?? '').trim().slice(0, 40);

  const allowed = ['custom-home', 'renovation', 'site-prep'];
  if (!name || (!phone && !email)) return json({ ok: false }, 400);
  if (work && !allowed.includes(work)) return json({ ok: false }, 400);

  const webhook = context.env.GHL_WEBHOOK_URL;
  if (!webhook) return json({ ok: false, reason: 'unset' }, 503);

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, phone, email, work, budget, message, project, chapter, area, land, timeline, houses, path }),
  });

  if (!response.ok) return json({ ok: false }, 502);
  return json({ ok: true });
}
