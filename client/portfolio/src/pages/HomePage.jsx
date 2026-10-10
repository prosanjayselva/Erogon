import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import {
  PeopleIcon, PawIcon, LeafIcon, HeartHandsIcon, GraduationCapIcon,
  UsersGroupIcon, ArrowRightIcon, PlayIcon,
  DonateHeartIcon, VolunteerIcon,
} from "../components/Icons.jsx";
import { HOME_BANNER } from "../data/content.js";
import { PHOTOS } from "../data/photos.js";
import { BrandText } from "../components/BrandName.jsx";

const IMPACT_STATS = [
  { key: "lives-impacted", icon: HeartHandsIcon, num: 373, label: "Lives Impacted" },
  { key: "free-medical-camp", icon: HeartHandsIcon, num: 1, label: "Free Medical Camp" },
  { key: "education-support", icon: GraduationCapIcon, num: 3, label: "Education Support" },
  { key: "meals-served", icon: UsersGroupIcon, num: 160, label: "Meals Served" },
  { key: "trees-planted", icon: LeafIcon, num: 41, label: "Trees Planted" },
  { key: "placement-support", icon: UsersGroupIcon, num: 0, label: "Placement Support" },
  { key: "women-empowered", icon: PeopleIcon, num: 0, label: "Women Empowered" },
  { key: "youth-skilled", icon: GraduationCapIcon, num: 0, label: "Youth Skilled" },
  { key: "animals-rescued", icon: PawIcon, num: 0, label: "Animals Rescued & Care" },
];

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf;
    const startTime = performance.now();
    const duration = 2000;

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(update);
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      <span>{display.toLocaleString("en-IN")}</span>{suffix}
    </span>
  );
}

const wordReveal = {
  hidden: { opacity: 0, y: 50, rotateX: -60 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function WordReveal({ text, style = {} }) {
  const words = text.split(" ");
  return (
    <h1 style={{ display: "flex", flexWrap: "wrap", gap: "0.15em", ...style }} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "inline-block", perspective: 600 }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

export default function HomePage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const openStory = () => setStoryOpen(true);
  const [stats, setStats] = useState(IMPACT_STATS);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/home-stats', { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(({ data }) => {
        const values = new Map(data.map(({ key, value }) => [key, value]));
        setStats(IMPACT_STATS.map((stat) => ({ ...stat, num: values.get(stat.key) ?? stat.num })));
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setStoryOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="page-hero-split page-hero-split--home">
        <div className="page-hero-split__inner">
          <div className="page-hero-split__content">
            <motion.p
              className="home-hero__lede"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandText>{HOME_BANNER}</BrandText>
            </motion.p>

            <motion.div
              className="page-hero-split__ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <NavLink to="/about" className="btn btn--outline">Explore Our Work <ArrowRightIcon /></NavLink>
              <button type="button" className="btn btn--ghost" onClick={openStory}>Live Impact Image <PlayIcon /></button>
            </motion.div>
          </div>

        </div>

        <div className="hero-stats-bar">
          <div className="container">
            <div className="hero-stats-bar__grid">
              {stats.map((s) => (
                <div key={s.key} className="hero-stats-bar__item">
                  <span className="hero-stats-bar__num">
                    <AnimatedCounter value={s.num} suffix={s.suffix} />
                  </span>
                  <span className="hero-stats-bar__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {storyOpen && (
        <motion.div
          className="story-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="ERGON live impact story"
          onClick={() => setStoryOpen(false)}
        >
          <motion.div
            className="story-modal__panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="story-modal__close" type="button" aria-label="Close story popup" onClick={() => setStoryOpen(false)}>x</button>
            <img src={PHOTOS.logo} alt="ERGON Foundation logo" />
          </motion.div>
        </motion.div>
      )}

      {/* ============================ CTA ============================ */}
      <section className="section">
        <div className="container">
          <Reveal as="scale">
            <motion.div
              className="cta-banner"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(212,175,55,0.08)",
                  "0 0 50px rgba(212,175,55,0.18)",
                  "0 0 30px rgba(212,175,55,0.08)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="cta-banner__inner">
                <div className="eyebrow" style={{ color: "var(--gold-light)", justifyContent: "center" }}>Make A Difference</div>
                <h2 className="h-lg">One Small Donation Can Change A Life.</h2>
                <p>Whether you give an hour or a rupee, it becomes part of something rooted, lasting and shared.</p>
                <div className="hero__cta">
                  <NavLink to="/donate" className="btn btn--gold btn--lg">Donate Today <DonateHeartIcon /></NavLink>
                  <NavLink to="/get-involved" className="btn btn--white">Become a Volunteer <VolunteerIcon /></NavLink>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
