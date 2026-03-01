export const metadata = {
  title: 'Contact Us | Heritage Hill Aussies',
  description: 'Get in touch with Heritage Hill Aussies. Inquire about our available Australian Shepherd puppies or upcoming litters.',
};

export default function ContactPage() {
  return (
    <>
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

              <form action="https://formspree.io/f/your-form-id" method="POST">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">
                      Last Name <span className="required">*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject">
                    <option value="">Select a subject...</option>
                    <option value="puppy-inquiry">Puppy Inquiry</option>
                    <option value="upcoming-litters">Upcoming Litters</option>
                    <option value="general-question">General Question</option>
                    <option value="adoption-process">Adoption Process</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about yourself and what you're looking for in a puppy..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn--primary btn--lg btn--block contact-form__submit">
                  Send Message
                </button>

                <p className="contact-form__note">
                  We typically respond within 24-48 hours.
                </p>
              </form>
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
                    <span className="contact-card__label">Location</span>
                    United States
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
            {[
              {
                q: 'Do you ship puppies?',
                a: 'Yes, we can arrange safe shipping for puppies to approved homes. We work with reputable pet transport services to ensure your puppy arrives safely.',
              },
              {
                q: 'What is included with each puppy?',
                a: 'Every puppy comes with AKC registration, current vaccinations, vet health check, medical records, health guarantee, and lifetime breeder support.',
              },
              {
                q: 'How do I reserve a puppy?',
                a: 'Contact us about the puppy you\'re interested in. After approval, a deposit secures your puppy until they\'re ready to go home.',
              },
              {
                q: 'When can puppies go home?',
                a: 'Puppies are ready for their new homes at 8-9 weeks of age, after they\'ve received appropriate vaccinations and veterinary clearance.',
              },
            ].map((faq, i) => (
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
