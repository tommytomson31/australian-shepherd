import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="nav__logo">
              <Image
                src="/images/Parents and past litters/Logo image.svg"
                alt="Heritage Hill Aussies"
                width={150}
                height={150}
                className="nav__logo-img"
              />
            </Link>
            <p>
              A family-owned breeder dedicated to raising healthy, well-socialized
              Australian Shepherds with champion bloodlines. Every puppy is raised
              in our home with love and care.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/puppies">Available Puppies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Information</h4>
            <ul className="footer__links">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="footer__links">
              <li>Email: aussiepuppies06@gmail.com</li>
              <li>Phone: +1 (757) 964-5341</li>
              <li>Location: United States</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Heritage Hill Aussies. All rights reserved.</p>
          <p>
            <Link href="/terms">Terms</Link> &middot;{' '}
            <Link href="/privacy">Privacy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
