import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { PeopleIcon, PawIcon, LeafIcon, HeartIcon, ChevronRightIcon, ArrowRightIcon, DonateHeartIcon } from "../components/Icons.jsx";
import { PILLARS } from "../data/content.js";

const PILLAR_ICON = { people: PeopleIcon, pets: PawIcon, planet: LeafIcon };
const PILLAR_TONE = { people: "", pets: "photo-frame--sage", planet: "photo-frame--gold" };
const PILLAR_PHOTO = { people: PHOTOS.medicalConsultation, pets: PHOTOS.heroGirlDog, planet: PHOTOS.ramanathapuramTree1 };

export default function CausesPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="bg-hero__bg">
          <img src={PHOTOS.aiCausesBg} alt="Community care and compassion" />
        </div>
        <div className="bg-hero__overlay" />
        <div className="bg-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="bg-hero__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>Our Causes</span>
            </div>
            <span className="bg-hero__eyebrow">What We Stand For</span>
            <h1 className="bg-hero__title">Causes We Are Rooted In</h1>
            <p className="bg-hero__desc">Every ERGON programme grows from one of three roots — People, Pets and Planet — each tended with the same care.</p>
            <div className="hero__cta" style={{ justifyContent: "center", marginTop: "2rem" }}>
              <NavLink to="/donate" className="btn btn--primary">Support a Cause <DonateHeartIcon /></NavLink>
              <NavLink to="/get-involved" className="btn btn--outline">Get Involved</NavLink>
            </div>
          </motion.div>
        </div>
        <div className="bg-hero__scroll">
          <span>Scroll</span>
          <div className="bg-hero__scroll-line" />
        </div>
      </section>

      {PILLARS.map((p, i) => {
        const Icon = PILLAR_ICON[p.key];
        const reverse = i % 2 === 1;
        return (
          <section className={`section ${i % 2 === 0 ? "" : ""}`} style={{ background: i % 2 === 0 ? "var(--background)" : "var(--secondary)" }} key={p.key}>
            <div className="container grid-2">
              <Reveal as={reverse ? "right" : "left"} style={{ order: reverse ? 2 : 1 }}>
                <PhotoFrame src={PILLAR_PHOTO[p.key]} alt={p.title} icon={Icon} tone={PILLAR_TONE[p.key]} caption={p.title} ratio="4/3.2" blob={i === 1} />
              </Reveal>
              <Reveal as={reverse ? "left" : "right"} delay={0.1} style={{ order: reverse ? 1 : 2 }}>
                <div className="eyebrow">{`0${i + 1} · Our Causes`}</div>
                <h2 className="h-lg">{p.title}</h2>
                <p className="lede mt-16">{p.desc}</p>
                <ul className="card-list mt-24">
                  {p.points.map((pt, idx) => (
                    <li key={idx}><HeartIcon /> {pt}</li>
                  ))}
                </ul>
                <NavLink to="/donate" className="btn btn--primary mt-32">Support {p.title} <DonateHeartIcon /></NavLink>
              </Reveal>
            </div>
            {i < PILLARS.length - 1 && (
              <div className="container mt-48"><RootLine compact labels={false} /></div>
            )}
          </section>
        );
      })}

      <section className="section">
        <div className="container">
          <Reveal as="scale">
            <div className="cta-banner">
              <div className="cta-banner__inner">
                <div className="eyebrow" style={{ color: "var(--gold-light)", justifyContent: "center" }}>Get Involved</div>
                <h2 className="h-lg">Pick A Cause Close To Your Heart</h2>
                <p>Whichever root you choose to water, the tree grows stronger for everyone.</p>
                <div className="hero__cta">
                  <NavLink to="/donate" className="btn btn--gold">Donate Now <DonateHeartIcon /></NavLink>
                  <NavLink to="/projects" className="btn btn--white">See Our Projects <ArrowRightIcon /></NavLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
