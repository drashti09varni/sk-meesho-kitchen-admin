const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {priceCart} = require('../lib/payment');
test('hidden dummy is priced by the server at Rs 1 and uses normal cart quantities', () => {
  assert.equal(priceCart([{id:900001,qty:1}]).amount,1);
  assert.equal(priceCart([{id:900001,qty:2}]).amount,2);
  assert.equal(priceCart([{id:900001,qty:1},{id:1,qty:1}]).amount,250);
});
test('both bundles resolve Dx to testing detail and omit dummy from home grid', () => {
  for(const file of ['assets/index-MzB9xETE.js','index-MzB9xETE.js']) {
    const source=fs.readFileSync(file,'utf8');
    const start=source.indexOf('const dxTestProduct =');
    const end=source.indexOf('function um(', start);
    const product=vm.runInNewContext(source.slice(start,end)+'\ndxTestProduct');
    for(const route of ['Dx','900001','1']) {
      const declaration=source.match(/const O = Z.id === "Dx"[^;]+;/)[0];
      const selected=vm.runInNewContext(declaration+'\nO',{Z:{id:route},dxTestProduct:product,f:[{id:1}]});
      assert.equal(selected.id,route==='1'?1:900001);
    }
    const startGrid=source.indexOf('function tm('),endGrid=source.indexOf('const gs =',startGrid);
    const expression=source.slice(startGrid,endGrid).match(/f\.filter\([^\n]+\)\.map/)[0].replace(/\.map$/,'');
    const visible=vm.runInNewContext(expression,{f:[{id:1},product,{id:900001},{id:"900001",hidden:false},{id:49,name:"Dx"},{id:52,slug:"Dx",hidden:false},{id:53,name:"Payment Testing Product",hidden:false},{id:2,hidden:true}]});
    assert.equal(visible.length,1);assert.equal(visible[0].id,1);
  }
});
