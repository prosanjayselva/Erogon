import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteStore } from '@/store/site-store';

export function EduSProPage() {
  const eduspro = useSiteStore((state) => state.content!.eduspro);

  return (
    <>
      <PageHero hero={eduspro.hero} />
      <section className="section">
        <div className="shell info-grid two">
          {eduspro.panels.map((panel) => (
            <article className="info-card" key={panel.title} data-reveal>
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section soft-section">
        <div className="shell">
          <SectionHeading title="Why Sponsors Matter" description="Each contribution protects a child's continuity, confidence, and future." />
          <div className="mini-stats">
            {eduspro.highlightStats.map((stat) => (
              <article className="mini-stat-card" key={stat.label} data-reveal>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

