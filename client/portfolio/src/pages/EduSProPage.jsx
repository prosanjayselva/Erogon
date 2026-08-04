import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { DonateHeartIcon } from "../components/Icons.jsx";
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
            <h1 className="bg-hero__title">{EDUSPRO_CONTENT.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <Reveal as="up">
            <div className="eyebrow" style={{ justifyContent: "center" }}>About EduSpro</div>
            <h2 className="h-lg">Educational Support For Students In Difficult Situations</h2>
            <p className="lede mx-auto mt-24" style={{ fontSize: "1.1rem", maxWidth: 700 }}>
              {EDUSPRO_CONTENT.subtitle}
            </p>
            <NavLink to="/donate#payment-details" className="btn btn--primary mt-32">Sponsor A Child <DonateHeartIcon /></NavLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
