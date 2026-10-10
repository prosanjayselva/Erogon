import { approvedPaymentLink } from "../services/payment-security.js";
import { APPROVED_QR_FILENAME, APPROVED_QR_SHA256 } from "./qr-approval.js";

export const SBI_COLLECT_URL = approvedPaymentLink("https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?saralID=-910540823");
export const DONATION_WHATSAPP_URL = approvedPaymentLink("https://wa.me/918438540850");
export const DONATION_EMAIL_URL = approvedPaymentLink("mailto:admin@ergonfoundation.org");
export const UPI_QR_SHA256 = APPROVED_QR_SHA256;

// Only a locally supplied, Foundation-approved asset may be used for payment.
const qrAssets = import.meta.glob("/public/assets/images/upi-qr-ergon.{png,jpeg}", { eager: true, query: "?url", import: "default" });
export const UPI_QR_IMAGE = Object.hasOwn(qrAssets, `/public/assets/images/${APPROVED_QR_FILENAME}`)
  ? `${import.meta.env.BASE_URL}assets/images/${APPROVED_QR_FILENAME}`
  : null;
