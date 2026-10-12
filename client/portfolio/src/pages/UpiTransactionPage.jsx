import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";
import DonationContact from "../components/DonationContact.jsx";

const initialForm = { name: "", email: "", phone: "", amount: "", transactionDate: "", transactionNumber: "", pan: "" };

export default function UpiTransactionPage() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const setField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      await api.post("/donors/upi", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        amount: Number(form.amount),
        transactionDate: form.transactionDate,
        transactionNumber: form.transactionNumber.trim(),
        ...(form.pan.trim() ? { pan: form.pan.trim().toUpperCase() } : {}),
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to submit your details. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section donation-payment-page">
      <div className="container--narrow">
        <div className="donation-transaction-card">
          <Link to="/donate" className="donation-back-link">← Back to donation options</Link>
          <h1 className="h-lg">Submit UPI Transaction Details</h1>
          <p>Complete this form after making your UPI payment. Submitting details does not confirm that a payment was received; our team will verify it.</p>
          {submitted ? (
            <div role="status" className="donation-submit-success">
              <h2 className="h-sm">Details submitted</h2>
              <p>Thank you. Please send your payment screenshot by WhatsApp or email so our team can verify the transaction.</p>
              <DonationContact />
            </div>
          ) : (
            <form onSubmit={submit} className="donation-transaction-form">
              {error && <p role="alert" className="form-error">{error}</p>}
              <div className="form-grid">
                <div className="field"><label htmlFor="donor-name">Full name</label><input id="donor-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={form.name} onChange={setField("name")} /></div>
                <div className="field"><label htmlFor="donor-email">Email address</label><input id="donor-email" name="email" type="email" autoComplete="email" required maxLength={255} value={form.email} onChange={setField("email")} /></div>
                <div className="field"><label htmlFor="donor-phone">Mobile number</label><input id="donor-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} maxLength={16} pattern="\+?[0-9]{10,15}" value={form.phone} onChange={setField("phone")} /></div>
                <div className="field"><label htmlFor="donor-amount">Donation amount (₹)</label><input id="donor-amount" name="amount" type="number" inputMode="decimal" min="0.01" max="100000000" step="0.01" required value={form.amount} onChange={setField("amount")} /></div>
                <div className="field"><label htmlFor="donor-date">Transaction date</label><input id="donor-date" name="transactionDate" type="date" required max={new Date(Date.now() + 330 * 60 * 1000).toISOString().slice(0, 10)} value={form.transactionDate} onChange={setField("transactionDate")} /></div>
                <div className="field"><label htmlFor="donor-utr">UPI transaction ID / UTR</label><input id="donor-utr" name="transactionNumber" required minLength={6} maxLength={100} pattern="[A-Za-z0-9/\-]+" autoCapitalize="off" autoCorrect="off" spellCheck="false" value={form.transactionNumber} onChange={setField("transactionNumber")} /></div>
                <div className="field full"><label htmlFor="donor-pan">PAN <span className="opt">(optional)</span></label><input id="donor-pan" name="pan" maxLength={10} pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" autoCapitalize="characters" autoCorrect="off" spellCheck="false" value={form.pan} onChange={setField("pan")} /></div>
              </div>
              <p className="donation-form-note">Please check your transaction details before submitting. Send your screenshot separately through WhatsApp or email.</p>
              <button type="submit" className="btn btn--primary" disabled={sending}>{sending ? "Submitting…" : "Submit transaction details"}</button>
              <DonationContact />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
