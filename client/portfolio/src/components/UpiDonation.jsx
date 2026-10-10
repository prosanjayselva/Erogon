import { useEffect, useState } from "react";
import { MailIcon, WhatsAppIcon } from "./Icons.jsx";
import { DONATION_EMAIL_URL, DONATION_WHATSAPP_URL, UPI_QR_IMAGE, UPI_QR_SHA256 } from "../data/payments.js";
import { loadApprovedQr } from "../services/payment-security.js";

export default function UpiDonation() {
  const [imageFailed, setImageFailed] = useState(false);
  const [verifiedImage, setVerifiedImage] = useState(null);
  useEffect(() => {
    if (!UPI_QR_IMAGE) return;
    const controller = new AbortController();
    let objectUrl;
    loadApprovedQr(UPI_QR_IMAGE, UPI_QR_SHA256, controller.signal).then(blob => {
      if (controller.signal.aborted) return;
      objectUrl = URL.createObjectURL(blob);
      setVerifiedImage(objectUrl);
    }).catch(() => {
      if (!controller.signal.aborted) setImageFailed(true);
    });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section className="donation-upi" aria-labelledby="upi-heading">
      <h2 id="upi-heading" className="h-sm">UPI QR Code – ERGON Foundation</h2>
      <div className="donation-qr">
        {verifiedImage && !imageFailed ? (
          <img src={verifiedImage} alt="ERGON Foundation UPI payment QR code" onError={() => setImageFailed(true)} />
        ) : <div className="donation-qr-placeholder">[Insert ERGON Foundation UPI QR Code Here]</div>}
      </div>
      {imageFailed && <p role="status">The UPI QR code is unavailable. Please use SBI Collect or bank transfer.</p>}
      <p className="donation-link-note">Before confirming payment, check the recipient name and payment details in your banking or UPI app.</p>
      <p>After donating via the UPI QR code, kindly share your Name, Donation Amount, Transaction Date, UPI Transaction ID/UTR, Mobile Number, Email Address, and PAN (if applicable) along with the payment screenshot (if available).</p>
      <div className="donation-contact">
        <p><WhatsAppIcon className="donation-contact-icon donation-contact-icon--whatsapp" aria-hidden="true" /><span>WhatsApp: <a href={DONATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 84385 40850</a></span></p>
        <p><MailIcon className="donation-contact-icon" aria-hidden="true" /><span>Email: <a href={DONATION_EMAIL_URL}>admin@ergonfoundation.org</a></span></p>
      </div>
    </section>
  );
}
