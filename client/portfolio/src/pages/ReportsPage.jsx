import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { DocReceiptIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { REPORTS } from "../data/content.js";

export default function ReportsPage() {
  const defaultReport = REPORTS.find((report) => report.primaryUrl);
  const availableReports = REPORTS.filter((report) => report.primaryUrl);
  const [selectedReportId, setSelectedReportId] = useState(defaultReport?.id ?? REPORTS[0]?.id);
  const viewerRef = useRef(null);
  const selectedReport = REPORTS.find((report) => report.id === selectedReportId) ?? defaultReport;
  const activeFile = selectedReport?.files?.[0] ?? null;

  const scrollToViewer = () => {
    window.requestAnimationFrame(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const selectReport = (report) => {
    if (!report.primaryUrl) {
      setSelectedReportId(report.id);
      scrollToViewer();
      return;
    }
    setSelectedReportId(report.id);
    scrollToViewer();
  };

  return (
    <>
      <section className="glass-hero">
        <div className="glass-hero__inner">
          <motion.div className="glass-hero__content" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="glass-hero__eyebrow">Reports</span>
            <h1 className="glass-hero__title">Activity Report & Annual Report</h1>
            <p className="glass-hero__sub">
              Activity Report and Annual Report records from ERGON Foundation programmes.
              Select a report row to preview the document inside the website.
            </p>
          </motion.div>

          <motion.div className="glass-hero__cards report-picker" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {availableReports.map((report) => (
              <button
                type="button"
                onClick={() => selectReport(report)}
                className={`glass-hero__card report-link-card ${selectedReport?.id === report.id ? "is-active" : ""}`}
                key={report.id}
              >
                <span className="pill">{report.category}</span>
                <h4>{report.title}</h4>
                <p>{report.desc}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="mb-24">
            <div className="eyebrow">Reports Library</div>
            <h2 className="h-lg">Available Reports</h2>
          </Reveal>

          <Stagger className="report-list">
            {availableReports.map((report) => (
              <StaggerItem key={report.id}>
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
              </StaggerItem>
            ))}
          </Stagger>

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
        </div>
      </section>
    </>
  );
}
