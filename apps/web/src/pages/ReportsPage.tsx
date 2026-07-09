import { PageHero } from '@/components/PageHero';
import { getAsset } from '@/lib/assets';
import { useSiteStore } from '@/store/site-store';

export function ReportsPage() {
  const reports = useSiteStore((state) => state.content!.reports);

  return (
    <>
      <PageHero hero={reports.hero} />
      <section className="section">
        <div className="shell info-grid two">
          {reports.reports.map((report) => (
            <article className="media-report-card" key={report.title} data-reveal>
              <img src={getAsset(report.imageKey)} alt={report.title} loading="lazy" decoding="async" />
              <div>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
