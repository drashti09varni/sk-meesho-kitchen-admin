(() => {
  const params = new URLSearchParams(location.search);
  const transactionId = params.get('transactionId') || params.get('order_id') || '';
  const amount = Number(params.get('amount')) || 0;
  const status = params.get('status') || 'done';
  const date = params.get('date') || new Date().toLocaleString('en-IN');
  const utr = params.get('utr') || '';

  document.getElementById('transaction-id').textContent = transactionId || '—';
  document.getElementById('amount').textContent = `₹${amount}`;
  document.getElementById('status').textContent = status;
  document.getElementById('date').textContent = date;
  const utrRow = document.getElementById('utr-row');
  if (utr) {
    document.getElementById('utr').textContent = utr;
    utrRow.hidden = false;
  }

  localStorage.removeItem('nexshop_cart');
  window.trackVerifiedPurchase?.({ transactionId, amount });
})();
