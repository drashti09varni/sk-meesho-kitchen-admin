const test=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
test('Meta automatic SPA tracking is disabled before SDK insertion; duplicate script loads are harmless',async()=>{
  const events=[]; let scripts=0; let requests=0;
  const c={location:{pathname:'/',search:''},fetch:async()=>{requests++;return{ok:true,json:async()=>({pixels:['123456789']})}},document:{createElement:()=>({}),head:{appendChild(){scripts++;assert.equal(c.fbq.disablePushState,true)}}},history:{pushState(){},replaceState(){}},addEventListener(){},localStorage:{getItem(){},setItem(){}}};
  c.window=c;
  const code=fs.readFileSync('assets/store-pixels.js','utf8');
  vm.runInNewContext(code,c);
  await new Promise(r=>setImmediate(r));
  const original=c.fbq;
  original.callMethod=(...args)=>events.push(args);
  vm.runInNewContext(code,c);
  c.location.pathname='/cart'; c.history.pushState(); c.history.replaceState();
  await new Promise(r=>setImmediate(r));
  assert.equal(requests,1);assert.equal(scripts,1);assert.equal(c.fbq,original);
  assert.equal(original.queue.filter(e=>e[2]==='PageView').length,1);
  assert.equal(events.filter(e=>e[2]==='PageView').length,1);
});
async function setup(path){const events=[],saved=new Map();const context={location:{pathname:path,search:''},fetch:async()=>({ok:true,json:async()=>({pixels:['123456789','987654321']})}),document:{createElement:()=>({}),head:{appendChild(){}}},history:{pushState(){},replaceState(){}},addEventListener(){},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)}};context.window=context;context.fbq=(...args)=>events.push(args);vm.runInNewContext(fs.readFileSync('assets/store-pixels.js','utf8'),context);await new Promise(r=>setImmediate(r));return{context,events};}
test('PageView on each SPA route and no cart/checkout events',async()=>{const {context:c,events}=await setup('/');assert.equal(events.filter(e=>e[2]==='PageView').length,2);c.location.pathname='/cart';c.history.pushState();await new Promise(r=>setImmediate(r));assert.equal(events.filter(e=>e[2]==='PageView').length,4);});
test('success page only Purchase, actual amount and dedupe per pixel/transaction',async()=>{const {context:c,events}=await setup('/success.html');assert.equal(events.filter(e=>e[2]==='PageView').length,0);const payment={transactionId:'TXN123',amount:398};await c.trackVerifiedPurchase(payment);await c.trackVerifiedPurchase(payment);const purchase=events.filter(e=>e[2]==='Purchase');assert.equal(purchase.length,2);assert.equal(purchase[0][3].value,398);assert.equal(purchase[0][3].currency,'INR');});
