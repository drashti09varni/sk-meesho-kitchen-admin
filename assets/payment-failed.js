(() => {
  const params = new URLSearchParams(location.search);
  const amount = Number(params.get('amount')) || 0;
  const transactionId = params.get('transactionId') || '';
  document.getElementById('transaction-id').textContent = transactionId || '—';
  document.getElementById('amount').textContent = `₹${amount}`;
  document.getElementById('status').textContent = params.get('status') || 'Failed';
  document.getElementById('date').textContent = params.get('date') || new Date().toLocaleString('en-IN');
  setTimeout(() => {
    document.getElementById('loading').hidden = true;
    document.getElementById('failed-card').hidden = false;
  }, 5000);
})();
