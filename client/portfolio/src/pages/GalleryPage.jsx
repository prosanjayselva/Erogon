import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { CloseIcon } from "../components/Icons.jsx";
import api from "../api/client.js";
import { PHOTOS, GALLERY_WITH_CATEGORIES, GALLERY_CATEGORIES, VIDEOS } from "../data/photos.js";
import { BrandText } from "../components/BrandName.jsx";

const activityDetails = {
  people: { date: "2026-05-15" },
  pets: { date: "2026-06-01" },
  planet: { date: "2026-06-05" },
};
const formatDate = (date) => new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function GalleryPage() {
  const [category, setCategory] = useState("people");
  const [mediaType, setMediaType] = useState("Photos");
  const [remoteMedia, setRemoteMedia] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let active = true;
    api.get("/gallery-media").then(({ data }) => {
      if (active) setRemoteMedia(data.data || []);
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  const media = useMemo(() => {
    const staticImages = GALLERY_WITH_CATEGORIES.map((item, index) => ({ ...item, id: `image-${index}`, type: "IMAGE", activityName: item.subcategory, activityDate: activityDetails[item.category].date }));
    const staticVideos = VIDEOS.map((item, index) => ({ ...item, id: `video-${index}`, type: "VIDEO", caption: item.desc, activityName: item.subcategory, activityDate: activityDetails[item.category].date }));
    const uploaded = remoteMedia.map((item) => ({ id: `uploaded-${item.mediaType}-${item.id}`, src: `/uploads/${item.media}`, caption: item.caption || item.activityName, category: item.category.toLowerCase(), type: item.mediaType, activityName: item.activityName, activityDate: item.activityDate.slice(0, 10), ratio: item.mediaType === "IMAGE" ? "4/3" : "16/9" }));
    return [...uploaded, ...staticImages, ...staticVideos].filter(
      (item) =>
        item.category === category &&
        (mediaType === "Photos" ? item.type === "IMAGE" : item.type === "VIDEO")
    );
  }, [category, mediaType, remoteMedia]);

  const groups = useMemo(() => {
    const label = GALLERY_CATEGORIES.find((c) => c.id === category)?.label || category;
    const group = { name: label, date: null, items: [] };
    media.forEach((item) => {
      group.items.push(item);
      if (!group.date || item.activityDate < group.date) group.date = item.activityDate;
    });
    return [group];
  }, [media, category]);
  const images = media.filter((item) => item.type === "IMAGE");
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const currentIndex = images.findIndex((item) => item.src === lightbox);

  useEffect(() => {
    const onKey = (event) => {
      if (!lightbox) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && currentIndex > 0) setLightbox(images[currentIndex - 1].src);
      if (event.key === "ArrowRight" && currentIndex < images.length - 1) setLightbox(images[currentIndex + 1].src);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, currentIndex, images, closeLightbox]);

  const selectCategory = (id) => { setCategory(id); };

  const MEDIA_TYPES = ["Photos", "Videos"];

  return <>
    <section className="mosaic-hero"><div className="mosaic-hero__grid"><img className="mosaic-hero__grid-img1" src={PHOTOS.ramanathapuramBeachClean} alt="" /><img className="mosaic-hero__grid-img2" src={PHOTOS.medicalCampGroup} alt="" /><img className="mosaic-hero__grid-img3" src={PHOTOS.yercaudPledge} alt="" /><img className="mosaic-hero__grid-img4" src={PHOTOS.ramanathapuramSaplings} alt="" /><img className="mosaic-hero__grid-img5" src={PHOTOS.heroGirlDog} alt="" /><img className="mosaic-hero__grid-img6" src={PHOTOS.ramanathapuramGroup} alt="" /><img className="mosaic-hero__grid-img7" src={PHOTOS.medicalConsultation} alt="" /></div><div className="mosaic-hero__overlay" /><motion.div className="mosaic-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><h1 className="mosaic-hero__title">Gallery</h1></motion.div></section>
    <section className="section"><div className="container">
      <Reveal as="fade"><div className="gallery-filters">
        <div className="gallery-type-filter">{MEDIA_TYPES.map((type) => <button key={type} className={`gallery-type-btn ${mediaType === type ? "is-active" : ""}`} onClick={() => setMediaType(type)}>{type}</button>)}</div>
        <div className="gallery-category-filter">{GALLERY_CATEGORIES.map((item) => <button key={item.id} className={`gallery-chip ${category === item.id ? "is-active" : ""}`} onClick={() => selectCategory(item.id)}>{item.label}</button>)}</div>
      </div>
      <div className="gallery-activity-list">{groups.map((group) => {
        const activityImages = group.items.filter((item) => item.type === "IMAGE");
        const activityVideos = group.items.filter((item) => item.type === "VIDEO");
        if (!activityImages.length && !activityVideos.length) return null;
        return <section className="gallery-activity" key={`${group.name}-${group.date}`}>
          <div className="gallery-activity-head"><div><div className="eyebrow">{formatDate(group.date)}</div><h2 className="h-md">{group.name}</h2></div><span className="gallery-media-count">{group.items.length} {group.items.length === 1 ? "item" : "items"}</span></div>
          {activityImages.length > 0 && <div className="gallery-media-grid gallery-image-grid">{activityImages.map((item) => <div key={item.id} onClick={() => setLightbox(item.src)} className="gallery-image"><PhotoFrame src={item.src} alt={item.caption} caption={<BrandText>{item.caption}</BrandText>} ratio="4/3" /></div>)}</div>}
          {activityVideos.length > 0 && <div className="gallery-media-grid gallery-video-grid">{activityVideos.map((item) => <article className="project-card" key={item.id}><div className="photo-frame gallery-video"><video src={item.src} controls playsInline preload="metadata" /></div>{item.caption && <div className="project-card__body"><p>{item.caption}</p></div>}</article>)}</div>}
        </section>;
      })}</div>
      {!groups.length && <p className="empty-state text-center">No gallery media has been added under this category yet.</p>}</Reveal>
    </div></section>
    <div className={`lightbox ${lightbox ? "is-open" : ""}`} onClick={closeLightbox}><button className="lightbox__close" onClick={closeLightbox}><CloseIcon /></button>{currentIndex > 0 && <button className="lightbox__nav lightbox__nav--prev" onClick={(event) => { event.stopPropagation(); setLightbox(images[currentIndex - 1].src); }}>&lsaquo;</button>}{currentIndex < images.length - 1 && <button className="lightbox__nav lightbox__nav--next" onClick={(event) => { event.stopPropagation(); setLightbox(images[currentIndex + 1].src); }}>&rsaquo;</button>}{lightbox && <img src={lightbox} alt="" onClick={(event) => event.stopPropagation()} />}{currentIndex >= 0 && <div className="lightbox__caption"><BrandText>{images[currentIndex]?.caption}</BrandText></div>}</div>
  </>;
}
