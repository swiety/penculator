import { test } from 'node:test';
import assert from 'node:assert/strict';
import { step } from '../assets/js/step.js';

test('steps each field from empty and back to zero', () => {
  for (const [field, expected] of [['mg','1'],['ml','0.1'],['clicks','1'],['fortieths','1']]) {
    assert.equal(step('',field,1),expected);
    assert.equal(step(expected,field,-1),'0');
    assert.equal(step('',field,-1),'');
    assert.equal(step('0',field,-1),'0');
  }
});
test('preserves fractional offsets and avoids floating point drift', () => {
  assert.equal(step('2.5','mg',1),'3.5');
  assert.equal(step('0,15','ml',1),'0.25');
  assert.equal(step('0.25','ml',-1),'0.15');
  assert.equal(step('0.05','ml',-1),'0');
  let value='0'; for(let i=0;i<6;i++) value=step(value,'ml',1);
  assert.equal(value,'0.6');
});
test('rejects invalid and incomplete values without changing them', () => {
  for(const [value,field] of [['abc','mg'],['1,','ml'],['-1','mg'],['1.5','clicks']]) assert.throws(() => step(value,field,1));
  assert.equal(step('15','mg',1),'16');
});
