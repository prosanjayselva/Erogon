import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAsset } from '@/lib/assets';
import { useReveal } from '@/hooks/use-reveal';
import { useSiteStore } from '@/store/site-store';

export function Layout() {
  const location = useLocation();
  const { content, mobileNavOpen, toggleMobileNav, closeMobileNav } = useSiteStore((state) => ({
    content: state.content,
    mobileNavOpen: state.mobileNavOpen,
    toggleMobileNav: state.toggleMobileNav,
    closeMobileNav: state.closeMobileNav,
  }));

  useReveal(location.pathname);

  useEffect(() => {
    closeMobileNav();
  }, [closeMobileNav, location.pathname]);

  if (!content) {
    return null;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="shell header-row">
          <NavLink className="brand-lockup" to="/">
            <img src={getAsset('logo')} alt="ERGON Foundation" />
          </NavLink>

          <nav className="desktop-nav" aria-label="Primary">
            {content.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <NavLink className="button button-primary" to="/donate">
              Donate Now
            </NavLink>
            <button className="menu-toggle" type="button" onClick={toggleMobileNav} aria-label="Toggle menu">
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`}>
          {content.navigation.map((item) => (
            <NavLink key={item.href} to={item.href} className="mobile-link" onClick={closeMobileNav}>
              {item.label}
            </NavLink>
          ))}
          <NavLink className="button button-primary mobile-donate" to="/donate" onClick={closeMobileNav}>
            Donate Now
          </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <img src={getAsset('logo')} alt="ERGON Foundation" />
            <p>{content.footer.about}</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              {content.footer.quickLinks.map((item) => (
                <NavLink key={item.href} to={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>{content.footer.address.join(', ')}</p>
            <p>{content.footer.email}</p>
            <p>{content.footer.phone}</p>
          </div>

          <div>
            <h3>Stay Connected</h3>
            <p>{content.footer.newsletterLabel}</p>
            <div className="social-row">
              {content.footer.socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="shell footer-bottom">
          <span>© 2026 ERGON Foundation. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="mailto:admin@ergonfoundation.org">Privacy Policy</a>
            <a href="mailto:admin@ergonfoundation.org">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
