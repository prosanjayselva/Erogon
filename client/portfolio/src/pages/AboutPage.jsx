import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { motion } from "framer-motion";
import { PHOTOS } from "../data/photos.js";
import { ChevronRightIcon, PeopleIcon, PawIcon, LeafIcon, HeartIcon, UsersGroupIcon, GlobeIcon } from "../components/Icons.jsx";
import { PILLARS, GOVERNING_BODY, STAFF, PATRONS, PARTNERS, DONORS, ABOUT_IMPACT_STATS, ABOUT_VISION } from "../data/content.js";
import { NavLink } from "react-router-dom";

const PILLAR_ICON = { people: PeopleIcon, pets: PawIcon, planet: LeafIcon };

const CORE_VALUES = ["Compassion", "Integrity", "Transparency", "Empowerment", "Sustainability", "Community"];

const JOURNEY = [
  { year: "11th Apr, 2026", title: "Foundation Established", desc: "ERGON Foundation was established as a charitable trust." },
  { year: "15th May, 2026", title: "Medical Camp For Migrant Workers", desc: "Free medical camp for migrant workers in Avadi, Chennai." },
  { year: "5th June, 2026", title: "Environment Day @ Ramanathapuram", desc: "Tree plantation and beach clean-up activity at Ramanathapuram." },
  { year: "6th June, 2026", title: "Environment Day @ Yercaud", desc: "Awareness and environment activity at Yercaud." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="bg-hero__bg">
          <img src={PHOTOS.treePlantingReal} alt="ERGON Foundation community impact" />
        </div>
        <div className="bg-hero__overlay" />
        <div className="bg-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="bg-hero__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>About Us</span>
            </div>
            <span className="bg-hero__eyebrow">Who We Are</span>
            <h1 className="bg-hero__title">Compassion Creates Lasting Change.</h1>
            <p className="bg-hero__desc">Ergon Foundation exists to empower communities through education, healthcare, environmental sustainability and social responsibility.</p>
            <div className="hero__cta" style={{ justifyContent: "center", marginTop: "2rem" }}>
              <NavLink to="/donate" className="btn btn--primary">Support Our Vision</NavLink>
              <NavLink to="/get-involved" className="btn btn--outline">Get Involved</NavLink>
            </div>
          </motion.div>
        </div>
        <div className="bg-hero__scroll">
          <span>Scroll</span>
          <div className="bg-hero__scroll-line" />
        </div>
      </section>

      <section className="section" style={{ background: "linear-gradient(180deg, var(--secondary), var(--background))" }}>
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <Reveal as="up">
            <div className="eyebrow" style={{ justifyContent: "center" }}>A Message From Our Founder</div>
            <h2 className="h-lg">Building A Better Tomorrow, <span className="text-gold">Together</span></h2>
            <p className="lede mx-auto mt-24" style={{ fontSize: "1.1rem", maxWidth: 600 }}>
              "ERGON Foundation was born from a simple belief — that every act of kindness, no matter how small,
              creates ripples that transform lives. We are committed to transparency, compassion, and measurable
              impact in everything we do."
            </p>
            <div className="mt-24" style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", color: "var(--gold)", fontSize: "1.1rem" }}>
              — Mr. S. S. Antony Joseph, Founder &amp; Chairman
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Purpose</div>
            <h2 className="h-lg">What Drives Us Every Day</h2>
          </Reveal>
          <div className="mt-48" style={{ maxWidth: 900, marginInline: "auto" }}>
            <Reveal as="up">
              <motion.div className="glass-card" style={{ padding: "clamp(24px, 5vw, 44px) clamp(18px, 4vw, 36px)", textAlign: "center" }} whileHover={{ y: -6, boxShadow: "var(--shadow-lg)" }}>
                <GlobeIcon style={{ width: 52, height: 52, color: "var(--primary)", marginBottom: 20 }} />
                <h3 className="h-md">Our Vision</h3>
                <p className="lede mx-auto mt-16">{ABOUT_VISION}</p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 620, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Impact In Numbers</div>
            <h2 className="h-lg">People, Pets And Planet In Action</h2>
          </Reveal>
          <div className="about-impact-grid mt-32">
            {ABOUT_IMPACT_STATS.map((s, i) => (
              <Reveal as="up" delay={i * 0.06} key={s.label}>
                <div className="about-impact-card">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ background: "var(--secondary)" }}>
        <div className="container--narrow text-center">
          <Reveal as="up">
            <PhotoFrame src={PHOTOS.ramanathapuramBeachClean} alt="ERGON Foundation pet care" ratio="16/9" caption="Compassion for every soul — our pet welfare initiative" />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Values</div>
            <h2 className="h-lg">The Principles That Guide Us</h2>
          </Reveal>
          <Stagger className="grid-6 mt-48" gap={0.1}>
            {CORE_VALUES.map((v, i) => (
              <StaggerItem key={i}>
                <motion.div className="glass-card" style={{ padding: "28px 16px", textAlign: "center" }} whileHover={{ y: -4, scale: 1.02 }}>
                  <div className="icon-badge mx-auto" style={{ marginBottom: 12, width: 48, height: 48 }}><HeartIcon /></div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}>{v}</h4>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Journey</div>
            <h2 className="h-lg">How We Started And Where We're Going</h2>
          </Reveal>
          <div className="mt-48" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="timeline">
              {JOURNEY.map((j, i) => (
                <Reveal as="left" delay={i * 0.1} key={i}>
                  <div className="timeline-item">
                    <span className="yr">{j.year}</span>
                    <h4 className="h-sm" style={{ marginTop: 4 }}>{j.title}</h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginTop: 4 }}>{j.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Key Activities</div>
            <h2 className="h-lg">Three Roots, One Purpose</h2>
          </Reveal>
          <div className="root-line-wrap mt-32"><RootLine /></div>
          <Stagger className="grid-3 mt-32">
            {PILLARS.map((p) => {
              const Icon = PILLAR_ICON[p.key];
              return (
                <StaggerItem key={p.key}>
                  <div className="card">
                    <div className="icon-badge"><Icon /></div>
                    <h3 className="h-sm">{p.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 6 }}>{p.desc}</p>
                    <ul className="card-list">
                      {p.points.map((pt, i) => (
                        <li key={i}><HeartIcon /> {pt}</li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="up" className="text-center" style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>ERGON Team</div>
            <h2 className="h-lg">The People Behind The Roots</h2>
          </Reveal>
          <div className="mt-48">
            <Reveal as="up"><h3 className="h-sm mb-16">Governing Body</h3></Reveal>
            <Stagger className="grid-3">
              {GOVERNING_BODY.map((m, i) => (
                <StaggerItem key={i}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="testi-avatar mx-auto" style={{ marginBottom: 14 }}><UsersGroupIcon /></div>
                    <h4 className="h-sm">{m.name}</h4>
                    <span className="pill mt-8" style={{ display: "inline-block" }}>{m.role}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="mt-48">
            <Reveal as="up"><h3 className="h-sm mb-16">ERGON Patrons</h3></Reveal>
            <div className="empty-panel">
              {PATRONS.length ? PATRONS.map((m, i) => (
                <div key={i}>{m.name}</div>
              )) : <span>Patron details will be updated soon.</span>}
            </div>
          </div>
          <div className="mt-48">
            <Reveal as="up"><h3 className="h-sm mb-16">ERGON Staff</h3></Reveal>
            <Stagger className="grid-3">
              {STAFF.map((m, i) => (
                <StaggerItem key={i}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="testi-avatar mx-auto" style={{ marginBottom: 14 }}><UsersGroupIcon /></div>
                    <h4 className="h-sm">{m.name}</h4>
                    {m.role ? <span className="pill mt-8" style={{ display: "inline-block" }}>{m.role}</span> : <span className="role-placeholder" aria-label="Designation pending" />}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ background: "var(--secondary)" }}>
        <div className="container grid-2">
          <Reveal as="left">
            <h3 className="h-sm mb-16">Our Partners & Donors</h3>
            <div className="partner-logo-grid">
              {PARTNERS.map((p, i) => (
                <div key={i} className="partner-logo-card">
                  {p.logoSrc ? <img src={p.logoSrc} alt={`${p.name} logo`} /> : <span>{p.logo}</span>}
                  <b>{p.name}</b>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <h3 className="h-sm mb-16">Supporters</h3>
            <div className="partner-logo-grid">
              {DONORS.map((p, i) => (
                <div key={i} className="partner-logo-card">
                  {p.logoSrc ? <img src={p.logoSrc} alt={`${p.name} logo`} /> : <span>{p.logo}</span>}
                  <b>{p.name}</b>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
