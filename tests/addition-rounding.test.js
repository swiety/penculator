import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../assets/js/calculator.js';

test('adds exact values before rounding and flags each rounded output', () => {
  const result = calculate({ mg: '0.003125', ml: '0.000125' });
  assert.deepEqual(result.mg, { value: '0.0063', approximate: true });
  assert.deepEqual(result.ml, { value: '0.0003', approximate: true });
  const mixed = calculate({ mg: '0.01', ml: '0.0001' });
  assert.deepEqual(mixed.mg, { value: '0.0125', approximate: false });
  assert.deepEqual(mixed.ml, { value: '0.0005', approximate: false });
});
