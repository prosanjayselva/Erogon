import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

export default function PageHero({ eyebrow, title, sub, crumb }) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero__inner">
        <Reveal as="up">
          <div className="breadcrumb">
            <NavLink to="/" style={{ color: "rgba(251,248,241,0.75)" }}>Home</NavLink>
            <ChevronRightIcon />
            <span style={{ color: "var(--gold-300)" }}>{crumb}</span>
          </div>
          {eyebrow && <div className="eyebrow" style={{ color: "var(--gold-300)" }}>{eyebrow}</div>}
          <h1>{title}</h1>
          {sub && <p className="lede mt-16" style={{ color: "rgba(251,248,241,0.8)" }}>{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}
