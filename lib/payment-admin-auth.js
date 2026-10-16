const { createHash, createHmac, randomBytes, timingSafeEqual } = require('node:crypto');
const { command } = require('./payment-profiles');
const COOKIE = 'payment_admin';

function ready() {
  return (process.env.PAYMENT_ADMIN_PASSWORD || '').length >= 12 &&
    (process.env.PAYMENT_ADMIN_SESSION_SECRET || '').length >= 32;
}
function digest(value) { return createHash('sha256').update(value).digest(); }
function equal(a, b) { return timingSafeEqual(digest(a), digest(b)); }
function sign(value) {
  return createHmac('sha256', process.env.PAYMENT_ADMIN_SESSION_SECRET)
    .update(value + ':' + process.env.PAYMENT_ADMIN_PASSWORD).digest('base64url');
}
function cookie(value, age) {
  return `${COOKIE}=${value}; Path=/api/payment-admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;
}
function authenticated(req) {
  if (!ready()) return false;
  const value = (req.headers.cookie || '').split(';').map(v => v.trim())
    .find(v => v.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1) || '';
  const [expires, nonce, signature] = value.split('.');
  if (!expires || !nonce || !signature || Number(expires) < Date.now()) return false;
  return equal(signature, sign(`${expires}.${nonce}`));
}
async function login(req, password) {
  if (!ready()) throw Object.assign(new Error('Set PAYMENT_ADMIN_PASSWORD (12+ characters) and PAYMENT_ADMIN_SESSION_SECRET (32+ characters) in Vercel.'), { status: 503 });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const key = `payments:admin:login:${digest(ip).toString('hex')}`;
  const attempts = await command(['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n", 1, key]);
  if (attempts > 10) throw Object.assign(new Error('Too many login attempts. Try again in 15 minutes.'), { status: 429 });
  if (typeof password !== 'string' || password.length > 1024 || !equal(password, process.env.PAYMENT_ADMIN_PASSWORD)) {
    throw Object.assign(new Error('Incorrect password.'), { status: 401 });
  }
  await command(['DEL', key]);
  const value = `${Date.now() + 8 * 60 * 60 * 1000}.${randomBytes(24).toString('base64url')}`;
  return cookie(`${value}.${sign(value)}`, 8 * 60 * 60);
}
module.exports = { ready, authenticated, login, logoutCookie: () => cookie('', 0) };
