import { onRequestPost as __api_quote_ts_onRequestPost } from "/Users/jakejohnson/www/halfbyte/site-heartwood-homes/sites/heartwood-homes/functions/api/quote.ts"

export const routes = [
    {
      routePath: "/api/quote",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_quote_ts_onRequestPost],
    },
  ]