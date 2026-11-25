/**
 * Estimator rates for one site. Copy to sites/<slug>/src/data/estimator.ts.
 * Every rate the UI needs is listed here. If the client has not supplied a
 * figure, it is `null`. A null input hides the numeric result and shows the CTA
 * — never a made-up price. See skills/page-build/conversion.md (anti-paywall rule).
 */
export const estimator = {
  /** ISO date the ranges are based on, or null. Shown as "based on our <year> jobs". */
  pricedAsOf: null as string | null,
  /** Short "what's included / excluded" line, or null. */
  includes: null as string | null,
  disclaimer: "Final price after a site visit.",
  /**
   * Example: custom-home budget planner.
   * costPerSqFt[tier] = { min, max } in dollars, or null if unknown.
   */
  costPerSqFt: {
    standard: null as { min: number; max: number } | null,
    mid: null as { min: number; max: number } | null,
    premium: null as { min: number; max: number } | null,
  },
  /** Land / site work called out separately, or null. */
  siteWorkNote: null as string | null,
};
