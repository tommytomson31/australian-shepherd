import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { faqPageSchema, webPageSchema } from '@/lib/schema';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagehillaussies.com';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Heritage Hill Aussies. Inquire about available Australian Shepherd puppies, upcoming litters, shipping, and adoption process.',
  alternates: { canonical: `${baseUrl}/contact` },
};

const CONTACT_FAQS = [
  {
    q: 'Do you ship puppies?',
    a: 'Yes, we can arrange safe shipping for puppies to approved homes. We work with reputable pet transport services to ensure your puppy arrives safely.',
  },
  {
    q: 'What is included with each puppy?',
    a: 'Every puppy comes with current vaccinations, vet health check, medical records, health guarantee, and lifetime breeder support.',
  },
  {
    q: 'How do I reserve a puppy?',
    a: "Contact us about the puppy you're interested in. After approval, a deposit secures your puppy until they're ready to go home.",
  },
  {
    q: 'When can puppies go home?',
    a: "Puppies are ready for their new homes at 8-9 weeks of age, after they've received appropriate vaccinations and veterinary clearance.",
  },
];

type ContactPageProps = { searchParams?: Promise<{ puppy?: string }> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const puppyFromUrl = params?.puppy ?? '';

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const faqSchema = faqPageSchema(
    CONTACT_FAQS.map((f) => ({ question: f.q, answer: f.a }))
  );
  const webPage = webPageSchema({
    name: 'Contact Us | Heritage Hill Aussies',
    description: metadata.description,
    path: '/contact',
    breadcrumbs,
  });

  return (
    <>
      <JsonLd data={[webPage, faqSchema]} />
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section-label">Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you about your future companion</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <p className="contact-form__intro">
                Whether you&apos;re interested in a specific puppy, want to be
                notified about upcoming litters, or just have questions about our
                breeding program, we&apos;re here to help. Fill out the form below
                and we&apos;ll get back to you as soon as possible.
              </p>
              <ContactForm puppyFromUrl={puppyFromUrl} />
            </div>

            {/* Contact Sidebar */}
            <div className="contact-sidebar">
              <div className="contact-card">
                <h3 className="contact-card__title">Contact Information</h3>
                <ul className="contact-card__list">
                  <li className="contact-card__item">
                    <span className="contact-card__label">Email</span>
                    <a href="mailto:aussiepuppies06@gmail.com">
                      aussiepuppies06@gmail.com
                    </a>
                  </li>
                  <li className="contact-card__item">
                    <span className="contact-card__label">Phone</span>
                    <a href="tel:+17579645341">+1 (757) 964-5341</a>
                  </li>
                  <li className="contact-card__item">
                    <span className="contact-card__label">Hours</span>
                    Monday - Saturday: 9am - 6pm
                  </li>
                </ul>
              </div>

              <div className="contact-card">
                <h3 className="contact-card__title">What to Expect</h3>
                <ul className="contact-card__expect-list">
                  <li>Response within 24-48 hours</li>
                  <li>Detailed information about available puppies</li>
                  <li>Answers to all your questions</li>
                  <li>Information about our adoption process</li>
                  <li>No pressure, just helpful guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            {CONTACT_FAQS.map((faq, i) => (
              <div key={i} className="faq-card">
                <h4 className="faq-card__question">{faq.q}</h4>
                <p className="faq-card__answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
