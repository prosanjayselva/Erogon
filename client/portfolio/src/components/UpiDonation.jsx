import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DonationContact from "./DonationContact.jsx";
import { UPI_QR_IMAGE, UPI_QR_SHA256 } from "../data/payments.js";
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
      <p className="donation-upi-instructions">After donating via the UPI QR code, <Link to="/donate/transaction">click here</Link> to submit your transaction details. Please also WhatsApp or email your payment screenshot for verification.</p>
      {verifiedImage && !imageFailed && <p className="donation-qr-full-size"><a href={verifiedImage} target="_blank" rel="noopener noreferrer">Open full-size QR code</a></p>}
      {imageFailed && <p role="status">The UPI QR code is unavailable. Please use SBI Collect or bank transfer.</p>}
      <p className="donation-link-note">Before confirming payment, check the recipient name and payment details in your banking or UPI app.</p>
      <DonationContact />
    </section>
  );
}
