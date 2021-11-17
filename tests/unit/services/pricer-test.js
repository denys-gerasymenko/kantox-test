import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | pricer', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:pricer');
    assert.ok(service);

    const product = {
      id: 'SR1',
      name: 'Strawberries',
      price: 5,
      image: 'assets/images/strawberry.jpeg',
      quantity: 0,
    };

    let productWithDiscount = service.setProductWithDiscount(product, 4);

    assert.equal(productWithDiscount.price, 4.5);
    assert.equal(service.productDiscounts[product.id].hasDiscount, true);

    productWithDiscount = service.setProductWithDiscount(product, 2);

    assert.equal(service.productDiscounts[product.id].hasDiscount, false);
    assert.equal(productWithDiscount, null);
  });
});
