// Facts confirmed from Jake or from https://www.heartwoodchatt.com on 2026-11-24.
// null = unknown → components render nothing. See brief/sources.md.

export type Source = { by: 'jake' | 'client' | 'url'; ref: string; date: string };

export const site = {
  name: 'Heartwood Homes',
  legalName: 'Heartwood Homes, LLC' as string | null,
  slug: 'heartwood-homes',
  domain: null as string | null,
  trade: 'general-contractor',
  schemaType: 'GeneralContractor',

  phone: '(423) 994-4911' as string | null,
  phoneE164: '+14239944911' as string | null,
  textEnabled: null as boolean | null,
  email: 'info@heartwoodchatt.com' as string | null,
  address: null as null | { street: string; city: string; region: string; postal: string },
  serviceAreaOnly: true as boolean | null,
  areaServed: ['Chattanooga, TN'] as string[] | null,
  serviceRadiusMiles: null as number | null,
  hours: null as null | { days: string; open: string; close: string }[],
  emergencyService: null as boolean | null,

  yearFounded: 2017 as number | null,
  license: null as null | { label: string; number: string }[],
  insured: null as boolean | null,
  bonded: null as boolean | null,
  certifications: null as string[] | null,
  associations: null as string[] | null,
  awards: null as string[] | null,
  warranty: null as string | null,
  financing: null as null | { partner: string; url?: string },
  projectsCompleted: null as number | null,
  team: [
    { name: 'Daniel Hertgers', role: 'Founder' },
    { name: 'Laura Hertgers', role: 'Founder' },
  ] as null | { name: string; role: string; photo?: string }[],

  google: {
    profileUrl: 'https://www.google.com/search?q=Heartwood+Homes%2C+LLC+Chattanooga+TN' as string | null,
    reviewUrl: 'https://www.google.com/search?q=Heartwood+Homes%2C+LLC+Chattanooga+TN' as string | null,
    rating: 5 as number | null,          // panel said 5.0 on 2026-11-24. Confirm before launch.
    reviewCount: 19 as number | null,    // Jake and the same panel. Confirm before launch.
    checkedOn: '2026-11-24' as string | null,
  },
  socials: {
    facebook: 'https://www.facebook.com/HeartwoodHomesChatt' as string | null,
    instagram: 'https://www.instagram.com/heartwoodhomeschatt/' as string | null,
    youtube: null as string | null,
    houzz: null as string | null,
    nextdoor: null as string | null,
    linkedin: null as string | null,
  },

  forms: {
    provider: null as null | 'resend' | 'gohighlevel',
    to: null as string | null,
    ghlEmbedUrl: null as string | null,
  },

  sources: {
    name: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    legalName: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    phone: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    email: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    yearFounded: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    team: { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    serviceAreaOnly: { by: 'jake', ref: 'intake', date: '2026-11-24' },
    areaServed: { by: 'jake', ref: 'intake', date: '2026-11-24' },
    'google.reviewCount': { by: 'jake', ref: 'https://share.google/SsjDUDZkBvGfsEk5P', date: '2026-11-24' },
    'google.rating': { by: 'url', ref: 'https://www.google.com/search?q=Heartwood+Homes,+LLC', date: '2026-11-24' },
    'google.profileUrl': { by: 'jake', ref: 'https://www.google.com/search?q=Heartwood+Homes%2C+LLC+Chattanooga+TN', date: '2026-11-24' },
    'socials.facebook': { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
    'socials.instagram': { by: 'url', ref: 'https://www.heartwoodchatt.com/', date: '2026-11-24' },
  } as Record<string, Source>,
};

/** A Google search is not a Business Profile. Numbers can show; the search does not. */
export function googleProfileHref(url: string | null | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith('google.com') && parsed.pathname.startsWith('/search')) return null;
  } catch {
    return null;
  }
  return url;
}
