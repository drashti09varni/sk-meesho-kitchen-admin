const { randomUUID } = require('node:crypto');

const CONFIG_KEY = 'payments:{routing}:config:v1';
const ORDER_TTL = 30 * 24 * 60 * 60;
const ABSENT = '__absent__';
const KEEP = '__keep__';
// Compare every read value before writing anything. Redis executes this atomically.
const CAS = `
for i,key in ipairs(KEYS) do
  local old = redis.call('GET', key)
  local expected = ARGV[(i-1)*3+1]
  if (not old and expected ~= '__absent__') or (old and old ~= expected) then return 0 end
end
for i,key in ipairs(KEYS) do
  local value = ARGV[(i-1)*3+2]
  local ttl = tonumber(ARGV[(i-1)*3+3])
  if value ~= '__keep__' then
    if ttl > 0 then redis.call('SET', key, value, 'EX', ttl)
    else redis.call('SET', key, value) end
  end
end
return 1`;

function configured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_URL || process.env.KV_REST_API_TOKEN);
}

async function command(args) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Connect Upstash Redis to enable payment management.');
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(5000),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error('Payment database unavailable. Please retry.');
  return data.result;
}

async function transaction(keys, transform) {
  for (let retry = 0; retry < 12; retry++) {
    const raw = await command(['MGET', ...keys]);
    const values = raw.map(value => value === null ? null : JSON.parse(value));
    const next = transform(values);
    const args = raw.flatMap((value, i) => [
      value === null ? ABSENT : value,
      next.values[i] === undefined ? KEEP : JSON.stringify(next.values[i]),
      i === 0 ? 0 : ORDER_TTL,
    ]);
    if (await command(['EVAL', CAS, keys.length, ...keys, ...args])) return next.result;
  }
  throw new Error('Payment settings changed concurrently. Please retry.');
}

function initialConfig() {
  const upi = process.env.PAYTM_UPI_ID;
  const mid = process.env.PAYTM_MID;
  const profiles = upi && mid ? [{
    id: 'existing-merchant', name: 'Existing merchant', upi, mid,
    enabled: true, failures: 0, epoch: 1,
  }] : [];
  return { revision: 0, mode: 'consecutive', profiles, activeId: profiles[0]?.id || null, events: [] };
}

function event(config, type, details) {
  config.events.unshift({ type, ...details, at: new Date().toISOString() });
  config.events = config.events.slice(0, 100);
}

function eligible(profile) { return profile.enabled && profile.failures < 3; }

function nextProfile(config, previousId) {
  const start = config.profiles.findIndex(p => p.id === previousId);
  for (let n = 1; n <= config.profiles.length; n++) {
    const candidate = config.profiles[(start + n + config.profiles.length) % config.profiles.length];
    if (candidate.id !== previousId && eligible(candidate)) return candidate.id;
  }
  return null;
}

function validateProfiles(input, current) {
  if (!Array.isArray(input) || input.length > 5) throw new Error('You can manage a maximum of 5 UPI profiles.');
  const ids = new Set(), upis = new Set(), mids = new Set();
  return input.map(entry => {
    const name = String(entry.name || '').trim();
    const upi = String(entry.upi || '').trim();
    const mid = String(entry.mid || '').trim();
    if (!name || name.length > 60) throw new Error('Each profile needs a name (maximum 60 characters).');
    if (!/^[a-zA-Z0-9._-]{2,128}@[a-zA-Z0-9.-]{2,64}$/.test(upi)) throw new Error('Enter a valid UPI ID.');
    if (!/^[a-zA-Z0-9_-]{3,100}$/.test(mid)) throw new Error('Enter a valid merchant MID.');
    if (upis.has(upi.toLowerCase()) || mids.has(mid)) throw new Error('Each UPI ID and MID must be unique.');
    upis.add(upi.toLowerCase()); mids.add(mid);
    const existing = current.profiles.find(p => p.id === entry.id);
    const id = existing?.id || randomUUID();
    if (ids.has(id)) throw new Error('Duplicate profile.');
    ids.add(id);
    const changed = existing && (existing.upi !== upi || existing.mid !== mid);
    return { id, name, upi, mid, enabled: entry.enabled !== false,
      failures: existing && !changed ? existing.failures : 0,
      epoch: existing ? existing.epoch + (changed ? 1 : 0) : 1 };
  });
}

async function getConfig() {
  return transaction([CONFIG_KEY], ([saved]) => {
    const config = saved || initialConfig();
    return { values: [saved ? undefined : config], result: config };
  });
}

async function updateConfig(body) {
  return transaction([CONFIG_KEY], ([saved]) => {
    const config = saved || initialConfig();
    if (body.revision !== config.revision) {
      const error = new Error('Settings changed. Refresh the panel before saving again.');
      error.status = 409; throw error;
    }
    if (body.action === 'save') {
      const previous = config.activeId;
      config.profiles = validateProfiles(body.profiles, config);
      if (!config.profiles.some(p => p.id === config.activeId && eligible(p))) {
        config.activeId = nextProfile(config, previous);
      }
      event(config, 'settings', { message: 'Profiles updated', activeId: config.activeId });
    } else if (body.action === 'activate' || body.action === 'reset') {
      const profile = config.profiles.find(p => p.id === body.id);
      if (!profile || !profile.enabled) throw new Error('Choose an enabled profile.');
      profile.failures = 0;
      profile.epoch += 1;
      if (body.action === 'activate' || !config.activeId) config.activeId = profile.id;
      event(config, body.action, { profileId: profile.id, activeId: config.activeId });
    } else throw new Error('Unknown action.');
    config.revision += 1;
    return { values: [config], result: config };
  });
}

function orderKey(id) {
  if (!/^TXN\d{1,80}$/.test(id)) throw new Error('Invalid transaction ID.');
  return `payments:{routing}:order:${id}`;
}

async function assignOrder(id, amount) {
  return transaction([CONFIG_KEY, orderKey(id)], ([saved, existing]) => {
    const config = saved || initialConfig();
    if (existing) throw new Error('Transaction already exists. Please retry.');
    const profile = config.profiles.find(p => p.id === config.activeId && eligible(p));
    if (!profile) throw new Error('Payments are temporarily unavailable. No active UPI profile.');
    const order = { id, amount, profileId: profile.id, epoch: profile.epoch,
      upi: profile.upi, mid: profile.mid, status: 'pending', createdAt: new Date().toISOString() };
    return { values: [saved ? undefined : config, order], result: order };
  });
}

async function getOrder(id) {
  const raw = await command(['GET', orderKey(id)]);
  return raw ? JSON.parse(raw) : null;
}

// Terminal outcomes count once, including simultaneous verify requests.
function applyOutcome(config, order, result) {
  if (!order || order.status !== 'pending' || !['success', 'failure'].includes(result.status)) return false;
  order.status = result.status;
  order.utr = result.utr || '';
  order.confirmedAmount = result.amount || '';
  order.completedAt = new Date().toISOString();
  const profile = config.profiles.find(p => p.id === order.profileId && p.epoch === order.epoch);
  if (profile) {
    profile.failures = result.status === 'success' ? 0 : Math.min(profile.failures + 1, 3);
    if (profile.failures >= 3 && config.activeId === profile.id) {
      const from = profile.id;
      config.activeId = nextProfile(config, from);
      event(config, 'rotation', { from, to: config.activeId, message: config.activeId ? '3 consecutive failures: switched UPI' : 'All profiles exhausted: new payments paused' });
    }
  }
  event(config, result.status, { transactionId: order.id, profileId: order.profileId, amount: order.amount });
  config.revision += 1;
  return true;
}

async function recordOutcome(id, result) {
  return transaction([CONFIG_KEY, orderKey(id)], ([saved, order]) => {
    const config = saved || initialConfig();
    if (!order) return { values: [undefined, undefined], result: null };
    const changed = applyOutcome(config, order, result);
    return { values: changed ? [config, order] : [undefined, undefined], result: order };
  });
}

module.exports = { configured, command, getConfig, updateConfig, assignOrder, getOrder, recordOutcome,
  initialConfig, validateProfiles, nextProfile, applyOutcome, CAS, CONFIG_KEY };
