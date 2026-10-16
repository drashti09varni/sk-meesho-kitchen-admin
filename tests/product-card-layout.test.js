const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

test("product cards keep their footer rows aligned", () => {
  const css = fs.readFileSync(
    path.join(root, "assets", "product-card-layout.css"),
    "utf8",
  );

  assert.match(css, /\.product-list\s*\{[^}]*align-items:\s*stretch/);
  assert.match(css, /\.product-card\s*\{[^}]*height:\s*100%/);
  assert.match(css, /\.product-details\s*\{[^}]*flex:\s*1/);
  assert.match(css, /\.ratings-row\s*\{[^}]*margin-top:\s*auto/);
});

test("the page loads the product-card alignment stylesheet", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

  assert.match(html, /assets\/product-card-layout\.css\?v=1/);
});
