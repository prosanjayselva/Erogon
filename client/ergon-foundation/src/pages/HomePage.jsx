import { NavLink } from "react-router-dom";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import {
  PeopleIcon, PawIcon, LeafIcon, HeartHandsIcon, GraduationCapIcon, HomeVillageIcon,
  UsersGroupIcon, CheckIcon, ArrowRightIcon, PlayIcon, QuoteIcon, ShieldCheckIcon,
  LockIcon, DocReceiptIcon, BellIcon, PinIcon, DonateHeartIcon, VolunteerIcon, TargetIcon,
} from "../components/Icons.jsx";
import { STATS, PROJECTS, TESTIMONIALS, PARTNERS, DONORS } from "../data/content.js";
import { PHOTOS } from "../data/photos.js";

const STAT_ICONS = [TargetIcon, UsersGroupIcon, GraduationCapIcon, PawIcon, HomeVillageIcon];

const KEY_ACTIVITIES = [
  { icon: PeopleIcon, title: "People", desc: "Education, women's livelihood, healthcare & careers." },
  { icon: PawIcon, title: "Pets", desc: "Rescue and welfare for animals in need." },
  { icon: LeafIcon, title: "Planet", desc: "Environmental protection & sustainability." },
  { icon: UsersGroupIcon, title: "Community Development", desc: "Stronger communities through participation." },
  { icon: VolunteerIcon, title: "Volunteer With Us", desc: "Be the reason someone smiles today." },
  { icon: DonateHeartIcon, title: "Donate With Love", desc: "Your small contribution, big change." },
];

function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="hero">
        <div className="floaters" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" style={{ top: "18%", left: "4%", animationDelay: "0s" }}><path d="M5 19C5 9 12 4.5 20 4.5c0 9-5 14.5-15 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ top: "68%", left: "9%", animationDelay: "2.2s" }}><path d="M5 19C5 9 12 4.5 20 4.5c0 9-5 14.5-15 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </div>
        <div className="wrap hero__grid">
          <Reveal as="left">
            <div className="hero__tag"><span className="dot" /> Registered Charitable Trust · Tamil Nadu, India</div>
            <h1>
              Rooted in<br />
              <span className="line2 accent-solid" style={{ color: "var(--forest-700)" }}>Good Deeds</span>
            </h1>
            <p className="hero__sub">for the People · Pets · Planet</p>
            <p className="lede mt-16">
              ERGON Foundation is a registered charitable trust dedicated to innovation for the welfare of
              people, animals and the environment. Together, we can build a kinder, stronger and sustainable world.
            </p>
            <div className="hero__cta">
              <NavLink to="/donate" className="btn btn--primary">Donate Now <DonateHeartIcon /></NavLink>
              <NavLink to="/get-involved" className="btn btn--ghost">Become a Volunteer <VolunteerIcon /></NavLink>
            </div>
          </Reveal>

          <Reveal as="right" delay={0.15}>
            <div className="hero__art">
              <PhotoFrame src={PHOTOS.heroGirlDog} alt="A young girl warmly hugging her golden retriever puppy" ratio="5/6" blob />
              <div className="hero__badge">
                <PlayIcon />
                <div>
                  <b>Watch</b>
                  <span>Our Story</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="wrap">
          <Reveal as="up" delay={0.2}>
            <div className="stat-strip">
              {STATS.map((s, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div className="stat-strip__item" key={i}>
                    <Icon />
                    <div className="stat-strip__num">{s.num}</div>
                    <div className="stat-strip__label">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- ABOUT TEASER ------------------------------ */}
      <section className="section section--paper">
        <div className="wrap grid-2">
          <Reveal as="left">
            <div style={{ position: "relative" }}>
              <PhotoFrame src={PHOTOS.handsPlant} alt="Hands cradling a young sapling and soil, ERGON's Rooted in Good Deeds emblem" ratio="1/1" tone="photo-frame--sage" />
            </div>
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <div className="eyebrow">About Us</div>
            <h2 className="h-lg">We Exist To Make A <span className="accent">Difference</span></h2>
            <p className="lede mt-16">
              ERGON Foundation works for the upliftment of communities, animals and the environment.
              We believe small actions today create a better tomorrow — for Tamil Nadu, and for India.
            </p>
            <ul className="card-list mt-24">
              <li><CheckIcon /> Transparency in all our actions</li>
              <li><CheckIcon /> 100% donation reaches the cause</li>
              <li><CheckIcon /> Dedicated team, real, measured impact</li>
            </ul>
            <NavLink to="/about" className="btn btn--primary mt-32">Read More About Us <ArrowRightIcon /></NavLink>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------- QUOTE BAND -------------------------------- */}
      <section className="section-tight section--cream">
        <div className="wrap grid-2">
          <Reveal as="up">
            <RootLine />
          </Reveal>
          <Reveal as="scale" delay={0.1}>
            <div className="quote-card">
              <QuoteIcon />
              <blockquote>"The best way to find yourself is to lose yourself in the service of others."</blockquote>
              <cite>— Mahatma Gandhi</cite>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ KEY ACTIVITIES -------------------------------- */}
      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center" style={{ maxWidth: 620 }}>
            <div className="eyebrow center">What We Do</div>
            <h2 className="h-lg">Our Key Activities</h2>
          </Reveal>
          <Stagger className="grid-6 mt-48">
            {KEY_ACTIVITIES.map((a, i) => (
              <StaggerItem key={i}>
                <div className="card activity-tile">
                  <div className="icon-badge"><a.icon /></div>
                  <h4>{a.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-500)" }}>{a.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --------------------------------- IMPACT BAND -------------------------------- */}
      <section className="wrap">
        <Reveal as="scale">
          <div className="impact-band">
            <div className="impact-band__title">
              <div className="eyebrow" style={{ color: "var(--gold-300)" }}>Our Impact</div>
              <h3 className="h-md" style={{ color: "var(--cream-50)" }}>In Numbers</h3>
              <NavLink to="/reports" className="btn btn--gold btn--sm mt-16">See Our Reports <ArrowRightIcon /></NavLink>
            </div>
            <div className="impact-band__stats">
              {[
                { icon: UsersGroupIcon, num: "25,000+", label: "Lives Impacted" },
                { icon: GraduationCapIcon, num: "1,200+", label: "Children Supported" },
                { icon: PawIcon, num: "400+", label: "Animals Rescued" },
                { icon: HomeVillageIcon, num: "35+", label: "Villages Reached" },
                { icon: PinIcon, num: "10+", label: "States Covered" },
              ].map((s, i) => (
                <div className="impact-band__stat" key={i}>
                  <s.icon />
                  <div className="impact-band__num">{s.num}</div>
                  <div className="impact-band__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* -------------------------------- FEATURED PROJECTS --------------------------- */}
      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="flex-between" style={{ flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="eyebrow">Featured Projects</div>
              <h2 className="h-lg">Where Your Support Goes</h2>
            </div>
            <NavLink to="/projects" className="link-arrow">View All Projects <ArrowRightIcon /></NavLink>
          </Reveal>

          <Stagger className="grid-4 mt-48">
            {PROJECTS.map((p, i) => {
              const pct = Math.round((p.raised / p.goal) * 100);
              return (
                <StaggerItem key={i}>
                  <div className="project-card">
                    <PhotoFrame
                      src={p.photo ? PHOTOS[p.photo] : undefined}
                      alt={p.title}
                      icon={[LeafIcon, LeafIcon, GraduationCapIcon, PawIcon][i]}
                      tone={p.tone}
                      ratio="4/3"
                    />
                    <div className="project-card__body">
                      <h4 className="h-sm">{p.title}</h4>
                      <div className="project-card__loc"><PinIcon /> {p.loc}</div>
                      <div className="progress"><div className="progress__bar" style={{ width: pct + "%" }} /></div>
                      <div className="progress__meta"><span><b>{money(p.raised)}</b> raised of {money(p.goal)}</span><span>{pct}%</span></div>
                      <NavLink to="/donate" className="btn btn--ghost btn--sm btn--block mt-16">Support Project <DonateHeartIcon /></NavLink>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------- TRUST STRIP -------------------------------- */}
      <section className="section-tight section--cream">
        <div className="wrap">
          <Reveal as="up">
            <div className="trust-strip">
              <div className="trust-item"><ShieldCheckIcon /><div><b>100% Transparent</b><span>We ensure transparency in every step.</span></div></div>
              <div className="trust-item"><LockIcon /><div><b>Secure Donations</b><span>Your donation is safe and protected.</span></div></div>
              <div className="trust-item"><DocReceiptIcon /><div><b>Tax Benefits</b><span>80G applicable for eligible donations.</span></div></div>
              <div className="trust-item"><BellIcon /><div><b>Regular Updates</b><span>Stay updated with our activities.</span></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------- STORIES OF HOPE ----------------------------- */}
      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="flex-between" style={{ flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="eyebrow">Stories of Hope</div>
              <h2 className="h-lg">Voices From The Ground</h2>
            </div>
            <NavLink to="/gallery" className="link-arrow">View All Stories <ArrowRightIcon /></NavLink>
          </Reveal>

          <Stagger className="grid-3 mt-48">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={i}>
                <div className="card testi-card">
                  <div className="testi-avatar"><HeartHandsIcon /></div>
                  <div className="testi-body">
                    <p>"{t.quote}"</p>
                    <cite>— {t.name}, {t.role}</cite>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --------------------------------- PARTNERS ------------------------------------ */}
      <section className="section-tight section--cream">
        <div className="wrap">
          <Reveal as="up" className="center mb-24">
            <div className="eyebrow center">Our Partners</div>
          </Reveal>
          <Reveal as="fade" delay={0.1}>
            <div className="partner-row">
              {[...PARTNERS, ...DONORS, "Community Circle", "Give Together"].map((p, i) => (
                <span className="partner" key={i}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------- CTA --------------------------------------- */}
      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="scale">
            <div className="cta-banner">
              <div className="cta-banner__inner">
                <div className="eyebrow center" style={{ color: "var(--gold-300)" }}>Join The Roots</div>
                <h2 className="h-lg">Every Good Deed Grows Something</h2>
                <p>Whether you give an hour or a rupee, it becomes part of something rooted, lasting and shared.</p>
                <div className="hero__cta">
                  <NavLink to="/donate" className="btn btn--gold">Donate Now <DonateHeartIcon /></NavLink>
                  <NavLink to="/get-involved" className="btn btn--ghost">Become a Volunteer <VolunteerIcon /></NavLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
