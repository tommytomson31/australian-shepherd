'use client';

import { useState, useEffect } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? '';

interface ContactFormProps {
  puppyFromUrl?: string;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ puppyFromUrl = '' }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (submitState === 'success') {
      const t = setTimeout(() => setSubmitState('idle'), 8000);
      return () => clearTimeout(t);
    }
  }, [submitState]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: Record<string, string> = {};
    data.forEach((val, key) => { payload[key] = val.toString(); });

    const subjectSelect = form.querySelector<HTMLSelectElement>('#subject');
    const subjectLabel = subjectSelect?.options[subjectSelect.selectedIndex]?.text ?? '';
    payload._subject = `Heritage Hill Aussies: ${subjectLabel || 'Contact form'}`;

    if (FORMSPREE_ID) {
      setSubmitState('sending');
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSubmitState('success');
          form.reset();
        } else {
          const json = await res.json().catch(() => ({}));
          setErrorMsg(json?.error ?? 'Something went wrong. Please try again.');
          setSubmitState('error');
        }
      } catch {
        setErrorMsg('Unable to send. Please check your connection or email us directly.');
        setSubmitState('error');
      }
    } else {
      // Fallback: open mailto
      const first = payload.firstName ?? '';
      const last = payload.lastName ?? '';
      const email = payload.email ?? '';
      const phone = payload.phone ?? '';
      const puppyInterest = payload.puppyInterest ?? 'Not specified';
      const message = payload.message ?? '';
      const subject = `Heritage Hill Aussies Inquiry: ${subjectLabel}`.trim();
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
        message,
      ].join('\n');
      window.location.href = `mailto:aussiepuppies06@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  const isSending = submitState === 'sending';

  return (
    <>
      {submitState === 'success' && (
        <div className="contact-form__alert contact-form__alert--success" role="alert">
          <strong>Message sent successfully!</strong>
          <br />
          <span className="contact-form__alert-body">
            Thank you! We&apos;ll get back to you within 24–48 hours.
          </span>
        </div>
      )}

      {submitState === 'error' && (
        <div className="contact-form__alert contact-form__alert--error" role="alert">
          <strong>Something went wrong.</strong>
          <br />
          <span className="contact-form__alert-body">
            {errorMsg || 'Please try again or email us directly at aussiepuppies06@gmail.com.'}
          </span>
        </div>
      )}

      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="puppyInterest" value={puppyFromUrl} />

        {puppyFromUrl && (
          <div className="form-group contact-form__puppy-prefill">
            <span className="contact-form__puppy-label">Inquiring about</span>
            <span className="contact-form__puppy-value">{puppyFromUrl}</span>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input type="text" id="firstName" name="firstName" required disabled={isSending} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input type="text" id="lastName" name="lastName" required disabled={isSending} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input type="email" id="email" name="email" required disabled={isSending} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" disabled={isSending} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" defaultValue={puppyFromUrl ? 'puppy-inquiry' : ''} disabled={isSending}>
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
            disabled={isSending}
            placeholder="Tell us about yourself and what you're looking for in a puppy..."
          />
        </div>

        <button
          type="submit"
          className="btn btn--primary btn--lg btn--block contact-form__submit"
          disabled={isSending}
        >
          {isSending ? 'Sending...' : submitState === 'success' ? 'Sent!' : 'Send Message'}
        </button>

        <p className="contact-form__note">
          {isSending
            ? 'Sending your message...'
            : 'We typically respond within 24–48 hours.'}
        </p>
      </form>
    </>
  );
}
