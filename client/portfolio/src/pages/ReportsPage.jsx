import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ImageIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { REPORTS } from "../data/content.js";

const CATEGORIES = [
  { id: "Activity Report", icon: DocReceiptIcon, desc: "Field reports from our People, Pets and Planet initiatives." },
  { id: "Impact Report", icon: ImageIcon, desc: "Pictorial impact reports from our completed initiatives." },
];

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryReports = REPORTS.filter((report) => report.category === "Activity Report");
  const hasPublishedReports = categoryReports.some((report) => report.primaryUrl);
  const publishedCount = categoryReports.filter((report) => report.primaryUrl).length;
  const impactReports = REPORTS.flatMap((report) =>
    (report.files ?? [])
      .filter((file) => file.type === "Image")
      .map((file) => ({ ...file, source: report.title }))
  );
  const isImpact = selectedCategory === "Impact Report";

  const renderResults = () => {
    if (isImpact) {
      return (
        <>
          <div className="reports-results__head">
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Pictorial Reports</div>
              <h2 className="reports-results__title">Impact Report</h2>
            </div>
            <span className="pill">{impactReports.length} {impactReports.length === 1 ? "report" : "reports"} available</span>
          </div>
          <div className="impact-report-grid report-list">
            {impactReports.map((report) => (
              <a className="project-card report-card report-card--clickable impact-report-card" href={report.url} target="_blank" rel="noreferrer" key={report.url}>
                <div className="report-card__media">
                  <PhotoFrame src={report.url} alt={report.label} ratio="4/5" fit="contain" style={{ background: "var(--secondary)" }} />
                </div>
                <div className="project-card__body">
                  <span className="pill">Visual Impact Data</span>
                  <h3 className="h-sm mt-8">{report.label}</h3>
                  <span className="link-arrow mt-24">View Impact Report <ArrowRightIcon /></span>
                </div>
              </a>
            ))}
          </div>
        </>
      );
    }

    if (hasPublishedReports) {
      return (
        <>
          <div className="reports-results__head">
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Published Documents</div>
              <h2 className="reports-results__title">{selectedCategory}</h2>
            </div>
            <span className="pill">{publishedCount} {publishedCount === 1 ? "report" : "reports"} available</span>
          </div>
          <div className="report-list" key={selectedCategory}>
            {categoryReports.map((report) =>
              report.primaryUrl ? (
                <a className="project-card report-card report-card--clickable" href={report.primaryUrl} target="_blank" rel="noreferrer" key={report.id}>
                  <div className="report-card__media">
                    <PhotoFrame src={PHOTOS[report.image]} alt={report.title} ratio="4/5" fit="contain" style={{ background: "var(--secondary)" }} />
                  </div>
                  <div className="project-card__body">
                    <span className="pill">{report.category}</span>
                    <h3 className="h-sm mt-8">{report.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 10 }}>{report.desc}</p>
                    <span className="link-arrow mt-24">Read Full Report <ArrowRightIcon /></span>
                  </div>
                </a>
              ) : null
            )}
          </div>
        </>
      );
    }

    return (
      <div className="report-coming-soon-panel">
        <span className="report-coming-soon-panel__icon"><DocReceiptIcon /></span>
        <span className="pill">{selectedCategory}</span>
        <h3 className="h-md">Coming Soon</h3>
        <p>The {selectedCategory.toLowerCase()} is being prepared and will be published here as soon as it is available.</p>
      </div>
    );
  };

  return (
    <>
      <section className="reports-hero">
        <div className="reports-hero__inner">
          <motion.div className="reports-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold)" }}>Transparency &amp; Impact</div>
            <h1 className="reports-hero__title">Reports &amp; Impact</h1>
            <p className="reports-hero__sub">Browse the published reports of ERGON Foundation — choose a category to get started.</p>
          </motion.div>

          <div className="reports-hero__pickers">
            {CATEGORIES.map((category, i) => (
              <motion.button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`reports-picker ${selectedCategory === category.id ? "is-active" : ""}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              >
                <span className="reports-picker__icon"><category.icon /></span>
                <span className="reports-picker__label">{category.id}</span>
                <span className="reports-picker__desc">{category.desc}</span>
              </motion.button>
            ))}
          </div>

          {selectedCategory && (
            <motion.div
              className="reports-results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Reveal as="fade">{renderResults()}</Reveal>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
