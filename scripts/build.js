// This archive contains compiled assets, not the original Vite source.
// Package those exact files; do not regenerate or rename the storefront bundle.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
fs.mkdirSync(output, { recursive: true });
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && /\.(?:html|css|js|json|png|jpe?g|svg|webp|ico|txt|woff2?|ttf)$/i.test(entry.name)
      && !['package.json', 'package-lock.json', 'vercel.json'].includes(entry.name)) {
    fs.copyFileSync(path.join(root, entry.name), path.join(output, entry.name));
  }
}
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
// Fail the deployment if an HTML entry point references a missing local asset.
for (const page of ['index.html', 'success.html', 'failed.html', 'payment-admin.html']) {
  const html = fs.readFileSync(path.join(output, page), 'utf8');
  for (const match of html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)) {
    const asset = match[1].split(/[?#]/)[0];
    if (!fs.existsSync(path.join(output, asset.slice(1)))) {
      throw new Error(`${page} references missing asset: ${asset}`);
    }
  }
}
console.log('Packaged existing storefront and validated entry-point assets in public/.');
