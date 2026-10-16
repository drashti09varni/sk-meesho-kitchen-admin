const test = require('node:test');
const assert = require('node:assert/strict');
const routing = require('../lib/payment-profiles');
const { checkPaytmStatus } = require('../lib/payment');
const admin = require('../api/payment-admin');
const auth = require('../lib/payment-admin-auth');

function profile(id) { return { id, name: id, upi: `${id}@paytm`, mid: `MID${id}`, enabled: true, failures: 0, epoch: 1 }; }
function config() { return { revision: 0, mode: 'consecutive', profiles: ['one', 'two', 'three'].map(profile), activeId: 'one', events: [] }; }
function order(id, profileId = 'one', epoch = 1) { return { id, profileId, epoch, status: 'pending', amount: 249 }; }

test('3 distinct consecutive failures rotate 1 → 2 → 3, then pause when exhausted', () => {
  const c = config();
  for (const id of ['one', 'two', 'three']) {
    for (let i = 0; i < 3; i++) {
      const o = order(`TXN${i}`, id);
      routing.applyOutcome(c, o, { status: 'failure' });
      assert.equal(routing.applyOutcome(c, o, { status: 'failure' }), false, 'same transaction counts once');
      assert.equal(c.profiles.find(p => p.id === id).failures, i + 1);
      if (i < 2) assert.equal(c.activeId, id);
    }
  }
  assert.equal(c.activeId, null);
  assert.equal(c.events.filter(e => e.type === 'rotation').length, 3);
});

test('success resets streak; pending is ignored; old epochs cannot alter current counters', () => {
  const c = config();
  routing.applyOutcome(c, order('TXN1'), { status: 'failure' });
  routing.applyOutcome(c, order('TXN2'), { status: 'failure' });
  assert.equal(routing.applyOutcome(c, order('TXN3'), { status: 'pending' }), false);
  assert.equal(c.profiles[0].failures, 2);
  routing.applyOutcome(c, order('TXN4'), { status: 'success', amount: '249.00', utr: 'UTR' });
  assert.equal(c.profiles[0].failures, 0);
  c.profiles[0].epoch = 2;
  routing.applyOutcome(c, order('TXN5', 'one', 1), { status: 'failure' });
  assert.equal(c.profiles[0].failures, 0);
  c.profiles[1].enabled = false;
  c.profiles[0].failures = 3;
  assert.equal(routing.nextProfile(c, 'one'), 'three');
});

test('server validates max 5, UPI/MID uniqueness and ignores browser-supplied counters', () => {
  const c = config();
  assert.throws(() => routing.validateProfiles(Array(6).fill(profile('valid')), c), /maximum of 5/);
  assert.throws(() => routing.validateProfiles([{ ...profile('valid'), upi: '<script>' }], c), /valid UPI/);
  assert.throws(() => routing.validateProfiles([profile('one'), profile('one')], c), /unique/);
  const manualProfiles = routing.validateProfiles([
    { name: 'Manual one', upi: 'manual-one@paytm', mid: '' },
    { name: 'Manual two', upi: 'manual-two@paytm', mid: '' },
  ], { profiles: [] });
  assert.deepEqual(manualProfiles.map(p => p.mid), ['', '']);
  c.profiles[0].failures = 2;
  const saved = routing.validateProfiles([{ ...profile('one'), failures: 0 }], c);
  assert.equal(saved[0].failures, 2);
  const edited = routing.validateProfiles([{ ...profile('one'), mid: 'NEWMID' }], c);
  assert.equal(edited[0].failures, 0);
  assert.equal(edited[0].epoch, 2);
});

test('initial configuration imports a UPI profile without requiring a Paytm MID', t => {
  const originalUpi = process.env.PAYTM_UPI_ID;
  const originalMid = process.env.PAYTM_MID;
  process.env.PAYTM_UPI_ID = 'manual@paytm';
  delete process.env.PAYTM_MID;
  t.after(() => {
    if (originalUpi === undefined) delete process.env.PAYTM_UPI_ID;
    else process.env.PAYTM_UPI_ID = originalUpi;
    if (originalMid === undefined) delete process.env.PAYTM_MID;
    else process.env.PAYTM_MID = originalMid;
  });

  const initial = routing.initialConfig();
  assert.equal(initial.activeId, 'existing-merchant');
  assert.equal(initial.profiles[0].upi, 'manual@paytm');
  assert.equal(initial.profiles[0].mid, '');
});

test('an admin can activate a manual-only profile and route new orders to it', async t => {
  const db = mockEnvironment(t);
  const saved = config();
  saved.profiles[1].mid = '';
  db.data.set(routing.CONFIG_KEY, JSON.stringify(saved));

  const activated = await routing.updateConfig({
    action: 'activate',
    revision: saved.revision,
    id: 'two',
  });
  const order = await routing.assignOrder('TXN9999', 249);

  assert.equal(activated.activeId, 'two');
  assert.equal(order.upi, 'two@paytm');
  assert.equal(order.mid, '');
});

function fakeRedis() {
  const data = new Map();
  const counts = new Map();
  const fetch = async (_url, options) => {
    const args = JSON.parse(options.body);
    const [cmd, ...rest] = args;
    let result;
    if (cmd === 'MGET') result = rest.map(k => data.get(k) ?? null);
    else if (cmd === 'GET') result = data.get(rest[0]) ?? null;
    else if (cmd === 'DEL') { counts.delete(rest[0]); result = 1; }
    else if (cmd === 'EVAL' && rest[0].includes("redis.call('INCR'")) {
      const key = rest[2]; result = (counts.get(key) || 0) + 1; counts.set(key, result);
    } else if (cmd === 'EVAL') {
      assert.equal(rest[0], routing.CAS);
      const n = Number(rest[1]), keys = rest.slice(2, 2 + n), values = rest.slice(2 + n);
      result = keys.every((k, i) => (data.get(k) ?? '__absent__') === values[i * 3]) ? 1 : 0;
      if (result) keys.forEach((k, i) => { if (values[i * 3 + 1] !== '__keep__') data.set(k, values[i * 3 + 1]); });
    } else throw new Error(`Unexpected Redis command: ${cmd}`);
    return { ok: true, json: async () => ({ result }) };
  };
  return { data, fetch };
}

function mockEnvironment(t) {
  const originalFetch = global.fetch;
  const keys = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'PAYTM_UPI_ID', 'PAYTM_MID', 'PAYMENT_ADMIN_PASSWORD', 'PAYMENT_ADMIN_SESSION_SECRET'];
  const original = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-only';
  process.env.PAYTM_UPI_ID = 'one@paytm'; process.env.PAYTM_MID = 'MIDone';
  process.env.PAYMENT_ADMIN_PASSWORD = 'test-only-password';
  process.env.PAYMENT_ADMIN_SESSION_SECRET = 'test-only-session-secret-32-characters';
  const db = fakeRedis(); global.fetch = db.fetch;
  t.after(() => { global.fetch = originalFetch; for (const k of keys) { if (original[k] === undefined) delete process.env[k]; else process.env[k] = original[k]; } });
  return db;
}

test('concurrent failures rotate atomically; repeated verify calls do not double count; old MID stays pinned', async t => {
  const db = mockEnvironment(t);
  db.data.set(routing.CONFIG_KEY, JSON.stringify(config()));
  await Promise.all(['TXN1', 'TXN2', 'TXN3'].map(id => routing.assignOrder(id, 249)));
  await Promise.all(['TXN1', 'TXN1', 'TXN2', 'TXN3', 'TXN3'].map(id => routing.recordOutcome(id, { status: 'failure' })));
  const c = await routing.getConfig();
  assert.equal(c.activeId, 'two'); assert.equal(c.profiles[0].failures, 3);
  assert.equal(c.events.filter(e => e.type === 'rotation').length, 1);
  assert.equal((await routing.getOrder('TXN1')).mid, 'MIDone');
  assert.equal((await routing.assignOrder('TXN4', 249)).mid, 'MIDtwo');
  await routing.updateConfig({ action: 'activate', revision: c.revision, id: 'one' });
  assert.equal((await routing.getConfig()).profiles[0].failures, 0);
  await assert.rejects(routing.updateConfig({ action: 'save', revision: c.revision, profiles: c.profiles }), /Settings changed/);
});

test('initiate and verify APIs retain response fields, rotate on gateway failures and verify with original MID', async t => {
  const db = mockEnvironment(t);
  db.data.set(routing.CONFIG_KEY, JSON.stringify(config()));
  const initiate = require('../api/initiate-payment');
  const verify = require('../api/verify-payment');
  const response = () => ({ code: 200, headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(c) {this.code=c;return this;}, json(v) {this.data=v;return this;} });
  const orders = [];
  for (let i = 0; i < 4; i++) {
    const res = response(); await initiate({ method: 'POST', body: { items: [{ id: 1, qty: 1 }] } }, res);
    assert.equal(res.code, 200); assert.equal(res.data.amount, 249);
    assert.match(res.data.paytmIntent, /^paytmmp:/); assert.match(res.data.phonepeIntent, /^phonepe:/);
    orders.push(res.data.txnid);
  }
  const mids = [];
  global.fetch = async (url, opts) => {
    if (url === 'https://redis.example') return db.fetch(url, opts);
    const query = JSON.parse(new URL(url).searchParams.get('JsonData'));
    mids.push(query.MID);
    return { ok: true, json: async () => ({ MID: query.MID, ORDERID: query.ORDERID, STATUS: 'TXN_FAILURE', TXNID: 'gateway-id', RESPMSG: 'Declined' }) };
  };
  for (const id of orders.slice(0, 3)) {
    const res = response(); await verify({ method: 'POST', body: { txnid: id } }, res);
    assert.equal(res.data.status, 'failure');
  }
  assert.equal((await routing.getConfig()).activeId, 'two');
  const last = response(); await verify({ method: 'POST', body: { txnid: orders[3] } }, last);
  assert.equal(mids[3], 'MIDone');
  const newOrder = response(); await initiate({ method: 'POST', body: { items: [{id:1,qty:1}] } }, newOrder);
  assert.equal(newOrder.data.upiId, 'two@paytm');
});

test('managed gateway verification rejects wrong MID/order and wrong success amount', async t => {
  mockEnvironment(t);
  for (const data of [
    { STATUS: 'TXN_FAILURE', MID: 'WRONG', ORDERID: 'TXN1', TXNID: 'a' },
    { STATUS: 'TXN_FAILURE', MID: 'MIDone', ORDERID: 'TXN2', TXNID: 'a' },
    { STATUS: 'TXN_SUCCESS', MID: 'MIDone', ORDERID: 'TXN1', TXNAMOUNT: '1' },
  ]) {
    global.fetch = async () => ({ json: async () => data });
    assert.equal((await checkPaytmStatus('TXN1', { mid: 'MIDone', amount: 249, strict: true })).status, 'pending');
  }
});

test('live Paytm 334 response is an integration warning, never a counted failure', async t => {
  const db = mockEnvironment(t);
  db.data.set(routing.CONFIG_KEY, JSON.stringify(config()));
  await routing.assignOrder('TXN334', 249);
  global.fetch = async (url, opts) => url === 'https://redis.example' ? db.fetch(url, opts) : {
    json: async () => ({ STATUS: 'TXN_FAILURE', RESPCODE: '334', RESPMSG: 'Invalid Order Id.', MID: 'MIDone', ORDERID: 'TXN334', TXNID: '' }),
  };
  const verify = require('../api/verify-payment');
  const call = async () => {
    const res = { code: 200, setHeader() {}, status(c) { this.code=c; return this; }, json(data) { this.data=data; return this; } };
    await verify({ method:'POST', body:{txnid:'TXN334'} },res);
    return res;
  };
  const result = await call();
  assert.equal(result.data.status,'pending');
  assert.equal(result.data.verification.state,'order_not_found');
  assert.equal(result.data.verification.code,'334');
  await call();
  const saved = await routing.getConfig();
  assert.equal(saved.profiles[0].failures,0);
  assert.equal(saved.activeId,'one');
  assert.equal(saved.events.filter(e=>e.type==='verification_issue').length,1);
  assert.equal((await routing.getOrder('TXN334')).status,'pending');
  assert.equal(saved.profiles[0].lastVerification.state,'order_not_found');
  assert.equal(routing.validateProfiles(saved.profiles,saved)[0].lastVerification.state,'order_not_found');
});

test('payment admin requires server session and CSRF header; cookie tampering fails', async t => {
  mockEnvironment(t);
  const call = async req => {
    const res = { code:200, headers:{}, setHeader(k,v){this.headers[k]=v;},status(c){this.code=c;return this;},json(v){this.data=v;return this;} };
    await admin({ headers:{}, ...req },res); return res;
  };
  assert.equal((await call({ method:'GET' })).code,401);
  assert.equal((await call({ method:'POST',body:{action:'save',profiles:[]} })).code,403);
  const bad = await call({ method:'POST',headers:{'x-admin-request':'1'},body:{action:'login',password:'wrong'} });
  assert.equal(bad.code,401);
  const login = await call({ method:'POST',headers:{'x-admin-request':'1'},body:{action:'login',password:process.env.PAYMENT_ADMIN_PASSWORD} });
  assert.equal(login.code,200);
  const cookie = login.headers['Set-Cookie'];
  assert.match(cookie,/HttpOnly; Secure; SameSite=Strict/);
  const authenticated = await call({ method:'GET',headers:{cookie} });
  assert.equal(authenticated.code,200);
  assert.equal(auth.authenticated({headers:{cookie:cookie.replace('payment_admin=','payment_admin=0')}}),false);
});
