const { checkPaytmStatus } = require('../lib/payment');
const profiles = require('../lib/payment-profiles');

const LONG_POLL_TIMEOUT_MS = 9_000;
const PAYTM_API_INTERVAL_MS = 2_500;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { txnid } = req.body || {};
  if (typeof txnid !== 'string' || !/^TXN\d{1,80}$/.test(txnid)) {
    return res.status(400).json({ success: false, error: 'Transaction ID required' });
  }

  try {
    const managed = profiles.configured();
    const order = managed ? await profiles.getOrder(txnid) : null;
    if (managed && !order && txnid.length > 30) {
      return res.status(404).json({ success: false, error: 'Payment reference expired or not found.', status: 'pending' });
    }
    if (order && order.status !== 'pending') {
      return res.status(200).json({ success: true, status: order.status, utr: order.utr, amount: order.confirmedAmount });
    }
    const startedAt = Date.now();
    while (Date.now() - startedAt < LONG_POLL_TIMEOUT_MS) {
      // Existing pre-migration orders continue to use the original environment MID.
      // New orders always use their saved merchant, even after a rotation/edit.
      const result = await checkPaytmStatus(txnid, order ? { mid: order.mid, amount: order.amount, strict: true } : {});
      if (order && result.verification) {
        await profiles.recordVerificationIssue(txnid, result.verification);
        return res.status(200).json({ success: true, status: 'pending', verification: result.verification });
      }
      if (result.status === 'success' || result.status === 'failure') {
        const saved = order ? await profiles.recordOutcome(txnid, result) : null;
        return res.status(200).json({
          success: true,
          status: saved?.status || result.status,
          utr: saved?.utr || result.utr,
          amount: saved?.confirmedAmount || result.amount,
        });
      }

      const elapsed = Date.now() - startedAt;
      if (elapsed + PAYTM_API_INTERVAL_MS >= LONG_POLL_TIMEOUT_MS) break;
      await new Promise((resolve) => setTimeout(resolve, PAYTM_API_INTERVAL_MS));
    }
    return res.status(200).json({ success: true, status: 'pending' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      status: 'pending',
    });
  }
};
