import { MetadataRoute } from 'next';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { allPageSlugsQuery } from '@/sanity/lib/queries';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagehillaussies.com';

/** LK Digital SOP 3.1.1: Dynamic sitemap, update within 24h of new URL. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/puppies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  if (isSanityConfigured) {
    try {
      const pages = await client.fetch<{ slug: string }[]>(allPageSlugsQuery);
      dynamicRoutes = (pages || []).map(({ slug }) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    } catch {
      // ignore; use static only
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
