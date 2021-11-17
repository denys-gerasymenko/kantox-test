import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | cart', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /cart', async function (assert) {
    await visit('/cart');

    assert.equal(currentURL(), '/cart');
  });
});
