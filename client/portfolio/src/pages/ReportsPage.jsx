import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ArrowRightIcon, ChevronRightIcon } from "../components/Icons.jsx";
import { REPORTS } from "../data/content.js";

const CATEGORIES = ["Activity Report", "Annual Report"];

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Activity Report");
  const [showImpact, setShowImpact] = useState(false);
  const categoryReports = REPORTS.filter((report) => report.category === selectedCategory);
  const hasPublishedReports = categoryReports.some((report) => report.primaryUrl);
  const impactReports = REPORTS.flatMap((report) =>
    (report.files ?? [])
      .filter((file) => file.type === "Image")
      .map((file) => ({ ...file, source: report.title }))
  );

  return (
    <>
      <section className="glass-hero">
        <div className="glass-hero__inner">
          <motion.div className="glass-hero__content" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="glass-hero__title">Reports &amp; Impact</h1>
          </motion.div>
          <motion.div className="glass-hero__cards report-picker report-picker--two" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {CATEGORIES.map((category) => (
              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`glass-hero__card report-link-card ${selectedCategory === category ? "is-active" : ""}`}
                key={category}
              >
                <span className="pill">Report Category</span>
                <h4>{category}</h4>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section reports-content">
        <div className="container reports-content__inner">
          <Reveal as="up" className="mb-24 reports-section-head">
            <div className="eyebrow">Selected Category</div>
            <h2 className="h-lg">{selectedCategory}</h2>
          </Reveal>

          {hasPublishedReports ? (
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
          ) : (
            <div className="report-coming-soon-panel" key={selectedCategory}>
              <span className="report-coming-soon-panel__icon"><DocReceiptIcon /></span>
              <span className="pill">{selectedCategory}</span>
              <h3 className="h-md">Coming Soon</h3>
              <p>The {selectedCategory.toLowerCase()} is being prepared and will be published here as soon as it is available.</p>
            </div>
          )}
        </div>
      </section>

      <section className="impact-library" id="impact-report">
        <div className="container impact-library__inner">
          <button
            type="button"
            className={`impact-library__trigger ${showImpact ? "is-open" : ""}`}
            onClick={() => setShowImpact((v) => !v)}
            aria-expanded={showImpact}
            aria-controls="impact-library-grid"
          >
            <div>
              <span className="eyebrow">Pictorial Reports</span>
              <h2 className="h-lg">Impact Report</h2>
              <p>Every initiative tells a story. View all our pictorial reports in one place.</p>
            </div>
            <span className="link-arrow impact-library__toggle">
              {showImpact ? "Hide Impact Reports" : "View Impact Reports"}
              <ChevronRightIcon />
            </span>
          </button>
          {showImpact && (
            <motion.div
              className="impact-report-grid impact-library__grid"
              id="impact-library-grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
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
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
