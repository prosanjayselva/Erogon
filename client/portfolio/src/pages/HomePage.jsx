import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import {
  PeopleIcon, PawIcon, LeafIcon, HeartHandsIcon, GraduationCapIcon,
  UsersGroupIcon, HeartIcon, ArrowRightIcon, PlayIcon, QuoteIcon, ShieldCheckIcon,
  DocReceiptIcon, DonateHeartIcon, VolunteerIcon,
} from "../components/Icons.jsx";
import { HOME_BANNER, STATS, TESTIMONIALS, PARTNERS, DONORS } from "../data/content.js";
import { PHOTOS } from "../data/photos.js";
import {
  PeopleIllustration, PetsIllustration, PlanetIllustration,
} from "../components/ActivityIllustrations.jsx";

const KEY_ACTIVITIES = [
  { icon: PeopleIllustration, title: "People", desc: "Education Support & Skill Development, Women Empowerment & Livelihood Support, Healthcare & Community Welfare, Career Guidance & Placement Support." },
  { icon: PetsIllustration, title: "Pets", desc: "Animal Rescue & Welfare Activities." },
  { icon: PlanetIllustration, title: "Planet", desc: "Environmental Protection & Sustainability, Awareness, Volunteer & Community Development Programmes." },
];

const TRUST_ITEMS = [
  { icon: ShieldCheckIcon, title: "Verified NGO", desc: "Registered charitable trust with full transparency." },
  { icon: DocReceiptIcon, title: "Transparent Reports", desc: "Detailed impact reports for every project." },
  { icon: HeartHandsIcon, title: "Direct Impact", desc: "100% of donations reach the cause." },
  { icon: UsersGroupIcon, title: "Community Driven", desc: "Built by volunteers, for communities." },
];

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

const CAUSES_FEATURED = [
  { title: "Education For Every Child", desc: "Supporting children with scholarships, digital learning and skill development.", icon: GraduationCapIcon, theme: "#1B4332" },
  { title: "Accessible Healthcare", desc: "Free medical camps supporting underserved communities.", icon: HeartHandsIcon, theme: "#2D6A4F" },
  { title: "Protect Our Planet", desc: "41 trees planted, beach clean-ups and environmental awareness.", icon: LeafIcon, theme: "#B8860B" },
  { title: "Care For Every Animal", desc: "Rescue and rehabilitation for animals in need across Tamil Nadu.", icon: PawIcon, theme: "#2F855A" },
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
  const [storyImage, setStoryImage] = useState({
    src: PHOTOS.ramanathapuramGroup,
    alt: "ERGON Foundation field impact",
    time: "",
  });

  const openStory = () => {
    const images = [
      { src: PHOTOS.ramanathapuramGroup, alt: "ERGON Foundation community programme" },
      { src: PHOTOS.ramanathapuramSaplings, alt: "ERGON Foundation tree plantation activity" },
      { src: PHOTOS.ramanathapuramBeachClean, alt: "ERGON Foundation beach clean-up activity" },
      { src: PHOTOS.medicalCampGroup, alt: "ERGON Foundation medical camp" },
    ];
    const next = images[Math.floor(Math.random() * images.length)];
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const imageUrl = new URL(next.src, window.location.origin).href;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
        <defs>
          <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#0f241a" stop-opacity="0.92"/>
            <stop offset="0.54" stop-color="#0f241a" stop-opacity="0.38"/>
            <stop offset="1" stop-color="#d8b03c" stop-opacity="0.26"/>
          </linearGradient>
        </defs>
        <image href="${imageUrl}" x="0" y="0" width="1200" height="760" preserveAspectRatio="xMidYMid slice"/>
        <rect width="1200" height="760" fill="url(#shade)"/>
        <rect x="54" y="54" width="1092" height="652" rx="34" fill="none" stroke="#f3eddc" stroke-opacity="0.42" stroke-width="2"/>
        <text x="80" y="130" fill="#d8b03c" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3">LIVE FIELD SNAPSHOT - ${time}</text>
        <text x="80" y="235" fill="#ffffff" font-family="Georgia, serif" font-size="76" font-weight="700">People, Pets</text>
        <text x="80" y="320" fill="#ffffff" font-family="Georgia, serif" font-size="76" font-weight="700">And Planet</text>
        <text x="80" y="392" fill="#f3eddc" font-family="Arial, sans-serif" font-size="28">Generated instantly from ERGON's field work moments.</text>
        <g transform="translate(80 518)">
          <rect width="230" height="96" rx="20" fill="#ffffff" fill-opacity="0.88"/>
          <text x="28" y="44" fill="#1b4332" font-family="Georgia, serif" font-size="34" font-weight="700">373</text>
          <text x="28" y="72" fill="#3e4a40" font-family="Arial, sans-serif" font-size="16" font-weight="700">LIVES IMPACTED</text>
        </g>
        <g transform="translate(334 518)">
          <rect width="230" height="96" rx="20" fill="#ffffff" fill-opacity="0.88"/>
          <text x="28" y="44" fill="#1b4332" font-family="Georgia, serif" font-size="34" font-weight="700">160</text>
          <text x="28" y="72" fill="#3e4a40" font-family="Arial, sans-serif" font-size="16" font-weight="700">MEALS SERVED</text>
        </g>
        <g transform="translate(588 518)">
          <rect width="230" height="96" rx="20" fill="#ffffff" fill-opacity="0.88"/>
          <text x="28" y="44" fill="#1b4332" font-family="Georgia, serif" font-size="34" font-weight="700">41</text>
          <text x="28" y="72" fill="#3e4a40" font-family="Arial, sans-serif" font-size="16" font-weight="700">TREES PLANTED</text>
        </g>
      </svg>`;
    const generatedSrc = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    setStoryImage({ src: generatedSrc, alt: `${next.alt} generated live impact card`, time });
    setStoryOpen(true);
  };

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

            <WordReveal text="Together We Build Hope." />

            <motion.p
              className="home-hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Every donation creates a better tomorrow for children, families, animals and nature.
            </motion.p>

            <motion.p
              className="home-hero__lede"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {HOME_BANNER}
            </motion.p>

            <motion.div
              className="page-hero-split__ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <NavLink to="/donate" className="btn btn--primary">Donate Now <DonateHeartIcon /></NavLink>
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
            <motion.button
              type="button"
              className="home-hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={openStory}
            >
              <PlayIcon />
              <div>
                <b>Watch Our Story</b>
                <span>See how we create impact</span>
              </div>
            </motion.button>
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
            <img src={storyImage.src} alt={storyImage.alt} />
            <div className="story-modal__content">
              <span>Live Field Snapshot{storyImage.time ? ` - ${storyImage.time}` : ""}</span>
              <h3>People, Pets And Planet In Action</h3>
              <p>This instant preview generates a fresh ERGON field snapshot inside the popup when the story button is clicked.</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ============================ TRUST SECTION ============================ */}
      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center", maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Why Trust Us</div>
            <h2 className="h-lg">Why Thousands Trust <span className="text-gold">Ergon Foundation</span></h2>
          </Reveal>
          <Stagger className="trust-grid mt-48" gap={0.15}>
            {TRUST_ITEMS.map((t, i) => (
              <StaggerItem key={i}>
                <div className="trust-card">
                  <t.icon />
                  <b>{t.title}</b>
                  <span>{t.desc}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ ABOUT TEASER ============================ */}
      <section className="section">
        <div className="container grid-2">
          <Reveal as="left">
            <div className="about-logo-card" aria-label="ERGON Foundation logo">
              <img src={PHOTOS.ramanathapuramGroup} alt="ERGON Foundation - The People, The Pets, The Planet" />
            </div>
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <div className="eyebrow">About Us</div>
            <h2 className="h-lg">We Exist To Make A <span className="text-gold">Difference</span></h2>
            <p className="lede mt-16">
              ERGON Foundation works for the upliftment of communities, animals and the environment.
              We believe small actions today create a better tomorrow — for Tamil Nadu, and for India.
            </p>
            <ul className="card-list mt-24">
              <li><HeartIcon /> Transparency in all our actions</li>
              <li><HeartIcon /> 100% donation reaches the cause</li>
              <li><HeartIcon /> Dedicated team, real, measured impact</li>
            </ul>
            <NavLink to="/about" className="btn btn--primary mt-32">Read More About Us <ArrowRightIcon /></NavLink>
          </Reveal>
        </div>
      </section>

      {/* ============================ QUOTE BAND ============================ */}
      <section className="section section--sm" style={{ background: "var(--secondary)" }}>
        <div className="container grid-2">
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

      {/* ============================ KEY ACTIVITIES ============================ */}
      <section className="section">
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center", maxWidth: 600, marginInline: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>What We Do</div>
            <h2 className="h-lg">Our Key Activities</h2>
          </Reveal>
          <Stagger className="grid-6 mt-48">
            {KEY_ACTIVITIES.map((a, i) => (
              <StaggerItem key={i}>
                <div className="card activity-card">
                  <a.icon className="activity-ill" />
                  <h4 className="h-sm">{a.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 6 }}>{a.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ IMPACT COUNTER ============================ */}
      <section className="container" style={{ marginBlock: "clamp(40px, 6vw, 72px)" }}>
        <Reveal as="scale">
          <div className="impact-band">
            <div className="impact-band__inner">
              <div className="impact-band__title">
                <div className="eyebrow">Our Impact</div>
                <h3 className="h-md" style={{ color: "white" }}>Making A Difference Together</h3>
                <NavLink to="/reports" className="btn btn--gold btn--sm mt-16">See Our Reports <ArrowRightIcon /></NavLink>
              </div>
              <div className="impact-band__stats">
                {IMPACT_STATS.map((s, i) => (
                  <div className="impact-stat" key={i}>
                    <s.icon />
                    <div className="impact-stat__num">
                      <AnimatedCounter value={s.num} suffix={s.suffix} />
                    </div>
                    <div className="impact-stat__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================ FEATURED CAUSES ============================ */}
      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Causes</div>
            <h2 className="h-lg">Every Cause Begins With <span className="text-gold">Hope</span></h2>
            <p className="lede mx-auto mt-16" style={{ maxWidth: 600 }}>Your support creates measurable impact in real lives across education, healthcare, environment and animal welfare.</p>
          </Reveal>

          <div className="mt-48" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {CAUSES_FEATURED.map((cause, i) => (
              <Reveal as="up" delay={i * 0.1} key={i}>
                <motion.div
                  className="glass-card"
                  style={{
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    flexWrap: "wrap",
                    borderLeft: `4px solid ${cause.theme}`,
                  }}
                  whileHover={{ x: 6, transition: { duration: 0.3 } }}
                >
                  <div className="icon-badge" style={{ marginBottom: 0, flex: "none", width: 60, height: 60, background: cause.theme + "18", color: cause.theme }}>
                    <cause.icon />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="h-sm" style={{ color: cause.theme }}>{cause.title}</h3>
                    <p className="lede" style={{ fontSize: "0.95rem", marginTop: 4 }}>{cause.desc}</p>
                  </div>
                  <NavLink to="/causes" className="btn btn--ghost btn--sm" style={{ flex: "none" }}>Learn More <ArrowRightIcon /></NavLink>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ COMMUNITY MOMENTS ============================ */}
      <section className="section">
        <div className="container">
          <Reveal as="up" style={{ textAlign: "center" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Community Moments</div>
            <h2 className="h-lg">Snapshots From The <span className="text-gold">Field</span></h2>
            <p className="lede mx-auto mt-16" style={{ maxWidth: 540 }}>Real moments from our environment and community programmes across Tamil Nadu.</p>
          </Reveal>
          <Stagger className="grid-4 mt-48">
            {[
              { src: PHOTOS.ramanathapuramThumbprint, alt: "Environmental pledge commitment", ratio: "4/3" },
              { src: PHOTOS.yercaudPledge, alt: "Taking the environmental pledge at Yercaud", ratio: "4/3" },
              { src: PHOTOS.yercaudDance, alt: "Climate dance challenge with children", ratio: "4/3" },
              { src: PHOTOS.yercaudActivity, alt: "Community activity at Yercaud", ratio: "4/3" },
            ].map((img, i) => (
              <StaggerItem key={i}>
                <PhotoFrame src={img.src} alt={img.alt} ratio={img.ratio} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal as="up" className="text-center mt-32">
            <NavLink to="/gallery" className="btn btn--ghost">View Full Gallery <ArrowRightIcon /></NavLink>
          </Reveal>
        </div>
      </section>

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
                    <p>"{t.quote}"</p>
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
            <div className="eyebrow" style={{ justifyContent: "center" }}>Our Partners & Supporters</div>
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
