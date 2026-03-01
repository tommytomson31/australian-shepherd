import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { galleryQuery } from '@/sanity/lib/queries';

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface Gallery {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  images: GalleryImage[];
}

export const metadata = {
  title: 'Photo Gallery | Heritage Hill Aussies',
  description: 'Browse photos of our Australian Shepherd puppies, parents, and happy families.',
};

async function getGalleries() {
  return client.fetch<Gallery[]>(galleryQuery);
}

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section-label">Photos</span>
          <h1>Photo Gallery</h1>
          <p>Browse photos of our puppies, parents, and happy families</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          {galleries.length > 0 ? (
            galleries.map((gallery) => (
              <div key={gallery._id} style={{ marginBottom: 'var(--space-2xl)' }}>
                <div className="section-header">
                  <h2>{gallery.title}</h2>
                  {gallery.description && <p>{gallery.description}</p>}
                </div>
                <div className="grid grid--3">
                  {gallery.images.map((image, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${gallery.title} photo ${i + 1}`}
                        width={400}
                        height={400}
                        style={{
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '1',
                          objectFit: 'cover',
                        }}
                      />
                      {image.caption && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 'var(--space-sm)',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                            color: 'white',
                            fontSize: '0.9rem',
                          }}
                        >
                          {image.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="puppies-preview__message">
              <p>Photo galleries coming soon!</p>
              <Link href="/contact" className="btn btn--primary">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
