import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { useSiteStore } from '@/store/site-store';
import type { InterestPayload } from '@/types/site';

const initialState: InterestPayload = {
  name: '',
  email: '',
  phone: '',
  interestArea: 'Volunteer',
  note: '',
};

export function GetInvolvedPage() {
  const getInvolved = useSiteStore((state) => state.content!.getInvolved);
  const interestFeedback = useSiteStore((state) => state.interestFeedback);
  const sendInterest = useSiteStore((state) => state.sendInterest);
  const clearFeedback = useSiteStore((state) => state.clearFeedback);
  const [form, setForm] = useState<InterestPayload>(initialState);

  return (
    <>
      <PageHero hero={getInvolved.hero} />

      <section className="section">
        <div className="shell info-grid two">
          {getInvolved.panels.map((panel) => (
            <article className="info-card" key={panel.title} data-reveal>
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell info-grid two">
          {getInvolved.lists.map((list) => (
            <article className="info-card" key={list.title} data-reveal>
              <h3>{list.title}</h3>
              <ul>
                {list.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell form-section" data-reveal>
          <div>
            <h2 className="section-title">
              Raise Your Hand
              <span>For A Better Tomorrow</span>
            </h2>
            <p className="section-copy">
              Whether you want to volunteer, partner, or explore career opportunities, we will route your message to the right ERGON team.
            </p>
          </div>

          <form
            className="form-card"
            onSubmit={async (event) => {
              event.preventDefault();
              await sendInterest(form);
              setForm(initialState);
            }}
          >
            <input
              className="field"
              value={form.name}
              onChange={(event) => {
                clearFeedback('interest');
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
            <select
              className="field"
              value={form.interestArea}
              onChange={(event) =>
                setForm((state) => ({
                  ...state,
                  interestArea: event.target.value as InterestPayload['interestArea'],
                }))
              }
            >
              <option value="Volunteer">Volunteer</option>
              <option value="Partner">Partner</option>
              <option value="Career">Career</option>
            </select>
            <textarea
              className="field textarea"
              value={form.note}
              onChange={(event) => setForm((state) => ({ ...state, note: event.target.value }))}
              placeholder="How would you like to contribute?"
              required
            />
            <button className="button button-primary" type="submit" disabled={interestFeedback.state === 'loading'}>
              {interestFeedback.state === 'loading' ? 'Sending...' : 'Submit Interest'}
            </button>
            {interestFeedback.message ? <p className={`form-message ${interestFeedback.state}`}>{interestFeedback.message}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}

