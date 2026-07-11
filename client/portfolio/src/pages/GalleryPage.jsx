import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { ImageIcon, VideoIcon, PlayIcon, CloseIcon } from "../components/Icons.jsx";
import { PHOTOS, GALLERY_WITH_CATEGORIES, GALLERY_CATEGORIES } from "../data/photos.js";

export default function GalleryPage() {
  const [tab, setTab] = useState("images");
  const [category, setCategory] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = category === "all"
    ? GALLERY_WITH_CATEGORIES
    : GALLERY_WITH_CATEGORIES.filter((g) => g.category === category);

  const closeLb = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") {
        const idx = filtered.findIndex((g) => g.src === lightbox);
        if (idx > 0) setLightbox(filtered[idx - 1].src);
      }
      if (e.key === "ArrowRight") {
        const idx = filtered.findIndex((g) => g.src === lightbox);
        if (idx < filtered.length - 1) setLightbox(filtered[idx + 1].src);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered, closeLb]);

  const currentIdx = filtered.findIndex((g) => g.src === lightbox);

  return (
    <>
      <section className="mosaic-hero">
        <div className="mosaic-hero__grid">
          <img className="mosaic-hero__grid-img1" src={PHOTOS.yercaudGroup} alt="" />
          <img className="mosaic-hero__grid-img2" src={PHOTOS.ramanathapuramThumbprint} alt="" />
          <img className="mosaic-hero__grid-img3" src={PHOTOS.heroGirlDog} alt="" />
          <img className="mosaic-hero__grid-img4" src={PHOTOS.yercaudDance} alt="" />
          <img className="mosaic-hero__grid-img5" src={PHOTOS.treePlantingReal} alt="" />
          <img className="mosaic-hero__grid-img6" src={PHOTOS.ramanathapuramSaplings} alt="" />
          <img className="mosaic-hero__grid-img7" src={PHOTOS.medicalConsultation} alt="" />
        </div>
        <div className="mosaic-hero__overlay" />
        <motion.div className="mosaic-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="mosaic-hero__eyebrow">Moments</span>
          <h1 className="mosaic-hero__title">Gallery</h1>
          <p className="mosaic-hero__sub">Faces, places and small victories from the field — photographed as they happened.</p>
        </motion.div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="text-center mb-32">
            <div className="tabbar">
              <button className={tab === "images" ? "active" : ""} onClick={() => setTab("images")}><ImageIcon style={{ width: 15, height: 15, marginRight: 6, verticalAlign: -3 }} />Images</button>
              <button className={tab === "videos" ? "active" : ""} onClick={() => setTab("videos")}><VideoIcon style={{ width: 15, height: 15, marginRight: 6, verticalAlign: -3 }} />Videos</button>
            </div>
          </Reveal>

          {tab === "images" ? (
            <Reveal as="fade" key="images">
              <div className="flex-center gap-8 mb-24" style={{ flexWrap: "wrap" }}>
                {GALLERY_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    className={`btn btn--sm ${category === c.id ? "btn--primary" : "btn--ghost"}`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="gallery-masonry">
                {filtered.map((g, i) => (
                  <div key={i} onClick={() => setLightbox(g.src)} style={{ cursor: "pointer" }}>
                    <PhotoFrame src={g.src} alt={g.caption} caption={g.caption} ratio={g.ratio} />
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal as="fade" key="videos">
              <div className="grid-3">
                {[
                  { src: "/videos/ramanathapuram-glimpses.mp4", title: "Environment Day Ramanathapuram", desc: "Highlights from the World Environment Day 2026 celebrations at Ramanathapuram." },
                  { src: "/videos/yercaud-climate-dance.mp4", title: "Environment Day Yercaud", desc: "Climate dance challenge with school children at Yercaud." },
                  { src: "/videos/medical-camp-avadi.mp4", title: "Medical Camp Avadi", desc: "Free medical check-up camp for migrant workers in Avadi, Chennai." },
                ].map((v, i) => (
                  <div className="project-card" key={i}>
                    <div className="photo-frame" style={{ aspectRatio: "16/9", borderRadius: 0, position: "relative", overflow: "hidden" }}>
                      <video src={v.src} controls playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div className="project-card__body">
                      <h4 className="h-sm">{v.title}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <div className={`lightbox ${lightbox ? "is-open" : ""}`} onClick={closeLb}>
        <button className="lightbox__close" onClick={closeLb}><CloseIcon /></button>
        {currentIdx > 0 && (
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLightbox(filtered[currentIdx - 1].src); }}>&lsaquo;</button>
        )}
        {currentIdx < filtered.length - 1 && (
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLightbox(filtered[currentIdx + 1].src); }}>&rsaquo;</button>
        )}
        {lightbox && <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />}
        {currentIdx >= 0 && <div className="lightbox__caption">{filtered[currentIdx]?.caption}</div>}
      </div>
    </>
  );
}
