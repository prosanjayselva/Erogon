import { Icon } from '@/components/Icons';
import { PageHero } from '@/components/PageHero';
import { useSiteStore } from '@/store/site-store';

export function CausesPage() {
  const causes = useSiteStore((state) => state.content!.causes);

  return (
    <>
      <PageHero hero={causes.hero} />
      <section className="section">
        <div className="shell info-grid three">
          {causes.cards.map((card) => (
            <article className="info-card rich" key={card.title} data-reveal>
              <div className="icon-chip">
                <Icon name={card.icon ?? 'sprout'} width={30} height={30} />
              </div>
              <h3>{card.title}</h3>
              <ul>
                {card.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

