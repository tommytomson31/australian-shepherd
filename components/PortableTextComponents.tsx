import Image from 'next/image';
import { PortableTextComponents as PTComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/client';

export const portableTextComponents: PTComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.openInNewTab ? '_blank' : undefined;
      const rel = target ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-amber-700 hover:text-amber-800 underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-heading font-semibold mt-8 mb-4 text-stone-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-heading font-semibold mt-6 mb-3 text-stone-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-heading font-semibold mt-5 mb-2 text-stone-800">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-700 pl-4 my-6 italic text-stone-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-stone-600 leading-relaxed">{children}</p>
    ),
  },
};
