import { test } from 'node:test';
import assert from 'node:assert/strict';

// Exercise the actual form handlers without assuming a particular browser DOM library.
test('form handlers show sums, clear stale results and reject invalid input', async () => {
  const listeners = {};
  const fields = Object.fromEntries(['mg', 'ml', 'clicks', 'fortieths'].map(name => [name, { value: '', removeAttribute() {} }]));
  const form = { elements: fields, addEventListener(name, fn) { listeners[name] = fn; } };
  const nodes = Object.fromEntries(['result', 'error', 'result-mg', 'result-ml', 'result-click-warning'].map(name => [name, { hidden: true, textContent: '' }]));
  globalThis.document = { querySelector(selector) { return selector === '#dose-form' ? form : nodes[selector.slice(1)]; } };
  try {
    await import('../assets/js/app.js');
    fields.mg.value = '1'; fields.ml.value = '0.1';
    listeners.submit({ preventDefault() {} });
    assert.equal(nodes['result-mg'].textContent, '3.5 mg');
    assert.equal(nodes['result-ml'].textContent, '0.14 ml');
    assert.equal(nodes.result.hidden, false);
    listeners.input();
    assert.equal(nodes.result.hidden, true);
    fields.ml.value = 'bad';
    listeners.submit({ preventDefault() {} });
    assert.equal(nodes.result.hidden, true);
    assert.equal(nodes.error.hidden, false);
    fields.ml.value = ''; fields.clicks.value = '1';
    listeners.submit({ preventDefault() {} });
    assert.equal(nodes['result-click-warning'].hidden, false);
  } finally {
    delete globalThis.document;
  }
});
