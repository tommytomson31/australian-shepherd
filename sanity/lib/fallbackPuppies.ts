/**
 * Fallback puppy data shown when Sanity is unavailable or returns no puppies.
 * IMPORTANT: This list ensures puppies are always shown on the site—never remove
 * or bypass this fallback without replacing it with another guaranteed source.
 *
 * Image priority: 1) site image from public folder, 2) this data URI (always works, no file needed).
 */
export interface FallbackPuppy {
  _id: string;
  name: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  mainImage: string;
  images: string[];
}

/** Inline SVG placeholder that always loads (no external file). Used when file image is missing or fails. */
export const PLACEHOLDER_IMAGE_DATA_URI =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#e5e7eb" width="400" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="18">Puppy photo</text></svg>'
  );

/** Single shared placeholder only when no puppy image exists (e.g. new puppy not yet in repo). */
const placeholderImage = '/images/Parents and past litters/first section image.jpg';

/**
 * Fallback uses real image paths from public/images so each puppy shows its own photo.
 * These paths must match files committed to the repo (e.g. on GitHub).
 */
export const fallbackPuppies: FallbackPuppy[] = [
  {
    _id: 'fallback-agi',
    name: 'Agi',
    gender: 'female',
    age: '9 weeks',
    price: 1000,
    status: 'available',
    mainImage: '/images/Agi Female 9 weeks 1000/IMG_20260207_233711_254.jpg',
    images: ['/images/Agi Female 9 weeks 1000/IMG_20260207_233711_254.jpg'],
  },
  {
    _id: 'fallback-annie',
    name: 'Annie',
    gender: 'female',
    age: '9 weeks',
    price: 1200,
    status: 'available',
    mainImage: '/images/Annie Female 9 weeks 1200/IMG_20260207_233155_517.jpg',
    images: ['/images/Annie Female 9 weeks 1200/IMG_20260207_233155_517.jpg'],
  },
  {
    _id: 'fallback-jake',
    name: 'Jake',
    gender: 'male',
    age: '9 weeks',
    price: 800,
    status: 'available',
    mainImage: '/images/Jake male 9 weeks 800/IMG_20260207_233625_001.jpg',
    images: ['/images/Jake male 9 weeks 800/IMG_20260207_233625_001.jpg'],
  },
  {
    _id: 'fallback-jayden',
    name: 'Jayden',
    gender: 'male',
    age: '9 weeks',
    price: 1500,
    status: 'available',
    mainImage: '/images/Jayden male 9 weeks 1500/IMG_20260207_232841_481.jpg',
    images: ['/images/Jayden male 9 weeks 1500/IMG_20260207_232841_481.jpg'],
  },
  {
    _id: 'fallback-kate',
    name: 'Kate',
    gender: 'female',
    age: '9 weeks',
    price: 1000,
    status: 'available',
    mainImage: '/images/Kate Female 9 weeks 1000/IMG_20260207_232929_820.jpg',
    images: ['/images/Kate Female 9 weeks 1000/IMG_20260207_232929_820.jpg'],
  },
  {
    _id: 'fallback-morlich',
    name: 'Morlich',
    gender: 'male',
    age: '9 weeks',
    price: 1000,
    status: 'available',
    mainImage: '/images/Morlich Male 9 weeks 1000/IMG_20260207_233043_332.jpg',
    images: ['/images/Morlich Male 9 weeks 1000/IMG_20260207_233043_332.jpg'],
  },
  {
    _id: 'fallback-murphy',
    name: 'Murphy',
    gender: 'female',
    age: '9 weeks',
    price: 800,
    status: 'available',
    mainImage: '/images/Murphy Female 9 weeks 800/IMG_20260207_233321_697.jpg',
    images: ['/images/Murphy Female 9 weeks 800/IMG_20260207_233321_697.jpg'],
  },
];
