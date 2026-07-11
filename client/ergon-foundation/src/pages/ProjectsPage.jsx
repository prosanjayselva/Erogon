import { useState } from "react";
import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { GraduationCapIcon, PawIcon, LeafIcon, PinIcon, DonateHeartIcon } from "../components/Icons.jsx";
import { PROJECTS } from "../data/content.js";

const FILTERS = ["All", "People", "Pets", "Planet"];
// Category + icon per project, aligned to PROJECTS order: Tree, Beach Cleanup, Medical Camp, Animal Rescue
const CATEGORY = ["Planet", "Planet", "People", "Pets"];
const ICONS = [LeafIcon, LeafIcon, GraduationCapIcon, PawIcon];

function money(n) { return "₹" + n.toLocaleString("en-IN"); }

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const items = PROJECTS.map((p, i) => ({ ...p, cat: CATEGORY[i], icon: ICONS[i] }));
  const shown = filter === "All" ? items : items.filter((p) => p.cat === filter);

  return (
    <>
      <PageHero crumb="Projects" eyebrow="Ongoing & Completed" title="Projects Growing Across Tamil Nadu" sub="From sapling drives to shoreline clean-ups to free medical camps — every project here is a root ERGON is actively tending." />

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center mb-24">
            <div className="tabbar mx-auto" style={{ display: "flex" }}>
              {FILTERS.map((f) => (
                <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </Reveal>

          <Stagger className="grid-4 mt-32" key={filter}>
            {shown.map((p) => {
              const pct = Math.round((p.raised / p.goal) * 100);
              return (
                <StaggerItem key={p.title}>
                  <div className="project-card">
                    <PhotoFrame src={p.photo ? PHOTOS[p.photo] : undefined} alt={p.title} icon={p.icon} tone={p.tone} ratio="4/3" caption={p.photo ? undefined : p.cat} />
                    <div className="project-card__body">
                      <span className="pill">{p.cat}</span>
                      <h4 className="h-sm mt-8">{p.title}</h4>
                      <div className="project-card__loc"><PinIcon /> {p.loc}</div>
                      <div className="progress"><div className="progress__bar" style={{ width: pct + "%" }} /></div>
                      <div className="progress__meta"><span><b>{money(p.raised)}</b> raised of {money(p.goal)}</span><span>{pct}%</span></div>
                      <NavLink to="/donate" className="btn btn--ghost btn--sm btn--block mt-16">Support Project <DonateHeartIcon /></NavLink>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
