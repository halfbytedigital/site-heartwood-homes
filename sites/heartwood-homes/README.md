# Heartwood Homes

Astro site. `npm run build` writes `dist/`. Cloudflare Pages: build command `npm run build`, output `dist`, Node 20+.

The public site URL in `astro.config.mjs` is the current domain, `https://www.heartwoodchatt.com`. Connecting a domain is Jake’s call.

## Forms

Delivery is not chosen yet. Recommend GoHighLevel to the client. Do not add Resend unless that decision changes.

`functions/api/quote.ts` posts the form to `GHL_WEBHOOK_URL` when that env var is set. If it is empty, the function returns 503 and the page tells the visitor to call. It never pretends the lead was sent.

Optional later: `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. No site key is available, so the widget is not on the form.

Do not commit secrets.
