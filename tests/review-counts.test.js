const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

function readProducts(file) {
  const source = fs.readFileSync(file, 'utf8');
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const declaration = 'const gs = ';
  const declarationIndex = source.indexOf(`${declaration}[`);
  const arrayStart = declarationIndex + declaration.length;
  const markerIndex = source.indexOf(`${newline}],${newline}  lm = [`, arrayStart);
  const closingBracketEnd = markerIndex + newline.length + 1;

  assert.notEqual(declarationIndex, -1, `${file}: product declaration missing`);
  assert.notEqual(markerIndex, -1, `${file}: product array end missing`);
  return JSON.parse(source.slice(arrayStart, closingBracketEnd));
}

test('all product review counts are stable and between 6999 and 9999', () => {
  const bundles = [
    readProducts('assets/index-MzB9xETE.js'),
    readProducts('index-MzB9xETE.js'),
  ];

  for (const products of bundles) {
    assert.equal(products.length, 49);
    for (const product of products) {
      const count = Number(product.reviewCount);
      assert.ok(Number.isInteger(count), `${product.name}: review count must be an integer`);
      assert.ok(count >= 6999 && count <= 9999, `${product.name}: review count is out of range`);
    }
  }

  const toCountMap = (products) =>
    Object.fromEntries(products.map((product) => [product.name, product.reviewCount]));
  assert.deepEqual(toCountMap(bundles[0]), toCountMap(bundles[1]));
});

test('all product star ratings are stable and between 4.1 and 4.9', () => {
  const bundles = [
    readProducts('assets/index-MzB9xETE.js'),
    readProducts('index-MzB9xETE.js'),
  ];

  for (const products of bundles) {
    assert.equal(products.length, 49);
    for (const product of products) {
      assert.match(product.rating, /^4\.[1-9]$/, `${product.name}: rating must have one decimal`);
      const rating = Number(product.rating);
      assert.ok(rating >= 4.1 && rating <= 4.9, `${product.name}: rating is out of range`);
    }
  }

  const toRatingMap = (products) =>
    Object.fromEntries(products.map((product) => [product.name, product.rating]));
  assert.deepEqual(toRatingMap(bundles[0]), toRatingMap(bundles[1]));
});
