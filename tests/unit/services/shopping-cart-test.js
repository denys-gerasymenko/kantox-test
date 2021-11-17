import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | shopping-cart', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:shopping-cart');
    assert.ok(service);

    assert.equal(service.items.length, 0);

    service.add({
      id: 'testId',
    });

    service.add({
      id: 'testId_2',
    });

    assert.equal(service.items.length, 2);

    service.empty();

    assert.equal(service.items.length, 0);
  });
});
