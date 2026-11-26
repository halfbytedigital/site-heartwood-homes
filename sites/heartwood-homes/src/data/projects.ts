import type { ImageMetadata } from 'astro';
import tenMile from '../assets/projects/ten-mile.jpg';
import hixson from '../assets/projects/hixson.jpg';
import flatTop from '../assets/projects/flat-top.jpg';
import springCity from '../assets/projects/spring-city.jpg';
import specHouse from '../assets/projects/spec-house.jpg';
import pikeville from '../assets/projects/pikeville-treehouses.jpg';
import sewanee from '../assets/projects/sewanee.webp';
import aFrame from '../assets/projects/a-frame.jpg';
import signal from '../assets/projects/signal-mountain.jpg';
import redBank from '../assets/projects/red-bank.jpg';
import crawlspace from '../assets/projects/crawlspace.jpg';
import brainard from '../assets/projects/east-brainard.jpg';
import flip from '../assets/projects/investment-flip.jpg';
import incline from '../assets/projects/incline.jpg';
import layouts from '../assets/projects/layouts.jpg';

export type ProjectKind = 'custom' | 'renovation' | 'partial';

export type Project = {
  slug: string;
  name: string;
  status: string;
  dates: string;
  type: string;
  kind: ProjectKind;
  summary: string;
  credit: string | null;
  href: string | null;
  hrefLabel: string | null;
  serviceHref: string;
  image: ImageMetadata;
  imageAlt: string;
  /** Menu image on the current site is a drawing, not a finished-house photo. */
  rendering: boolean;
};

export const projects: Project[] = [
  {
    slug: 'ten-mile-lake-house',
    name: 'Ten Mile Lake House',
    status: 'Completed',
    dates: '2025–2026',
    type: 'Residential new construction',
    kind: 'custom',
    summary:
      'A new house on the lake. The homeowners call it Mermaid Landing.',
    credit: 'Photo by Travis Jacobs (@scenicpropertymedia)',
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: tenMile,
    imageAlt:
      'Finished Ten Mile Lake House with a metal roof, a stone chimney, and a long covered porch.',
    rendering: false,
  },
  {
    slug: 'hixson-new-build',
    name: 'Hixson New Build',
    status: 'Complete',
    dates: '2023–2024',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A new house in Hixson.',
    credit: 'Photo by Wes Holland (@DroneLogix)',
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: hixson,
    imageAlt: 'Hixson new build, a single-story house among the trees.',
    rendering: false,
  },
  {
    slug: 'flat-top-mountain',
    name: 'Flat Top Mountain New Build',
    status: 'Complete',
    dates: 'September 2024–2025',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A new house on Flat Top Mountain.',
    credit: 'Photo by Wes Holland (@DroneLogix)',
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: flatTop,
    imageAlt: 'Project photo for the Flat Top Mountain new build.',
    rendering: false,
  },
  {
    slug: 'spring-city-lake-house',
    name: 'Spring City Lake House',
    status: 'Complete',
    dates: '2024',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A lake house in Spring City.',
    credit: 'Photo by Wes Holland (@DroneLogix)',
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: springCity,
    imageAlt: 'Project photo for the Spring City Lake House.',
    rendering: false,
  },
  {
    slug: 'spec-house-pikeville',
    name: 'Spec House, Pikeville',
    status: 'Completed',
    dates: '2025–2026',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A four-home project on a mountaintop in Pikeville.',
    credit: null,
    href: 'https://saddleridgeretreat.com',
    hrefLabel: 'Saddle Ridge Retreat',
    serviceHref: '/custom-homes/',
    image: specHouse,
    imageAlt: 'A two-story house from the Spec House project in Pikeville.',
    rendering: false,
  },
  {
    slug: 'pikeville-treehouses',
    name: 'Pikeville Treehouses',
    status: 'Completed',
    dates: '2025–2026',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A four-home project on a mountaintop in Pikeville.',
    credit: null,
    href: 'https://saddleridgeretreat.com',
    hrefLabel: 'Saddle Ridge Retreat',
    serviceHref: '/custom-homes/',
    image: pikeville,
    imageAlt: 'A dark green cabin from the Pikeville Treehouses project.',
    rendering: false,
  },
  {
    slug: 'sewanee-airbnb',
    name: 'Sewanee Airbnb',
    status: 'Completed',
    dates: '2024–2025',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'A new house in Sewanee.',
    credit: 'Photo by Trevor Popovits (@trevorpopovits)',
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: sewanee,
    imageAlt: 'Project photo for the Sewanee Airbnb.',
    rendering: false,
  },
  {
    slug: 'a-frame-cabin-airbnb',
    name: 'A-Frame Cabin Airbnb',
    status: 'Complete',
    dates: '2022–2023',
    type: 'Residential new construction',
    kind: 'custom',
    summary: 'An A-frame cabin built as an Airbnb. Complete, 2022–2023.',
    credit: 'Photo by Caleb Jones (@gcalebjones)',
    href: 'https://www.thewindowrock.com/',
    hrefLabel: 'The Window Rock',
    serviceHref: '/custom-homes/',
    image: aFrame,
    imageAlt: 'The A-frame cabin at dusk, with a smaller wood building beside it.',
    rendering: false,
  },
  {
    slug: 'signal-mountain-renovation',
    name: 'Signal Mountain Full Home Renovation',
    status: 'Complete',
    dates: '2025',
    type: 'Residential renovation',
    kind: 'renovation',
    summary: 'A full renovation of a house on Signal Mountain.',
    credit: 'Photo by Wes Holland (@DroneLogix)',
    href: null,
    hrefLabel: null,
    serviceHref: '/renovations/',
    image: signal,
    imageAlt: 'Signal Mountain house with a stone chimney, a wood front door, and a screened porch.',
    rendering: false,
  },
  {
    slug: 'red-bank-renovation',
    name: 'Red Bank Renovation',
    status: 'Complete',
    dates: '2020',
    type: 'Residential renovation',
    kind: 'renovation',
    summary: 'A renovation in Red Bank.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/renovations/',
    image: redBank,
    imageAlt: 'Project photo for the Red Bank renovation.',
    rendering: false,
  },
  {
    slug: 'crawlspace-renovation',
    name: 'Crawlspace Renovation',
    status: 'Complete',
    dates: '2021',
    type: 'Residential renovation',
    kind: 'renovation',
    summary: 'A dirt crawlspace was turned into a downstairs living space.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/renovations/',
    image: crawlspace,
    imageAlt: 'Project photo for the crawlspace renovation.',
    rendering: false,
  },
  {
    slug: 'east-brainard-tornado-rebuild',
    name: 'East Brainard Tornado Rebuild',
    status: 'Completed',
    dates: '2020',
    type: 'Residential renovation',
    kind: 'renovation',
    summary: 'A tornado rebuild, including exterior board and batten and masonry.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/renovations/',
    image: brainard,
    imageAlt: 'Project photo for the East Brainard tornado rebuild.',
    rendering: false,
  },
  {
    slug: 'investment-property-flip',
    name: 'Investment Property Flip',
    status: 'Complete',
    dates: '2022',
    type: 'Residential renovation',
    kind: 'renovation',
    summary: 'The house was stripped down and renovated to be re-sold.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/renovations/',
    image: flip,
    imageAlt: 'Project photo for the investment property flip.',
    rendering: false,
  },
  {
    slug: 'incline-townhomes',
    name: 'Incline Townhomes',
    status: 'Complete',
    dates: '2020–2021',
    type: 'Six townhomes',
    kind: 'partial',
    summary:
      'Six townhomes. Heartwood’s work on this job was framing and finish carpentry.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: incline,
    imageAlt: 'Architectural rendering of a row of townhomes for the Incline Townhomes project.',
    rendering: true,
  },
  {
    slug: 'layouts-on-market',
    name: 'Layouts on Market',
    status: 'Completed',
    dates: '2018–2019',
    type: 'Nine townhomes',
    kind: 'partial',
    summary:
      'Nine townhomes. Heartwood provided supervision, plus finish carpentry, screen walls, interior railings, and cabinet setting.',
    credit: null,
    href: null,
    hrefLabel: null,
    serviceHref: '/custom-homes/',
    image: layouts,
    imageAlt: 'Interior stair and wood handrail from the Layouts on Market project.',
    rendering: false,
  },
];

/** Job types for the projects index. A house can sit in more than one. */
const projectTypes: Record<string, string[]> = {
  'a-frame-cabin-airbnb': ['new-builds', 'lake-cabin', 'short-term'],
  'flat-top-mountain': ['new-builds'],
  'hixson-new-build': ['new-builds'],
  'incline-townhomes': ['new-builds', 'townhomes-investment'],
  'layouts-on-market': ['new-builds', 'townhomes-investment'],
  'pikeville-treehouses': ['new-builds', 'lake-cabin'],
  'sewanee-airbnb': ['new-builds', 'short-term'],
  'spec-house-pikeville': ['new-builds'],
  'spring-city-lake-house': ['new-builds', 'lake-cabin'],
  'ten-mile-lake-house': ['new-builds', 'lake-cabin'],
  'crawlspace-renovation': ['renovations'],
  'east-brainard-tornado-rebuild': ['renovations'],
  'investment-property-flip': ['renovations', 'townhomes-investment'],
  'red-bank-renovation': ['renovations'],
  'signal-mountain-renovation': ['renovations'],
};

export const jobFilters = [
  { slug: 'all', label: 'All' },
  { slug: 'new-builds', label: 'New builds' },
  { slug: 'lake-cabin', label: 'Lake & cabin homes' },
  { slug: 'short-term', label: 'Short-term rentals' },
  { slug: 'renovations', label: 'Renovations' },
  { slug: 'townhomes-investment', label: 'Townhomes & investment' },
] as const;

export function typesFor(slug: string) {
  return projectTypes[slug] ?? [];
}

/** A-frame leads because it is the most distinctive photo, not because of list order. */
export function featuredFirst(list: Project[] = projects) {
  const lead = 'a-frame-cabin-airbnb';
  return [...list.filter((project) => project.slug === lead), ...list.filter((project) => project.slug !== lead)];
}

export const customProjects = featuredFirst(projects.filter((project) => project.kind === 'custom'));
export const renovationProjects = projects.filter((project) => project.kind === 'renovation');

/** Explicit house types that the category rule must not override. The A-frame is also a short-term rental. */
const planTypes: Record<string, 'lake' | 'cabin' | 'aframe'> = {
  'ten-mile-lake-house': 'lake',
  'spring-city-lake-house': 'lake',
  'a-frame-cabin-airbnb': 'aframe',
  'pikeville-treehouses': 'cabin',
};

export function planTypeFor(slug: string) {
  if (planTypes[slug]) return planTypes[slug];
  const types = typesFor(slug);
  if (types.includes('townhomes-investment') && !types.includes('renovations')) return 'townhome';
  if (types.includes('short-term')) return 'rental';
  return 'family';
}

export function projectPath(slug: string) {
  return `/projects/${slug}/`;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
