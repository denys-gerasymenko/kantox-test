import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Product List', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /hello', async function (assert) {
    await visit('/product_list');

    assert.equal(currentURL(), '/product_list');
  });
});
