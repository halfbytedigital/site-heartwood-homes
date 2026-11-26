# Measurement plan — Heartwood Homes

Ships with every site. Fill this in during site-plan and wire it during page-build. Source of truth for
**site actions** is the analytics tool below. Source of truth for **leads and jobs** is GoHighLevel (or the
client's CRM). Do not promise industry conversion benchmarks; promise a measured 90-day baseline and
improvement against it.

## Analytics

- **Default:** Plausible (cookieless, custom events, a simple client dashboard).
- **Budget option:** Umami (`data-umami-event`).
- **Ad clients only:** GA4 + Consent Mode, loaded through Cloudflare Zaraz so it stays off the main thread. Use `generate_lead` for form success.
- **Always also:** Cloudflare Web Analytics for traffic and Core Web Vitals (it has no custom events).

Chosen tool: Plausible
Dashboard URL: null until Jake creates the project

No Plausible script is on the site yet. Events are wired (`data-event` and the qualifier). They stay quiet until a real domain is added. Do not invent an ID.

Call tracking: click events only (`call_click`). No call-tracking number.

No price tool, so `estimator_*` does not fire. No SMS, so `text_click` does not fire. `quote_submit` and `qualifier_complete` fire only when `/api/quote` returns success. A 503 (webhook unset) does not count as a conversion.

## Event list (same names in every tool)

Wire through `data-event` attributes (and a small adapter in `src/scripts/analytics.ts`). Fire in the preview
and confirm each one in the dashboard before launch.

| Event | Fires when | Properties | Counts as |
|---|---|---|---|
| `quote_submit` | Quote form succeeds (thank-you page) | form, service, town, utm_* | Primary conversion |
| `booking_complete` | Scheduler confirms | type | Primary conversion |
| `call_click` | Tap or click on a `tel:` link | placement (header, hero, bar, footer), page | Lead intent |
| `text_click` | Tap on an `sms:` link | placement, page | Lead intent |
| `estimator_start` | First input changed | tool | Engagement |
| `estimator_complete` | Result range shown (ungated) | tool, range bucket | Engagement |
| `estimator_to_quote` | "Send me this estimate" submitted | tool, inputs summary | Primary conversion |
| `form_start` | First field focused | form | Diagnostic |
| `qualifier_start` | First step of a multi-step qualifier | form | Engagement |
| `qualifier_complete` | Qualifier submitted | form | Primary conversion |
| `directions_click`, `email_click` | Map or mailto tapped | page | Minor |
| `wizard_start` | First answer on `/plan/`, or a deep link that already has answers | page | Engagement |
| `wizard_step` | A question step is shown | step, index | Engagement |
| `wizard_complete` | The brief is shown | page | Engagement |
| `brief_save` | Print / PDF, or the brief link is copied | method (`print` or `link`) | Engagement |
| `brief_send` | The brief is submitted and `/api/quote` succeeds | page | Primary conversion |
| `wizard_exit_contact` | “Rather just talk?” leaves for the contact qualifier | step | Lead intent |

## Call tracking

Decision (pick one, record it):

- [ ] Click events only (`call_click`) — default, free.
- [ ] Static tracking numbers per channel (GBP / ads / print), forwarding to the client.
- [ ] Dynamic number insertion (CallRail or similar) — only if the client pays for it.
- [ ] GoHighLevel numbers, so calls and texts land in the same pipeline.

Keep the real number in schema and the footer. A click is not a connected call; say so in the report.

## UTMs and GHL

- Tag every link we control: Google Business Profile website link `utm_source=google&utm_medium=organic&utm_campaign=gbp`, plus ads, email, and print QR codes.
- Capture UTMs and the landing page into hidden form fields and pass them to GoHighLevel.
- Report **first** attribution for "what brought them in" and **latest** for "what made them act."

## 90-day baseline

After launch, do not claim an industry conversion rate. In the first 90 days, record:

- Visits, quote submits, qualifier completes, estimator completes, `call_click` / `text_click`
- Website conversion rate: leads ÷ visits
- Tool funnel: start → complete → quote request
- Speed-to-lead (from GHL, if the client tracks it)
- Core Web Vitals pass/fail

That 90-day window is the baseline later months are compared against. Note seasonality. For most local sites,
do not run A/B tests; change one thing at a time and compare 60–90 day windows.

## Monthly report

Use `templates/monthly-client-report.md`. One page, sent to Jake for the client.
