import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pens } from '../assets/js/pen.js';
import { defaultSettings, parseTarget, stepTarget } from '../assets/js/target-settings.js';

test('all pens default to their labelled dose', () => {
  for (const p of pens) assert.deepEqual(defaultSettings(p), { pen: p.id, target: p.doseMg });
});
test('target parses positive exact decimals and rejects invalid values', () => {
  assert.equal(parseTarget('0007,500'), '7.5');
  assert.equal(parseTarget('9007199254740993.00001'), '9007199254740993.00001');
  for (const value of ['', '0', '0.0', '-1', '1,', 'a', '.5']) assert.throws(() => parseTarget(value));
});
test('target step preserves fractional value and positive boundary', () => {
  assert.equal(stepTarget('7,5', 1), '8.5');
  assert.equal(stepTarget('8.5', -1), '7.5');
  assert.equal(stepTarget('9007199254740993.01', 1), '9007199254740994.01');
  for (const value of ['0.5', '1', 'bad', '']) assert.throws(() => stepTarget(value, -1));
});
