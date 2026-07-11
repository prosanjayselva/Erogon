import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DonateHeartIcon } from "./Icons.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/causes", label: "Causes" },
  { to: "/eduspro", label: "EduSPro" },
  { to: "/projects", label: "Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/gallery", label: "Gallery" },
  { to: "/get-involved", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__bar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="ERGON Foundation" className="brand__logo" />
          <span className="brand__word">
            <b>Ergon Foundation</b>
            <span>Rooted in Good Deeds</span>
          </span>
        </NavLink>

        <nav className={`nav ${open ? "is-open" : ""}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-cta">
          <NavLink to="/donate" className="btn btn--gold btn--sm">
            Donate Now <DonateHeartIcon />
          </NavLink>
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={`nav-scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
    </header>
  );
}
