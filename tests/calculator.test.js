import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../assets/js/calculator.js';

test('each full-dose representation yields the same result', () => {
  for (const input of [{ mg: '15' }, { ml: '0.6' }, { clicks: '60' }, { fortieths: '24' }]) {
    const result = calculate(input);
    assert.equal(result.mg.value, '15');
    assert.equal(result.ml.value, '0.6');
  }
});
test('decimal and fractional conversions', () => {
  assert.equal(calculate({ mg: '7,5' }).ml.value, '0.3');
  assert.equal(calculate({ ml: '0.1' }).mg.value, '2.5');
  assert.equal(calculate({ clicks: '1' }).mg.value, '0.25');
  assert.equal(calculate({ fortieths: '1' }).mg.value, '0.625');
});
