import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import RootLine from "../components/RootLine.jsx";
import { GraduationCapIcon, CheckIcon, DonateHeartIcon, TargetIcon, HeartHandsIcon, UsersGroupIcon, SparkleIcon } from "../components/Icons.jsx";

const STEPS = [
  { title: "Identify", desc: "We reach young students at school level in the most difficult circumstances — orphaned or with a single parent, in absolute poverty." },
  { title: "Sponsor", desc: "₹1,00,000 (One lakh only) is raised from sponsors to fully fund a child's education." },
  { title: "Support", desc: "Funds cover fees, books, uniforms and essentials, with regular progress updates shared with sponsors." },
  { title: "Sustain", desc: "We stay with each child's journey, tracking outcomes long after the first sponsorship." },
];

export default function EduSProPage() {
  return (
    <>
      <PageHero
        crumb="EduSPro"
        eyebrow="Educational Sponsors Programme"
        title="EduSPro — Rooting A Child's Future In Education"
        sub="An educational support programme reaching young students at the school level who face the most difficult circumstances of their lives."
      />

      <section className="section section--paper">
        <div className="wrap grid-2">
          <Reveal as="left">
            <PhotoFrame src="/images/gallery-06-kids-play.jpg" alt="Children playing together at an ERGON programme" ratio="1/1" blob />
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <div className="eyebrow">About The Programme</div>
            <h2 className="h-lg">One Lakh Can Change A Child's Whole Story</h2>
            <p className="lede mt-16">
              EduSPro reaches out to students, particularly those without parents or with a single parent living
              in absolute poverty, and raises ₹1,00,000 (One lakh only) from sponsors to fund their education —
              start to finish.
            </p>
            <ul className="card-list mt-24">
              <li><CheckIcon /> Focused on the most vulnerable school-going children</li>
              <li><CheckIcon /> Full transparency on how each rupee is spent</li>
              <li><CheckIcon /> Direct updates from the child's school and sponsor circle</li>
            </ul>
            <NavLink to="/donate" className="btn btn--primary mt-32">Sponsor A Child <DonateHeartIcon /></NavLink>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <Reveal as="up" className="center" style={{ maxWidth: 620 }}>
            <div className="eyebrow center">How It Works</div>
            <h2 className="h-lg">From Sponsorship To A Full Education</h2>
          </Reveal>
          <div className="mt-32"><RootLine labels={false} /></div>
          <Stagger className="grid-4 mt-16">
            {STEPS.map((s, i) => (
              <StaggerItem key={i}>
                <div className="card" style={{ textAlign: "center" }}>
                  <div className="icon-badge mx-auto">{[TargetIcon, HeartHandsIcon, UsersGroupIcon, SparkleIcon][i]({})}</div>
                  <h4 className="h-sm">{s.title}</h4>
                  <p style={{ fontSize: "0.87rem", color: "var(--ink-500)", marginTop: 6 }}>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="scale">
            <div className="impact-band">
              <div className="impact-band__title">
                <div className="eyebrow" style={{ color: "var(--gold-300)" }}>The Target</div>
                <h3 className="h-md" style={{ color: "var(--cream-50)" }}>₹1,00,000 per child, fully sponsored</h3>
                <NavLink to="/donate" className="btn btn--gold btn--sm mt-16">Become A Sponsor <DonateHeartIcon /></NavLink>
              </div>
              <div className="impact-band__stats">
                <div className="impact-band__stat"><GraduationCapIcon /><div className="impact-band__num">1,200+</div><div className="impact-band__label">Children Supported</div></div>
                <div className="impact-band__stat"><UsersGroupIcon /><div className="impact-band__num">35+</div><div className="impact-band__label">Villages Reached</div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
