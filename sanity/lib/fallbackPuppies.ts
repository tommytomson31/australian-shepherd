/**
 * Fallback puppy data shown when Sanity is unavailable or returns no puppies.
 * Uses the same image asset as other site sections so no extra files are needed.
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

const placeholderImage = '/images/Parents and past litters/first section image.jpg';

export const fallbackPuppies: FallbackPuppy[] = [
  {
    _id: 'fallback-tracy',
    name: 'Tracy',
    gender: 'female',
    age: '9 Weeks',
    price: 1700,
    status: 'available',
    mainImage: placeholderImage,
    images: [placeholderImage],
  },
  {
    _id: 'fallback-jayden',
    name: 'Jayden',
    gender: 'male',
    age: '9 Weeks',
    price: 1500,
    status: 'available',
    mainImage: placeholderImage,
    images: [placeholderImage],
  },
  {
    _id: 'fallback-annie',
    name: 'Annie',
    gender: 'female',
    age: '9 Weeks',
    price: 1200,
    status: 'available',
    mainImage: placeholderImage,
    images: [placeholderImage],
  },
];
