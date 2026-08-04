import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import {
  PeopleIcon, PawIcon, LeafIcon, HeartHandsIcon, GraduationCapIcon,
  UsersGroupIcon, ArrowRightIcon, PlayIcon,
  DonateHeartIcon, VolunteerIcon,
} from "../components/Icons.jsx";
import { HOME_BANNER, STATS, TESTIMONIALS, PARTNERS, DONORS } from "../data/content.js";
import { PHOTOS } from "../data/photos.js";
import { BrandText } from "../components/BrandName.jsx";

const IMPACT_STATS = [
  { icon: HeartHandsIcon, num: 373, label: "Lives Impacted", suffix: "" },
  { icon: HeartHandsIcon, num: 1, label: "Free Medical Camp", suffix: "" },
  { icon: GraduationCapIcon, num: 3, label: "Education Support", suffix: "" },
  { icon: UsersGroupIcon, num: 160, label: "Meals Served", suffix: "" },
  { icon: LeafIcon, num: 41, label: "Trees Planted", suffix: "" },
  { icon: UsersGroupIcon, num: 0, label: "Placement Support", suffix: "" },
  { icon: PeopleIcon, num: 0, label: "Women Empowered", suffix: "" },
  { icon: GraduationCapIcon, num: 0, label: "Youth Skilled", suffix: "" },
  { icon: PawIcon, num: 0, label: "Animals Rescued & Care", suffix: "" },
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

function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function HomePage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const openStory = () => setStoryOpen(true);

  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="page-hero-split page-hero-split--home">
        <div className="page-hero-split__inner">
          <div className="page-hero-split__content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="home-hero__tag"><span className="dot" /> Registered Charitable Trust · Tamil Nadu</div>
            </motion.div>

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
              <NavLink to="/donate#payment-details" className="btn btn--primary">Donate Now <DonateHeartIcon /></NavLink>
              <NavLink to="/about" className="btn btn--outline">Explore Our Work <ArrowRightIcon /></NavLink>
              <button type="button" className="btn btn--ghost" onClick={openStory}>Live Impact Image <PlayIcon /></button>
            </motion.div>
          </div>

          <motion.div
            className="page-hero-split__media"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={PHOTOS.ramanathapuramGroup} alt="ERGON Foundation field activity" />
            <div className="page-hero-split__media-overlay" />
          </motion.div>
        </div>

        <div className="hero-stats-bar">
          <div className="container">
            <div className="hero-stats-bar__grid">
              {IMPACT_STATS.map((s, i) => (
                <div key={i} className="hero-stats-bar__item">
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

      {/* ============================ STORIES ============================ */}
      <section className="section" hidden>
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Stories of Hope</div>
            <h2 className="h-lg">Voices From The <span className="text-gold">Ground</span></h2>
          </Reveal>

          <Stagger className="grid-3 mt-48">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={i}>
                <div className="card testi-card">
                  <div className="testi-avatar"><HeartHandsIcon /></div>
                  <div className="testi-body">
                    <p>"<BrandText>{t.quote}</BrandText>"</p>
                    <cite>— {t.name}, {t.role}</cite>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ PARTNERS ============================ */}
      <section className="section section--sm" hidden>
        <div className="container">
          <Reveal as="up" className="text-center mb-24">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Partners</div>
          </Reveal>
          <Reveal as="fade" delay={0.1}>
            <div className="partner-row">
              {[...PARTNERS, ...DONORS].map((p, i) => (
                <span className="partner-item" key={i}>{p.name}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

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
                  <NavLink to="/donate#payment-details" className="btn btn--gold btn--lg">Donate Today <DonateHeartIcon /></NavLink>
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
