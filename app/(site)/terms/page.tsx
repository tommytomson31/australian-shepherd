export const metadata = {
  title: 'Terms of Service | Heritage Hill Aussies',
  description: 'Terms of service for Heritage Hill Aussies website.',
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__content">
          <h1>Terms of Service</h1>
        </div>
      </section>

      <section className="legal-content">
        <div className="legal-content__inner">
          <p className="last-updated">Last Updated: February 2026</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using the Heritage Hill Aussies website, you accept
            and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2>Use of Website</h2>
          <p>
            This website is provided for informational purposes about our
            Australian Shepherd breeding program. You agree to use this website
            only for lawful purposes.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and
            design, is the property of Heritage Hill Aussies and is protected
            by copyright laws.
          </p>

          <h2>Puppy Sales</h2>
          <p>
            All puppy sales are subject to our separate Purchase Agreement,
            which will be provided to approved buyers. Deposits are
            non-refundable unless otherwise specified in writing.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Heritage Hill Aussies shall not be liable for any indirect,
            incidental, special, or consequential damages arising from the use
            of this website.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:aussiepuppies06@gmail.com">aussiepuppies06@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
