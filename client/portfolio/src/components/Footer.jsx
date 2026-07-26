import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuFacebook, MenuX, MenuLinkedin, MenuInstagram, MenuYoutube, PinIcon, MailIcon, PhoneIcon } from "./Icons.jsx";
import api from "../api/client.js";
import { NEWSLETTER_CONTENT } from "../data/content.js";

const B = import.meta.env.BASE_URL;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/newsletter", { email });
      setMsg("Subscribed! Thank you.");
      setEmail("");
    } catch (err) {
      if (err.response?.status === 409) {
        setMsg("You're already subscribed.");
      } else {
        setMsg(err.response?.data?.error || "Something went wrong.");
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <NavLink to="/" className="brand">
            <img src={`${B}images/logo.png`} alt="ERGON Foundation" className="brand__logo" />
            <span className="brand__word">
              <b style={{ color: "white" }}>Ergon Foundation</b>
            </span>
          </NavLink>
          <p>A registered charitable trust working across Tamil Nadu and India.</p>
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
            <li><NavLink to="/donate">Donate</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <h5>Contact Us</h5>
          <ul className="footer-contact">
            <li><PinIcon /><span>10/13, 2nd Floor, 1st Street, Dr. Subbarayan Nagar, Kodambakkam, Chennai - 600024</span></li>
            <li><MailIcon /><span>admin@ergonfoundation.org<br />secretary@ergonfoundation.org</span></li>
            <li><PhoneIcon /><span>+91 84385 40850</span></li>
          </ul>
          <h5 style={{ marginTop: 24 }}>{NEWSLETTER_CONTENT.title}</h5>
          <p className="newsletter-copy">{NEWSLETTER_CONTENT.points.join(" • ")}</p>
          <form className="newsletter-form" onSubmit={subscribe}>
            <input type="email" placeholder="Your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Join</button>
          </form>
          {msg && <p style={{ fontSize: "0.8rem", color: "var(--gold)", marginTop: 6 }}>{msg}</p>}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} ERGON Foundation. All Rights Reserved.</span>
        <div className="flex gap-16">
          <NavLink to="/privacy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms &amp; Conditions</NavLink>
        </div>
      </div>
    </footer>
  );
}
