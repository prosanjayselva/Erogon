import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { ChevronRightIcon, DonateHeartIcon } from "../components/Icons.jsx";
import { EDUSPRO_CONTENT } from "../data/content.js";

const B = import.meta.env.BASE_URL;

export default function EduSProPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="bg-hero__bg">
          <img src={`${B}images/gallery-06-kids-play.jpg`} alt="Students receiving educational support" />
        </div>
        <div className="bg-hero__overlay" />
        <div className="bg-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="bg-hero__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>EduSPro</span>
            </div>
            <span className="bg-hero__eyebrow">Educational Sponsorship Programme</span>
            <h1 className="bg-hero__title">{EDUSPRO_CONTENT.title}</h1>
            <p className="bg-hero__desc">{EDUSPRO_CONTENT.subtitle}</p>
            <div className="hero__cta" style={{ justifyContent: "center", marginTop: "2rem" }}>
              <NavLink to="/donate" className="btn btn--primary">Sponsor a Child <DonateHeartIcon /></NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <Reveal as="up">
            <div className="eyebrow" style={{ justifyContent: "center" }}>About EduSPro</div>
            <h2 className="h-lg">Educational Support For Students In Difficult Situations</h2>
            <p className="lede mx-auto mt-24" style={{ fontSize: "1.1rem", maxWidth: 700 }}>
              {EDUSPRO_CONTENT.subtitle}
            </p>
            <NavLink to="/donate" className="btn btn--primary mt-32">Sponsor A Child <DonateHeartIcon /></NavLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
