import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { useSiteStore } from '@/store/site-store';
import type { ContactPayload } from '@/types/site';

const initialState: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function ContactPage() {
  const contact = useSiteStore((state) => state.content!.contact);
  const contactFeedback = useSiteStore((state) => state.contactFeedback);
  const sendContact = useSiteStore((state) => state.sendContact);
  const clearFeedback = useSiteStore((state) => state.clearFeedback);
  const [form, setForm] = useState<ContactPayload>(initialState);

  return (
    <>
      <PageHero hero={contact.hero} />
      <section className="section">
        <div className="shell info-grid two">
          <article className="info-card" data-reveal>
            <h3>Office Address</h3>
            <p>{contact.address.join(', ')}</p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Mobile:</strong> {contact.phone}
            </p>
          </article>

          <article className="info-card" data-reveal>
            <h3>Connect With Us</h3>
            <ul>
              {contact.socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell form-section" data-reveal>
          <div>
            <h2 className="section-title">
              Send An Enquiry
              <span>And Start The Conversation</span>
            </h2>
            <p className="section-copy">
              Reach us for donations, volunteering, partnerships, media, or general questions.
            </p>
          </div>

          <form
            className="form-card"
            onSubmit={async (event) => {
              event.preventDefault();
              await sendContact(form);
              setForm(initialState);
            }}
          >
            <input
              className="field"
              value={form.name}
              onChange={(event) => {
                clearFeedback('contact');
                setForm((state) => ({ ...state, name: event.target.value }));
              }}
              placeholder="Full name"
              required
            />
            <input
              className="field"
              type="email"
              value={form.email}
              onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
              placeholder="Email address"
              required
            />
            <input
              className="field"
              value={form.phone}
              onChange={(event) => setForm((state) => ({ ...state, phone: event.target.value }))}
              placeholder="Phone number"
              required
            />
            <input
              className="field"
              value={form.subject}
              onChange={(event) => setForm((state) => ({ ...state, subject: event.target.value }))}
              placeholder="Subject"
              required
            />
            <textarea
              className="field textarea"
              value={form.message}
              onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))}
              placeholder="Tell us how we can help"
              required
            />
            <button className="button button-primary" type="submit" disabled={contactFeedback.state === 'loading'}>
              {contactFeedback.state === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {contactFeedback.message ? <p className={`form-message ${contactFeedback.state}`}>{contactFeedback.message}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}

