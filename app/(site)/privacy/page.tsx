export const metadata = {
  title: 'Privacy Policy | Heritage Hill Aussies',
  description: 'Privacy policy for Heritage Hill Aussies website.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__content">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="legal-content">
        <div className="legal-content__inner">
          <p className="last-updated">Last Updated: February 2026</p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            fill out a contact form, inquire about puppies, or communicate with
            us via email or phone.
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Information about your interest in our puppies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries</li>
            <li>Process puppy applications</li>
            <li>Send updates about available puppies (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information only as necessary to provide our
            services or as required by law.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet is
            100% secure.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience.
            You can set your browser to refuse cookies, but some features may
            not function properly.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at <a href="mailto:aussiepuppies06@gmail.com">aussiepuppies06@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
