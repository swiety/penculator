import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pens } from '../assets/js/pen.js';
import { settingsLink, readSettings } from '../assets/js/target-settings.js';

test('all pens and exact targets round-trip on subpaths', () => {
  for (const p of pens) for (const dose of [p.doseMg, '0,25', '9007199254740993.01']) {
    const link = settingsLink('https://example.test/penculator/?a=1#old', p.id, dose);
    const url = new URL(link);
    assert.equal(url.pathname, '/penculator/'); assert.equal(url.search, '?a=1');
    assert.deepEqual(readSettings(url.hash), { status: 'valid', pen: p.id, target: dose.replace(',', '.') });
  }
});
test('invalid recognised fragments fail atomically and unrelated anchors are ignored', () => {
  for (const hash of ['#settings', '#settings?pen=mounjaro-15', '#settings?pen=bad&target=1', '#settings?pen=mounjaro-15&target=0', '#settings?pen=mounjaro-15&target=1&target=2', '#settings?pen=mounjaro-15&target=1&x=2', '#settings?pen=%zz&target=1', '#settings?pen=%FF&target=1', '#settings?pen=mounjaro-15&target=1,']) assert.deepEqual(readSettings(hash), { status: 'invalid' }, hash);
  for (const hash of ['', '#anything']) assert.deepEqual(readSettings(hash), { status: 'unrelated' });
});
