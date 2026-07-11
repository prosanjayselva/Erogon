import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DonateHeartIcon } from "../components/Icons.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/causes", label: "Our Causes" },
  { to: "/eduspro", label: "EduSPro" },
  { to: "/projects", label: "Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/gallery", label: "Gallery" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap site-header__bar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/assets/logo-source.png" alt="ERGON Foundation" className="brand__logo" />
        </NavLink>

        <div className="header-cta">
          <NavLink to="/get-involved" className="btn btn--ghost btn--sm">Become a Volunteer</NavLink>
          <NavLink to="/donate" className="btn btn--primary btn--sm">
            Donate Now <DonateHeartIcon />
          </NavLink>
          <button className={`hamburger ${open ? "is-open" : ""}`} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`nav ${open ? "is-open" : ""}`}>
        <div className="wrap nav__inner">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className={`nav-scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
    </header>
  );
}
