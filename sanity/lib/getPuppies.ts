import { getPuppiesFromImageFolders } from '@/lib/puppiesFromImageFolders';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { fallbackPuppies, type FallbackPuppy } from '@/sanity/lib/fallbackPuppies';
import { availablePuppiesQuery, puppiesQuery } from '@/sanity/lib/queries';

export type Puppy = FallbackPuppy;

/**
 * Puppies are loaded in this order so photos are never lost:
 * 1. public/images folder (name, age, price from folder name; "main" image = profile photo) — committed to repo
 * 2. Sanity CMS (if configured and returns data)
 * 3. Fallback list (always at least 3 puppies)
 */
function getPreferredPuppies(sanityPuppies: Puppy[]): Puppy[] {
  const fromFolders = getPuppiesFromImageFolders();
  if (fromFolders.length > 0) return fromFolders;
  if (Array.isArray(sanityPuppies) && sanityPuppies.length > 0) return sanityPuppies;
  return fallbackPuppies;
}

/**
 * Fetches puppies and guarantees a non-empty array so the site always shows puppies.
 * Prefers puppies from public/images (folder name = name, gender, age, price; "main" image = profile photo).
 */
export async function getPuppiesAlways(): Promise<Puppy[]> {
  let sanityPuppies: Puppy[] = [];
  if (isSanityConfigured) {
    try {
      const result = await client.fetch<Puppy[]>(puppiesQuery);
      if (Array.isArray(result) && result.length > 0) sanityPuppies = result;
    } catch {
      // use folder or fallback
    }
  }
  return getPreferredPuppies(sanityPuppies);
}

/**
 * Fetches only available puppies (e.g. for homepage). Guarantees non-empty.
 * Prefers puppies from public/images so photos in the repo are never lost.
 */
export async function getAvailablePuppiesAlways(): Promise<Puppy[]> {
  let sanityPuppies: Puppy[] = [];
  if (isSanityConfigured) {
    try {
      const result = await client.fetch<Puppy[]>(availablePuppiesQuery);
      if (Array.isArray(result) && result.length > 0) sanityPuppies = result;
    } catch {
      // use folder or fallback
    }
  }
  const all = getPreferredPuppies(sanityPuppies);
  const available = all.filter((p) => p.status === 'available');
  return available.length > 0 ? available : all;
}
