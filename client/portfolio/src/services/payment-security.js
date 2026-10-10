const APPROVED_LINKS = new Set([
  "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?saralID=-910540823",
  "https://wa.me/918438540850",
  "mailto:admin@ergonfoundation.org",
]);

export function approvedPaymentLink(value) {
  if (!APPROVED_LINKS.has(value)) throw new Error("Unapproved payment contact or destination");
  return value;
}

const MAX_QR_BYTES = 2 * 1024 * 1024;
const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const JPEG_SIGNATURE = [255, 216, 255];

export async function verifyQrBytes(bytes, expectedHash) {
  if (!/^[a-f0-9]{64}$/i.test(expectedHash || "")) throw new Error("QR approval fingerprint is missing");
  const imageType = PNG_SIGNATURE.every((value, index) => bytes[index] === value) ? "image/png"
    : JPEG_SIGNATURE.every((value, index) => bytes[index] === value) ? "image/jpeg" : null;
  if (bytes.byteLength > MAX_QR_BYTES || !imageType) {
    throw new Error("Invalid QR image");
  }
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  const actualHash = Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, "0")).join("");
  if (actualHash !== expectedHash.toLowerCase()) throw new Error("QR approval fingerprint does not match");
  return imageType;
}

export async function loadApprovedQr(source, expectedHash, signal) {
  // Validate before fetching: no remote QR provider, redirect, or user-supplied destination.
  if (!/^[a-f0-9]{64}$/i.test(expectedHash || "")) throw new Error("QR approval fingerprint is missing");
  const url = new URL(source, window.location.href);
  const expectedType = url.pathname.endsWith('/assets/images/upi-qr-ergon.png') ? "image/png"
    : url.pathname.endsWith('/assets/images/upi-qr-ergon.jpeg') ? "image/jpeg" : null;
  if (url.origin !== window.location.origin || url.search || url.hash || !expectedType) {
    throw new Error("Unapproved QR source");
  }
  const response = await fetch(url, { signal, redirect: "error", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
  if (!response.ok || response.headers.get("content-type")?.split(";")[0].trim() !== expectedType) throw new Error("Invalid QR response");
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_QR_BYTES) {
        await reader.cancel();
        throw new Error("QR image exceeds size limit");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const verifiedType = await verifyQrBytes(bytes, expectedHash);
  if (verifiedType !== expectedType) throw new Error("QR image type does not match its file extension");
  // Display the exact verified bytes, rather than reloading a potentially changed URL.
  return new Blob([bytes], { type: verifiedType });
}
