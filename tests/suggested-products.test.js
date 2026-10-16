const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('suggestions reuse home cards, exclude current/hidden products, and wire navigation/cart/slider', () => {
  for (const file of ['index-MzB9xETE.js', 'assets/index-MzB9xETE.js']) {
    const bundle = fs.readFileSync(file, 'utf8');
    const component = bundle.slice(bundle.indexOf('function SuggestedProducts('), bundle.indexOf('function productDescription('));
    const calls = [];
    const track = { clientWidth: 400, scrollBy: value => calls.push(value) };
    const jsx = (type, props) => ({ type, ...props });
    const context = { q: { useRef: () => ({ current: track }) }, u: { jsx, jsxs: jsx }, em: 'HomeProductCard', window: {} };
    vm.createContext(context);
    vm.runInContext(component, context);
    const products = [{ id: 1 }, { id: 2 }, { id: 3, hidden: true }, { id: 900001 }, { id: 4, slug: 'Dx' }];
    const cart = [], views = [];
    const tree = context.SuggestedProducts({ products, currentId: 1, onAddToCart: p => cart.push(p.id), onView: id => views.push(id) });
    const cards = tree.children[1].children;
    assert.equal(cards.length, 1);
    assert.equal(cards[0].type, 'HomeProductCard');
    cards[0].onAddToCart(cards[0].product);
    cards[0].onView();
    assert.deepEqual(cart, [2]);
    assert.deepEqual(views, [2]);
    const controls = tree.children[0].children[1].children;
    controls[1].onClick();
    controls[0].onClick();
    assert.equal(calls[0].left, 340);
    assert.equal(calls[1].left, -340);
    assert.equal(context.SuggestedProducts({ products: [{ id: 1 }], currentId: 1 }), null);
    assert.ok(bundle.indexOf('u.jsx(SuggestedProducts,') < bundle.indexOf('className: "new-reviews-container"'));
  }
});
