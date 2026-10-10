# Donation QR asset

Place the Foundation-approved UPI QR image here as `upi-qr-ergon.png`, then rebuild the portfolio. Until supplied, the donation page shows a labeled placeholder; it never generates payment instructions or a QR destination.

After independently confirming the QR payee and UPI ID with the Foundation, calculate the approved file's fingerprint:

```powershell
(Get-FileHash -Algorithm SHA256 -LiteralPath client/portfolio/public/assets/images/upi-qr-ergon.png).Hash.ToLower()
```

Set `VITE_UPI_QR_SHA256` to that 64-character value in the portfolio build environment and rebuild. The fingerprint is public, not a secret. Do not automatically recalculate it during deployment: replacing the image must require a fresh approval. PNG only, maximum 2 MiB. The browser checks same-origin loading, rejects redirects, verifies PNG bytes and SHA-256, and displays only those verified bytes. Failed verification hides the QR.

Deploy over HTTPS. Protect source code, build configuration, and hosting access: an attacker who can replace both the application and its fingerprint can bypass a browser-side integrity check. A matching fingerprint proves that the file is unchanged, not that its payee is legitimate or a payment has succeeded.

Before publishing the image, scan it and confirm the payee and UPI ID with the Foundation. Do not substitute an unverified QR code. Keep the full QR code and its quiet zone visible.
