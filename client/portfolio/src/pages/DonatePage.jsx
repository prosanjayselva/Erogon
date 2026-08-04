import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { BankIcon, CopyIcon } from "../components/Icons.jsx";
import { BANK_DETAILS } from "../data/content.js";
import { BrandName } from "../components/BrandName.jsx";

export default function DonatePage() {
  const [copied, setCopied] = useState("");

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1500);
  };

  return (
    <section id="payment-details" className="section donation-payment-page">
      <div className="container--narrow">
        <Reveal as="up" className="text-center mb-32">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Donate</div>
          <h1 className="h-lg">Bank Transfer Details</h1>
          <p className="lede mx-auto mt-16">Use the verified <BrandName /> account details below to make your donation.</p>
        </Reveal>
        <Reveal as="up">
          <div className="bank-card">
            <div className="eyebrow" style={{ color: "var(--gold-light)" }}>
              <BankIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Direct Deposit
            </div>
            <h2 className="h-sm"><BrandName /></h2>
            <div className="mt-16">
              {BANK_DETAILS.map((detail) => (
                <div className="bank-row" key={detail.label}>
                  <span>{detail.label}</span>
                  <span>{detail.value}<button className="copy-btn" type="button" aria-label={`Copy ${detail.label}`} onClick={() => copy(detail.label, detail.value)}>{copied === detail.label ? "Copied" : <CopyIcon style={{ width: 12, height: 12 }} />}</button></span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
