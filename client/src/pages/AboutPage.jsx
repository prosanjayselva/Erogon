import PageHero from "../components/PageHero.jsx";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import RootLine from "../components/RootLine.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";

import { PHOTOS } from "../data/photos.js";
import { PeopleIcon, PawIcon, LeafIcon, CheckIcon, UsersGroupIcon } from "../components/Icons.jsx";
import { PILLARS, GOVERNING_BODY, STAFF, PARTNERS, DONORS } from "../data/content.js";

const PILLAR_ICON = { people: PeopleIcon, pets: PawIcon, planet: LeafIcon };

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Who We Are"
        title="A Trust Rooted In People, Pets & Planet"
        sub="ERGON Foundation is a registered charitable trust dedicated to innovation for the welfare of people, animals, and the environment across Tamil Nadu and India."
      />

      {/* ---------------------------------- VISION ---------------------------------- */}
      <section className="section section--paper">
        <div className="wrap grid-2">
          <Reveal as="left">
            <PhotoFrame src={PHOTOS.treePlantingReal} alt="An ERGON volunteer planting a sapling on a construction site" ratio="1/1" blob />
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <div className="eyebrow">Our Vision</div>
            <h2 className="h-lg">Welfare For People, <span className="accent">Pets</span> &amp; The Planet</h2>
            <p className="lede mt-16">
              The vision of ERGON Foundation is to work for the welfare of People, Pets and the Planet through
              charitable and sustainable initiatives. The Foundation is committed to supporting poor and needy
              communities, caring for animals, and protecting the environment in Tamil Nadu and across India.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- KEY ACTIVITIES PILLARS ------------------------ */}
      <section className="section section--cream">
        <div className="wrap">
          <Reveal as="up" className="center" style={{ maxWidth: 620 }}>
            <div className="eyebrow center">Our Key Activities</div>
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
                    <p style={{ color: "var(--ink-500)", fontSize: "0.9rem", marginTop: 6 }}>{p.desc}</p>
                    <ul className="card-list">
                      {p.points.map((pt, i) => (
                        <li key={i}><CheckIcon /> {pt}</li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------- TEAM --------------------------------------- */}
      <section className="section section--paper">
        <div className="wrap">
          <Reveal as="up" className="center" style={{ maxWidth: 620 }}>
            <div className="eyebrow center">ERGON Team</div>
            <h2 className="h-lg">The People Behind The Roots</h2>
          </Reveal>

          <div className="mt-48">
            <Reveal as="up"><h3 className="h-sm mb-16">Governing Body</h3></Reveal>
            <Stagger className="grid-3">
              {GOVERNING_BODY.map((m, i) => (
                <StaggerItem key={i}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="testi-avatar mx-auto" style={{ marginBottom: 14 }}><UsersGroupIcon /></div>
                    <h4 className="h-sm" style={{ fontSize: "1.02rem" }}>{m.name}</h4>
                    <span className="pill mt-8" style={{ display: "inline-block" }}>{m.role}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-48">
            <Reveal as="up"><h3 className="h-sm mb-16">ERGON Staff</h3></Reveal>
            <Stagger className="grid-3">
              {STAFF.map((m, i) => (
                <StaggerItem key={i}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="testi-avatar mx-auto" style={{ marginBottom: 14 }}><UsersGroupIcon /></div>
                    <h4 className="h-sm" style={{ fontSize: "1.02rem" }}>{m.name}</h4>
                    <span className="pill mt-8" style={{ display: "inline-block" }}>{m.role}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* --------------------------------- PARTNERS & DONORS ---------------------------- */}
      <section className="section-tight section--cream">
        <div className="wrap grid-2">
          <Reveal as="left">
            <h3 className="h-sm mb-16">Our Partners</h3>
            <div className="card">
              {PARTNERS.map((p, i) => (
                <div key={i} className="flex gap-12" style={{ padding: "10px 0" }}><CheckIcon style={{ color: "var(--forest-600)", width: 18, height: 18 }} /> <span>{p}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal as="right" delay={0.1}>
            <h3 className="h-sm mb-16">Our Donors</h3>
            <div className="card">
              {DONORS.map((p, i) => (
                <div key={i} className="flex gap-12" style={{ padding: "10px 0" }}><CheckIcon style={{ color: "var(--forest-600)", width: 18, height: 18 }} /> <span>{p}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
