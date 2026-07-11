import PageHero from "../components/PageHero.jsx";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";

import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { REPORTS, FEATURED_REPORTS } from "../data/content.js";

export default function ReportsPage() {
  return (
    <>
      <PageHero crumb="Reports" eyebrow="Transparency" title="Our Reports" sub="A running record of what your trust made possible — activity reports and full annual accounts, published as they're ready." />

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="mb-24">
            <div className="eyebrow">Latest Activity</div>
            <h2 className="h-lg">Straight From The Field</h2>
          </Reveal>

          <Stagger className="grid-2">
            {FEATURED_REPORTS.map((r, i) => (
              <StaggerItem key={i}>
                <div className="project-card">
                  <PhotoFrame src={PHOTOS[r.image]} alt={r.title} ratio="2/3" fit="contain" style={{ background: "var(--cream-100)" }} />
                  <div className="project-card__body">
                    <span className="pill">{r.date}</span>
                    <h3 className="h-sm mt-8">{r.title}</h3>
                    <p style={{ color: "var(--gold-700)", fontWeight: 600, fontSize: "0.86rem", marginTop: 2 }}>{r.subtitle}</p>
                    <p style={{ color: "var(--ink-500)", fontSize: "0.9rem", marginTop: 10 }}>{r.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap grid-2" style={{ alignItems: "flex-start" }}>
          <Reveal as="left">
            <div className="eyebrow">The Record</div>
            <h2 className="h-lg">Report Timeline</h2>
            <div className="timeline mt-32">
              {REPORTS.map((r, i) => (
                <div className="timeline-item" key={i}>
                  <span className="yr">{r.year}</span>
                  <h4>{r.title}</h4>
                  <p style={{ color: "var(--ink-500)", fontSize: "0.9rem", marginTop: 4 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <div className="card">
              <div className="icon-badge"><DocReceiptIcon /></div>
              <h3 className="h-sm">Request A Report</h3>
              <p style={{ color: "var(--ink-500)", fontSize: "0.92rem", marginTop: 8 }}>
                Activity and Annual Reports are shared with donors, partners and the public on request, and
                published here as PDFs once finalised for the year.
              </p>
              <a href="mailto:admin@ergonfoundation.org?subject=Report%20Request" className="link-arrow mt-24" style={{ display: "inline-flex" }}>
                Email admin@ergonfoundation.org <ArrowRightIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
