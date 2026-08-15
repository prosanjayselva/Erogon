import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { BrandText } from "../components/BrandName.jsx";
import { PinIcon, MailIcon, PhoneIcon, CheckIcon, MenuFacebook, BrandX, MenuLinkedin, MenuInstagram, MenuYoutube } from "../components/Icons.jsx";
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
        <div className="container contact-hero__inner">
          <motion.div className="contact-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="contact-hero__title">We'd Love To Hear From You</h1>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="right">
            <div className="contact-split">
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
              <iframe
                className="contact-split__map"
                src="https://www.google.com/maps?q=Kodambakkam,+Chennai,+Tamil+Nadu&output=embed"
                title="ERGON Foundation — Kodambakkam, Chennai"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal as="left">
            <div className="text-center" style={{ marginTop: 72 }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>Get In Touch</div>
              <h2 className="h-lg">Our Contact Details</h2>

              <div className="contact-details">
                {[
                  { icon: PinIcon, title: "Office Address", content: CONTACT.address.map((l, i) => <span key={i} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}><BrandText>{l}</BrandText></span>) },
                  { icon: MailIcon, title: "Email", content: <><a href={`mailto:${CONTACT.email}`} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.email}</a><a href={`mailto:${CONTACT.secretaryEmail}`} style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.secretaryEmail}</a></> },
                  { icon: PhoneIcon, title: "Mobile", content: <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>{CONTACT.phone}</a> },
                ].map((item, i) => (
                  <div className="contact-detail" key={i}>
                    <div className="icon-badge mx-auto" style={{ marginBottom: 12 }}><item.icon /></div>
                    <b style={{ display: "block", color: "var(--text)" }}>{item.title}</b>
                    <div style={{ marginTop: 6 }}>{item.content}</div>
                  </div>
                ))}
              </div>

              <div className="eyebrow" style={{ justifyContent: "center", marginTop: 40 }}>Connect With Us</div>
              <div className="footer-social" style={{ marginTop: 12, justifyContent: "center" }}>
                <a href={CONTACT.social.facebook} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuFacebook /></a>
                <a href={CONTACT.social.x} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><BrandX /></a>
                <a href={CONTACT.social.linkedin} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuLinkedin /></a>
                <a href={CONTACT.social.instagram} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuInstagram /></a>
                <a href={CONTACT.social.youtube} target="_blank" rel="noreferrer" style={{ borderColor: "var(--divider)", color: "var(--primary)" }}><MenuYoutube /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
