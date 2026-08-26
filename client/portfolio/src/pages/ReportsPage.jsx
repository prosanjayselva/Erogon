import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { REPORTS } from "../data/content.js";
import { DocReceiptIcon, ImageIcon, ArrowRightIcon } from "../components/Icons.jsx";

const CATEGORIES = [
  { id: "Activity Report", icon: DocReceiptIcon, desc: "Field reports from our People, Pets and Planet initiatives." },
  { id: "Impact Report", icon: ImageIcon, desc: "Pictorial impact reports from our completed initiatives." },
];
const isImageFile = (url = "") => /\.(avif|bmp|gif|jpe?g|png|webp)$/i.test(url);

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetch("/api/v1/reports").then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload) => setReports(payload.data ?? [])).catch(() => setReports([])).finally(() => setLoading(false));
  }, []);

  const legacyActivity = useMemo(() => REPORTS.filter((report) => report.category === "Activity Report" && report.primaryUrl).map((report) => ({
    id: `legacy-${report.id}`, title: report.title, description: report.desc, url: report.primaryUrl, imageUrl: PHOTOS[report.image], label: "Activity Report",
  })), []);
  const legacyImpact = useMemo(() => REPORTS.flatMap((report) => (report.files ?? []).filter((file) => file.type === "Image").map((file) => ({
    id: `legacy-impact-${file.url}`, title: file.label, description: report.title, url: file.url, imageUrl: file.url, label: "Visual Impact Data",
  }))), []);
  const uploaded = reports.map((report) => ({
    id: `uploaded-${report.id}`, title: report.title, description: report.description, url: `/uploads/${report.file}`,
    imageUrl: isImageFile(report.file) ? `/uploads/${report.file}` : null,
    label: report.category === "IMPACT_REPORT" ? "Visual Impact Data" : "Activity Report", category: report.category,
  }));
  const isImpact = selectedCategory === "Impact Report";
  const displayedReports = isImpact ? [...uploaded.filter((report) => report.category === "IMPACT_REPORT"), ...legacyImpact] : [...uploaded.filter((report) => report.category === "ACTIVITY_REPORT"), ...legacyActivity];
  const pageSize = 3;
  const totalSlides = Math.max(1, Math.ceil(displayedReports.length / pageSize));
  const visibleReports = displayedReports.slice(slide * pageSize, (slide + 1) * pageSize);
  const chooseCategory = (category) => { setSelectedCategory(category); setSlide(0); };

  const renderResults = () => {
    if (displayedReports.length === 0) return <div className="report-coming-soon-panel"><span className="report-coming-soon-panel__icon"><DocReceiptIcon /></span><span className="pill">{selectedCategory}</span><h3 className="h-md">Coming Soon</h3><p>The {selectedCategory.toLowerCase()} is being prepared and will be published here as soon as it is available.</p></div>;
    return <>
      <div className="reports-results__head"><div><div className="eyebrow" style={{ color: "var(--gold)" }}>{isImpact ? "Pictorial Reports" : "Published Documents"}</div><h2 className="reports-results__title">{selectedCategory}</h2></div><span className="pill">{displayedReports.length} {displayedReports.length === 1 ? "report" : "reports"} available</span></div>
      <div className="report-slider-controls" aria-label="Report navigation"><button type="button" onClick={() => setSlide((current) => Math.max(0, current - 1))} disabled={slide === 0}>← Previous</button><span>{slide + 1} / {totalSlides}</span><button type="button" onClick={() => setSlide((current) => Math.min(totalSlides - 1, current + 1))} disabled={slide === totalSlides - 1}>Next →</button></div>
      <div className={`report-list report-slider ${isImpact ? "impact-report-grid" : ""}`} key={`${selectedCategory}-${slide}`}>
        {visibleReports.map((report) => <a className={`project-card report-card report-card--clickable ${isImpact ? "impact-report-card" : ""}`} href={report.url} target="_blank" rel="noreferrer" key={report.id}>
          <div className="report-card__media">{report.imageUrl ? <PhotoFrame src={report.imageUrl} alt={report.title} ratio="4/5" fit="contain" style={{ background: "var(--secondary)" }} /> : <span className="report-coming-soon-panel__icon"><DocReceiptIcon /></span>}</div>
          <div className="project-card__body"><span className="pill">{report.label}</span><h3 className="h-sm mt-8">{report.title}</h3>{report.description && <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 10 }}>{report.description}</p>}<span className="link-arrow mt-24">{isImpact ? "View Impact Report" : "Read Full Report"} <ArrowRightIcon /></span></div>
        </a>)}
      </div>
    </>;
  };

  return <section className="reports-hero"><div className="reports-hero__inner">
    <motion.div className="reports-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold)" }}>Transparency &amp; Impact</div><h1 className="reports-hero__title">Reports &amp; Impact</h1><p className="reports-hero__sub">Browse the published reports of ERGON Foundation — choose a category to get started.</p></motion.div>
    <div className="reports-hero__pickers">{CATEGORIES.map((category, i) => <motion.button type="button" key={category.id} onClick={() => chooseCategory(category.id)} className={`reports-picker ${selectedCategory === category.id ? "is-active" : ""}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}><span className="reports-picker__icon"><category.icon /></span><span className="reports-picker__label">{category.id}</span><span className="reports-picker__desc">{category.desc}</span></motion.button>)}</div>
    {selectedCategory && <motion.div className="reports-results" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}><Reveal as="fade">{loading ? <p className="reports-empty">Loading reports…</p> : renderResults()}</Reveal></motion.div>}
  </div></section>;
}
