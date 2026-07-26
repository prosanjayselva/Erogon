import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon, LeafIcon, HeartHandsIcon, PawIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { PHOTOS } from "../data/photos.js";

const PROJECTS = [
  {
    title: "Tree Plantation Drive",
    location: "Ramanathapuram & Yercaud, Tamil Nadu",
    desc: "Tree plantation and coastal care drives across Ramanathapuram and Yercaud as part of World Environment Day 2026.",
    photo: PHOTOS.ramanathapuramSaplings,
    icon: LeafIcon,
  },
  {
    title: "Beach Clean-Up Drive",
    location: "Ramanathapuram, Tamil Nadu",
    desc: "Seashore cleaning and environmental awareness activity carried out along the Ramanathapuram coast.",
    photo: PHOTOS.ramanathapuramBeachClean,
    icon: LeafIcon,
  },
  {
    title: "Free Medical Camp",
    location: "Avadi, Chennai",
    desc: "A free medical camp providing health support and care for migrant workers in Avadi, Chennai.",
    photo: PHOTOS.medicalCampGroup,
    icon: HeartHandsIcon,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="bg-hero__bg">
          <img src={PHOTOS.projectBeachCleanup} alt="ERGON Foundation projects" />
        </div>
        <div className="bg-hero__overlay" />
        <div className="bg-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="bg-hero__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>Projects</span>
            </div>
            <span className="bg-hero__eyebrow">What We Do</span>
            <h1 className="bg-hero__title">Our Projects</h1>
            <p className="bg-hero__desc">Verified field programmes run by ERGON Foundation across Tamil Nadu — tree plantation, beach clean-ups, medical camps and more.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stagger className="grid-3">
            {PROJECTS.map((p, i) => (
              <StaggerItem key={i}>
                <div className="project-card">
                  <div className="photo-frame" style={{ aspectRatio: "16/10", borderRadius: 0, overflow: "hidden", position: "relative" }}>
                    <img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="project-card__body">
                    <div className="flex gap-8" style={{ alignItems: "center", marginBottom: 8 }}>
                      <div className="icon-badge" style={{ width: 36, height: 36, marginBottom: 0 }}><p.icon /></div>
                      <span className="pill">{p.location}</span>
                    </div>
                    <h3 className="h-sm">{p.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 8 }}>{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
