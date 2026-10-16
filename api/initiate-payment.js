const {
  priceCart,
  generateOrderId,
  buildUpiUrl,
  buildQrCodeUrl,
  buildPaytmIntent,
  buildPhonepeIntent,
} = require('../lib/payment');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const upiId = process.env.PAYTM_UPI_ID;
  const merchantName = process.env.PAYTM_MERCHANT_NAME || 'Store';
  const phonepeMerchantName = process.env.PHONEPE_MERCHANT_NAME || merchantName;
  if (!upiId) {
    return res.status(500).json({
      success: false,
      error: 'No UPI configured — set PAYTM_UPI_ID',
    });
  }

  let cart;
  try {
    cart = priceCart(req.body?.items, req.body?.delivery);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
    const txnid = generateOrderId();
    const upiUrl = buildUpiUrl(cart.amount, txnid, upiId, merchantName);
    return res.status(200).json({
      success: true,
      txnid,
      amount: cart.amount,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      items: cart.items,
      upiUrl,
      qrCodeUrl: buildQrCodeUrl(upiUrl),
      paytmIntent: buildPaytmIntent(cart.amount, txnid, upiId, merchantName),
      phonepeIntent: buildPhonepeIntent(
        cart.amount,
        txnid,
        upiId,
        phonepeMerchantName,
      ),
      merchantName,
      upiId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
