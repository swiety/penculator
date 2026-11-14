import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pens } from '../assets/js/pen.js';

function node() { return { value: '', textContent: '', hidden: false, dataset: {}, listeners: {}, addEventListener(n, f) { this.listeners[n] = f; }, removeAttribute(n) { delete this[n]; }, setAttribute(n, v) { this[n] = v; }, append(item) { (this.options ??= []).push(item); } }; }
test('target and link controls preserve calculator state and recover from invalid input', async () => {
  const nodes = Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning','pen-details','product-context','leaflet','click-warning','target-dose','target-error','link-error','settings-link','share-instruction','share-prefix','share-suffix','pen','language'].map(n => [n, node()]));
  nodes['share-prefix'].dataset.i18n = 'sharePrefix'; nodes['settings-link'].dataset.i18n = 'shareLink'; nodes['share-suffix'].dataset.i18n = 'shareSuffix';
  const localized = [nodes['share-prefix'], nodes['settings-link'], nodes['share-suffix']];
  const fields = Object.fromEntries(['mg','ml','clicks','fortieths'].map(n => [n, node()]));
  const form = node(); form.elements = fields;
  const buttons = [-1,1].map(n => { const b=node(); b.dataset.targetDirection = String(n); return b; });
  const callbacks = {};
  globalThis.location = { href: 'https://example.test/penculator/?x=1#settings?pen=ozempic-05-2-3&target=0.25', hash: '#settings?pen=ozempic-05-2-3&target=0.25' };
  globalThis.addEventListener = (name, fn) => { callbacks[name] = fn; };
  globalThis.document = { documentElement:{}, createElement:node, querySelector(s) { return s === '#dose-form' ? form : nodes[s.slice(1)]; }, querySelectorAll(s) { return s === '[data-target-direction]' ? buttons : s === '[data-i18n]' ? localized : []; } };
  try {
    await import('../assets/js/app.js?target-ui');
    const target = nodes['target-dose'], link = nodes['settings-link'];
    assert.equal(nodes.pen.value, 'ozempic-05-2-3'); assert.equal(target.value, '0.25'); assert.match(link.href, /target=0.25/);
    assert.equal(localized.map(n => n.textContent).join(''), 'Share this link with preselected pen type and target value');
    assert.equal(link.textContent, 'link'); assert.equal(nodes['share-instruction'].hidden, false);
    fields.mg.value = '0.25'; form.listeners.input({target: fields.mg}); assert.equal(nodes['result-mg'].textContent, '0.25 mg');
    target.value = '7,5'; target.listeners.input(); form.listeners.input({target}); assert.equal(nodes['result-mg'].textContent, '0.25 mg');
    buttons[1].listeners.click(); assert.equal(target.value, '8.5'); buttons[0].listeners.click(); assert.equal(target.value, '7.5');
    for (const invalid of ['', '0', '-1', 'bad']) { target.value = invalid; target.listeners.input(); assert.equal(nodes['share-instruction'].hidden, true); assert.equal(link.hidden, true); assert.equal(link.href, undefined); assert.equal(nodes['target-error'].hidden, false); }
    target.value = ''; target.listeners.input(); buttons[1].listeners.click(); assert.equal(target.value, '');
    nodes.language.value = 'pl'; nodes.language.listeners.change(); assert.equal(nodes['share-instruction'].hidden, true); nodes.language.value = 'en'; nodes.language.listeners.change();
    target.value = '16'; target.listeners.input(); assert.equal(nodes['share-instruction'].hidden, false); assert.equal(link.hidden, false); assert.match(link.href, /target=16/);
    for (const p of pens) { nodes.pen.value = p.id; nodes.pen.listeners.change(); assert.equal(target.value, p.doseMg); }
    const beforeLanguage = link.href; nodes.language.value = 'pl'; nodes.language.listeners.change(); assert.equal(link.href, beforeLanguage); assert.equal(localized.map(n => n.textContent).join(''), 'Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką'); target.value = '0'; target.listeners.input(); assert.match(nodes['target-error'].textContent, /dodatnią/);
    nodes.pen.value = 'mounjaro-15'; nodes.pen.listeners.change();
    fields.mg.value = ''; fields.clicks.value = '1'; form.listeners.input({target: fields.clicks}); assert.equal(nodes.result.hidden, false);
    location.hash = '#settings?pen=wegovy-05-2-15&target=0.3'; callbacks.hashchange();
    assert.equal(fields.clicks.value, '1'); assert.equal(nodes.result.hidden, true); assert.equal(nodes.error.hidden, false);
    fields.clicks.value = ''; fields.mg.value = '0.25'; form.listeners.input({target: fields.mg});
    location.hash = '#settings?pen=unknown&target=1'; callbacks.hashchange(); assert.equal(nodes.pen.value, 'mounjaro-15'); assert.equal(target.value, '15'); assert.equal(nodes['link-error'].hidden, false);
    location.hash = '#settings?pen=wegovy-05-2-15&target=0.3'; callbacks.hashchange(); assert.equal(nodes.pen.value, 'wegovy-05-2-15'); assert.equal(target.value, '0.3'); assert.equal(fields.mg.value, '0.25'); assert.equal(nodes['link-error'].hidden, true);
  } finally { delete globalThis.document; delete globalThis.location; delete globalThis.addEventListener; }
});

test('invalid initial link falls back without applying a partial pair', async () => {
  const nodes = Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning','pen-details','product-context','leaflet','click-warning','target-dose','target-error','link-error','settings-link','pen','language'].map(n => [n, node()]));
  const form = node(); form.elements = Object.fromEntries(['mg','ml','clicks','fortieths'].map(n => [n, node()]));
  globalThis.location = { href: 'https://example.test/#settings?pen=bad&target=0.25', hash: '#settings?pen=bad&target=0.25' };
  globalThis.addEventListener = () => {};
  globalThis.document = { documentElement: {}, createElement: node, querySelector(s) { return s === '#dose-form' ? form : nodes[s.slice(1)]; }, querySelectorAll() { return []; } };
  try {
    await import('../assets/js/app.js?invalid-initial');
    assert.equal(nodes.pen.value, 'mounjaro-15'); assert.equal(nodes['target-dose'].value, '15'); assert.equal(nodes['link-error'].hidden, false);
  } finally { delete globalThis.document; delete globalThis.location; delete globalThis.addEventListener; }
});
