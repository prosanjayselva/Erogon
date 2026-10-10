# Donation QR asset

The client-supplied QR is stored as `upi-qr-ergon.jpeg`, copied byte-for-byte from `payment qr png/Payment qr.jpeg`. The entire image, including the QR border and SBI Payments branding, is preserved. CSS scales it without cropping; a link opens the verified image at full size.

After independently confirming the QR payee and UPI ID with the Foundation, calculate the approved file's fingerprint:

```powershell
(Get-FileHash -Algorithm SHA256 -LiteralPath client/portfolio/public/assets/images/upi-qr-ergon.jpeg).Hash.ToLower()
```

The approved filename and 64-character fingerprint are pinned in `src/data/qr-approval.js`; no environment variable is needed for this supplied image. The fingerprint is public, not a secret. Do not automatically recalculate it during deployment: replacing the image requires review and an explicit fingerprint update, then a rebuild. PNG/JPEG only, maximum 2 MiB. The browser checks same-origin loading, rejects redirects, verifies file signatures, MIME type and SHA-256, and displays only those verified bytes. Failed verification hides the QR.

Deploy over HTTPS. Protect source code, build configuration, and hosting access: an attacker who can replace both the application and its fingerprint can bypass a browser-side integrity check. A matching fingerprint proves that the file is unchanged, not that its payee is legitimate or a payment has succeeded.

Before publishing the image, scan it and confirm the payee and UPI ID with the Foundation. Do not substitute an unverified QR code. Keep the full QR code and its quiet zone visible.
