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

    service.changeBuyingCounter(product, 2);
    let updatedProduct = service.getProductWithDiscount(product);
    assert.equal(updatedProduct.price, product.price);

    service.changeBuyingCounter(product, 4);
    updatedProduct = service.getProductWithDiscount(product);
    console.log('service', service);
    console.log('updatedProduct', updatedProduct);
    assert.equal(updatedProduct.price, product.price);
  });
});
