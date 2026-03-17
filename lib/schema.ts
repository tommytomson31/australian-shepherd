/**
 * JSON-LD structured data per LK Digital SOP 3.3.
 * Mandatory: Organization, WebSite (SearchAction), BreadcrumbList, WebPage,
 * LocalBusiness (where applicable), FAQPage, Speakable for AEO/GEO.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagehillaussies.com';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function organizationSchema(sameAs?: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Heritage Hill Aussies',
    url: BASE_URL,
    logo: `${BASE_URL}/images/Parents and past litters/Hero Image.jpg`,
    description:
      'Premier Australian Shepherd breeder. Family-raised, AKC-registered puppies with champion bloodlines, health guarantees, and lifetime support.',
    email: 'aussiepuppies06@gmail.com',
    telephone: '+17579645341',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'United States',
    },
    ...(sameAs?.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Heritage Hill Aussies',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/puppies?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessSchema(sameAs?: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Heritage Hill Aussies',
    description:
      'Family-owned Australian Shepherd breeder. AKC-registered puppies, health guarantees, champion bloodlines, lifetime support.',
    url: BASE_URL,
    telephone: '+17579645341',
    email: 'aussiepuppies06@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    areaServed: 'US',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
    ...(sameAs?.length ? { sameAs } : {}),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  breadcrumbs,
}: {
  name: string;
  description?: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}${path}#webpage`,
    name,
    description: description || undefined,
    url: `${BASE_URL}${path}`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    breadcrumb: breadcrumbSchema(breadcrumbs),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** AEO: Speakable schema for voice/snippet recitation (SOP 8.3). */
export function speakableSchema(entries: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: entries.map((e) => e.name),
    },
  };
}
