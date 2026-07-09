import { NavLink } from 'react-router-dom';
import { PageHero } from '@/components/PageHero';
import { useSiteStore } from '@/store/site-store';

export function DonatePage() {
  const donate = useSiteStore((state) => state.content!.donate);

  return (
    <>
      <PageHero hero={donate.hero} />
      <section className="section">
        <div className="shell donate-layout">
          <article className="bank-card" data-reveal>
            <h3>Bank Transfer Details</h3>
            <div className="table-stack">
              {donate.bankDetails.map((item) => (
                <div className="table-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="info-card rich" data-reveal>
            <h3>Why Your Donation Matters</h3>
            <ul>
              {donate.givingReasons.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
            <NavLink className="button button-primary" to="/contact">
              Need Donation Assistance?
            </NavLink>
          </article>
        </div>
      </section>
    </>
  );
}

