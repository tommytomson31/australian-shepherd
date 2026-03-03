'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PLACEHOLDER_IMAGE_DATA_URI } from '@/sanity/lib/fallbackPuppies';

const FALLBACK_IMAGE_PATH = '/images/Parents and past litters/first section image.jpg';

interface PuppyCardProps {
  name: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  mainImage: string | null | undefined;
  images?: string[];
}

export default function PuppyCard({
  name,
  gender,
  age,
  price,
  status,
  mainImage,
  images = [],
}: PuppyCardProps) {
  const resolvedUrl = mainImage || images?.[0] || FALLBACK_IMAGE_PATH;
  const allSlides = images?.length ? images : [resolvedUrl];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const displayUrl = imageError ? PLACEHOLDER_IMAGE_DATA_URI : allSlides[currentIndex];
  const hasMultiple = allSlides.length > 1;
  const goPrev = () => { setImageError(false); setCurrentIndex((i) => (i === 0 ? allSlides.length - 1 : i - 1)); };
  const goNext = () => { setImageError(false); setCurrentIndex((i) => (i === allSlides.length - 1 ? 0 : i + 1)); };
  useEffect(() => setImageError(false), [currentIndex]);
  const isUnavailable = status !== 'available';
  const statusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
  };

  return (
    <div className={`puppy-card ${isUnavailable ? 'puppy-card--unavailable' : ''}`}>
      <div className="puppy-card__image-wrapper puppy-card__image-wrapper--gallery">
        <Image
          key={currentIndex}
          src={displayUrl}
          alt={`${name} - Australian Shepherd Puppy (photo ${currentIndex + 1} of ${allSlides.length})`}
          width={400}
          height={400}
          className="puppy-card__image"
          unoptimized={displayUrl === PLACEHOLDER_IMAGE_DATA_URI || displayUrl.startsWith('/images/')}
          onError={() => setImageError(true)}
        />
        <span className={`puppy-card__badge badge badge--${status}`}>
          {statusLabels[status]}
        </span>
        {isUnavailable && (
          <div className="puppy-card__overlay">
            <span className="puppy-card__overlay-text">
              {statusLabels[status]}
            </span>
          </div>
        )}
        {hasMultiple && (
          <>
            <div className="puppy-gallery__counter">
              {currentIndex + 1}/{allSlides.length}
            </div>
            <button
              type="button"
              className="puppy-gallery__arrow puppy-gallery__arrow--prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous photo"
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              className="puppy-gallery__arrow puppy-gallery__arrow--next"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next photo"
            >
              <span aria-hidden>›</span>
            </button>
            <div className="puppy-gallery__nav" role="tablist" aria-label="Photo dots">
              {allSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Photo ${i + 1}`}
                  className={`puppy-gallery__dot ${i === currentIndex ? 'puppy-gallery__dot--active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); setImageError(false); }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="puppy-card__body">
        <h3 className="puppy-card__name">{name}</h3>
        <div className="puppy-card__details">
          <span>{gender}</span>
          <span>&bull;</span>
          <span>{age}</span>
        </div>
        <div className={`puppy-card__price ${isUnavailable ? 'puppy-card__price--unavailable' : ''}`}>
          {price > 0 ? `$${price.toLocaleString()}` : '—'}
        </div>
        {status === 'available' ? (
          <Link
            href={`/contact?puppy=${encodeURIComponent(name)}`}
            className="btn btn--primary btn--sm puppy-card__cta"
          >
            Inquire About {name}
          </Link>
        ) : (
          <span className="btn btn--outline btn--sm puppy-card__cta" style={{ opacity: 0.6, cursor: 'default' }}>
            {statusLabels[status]}
          </span>
        )}
      </div>
    </div>
  );
}
