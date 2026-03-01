import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Heritage Hill Aussies | Premier Australian Shepherds',
  description:
    'Heritage Hill Aussies — Premier Australian Shepherd breeder. Family-raised, AKC-registered puppies with champion bloodlines, health guarantees, and lifetime support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
