import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../assets/js/calculator.js';

test('rejects invalid, empty, negative and out-of-range values', () => {
  for (const input of [{}, { mg: '0' }, { mg: '-1' }, { mg: 'abc' }, { mg: '1.2.3' }, { clicks: '1.5' }, { fortieths: '1,5' }, { mg: '15.00001' }, { ml: '0.600001' }, { mg: '1', ml: 'no' }]) {
    assert.throws(() => calculate(input));
  }
});
test('rounds ties away from zero and identifies approximations', () => {
  const result = calculate({ mg: '0.00625' });
  assert.deepEqual(result.mg, { value: '0.0063', approximate: true });
  assert.deepEqual(result.ml, { value: '0.0003', approximate: true });
  assert.equal(calculate({ mg: '15' }).mg.approximate, false);
});
test('rejects positive values that round to zero', () => {
  assert.throws(() => calculate({ mg: '0.001' }));
});
