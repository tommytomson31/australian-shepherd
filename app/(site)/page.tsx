import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { availablePuppiesQuery, testimonialsQuery } from '@/sanity/lib/queries';
import PuppyCard from '@/components/PuppyCard';

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

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  location?: string;
}

async function getHomeData() {
  const [puppies, testimonials] = await Promise.all([
    client.fetch<Puppy[]>(availablePuppiesQuery),
    client.fetch<Testimonial[]>(testimonialsQuery),
  ]);
  return { puppies, testimonials };
}

export default async function HomePage() {
  const { puppies, testimonials } = await getHomeData();
  const displayPuppies = puppies.slice(0, 3);
  const testimonial = testimonials[0];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div
          className="hero__bg"
          style={{ backgroundImage: "url('/images/Parents and past litters/Hero Image.jpg')" }}
        ></div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <span className="hero__accent fade-in">
            Family-Raised &bull; AKC Registered &bull; Health Guaranteed
          </span>
          <h1 className="fade-in">
            Exceptional Australian Shepherds, Raised with Heart
          </h1>
          <p className="hero__subtitle fade-in">
            Our puppies are born and raised in our family home, socialized with
            children and pets, potty trained, and come with complete AKC
            registration and veterinary records.
          </p>
          <div className="hero__actions fade-in">
            <Link href="/puppies" className="btn btn--primary btn--lg">
              View Available Puppies
            </Link>
            <Link href="/contact" className="btn btn--outline-white btn--lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__grid">
            <div className="trust-bar__item">
              <span className="trust-bar__icon">✦</span>
              <span className="trust-bar__text">AKC Registered</span>
            </div>
            <div className="trust-bar__item">
              <span className="trust-bar__icon">✓</span>
              <span className="trust-bar__text">Vet Checked &amp; Vaccinated</span>
            </div>
            <div className="trust-bar__item">
              <span className="trust-bar__icon">♥</span>
              <span className="trust-bar__text">Home Raised</span>
            </div>
            <div className="trust-bar__item">
              <span className="trust-bar__icon">★</span>
              <span className="trust-bar__text">Lifetime Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section intro">
        <div className="container">
          <div className="intro__grid fade-in">
            <div className="intro__text">
              <span className="section-label">Welcome</span>
              <h2>A Tradition of Excellence in Australian Shepherd Breeding</h2>
              <p>
                For over 15 years, Heritage Hill Aussies has been a family-owned
                and operated breeding program dedicated to producing exceptional
                Australian Shepherds. Our commitment to ethical breeding
                practices, health testing, and early socialization sets us apart.
              </p>
              <p>
                Every puppy is raised in our home as part of our family,
                surrounded by children and other pets from day one. This ensures
                that when your new companion arrives home, they are confident,
                well-adjusted, and ready to bond with your family.
              </p>
            </div>
            <div className="intro__image">
              <Image
                src="/images/Parents and past litters/first section image.jpg"
                alt="Heritage Hill Aussies - Our Australian Shepherds"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Why Heritage Hill</span>
            <h2>Why Choose Us</h2>
          </div>
          <div className="features__grid">
            {[
              { icon: '♥', title: 'Home Raised with Love', desc: 'Every puppy is raised in our family home and socialized from day one with children and other pets, ensuring a well-adjusted temperament.' },
              { icon: '✓', title: 'Health Guaranteed', desc: 'Full vaccination records, comprehensive vet checks, complete medical history, and AKC registration included with every puppy.' },
              { icon: '✦', title: 'Potty Trained & Ready', desc: 'Basic house training and thorough socialization are started before your puppy goes home, giving you a head start on a smooth transition.' },
              { icon: '★', title: 'Lifetime Breeder Support', desc: "Our relationship with you doesn't end at pickup. We provide guidance and support for the entire life of your puppy, whenever you need it." },
              { icon: '✦', title: 'Champion Bloodlines', desc: 'Carefully selected genetics from champion lines ensure your puppy has the best foundation for health, temperament, and conformation.' },
              { icon: '✓', title: 'Complete Documentation', desc: 'Vaccination papers, medical records, AKC registration, and a written health guarantee are provided with every Heritage Hill puppy.' },
            ].map((feature, i) => (
              <div key={i} className="features__card fade-in">
                <span className="features__icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Puppies Preview */}
      <section className="section puppies-preview">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Our Puppies</span>
            <h2>Meet Your New Family Member</h2>
            <p>
              We take great pride in matching each puppy with the perfect family.
              Our Australian Shepherds are bred for health, temperament, and
              beauty.
            </p>
          </div>
          {displayPuppies.length > 0 ? (
            <div className="grid grid--3 fade-in" style={{ marginBottom: 'var(--space-xl)' }}>
              {displayPuppies.map((puppy) => (
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
              <p>We currently don&apos;t have any puppies listed. Check back soon or contact us for upcoming litters!</p>
            </div>
          )}
          <div className="text-center fade-in">
            <Link href="/puppies" className="btn btn--secondary btn--lg">
              View All Available Puppies
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="section testimonial">
          <div className="container">
            <div className="testimonial__content fade-in">
              <blockquote className="testimonial__quote">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <cite>
                  &mdash; {testimonial.author}
                  {testimonial.location && `, ${testimonial.location}`}
                </cite>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-section__content fade-in">
            <h2>Ready to Welcome an Aussie Into Your Home?</h2>
            <p>
              We&rsquo;d love to hear from you. Reach out to learn about our
              current and upcoming litters, availability, and flexible payment
              plans. Your perfect companion is waiting.
            </p>
            <Link href="/contact" className="btn btn--primary btn--lg">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
