const profiles = require('../lib/payment-profiles');
const auth = require('../lib/payment-admin-auth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });
  if (req.method === 'POST' && req.headers['x-admin-request'] !== '1') return res.status(403).json({ error: 'Invalid admin request.' });
  const action = req.body?.action;
  try {
    if (req.method === 'POST' && action === 'logout') {
      res.setHeader('Set-Cookie', auth.logoutCookie());
      return res.status(200).json({ success: true });
    }
    if (req.method === 'POST' && action === 'login') {
      if (!profiles.configured()) return res.status(503).json({ error: 'Connect Upstash Redis in Vercel before using payment management.' });
      res.setHeader('Set-Cookie', await auth.login(req, req.body.password));
      return res.status(200).json({ success: true });
    }
    if (!auth.authenticated(req)) return res.status(401).json({ error: 'Please sign in to payment management.' });
    const config = req.method === 'GET' ? await profiles.getConfig() : await profiles.updateConfig(req.body || {});
    return res.status(200).json({ success: true, config });
  } catch (error) {
    // Do not expose provider response bodies or credentials.
    return res.status(error.status || (req.method === 'GET' ? 503 : 400)).json({ error: error.message || 'Please retry.' });
  }
};
