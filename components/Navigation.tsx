'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-menu-open');
    } else {
      document.body.classList.remove('nav-menu-open');
    }
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/puppies', label: 'Available Puppies' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
          <Image
            src="/images/Parents and past litters/Logo image.svg"
            alt="Heritage Hill Aussies"
            width={150}
            height={150}
            className="nav__logo-img"
            priority
          />
        </Link>
        <button
          className={`nav__toggle ${isOpen ? 'nav__toggle--active' : ''}`}
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav__links ${isOpen ? 'nav__links--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link ${pathname === link.href ? 'nav__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="nav__cta" onClick={() => setIsOpen(false)}>
            Inquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
