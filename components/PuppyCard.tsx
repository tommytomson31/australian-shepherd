'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
  const [imageUrl, setImageUrl] = useState(resolvedUrl);
  const isUnavailable = status !== 'available';
  const statusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
  };

  return (
    <div className={`puppy-card ${isUnavailable ? 'puppy-card--unavailable' : ''}`}>
      <div className="puppy-card__image-wrapper">
        <Image
          src={imageUrl}
          alt={`${name} - Australian Shepherd Puppy`}
          width={400}
          height={400}
          className="puppy-card__image"
          unoptimized={imageUrl === PLACEHOLDER_IMAGE_DATA_URI || imageUrl.startsWith('/images/')}
          onError={() => setImageUrl(PLACEHOLDER_IMAGE_DATA_URI)}
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
        {images.length > 1 && (
          <div className="puppy-gallery__counter">
            1/{images.length}
          </div>
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
          ${price.toLocaleString()}
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
