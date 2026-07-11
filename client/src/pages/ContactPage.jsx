import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { PinIcon, MailIcon, PhoneIcon, CheckIcon, MenuFacebook, MenuX, MenuLinkedin, MenuInstagram, MenuYoutube } from "../components/Icons.jsx";
import { CONTACT } from "../data/content.js";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero crumb="Contact" eyebrow="Reach Us" title="We'd Love To Hear From You" sub="Questions about a project, a sponsorship, or how to get involved — the ERGON team replies personally." />

      <section className="section section--paper">
        <div className="wrap grid-2" style={{ alignItems: "flex-start" }}>
          <Reveal as="left">
            <div className="eyebrow">Office Address</div>
            <h2 className="h-lg">Get In Touch</h2>

            <div className="mt-32" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="flex gap-16" style={{ alignItems: "flex-start" }}>
                <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><PinIcon /></div>
                <div>
                  <b style={{ display: "block", color: "var(--forest-900)" }}>Office Address</b>
                  {CONTACT.address.map((l, i) => <span key={i} style={{ display: "block", color: "var(--ink-500)", fontSize: "0.92rem" }}>{l}</span>)}
                </div>
              </div>
              <div className="flex gap-16" style={{ alignItems: "flex-start" }}>
                <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><MailIcon /></div>
                <div>
                  <b style={{ display: "block", color: "var(--forest-900)" }}>Email</b>
                  <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--ink-500)", fontSize: "0.92rem" }}>{CONTACT.email}</a>
                </div>
              </div>
              <div className="flex gap-16" style={{ alignItems: "flex-start" }}>
                <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><PhoneIcon /></div>
                <div>
                  <b style={{ display: "block", color: "var(--forest-900)" }}>Mobile</b>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} style={{ color: "var(--ink-500)", fontSize: "0.92rem" }}>{CONTACT.phone}</a>
                </div>
              </div>
            </div>

            <div className="eyebrow mt-48">Connect With Us</div>
            <div className="footer-social" style={{ marginTop: 8 }}>
              <a href={CONTACT.social.facebook} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line)", color: "var(--forest-800)" }}><MenuFacebook /></a>
              <a href={CONTACT.social.x} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line)", color: "var(--forest-800)" }}><MenuX /></a>
              <a href={CONTACT.social.linkedin} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line)", color: "var(--forest-800)" }}><MenuLinkedin /></a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line)", color: "var(--forest-800)" }}><MenuInstagram /></a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line)", color: "var(--forest-800)" }}><MenuYoutube /></a>
            </div>

            <div className="photo-frame mt-32" style={{ aspectRatio: "16/9" }}>
              <div className="pf-mark"><PinIcon /></div>
              <span className="pf-caption">Map — Kodambakkam, Chennai</span>
            </div>
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <div className="form-card">
              {sent ? (
                <div className="center" style={{ padding: "20px 0" }}>
                  <div className="icon-badge mx-auto" style={{ background: "var(--gold-600)", color: "var(--forest-950)" }}><CheckIcon /></div>
                  <h3 className="h-sm">Message Sent</h3>
                  <p style={{ color: "var(--ink-500)", marginTop: 8 }}>Thank you for reaching out — we'll respond within 1–2 business days.</p>
                  <button className="btn btn--ghost btn--sm mt-16" onClick={() => setSent(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <h3 className="h-sm">Send A Message</h3>
                  <div className="form-grid">
                    <div className="field"><label>Full Name</label><input required /></div>
                    <div className="field"><label>Email ID</label><input type="email" required /></div>
                    <div className="field"><label>Phone Number <span className="opt">(optional)</span></label><input /></div>
                    <div className="field">
                      <label>Subject</label>
                      <select defaultValue=""><option value="" disabled>Select a topic</option><option>General Enquiry</option><option>Donation</option><option>Volunteering</option><option>Partnership</option><option>Media</option></select>
                    </div>
                    <div className="field full"><label>Message</label><textarea required placeholder="How can we help?" /></div>
                  </div>
                  <button type="submit" className="btn btn--primary mt-24 btn--block">Send Message <CheckIcon /></button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
