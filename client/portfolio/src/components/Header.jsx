import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DonateHeartIcon, MenuFacebook, MenuX, MenuLinkedin, MenuInstagram, MenuYoutube } from "./Icons.jsx";
import { CONTACT } from "../data/content.js";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
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
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const top = parseInt(document.body.style.top || "0") * -1 || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, top);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header__bar">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/images/logo.png" alt="ERGON Foundation" className="brand__logo" />
            <span className="brand__word">
              <b>Ergon Foundation</b>
              <span>Rooted in Good Deeds</span>
            </span>
          </NavLink>

          <nav className="nav">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
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
      </header>

      <div className={`nav-overlay ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
      <nav className={`nav--mobile ${open ? "is-open" : ""}`}>
        <div className="nav__header">
          <img src="/images/logo.png" alt="ERGON Foundation" className="nav__logo" />
          <button className="nav__close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span /><span />
          </button>
        </div>
        <div className="nav__body">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `nav__link ${isActive ? "active" : ""}`}
              style={{ transitionDelay: `${i * 50}ms` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="nav__footer">
          <NavLink to="/donate" className="nav__donate" onClick={() => setOpen(false)}>
            Donate Now <DonateHeartIcon />
          </NavLink>
          <div className="nav__social">
            <a href={CONTACT.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><MenuFacebook /></a>
            <a href={CONTACT.social.x} target="_blank" rel="noreferrer" aria-label="X"><MenuX /></a>
            <a href={CONTACT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><MenuInstagram /></a>
            <a href={CONTACT.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><MenuLinkedin /></a>
            <a href={CONTACT.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><MenuYoutube /></a>
          </div>
          <p className="nav__copyright">&copy; {new Date().getFullYear()} ERGON Foundation. All rights reserved.</p>
        </div>
      </nav>
    </>
  );
}
