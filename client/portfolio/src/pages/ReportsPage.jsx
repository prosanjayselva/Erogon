import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ArrowRightIcon, DownloadIcon } from "../components/Icons.jsx";
import { REPORTS, FEATURED_REPORTS } from "../data/content.js";

export default function ReportsPage() {
  return (
    <>
      <section className="glass-hero">
        <div className="glass-hero__inner">
          <motion.div className="glass-hero__content" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="glass-hero__eyebrow">Transparency</span>
            <h1 className="glass-hero__title">Our Reports</h1>
            <p className="glass-hero__sub">A running record of what your trust made possible — activity reports and full annual accounts, published as they're ready.</p>
          </motion.div>
          <motion.div className="glass-hero__cards" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="glass-hero__card">
              <span className="pill">Environment Day 2026</span>
              <h4>Impact Report</h4>
              <p>Tree plantation and beach clean-up drives across Ramanathapuram and Yercaud.</p>
            </div>
            <div className="glass-hero__card">
              <span className="pill">Medical Camp 2026</span>
              <h4>Impact Report</h4>
              <p>Free medical camp for migrant workers in Avadi, Chennai.</p>
            </div>
            <div className="glass-hero__card">
              <span className="pill">Annual Activity</span>
              <h4>2025-2026 Report</h4>
              <p>Full annual record of programmes, finances and community impact.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="mb-24">
            <div className="eyebrow">Latest Activity</div>
            <h2 className="h-lg">Straight From The Field</h2>
          </Reveal>

          <Stagger className="grid-2">
            {FEATURED_REPORTS.map((r, i) => (
              <StaggerItem key={i}>
                <div className="project-card">
                  <PhotoFrame src={PHOTOS[r.image]} alt={r.title} ratio="2/3" fit="contain" style={{ background: "var(--secondary)" }} />
                  <div className="project-card__body">
                    <span className="pill">{r.date}</span>
                    <h3 className="h-sm mt-8">{r.title}</h3>
                    <p style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.86rem", marginTop: 2 }}>{r.subtitle}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 10 }}>{r.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center", maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Impact In Pictures</div>
            <h2 className="h-lg">Visual Impact Reports</h2>
          </Reveal>
          <Stagger className="grid-2 mt-48">
            <StaggerItem>
              <div className="project-card">
                <PhotoFrame src={PHOTOS.reportMedicalImpact} alt="Medical Camp Impact Report" ratio="4/3" />
                <div className="project-card__body">
                  <h3 className="h-sm">Medical Camp 2026 — Impact</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 4 }}>Pictorial impact report from the free medical camp for migrant workers in Avadi, Chennai.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="project-card">
                <PhotoFrame src={PHOTOS.reportEnvImpact} alt="Environment Day Impact Report" ratio="4/3" />
                <div className="project-card__body">
                  <h3 className="h-sm">Environment Day 2026 — Impact</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 4 }}>Infographic report of tree plantation and beach clean-up drives across Ramanathapuram and Yercaud.</p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: "flex-start" }}>
          <Reveal as="left">
            <div className="eyebrow">The Record</div>
            <h2 className="h-lg">Report Timeline</h2>
            <div className="timeline mt-32">
              {REPORTS.map((r, i) => (
                <div className="timeline-item" key={i}>
                  <span className="yr">{r.year}</span>
                  <h4>{r.title}</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 4 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <div className="card">
              <div className="icon-badge"><DocReceiptIcon /></div>
              <h3 className="h-sm">Request A Report</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginTop: 8 }}>
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
