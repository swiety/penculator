import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pens, getPen } from '../assets/js/pen.js';
import { calculate } from '../assets/js/calculator.js';

test('all labelled doses use the selected presentation ratio', () => {
  assert.equal(pens.length, 19);
  for (const p of pens) {
    const result = calculate({ mg: p.doseMg }, p);
    assert.equal(result.ml.value, p.expectedDoseMl, p.id);
    assert.equal(result.mg.value, p.doseMg, p.id);
    assert.throws(() => calculate({ mg: String(Number(p.doseMg) + 1) }, p), { code: 'limit' });
  }
});

test('ambiguous 0.5 mg presentations differ and unsupported clicks fail', () => {
  assert.equal(calculate({ mg: '0.5' }, getPen('ozempic-05-2-3')).ml.value, '0.74');
  assert.equal(calculate({ mg: '0.5' }, getPen('ozempic-05-4-3')).ml.value, '0.37');
  assert.equal(calculate({ mg: '0.5' }, getPen('wegovy-05-2-15')).ml.value, '0.375');
  assert.equal(calculate({ mg: '0.5' }, getPen('wegovy-05-2-3')).ml.value, '0.75');
  assert.throws(() => calculate({ clicks: '1' }, getPen('wegovy-05-2-3')));
  assert.throws(() => getPen('unknown'));
});

test('every presentation validates mixed inputs, boundaries and precision', () => {
  for (const p of pens) {
    const dose = Number(p.doseMg);
    const result = calculate({ mg: String(dose / 2).replace('.', ','), ml: String(Number(p.doseMl) / 2) }, p);
    assert.equal(result.mg.value, p.doseMg, p.id);
    assert.throws(() => calculate({ mg: '-1' }, p), { code: 'invalid' });
    assert.throws(() => calculate({ mg: '0' }, p), { code: 'positive' });
    assert.throws(() => calculate({ mg: '0.000000000000001' }, p), { code: 'precision' });
  }
});
