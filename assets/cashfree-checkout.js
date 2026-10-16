(() => {
  let generation = 0;
  let countdownTimer;
  let cancelTimer;
  let stopGuard = () => {};

  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  const money = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

  async function api(path, body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'Please retry.');
      }
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Payment service is taking longer than usual. Please retry.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  function launchDeepLink(url) {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function beginBackGuard() {
    stopGuard();
    try { history.pushState({ paymentGuard: true }, ''); } catch {}
    const onPopState = () => {
      try { history.pushState({ paymentGuard: true }, ''); } catch {}
    };
    addEventListener('popstate', onPopState);
    stopGuard = () => removeEventListener('popstate', onPopState);
  }

  function endBackGuard() {
    stopGuard();
    stopGuard = () => {};
  }

  function paymentUrl(path, values) {
    const query = new URLSearchParams(values);
    return `${path}?${query.toString()}`;
  }

  async function mount() {
    if (location.pathname !== '/payment') {
      generation += 1;
      clearInterval(countdownTimer);
      clearTimeout(cancelTimer);
      endBackGuard();
      return;
    }

    const page = document.querySelector('.pm-main');
    if (!page || page.querySelector('.kitchan-payment')) return;

    const current = ++generation;
    let payment = null;
    let selected = 'phonepe';
    let tracking = false;
    let secondsLeft = 300;

    const cart = (() => {
      try { return JSON.parse(localStorage.getItem('nexshop_cart') || '[]'); }
      catch { return []; }
    })();
    const delivery = sessionStorage.getItem('nexshop_delivery') === 'fast' ? 'fast' : 'std';
    const initialSubtotal = cart.reduce((sum, item) => {
      const price = Number(String(item.sellPrice || item.price || 0).replace(/[^0-9.]/g, ''));
      return sum + price * Number(item.qty || 1);
    }, 0);
    const initialShipping = delivery === 'fast' ? 49 : 0;

    const root = document.createElement('section');
    root.className = 'kitchan-payment';
    root.innerHTML = `
      <header class="kp-header">
        <button class="kp-back" aria-label="Go back">
          <svg width="19" height="16" viewBox="0 0 19 16" aria-hidden="true"><path d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
        </button>
        <h1>Payments</h1>
      </header>
      <div class="kp-stepper" aria-label="Checkout progress">
        <div class="kp-step"><span class="kp-step-circle">✓</span><span>Address</span></div>
        <span class="kp-connector"></span>
        <div class="kp-step"><span class="kp-step-circle">✓</span><span>Order Summary</span></div>
        <span class="kp-connector"></span>
        <div class="kp-step"><span class="kp-step-circle">3</span><span>Payment</span></div>
      </div>
      <div class="kp-card">
        <p class="kp-offer">Offer ends in <span id="kp-timer">5min 0sec</span></p>
        <button class="kp-method" data-method="phonepe" aria-pressed="true">
          <img src="/assets/payment-icons/phonepe.svg" alt=""><span>Pay with PhonePe</span>
        </button>
        <button class="kp-method" data-method="paytm" aria-pressed="false">
          <img src="/assets/payment-icons/paytm.svg" alt=""><span>Pay with Paytm</span>
        </button>
        <button class="kp-method" data-method="qr" aria-pressed="false">
          <img src="/assets/payment-icons/qr.svg" alt=""><span>Scan QR</span>
        </button>
      </div>
      <div class="kp-price-card">
        <h2>Price Details</h2>
        <div class="kp-price-row"><span>Price (${cart.reduce((sum, item) => sum + Number(item.qty || 1), 0)} item)</span><strong id="kp-subtotal">${money(initialSubtotal)}</strong></div>
        <div class="kp-price-row"><span>Delivery Charges</span><strong id="kp-shipping" class="kp-free">${initialShipping ? money(initialShipping) : 'FREE'}</strong></div>
        <div class="kp-price-row kp-total"><span>Amount Payable</span><strong id="kp-total">${money(initialSubtotal + initialShipping)}</strong></div>
      </div>
      <div class="kp-safety"><strong>100% SAFE PAYMENTS</strong>Your payment details are protected.</div>
      <p id="kp-error" class="kp-error" hidden></p>
      <footer class="kp-footer">
        <div class="kp-footer-price"><strong id="kp-footer-total">${money(initialSubtotal + initialShipping)}</strong></div>
        <button id="kp-continue" class="kp-continue" disabled>Loading…</button>
      </footer>
      <div id="kp-wait-overlay" class="kp-overlay" hidden>
        <div class="kp-modal" role="dialog" aria-modal="true" aria-labelledby="kp-wait-title">
          <div id="kp-loader" class="kp-loader"><img id="kp-app-icon" alt=""></div>
          <h2 id="kp-wait-title">Verifying your payment</h2>
          <p class="kp-modal-copy">Complete the <strong id="kp-wait-amount"></strong> payment in <strong id="kp-app-name"></strong>. We'll auto-confirm in a few seconds.</p>
          <button id="kp-retry" class="kp-primary"></button>
          <button id="kp-cancel" class="kp-cancel" hidden>I didn't pay — choose another method</button>
          <p id="kp-wait-note" class="kp-wait-note">Please keep this screen open while we verify with your bank.<br><small>Already paid? Confirmation arrives in a few seconds.</small></p>
        </div>
      </div>
      <div id="kp-qr-overlay" class="kp-overlay" hidden>
        <div class="kp-modal kp-qr-modal" role="dialog" aria-modal="true" aria-labelledby="kp-qr-title">
          <button id="kp-qr-close" class="kp-close" aria-label="Close">×</button>
          <h2 id="kp-qr-title">Scan QR to Pay</h2>
          <p class="kp-modal-copy">Amount: <strong id="kp-qr-amount"></strong></p>
          <img id="kp-qr" class="kp-qr" alt="Payment QR">
          <div class="kp-qr-time">QR expires in <strong id="kp-qr-timer">05:00</strong></div>
          <div class="kp-qr-actions"><button id="kp-download">Download</button><button id="kp-share">Share</button></div>
          <p class="kp-qr-note">Scan with any UPI app — GPay, PhonePe, Paytm, BHIM. Auto-confirms after payment.</p>
        </div>
      </div>`;
    page.appendChild(root);

    const errorBox = root.querySelector('#kp-error');
    const continueButton = root.querySelector('#kp-continue');
    const waitOverlay = root.querySelector('#kp-wait-overlay');
    const qrOverlay = root.querySelector('#kp-qr-overlay');

    root.querySelector('.kp-back').onclick = () => location.assign('/checkout');
    root.querySelectorAll('.kp-method').forEach((button) => {
      button.onclick = () => {
        selected = button.dataset.method;
        root.querySelectorAll('.kp-method').forEach((entry) => {
          entry.setAttribute('aria-pressed', String(entry === button));
        });
      };
    });

    const renderTimer = () => {
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      root.querySelector('#kp-timer').textContent = `${minutes}min ${seconds}sec`;
      root.querySelector('#kp-qr-timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    renderTimer();
    countdownTimer = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
      renderTimer();
      if (!secondsLeft) clearInterval(countdownTimer);
    }, 1000);

    const redirectToResult = (status, details = {}) => {
      const values = {
        transactionId: payment.txnid,
        amount: String(payment.amount),
        status: status === 'success' ? 'done' : 'Failed',
        date: new Date().toLocaleString('en-IN'),
      };
      if (details.utr) values.utr = details.utr;
      location.replace(paymentUrl(status === 'success' ? '/success.html' : '/failed.html', values));
    };

    const poll = async () => {
      while (generation === current && tracking && location.pathname === '/payment') {
        try {
          const result = await api('/api/verify-payment', { txnid: payment.txnid });
          if (generation !== current || !tracking) return;
          if (result.status === 'success') return redirectToResult('success', result);
          if (result.status === 'failure') return redirectToResult('failure', result);
        } catch {
          await sleep(1000);
        }
      }
    };

    const startTracking = () => {
      if (tracking) return;
      tracking = true;
      poll();
    };

    const closeWaitOverlay = () => {
      tracking = false;
      waitOverlay.hidden = true;
      clearTimeout(cancelTimer);
      endBackGuard();
    };

    const openApp = (app) => {
      const phonepe = app === 'phonepe';
      const appName = phonepe ? 'PhonePe' : 'Paytm';
      const url = phonepe ? payment.phonepeIntent : payment.paytmIntent;
      root.querySelector('#kp-loader').style.setProperty('--brand', phonepe ? '#5f259f' : '#002970');
      root.querySelector('#kp-app-icon').src = `/assets/payment-icons/${phonepe ? 'phonepe' : 'paytm'}.svg`;
      root.querySelector('#kp-app-name').textContent = appName;
      root.querySelector('#kp-wait-amount').textContent = money(payment.amount);
      root.querySelector('#kp-retry').textContent = `Open ${appName} again`;
      root.querySelector('#kp-retry').style.setProperty('--brand', phonepe ? '#5f259f' : '#002970');
      root.querySelector('#kp-retry').onclick = () => launchDeepLink(url);
      root.querySelector('#kp-cancel').hidden = true;
      root.querySelector('#kp-cancel').onclick = closeWaitOverlay;
      waitOverlay.hidden = false;
      beginBackGuard();
      clearTimeout(cancelTimer);
      cancelTimer = setTimeout(() => {
        if (generation === current && !waitOverlay.hidden) root.querySelector('#kp-cancel').hidden = false;
      }, 60_000);
      if (!phonepe) startTracking();
      setTimeout(() => launchDeepLink(url), 50);
    };

    const closeQr = () => {
      qrOverlay.hidden = true;
      endBackGuard();
    };
    root.querySelector('#kp-qr-close').onclick = closeQr;

    const qrBlob = async () => {
      const response = await fetch(payment.qrCodeUrl);
      return response.blob();
    };
    root.querySelector('#kp-download').onclick = async () => {
      try {
        const blob = await qrBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `payment-qr-${payment.txnid}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } catch {}
    };
    root.querySelector('#kp-share').onclick = async () => {
      try {
        const blob = await qrBlob();
        const file = new File([blob], `payment-qr-${payment.txnid}.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: 'UPI Payment QR' });
        } else {
          root.querySelector('#kp-download').click();
        }
      } catch { root.querySelector('#kp-download').click(); }
    };

    continueButton.onclick = () => {
      if (!payment) return;
      window.fireStorePixelEvent?.('AddPaymentInfo', {
        value: Number(payment.amount) || 0,
        currency: 'INR',
      });
      if (selected === 'qr') {
        root.querySelector('#kp-qr').src = payment.qrCodeUrl;
        root.querySelector('#kp-qr-amount').textContent = money(payment.amount);
        qrOverlay.hidden = false;
        beginBackGuard();
        startTracking();
      } else {
        openApp(selected);
      }
    };

    try {
      payment = await api('/api/initiate-payment', {
        items: cart.map(({ id, qty }) => ({ id, qty })),
        delivery,
      });
      if (generation !== current || !root.isConnected || location.pathname !== '/payment') return;
      root.querySelector('#kp-subtotal').textContent = money(payment.subtotal);
      root.querySelector('#kp-shipping').textContent = payment.shipping ? money(payment.shipping) : 'FREE';
      root.querySelector('#kp-total').textContent = money(payment.amount);
      root.querySelector('#kp-footer-total').textContent = money(payment.amount);
      continueButton.disabled = false;
      continueButton.textContent = 'Continue';
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.hidden = false;
      continueButton.textContent = 'Error';
    }
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      queueMicrotask(mount);
      return result;
    };
  });
  addEventListener('popstate', mount);
  mount();
})();
