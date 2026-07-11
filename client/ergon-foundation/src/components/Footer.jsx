import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import { MenuFacebook, MenuX, MenuLinkedin, MenuInstagram, MenuYoutube, PinIcon, MailIcon, PhoneIcon } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-about">
          <NavLink to="/" className="brand">
            <Logo className="brand__mark" />
            <span className="brand__word">
              <b style={{ color: "var(--cream-50)" }}>ERGON</b>
              <span>Foundation</span>
            </span>
          </NavLink>
          <p>Rooted in good deeds, we strive to create a compassionate world for people, animals, and the environment.</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/share/14r5MoatD84/" target="_blank" rel="noreferrer" aria-label="Facebook"><MenuFacebook /></a>
            <a href="https://x.com/ERGONFoundation" target="_blank" rel="noreferrer" aria-label="X"><MenuX /></a>
            <a href="https://www.linkedin.com/company/ergon-foundation/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><MenuLinkedin /></a>
            <a href="https://www.instagram.com/ergonfoundation" target="_blank" rel="noreferrer" aria-label="Instagram"><MenuInstagram /></a>
            <a href="https://youtube.com/@ergonfoundation" target="_blank" rel="noreferrer" aria-label="YouTube"><MenuYoutube /></a>
          </div>
        </div>

        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/causes">Our Causes</NavLink></li>
            <li><NavLink to="/eduspro">EduSPro</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/reports">Reports</NavLink></li>
          </ul>
        </div>

        <div>
          <h5>Get Involved</h5>
          <ul>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/get-involved">Volunteer</NavLink></li>
            <li><NavLink to="/get-involved?tab=career">Career Opportunities</NavLink></li>
            <li><NavLink to="/donate">Donate</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>

        <div>
          <h5>Contact Us</h5>
          <ul className="footer-contact">
            <li><PinIcon /><span>10/13, 2nd Floor, 1st Street, Dr. Subbarayan Nagar, Kodambakkam, Chennai&nbsp;-&nbsp;600024</span></li>
            <li><MailIcon /><span>admin@ergonfoundation.org</span></li>
            <li><PhoneIcon /><span>+91 84385 40850</span></li>
          </ul>
          <h5 style={{ marginTop: 22 }}>Stay Connected</h5>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} ERGON Foundation. All Rights Reserved.</span>
        <div className="flex gap-16">
          <NavLink to="/privacy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms &amp; Conditions</NavLink>
        </div>
      </div>
    </footer>
  );
}
