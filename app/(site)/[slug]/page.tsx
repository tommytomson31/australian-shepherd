import { notFound } from 'next/navigation';
import { client, isSanityConfigured, urlFor } from '@/sanity/lib/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableTextComponents';

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  content: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string): Promise<PageData | null> {
  if (!isSanityConfigured) {
    return null;
  }
  try {
    return await client.fetch(pageBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found | Heritage Hill Aussies',
    };
  }

  return {
    title: page.seo?.metaTitle || `${page.title} | Heritage Hill Aussies`,
    description: page.seo?.metaDescription,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  const reservedSlugs = ['about', 'puppies', 'contact', 'terms', 'privacy', 'gallery'];
  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        {page.heroImage && (
          <div
            className="hero__bg"
            style={{
              backgroundImage: `url(${urlFor(page.heroImage).width(1920).url()})`,
            }}
          ></div>
        )}
        <div className="page-hero__content">
          <h1>{page.title}</h1>
        </div>
      </section>

      {/* Page Content */}
      <section className="section">
        <div className="container container--narrow">
          <div className="legal-content__inner">
            {page.content && (
              <PortableText
                value={page.content}
                components={portableTextComponents}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
