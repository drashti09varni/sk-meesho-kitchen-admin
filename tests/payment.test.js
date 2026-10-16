const test = require('node:test');
const assert = require('node:assert/strict');
const {
  priceCart,
  generateOrderId,
  buildUpiUrl,
  buildQrCodeUrl,
  buildPaytmIntent,
  buildPhonepeIntent,
  checkPaytmStatus,
} = require('../lib/payment');

test('server prices cart and rejects invalid products/quantities', () => {
  assert.equal(priceCart([{ id: 1, qty: 2, price: 1 }]).amount, 498);
  for (const items of [
    [{ id: 999999, qty: 1 }],
    [{ id: 1, qty: -1 }],
    [{ id: 1, qty: 7 }, { id: 1, qty: 7 }],
    [],
  ]) assert.throws(() => priceCart(items));
});

test('Kitchan transaction IDs and all payment links preserve amount/order/VPA', () => {
  const orderId = generateOrderId();
  assert.match(orderId, /^TXN\d+$/);
  const upi = buildUpiUrl(199, orderId, 'test@paytm', 'Test Store');
  const upiUrl = new URL(upi);
  assert.equal(upiUrl.searchParams.get('pa'), 'test@paytm');
  assert.equal(upiUrl.searchParams.get('am'), '199');
  assert.equal(upiUrl.searchParams.get('tn'), orderId);
  assert.equal(upiUrl.searchParams.get('tr'), orderId);
  assert.match(buildQrCodeUrl(upi), /api\.qrserver\.com/);

  const paytm = new URL(buildPaytmIntent(199, orderId, 'test@paytm', 'Test Store'));
  assert.equal(paytm.hostname, 'cash_wallet');
  assert.equal(paytm.searchParams.get('pa'), 'test@paytm');
  assert.equal(paytm.searchParams.get('tn'), orderId);
  assert.equal(paytm.searchParams.get('featuretype'), 'money_transfer');

  const phonepe = new URL(buildPhonepeIntent(199, orderId, 'test@paytm', 'Test Store'));
  const payload = JSON.parse(Buffer.from(phonepe.searchParams.get('data'), 'base64').toString('utf8'));
  assert.equal(payload.p2pPaymentCheckoutParams.initialAmount, 19900);
  assert.equal(payload.p2pPaymentCheckoutParams.note.message, orderId);
  assert.equal(payload.contact.vpa, 'test@paytm');
});

test('Paytm status maps exact success, terminal failure and missing orders', async () => {
  const originalMid = process.env.PAYTM_MID;
  const originalFetch = global.fetch;
  process.env.PAYTM_MID = 'MID123';
  try {
    global.fetch = async () => ({
      json: async () => ({
        STATUS: 'TXN_SUCCESS',
        MID: 'MID123',
        ORDERID: 'TXN1',
        BANKTXNID: 'UTR1',
        TXNAMOUNT: '199.00',
      }),
    });
    assert.deepEqual(await checkPaytmStatus('TXN1'), {
      status: 'success',
      utr: 'UTR1',
      amount: '199.00',
      gateway: '',
    });

    global.fetch = async () => ({
      json: async () => ({ STATUS: 'TXN_FAILURE', RESPMSG: 'Declined', TXNID: 'P1' }),
    });
    assert.deepEqual(await checkPaytmStatus('TXN2'), { status: 'failure' });

    global.fetch = async () => ({
      json: async () => ({ STATUS: 'TXN_FAILURE', RESPMSG: 'Invalid Order Id' }),
    });
    assert.deepEqual(await checkPaytmStatus('TXN3'), { status: 'pending' });
  } finally {
    global.fetch = originalFetch;
    if (originalMid === undefined) delete process.env.PAYTM_MID;
    else process.env.PAYTM_MID = originalMid;
  }
});

test('verification API validates input and returns immediate confirmed payment', async () => {
  const originalMid = process.env.PAYTM_MID;
  const originalFetch = global.fetch;
  process.env.PAYTM_MID = 'MID123';
  global.fetch = async () => ({
    json: async () => ({
      STATUS: 'TXN_SUCCESS',
      MID: 'MID123',
      ORDERID: 'TXN100',
      BANKTXNID: 'UTR100',
      TXNAMOUNT: '249.00',
    }),
  });
  const handler = require('../api/verify-payment');
  const call = async (body) => {
    const response = {
      code: 200,
      setHeader() {},
      status(code) { this.code = code; return this; },
      json(data) { this.data = data; return this; },
    };
    await handler({ method: 'POST', body }, response);
    return response;
  };
  try {
    const missing = await call({});
    assert.equal(missing.code, 400);
    const success = await call({ txnid: 'TXN100' });
    assert.equal(success.code, 200);
    assert.equal(success.data.status, 'success');
    assert.equal(success.data.utr, 'UTR100');
  } finally {
    global.fetch = originalFetch;
    if (originalMid === undefined) delete process.env.PAYTM_MID;
    else process.env.PAYTM_MID = originalMid;
  }
});
