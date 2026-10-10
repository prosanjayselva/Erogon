import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { APPROVED_QR_FILENAME, APPROVED_QR_SHA256 } from "../data/qr-approval.js";
import { approvedPaymentLink, loadApprovedQr, verifyQrBytes } from "./payment-security.js";

const png = new Uint8Array(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jfWQAAAAASUVORK5CYII=", "base64"));
const digest = await crypto.subtle.digest("SHA-256", png);
const fingerprint = Buffer.from(digest).toString("hex");

test("allows only exact approved payment/contact destinations", () => {
  assert.equal(approvedPaymentLink("https://wa.me/918438540850"), "https://wa.me/918438540850");
  for (const url of ["javascript:alert(1)", "https://www.onlinesbi.sbi.evil.example/", "http://wa.me/918438540850", "https://wa.me/911234567890"]) {
    assert.throws(() => approvedPaymentLink(url));
  }
});

test("accepts matching approved PNG bytes", async () => {
  await verifyQrBytes(png, fingerprint);
});

test("client JPEG matches its pinned approval; changing it is rejected", async () => {
  const jpeg = new Uint8Array(await readFile(new URL(`../../public/assets/images/${APPROVED_QR_FILENAME}`, import.meta.url)));
  assert.equal(await verifyQrBytes(jpeg, APPROVED_QR_SHA256), "image/jpeg");
  const altered = jpeg.slice();
  altered[20] ^= 1;
  await assert.rejects(verifyQrBytes(altered, APPROVED_QR_SHA256));
});

test("rejects missing/malformed approval and substituted image bytes", async () => {
  for (const hash of ["", "not-a-hash", "0".repeat(64)]) await assert.rejects(verifyQrBytes(png, hash));
  const altered = png.slice();
  altered[20] ^= 1;
  await assert.rejects(verifyQrBytes(altered, fingerprint));
});

test("rejects unsupported formats and oversized images", async () => {
  await assert.rejects(verifyQrBytes(new TextEncoder().encode("<svg></svg>"), fingerprint));
  await assert.rejects(verifyQrBytes(new Uint8Array(2 * 1024 * 1024 + 1), fingerprint));
});

test("QR fetching rejects remote sources, redirects and incorrect responses", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.window = { location: { href: "https://ergon.example/#/donate", origin: "https://ergon.example" } };
  let calls = 0;
  try {
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(url.origin, window.location.origin);
      assert.equal(options.redirect, "error");
      assert.equal(options.credentials, "omit");
      assert.equal(options.cache, "no-store");
      assert.equal(options.referrerPolicy, "no-referrer");
      return new Response(png, { headers: { "content-type": "image/png" } });
    };
    await assert.rejects(loadApprovedQr("https://evil.example/assets/images/upi-qr-ergon.png", fingerprint));
    await assert.rejects(loadApprovedQr("/assets/images/upi-qr-ergon.png?replacement=1", fingerprint));
    await assert.rejects(loadApprovedQr("/assets/images/upi-qr-ergon.png", ""));
    assert.equal(calls, 0);
    const blob = await loadApprovedQr("/assets/images/upi-qr-ergon.png", fingerprint);
    assert.deepEqual(new Uint8Array(await blob.arrayBuffer()), png);
    globalThis.fetch = async () => new Response(png, { headers: { "content-type": "image/svg+xml" } });
    await assert.rejects(loadApprovedQr("/assets/images/upi-qr-ergon.png", fingerprint));
    globalThis.fetch = async () => { throw new Error("redirect rejected"); };
    await assert.rejects(loadApprovedQr("/assets/images/upi-qr-ergon.png", fingerprint));
    globalThis.fetch = async () => new Response(new Uint8Array(2 * 1024 * 1024 + 1), { headers: { "content-type": "image/png" } });
    await assert.rejects(loadApprovedQr("/assets/images/upi-qr-ergon.png", fingerprint));
  } finally {
    globalThis.fetch = originalFetch;
    delete globalThis.window;
  }
});
