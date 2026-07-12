import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import RootLine from "../components/RootLine.jsx";

const B = import.meta.env.BASE_URL;
import { PHOTOS } from "../data/photos.js";
import { GraduationCapIcon, DonateHeartIcon, TargetIcon, HeartHandsIcon, HeartIcon, UsersGroupIcon, SparkleIcon, ArrowRightIcon, LeafIcon } from "../components/Icons.jsx";

const STEPS = [
  { title: "Identify", desc: "We reach young students at school level in the most difficult circumstances — orphaned or with a single parent, in absolute poverty.", icon: TargetIcon },
  { title: "Sponsor", desc: "₹1,00,000 (One lakh only) is raised from sponsors to fully fund a child's education.", icon: HeartHandsIcon },
  { title: "Support", desc: "Funds cover fees, books, uniforms and essentials, with regular progress updates shared with sponsors.", icon: UsersGroupIcon },
  { title: "Sustain", desc: "We stay with each child's journey, tracking outcomes long after the first sponsorship.", icon: SparkleIcon },
];

export default function EduSProPage() {
  return (
    <>
      <section className="diagonal-hero">
        <div className="diagonal-hero__inner">
          <div className="diagonal-hero__content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="diagonal-hero__eyebrow">Educational Sponsorship Programme</span>
              <h1 className="diagonal-hero__title">EduSPro — Rooting A Child's Future In Education</h1>
              <p className="diagonal-hero__sub">An educational support programme reaching young students at the school level who face the most difficult circumstances of their lives.</p>
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
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">₹1L</span><span className="diagonal-hero__stat-label">Per Child Sponsored</span></div>
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">3+</span><span className="diagonal-hero__stat-label">Years of Support</span></div>
            <div className="diagonal-hero__stat"><span className="diagonal-hero__stat-num">100%</span><span className="diagonal-hero__stat-label">Goes to Education</span></div>
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
            <h2 className="h-lg">One Lakh Can Change A Child's Whole Story</h2>
            <p className="lede mt-16">
              EduSPro reaches out to students, particularly those without parents or with a single parent living
              in absolute poverty, and raises ₹1,00,000 from sponsors to fund their education — start to finish.
            </p>
            <ul className="card-list mt-24">
              <li><HeartIcon /> Focused on the most vulnerable school-going children</li>
              <li><HeartIcon /> Full transparency on how each rupee is spent</li>
              <li><HeartIcon /> Direct updates from the child's school and sponsor circle</li>
            </ul>
            <NavLink to="/donate" className="btn btn--primary mt-32">Sponsor A Child <DonateHeartIcon /></NavLink>
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>How It Works</div>
            <h2 className="h-lg">From Sponsorship To A Full Education</h2>
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
                  <h3 className="h-md" style={{ color: "white" }}>₹1,00,000 per child, fully sponsored</h3>
                  <NavLink to="/donate" className="btn btn--gold btn--sm mt-16">Become A Sponsor <DonateHeartIcon /></NavLink>
                </div>
                <div className="impact-band__stats impact-band__stats--two">
                  <div className="impact-stat"><GraduationCapIcon /><div className="impact-stat__num">1,200+</div><div className="impact-stat__label">Children Supported</div></div>
                  <div className="impact-stat"><UsersGroupIcon /><div className="impact-stat__num">35+</div><div className="impact-stat__label">Villages Reached</div></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
