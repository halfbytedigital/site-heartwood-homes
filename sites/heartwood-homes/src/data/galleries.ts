import type { ImageMetadata } from 'astro';

type ManifestPhoto = {
  file: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
};

type Manifest = {
  slug: string;
  name: string;
  description: string | null;
  photo_credit: string | null;
  external_link: string | null;
  dates: string | null;
  status: string | null;
  project_type: string | null;
  location: string | null;
  photos: ManifestPhoto[];
};

export type Shot = {
  src: ImageMetadata;
  alt: string;
  label: string | null;
  width: number;
  height: number;
  role: 'spread' | 'day' | 'dusk' | 'detail';
  phase: string | null;
};

export type Phase = { id: string; label: string; text: string };

export type Gallery = {
  slug: string;
  description: string | null;
  credit: string | null;
  link: string | null;
  dates: string | null;
  status: string | null;
  projectType: string | null;
  location: string | null;
  modest: boolean;
  pattern: 'build' | 'rooms' | 'editorial' | 'bucket';
  shots: Shot[];
  phases: Phase[];
};

const imageModules = import.meta.glob<ImageMetadata>(
  '../assets/projects/*/*.{jpg,jpeg,webp,png,JPG,JPEG}',
  { eager: true, import: 'default' },
);

const manifestModules = import.meta.glob<Manifest>('../assets/projects/*/manifest.json', {
  eager: true,
  import: 'default',
});

/** Labels only where the filename or the picture itself is unambiguous. */
const notes: Record<string, Record<string, { label?: string; role?: Shot['role']; phase?: string }>> = {
  'a-frame-cabin-airbnb': {
    '01-Window-Rock-A-frame-55.jpg': { label: 'Dusk', role: 'dusk' },
    '02-Window-Rock-A-frame-61.jpg': { label: 'The gable' },
    '03-Window-Rock-A-frame-25.jpg': { label: 'Exterior' },
    '04-Window-Rock-A-frame-38.jpg': { label: 'Daytime', role: 'day' },
    '05-Window-Rock-A-frame-33.jpg': { label: 'Deck' },
    '06-Window-Rock-A-frame-11.jpg': { label: 'Living room' },
    '07-Window-Rock-A-frame-3.jpg': { label: 'Kitchen' },
    '08-Window-Rock-A-frame-6.jpg': { label: 'A window' },
    '09-Window-Rock-A-frame-8.jpg': { label: 'Loft' },
  },
  'ten-mile-lake-house': {
    '01-1466-Indian-Shadows-86.jpg': { label: 'Exterior' },
    '02-1466-Indian-Shadows-72.jpg': { label: 'Exterior' },
    '03-1466-Indian-Shadows-70.jpg': { label: 'Aerial' },
    '04-1466-Indian-Shadows-74.jpg': { label: 'Exterior' },
    '05-1466-Indian-Shadows-53.jpg': { label: 'Kitchen' },
    '06-1466-Indian-Shadows-58.jpg': { label: 'Living room' },
    '07-1466-Indian-Shadows-56.jpg': { label: 'Kitchen' },
    '08-1466-Indian-Shadows-52.jpg': { label: 'Kitchen' },
    '09-1466-Indian-Shadows-36.jpg': { label: 'Bath' },
    '10-1466-Indian-Shadows-37.jpg': { label: 'Bath' },
    '11-1466-Indian-Shadows-19.jpg': { label: 'Bath' },
    '12-1466-Indian-Shadows-6.jpg': { label: 'Porch' },
    '13-1466-Indian-Shadows-7.jpg': { label: 'Fireplace' },
    '14-1466-Indian-Shadows-80.jpg': { label: 'Aerial' },
    '15-1466-Indian-Shadows-45.jpg': { label: 'Living room' },
    '16-1466-Indian-Shadows-49.jpg': { label: 'Living room' },
  },
  'sewanee-airbnb': {
    '01-Sewanee-AirBnB.jpg': { label: 'Deck' },
    '02-jp-22-fireplace-living.webp': { label: 'Living room' },
    '03-jp-23-entryway-arch.webp': { label: 'Entry arch', role: 'detail' },
    '04-jp-20-primary-bath-tub.webp': { label: 'Primary bath' },
    '05-jp-25-primary-bath-shower.webp': { label: 'Primary bath' },
    '06-jp-15-exterior-night.webp': { label: 'Exterior at night' },
    '07-jp-13-living-wide.webp': { label: 'Living room' },
    '08-jp-11-kitchen.webp': { label: 'Kitchen' },
    '09-jp-03-living.webp': { label: 'Living room' },
    '10-jp-08-bedroom-1.webp': { label: 'Bedroom' },
    '11-jp-06-tub-view.webp': { label: 'Tub' },
    '12-jp-07-tub-detail.webp': { label: 'Tub detail', role: 'detail' },
    '13-jp-21-exterior-blue-hour.webp': { label: 'Exterior at blue hour' },
  },
  'spec-house-pikeville': {
    '01-02-202-Regal-Dr-55.jpg': { label: 'Exterior' },
    '02-01-202-Regal-Dr-54.jpg': { label: 'Exterior' },
    '03-23-202-Regal-Dr-36.jpg': { label: 'Kitchen' },
    '04-15-202-Regal-Dr-28.jpg': { label: 'Living room' },
    '05-14-202-Regal-Dr-27.jpg': { label: 'Fireplace' },
    '06-12-202-Regal-Dr-25.jpg': { label: 'Kitchen' },
    '07-11-202-Regal-Dr-24.jpg': { label: 'Kitchen' },
    '08-08-202-Regal-Dr-21.jpg': { label: 'Kitchen' },
    '09-35-202-Regal-Dr-48.jpg': { label: 'Porch' },
    '10-21-202-Regal-Dr-34.jpg': { label: 'Bath' },
    '11-49-202-Regal-Dr-9.jpg': { label: 'Bedroom' },
    '12-54-202-Regal-Dr-14.jpg': { label: 'Bath' },
    '13-51-202-Regal-Dr-11.jpg': { label: 'Bath' },
    '14-28-202-Regal-Dr-41.jpg': { label: 'Bath' },
    '15-43-202-Regal-Dr-3.jpg': { label: 'Kitchen' },
    '16-24-202-Regal-Dr-37.jpg': { label: 'Living room' },
  },
  'pikeville-treehouses': {
    '01-G81A1622.jpg': { label: 'Exterior' },
    '02-G81A3835.jpg': { label: 'Exterior' },
    '03-G81A2650.jpg': { label: 'Exterior' },
    '04-G81A0518.jpg': { label: 'Windows' },
    '05-G81A1569.jpg': { label: 'Exterior' },
    '06-G81A0654.jpg': { label: 'View' },
    '07-G81A0547.jpg': { label: 'Loft' },
    '08-G81A1773.jpg': { label: 'Kitchen' },
    '09-G81A2033.jpg': { label: 'Deck' },
    '10-G81A1869.jpg': { label: 'Living room' },
    '11-2.-G81A0506.jpg': { label: 'Deck at sunset' },
    '12-7.-G81A0713.jpg': { label: 'Deck at dusk' },
  },
  'hixson-new-build': {
    '01-IMG_4105-HDR.jpg': { label: 'Exterior' },
    '02-DJI_0877-HDR.jpg': { label: 'Exterior' },
    '03-IMG_4138-HDR.jpg': { label: 'Kitchen' },
    '04-IMG_4150-HDR.jpg': { label: 'Kitchen' },
    '05-IMG_4147-HDR.jpg': { label: 'Kitchen' },
    '06-IMG_4177-HDR.jpg': { label: 'Bedroom' },
    '07-IMG_4198-HDR.jpg': { label: 'Closet' },
    '08-IMG_4195-HDR.jpg': { label: 'Bedroom' },
    '09-IMG_4210-HDR.jpg': { label: 'Bath' },
    '10-IMG_4156-HDR.jpg': { label: 'Fireplace' },
    '11-IMG_4144-HDR.jpg': { label: 'Living room' },
    '12-IMG_4129-HDR.jpg': { label: 'Porch' },
    '13-DJI_0886-HDR.jpg': { label: 'Aerial' },
    '14-IMG_4117-HDR.jpg': { label: 'Pool' },
  },
  'flat-top-mountain': {
    '01-IMG_0261.jpg': { label: 'Foundation', phase: 'foundation' },
    '02-IMG_0245.jpg': { label: 'Foundation', phase: 'foundation' },
    '03-DJI_0960.jpg': { label: 'The lot', phase: 'lot' },
    '04-IMG_0263.jpg': { label: 'Foundation', phase: 'foundation' },
    '05-IMG_0296.jpg': { label: 'The lot', phase: 'lot' },
    '06-DJI_0100.jpg': { label: 'Foundation', phase: 'foundation' },
    '07-DJI_0086-HDR.jpg': { label: 'Frame', phase: 'frame' },
    '08-DJI_0080-HDR.jpg': { label: 'Frame', phase: 'frame' },
    '09-IMG_4202-HDR.jpg': { label: 'Frame', phase: 'frame' },
    '10-IMG_4226-HDR.jpg': { label: 'Frame', phase: 'frame' },
    '11-DJI_0205-HDR.jpg': { label: 'Closed in', phase: 'finish' },
    '12-IMG_7531-HDR.jpg': { label: 'Finish work', phase: 'finish' },
    '13-IMG_7525-HDR.jpg': { label: 'Finish work', phase: 'finish' },
  },
  'spring-city-lake-house': {
    '01-DJI_0908-HDR.jpg': { label: 'Aerial' },
    '02-DJI_0914-HDR.jpg': { label: 'The lake' },
    '03-DJI_0911-HDR.jpg': { label: 'Aerial' },
    '04-IMG_9287-HDR.jpg': { label: 'Bath' },
    '06-IMG_9293-HDR.jpg': { label: 'Bath' },
    '08-IMG_9329-HDR.jpg': { label: 'Kitchen' },
    '09-IMG_9317-HDR.jpg': { label: 'Kitchen' },
    '10-IMG_9326-HDR.jpg': { label: 'Living room' },
    '11-IMG_9344-HDR.jpg': { label: 'Kitchen' },
    '12-IMG_9356-HDR.jpg': { label: 'Exterior' },
    '13-IMG_9272-HDR.jpg': { label: 'Lower level' },
  },
  'signal-mountain-renovation': {
    '01-Photo-Jul-16-2025-9-46-37-PM.jpg': { label: 'Exterior' },
    '02-Photo-Jul-16-2025-9-44-22-PM.jpg': { label: 'Entry' },
    '03-Photo-Jun-16-2025-9-44-03-PM.jpg': { label: 'Entry' },
    '04-Photo-Jul-16-2025-9-32-54-PM.jpg': { label: 'Porch' },
    '05-Photo-Jun-16-2025-9-43-33-PM.jpg': { label: 'Porch' },
    '06-Photo-Jul-16-2025-9-28-30-PM.jpg': { label: 'Bedroom' },
    '07-Photo-Jul-16-2025-9-32-29-PM.jpg': { label: 'Porch' },
    '08-Photo-Jul-16-2025-9-29-31-PM.jpg': { label: 'Bath' },
    '09-Photo-Jul-16-2025-9-19-41-PM.jpg': { label: 'Kitchen' },
    '10-Photo-Jul-16-2025-9-17-00-PM.jpg': { label: 'Living room' },
    '11-Photo-Jul-16-2025-9-20-56-PM.jpg': { label: 'Kitchen' },
    '12-Photo-Jul-16-2025-9-18-05-PM.jpg': { label: 'Kitchen' },
    '13-Photo-Jun-16-2025-9-33-49-PM.jpg': { label: 'Laundry' },
  },
  'investment-property-flip': {
    '01-Sims-12.jpg': { label: 'Kitchen' },
    '02-Sims-3.jpg': { label: 'Exterior' },
    '03-Sims-9.jpg': { label: 'Porch' },
    '04-Sims-11.jpg': { label: 'Bedroom' },
    '05-Sims-25.jpg': { label: 'Bath' },
    '06-Sims-12.jpg': { label: 'Kitchen' },
    '07-Sims-26.jpg': { label: 'Porch' },
    '08-Sims-19.jpg': { label: 'Bath' },
    '09-Sims-23.jpg': { label: 'Bedroom' },
  },
  'crawlspace-renovation': {
    '01-IMG_5840-2.jpeg': { label: 'Stairs' },
    '02-IMG_5840-2.jpeg': { label: 'Stairs' },
    '03-IMG_5829.jpeg': { label: 'Bath' },
    '04-IMG_5778.jpeg': { label: 'Living room' },
    '05-IMG_5393.jpeg': { label: 'Stairs' },
    '06-IMG_5603-Edit.jpeg': { label: 'Bath' },
    '07-IMG_5327.jpeg': { label: 'The stair going in' },
  },
  'incline-townhomes': {
    '01-Render-2.jpeg': { label: 'Architectural render' },
    '02-Render-View-5.jpeg': { label: 'Architectural render' },
    '03-OldMtn-3.jpg': { label: 'Exterior' },
    '04-OldMtn-6.jpg': { label: 'Kitchen' },
    '05-OldMtn-8.jpg': { label: 'Living room' },
    '06-OldMtn-10.jpg': { label: 'Living room' },
    '07-OldMtn-13.jpg': { label: 'Kitchen' },
    '08-OldMtn-14.jpg': { label: 'Kitchen' },
    '09-OldMtn-15.jpg': { label: 'Stairs' },
    '10-OldMtn-18.jpg': { label: 'Hall' },
    '11-OldMtn-23.jpg': { label: 'Bedroom' },
    '12-OldMtn-24.jpg': { label: 'Bath' },
    '13-OldMtn-25.jpg': { label: 'Bath' },
    '14-OldMtn-32.jpg': { label: 'Porch' },
    '16-OldMtn-47.jpg': { label: 'Bath' },
    '17-OldMtn-48.jpg': { label: 'Bath' },
    '18-OldMtn-52.jpg': { label: 'Structure underway' },
  },
  'red-bank-renovation': {
    '01-Red-Bank-5.jpg': { label: 'Bath' },
    '02-Red-Bank-1.jpg': { label: 'Living room' },
    '03-Red-Bank-2.jpg': { label: 'Kitchen' },
    '04-Red-Bank-3.jpg': { label: 'Kitchen' },
    '05-Red-Bank-4.jpg': { label: 'Kitchen' },
  },
  'east-brainard-tornado-rebuild': {
    '01-Tornado-2.jpg': { label: 'Exterior' },
    '02-Tornado-3.jpg': { label: 'Exterior' },
    '03-Tornado-4.jpg': { label: 'Exterior' },
    '04-Tornado-5.jpg': { label: 'Kitchen' },
    '05-Tornado-6.jpg': { label: 'Living room' },
    '06-Tornado-1.jpg': { label: 'The crew' },
  },
  'layouts-on-market': {
    '01-Market1-7.jpg': { label: 'Living room' },
    '02-Market1-34.jpg': { label: 'Stair railing' },
    '03-Market1-32.jpg': { label: 'Cabinets' },
    '04-Market3-8.jpg': { label: 'Stairs' },
    '05-Market1-11.jpg': { label: 'Stairs' },
    '06-Market1-6.jpg': { label: 'Kitchen' },
  },
};

const roomOrder = [
  'Exterior',
  'Exterior at night',
  'Exterior at blue hour',
  'Deck at sunset',
  'Deck at dusk',
  'Aerial',
  'The lake',
  'The gable',
  'A window',
  'Windows',
  'View',
  'Deck',
  'Porch',
  'Pool',
  'Entry',
  'Kitchen',
  'Living room',
  'Fireplace',
  'Loft',
  'Bedroom',
  'Closet',
  'Primary bath',
  'Bath',
  'Tub',
  'Laundry',
  'Hall',
  'Stairs',
  'Stair railing',
  'Cabinets',
  'Lower level',
  'The stair going in',
  'Architectural render',
  'Structure underway',
  'The crew',
];

const buildPhases: Phase[] = [
  {
    id: 'lot',
    label: 'The lot',
    text: 'The lot opened up, with the foundation lines laid out on the dirt.',
  },
  {
    id: 'foundation',
    label: 'Foundation',
    text: 'Footings and the concrete pour, before the frame.',
  },
  {
    id: 'frame',
    label: 'Frame',
    text: 'The frame goes up. Framing is work the Heartwood crew does in house.',
  },
  {
    id: 'finish',
    label: 'Finish',
    text: 'The house closed in. Inside, finish work was still underway.',
  },
];

const patterns: Record<string, Gallery['pattern']> = {
  'flat-top-mountain': 'build',
  renovations: 'bucket',
};

function widthsFor(width: number) {
  if (width <= 800) return [Math.min(width, 720)];
  if (width <= 1400) return [720, Math.min(width, 1200)];
  return [720, 1200, 1600];
}

export function shotWidths(shot: Shot) {
  return widthsFor(shot.width);
}

function voice(text: string | null) {
  return text ? text.replace(/AirBnb/g, 'Airbnb').replace('re- sold', 're-sold') : null;
}

function linkFor(raw: string | null) {
  if (!raw) return null;
  if (raw.startsWith('http')) return raw;
  return `https://${raw.replace(/^\/\//, '')}`;
}

export function getGallery(slug: string): Gallery | null {
  const manifest = Object.values(manifestModules).find((entry) => entry.slug === slug);
  if (!manifest) return null;
  const prefix = `/src/assets/projects/${slug}/`;
  const shots: Shot[] = [];
  for (const photo of manifest.photos ?? []) {
    const key = Object.keys(imageModules).find((item) => item.endsWith(`${prefix}${photo.file}`) || item.endsWith(`/${slug}/${photo.file}`));
    if (!key) continue;
    const note = notes[slug]?.[photo.file];
    const width = photo.width ?? imageModules[key].width;
    const height = photo.height ?? imageModules[key].height;
    const label = note?.label ?? null;
    shots.push({
      src: imageModules[key],
      alt: `${manifest.name.replace(/AirBnb/g, 'Airbnb')}${label ? `. ${label}` : ''}`,
      label,
      width,
      height,
      role: note?.role ?? 'spread',
      phase: note?.phase ?? null,
    });
  }
  const modest = shots.length > 0 && shots.every((shot) => shot.width < 900);
  const hasRooms = shots.some((shot) => shot.label && !['Exterior', 'Aerial', 'The lake', 'Architectural render', 'Structure underway'].includes(shot.label));
  return {
    slug,
    description: voice(manifest.description),
    credit: manifest.photo_credit,
    link: linkFor(manifest.external_link),
    dates: manifest.dates,
    status: manifest.status,
    projectType: manifest.project_type,
    location: manifest.location,
    modest,
    pattern: patterns[slug] ?? (hasRooms ? 'rooms' : 'editorial'),
    shots,
    phases: slug === 'flat-top-mountain' ? buildPhases : [],
  };
}

export function roomGroups(shots: Shot[]) {
  const labeled = shots.filter((shot) => shot.role === 'spread' && shot.label);
  const groups: { label: string; shots: Shot[] }[] = [];
  for (const label of roomOrder) {
    const group = labeled.filter((shot) => shot.label === label);
    if (group.length) groups.push({ label, shots: group });
  }
  const known = new Set(groups.map((group) => group.label));
  const extra = labeled.filter((shot) => shot.label && !known.has(shot.label));
  for (const shot of extra) {
    const found = groups.find((group) => group.label === shot.label);
    if (found) found.shots.push(shot);
    else groups.push({ label: shot.label!, shots: [shot] });
  }
  const unlabeled = shots.filter((shot) => shot.role === 'spread' && !shot.label);
  return { groups, unlabeled };
}
