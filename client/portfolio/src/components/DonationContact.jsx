import { MailIcon, WhatsAppIcon } from "./Icons.jsx";
import { DONATION_EMAIL_URL, DONATION_WHATSAPP_URL } from "../data/payments.js";

export default function DonationContact() {
  return (
    <div className="donation-contact">
      <p><WhatsAppIcon className="donation-contact-icon donation-contact-icon--whatsapp" aria-hidden="true" /><span>WhatsApp: <a href={DONATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 84385 40850</a></span></p>
      <p><MailIcon className="donation-contact-icon" aria-hidden="true" /><span>Email: <a href={DONATION_EMAIL_URL}>admin@ergonfoundation.org</a></span></p>
    </div>
  );
}
