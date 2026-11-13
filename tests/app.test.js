import { test } from 'node:test';
import assert from 'node:assert/strict';

test('form updates live, handles invalid input and prevents navigation', async () => {
  const listeners = {};
  const fields = Object.fromEntries(['mg', 'ml', 'clicks', 'fortieths'].map(name => [name, { value: '', removeAttribute() {} }]));
  const form = { elements: fields, addEventListener(name, fn) { listeners[name] = fn; } };
  const nodes = Object.fromEntries(['result', 'error', 'result-mg', 'result-ml', 'result-click-warning'].map(name => [name, { hidden: true, textContent: '' }]));
  globalThis.document = { querySelector(selector) { return selector === '#dose-form' ? form : nodes[selector.slice(1)]; }, querySelectorAll() { return []; } };
  try {
    await import('../assets/js/app.js');
    fields.mg.value = '1'; listeners.input();
    assert.equal(nodes['result-mg'].textContent, '1 mg');
    assert.equal(nodes['result-ml'].textContent, '0.04 ml');
    fields.ml.value = '0.1'; listeners.input();
    assert.equal(nodes['result-mg'].textContent, '3.5 mg');
    assert.equal(nodes['result-ml'].textContent, '0.14 ml');
    fields.ml.value = 'bad'; listeners.input();
    assert.equal(nodes.result.hidden, true); assert.equal(nodes.error.hidden, false);
    fields.mg.value = ''; fields.ml.value = ''; listeners.input();
    assert.equal(nodes.result.hidden, true); assert.equal(nodes.error.hidden, true);
    let prevented = false; listeners.submit({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
  } finally { delete globalThis.document; }
});
