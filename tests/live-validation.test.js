import { test } from 'node:test';
import assert from 'node:assert/strict';

test('invalid live edits hide previous results and valid edits recover', async () => {
  const listeners={};
  const fields=Object.fromEntries(['mg','ml','clicks','fortieths'].map(name=>[name,{value:'',removeAttribute(){}}]));
  const form={elements:fields,addEventListener(name,fn){listeners[name]=fn;}};
  const nodes=Object.fromEntries(['result','error','result-mg','result-ml','result-click-warning'].map(name=>[name,{hidden:true,textContent:''}]));
  globalThis.document={querySelector(s){return s==='#dose-form'?form:nodes[s.slice(1)];},querySelectorAll(){return [];}};
  try {
    await import('../assets/js/app.js?validation');
    for(const value of ['0','1,','-1','abc','0.001','15.00001']) {
      fields.mg.value='1'; listeners.input(); assert.equal(nodes.result.hidden,false);
      fields.mg.value=value; listeners.input(); assert.equal(nodes.result.hidden,true); assert.equal(nodes.error.hidden,false);
    }
    fields.mg.value='15'; listeners.input(); assert.equal(nodes.result.hidden,false); assert.equal(nodes.error.hidden,true);
    fields.clicks.value='1.5'; listeners.input(); assert.equal(nodes.result.hidden,true);
    fields.clicks.value=''; listeners.input(); assert.equal(nodes.result.hidden,false);
  } finally {delete globalThis.document;}
});
