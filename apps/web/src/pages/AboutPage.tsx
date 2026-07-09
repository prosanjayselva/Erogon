import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteStore } from '@/store/site-store';

export function AboutPage() {
  const about = useSiteStore((state) => state.content!.about);

  return (
    <>
      <PageHero hero={about.hero} />
      <section className="section">
        <div className="shell info-grid two">
          {about.values.map((item) => (
            <article className="info-card" key={item.title} data-reveal>
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
              {item.bullets ? (
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <section className="section soft-section">
        <div className="shell">
          <SectionHeading title="ERGON Team" description="Leadership and stewardship committed to grounded, accountable action." />
          <div className="info-grid three">
            {about.teamGroups.map((group) => (
              <article className="info-card" key={group.title} data-reveal>
                <h3>{group.title}</h3>
                <ul>
                  {group.members.map((member) => <li key={member}>{member}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

