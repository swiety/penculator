import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chooseLanguage, initialLanguage, saveLanguage, messages, errorMessage } from '../assets/js/i18n.js';
import { calculate } from '../assets/js/calculator.js';

test('selects the first supported preference, variants and fallback', () => {
  assert.equal(chooseLanguage(['fr', 'PL-pl', 'en']), 'pl');
  assert.equal(chooseLanguage(['en-GB', 'pl']), 'en');
  assert.equal(chooseLanguage(['de'], 'pl'), 'en');
  assert.equal(chooseLanguage([], 'pl-PL'), 'pl');
  assert.equal(chooseLanguage(['pl-!'], 'pl'), 'en');
  assert.equal(chooseLanguage(undefined, undefined), 'en');
});
test('saved choice wins and blocked or invalid storage falls back', () => {
  assert.equal(initialLanguage({ getItem: () => 'en' }, ['pl']), 'en');
  assert.equal(initialLanguage({ getItem: () => 'xx' }, ['pl']), 'pl');
  const blocked = { getItem() { throw Error(); }, setItem() { throw Error(); } };
  assert.equal(initialLanguage(blocked, ['pl']), 'pl');
  assert.doesNotThrow(() => saveLanguage(blocked, 'pl'));
});
test('catalogs match and all calculation errors are translated', () => {
  assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages.pl).sort());
  for (const input of [{mg:'bad'}, {mg:'0'}, {mg:'16'}, {mg:'0.000001'}]) {
    let error; try { calculate(input); } catch (e) { error = e; }
    assert.ok(error?.code);
    assert.notEqual(errorMessage('pl', error), errorMessage('en', error));
  }
});
