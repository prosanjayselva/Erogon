import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { ImageIcon, VideoIcon, PlayIcon } from "../components/Icons.jsx";
import { GALLERY_PHOTOS } from "../data/photos.js";

export default function GalleryPage() {
  const [tab, setTab] = useState("images");

  return (
    <>
      <PageHero crumb="Gallery" eyebrow="Moments" title="Gallery" sub="Faces, places and small victories from the field — photographed as they happened." />

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center mb-32">
            <div className="tabbar mx-auto" style={{ display: "flex" }}>
              <button className={tab === "images" ? "active" : ""} onClick={() => setTab("images")}><ImageIcon style={{ width: 15, height: 15, marginRight: 6, verticalAlign: -3 }} />Images</button>
              <button className={tab === "videos" ? "active" : ""} onClick={() => setTab("videos")}><VideoIcon style={{ width: 15, height: 15, marginRight: 6, verticalAlign: -3 }} />Videos</button>
            </div>
          </Reveal>

          {tab === "images" ? (
            <Reveal as="fade" key="images">
              <div className="gallery-masonry">
                {GALLERY_PHOTOS.map((g, i) => (
                  <PhotoFrame key={i} src={g.src} alt={g.caption} caption={g.caption} ratio={g.ratio} />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal as="fade" key="videos">
              <div className="grid-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div className="project-card" key={i}>
                    <div className="photo-frame" style={{ aspectRatio: "16/9", borderRadius: 0, position: "relative" }}>
                      <div className="pf-mark"><VideoIcon /></div>
                      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(251,248,241,0.92)", display: "grid", placeItems: "center", color: "var(--forest-800)" }}>
                          <PlayIcon style={{ width: 22, height: 22 }} />
                        </div>
                      </div>
                    </div>
                    <div className="project-card__body">
                      <h4 className="h-sm" style={{ fontSize: "1rem" }}>Field Story #{i + 1}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
