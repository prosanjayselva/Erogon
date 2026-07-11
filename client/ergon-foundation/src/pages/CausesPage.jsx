import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PHOTOS } from "../data/photos.js";
import { PeopleIcon, PawIcon, LeafIcon, CheckIcon, ArrowRightIcon, DonateHeartIcon } from "../components/Icons.jsx";
import { PILLARS } from "../data/content.js";

const PILLAR_ICON = { people: PeopleIcon, pets: PawIcon, planet: LeafIcon };
const PILLAR_TONE = { people: "", pets: "photo-frame--sage", planet: "photo-frame--gold" };
const PILLAR_PHOTO = { people: "/images/gallery-04-medical-checkup.jpg", pets: null, planet: PHOTOS.projectTree };

export default function CausesPage() {
  return (
    <>
      <PageHero
        crumb="Our Causes"
        eyebrow="What We Stand For"
        title="Causes We Are Rooted In"
        sub="Every ERGON programme grows from one of three roots — People, Pets and Planet — each tended with the same care."
      />

      {PILLARS.map((p, i) => {
        const Icon = PILLAR_ICON[p.key];
        const reverse = i % 2 === 1;
        return (
          <section className={`section ${i % 2 === 0 ? "section--paper" : "section--cream"}`} key={p.key}>
            <div className="wrap grid-2">
              <Reveal as={reverse ? "right" : "left"} style={{ order: reverse ? 2 : 1 }}>
                <PhotoFrame src={PILLAR_PHOTO[p.key]} alt={p.title} icon={Icon} tone={PILLAR_TONE[p.key]} caption={p.title} ratio="4/3.2" blob={i === 1} />
              </Reveal>
              <Reveal as={reverse ? "left" : "right"} delay={0.1} style={{ order: reverse ? 1 : 2 }}>
                <div className="eyebrow">{`0${i + 1} · Our Causes`}</div>
                <h2 className="h-lg">{p.title}</h2>
                <p className="lede mt-16">{p.desc}</p>
                <ul className="card-list mt-24">
                  {p.points.map((pt, idx) => (
                    <li key={idx}><CheckIcon /> {pt}</li>
                  ))}
                </ul>
                <NavLink to="/donate" className="btn btn--primary mt-32">Support {p.title} <DonateHeartIcon /></NavLink>
              </Reveal>
            </div>
            {i < PILLARS.length - 1 && (
              <div className="wrap mt-48"><RootLine compact labels={false} /></div>
            )}
          </section>
        );
      })}

      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="scale">
            <div className="cta-banner">
              <div className="cta-banner__inner">
                <div className="eyebrow center" style={{ color: "var(--gold-300)" }}>Get Involved</div>
                <h2 className="h-lg">Pick A Cause Close To Your Heart</h2>
                <p>Whichever root you choose to water, the tree grows stronger for everyone.</p>
                <div className="hero__cta">
                  <NavLink to="/donate" className="btn btn--gold">Donate Now <DonateHeartIcon /></NavLink>
                  <NavLink to="/projects" className="btn btn--ghost">See Our Projects <ArrowRightIcon /></NavLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
