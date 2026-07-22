import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import RootLine from "../components/RootLine.jsx";

const B = import.meta.env.BASE_URL;
import { PHOTOS } from "../data/photos.js";
import { EDUSPRO_CONTENT } from "../data/content.js";
import { GraduationCapIcon, DonateHeartIcon, TargetIcon, HeartHandsIcon, HeartIcon, UsersGroupIcon, SparkleIcon } from "../components/Icons.jsx";

const STEPS = [
  { title: "Identify", desc: "We identify vulnerable school-going children through schools, communities and field referrals.", icon: TargetIcon },
  { title: "Verify", desc: "Family background, education need and support gaps are reviewed before sponsorship is confirmed.", icon: HeartHandsIcon },
  { title: "Sponsor", desc: "Sponsor funds are mapped to school fees, books, uniforms, transport and learning essentials.", icon: UsersGroupIcon },
  { title: "Track", desc: "Progress updates are collected regularly so sponsors can see how their support is helping.", icon: SparkleIcon },
];

export default function EduSProPage() {
  return (
    <>
      <section className="diagonal-hero">
        <div className="diagonal-hero__inner">
          <div className="diagonal-hero__content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="diagonal-hero__eyebrow">Educational Sponsorship Programme</span>
              <h1 className="diagonal-hero__title">{EDUSPRO_CONTENT.title}</h1>
              <p className="diagonal-hero__sub">{EDUSPRO_CONTENT.subtitle}</p>
              <div className="diagonal-hero__ctas">
                <NavLink to="/donate" className="btn btn--primary">Sponsor a Child <DonateHeartIcon /></NavLink>
                <button className="btn btn--outline" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>How It Works</button>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="diagonal-hero__media"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={PHOTOS.aiHero2} alt="Students receiving educational support" />
          </motion.div>
        </div>
        <div className="diagonal-hero__stats">
          <div className="diagonal-hero__stats-inner">
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">{EDUSPRO_CONTENT.amount}</span><span className="diagonal-hero__stat-label">Raised Per Student</span></div>
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">School</span><span className="diagonal-hero__stat-label">Level Students</span></div>
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">Sponsors</span><span className="diagonal-hero__stat-label">Education Support</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <Reveal as="left">
            <PhotoFrame src={`${B}images/gallery-06-kids-play.jpg`} alt="Children playing together at an ERGON programme" ratio="1/1" blob />
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <div className="eyebrow">About The Programme</div>
            <h2 className="h-lg">Educational Support For Students In Difficult Situations</h2>
            <p className="lede mt-16">{EDUSPRO_CONTENT.subtitle}</p>
            <ul className="card-list mt-24">
              <li><HeartIcon /> Focused on the most vulnerable school-going children</li>
              <li><HeartIcon /> Education expenses reviewed before funds are committed</li>
              <li><HeartIcon /> Periodic progress updates from school and family touchpoints</li>
            </ul>
            <NavLink to="/donate" className="btn btn--primary mt-32">Sponsor A Child <DonateHeartIcon /></NavLink>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>How It Works</div>
            <h2 className="h-lg">From Verification To Continued Support</h2>
          </Reveal>
          <div className="mt-32"><RootLine labels={false} /></div>
          <Stagger className="grid-4 mt-16">
            {STEPS.map((s, i) => (
              <StaggerItem key={i}>
                <div className="card" style={{ textAlign: "center" }}>
                  <div className="icon-badge mx-auto"><s.icon /></div>
                  <h4 className="h-sm">{s.title}</h4>
                  <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", marginTop: 6 }}>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="scale">
            <div className="impact-band">
              <div className="impact-band__inner">
                <div className="impact-band__title">
                  <div className="eyebrow">The Target</div>
                  <h3 className="h-md" style={{ color: "white" }}>Raise {EDUSPRO_CONTENT.amount} ({EDUSPRO_CONTENT.amountLabel}) from sponsors for each student's education</h3>
                  <NavLink to="/donate" className="btn btn--gold btn--sm mt-16">Become A Sponsor <DonateHeartIcon /></NavLink>
                </div>
                <div className="impact-band__stats impact-band__stats--two">
                  <div className="impact-stat"><GraduationCapIcon /><div className="impact-stat__num">100,000/-</div><div className="impact-stat__label">Per Student Target</div></div>
                  <div className="impact-stat"><UsersGroupIcon /><div className="impact-stat__num">Sponsors</div><div className="impact-stat__label">Education Support</div></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
