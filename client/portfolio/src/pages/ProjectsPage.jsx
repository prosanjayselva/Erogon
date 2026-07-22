import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { GraduationCapIcon, PawIcon, LeafIcon, PinIcon, DonateHeartIcon } from "../components/Icons.jsx";
import { PROJECTS } from "../data/content.js";

const FILTERS = ["All", "Environment", "Healthcare", "Community"];
const CATEGORY = ["Environment", "Environment", "Healthcare", "Community"];
const ICONS = [LeafIcon, LeafIcon, GraduationCapIcon, PawIcon];

function money(n) {
  return "Rs. " + n.toLocaleString("en-IN");
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const items = PROJECTS.map((p, i) => ({ ...p, cat: CATEGORY[i], icon: ICONS[i] }));
  const shown = filter === "All" ? items : items.filter((p) => p.cat === filter);

  return (
    <>
      <section className="bento-hero">
        <div className="bento-hero__inner">
          <motion.div
            className="bento-hero__featured"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img src={PHOTOS.ramanathapuramGroup} alt="ERGON Foundation project field work" />
            <div className="bento-hero__featured-overlay">
              <span className="pill">Projects</span>
              <h2>Projects Growing Across Tamil Nadu</h2>
              <p>From sapling drives to shoreline clean-ups to free medical camps.</p>
              <NavLink to="/donate" className="btn btn--gold btn--sm mt-16" style={{ alignSelf: "flex-start" }}>
                Support a Project <DonateHeartIcon />
              </NavLink>
            </div>
          </motion.div>

          <motion.div
            className="bento-hero__card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="pill">Ongoing & Completed</span>
            <h3 style={{ marginTop: 8 }}>10 Active Projects</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.72)", marginTop: 4 }}>Each project is a root ERGON is actively tending.</p>
          </motion.div>

          <motion.div
            className="bento-hero__card bento-hero__card--funds"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="pill">Donor Support</span>
            <h3>Rs. 50L+</h3>
            <p>Funds raised for education, welfare, environment and healthcare programmes.</p>
          </motion.div>

          <div className="bento-hero__stat-row">
            <motion.div className="bento-hero__stat-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <b>10</b>
              <span>Active Projects</span>
            </motion.div>
            <motion.div className="bento-hero__stat-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
              <b>5,000+</b>
              <span>Volunteers Engaged</span>
            </motion.div>
            <motion.div className="bento-hero__stat-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <b>Rs. 50L+</b>
              <span>Funds Raised</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="text-center mb-24">
            <div className="tabbar">
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
                      <NavLink to="/donate" className="btn btn--ghost btn--sm btn--block mt-16">Support <DonateHeartIcon /></NavLink>
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
