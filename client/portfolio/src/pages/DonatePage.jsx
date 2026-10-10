import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { BankIcon, CopyIcon } from "../components/Icons.jsx";
import { BANK_DETAILS } from "../data/content.js";
import { BrandName, BrandText } from "../components/BrandName.jsx";
import SbiDonateLink from "../components/SbiDonateLink.jsx";
import UpiDonation from "../components/UpiDonation.jsx";

export default function DonatePage() {
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const copyTimer = useRef(null);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copy = async (label, value) => {
    try {
      if (!BANK_DETAILS.some(detail => detail.label === label && detail.value === value)) {
        throw new Error("Unapproved bank detail");
      }
      await navigator.clipboard.writeText(value);
      setCopyError("");
      setCopied(label);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
      setCopyError("Unable to copy. Please select and copy the bank detail manually.");
    }
  };

  return (
    <section id="payment-details" className="section donation-payment-page">
      <div className="container">
        <Reveal as="up" className="text-center mb-32">
          <h1 className="h-lg">Donate to ERGON Foundation</h1>
          <p className="lede mx-auto mt-16">Choose SBI Collect, UPI QR code, or bank transfer to make your donation.</p>
        </Reveal>
        <Reveal as="up" className="donation-methods">
          <article className="donation-method" aria-labelledby="sbi-heading">
            <h2 id="sbi-heading" className="h-sm">SBI Collect</h2>
            <p>Donate through the State Bank of India’s SBI Collect portal.</p>
            <SbiDonateLink className="btn btn--primary">Donate via SBI Collect</SbiDonateLink>
            <p className="donation-link-note">Opens SBI Collect in a new tab.</p>
            <UpiDonation />
          </article>
          <article className="bank-card donation-bank" aria-labelledby="bank-heading">
            <h2 id="bank-heading" className="h-sm">Bank Account Details</h2>
            <div className="eyebrow" style={{ color: "var(--gold-light)" }}>
              <BankIcon style={{ width: 16, height: 16, marginRight: 6, verticalAlign: -3 }} />Direct Deposit
            </div>
            <h3 className="h-sm"><BrandName /></h3>
            <div className="mt-16">
              {BANK_DETAILS.map((detail) => (
                <div className="bank-row" key={detail.label}>
                  <span>{detail.label}</span>
                  <span><BrandText>{detail.value}</BrandText><button className="copy-btn" type="button" aria-label={`Copy ${detail.label}`} onClick={() => copy(detail.label, detail.value)}>{copied === detail.label ? "Copied" : <CopyIcon style={{ width: 12, height: 12 }} />}</button></span>
                </div>
              ))}
            </div>
            <p role="status" className="donation-copy-status">{copyError || (copied ? `${copied} copied` : "")}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
