'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PuppyCardProps {
  name: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  mainImage: string;
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
          src={mainImage}
          alt={`${name} - Australian Shepherd Puppy`}
          width={400}
          height={400}
          className="puppy-card__image"
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
