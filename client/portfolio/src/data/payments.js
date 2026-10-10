import { approvedPaymentLink } from "../services/payment-security.js";

export const SBI_COLLECT_URL = approvedPaymentLink("https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?saralID=-910540823");
export const DONATION_WHATSAPP_URL = approvedPaymentLink("https://wa.me/918438540850");
export const DONATION_EMAIL_URL = approvedPaymentLink("mailto:admin@ergonfoundation.org");
export const UPI_QR_SHA256 = import.meta.env.VITE_UPI_QR_SHA256 || "";

// Only a locally supplied, Foundation-approved asset may be used for payment.
const qrAssets = import.meta.glob("/public/assets/images/upi-qr-ergon.png", { eager: true, query: "?url", import: "default" });
export const UPI_QR_IMAGE = Object.keys(qrAssets).length
  ? `${import.meta.env.BASE_URL}assets/images/upi-qr-ergon.png`
  : null;
