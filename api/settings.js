module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const pixels = [
    ...String(process.env.NEXT_PUBLIC_META_PIXEL_ID || '').split(','),
    ...String(process.env.NEXT_PUBLIC_META_EXTRA_PIXELS || '').split(','),
  ]
    .map((id) => id.trim())
    .filter((id) => /^\d{5,25}$/.test(id))
    .filter((id, index, all) => all.indexOf(id) === index);

  return res.status(200).json({ pixels });
};
