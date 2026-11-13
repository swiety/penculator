import { test } from 'node:test';
import assert from 'node:assert/strict';

test('all step controls update their own field and recalculate', async () => {
  const listeners = {};
  const fields = Object.fromEntries(['mg','ml','clicks','fortieths'].map(name => [name,{value:'',removeAttribute(){}}]));
  const form={elements:fields,addEventListener(name,fn){listeners[name]=fn;}};
  const nodes=Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning'].map(name=>[name,{hidden:true,textContent:''}]));
  const buttons=[];
  for(const field of Object.keys(fields)) for(const direction of ['1','-1']) buttons.push({dataset:{field,direction},addEventListener(name,fn){this.activate=fn;}});
  globalThis.document={querySelector(s){return s==='#dose-form'?form:nodes[s.slice(1)];},querySelectorAll(){return buttons;}};
  try {
    await import('../assets/js/app.js?controls');
    for(const [field, expected] of [['mg','1'],['ml','0.1'],['clicks','1'],['fortieths','1']]) {
      const up=buttons.find(x=>x.dataset.field===field&&x.dataset.direction==='1');
      const down=buttons.find(x=>x.dataset.field===field&&x.dataset.direction==='-1');
      up.activate(); assert.equal(fields[field].value,expected); assert.equal(nodes.result.hidden,false);
      down.activate(); assert.equal(fields[field].value,'0');
      fields[field].value=''; listeners.input();
    }
    fields.ml.value='bad'; buttons.find(x=>x.dataset.field==='ml'&&x.dataset.direction==='1').activate();
    assert.equal(fields.ml.value,'bad'); assert.equal(nodes.error.hidden,false);
    fields.ml.value='0.6'; listeners.input();
    buttons.find(x=>x.dataset.field==='ml'&&x.dataset.direction==='1').activate();
    assert.equal(fields.ml.value,'0.7'); assert.equal(nodes.result.hidden,true);
    buttons.find(x=>x.dataset.field==='ml'&&x.dataset.direction==='-1').activate();
    assert.equal(fields.ml.value,'0.6'); assert.equal(nodes.result.hidden,false);
  } finally {delete globalThis.document;}
});
