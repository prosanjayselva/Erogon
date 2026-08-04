import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { REPORTS } from "../data/content.js";
import { BrandName } from "../components/BrandName.jsx";

export default function ReportsPage() {
  const defaultReport = REPORTS.find((report) => report.primaryUrl);
  const availableReports = REPORTS;
  const reportCategories = ["Activity Report", "Annual Report"];
  const [selectedReportId, setSelectedReportId] = useState(defaultReport?.id ?? REPORTS[0]?.id);
  const [selectedCategory, setSelectedCategory] = useState("Activity Report");
  const viewerRef = useRef(null);
  const reportsListRef = useRef(null);
  const categoryScrollPendingRef = useRef(false);
  const selectedReport = REPORTS.find((report) => report.id === selectedReportId) ?? defaultReport;
  const categoryReports = availableReports.filter((report) => report.category === selectedCategory);
  const impactReports = REPORTS.flatMap((report) =>
    (report.files ?? [])
      .filter((file) => file.type === "Image")
      .map((file) => ({ ...file, reportTitle: report.title }))
  );
  const activeFile = selectedReport?.files?.[0] ?? null;

  useEffect(() => {
    if (!categoryScrollPendingRef.current) return;
    categoryScrollPendingRef.current = false;
    reportsListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedCategory]);

  const scrollToViewer = () => {
    window.requestAnimationFrame(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const selectReport = (report) => {
    setSelectedCategory(report.category);
    if (!report.primaryUrl) {
      setSelectedReportId(report.id);
      scrollToViewer();
      return;
    }
    setSelectedReportId(report.id);
    scrollToViewer();
  };

  const selectCategory = (category) => {
    const firstReport = REPORTS.find((report) => report.category === category);
    if (category === selectedCategory) {
      reportsListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    categoryScrollPendingRef.current = true;
    setSelectedCategory(category);
    if (firstReport) setSelectedReportId(firstReport.id);
  };

  return (
    <>
      <section className="glass-hero">
        <div className="glass-hero__inner">
          <motion.div className="glass-hero__content" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="glass-hero__eyebrow">Reports</span>
            <h1 className="glass-hero__title">Activity Report & Annual Report</h1>
            <p className="glass-hero__sub">
              Activity Report and Annual Report records from <BrandName /> programmes.
              Select a report row to preview the document inside the website.
            </p>
          </motion.div>

          <motion.div className="glass-hero__cards report-picker" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {reportCategories.map((category) => {
              return (
              <button
                type="button"
                onClick={() => selectCategory(category)}
                className={`glass-hero__card report-link-card ${selectedCategory === category ? "is-active" : ""}`}
                key={category}
              >
                <span className="pill">Report Category</span>
                <h4>{category}</h4>
                <p>{category === "Activity Report" ? <>Read detailed narrative reports from ERGON activities.</> : <>Read <BrandName /> annual records.</>}</p>
              </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section reports-content" ref={reportsListRef}>
        <div className="container reports-content__inner">
          <Reveal as="up" className="mb-24 reports-section-head">
            <div className="eyebrow">Selected Category</div>
            <h2 className="h-lg">{selectedCategory}</h2>
          </Reveal>

          <div className="report-list" key={selectedCategory}>
            {categoryReports.map((report) => (
              <div key={report.id}>
                <button
                  type="button"
                  onClick={() => selectReport(report)}
                  className={`project-card report-card report-card--clickable ${selectedReport?.id === report.id ? "is-active" : ""}`}
                >
                  <div className="report-card__media">
                    <PhotoFrame src={PHOTOS[report.image]} alt={report.title} ratio="4/5" fit="contain" style={{ background: "var(--secondary)" }} />
                  </div>
                  <div className="project-card__body">
                    <span className="pill">{report.category}</span>
                    <h3 className="h-sm mt-8">{report.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 10 }}>{report.desc}</p>
                    <span className="link-arrow mt-24">
                      {report.primaryUrl ? "Open Report" : "Coming Soon"} <ArrowRightIcon />
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {selectedReport && (
            <div ref={viewerRef}>
              <Reveal as="up" className="report-inline-viewer mt-48">
                <div className="report-inline-viewer__head">
                  <div>
                    <span className="pill">{selectedReport.category}</span>
                    <h3 className="h-md mt-8">{selectedReport.title}</h3>
                    <p>{selectedReport.desc}</p>
                  </div>
                  {selectedReport.primaryUrl && (
                    <a href={selectedReport.primaryUrl} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                      Open Full Screen <ArrowRightIcon />
                    </a>
                  )}
                </div>

                {activeFile ? (
                  activeFile.type === "Image" ? (
                    <img className="report-inline-viewer__media" src={activeFile.url} alt={activeFile.label} />
                  ) : (
                    <iframe className="report-inline-viewer__frame" src={activeFile.url} title={activeFile.label} />
                  )
                ) : (
                  <div className="report-inline-viewer__empty">
                    <div className="report-coming-soon">
                      <DocReceiptIcon />
                      <strong>Coming Soon</strong>
                      <span>Annual Report</span>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          )}

          <div className="impact-library">
            <Reveal as="up" className="mb-24 reports-section-head">
              <div className="eyebrow">Reports Library</div>
              <h2 className="h-lg">Impact Reports</h2>
            </Reveal>
            <div className="impact-report-grid">
              {impactReports.map((report) => (
                <a className="project-card report-card report-card--clickable impact-report-card" href={report.url} target="_blank" rel="noreferrer" key={report.url}>
                  <div className="report-card__media">
                    <PhotoFrame src={report.url} alt={report.label} ratio="4/5" fit="contain" style={{ background: "var(--secondary)" }} />
                  </div>
                  <div className="project-card__body">
                    <span className="pill">Impact Report</span>
                    <h3 className="h-sm mt-8">{report.label}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 10 }}>{report.reportTitle}</p>
                    <span className="link-arrow mt-24">Open Impact Report <ArrowRightIcon /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
