(() => {
  let configPromise;
  const config = () => configPromise ||= fetch('/api/settings')
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Pixel settings unavailable');
      return data;
    })
    .catch((error) => {
      configPromise = null;
      throw error;
    });

  function init(ids) {
    if (!ids.length) return;
    if (!window.fbq) {
      const queue = window.fbq = function (...args) {
        if (queue.callMethod) queue.callMethod.apply(queue, args);
        else queue.queue.push(args);
      };
      queue.push = queue;
      queue.loaded = true;
      queue.version = '2.0';
      queue.queue = [];
      window._fbq = queue;
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    ids.forEach((id) => {
      window.fbq('init', id);
      window.fbq('set', 'autoConfig', false, id);
    });
  }

  const ready = config().then(({ pixels = [] }) => {
    init(pixels);
    return pixels;
  });
  ready.catch(() => {});

  let lastPath;
  async function pageview() {
    if (location.pathname === '/success.html') return;
    const path = location.pathname + location.search;
    if (path === lastPath) return;
    lastPath = path;
    try {
      const ids = await ready;
      ids.forEach((id) => window.fbq('trackSingle', id, 'PageView'));
    } catch {}
  }

  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      pageview();
      return result;
    };
  });
  addEventListener('popstate', pageview);
  pageview();

  window.fireStorePixelEvent = async (eventName, params = {}, dedupeKey = '') => {
    try {
      const ids = await ready;
      ids.forEach((id) => {
        const key = dedupeKey ? `pixel:${eventName}:${id}:${dedupeKey}` : '';
        if (key && localStorage.getItem(key)) return;
        window.fbq('trackSingle', id, eventName, params);
        if (key) localStorage.setItem(key, '1');
      });
    } catch {}
  };

  window.trackVerifiedPurchase = ({ transactionId, amount }) =>
    window.fireStorePixelEvent(
      'Purchase',
      { value: Number(amount) || 0, currency: 'INR' },
      transactionId || '',
    );
})();
