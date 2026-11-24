// src/data/site.ts — facts about the business (null-config pattern).
// RULE: a value is filled in ONLY when confirmed by Jake/the client or a cited page in brief/sources.md.
// null = unknown → every component that shows it renders nothing, and schema omits it.
// Never use placeholders like "XX", "20+", "555-0100".

export type Source = { by: 'jake' | 'client' | 'url'; ref: string; date: string }; // e.g. { by: 'url', ref: 'https://…/about', date: '2026-11-24' }

export const site = {
  name: 'Business Name',                 // from Jake's prompt
  legalName: null as string | null,
  slug: 'business-name',
  domain: null as string | null,         // 'heartwoodhomes.com'
  trade: 'general-contractor',
  schemaType: 'GeneralContractor',       // most specific schema.org LocalBusiness subtype

  phone: null as string | null,          // display format '(423) 555-0123' — real number only
  phoneE164: null as string | null,      // '+14235550123' for tel:/sms:
  textEnabled: null as boolean | null,   // show "Text" in the mobile action bar
  email: null as string | null,
  address: null as null | { street: string; city: string; region: string; postal: string },
  serviceAreaOnly: null as boolean | null, // true = hide street address, show area
  areaServed: null as string[] | null,   // confirmed towns/counties only
  serviceRadiusMiles: null as number | null,
  hours: null as null | { days: string; open: string; close: string }[],
  emergencyService: null as boolean | null,

  yearFounded: null as number | null,
  license: null as null | { label: string; number: string }[], // e.g. { label: 'TN Contractor License', number: '…' }
  insured: null as boolean | null,
  bonded: null as boolean | null,
  certifications: null as string[] | null,
  associations: null as string[] | null,
  awards: null as string[] | null,
  warranty: null as string | null,       // exact wording the client approved
  financing: null as null | { partner: string; url?: string },
  projectsCompleted: null as number | null,
  team: null as null | { name: string; role: string; photo?: string }[],

  google: {
    profileUrl: null as string | null,
    reviewUrl: null as string | null,
    rating: null as number | null,       // GoogleBadge hides numbers when null
    reviewCount: null as number | null,
    checkedOn: null as string | null,    // ratings change; re-check before launch
  },
  socials: {
    facebook: null as string | null, instagram: null as string | null, youtube: null as string | null,
    houzz: null as string | null, nextdoor: null as string | null, linkedin: null as string | null,
  },

  forms: {
    provider: null as null | 'resend' | 'gohighlevel',
    to: null as string | null,           // Resend recipient
    ghlEmbedUrl: null as string | null,
  },

  sources: {} as Record<string, Source>, // key = field name above, e.g. sources.yearFounded
};

// Usage in a component:
// {site.yearFounded && <li>Building since {site.yearFounded}</li>}
// {site.google.rating && site.google.reviewCount ? <GoogleBadge … /> : site.google.profileUrl && <a href={site.google.profileUrl}>Read our reviews on Google</a>}
