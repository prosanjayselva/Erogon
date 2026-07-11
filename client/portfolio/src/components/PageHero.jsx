import { NavLink, Link } from "react-router-dom";
import { ChevronRightIcon } from "./Icons.jsx";
import { PHOTOS } from "../data/photos.js";

export default function PageHero({ eyebrow, title, sub, crumb, image, ctas, stats }) {
  if (!image) {
    return (
      <section className="page-hero-split page-hero-split--full">
        <div className="container">
          <div className="page-hero-split__content" style={{ width: "100%", maxWidth: 720, padding: 0 }}>
            <nav className="page-hero-split__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>{crumb}</span>
            </nav>
            {eyebrow && <span className="page-hero-split__eyebrow">{eyebrow}</span>}
            <h1 className="page-hero-split__title">{title}</h1>
            {sub && <p className="page-hero-split__sub">{sub}</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero-split">
      <div className="page-hero-split__inner">
        <div className="page-hero-split__content">
          <nav className="page-hero-split__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <ChevronRightIcon />
            <span>{crumb}</span>
          </nav>
          {eyebrow && <span className="page-hero-split__eyebrow">{eyebrow}</span>}
          <h1 className="page-hero-split__title">{title}</h1>
          {sub && <p className="page-hero-split__sub">{sub}</p>}
          {ctas?.length > 0 && (
            <div className="page-hero-split__ctas">
              {ctas.map((c, i) => (
                <Link key={i} to={c.to} className={`btn btn--${c.variant || "primary"}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="page-hero-split__media">
          <img src={image} alt="" />
          <div className="page-hero-split__media-overlay" />
          {stats?.slice(0, 2).map((s, i) => (
            <div
              key={i}
              className="hero-floating-stat"
              style={{
                [i === 0 ? "top" : "bottom"]: "clamp(2rem, 5vw, 4rem)",
                [i === 0 ? "right" : "left"]: "clamp(1.5rem, 4vw, 3rem)",
              }}
            >
              <span className="hero-floating-stat__num">{s.number}</span>
              <span className="hero-floating-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      {stats?.length > 0 && (
        <div className="hero-stats-bar">
          <div className="container">
            <div className="hero-stats-bar__grid">
              {stats.map((s, i) => (
                <div key={i} className="hero-stats-bar__item">
                  <span className="hero-stats-bar__num">{s.number}</span>
                  <span className="hero-stats-bar__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
