import { test } from 'node:test';
import assert from 'node:assert/strict';

test('pen switching clears clicks, revalidates, updates leaflet and translates context', async () => {
  const events = {};
  const fields = Object.fromEntries(['mg', 'ml', 'clicks', 'fortieths'].map(name => [name, { value: '', removeAttribute() {} }]));
  const form = { elements: fields, addEventListener(name, fn) { events[name] = fn; } };
  const nodes = Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning','pen-details','product-context','leaflet','click-warning'].map(name => [name, { hidden: true, textContent: '' }]));
  const select = { value: '', options: [], append(option) { this.options.push(option); }, addEventListener(name, fn) { this[name] = fn; } };
  const lang = { value: '', addEventListener(name, fn) { this[name] = fn; } };
  const button = { dataset: { field: 'clicks', direction: '1' }, setAttribute() {}, addEventListener() {} };
  globalThis.document = { documentElement: {}, createElement() { return {}; }, querySelector(s) { return s === '#dose-form' ? form : s === '#pen' ? select : s === '#language' ? lang : nodes[s.slice(1)]; }, querySelectorAll(s) { return s === '[data-i18n]' ? [] : [button]; } };
  try {
    await import('../assets/js/app.js?pen-switch');
    assert.equal(select.options.length, 19);
    for (const option of select.options) {
      select.value = option.value; select.change();
      assert.ok(nodes['pen-details'].textContent.includes(option.textContent.split(' · ')[0].split(' ')[0]));
      assert.match(nodes.leaflet.href, /ema\.europa\.eu/);
    }
    select.value = 'mounjaro-15'; select.change();
    fields.mg.value = '2'; fields.clicks.value = '1'; events.input();
    select.value = 'wegovy-05-2-15'; select.change();
    assert.equal(fields.clicks.value, ''); assert.equal(fields.clicks.disabled, true); assert.equal(button.disabled, true);
    assert.equal(nodes.result.hidden, true); assert.match(nodes.error.textContent, /0.5 mg/);
    assert.match(nodes.leaflet.href, /wegovy/); assert.match(nodes['pen-details'].textContent, /0.375 ml/);
    fields.mg.value = '0.5'; events.input(); assert.equal(nodes['result-ml'].textContent, '0.375 ml');
    lang.value = 'pl'; lang.change(); assert.match(nodes['product-context'].textContent, /czterech/);
    select.value = 'ozempic-05-2-3'; select.change(); assert.match(nodes.leaflet.href, /ozempic/); assert.equal(nodes['result-ml'].textContent, '0.74 ml');
    select.value = 'mounjaro-15'; select.change(); assert.equal(fields.clicks.disabled, false); assert.equal(button.disabled, false);
    select.value = 'unknown'; select.change(); events.input(); assert.equal(nodes.result.hidden, true); assert.match(nodes.error.textContent, /Unknown/);
  } finally { delete globalThis.document; }
});
