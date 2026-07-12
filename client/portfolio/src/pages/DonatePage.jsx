import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import Reveal, { Stagger, StaggerItem } from "../components/Reveal.jsx";
import {
  BankIcon, CopyIcon, DonateHeartIcon, ShieldCheckIcon, LockIcon, DocReceiptIcon, ChevronRightIcon,
  GraduationCapIcon, PawIcon, LeafIcon, CheckIcon, SparkleIcon, TargetIcon, HeartHandsIcon, CloseIcon,
} from "../components/Icons.jsx";
import { PHOTOS } from "../data/photos.js";
import { BANK_DETAILS } from "../data/content.js";

const AMOUNTS = [500, 1000, 2500, 5000];
const FREQUENCIES = ["One-Time", "Monthly", "Yearly"];

const TIERS = [
  { icon: GraduationCapIcon, amt: "₹500/mo", title: "Budding Root", desc: "Supplies a child with school essentials for a month.", color: "var(--primary-light)" },
  { icon: HeartHandsIcon, amt: "₹1,500/mo", title: "Growing Stem", desc: "Sponsors nutrition & health check-ups for 3 children.", color: "var(--primary)" },
  { icon: PawIcon, amt: "₹3,000/mo", title: "Strong Branch", desc: "Covers rescue & shelter for an injured animal.", color: "var(--gold)" },
  { icon: TargetIcon, amt: "₹10,000/mo", title: "Mighty Tree", desc: "Funds a community tree plantation drive.", color: "var(--primary-dark)" },
];

const IMPACT_MAP = [
  { threshold: 100000, icon: LeafIcon, text: "plants an entire grove for a village" },
  { threshold: 50000, icon: PawIcon, text: "runs a full animal rescue operation" },
  { threshold: 25000, icon: GraduationCapIcon, text: "funds 25 children through EduSPro for a month" },
  { threshold: 10000, icon: HeartHandsIcon, text: "provides 200+ meals to communities" },
  { threshold: 5000, icon: LeafIcon, text: "plants & maintains 50 trees" },
  { threshold: 2500, icon: PawIcon, text: "covers rescue & treatment for one animal" },
  { threshold: 1000, icon: GraduationCapIcon, text: "supports a month of school for one child" },
  { threshold: 500, icon: HeartHandsIcon, text: "provides 20 nutritious meals" },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [freq, setFreq] = useState("One-Time");
  const [copied, setCopied] = useState("");
  const [activeTier, setActiveTier] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  useEffect(() => { if (showComingSoon) { const t = setTimeout(() => setShowComingSoon(false), 4000); return () => clearTimeout(t); } }, [showComingSoon]);

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const impactItems = useMemo(() => {
    return IMPACT_MAP.filter((i) => amount >= i.threshold);
  }, [amount]);

  const tierData = useMemo(() => {
    if (!activeTier) return null;
    return TIERS[activeTier];
  }, [activeTier]);

  return (
    <>
      <section className="donation-hero">
        <div className="donation-hero__bg">
          <img src={PHOTOS.ramanathapuramGroup} alt="ERGON Foundation community support" />
        </div>
        <div className="donation-hero__bg-anim" />
        <div className="donation-hero__overlay" />
        <div className="donation-hero__inner">
          <motion.div className="donation-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="donation-hero__breadcrumb">
              <NavLink to="/">Home</NavLink>
              <ChevronRightIcon />
              <span>Donate</span>
            </div>
            <span className="donation-hero__eyebrow">Give With Love</span>
            <h1 className="donation-hero__title">Your Gift, Rooted In Good Deeds</h1>
            <p className="donation-hero__sub">100% of eligible donations go directly to the cause. Every contribution — big or small — helps people, pets and the planet.</p>
            <div className="donation-hero__actions">
              <a href="#donate-form" className="btn btn--gold btn--lg">Make a Donation <DonateHeartIcon /></a>
              <a href="#tiers" className="btn btn--outline">Sponsorship Tiers</a>
            </div>
            <div className="donation-hero__trust">
              <div className="donation-hero__trust-item"><ShieldCheckIcon />100% Transparent</div>
              <div className="donation-hero__trust-item"><LockIcon />Secure Donations</div>
              <div className="donation-hero__trust-item"><DocReceiptIcon />80G Tax Benefit</div>
            </div>
            <div className="donation-hero__progress">
              <div className="donation-hero__progress-bar">
                <motion.div
                  className="donation-hero__progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="donation-hero__progress-meta">
                <span><b>₹34L</b> raised of ₹50L goal</span>
                <span>68%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section id="tiers" className="section section--paper" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal as="up" className="text-center">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Become A Sustainer</div>
            <h2 className="h-lg">Choose Your <span className="text-gold">Sponsorship Tier</span></h2>
            <p className="lede mx-auto mt-16" style={{ maxWidth: 540 }}>
              Monthly giving that creates lasting, measurable impact — pick the tier that speaks to your heart.
            </p>
          </Reveal>
          <Stagger className="donate-tier-grid mt-48">
            {TIERS.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className={`tier-card ${activeTier === i ? "active" : ""}`}
                  style={{ "--tier-color": t.color }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  onClick={() => {
                    setActiveTier(activeTier === i ? null : i);
                    const amtNum = Number(t.amt.replace(/[^0-9]/g, ""));
                    setAmount(amtNum);
                    setCustom("");
                    setFreq("Monthly");
                  }}
                >
                  <div className="tier-card__icon"><t.icon /></div>
                  <div className="tier-card__amt">{t.amt}</div>
                  <h4 className="h-sm">{t.title}</h4>
                  <p>{t.desc}</p>
                  {activeTier === i && (
                    <motion.div
                      className="tier-card__check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckIcon />
                    </motion.div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Donation Form + Impact */}
      <section id="donate-form" className="section section--paper">
          <div className="wrap grid-2 grid-2--top">
          <Reveal as="left">
            <div className="form-card">
              <div className="eyebrow"><DonateHeartIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Make A Donation</div>
              <h3 className="h-sm">Choose Your Gift</h3>

              <div className="freq-toggle mt-16">
                {FREQUENCIES.map((f) => (
                  <button key={f} className={`freq-pill ${freq === f ? "active" : ""}`} onClick={() => setFreq(f)}>
                    {f}
                  </button>
                ))}
              </div>

              <div className="amount-grid mt-16">
                {AMOUNTS.map((a) => (
                  <button key={a} className={`amount-pill ${amount === a && !custom ? "active" : ""}`} onClick={() => { setAmount(a); setCustom(""); }}>
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="field mt-16">
                <label>Or Enter A Custom Amount</label>
                <input
                  type="number"
                  min="1"
                  placeholder="₹"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setAmount(Number(e.target.value) || 0); setActiveTier(null); }}
                />
              </div>

              <div className="donate-summary mt-16">
                <span>{freq} Donation</span>
                <span className="donate-summary__amt">₹{amount ? amount.toLocaleString("en-IN") : "0"}</span>
              </div>

              <button className="btn btn--primary btn--block mt-24" type="button" onClick={() => setShowComingSoon(true)}>
                {freq === "Monthly" ? "Subscribe" : freq === "Yearly" ? "Subscribe Annually" : "Donate"} ₹{amount ? amount.toLocaleString("en-IN") : "0"} Now <DonateHeartIcon />
              </button>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 12, textAlign: "center" }}>
                Secured checkout · 80G tax benefit eligible
              </p>
            </div>

            <div className="mt-32 trust-strip trust-strip--stacked">
              <div className="trust-item"><ShieldCheckIcon /><div><b>100% Transparent</b><span>We ensure transparency in every step.</span></div></div>
              <div className="trust-item"><LockIcon /><div><b>Secure Donations</b><span>Your donation is safe and protected.</span></div></div>
              <div className="trust-item"><DocReceiptIcon /><div><b>Tax Benefits</b><span>80G applicable for eligible donations.</span></div></div>
            </div>
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <AnimatePresence mode="wait">
              {tierData ? (
                <motion.div
                  key="tier-active"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="tier-impact-card"
                  style={{ background: `linear-gradient(135deg, ${tierData.color}15, ${tierData.color}08)` }}
                >
                  <div className="tier-impact-card__icon" style={{ background: tierData.color, color: "white" }}>
                    <tierData.icon />
                  </div>
                  <h3 className="h-md" style={{ color: tierData.color }}>{tierData.title}</h3>
                  <div className="tier-impact-card__amt">{tierData.amt}</div>
                  <p>{tierData.desc}</p>
                  <div className="divider" />
                  <div className="flex gap-8" style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                    <SparkleIcon style={{ width: 16, height: 16, flex: "none", color: "var(--gold)" }} />
                    Your monthly gift creates sustained, predictable impact.
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="impact-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="bank-card">
                    <div className="eyebrow" style={{ color: "var(--gold-light)" }}><BankIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Bank Transfer</div>
                    <h3 className="h-sm" style={{ color: "var(--secondary)" }}>Direct Deposit Details</h3>
                    <div className="mt-16">
                      {BANK_DETAILS.map((b) => (
                        <div className="bank-row" key={b.label}>
                          <span>{b.label}</span>
                          <span>
                            {b.value}
                            <button className="copy-btn" onClick={() => copy(b.label, b.value)}>
                              {copied === b.label ? "Copied" : <CopyIcon style={{ width: 12, height: 12, verticalAlign: -1 }} />}
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card mt-32">
                    <h3 className="h-sm">Your Impact At ₹{amount ? amount.toLocaleString("en-IN") : "0"}</h3>
                    {impactItems.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
                        {impactItems.map((it, i) => (
                          <motion.div
                            className="flex gap-16"
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            style={{ alignItems: "flex-start" }}
                          >
                            <div className="icon-badge" style={{ marginBottom: 0, flex: "none", width: 42, height: 42 }}>
                              <it.icon style={{ width: 20, height: 20 }} />
                            </div>
                            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 5 }}>
                              <b style={{ color: "var(--text)" }}>₹{it.threshold.toLocaleString("en-IN")}+</b> {it.text}.
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 16 }}>
                        Select an amount above to see the impact your gift will create.
                      </p>
                    )}
                    <div style={{ marginTop: 18, padding: "16px 18px", background: "var(--secondary)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <b style={{ color: "var(--primary)" }}>100%</b> of your donation goes directly to programme activities.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* Other Ways To Give */}
      <section className="section" style={{ background: "var(--secondary)" }}>
        <div className="wrap">
          <Reveal as="up" className="text-center">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Other Ways To Give</div>
            <h2 className="h-lg">Beyond <span className="text-gold">Money</span></h2>
          </Reveal>
          <Stagger className="grid-3 mt-48">
            <StaggerItem>
              <div className="card text-center" style={{ padding: "40px 28px" }}>
                <div className="icon-badge mx-auto"><HeartHandsIcon /></div>
                <h3 className="h-sm">Volunteer Your Time</h3>
                <p className="lede mt-8" style={{ fontSize: "0.9rem" }}>Your skills and time are just as valuable as financial support.</p>
                <NavLink to="/get-involved" className="btn btn--ghost btn--sm mt-16">Get Involved</NavLink>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center" style={{ padding: "40px 28px" }}>
                <div className="icon-badge mx-auto"><TargetIcon /></div>
                <h3 className="h-sm">Corporate Sponsorship</h3>
                <p className="lede mt-8" style={{ fontSize: "0.9rem" }}>Partner with us through CSR initiatives and employee engagement.</p>
                <NavLink to="/contact" className="btn btn--ghost btn--sm mt-16">Contact Us</NavLink>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center" style={{ padding: "40px 28px" }}>
                <div className="icon-badge mx-auto"><LeafIcon /></div>
                <h3 className="h-sm">Fundraise For Us</h3>
                <p className="lede mt-8" style={{ fontSize: "0.9rem" }}>Organise a fundraiser in your community or workplace.</p>
                <NavLink to="/contact" className="btn btn--ghost btn--sm mt-16">Learn More</NavLink>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="wrap">
          <Reveal as="scale">
            <div className="cta-banner">
              <div className="cta-banner__inner">
                <div className="eyebrow" style={{ color: "var(--gold-light)", justifyContent: "center" }}>Every Gift Matters</div>
                <h2 className="h-lg">Your Contribution Creates Ripples That Last Generations.</h2>
                <p>Whether it's ₹500 or ₹50,000 — every rupee is a seed planted in the soil of hope.</p>
                <div className="hero__cta">
                  <NavLink to="/get-involved" className="btn btn--gold btn--lg">Join The Mission <DonateHeartIcon /></NavLink>
                  <NavLink to="/causes" className="btn btn--white">Explore Our Causes <LeafIcon /></NavLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {showComingSoon && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
              <button className="modal__close" onClick={() => setShowComingSoon(false)}><CloseIcon /></button>
              <div className="icon-badge mx-auto" style={{ background: "var(--gold)", color: "var(--text)" }}><DonateHeartIcon /></div>
              <h3 className="h-md mt-16" style={{ textAlign: "center" }}>Online Payment Coming Soon</h3>
              <p className="mt-8" style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                We're setting up our secure payment gateway.<br/>
                Until then, please use the bank transfer details on this page.
              </p>
              <button className="btn btn--primary btn--block mt-24" onClick={() => setShowComingSoon(false)}>Got It</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
