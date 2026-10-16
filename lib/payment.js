const products = require('../products.json');

// This is the same Paytm intent signature used by Kitchan. It is not a secret;
// the original application includes it in the client-visible deep link.
const PAYTM_SIGN =
  'AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr';

// Keep the target store's authoritative product pricing. The browser only
// sends product IDs and quantities; it cannot choose the payable amount.
function priceCart(items, delivery = 'std') {
  if (!Array.isArray(items) || !items.length || items.length > 100) {
    throw new Error('Invalid cart');
  }

  const quantities = new Map();
  for (const item of items) {
    const id = Number(item.id);
    const qty = Number(item.qty);
    if (!Number.isInteger(id) || !Number.isInteger(qty) || qty < 1 || qty > 10) {
      throw new Error('Invalid quantity');
    }
    const total = (quantities.get(id) || 0) + qty;
    if (total > 10) throw new Error('Maximum quantity is 10 per product');
    quantities.set(id, total);
  }

  const lines = [...quantities].map(([id, qty]) => {
    const product = products.find((entry) => entry.id === id);
    if (!product || !(product.price > 0)) throw new Error('Product unavailable');
    return { id, qty, price: product.price, name: product.name };
  });

  const subtotal = lines.reduce(
    (sum, product) => sum + Math.round(product.price * 100) * product.qty,
    0,
  ) / 100;
  const shipping = delivery === 'fast' ? 49 : 0;
  return { items: lines, subtotal, shipping, amount: subtotal + shipping };
}

function generateOrderId() {
  return `TXN${Date.now()}${Math.floor(Math.random() * 99999)}`;
}

function buildUpiUrl(amount, orderId, upiId, merchantName) {
  return `upi://pay?pa=${encodeURIComponent(upiId)}&am=${encodeURIComponent(amount)}&pn=${encodeURIComponent(merchantName)}&tn=${encodeURIComponent(orderId)}&tr=${encodeURIComponent(orderId)}&cu=INR`;
}

function buildQrCodeUrl(upiUrl, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUrl)}&size=${size}x${size}`;
}

function buildPaytmIntent(amount, orderId, upiId, merchantName) {
  return `paytmmp://cash_wallet?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(orderId)}&tr=${encodeURIComponent(orderId)}&mc=4722&&sign=${encodeURIComponent(PAYTM_SIGN)}&featuretype=money_transfer`;
}

function buildPhonepeIntent(amount, orderId, upiId, merchantName) {
  const payload = {
    p2pPaymentCheckoutParams: {
      checkoutType: 'COLLECT',
      initialAmount: Math.round(Number(amount) * 100),
      note: { type: 'text', message: orderId },
      supportedInstruments: -1,
    },
    contact: {
      type: 'EXTERNAL_MERCHANT',
      name: merchantName || 'Store',
      vpa: upiId,
    },
  };
  const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  return `phonepe://native?data=${encodeURIComponent(base64)}&id=p2ppayment`;
}

// Matches Kitchan: Paytm and UPI QR can resolve through Paytm's Order Status
// API. PhonePe is intentionally not verified by this function.
async function checkPaytmStatus(orderId) {
  const mid = process.env.PAYTM_MID;
  if (!mid) return { status: 'pending' };

  const endpoint = process.env.PAYTM_ENV === 'test'
    ? 'https://securegw-stage.paytm.in/order/status'
    : 'https://securegw.paytm.in/order/status';
  const jsonData = JSON.stringify({ MID: mid, ORDERID: orderId });
  const url = `${endpoint}?JsonData=${encodeURIComponent(jsonData)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.STATUS === 'TXN_SUCCESS' && data.MID === mid && data.ORDERID === orderId) {
      return {
        status: 'success',
        utr: data.BANKTXNID || '',
        amount: data.TXNAMOUNT || '',
        gateway: data.GATEWAYNAME || '',
      };
    }

    if (data.STATUS === 'TXN_FAILURE' || data.STATUS === 'FAILED') {
      const message = data.RESPMSG || '';
      const stillPending = ['Invalid Order Id', 'No record found', 'PENDING']
        .some((entry) => message.includes(entry)) || !data.TXNID;
      return { status: stillPending ? 'pending' : 'failure' };
    }
    return { status: 'pending' };
  } catch {
    return { status: 'pending' };
  }
}

module.exports = {
  priceCart,
  generateOrderId,
  buildUpiUrl,
  buildQrCodeUrl,
  buildPaytmIntent,
  buildPhonepeIntent,
  checkPaytmStatus,
};
