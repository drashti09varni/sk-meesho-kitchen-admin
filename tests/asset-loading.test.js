const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

test('packaged scripts load over HTTP; missing assets/API never receive SPA HTML', async (t) => {
  execFileSync(process.execPath, ['scripts/build.js']);
  const { routes } = require('../vercel.json');
  // Local routing harness, using the configured filesystem-first route order.
  // This checks the archive; it does not replace verification on Vercel.
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    let file = path.join(process.cwd(), 'public', pathname === '/' ? 'index.html' : pathname.slice(1));
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      const route = routes.find(r => r.src && new RegExp(`^(?:${r.src})$`).test(pathname));
      if (!route || route.status === 404) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not found');
      }
      file = path.join(process.cwd(), 'public', route.dest.slice(1));
    }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' : 'text/html');
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const html = fs.readFileSync('public/index.html', 'utf8');
  for (const [, url] of html.matchAll(/<script[^>]+src="(\/assets\/[^" ]+)"/g)) {
    const response = await fetch(base + url);
    assert.equal(response.status, 200, url);
    assert.match(response.headers.get('content-type'), /javascript/);
    const body = await response.text();
    assert.doesNotMatch(body, /^\s*</);
    assert.equal(body, fs.readFileSync(path.join('assets', url.split('/').pop().split('?')[0]), 'utf8'));
  }
  for (const url of ['/assets/missing.js?v=1', '/missing.js', '/api/missing', '/assets/missing.css']) {
    const response = await fetch(base + url);
    assert.equal(response.status, 404, url);
    assert.doesNotMatch(await response.text(), /<!DOCTYPE html>/i);
  }
  for (const url of ['/payment', '/checkout', '/product/1']) {
    assert.equal(await (await fetch(base + url)).text(), html);
  }
  for (const page of ['success.html', 'failed.html']) {
    assert.equal(await (await fetch(`${base}/${page}`)).text(), fs.readFileSync(page, 'utf8'));
  }
  assert.equal(fs.existsSync('public/api'), false, 'server code must not be published as static assets');
});

test('checkout script executes and installs navigation hooks on /payment', () => {
  const listeners = [];
  let observed = false;
  const context = {
    location: { pathname: '/payment' },
    document: { documentElement: {}, querySelector: () => null },
    MutationObserver: class { observe() { observed = true; } },
    history: { pushState() {}, replaceState() {} },
    addEventListener: (event) => listeners.push(event),
    queueMicrotask,
  };
  const originalPushState = context.history.pushState;
  vm.runInNewContext(fs.readFileSync('public/assets/cashfree-checkout.js', 'utf8'), context);
  assert.equal(observed, true);
  assert.ok(listeners.includes('popstate'));
  assert.notEqual(context.history.pushState, originalPushState);
});
