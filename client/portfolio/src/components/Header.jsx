import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DonateHeartIcon } from "./Icons.jsx";
import { BrandName } from "./BrandName.jsx";

const B = import.meta.env.BASE_URL;

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/causes", label: "Our Causes" },
  { to: "/eduspro", label: "EduSPro" },
  { to: "/projects", label: "Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Career Opportunities" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      lastScrollY.current = window.scrollY;
      html.classList.add("menu-open");
      body.classList.add("menu-open");
    } else {
      html.classList.remove("menu-open");
      body.classList.remove("menu-open");
      window.scrollTo({ top: lastScrollY.current });
    }

    return () => {
      html.classList.remove("menu-open");
      body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header__bar">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <img src={`${B}images/ergon-logo-header.png`} alt="ERGON Foundation" className="brand__logo" />
            <span className="brand__word">
              <BrandName className="brand-wordmark" />
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
            <NavLink to="/donate#payment-details" className="btn btn--gold btn--sm">
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
      <nav className={`nav--mobile ${open ? "is-open" : ""}`} aria-hidden={!open} data-lenis-prevent>
        <div className="nav__header">
          <img src={`${B}images/ergon-logo-header.png`} alt="ERGON Foundation" className="nav__logo" />
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
          <NavLink to="/donate#payment-details" className="nav__donate" onClick={() => setOpen(false)}>
            Donate Now <DonateHeartIcon />
          </NavLink>
          <p className="nav__copyright">&copy; {new Date().getFullYear()} <BrandName />. All rights reserved.</p>
        </div>
      </nav>
    </>
  );
}
