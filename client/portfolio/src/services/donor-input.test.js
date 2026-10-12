import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizePhoneInput, normalizePanInput, restrictUtrInput, restrictAmountInput } from './donor-input.js';

test('accepts phone digits and an optional leading country prefix', () => {
  assert.equal(normalizePhoneInput(' +91 84385-40850'), '+918438540850');
  assert.equal(normalizePhoneInput('84385abc40850', '84385'), '84385');
  assert.equal(normalizePhoneInput('1'.repeat(20)).length, 15);
});

test('amount accepts two decimal places and refuses signs, exponents, and excess values', () => {
  assert.equal(restrictAmountInput('1,234.50', ''), '1234.50');
  assert.equal(restrictAmountInput('12.345', '12.34'), '12.34');
  assert.equal(restrictAmountInput('-12', '12'), '12');
  assert.equal(restrictAmountInput('1e3', '1'), '1');
  assert.equal(restrictAmountInput('100000001', '10000000'), '10000000');
});

test('UTR and PAN reject unsupported characters without changing identifiers', () => {
  assert.equal(restrictUtrInput('UTR-12/34', ''), 'UTR-12/34');
  assert.equal(restrictUtrInput('UTR-12!', 'UTR-12'), 'UTR-12');
  assert.equal(normalizePanInput('abcde1234f'), 'ABCDE1234F');
  assert.equal(normalizePanInput('abcde1234f!', 'ABCDE1234F'), 'ABCDE1234F');
});
