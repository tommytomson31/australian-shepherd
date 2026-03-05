// ============================================
// HERITAGE HILL AUSSIES
// Main JavaScript
// ============================================

function initContactAndUI() {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--active');
      document.body.classList.remove('nav-menu-open');
    };
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--active');
      document.body.classList.toggle('nav-menu-open', navLinks.classList.contains('nav__links--open'));
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // --- Scroll-based Nav Styling ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Fade-in on scroll (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // --- Active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // --- Custom Puppy Selector Dropdown ---
  const trigger = document.getElementById('puppy-select-trigger');
  const dropdown = document.getElementById('puppy-select-dropdown');
  const hiddenInput = document.getElementById('puppy-interest-input');

  if (trigger && dropdown) {
    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('puppy-select-dropdown--open');
      dropdown.classList.toggle('puppy-select-dropdown--open');
      trigger.classList.toggle('puppy-select-trigger--open');
    });

    // Select an option
    dropdown.querySelectorAll('.puppy-select-option').forEach(option => {
      option.addEventListener('click', () => {
        const value = option.dataset.value;
        const name = option.querySelector('.puppy-select-option__name').textContent;
        const img = option.dataset.img;

        // Update hidden input
        if (hiddenInput) hiddenInput.value = value;

        // Update trigger display
        trigger.innerHTML = '';
        if (img) {
          const imgEl = document.createElement('img');
          imgEl.src = img;
          imgEl.alt = name;
          imgEl.style.cssText = 'width:28px;height:28px;border-radius:50%;object-fit:cover;border:1.5px solid var(--color-border);';
          trigger.appendChild(imgEl);
        }
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name;
        nameSpan.style.cssText = 'flex:1;font-weight:500;';
        trigger.appendChild(nameSpan);

        const arrow = document.createElement('span');
        arrow.className = 'puppy-select-trigger__arrow';
        arrow.innerHTML = '&#9662;';
        trigger.appendChild(arrow);

        trigger.style.display = 'flex';
        trigger.style.alignItems = 'center';
        trigger.style.gap = '0.65rem';

        // Mark selected
        dropdown.querySelectorAll('.puppy-select-option').forEach(o =>
          o.classList.remove('puppy-select-option--selected')
        );
        option.classList.add('puppy-select-option--selected');

        // Close dropdown
        dropdown.classList.remove('puppy-select-dropdown--open');
        trigger.classList.remove('puppy-select-trigger--open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#puppy-selector')) {
        dropdown.classList.remove('puppy-select-dropdown--open');
        trigger.classList.remove('puppy-select-trigger--open');
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('puppy-select-dropdown--open');
        trigger.classList.remove('puppy-select-trigger--open');
      }
    });
  }

  // --- Pre-select puppy from URL parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const puppyParam = urlParams.get('puppy');
  if (puppyParam && trigger && dropdown) {
    const matchOption = dropdown.querySelector(`[data-value="${puppyParam}"]`);
    if (matchOption) {
      matchOption.click();
    }
  }

  // --- Contact form: submit via Formspree (no email app) or fallback to mailto ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const first = (document.getElementById('first-name') && document.getElementById('first-name').value) || '';
      const last = (document.getElementById('last-name') && document.getElementById('last-name').value) || '';
      const email = (document.getElementById('email') && document.getElementById('email').value) || '';
      const phone = (document.getElementById('phone') && document.getElementById('phone').value) || '';
      const subjectSelect = document.getElementById('subject');
      const subjectLabel = subjectSelect && subjectSelect.options[subjectSelect.selectedIndex] ? subjectSelect.options[subjectSelect.selectedIndex].text : '';
      const puppyInterest = (document.getElementById('puppy-interest-input') && document.getElementById('puppy-interest-input').value) || 'Not specified';
      const message = (document.getElementById('message') && document.getElementById('message').value) || '';

      const submitBtn = contactForm.querySelector('.contact-form__submit');
      const note = contactForm.querySelector('.contact-form__note');
      const formspreeId = contactForm.getAttribute('data-formspree-id');

      function setState(btnText, noteText, disabled) {
        if (submitBtn) submitBtn.textContent = btnText;
        if (submitBtn) submitBtn.disabled = disabled;
        if (note) note.textContent = noteText;
      }

      if (formspreeId && formspreeId.trim()) {
        const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
        setState('Sending...', '', true);
        try {
          const res = await fetch('https://formspree.io/f/' + formspreeId.trim(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: first,
              lastName: last,
              email: email,
              phone: phone,
              subject: subjectLabel,
              puppyInterest: puppyInterest,
              message: message,
              _subject: 'Heritage Hill Aussies: ' + (subjectLabel || 'Contact form')
            })
          });
          if (res.ok) {
            setState('Message sent!', 'Thank you! We\'ll get back to you within 24–48 hours.', true);
            contactForm.reset();
            if (document.getElementById('puppy-interest-input')) document.getElementById('puppy-interest-input').value = contactForm.getAttribute('data-puppy-initial') || '';
            setTimeout(() => {
              setState(originalText, 'We typically respond within 24–48 hours.', false);
            }, 6000);
          } else {
            const err = await res.json().catch(() => ({}));
            setState(originalText, 'Something went wrong. Please try again or email us directly.', false);
          }
        } catch (err) {
          setState(originalText, 'Unable to send. Please check your connection or email us directly.', false);
        }
        return;
      }

      // Fallback: open mailto
      const to = 'aussiepuppies06@gmail.com';
      const subject = `Heritage Hill Aussies Inquiry: ${subjectLabel}`.replace(/\s+/g, ' ').trim();
      const body = [
        '--- Heritage Hill Aussies - Contact Form ---',
        '',
        `Name: ${first} ${last}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subjectLabel}`,
        `Puppy interest: ${puppyInterest}`,
        '',
        'Message:',
        message
      ].join('\n');
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
      setState('Opening your email...', '', true);
      setTimeout(() => {
        setState('Inquiry sent! Check your email client.', 'Send the email in your app to complete your message.', true);
        setTimeout(() => {
          setState(originalText, 'We typically respond within 24 hours.', false);
        }, 5000);
      }, 800);
    });
  }

  // --- Puppy Card Image Gallery (click, tap, swipe to cycle) ---
  document.querySelectorAll('.puppy-gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('.puppy-card__image');
    const dots = gallery.querySelectorAll('.puppy-gallery__dot');
    let current = 0;
    const total = images.length;

    if (total <= 1) return;

    // Add photo counter and tap/swipe hint (injected for all galleries)
    const counter = document.createElement('span');
    counter.className = 'puppy-gallery__counter';
    counter.setAttribute('aria-hidden', 'true');
    const hint = document.createElement('span');
    hint.className = 'puppy-gallery__hint';
    hint.textContent = 'Tap or swipe';
    hint.setAttribute('aria-hidden', 'true');
    gallery.appendChild(counter);
    gallery.appendChild(hint);

    // Hide all but first
    images.forEach((img, i) => {
      if (i > 0) img.style.display = 'none';
    });

    const showImage = (index) => {
      current = ((index % total) + total) % total;
      images.forEach((img, i) => {
        img.style.display = i === current ? 'block' : 'none';
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('puppy-gallery__dot--active', i === current);
      });
      counter.textContent = `${current + 1} / ${total}`;
      hint.classList.add('puppy-gallery__hint--dismissed');
    };

    showImage(0);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(i);
      });
    });

    // Click/tap image to advance
    gallery.addEventListener('click', (e) => {
      if (!e.target.closest('.puppy-gallery__dot')) {
        showImage(current + 1);
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    const SWIPE_THRESHOLD = 50;
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    gallery.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        if (delta > 0) showImage(current + 1);
        else showImage(current - 1);
      }
    }, { passive: true });
  });

}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactAndUI);
  } else {
    initContactAndUI();
  }
}

// --- Fade-in CSS injection ---
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .fade-in--visible {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-in--delay-1 { transition-delay: 0.1s; }
  .fade-in--delay-2 { transition-delay: 0.2s; }
  .fade-in--delay-3 { transition-delay: 0.3s; }
  .fade-in--delay-4 { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
