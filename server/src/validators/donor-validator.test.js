import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createUpiDonorSchema } from './index.js';

const valid = {
  name: 'A Donor',
  email: 'donor@example.com',
  phone: '9876543210',
  amount: 500,
  transactionDate: '2026-10-10',
  transactionNumber: 'UTR123456789',
};

test('accepts UPI details and converts the transaction date for storage', () => {
  const parsed = createUpiDonorSchema.parse(valid);
  assert.equal(parsed.transactionDate.toISOString(), '2026-10-10T00:00:00.000Z');
  assert.equal(parsed.transactionNumber, valid.transactionNumber);
});

test('requires a transaction date and UTR; rejects malformed, future and invalid dates', () => {
  for (const patch of [
    { transactionDate: undefined },
    { transactionDate: '2026-02-30' },
    { transactionDate: '2999-01-01' },
    { transactionNumber: '' },
    { transactionNumber: 'bad<script>' },
  ]) {
    assert.equal(createUpiDonorSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});

test('rejects missing contact details and nonpositive amounts', () => {
  for (const patch of [{ name: '' }, { email: 'invalid' }, { phone: '123' }, { phone: '123456789x' }, { amount: 0 }, { pan: '1234567890' }]) {
    assert.equal(createUpiDonorSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});
