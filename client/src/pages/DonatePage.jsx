import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { BankIcon, CopyIcon, DonateHeartIcon, ShieldCheckIcon, LockIcon, DocReceiptIcon, GraduationCapIcon, PawIcon, LeafIcon } from "../components/Icons.jsx";
import { BANK_DETAILS } from "../data/content.js";

const AMOUNTS = [500, 1000, 2500, 5000];
const IMPACT = [
  { icon: GraduationCapIcon, amt: "₹1,000", text: "supports a month of school essentials for one EduSPro child." },
  { icon: PawIcon, amt: "₹2,500", text: "covers rescue, treatment and shelter for an injured animal." },
  { icon: LeafIcon, amt: "₹5,000", text: "plants and maintains a small grove for a village community." },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState("");

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <>
      <PageHero crumb="Donate" eyebrow="Give With Love" title="Your Gift, Rooted In Good Deeds" sub="100% of eligible donations go directly to the cause. Every contribution — big or small — helps people, pets and the planet." />

      <section className="section section--paper">
        <div className="wrap grid-2" style={{ alignItems: "flex-start" }}>
          <Reveal as="left">
            <div className="form-card">
              <div className="eyebrow"><DonateHeartIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />One-Time Gift</div>
              <h3 className="h-sm">Choose An Amount</h3>
              <div className="amount-grid">
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
                  onChange={(e) => { setCustom(e.target.value); setAmount(Number(e.target.value) || 0); }}
                />
              </div>
              <button className="btn btn--primary btn--block mt-24" type="button">
                Donate ₹{amount ? amount.toLocaleString("en-IN") : "0"} Now <DonateHeartIcon />
              </button>
              <p style={{ fontSize: "0.78rem", color: "var(--ink-500)", marginTop: 12, textAlign: "center" }}>
                Secured checkout · 80G tax benefit eligible
              </p>
            </div>

            <div className="mt-32 trust-strip" style={{ flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
              <div className="trust-item"><ShieldCheckIcon /><div><b>100% Transparent</b><span>We ensure transparency in every step.</span></div></div>
              <div className="trust-item"><LockIcon /><div><b>Secure Donations</b><span>Your donation is safe and protected.</span></div></div>
              <div className="trust-item"><DocReceiptIcon /><div><b>Tax Benefits</b><span>80G applicable for eligible donations.</span></div></div>
            </div>
          </Reveal>

          <Reveal as="right" delay={0.1}>
            <div className="bank-card">
              <div className="eyebrow" style={{ color: "var(--gold-300)" }}><BankIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Bank Transfer</div>
              <h3 className="h-sm" style={{ color: "var(--cream-50)" }}>Direct Deposit Details</h3>
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
              <h3 className="h-sm">What Your Gift Does</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
                {IMPACT.map((it, i) => (
                  <div className="flex gap-16" key={i} style={{ alignItems: "flex-start" }}>
                    <div className="icon-badge" style={{ marginBottom: 0, flex: "none" }}><it.icon /></div>
                    <p style={{ fontSize: "0.92rem", color: "var(--ink-700)" }}><b style={{ color: "var(--forest-800)" }}>{it.amt}</b> {it.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
