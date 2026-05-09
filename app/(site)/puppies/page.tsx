import { getPuppiesAlways } from '@/sanity/lib/getPuppies';
import PuppyCard from '@/components/PuppyCard';
import Link from 'next/link';

interface Puppy {
  _id: string;
  name: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  mainImage: string;
  images: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagehillaussies.com';

export const metadata = {
  title: 'Available Puppies',
  description:
    'Browse our available Australian Shepherd puppies. Each puppy comes with a health guarantee and lifetime support.',
  alternates: { canonical: `${baseUrl}/puppies` },
};

export const dynamic = 'force-dynamic';

export default async function PuppiesPage() {
  const puppies = await getPuppiesAlways();
  const availablePuppies = puppies.filter((p) => p.status === 'available');
  const otherPuppies = puppies.filter((p) => p.status !== 'available');

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section-label">Our Puppies</span>
          <h1>Available Puppies</h1>
          <p>Find your perfect companion from our lovingly raised litters</p>
        </div>
      </section>

      {/* What's Included */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What&apos;s Included</span>
            <h2>Every Puppy Comes With</h2>
          </div>
          <div className="grid grid--4">
            {[
              { icon: '✦', title: 'Registered Pedigree' },
              { icon: '✓', title: 'Vet Health Check' },
              { icon: '💉', title: 'Current Vaccinations' },
              { icon: '📋', title: 'Medical Records' },
              { icon: '🛡️', title: 'Health Guarantee' },
              { icon: '🏠', title: 'Potty Training Started' },
              { icon: '❤️', title: 'Socialization' },
              { icon: '📞', title: 'Lifetime Support' },
            ].map((item, i) => (
              <div key={i} className="included-item">
                <div className="included-item__icon">{item.icon}</div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Puppies */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Available Now</span>
            <h2>Meet Our Available Puppies</h2>
            <p>Each of our puppies is raised with love in our family home</p>
          </div>
          {availablePuppies.length > 0 ? (
            <div className="grid grid--3">
              {availablePuppies.map((puppy) => (
                <PuppyCard
                  key={puppy._id}
                  name={puppy.name}
                  gender={puppy.gender === 'male' ? 'Male' : 'Female'}
                  age={puppy.age}
                  price={puppy.price}
                  status={puppy.status}
                  mainImage={puppy.mainImage}
                  images={puppy.images}
                />
              ))}
            </div>
          ) : (
            <div className="puppies-preview__message">
              <p>We currently don&apos;t have any puppies available. Check back soon or contact us for upcoming litters!</p>
              <div className="puppies-preview__actions">
                <Link href="/contact" className="btn btn--primary">
                  Get Notified
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reserved/Sold Puppies */}
      {otherPuppies.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Recently Placed</span>
              <h2>Found Their Forever Homes</h2>
            </div>
            <div className="grid grid--3">
              {otherPuppies.map((puppy) => (
                <PuppyCard
                  key={puppy._id}
                  name={puppy.name}
                  gender={puppy.gender === 'male' ? 'Male' : 'Female'}
                  age={puppy.age}
                  price={puppy.price}
                  status={puppy.status}
                  mainImage={puppy.mainImage}
                  images={puppy.images}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Adoption Process */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2>Our Adoption Process</h2>
          </div>
          <div className="grid grid--4">
            {[
              { num: '1', title: 'Inquire', desc: 'Contact us about available puppies or upcoming litters.' },
              { num: '2', title: 'Application', desc: 'Complete our adoption application so we can learn about you.' },
              { num: '3', title: 'Reserve', desc: 'Once approved, place a deposit to reserve your puppy.' },
              { num: '4', title: 'Welcome Home', desc: 'Pick up your new family member when they\'re ready!' },
            ].map((step, i) => (
              <div key={i} className="process-step">
                <div className="process-step__number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark">
        <div className="container">
          <div className="cta-block">
            <h2>Ready to Find Your Perfect Puppy?</h2>
            <p>Contact us to learn more about our available puppies and upcoming litters.</p>
            <div className="cta-block__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
