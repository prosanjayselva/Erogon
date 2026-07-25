import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import { PinIcon, MailIcon, PhoneIcon, CheckIcon, MenuFacebook, MenuX, MenuLinkedin, MenuInstagram, MenuYoutube } from "../components/Icons.jsx";
import { PHOTOS } from "../data/photos.js";
import { CONTACT } from "../data/content.js";
import api from "../api/client.js";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", subject: "", message: "" });
  const setField = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/contacts", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => { setForm({ fullName: "", email: "", phone: "", subject: "", message: "" }); setSent(false); setError(""); };

  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <motion.div className="contact-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="contact-hero__eyebrow">Reach Us</span>
            <h1 className="contact-hero__title">We'd Love To Hear From You</h1>
            <p className="contact-hero__sub">Questions about a project, a sponsorship, or how to get involved — the ERGON team replies personally.</p>

            <div className="contact-hero__map mt-32">
              <div style={{ textAlign: "center" }}>
                <PinIcon />
                <p>Kodambakkam, Chennai — Tamil Nadu</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-hero__cards" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="contact-hero__card">
              <div className="contact-hero__card-icon"><PinIcon /></div>
              <div>
                <h4>Office Address</h4>
                {CONTACT.address.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
            <div className="contact-hero__card">
              <div className="contact-hero__card-icon"><MailIcon /></div>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <a href={`mailto:${CONTACT.secretaryEmail}`}>{CONTACT.secretaryEmail}</a>
              </div>
            </div>
            <div className="contact-hero__card">
              <div className="contact-hero__card-icon"><PhoneIcon /></div>
              <div>
                <h4>Mobile</h4>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
              </div>
            </div>
            <div className="contact-hero__card">
              <div className="contact-hero__card-icon" style={{ background: "var(--gold)", color: "white" }}><MenuFacebook /></div>
              <div>
                <h4>Connect With Us</h4>
                <p>Follow us on social media for updates and stories.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: "flex-start" }}>
          <Reveal as="left">
            <div className="eyebrow">Office Address</div>
            <h2 className="h-lg">Get In Touch</h2>

            <div className="mt-32" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { icon: PinIcon, title: "Office Address", content: CONTACT.address.map((l, i) => <span key={i} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}>{l}</span>) },
                { icon: MailIcon, title: "Email", content: <><a href={`mailto:${CONTACT.email}`} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.email}</a><a href={`mailto:${CONTACT.secretaryEmail}`} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.secretaryEmail}</a></> },
                { icon: PhoneIcon, title: "Mobile", content: <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.phone}</a> },
              ].map((item, i) => (
                <div className="flex gap-16" style={{ alignItems: "flex-start" }} key={i}>
                  <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><item.icon /></div>
                  <div>
                    <b style={{ display: "block", color: "var(--text)", marginBottom: 2 }}>{item.title}</b>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="eyebrow mt-48">Connect With Us</div>
            <div className="footer-social" style={{ marginTop: 8 }}>
              <a href={CONTACT.social.facebook} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuFacebook /></a>
              <a href={CONTACT.social.x} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuX /></a>
              <a href={CONTACT.social.linkedin} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuLinkedin /></a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuInstagram /></a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuYoutube /></a>
            </div>

            <PhotoFrame src={PHOTOS.ramanathapuramGroup} alt="ERGON Foundation" ratio="16/9" caption="ERGON Foundation - Kodambakkam, Chennai" />
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <div className="form-card">
              {sent ? (
                <div className="text-center" style={{ padding: "40px 0" }}>
                  <div className="icon-badge mx-auto" style={{ background: "var(--gold)", color: "var(--text)" }}><CheckIcon /></div>
                  <h3 className="h-md mt-16">Message Sent</h3>
                  <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Thank you for reaching out — we'll respond within 1–2 business days.</p>
                  <button className="btn btn--ghost mt-24" onClick={resetForm}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="h-sm">Send A Message</h3>
                  {error && <p className="form-error">{error}</p>}
                  <div className="form-grid mt-16">
                    <div className="field"><label>Full Name</label><input required value={form.fullName} onChange={setField("fullName")} /></div>
                    <div className="field"><label>Email ID</label><input type="email" required value={form.email} onChange={setField("email")} /></div>
                    <div className="field"><label>Phone <span className="opt">(optional)</span></label><input value={form.phone} onChange={setField("phone")} /></div>
                    <div className="field">
                      <label>Subject</label>
                      <select value={form.subject} onChange={setField("subject")}><option value="">Select a topic</option><option>General Enquiry</option><option>Donation</option><option>Volunteering</option><option>Partnership</option><option>Media</option></select>
                    </div>
                    <div className="field full"><label>Message</label><textarea required placeholder="How can we help?" value={form.message} onChange={setField("message")} /></div>
                  </div>
                  <button type="submit" className="btn btn--primary btn--block mt-24" disabled={sending}>{sending ? "Sending…" : "Send Message"} <CheckIcon /></button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
