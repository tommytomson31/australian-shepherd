import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagehillaussies.com';

/** SOP 4.2: Title 55–60 chars, primary keyword near front, brand at end. */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Australian Shepherd Puppies | Heritage Hill Aussies',
    template: '%s | Heritage Hill Aussies',
  },
  description:
    'Premier Australian Shepherd breeder. Family-raised, AKC-registered puppies with champion bloodlines, health guarantees & lifetime support. View available puppies.',
  keywords: [
    'Australian Shepherd puppies',
    'Aussie breeder',
    'AKC Australian Shepherd',
    'Heritage Hill Aussies',
  ],
  authors: [{ name: 'Heritage Hill Aussies', url: baseUrl }],
  creator: 'Heritage Hill Aussies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Heritage Hill Aussies',
    title: 'Australian Shepherd Puppies | Heritage Hill Aussies',
    description:
      'Premier Australian Shepherd breeder. Family-raised, AKC-registered puppies with champion bloodlines, health guarantees & lifetime support.',
    images: [
      {
        url: `${baseUrl}/images/Parents%20and%20past%20litters/Hero%20Image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Heritage Hill Aussies – Australian Shepherd puppies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian Shepherd Puppies | Heritage Hill Aussies',
    description:
      'Premier Australian Shepherd breeder. Family-raised, AKC-registered puppies with health guarantees & lifetime support.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: baseUrl },
  verification: {
    // Optional: add when you have them
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sameAs: string[] = []; // Add Facebook, Instagram etc. from Sanity when available
  const orgSchema = organizationSchema(sameAs);
  const webSchema = websiteSchema();
  const localSchema = localBusinessSchema(sameAs);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans`}
      >
        <JsonLd data={[orgSchema, webSchema, localSchema]} />
        {children}
      </body>
    </html>
  );
}
