import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spreadsheetText } from './spreadsheet.js';

test('keeps donor supplied formulas as text in spreadsheet exports', () => {
  for (const value of ['=1+1', ' +SUM(A1:A2)', '\t@cmd', '-2+3']) {
    assert.equal(spreadsheetText(value), `'${value}`);
  }
  assert.equal(spreadsheetText('A Donor'), 'A Donor');
  assert.equal(spreadsheetText(500), '500');
});
