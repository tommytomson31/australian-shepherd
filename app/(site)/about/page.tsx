import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Heritage Hill Aussies',
  description: 'Learn about Heritage Hill Aussies - a family-owned Australian Shepherd breeder dedicated to raising healthy, well-socialized puppies.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section-label">Our Story</span>
          <h1>About Heritage Hill Aussies</h1>
          <p>A family tradition of breeding exceptional Australian Shepherds</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__content">
              <span className="section-label">Our Story</span>
              <h2>A Passion for Australian Shepherds</h2>
              <p>
                Heritage Hill Aussies began over 15 years ago with our love for
                the Australian Shepherd breed. What started as a family passion
                has grown into a dedicated breeding program focused on producing
                healthy, well-tempered puppies.
              </p>
              <p>
                Every puppy born at Heritage Hill is raised in our family home,
                surrounded by children, other pets, and all the sounds of a busy
                household. This early socialization is crucial in developing
                confident, adaptable companions.
              </p>
              <p>
                We believe that responsible breeding means more than just producing
                puppies. It means ensuring each dog has the best start in life and
                goes to a loving family who will cherish them forever.
              </p>
            </div>
            <div className="split__media">
              <Image
                src="/images/Parents and past litters/first section image.jpg"
                alt="Heritage Hill Aussies Family"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="grid grid--3">
            {[
              {
                icon: '♥',
                title: 'Family First',
                desc: 'Our dogs are family members first. They live in our home, sleep on our couches, and play with our children every day.',
              },
              {
                icon: '🩺',
                title: 'Health Testing',
                desc: 'All breeding dogs undergo comprehensive health testing to ensure we produce the healthiest puppies possible.',
              },
              {
                icon: '📚',
                title: 'Education',
                desc: 'We educate all puppy families about the breed, proper care, and training to set everyone up for success.',
              },
              {
                icon: '🤝',
                title: 'Lifetime Support',
                desc: 'Our relationship doesn\'t end at pickup. We\'re here for you and your puppy for life.',
              },
              {
                icon: '✨',
                title: 'Quality Over Quantity',
                desc: 'We have limited litters each year to ensure each puppy receives individual attention and care.',
              },
              {
                icon: '🏆',
                title: 'Champion Lines',
                desc: 'Our breeding program includes dogs from champion bloodlines, ensuring excellent structure and temperament.',
              },
            ].map((value, i) => (
              <div key={i} className="feature-box">
                <div className="feature-box__icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Process</span>
            <h2>How We Raise Our Puppies</h2>
          </div>
          <div className="process-list">
            {[
              {
                num: '01',
                title: 'Early Neurological Stimulation',
                desc: 'From day 3-16, puppies undergo gentle handling exercises proven to improve stress tolerance and health.',
              },
              {
                num: '02',
                title: 'Socialization',
                desc: 'Puppies are exposed to various sounds, surfaces, and experiences. They interact with children, adults, and other pets daily.',
              },
              {
                num: '03',
                title: 'Basic Training',
                desc: 'We start potty training and basic manners before puppies go home, making your transition easier.',
              },
              {
                num: '04',
                title: 'Health Protocol',
                desc: 'All puppies receive age-appropriate vaccinations, deworming, and a comprehensive vet check before going home.',
              },
              {
                num: '05',
                title: 'Family Matching',
                desc: 'We get to know each puppy\'s personality and help match them with the perfect family for their temperament.',
              },
            ].map((step, i) => (
              <div key={i} className="process-item">
                <span className="process-item__number">{step.num}</span>
                <div>
                  <h3 className="process-item__title">{step.title}</h3>
                  <p className="process-item__text">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark">
        <div className="container">
          <div className="cta-block">
            <h2>Ready to Meet Your New Best Friend?</h2>
            <p>
              We&apos;d love to welcome you to the Heritage Hill family. Contact us
              to learn about available puppies or upcoming litters.
            </p>
            <div className="cta-block__actions">
              <Link href="/puppies" className="btn btn--primary btn--lg">
                View Puppies
              </Link>
              <Link href="/contact" className="btn btn--outline-white btn--lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
