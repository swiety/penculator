import { test } from 'node:test';
import assert from 'node:assert/strict';

test('language switch retains entered values, result and step error', async () => {
  const events = {};
  const fields = Object.fromEntries(['mg','ml','clicks','fortieths'].map(n => [n, {value:'', removeAttribute(){}}]));
  const form = {elements:fields, addEventListener(n, fn){events[n]=fn;}};
  const nodes = Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning'].map(n => [n,{hidden:true,textContent:''}]));
  const selector = {value:'',addEventListener(n,fn){this.change=fn;}};
  const button = {dataset:{field:'ml',direction:'1'},setAttribute(){},addEventListener(n,fn){this.activate=fn;}};
  const label = {dataset:{i18n:'title'},textContent:''};
  globalThis.document = {documentElement:{}, title:'', querySelector(s){return s==='#dose-form'?form:s==='#language'?selector:nodes[s.slice(1)];}, querySelectorAll(s){return s==='[data-i18n]'?[label]:[button];}};
  try {
    await import('../assets/js/app.js?switch');
    fields.mg.value='1'; events.input();
    selector.value='pl'; selector.change();
    assert.equal(fields.mg.value,'1'); assert.equal(nodes['result-mg'].textContent,'1 mg'); assert.equal(document.documentElement.lang,'pl'); assert.equal(label.textContent,'Kalkulator dawki z pena');
    fields.ml.value='bad'; button.activate();
    assert.equal(nodes.result.hidden,true); assert.match(nodes.error.textContent,/nieujemną/);
    selector.value='en'; selector.change();
    assert.equal(fields.ml.value,'bad'); assert.equal(nodes.result.hidden,true); assert.match(nodes.error.textContent,/non-negative/);
  } finally { delete globalThis.document; }
});
