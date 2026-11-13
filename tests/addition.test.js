import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../assets/js/calculator.js';

test('adds different fields before checking the limit', () => {
  let result = calculate({ mg: '1', ml: '0.1' });
  assert.equal(result.mg.value, '3.5');
  assert.equal(result.ml.value, '0.14');
  assert.throws(() => calculate({ mg: '10', ml: '0.3' }), /exceeds/);
  result = calculate({ mg: '1', ml: '0.1', clicks: '4', fortieths: '2' });
  assert.equal(result.mg.value, '5.75');
  assert.equal(result.ml.value, '0.23');
  assert.equal(result.usesClicks, true);
  assert.equal(calculate({ mg: '0', ml: '0.1', clicks: '0' }).usesClicks, false);
  assert.throws(() => calculate({ mg: '1', clicks: 'bad' }));
  assert.throws(() => calculate({ mg: '14.99999', clicks: '1' }), /exceeds/);
  assert.throws(() => calculate({ mg: '14.999999', ml: '0.0000001' }), /exceeds/);
});
